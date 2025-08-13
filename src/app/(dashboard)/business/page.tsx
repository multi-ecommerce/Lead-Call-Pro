'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { BusinessProfile } from '@/lib/types/business';
import BusinessProfileForm from '@/components/BusinessProfileForm';
import SEOAnalytics from '@/components/SEOAnalytics';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  BarChart3, 
  Settings, 
  Plus, 
  Edit, 
  Eye, 
  Target,
  Calendar,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function BusinessPage() {
  const { user, loading } = useAuth();
  const [businesses, setBusinesses] = useState<BusinessProfile[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessProfile | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingBusinesses, setLoadingBusinesses] = useState(true);

  // Mock business data
  useEffect(() => {
    if (!loading) {
      const mockBusinesses: BusinessProfile[] = [
        {
          id: '1',
          user_id: user?.id || '',
          business_name: 'Sample Restaurant',
          business_type: 'Restaurant & Food',
          description: 'A delicious local restaurant serving authentic cuisine',
          website_url: 'https://samplerestaurant.com',
          phone_number: '(555) 123-4567',
          email: 'contact@samplerestaurant.com',
          address: {
            street_address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zip_code: '10001',
            country: 'United States',
            latitude: 40.7128,
            longitude: -74.0060,
          },
          hours: {
            monday: { is_open: true, open_time: '09:00', close_time: '22:00' },
            tuesday: { is_open: true, open_time: '09:00', close_time: '22:00' },
            wednesday: { is_open: true, open_time: '09:00', close_time: '22:00' },
            thursday: { is_open: true, open_time: '09:00', close_time: '22:00' },
            friday: { is_open: true, open_time: '09:00', close_time: '23:00' },
            saturday: { is_open: true, open_time: '10:00', close_time: '23:00' },
            sunday: { is_open: false, open_time: null, close_time: null },
          },
          services: [
            {
              id: '1',
              name: 'Dine-in Service',
              description: 'Enjoy our delicious food in our cozy restaurant',
              price_range: '$15-50',
              category: 'Dining',
            },
            {
              id: '2',
              name: 'Takeout',
              description: 'Order online and pick up your food',
              price_range: '$10-40',
              category: 'Takeout',
            },
          ],
          images: [],
          social_media: {
            facebook: 'https://facebook.com/samplerestaurant',
            instagram: 'https://instagram.com/samplerestaurant',
            twitter: null,
            linkedin: null,
            youtube: null,
            tiktok: null,
          },
          google_business_id: 'g_123456789',
          seo_score: 78,
          last_google_update: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      setBusinesses(mockBusinesses);
      setSelectedBusiness(mockBusinesses[0]);
      setLoadingBusinesses(false);
    }
  }, [loading, user?.id]);

  const handleSaveBusiness = async (businessData: Partial<BusinessProfile>) => {
    try {
      if (isEditing && selectedBusiness) {
        // Update existing business
        const updatedBusiness = { ...selectedBusiness, ...businessData };
        setBusinesses(prev => 
          prev.map(b => b.id === selectedBusiness.id ? updatedBusiness : b)
        );
        setSelectedBusiness(updatedBusiness);
      } else {
        // Create new business
        const newBusiness: BusinessProfile = {
          id: Date.now().toString(),
          ...businessData,
          user_id: user?.id || '',
          seo_score: 0,
          images: [],
          google_business_id: null,
          last_google_update: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as BusinessProfile;

        setBusinesses(prev => [...prev, newBusiness]);
        setSelectedBusiness(newBusiness);
      }

      setShowForm(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving business:', error);
    }
  };

  const handleEditBusiness = (business: BusinessProfile) => {
    setSelectedBusiness(business);
    setIsEditing(true);
    setShowForm(true);
  };

  if (loading || loadingBusinesses) {
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
          <h1 className="text-2xl font-bold mb-4">Please sign in to manage your businesses</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Business Management</h1>
          <p className="text-gray-600 mt-2">
            Manage your business information and track SEO performance
          </p>
        </div>

        {businesses.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No businesses yet</h3>
              <p className="text-gray-600 mb-6">
                Add your first business to start optimizing your Google Business presence
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Business
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Business Selection */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">Your Businesses</h2>
                <Badge variant="outline">{businesses.length} business{businesses.length !== 1 ? 'es' : ''}</Badge>
              </div>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Business
              </Button>
            </div>

            {/* Business Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <Card 
                  key={business.id} 
                  className={`cursor-pointer transition-all ${
                    selectedBusiness?.id === business.id 
                      ? 'ring-2 ring-blue-500' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedBusiness(business)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{business.business_name}</CardTitle>
                        <CardDescription>{business.business_type}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditBusiness(business);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{business.address.city}, {business.address.state}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{business.phone_number}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4" />
                        <span>{business.website_url || 'No website'}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">SEO Score</span>
                        </div>
                        <Badge variant={business.seo_score >= 80 ? 'default' : 'secondary'}>
                          {business.seo_score}/100
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Business Details */}
            {selectedBusiness && (
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">SEO Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="w-5 h-5" />
                          Business Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium">Description</h4>
                          <p className="text-sm text-gray-600">{selectedBusiness.description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Address</h4>
                          <p className="text-sm text-gray-600">
                            {selectedBusiness.address.street_address}<br />
                            {selectedBusiness.address.city}, {selectedBusiness.address.state} {selectedBusiness.address.zip_code}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Contact</h4>
                          <p className="text-sm text-gray-600">
                            Phone: {selectedBusiness.phone_number}<br />
                            Email: {selectedBusiness.email}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          Business Hours
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {Object.entries(selectedBusiness.hours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between text-sm">
                              <span className="capitalize">{day}</span>
                              <span>
                                {hours.is_open 
                                  ? `${hours.open_time} - ${hours.close_time}`
                                  : 'Closed'
                                }
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="analytics">
                  <SEOAnalytics business={selectedBusiness} />
                </TabsContent>

                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Business Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Google Business Integration</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Connect your Google Business account for automatic updates
                          </p>
                          <Button variant="outline">
                            Connect Google Business
                          </Button>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Automatic Updates</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Schedule automatic updates to your Google Business profile
                          </p>
                          <Button variant="outline">
                            Configure Auto-Updates
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        )}

        {/* Business Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {isEditing ? 'Edit Business' : 'Add New Business'}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowForm(false);
                    setIsEditing(false);
                  }}
                >
                  ×
                </Button>
              </div>
              <BusinessProfileForm
                business={isEditing ? selectedBusiness : undefined}
                onSave={handleSaveBusiness}
                onCancel={() => {
                  setShowForm(false);
                  setIsEditing(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
