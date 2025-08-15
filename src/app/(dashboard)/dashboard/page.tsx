'use client';

import { useAuth } from '@/contexts/AuthContext';
import SubscriptionManager from '@/components/SubscriptionManager';
import UsageTracker from '@/components/UsageTracker';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Target, Settings, BarChart3 } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';

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

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/dashboard/campaigns">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Target className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Manage Campaigns</h3>
                      <p className="text-sm text-gray-600">Create and manage your marketing campaigns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/dashboard/business">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-green-600" />
                    <div>
                      <h3 className="font-medium">Manage Businesses</h3>
                      <p className="text-sm text-gray-600">Add and manage your business profiles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/dashboard/reports">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">View Reports</h3>
                      <p className="text-sm text-gray-600">Track your campaign performance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
