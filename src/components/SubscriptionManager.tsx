'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PLANS, PlanId } from '@/lib/types/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import { stripePromise } from '@/lib/stripe';

export default function SubscriptionManager() {
  const { user, subscription, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentPlan = (): PlanId => {
    if (!subscription) return 'free';
    
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'past_due':
        return <AlertCircle className="w-4 h-4" />;
      case 'canceled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleManageSubscription = async () => {
    if (!user?.email) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.email,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating portal session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentPlan = getCurrentPlan();
  const planDetails = PLANS[currentPlan];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Subscription
        </CardTitle>
        <CardDescription>
          Manage your subscription and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Plan */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{planDetails.name} Plan</h3>
            <p className="text-sm text-gray-600">{planDetails.description}</p>
          </div>
          <Badge className={getStatusColor(subscription?.status || 'active')}>
            <div className="flex items-center gap-1">
              {getStatusIcon(subscription?.status || 'active')}
              {subscription?.status || 'active'}
            </div>
          </Badge>
        </div>

        {/* Plan Features */}
        <div>
          <h4 className="font-medium mb-2">Current Plan Features:</h4>
          <ul className="space-y-1">
            {planDetails.features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Billing Information */}
        {subscription && subscription.status === 'active' && (
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Calendar className="w-4 h-4" />
              Next billing date
            </div>
            <p className="font-medium">
              {subscription.current_period_end
                ? new Date(subscription.current_period_end).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          {subscription && subscription.status === 'active' ? (
            <Button
              onClick={handleManageSubscription}
              disabled={isLoading}
              variant="outline"
              className="flex-1"
            >
              {isLoading ? 'Loading...' : 'Manage Subscription'}
            </Button>
          ) : (
            <Button
              onClick={() => window.location.href = '/pricing'}
              className="flex-1"
            >
              Upgrade Plan
            </Button>
          )}
          
          <Button
            onClick={() => window.location.href = '/pricing'}
            variant="outline"
            className="flex-1"
          >
            View Plans
          </Button>
        </div>

        {/* Warning for past due */}
        {subscription?.status === 'past_due' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Payment Required</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              Your payment failed. Please update your payment method to continue using our services.
            </p>
          </div>
        )}

        {/* Warning for canceled */}
        {subscription?.status === 'canceled' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Subscription Canceled</span>
            </div>
            <p className="text-sm text-red-700 mt-1">
              Your subscription has been canceled. You can reactivate it anytime.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 