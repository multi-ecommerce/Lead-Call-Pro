import { BusinessProfile } from '@/lib/types/business';

export interface GoogleBusinessSubmission {
  id: string;
  business_id: string;
  user_id: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected' | 'verified';
  submission_type: 'new_listing' | 'claim_existing' | 'update_info';
  google_place_id?: string;
  google_business_id?: string;
  verification_method?: 'postcard' | 'phone' | 'email' | 'video_call';
  verification_code?: string;
  verification_attempts: number;
  submitted_at: string;
  verified_at?: string;
  rejection_reason?: string;
  notes?: string;
}

export interface GoogleBusinessInsights {
  views: { total: number; search: number; maps: number };
  actions: { website_clicks: number; phone_calls: number; direction_requests: number };
  reviews: { total: number; average_rating: number; recent_reviews: number };
  search_queries: { total: number; direct: number; discovery: number };
}

export interface GoogleBusinessOptimization {
  score: number;
  recommendations: {
    id: string;
    category: 'photos' | 'information' | 'reviews' | 'posts' | 'hours' | 'contact';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    action_items: string[];
    impact_score: number;
    completed: boolean;
  }[];
}

export class GoogleBusinessSubmissionService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  // Submit new business listing
  async submitNewBusiness(businessData: BusinessProfile): Promise<GoogleBusinessSubmission> {
    try {
      const submission: GoogleBusinessSubmission = {
        id: Date.now().toString(),
        business_id: businessData.id,
        user_id: businessData.user_id,
        status: 'submitted',
        submission_type: 'new_listing',
        verification_method: 'postcard',
        verification_attempts: 0,
        submitted_at: new Date().toISOString()
      };

      // Mock API call to Google Business
      await this.mockGoogleAPICall('submit', businessData);
      
      return submission;
    } catch (error) {
      console.error('Error submitting new business:', error);
      throw error;
    }
  }

  // Claim existing business
  async claimExistingBusiness(placeId: string, businessData: BusinessProfile): Promise<GoogleBusinessSubmission> {
    try {
      const submission: GoogleBusinessSubmission = {
        id: Date.now().toString(),
        business_id: businessData.id,
        user_id: businessData.user_id,
        status: 'submitted',
        submission_type: 'claim_existing',
        google_place_id: placeId,
        verification_method: 'phone',
        verification_attempts: 0,
        submitted_at: new Date().toISOString()
      };

      await this.mockGoogleAPICall('claim', { placeId, businessData });
      
      return submission;
    } catch (error) {
      console.error('Error claiming existing business:', error);
      throw error;
    }
  }

  // Verify business ownership
  async verifyBusiness(submissionId: string, verificationCode: string): Promise<boolean> {
    try {
      // Mock verification
      const isValid = verificationCode === '123456';
      
      if (isValid) {
        await this.updateSubmissionStatus(submissionId, 'verified');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error verifying business:', error);
      return false;
    }
  }

  // Get business insights
  async getBusinessInsights(googleBusinessId: string): Promise<GoogleBusinessInsights> {
    try {
      // Mock insights data
      return {
        views: { total: 1250, search: 800, maps: 450 },
        actions: { website_clicks: 45, phone_calls: 23, direction_requests: 67 },
        reviews: { total: 28, average_rating: 4.2, recent_reviews: 5 },
        search_queries: { total: 156, direct: 89, discovery: 67 }
      };
    } catch (error) {
      console.error('Error getting business insights:', error);
      throw error;
    }
  }

  // Get optimization recommendations
  async getOptimizationRecommendations(businessData: BusinessProfile): Promise<GoogleBusinessOptimization> {
    try {
      const recommendations = [
        {
          id: '1',
          category: 'photos' as const,
          priority: 'high' as const,
          title: 'Add More Business Photos',
          description: 'Businesses with more photos receive 42% more requests for directions',
          action_items: ['Add exterior photos', 'Add interior photos', 'Add product/service photos'],
          impact_score: 85,
          completed: false
        },
        {
          id: '2',
          category: 'information' as const,
          priority: 'medium' as const,
          title: 'Complete Business Description',
          description: 'A detailed description helps customers understand your business better',
          action_items: ['Add detailed service descriptions', 'Include unique selling points'],
          impact_score: 65,
          completed: false
        },
        {
          id: '3',
          category: 'reviews' as const,
          priority: 'high' as const,
          title: 'Encourage Customer Reviews',
          description: 'Positive reviews improve your visibility in search results',
          action_items: ['Ask satisfied customers for reviews', 'Respond to existing reviews'],
          impact_score: 90,
          completed: false
        }
      ];

      return {
        score: 72,
        recommendations
      };
    } catch (error) {
      console.error('Error getting optimization recommendations:', error);
      return { score: 0, recommendations: [] };
    }
  }

  // Private helper methods
  private async mockGoogleAPICall(action: string, data: any): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Mock Google API call: ${action}`, data);
  }

  private async updateSubmissionStatus(submissionId: string, status: GoogleBusinessSubmission['status']): Promise<void> {
    console.log(`Updating submission ${submissionId} to status: ${status}`);
  }
}

// Business growth optimization tools
export class GoogleBusinessGrowthTools {
  static generateOptimizedDescription(businessData: BusinessProfile): string {
    const services = businessData.services.map(s => s.name).join(', ');
    return `${businessData.business_name} is a leading ${businessData.business_type} serving ${businessData.address.city}, ${businessData.address.state}. We specialize in ${services}. Contact us today for exceptional service!`;
  }

  static getHoursOptimizationSuggestions(hours: any): string[] {
    const suggestions = [];
    
    if (!hours.monday.is_open && !hours.tuesday.is_open) {
      suggestions.push('Consider opening on weekdays to capture more business');
    }
    
    if (hours.saturday.is_open && hours.sunday.is_open) {
      suggestions.push('Great! Being open on weekends can increase visibility');
    }
    
    return suggestions;
  }

  static getPhotoOptimizationSuggestions(images: any[]): string[] {
    const suggestions = [];
    
    if (images.length < 5) {
      suggestions.push('Add more photos to increase engagement (aim for 10+ photos)');
    }
    
    const photoTypes = images.map(img => img.type);
    const requiredTypes = ['exterior', 'interior', 'product'];
    
    requiredTypes.forEach(type => {
      if (!photoTypes.includes(type)) {
        suggestions.push(`Add ${type} photos to showcase your business`);
      }
    });
    
    return suggestions;
  }
}
