'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { BusinessProfile } from '@/lib/types/business';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Eye, 
  Phone, 
  MapPin, 
  Star, 
  Target, 
  AlertCircle, 
  CheckCircle,
  BarChart3
} from 'lucide-react';

interface SEOAnalyticsProps {
  business: BusinessProfile;
}

export default function SEOAnalytics({ business }: SEOAnalyticsProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Mock analytics data
  const analytics = {
    google_views: 1250,
    phone_calls: 23,
    direction_requests: 45,
    average_rating: 4.2,
    review_count: 67,
    seo_score: 78,
  };

  const seoRecommendations = [
    {
      id: '1',
      title: 'Add More Photos',
      description: 'Add high-quality photos of your business',
      priority: 'high',
      is_completed: false,
    },
    {
      id: '2',
      title: 'Optimize for Local Keywords',
      description: 'Target location-specific keywords',
      priority: 'medium',
      is_completed: true,
    }
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* SEO Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            SEO Performance Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(analytics.seo_score)}`}>
                {analytics.seo_score}
              </div>
              <div className="text-sm text-gray-600">out of 100</div>
            </div>
            <div className="flex-1">
              <Progress value={analytics.seo_score} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">Google Views</span>
            </div>
            <div className="text-2xl font-bold mt-2">{analytics.google_views.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">Phone Calls</span>
            </div>
            <div className="text-2xl font-bold mt-2">{analytics.phone_calls}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-600">Directions</span>
            </div>
            <div className="text-2xl font-bold mt-2">{analytics.direction_requests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-gray-600">Rating</span>
            </div>
            <div className="text-2xl font-bold mt-2">{analytics.average_rating}</div>
            <div className="text-sm text-gray-600 mt-1">
              {analytics.review_count} reviews
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEO Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            SEO Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {seoRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{recommendation.title}</h4>
                    <Badge variant={recommendation.priority === 'high' ? 'destructive' : 'default'}>
                      {recommendation.priority}
                    </Badge>
                    {recommendation.is_completed && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{recommendation.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={recommendation.is_completed}
                >
                  {recommendation.is_completed ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
