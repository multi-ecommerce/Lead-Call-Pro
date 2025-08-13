export interface BusinessProfile {
  id: string;
  user_id: string;
  business_name: string;
  business_type: string;
  description: string;
  website_url: string;
  phone_number: string;
  email: string;
  address: BusinessAddress;
  hours: BusinessHours;
  services: BusinessService[];
  images: BusinessImage[];
  social_media: SocialMediaLinks;
  google_business_id: string | null;
  seo_score: number;
  last_google_update: string | null;
  created_at: string;
  updated_at: string;
}

export interface BusinessAddress {
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  is_open: boolean;
  open_time: string | null;
  close_time: string | null;
}

export interface BusinessService {
  id: string;
  name: string;
  description: string;
  price_range: string;
  category: string;
}

export interface BusinessImage {
  id: string;
  url: string;
  alt_text: string;
  type: 'logo' | 'interior' | 'exterior' | 'product' | 'team';
  is_primary: boolean;
}

export interface SocialMediaLinks {
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  linkedin: string | null;
  youtube: string | null;
  tiktok: string | null;
}

export interface SEOData {
  id: string;
  business_id: string;
  keywords: string[];
  meta_description: string;
  title_tags: string[];
  local_keywords: string[];
  competitor_analysis: CompetitorData[];
  seo_recommendations: SEORecommendation[];
  last_analysis: string;
}

export interface CompetitorData {
  business_name: string;
  website: string;
  rating: number;
  review_count: number;
  keywords: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface SEORecommendation {
  id: string;
  type: 'content' | 'technical' | 'local' | 'social';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action_items: string[];
  estimated_impact: string;
  is_completed: boolean;
}

export interface GoogleBusinessUpdate {
  id: string;
  business_id: string;
  update_type: 'hours' | 'info' | 'posts' | 'reviews' | 'photos';
  status: 'pending' | 'completed' | 'failed';
  data: any;
  scheduled_for: string;
  completed_at: string | null;
  error_message: string | null;
}

export interface BusinessAnalytics {
  id: string;
  business_id: string;
  date: string;
  google_views: number;
  google_searches: number;
  website_clicks: number;
  phone_calls: number;
  direction_requests: number;
  review_count: number;
  average_rating: number;
  seo_score: number;
}

// Business categories for better organization
export const BUSINESS_CATEGORIES = [
  'Restaurant & Food',
  'Healthcare & Medical',
  'Automotive',
  'Home & Garden',
  'Professional Services',
  'Retail',
  'Beauty & Personal Care',
  'Fitness & Wellness',
  'Education',
  'Technology',
  'Real Estate',
  'Entertainment',
  'Travel & Tourism',
  'Financial Services',
  'Legal Services',
  'Construction',
  'Manufacturing',
  'Other'
] as const;

export type BusinessCategory = typeof BUSINESS_CATEGORIES[number];

// SEO improvement suggestions based on business type
export const SEO_SUGGESTIONS = {
  'Restaurant & Food': [
    'Add menu items with photos',
    'Include dietary restrictions and allergens',
    'Highlight popular dishes',
    'Add delivery and takeout options',
    'Include chef bios and restaurant history'
  ],
  'Healthcare & Medical': [
    'List accepted insurance providers',
    'Include doctor credentials and specialties',
    'Add patient forms and resources',
    'Highlight emergency services',
    'Include testimonials and success stories'
  ],
  'Automotive': [
    'List services and pricing',
    'Include warranty information',
    'Add appointment booking',
    'Highlight certifications and awards',
    'Include customer testimonials'
  ],
  'Professional Services': [
    'List service areas and expertise',
    'Include case studies and results',
    'Add client testimonials',
    'Highlight certifications and awards',
    'Include free consultation offers'
  ]
} as const; 