'use client';

import { useAuth } from '@/contexts/AuthContext';
import { PLANS, PlanId } from '@/lib/types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Phone, Users, BarChart3 } from 'lucide-react';

interface UsageData {
  calls: number;
  leads: number;
  analytics: number;
}

const USAGE_LIMITS = {
  free: {
    calls: 10,
    leads: 50,
    analytics: 0,
  },
  pro: {
    calls: 100,
    leads: 500,
    analytics: 1,
  },
  enterprise: {
    calls: -1, // unlimited
    leads: -1, // unlimited
    analytics: -1, // unlimited
  },
};

export default function UsageTracker() {
  const { subscription } = useAuth();

  // Mock usage data - in a real app, this would come from your database
  const usage: UsageData = {
    calls: 5,
    leads: 25,
    analytics: 0,
  };

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

  const currentPlan = getCurrentPlan();
  const limits = USAGE_LIMITS[currentPlan];

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0; // unlimited
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageText = (used: number, limit: number) => {
    if (limit === -1) return `${used} / Unlimited`;
    return `${used} / ${limit}`;
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const usageItems = [
    {
      title: 'Phone Calls',
      icon: Phone,
      used: usage.calls,
      limit: limits.calls,
      description: 'Customer calls received',
    },
    {
      title: 'Lead Contacts',
      icon: Users,
      used: usage.leads,
      limit: limits.leads,
      description: 'Lead contact information',
    },
    {
      title: 'Analytics Reports',
      icon: BarChart3,
      used: usage.analytics,
      limit: limits.analytics,
      description: 'Advanced analytics access',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Usage This Month
        </CardTitle>
        <CardDescription>
          Your current usage for the {PLANS[currentPlan].name} plan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {usageItems.map((item) => {
          const percentage = getUsagePercentage(item.used, item.limit);
          const Icon = item.icon;
          
          return (
            <div key={item.title} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-600" />
                  <span className="font-medium">{item.title}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {getUsageText(item.used, item.limit)}
                </span>
              </div>
              
              {item.limit !== -1 && (
                <div className="space-y-1">
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              )}
              
              {item.limit === -1 && (
                <p className="text-xs text-gray-500">{item.description} - Unlimited</p>
              )}
            </div>
          );
        })}

        {/* Upgrade prompt for free users */}
        {currentPlan === 'free' && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Upgrade to Pro</h4>
            <p className="text-sm text-blue-700 mb-3">
              Get unlimited calls, leads, and advanced analytics with our Pro plan.
            </p>
            <button
              onClick={() => window.location.href = '/pricing'}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
            >
              View Plans
            </button>
          </div>
        )}

        {/* Usage warning for pro users */}
        {currentPlan === 'pro' && (
          usageItems.some(item => getUsagePercentage(item.used, item.limit) >= 75) && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Usage Warning</h4>
              <p className="text-sm text-yellow-700">
                You're approaching your usage limits. Consider upgrading to Enterprise for unlimited access.
              </p>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
} 