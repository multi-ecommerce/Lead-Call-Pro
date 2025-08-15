'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { CampaignService } from '@/lib/campaignService';
import { CAMPAIGN_TEMPLATES } from '@/lib/types/campaign';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Target, Users, MapPin, DollarSign, Calendar } from 'lucide-react';
import Link from 'next/link';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function NewCampaignPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'google_ads',
    budget: 1000,
    daily_budget: 50,
    city: '',
    state: '',
    radius_miles: 25,
    keywords: '',
    business_id: ''
  });

  const handleTemplateSelect = (templateKey: string) => {
    setSelectedTemplate(templateKey);
    const template = CAMPAIGN_TEMPLATES[templateKey as keyof typeof CAMPAIGN_TEMPLATES];
    setFormData(prev => ({
      ...prev,
      name: template.name,
      description: template.description,
      type: template.type,
      keywords: template.keywords.join(', ')
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const campaignData = {
        user_id: user.id,
        business_id: formData.business_id || 'default', // You might want to get this from user's businesses
        name: formData.name,
        description: formData.description,
        status: 'draft' as const,
        type: formData.type as any,
        budget: formData.budget,
        daily_budget: formData.daily_budget,
        start_date: new Date().toISOString(),
        end_date: null,
        target_location: {
          city: formData.city,
          state: formData.state,
          zip_codes: [],
          radius_miles: formData.radius_miles
        },
        target_audience: selectedTemplate ? 
          CAMPAIGN_TEMPLATES[selectedTemplate as keyof typeof CAMPAIGN_TEMPLATES].target_audience :
          {
            age_range: { min: 25, max: 65 },
            gender: 'all',
            interests: [],
            income_level: 'medium',
            device_type: 'all'
          },
        ad_platforms: [],
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
        call_tracking_number: '',
        performance_metrics: {
          total_impressions: 0,
          total_clicks: 0,
          total_spend: 0,
          total_calls: 0,
          total_conversions: 0,
          average_ctr: 0,
          average_cpc: 0,
          average_cpa: 0,
          roi: 0,
          cost_per_lead: 0,
          lead_quality_score: 0
        }
      };

      const campaign = await CampaignService.createCampaign(campaignData);
      router.push(`/dashboard/campaigns/${campaign.id}`);
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="py-12">
        <div className="mb-8">
          <Link href="/dashboard/campaigns" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft size={16} />
            Back to Campaigns
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
          <p className="text-gray-600 mt-2">Set up a new marketing campaign to generate leads</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Templates */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target size={20} />
                  Campaign Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(CAMPAIGN_TEMPLATES).map(([key, template]) => (
                  <div
                    key={key}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTemplate === key 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleTemplateSelect(key)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{template.name}</h3>
                      {selectedTemplate === key && (
                        <Badge className="bg-blue-100 text-blue-800">Selected</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {template.keywords.slice(0, 3).map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                      {template.keywords.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.keywords.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Campaign Form */}
          <div className="lg:col-span-2">
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
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                          id="budget"
                          type="number"
                          value={formData.budget}
                          onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                          placeholder="1000"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="daily_budget">Daily Budget</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                          id="daily_budget"
                          type="number"
                          value={formData.daily_budget}
                          onChange={(e) => setFormData(prev => ({ ...prev, daily_budget: Number(e.target.value) }))}
                          placeholder="50"
                          className="pl-10"
                          required
                        />
                      </div>
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
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? 'Creating...' : 'Create Campaign'}
                    </Button>
                    <Link href="/dashboard/campaigns">
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
