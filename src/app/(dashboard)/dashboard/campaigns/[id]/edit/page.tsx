'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { CampaignService } from '@/lib/campaignService';
import { Campaign } from '@/lib/types/campaign';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function EditCampaignPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'google_ads',
    budget: 1000,
    daily_budget: 50,
    city: '',
    state: '',
    radius_miles: 25,
    keywords: ''
  });

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
      
      if (data) {
        setFormData({
          name: data.name,
          description: data.description,
          type: data.type,
          budget: data.budget,
          daily_budget: data.daily_budget,
          city: data.target_location.city,
          state: data.target_location.state,
          radius_miles: data.target_location.radius_miles,
          keywords: data.keywords.join(', ')
        });
      }
    } catch (error) {
      console.error('Error loading campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaign) return;

    setSaving(true);
    try {
      const updates = {
        name: formData.name,
        description: formData.description,
        type: formData.type as any,
        budget: formData.budget,
        daily_budget: formData.daily_budget,
        target_location: {
          ...campaign.target_location,
          city: formData.city,
          state: formData.state,
          radius_miles: formData.radius_miles
        },
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k)
      };

      await CampaignService.updateCampaign(campaign.id, updates);
      router.push(`/dashboard/campaigns/${campaign.id}`);
    } catch (error) {
      console.error('Error updating campaign:', error);
    } finally {
      setSaving(false);
    }
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
          <Link href={`/dashboard/campaigns/${campaign.id}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft size={16} />
            Back to Campaign
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Campaign</h1>
          <p className="text-gray-600 mt-2">Update your campaign settings and configuration</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter campaign name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Campaign Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google_ads">Google Ads</SelectItem>
                      <SelectItem value="facebook_ads">Facebook Ads</SelectItem>
                      <SelectItem value="instagram_ads">Instagram Ads</SelectItem>
                      <SelectItem value="multi_platform">Multi-Platform</SelectItem>
                      <SelectItem value="seo">SEO</SelectItem>
                      <SelectItem value="local_search">Local Search</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your campaign goals and target audience"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Total Budget</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                    placeholder="1000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="daily_budget">Daily Budget</Label>
                  <Input
                    id="daily_budget"
                    type="number"
                    value={formData.daily_budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, daily_budget: Number(e.target.value) }))}
                    placeholder="50"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="Enter state"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="radius">Radius (miles)</Label>
                  <Input
                    id="radius"
                    type="number"
                    value={formData.radius_miles}
                    onChange={(e) => setFormData(prev => ({ ...prev, radius_miles: Number(e.target.value) }))}
                    placeholder="25"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                  placeholder="Enter keywords separated by commas"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={saving} className="flex-1">
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Link href={`/dashboard/campaigns/${campaign.id}`}>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
}
