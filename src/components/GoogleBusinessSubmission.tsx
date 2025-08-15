'use client';

import { useState, useEffect } from 'react';
import { BusinessProfile } from '@/lib/types/business';
import { GoogleBusinessSubmissionService, type GoogleBusinessSubmission as GoogleBusinessSubmissionRecord, type GoogleBusinessOptimization } from '@/lib/google-business-submission';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Upload, 
  Target, 
  BarChart3, 
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Globe,
  Star
} from 'lucide-react';

interface GoogleBusinessSubmissionProps {
  business: BusinessProfile;
  onSubmissionComplete?: (submission: GoogleBusinessSubmissionRecord) => void;
}

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  submitted: { color: 'bg-blue-100 text-blue-800', icon: Upload },
  approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { color: 'bg-red-100 text-red-800', icon: AlertCircle },
  verified: { color: 'bg-green-100 text-green-800', icon: CheckCircle }
};

export default function GoogleBusinessSubmission({ business, onSubmissionComplete }: GoogleBusinessSubmissionProps) {
  const [submission, setSubmission] = useState<GoogleBusinessSubmissionRecord | null>(null);
  const [optimization, setOptimization] = useState<GoogleBusinessOptimization | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [insights, setInsights] = useState<any>(null);

  const googleService = new GoogleBusinessSubmissionService('mock-token');

  useEffect(() => {
    loadOptimizationRecommendations();
  }, [business]);

  const loadOptimizationRecommendations = async () => {
    try {
      const recommendations = await googleService.getOptimizationRecommendations(business);
      setOptimization(recommendations);
    } catch (error) {
      console.error('Error loading optimization recommendations:', error);
    }
  };

  const handleSubmitNewListing = async () => {
    setLoading(true);
    try {
      const newSubmission = await googleService.submitNewBusiness(business);
      setSubmission(newSubmission);
      setShowVerification(true);
      onSubmissionComplete?.(newSubmission);
    } catch (error) {
      console.error('Error submitting business:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimExisting = async () => {
    setLoading(true);
    try {
      const newSubmission = await googleService.claimExistingBusiness('mock-place-id', business);
      setSubmission(newSubmission);
      setShowVerification(true);
      onSubmissionComplete?.(newSubmission);
    } catch (error) {
      console.error('Error claiming business:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyBusiness = async () => {
    if (!submission) return;
    
    setLoading(true);
    try {
      const isVerified = await googleService.verifyBusiness(submission.id, verificationCode);
      if (isVerified) {
        setSubmission(prev => prev ? { ...prev, status: 'verified', verified_at: new Date().toISOString() } : null);
        setShowVerification(false);
      } else {
        alert('Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying business:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadInsights = async () => {
    if (!business.google_business_id) return;
    
    try {
      const businessInsights = await googleService.getBusinessInsights(business.google_business_id);
      setInsights(businessInsights);
    } catch (error) {
      console.error('Error loading insights:', error);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getOptimizationScore = () => {
    if (!optimization) return 0;
    return optimization.score;
  };

  const getOptimizationColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Google Business Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Google Business Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!business.google_business_id ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <AlertCircle className="w-4 h-4" />
                <span>Your business is not yet listed on Google Business</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Button 
                  onClick={handleSubmitNewListing} 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Submit New Listing
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleClaimExisting}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Target className="w-4 h-4" />
                  Claim Existing Listing
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">Connected to Google Business</span>
                <Badge variant="outline">{business.google_business_id}</Badge>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" onClick={loadInsights}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Insights
                </Button>
                <Button variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Optimization
                </Button>
                <Button variant="outline">
                  <Globe className="w-4 h-4 mr-2" />
                  Manage Profile
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submission Status */}
      {submission && (
        <Card>
          <CardHeader>
            <CardTitle>Submission Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {(() => {
                  const config = statusConfig[submission.status];
                  const Icon = config.icon;
                  return (
                    <>
                      <Icon className="w-5 h-5" />
                      <Badge className={config.color}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </Badge>
                    </>
                  );
                })()}
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Submitted: {new Date(submission.submitted_at).toLocaleDateString()}</p>
                {submission.verification_method && (
                  <p>Verification Method: {submission.verification_method}</p>
                )}
              </div>

              {showVerification && submission.verification_method && (
                <div className="space-y-3 p-4 border rounded-lg">
                  <h4 className="font-medium">Verify Your Business</h4>
                  <p className="text-sm text-gray-600">
                    Enter the verification code sent to your {submission.verification_method}
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter verification code"
                      className="max-w-xs"
                    />
                    <Button onClick={handleVerifyBusiness} disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Optimization Recommendations */}
      {optimization && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Optimization Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold">
                  <span className={getOptimizationColor(optimization.score)}>
                    {optimization.score}/100
                  </span>
                </div>
                <Progress value={optimization.score} className="flex-1" />
              </div>
              
              <div className="space-y-3">
                {optimization.recommendations.map((rec) => (
                  <div key={rec.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{rec.title}</h4>
                      <Badge variant={rec.priority === 'high' ? 'default' : 'secondary'}>
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                    <div className="space-y-2">
                      {rec.action_items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Business Insights */}
      {insights && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Business Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{formatNumber(insights.views.total)}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{formatNumber(insights.actions.phone_calls)}</div>
                <div className="text-sm text-gray-600">Phone Calls</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{insights.reviews.average_rating}</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{formatNumber(insights.search_queries.total)}</div>
                <div className="text-sm text-gray-600">Search Queries</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
