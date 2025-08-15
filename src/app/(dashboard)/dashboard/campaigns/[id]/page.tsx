'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { CampaignService } from '@/lib/campaignService';
import { Campaign, CampaignStatus } from '@/lib/types/campaign';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Play, Pause, Edit, Trash2, BarChart3, Phone, DollarSign } from 'lucide-react';
import Link from 'next/link';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800',
  archived: 'bg-red-100 text-red-800'
};

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id && user) {
      loadCampaign();
    }
  }, [params.id, user]);

  const loadCampaign = async () => {
    try {
      setLoading(true);
      const data = await CampaignService.getCampaign(params.id as string);
      setCampaign(data);
    } catch (error) {
      console.error('Error loading campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: CampaignStatus) => {
    if (!campaign) return;
    
    try {
      await CampaignService.updateCampaignStatus(campaign.id, newStatus);
      setCampaign(prev => prev ? { ...prev, status: newStatus } : null);
    } catch (error) {
      console.error('Error updating campaign status:', error);
    }
  };

  const handleDeleteCampaign = async () => {
    if (!campaign) return;
    
    if (confirm('Are you sure you want to delete this campaign?')) {
      try {
        await CampaignService.deleteCampaign(campaign.id);
        router.push('/dashboard/campaigns');
      } catch (error) {
        console.error('Error deleting campaign:', error);
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

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

  if (!campaign) {
    return (
      <MaxWidthWrapper>
        <div className="py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Campaign not found</h1>
          <Link href="/dashboard/campaigns">
            <Button>Back to Campaigns</Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="py-12">
        <div className="mb-8">
          <Link href="/dashboard/campaigns" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft size={16} />
            Back to Campaigns
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
                <Badge className={statusColors[campaign.status]}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </Badge>
              </div>
              <p className="text-gray-600">{campaign.description}</p>
            </div>
            
            <div className="flex items-center gap-2">
              {campaign.status === 'active' && (
                <Button variant="outline" onClick={() => handleStatusChange('paused')}>
                  <Pause size={16} className="mr-2" />
                  Pause
                </Button>
              )}
              
              {campaign.status === 'paused' && (
                <Button variant="outline" onClick={() => handleStatusChange('active')}>
                  <Play size={16} className="mr-2" />
                  Resume
                </Button>
              )}
              
              <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>
                <Button variant="outline">
                  <Edit size={16} className="mr-2" />
                  Edit
                </Button>
              </Link>
              
              <Button variant="outline" onClick={handleDeleteCampaign} className="text-red-600 hover:text-red-700">
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Calls</p>
                  <p className="text-2xl font-bold">{campaign.performance_metrics.total_calls}</p>
                </div>
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spend</p>
                  <p className="text-2xl font-bold">{formatCurrency(campaign.performance_metrics.total_spend)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cost per Lead</p>
                  <p className="text-2xl font-bold">{formatCurrency(campaign.performance_metrics.cost_per_lead)}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ROI</p>
                  <p className="text-2xl font-bold">{campaign.performance_metrics.roi.toFixed(1)}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Target Location</h4>
                  <p className="text-gray-600">
                    {campaign.target_location.city}, {campaign.target_location.state} 
                    ({campaign.target_location.radius_miles} mile radius)
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Budget</h4>
                  <p className="text-gray-600">
                    Total: {formatCurrency(campaign.budget)} | Daily: {formatCurrency(campaign.daily_budget)}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {campaign.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Engagement</h4>
                    <p className="text-sm text-gray-600">Impressions: {campaign.performance_metrics.total_impressions}</p>
                    <p className="text-sm text-gray-600">Clicks: {campaign.performance_metrics.total_clicks}</p>
                    <p className="text-sm text-gray-600">CTR: {campaign.performance_metrics.average_ctr.toFixed(2)}%</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Costs</h4>
                    <p className="text-sm text-gray-600">CPC: {formatCurrency(campaign.performance_metrics.average_cpc)}</p>
                    <p className="text-sm text-gray-600">CPA: {formatCurrency(campaign.performance_metrics.average_cpa)}</p>
                    <p className="text-sm text-gray-600">Cost per Lead: {formatCurrency(campaign.performance_metrics.cost_per_lead)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Campaign settings and optimization options will be available here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MaxWidthWrapper>
  );
}
