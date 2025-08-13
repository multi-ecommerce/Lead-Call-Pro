'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PLANS, PlanId } from '@/lib/types/user';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { stripePromise } from '@/lib/stripe';

export default function PricingPage() {
  const { user, subscription, loading } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: PlanId) => {
    if (!user) {
      // Redirect to sign in
      window.location.href = '/sign-in';
      return;
    }

    if (planId === 'free') {
      // Handle free plan upgrade
      return;
    }

    setIsLoading(planId);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: PLANS[planId].priceId,
          userId: user.id,
          userEmail: user.email,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Error:', error);
        }
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const getCurrentPlan = (): PlanId => {
    if (!subscription) return 'free';
    
    // Map price_id to planId
    switch (subscription.price_id) {
      case 'price_free':
        return 'free';
      case 'price_pro':
        return 'pro';
      case 'price_enterprise':
        return 'enterprise';
      default:
        return 'free';
    }
  };

  const isCurrentPlan = (planId: PlanId): boolean => {
    const currentPlan = getCurrentPlan();
    return currentPlan === planId;
  };

  const isSubscribed = subscription && subscription.status === 'active';

  return (
    <MaxWidthWrapper>
      <div className="py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that works best for your business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(PLANS).map(([planId, plan]) => {
            const typedPlanId = planId as PlanId;
            return (
              <div
                key={planId}
                className={`relative rounded-2xl border p-8 ${
                  planId === 'pro'
                    ? 'border-blue-600 shadow-lg scale-105'
                    : 'border-gray-200'
                }`}
              >
                {planId === 'pro' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-2 text-gray-600">{plan.description}</p>
                  
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-600">/month</span>
                    )}
                  </div>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    {isCurrentPlan(typedPlanId) ? (
                      <Button
                        disabled
                        className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                      >
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleSubscribe(typedPlanId)}
                        disabled={loading || isLoading === planId}
                        className={`w-full ${
                          planId === 'pro'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-gray-900 hover:bg-gray-800'
                        }`}
                      >
                        {isLoading === planId
                          ? 'Loading...'
                          : plan.price === 0
                          ? 'Get Started'
                          : 'Subscribe'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {isSubscribed && (
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Current plan: <span className="font-semibold">{PLANS[getCurrentPlan()].name}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Next billing date: {subscription.current_period_end && 
                new Date(subscription.current_period_end).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
} 