'use client';

import { useAuth } from '@/contexts/AuthContext';
import SubscriptionManager from '@/components/SubscriptionManager';
import UsageTracker from '@/components/UsageTracker';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <MaxWidthWrapper>
        <div className="py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  if (!user) {
    return (
      <MaxWidthWrapper>
        <div className="py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to access your dashboard</h1>
          <a href="/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user.email}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <SubscriptionManager />
          <UsageTracker />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
