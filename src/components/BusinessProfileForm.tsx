'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { BusinessProfile, BUSINESS_CATEGORIES } from '@/lib/types/business';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, MapPin, Phone, Mail, Globe, Upload, Plus, X } from 'lucide-react';

interface BusinessProfileFormProps {
  business?: BusinessProfile;
  onSave: (business: Partial<BusinessProfile>) => void;
  onCancel: () => void;
}

export default function BusinessProfileForm({ business, onSave, onCancel }: BusinessProfileFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    business_name: business?.business_name || '',
    business_type: business?.business_type || '',
    description: business?.description || '',
    website_url: business?.website_url || '',
    phone_number: business?.phone_number || '',
    email: business?.email || '',
    address: {
      street_address: business?.address.street_address || '',
      city: business?.address.city || '',
      state: business?.address.state || '',
      zip_code: business?.address.zip_code || '',
      country: business?.address.country || 'United States',
    },
    hours: business?.hours || {
      monday: { is_open: true, open_time: '09:00', close_time: '17:00' },
      tuesday: { is_open: true, open_time: '09:00', close_time: '17:00' },
      wednesday: { is_open: true, open_time: '09:00', close_time: '17:00' },
      thursday: { is_open: true, open_time: '09:00', close_time: '17:00' },
      friday: { is_open: true, open_time: '09:00', close_time: '17:00' },
      saturday: { is_open: false, open_time: null, close_time: null },
      sunday: { is_open: false, open_time: null, close_time: null },
    },
    services: business?.services || [],
    social_media: business?.social_media || {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      tiktok: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const businessData = {
        ...formData,
        address: {
          ...formData.address,
          latitude: null,
          longitude: null,
        },
        user_id: user?.id,
        seo_score: 0,
        images: business?.images || [],
        google_business_id: business?.google_business_id || null,
      };

      onSave(businessData);
    } catch (error) {
      console.error('Error saving business profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Basic Business Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business_name">Business Name *</Label>
              <Input
                id="business_name"
                value={formData.business_name}
                onChange={(e) => setFormData(prev => ({ ...prev, business_name: e.target.value }))}
                placeholder="Your Business Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="business_type">Business Category *</Label>
              <Select
                value={formData.business_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, business_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business category" />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Business Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your business, services, and what makes you unique..."
              rows={4}
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="website_url">Website URL</Label>
              <Input
                id="website_url"
                type="url"
                value={formData.website_url}
                onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div>
              <Label htmlFor="phone_number">Phone Number *</Label>
              <Input
                id="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                placeholder="(555) 123-4567"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="contact@yourbusiness.com"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : business ? 'Update Business' : 'Create Business'}
        </Button>
      </div>
    </form>
  );
} 