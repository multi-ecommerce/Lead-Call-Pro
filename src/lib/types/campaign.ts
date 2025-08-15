export interface Campaign {
  id: string;
  user_id: string;
  business_id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  type: CampaignType;
  budget: number;
  daily_budget: number;
  start_date: string;
  end_date: string | null;
  target_location: CampaignLocation;
  target_audience: TargetAudience;
  ad_platforms: AdPlatform[];
  keywords: string[];
  call_tracking_number: string;
  created_at: string;
  updated_at: string;
  performance_metrics: CampaignMetrics;
}

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived';
export type CampaignType = 'google_ads' | 'facebook_ads' | 'instagram_ads' | 'multi_platform' | 'seo' | 'local_search';

export interface CampaignLocation {
  city: string;
  state: string;
  zip_codes: string[];
  radius_miles: number;
  latitude?: number;
  longitude?: number;
}

export interface TargetAudience {
  age_range: {
    min: number;
    max: number;
  };
  gender: 'all' | 'male' | 'female';
  interests: string[];
  income_level: 'all' | 'low' | 'medium' | 'high';
  device_type: 'all' | 'mobile' | 'desktop' | 'tablet';
}

export interface AdPlatform {
  platform: 'google' | 'facebook' | 'instagram' | 'bing' | 'youtube';
  status: 'active' | 'paused' | 'pending';
  budget_allocation: number; // percentage
  ad_account_id: string;
  campaign_id: string;
  performance: PlatformPerformance;
}

export interface PlatformPerformance {
  impressions: number;
  clicks: number;
  spend: number;
  calls: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpa: number;
}

export interface CampaignMetrics {
  total_impressions: number;
  total_clicks: number;
  total_spend: number;
  total_calls: number;
  total_conversions: number;
  average_ctr: number;
  average_cpc: number;
  average_cpa: number;
  roi: number;
  cost_per_lead: number;
  lead_quality_score: number;
}

export interface AdCreative {
  id: string;
  campaign_id: string;
  type: 'text' | 'image' | 'video' | 'carousel';
  title: string;
  description: string;
  image_url?: string;
  video_url?: string;
  call_to_action: string;
  status: 'active' | 'paused' | 'pending_review';
  performance: CreativePerformance;
  created_at: string;
}

export interface CreativePerformance {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  conversion_rate: number;
}

export interface CallData {
  id: string;
  campaign_id: string;
  phone_number: string;
  caller_name?: string;
  duration: number;
  status: 'answered' | 'missed' | 'voicemail' | 'busy';
  timestamp: string;
  location?: string;
  source: string;
  notes?: string;
  lead_score: number;
  converted: boolean;
}

export interface CampaignAnalytics {
  id: string;
  campaign_id: string;
  date: string;
  impressions: number;
  clicks: number;
  spend: number;
  calls: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpa: number;
  roi: number;
}

export interface CampaignSettings {
  id: string;
  campaign_id: string;
  auto_optimization: boolean;
  bid_strategy: 'manual' | 'auto' | 'target_cpa' | 'target_roas';
  target_cpa?: number;
  target_roas?: number;
  ad_schedule: AdSchedule[];
  device_bidding: DeviceBidding;
  location_bidding: LocationBidding[];
  budget_alert_threshold: number;
  performance_alert_threshold: number;
}

export interface AdSchedule {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  start_time: string;
  end_time: string;
  bid_modifier: number;
}

export interface DeviceBidding {
  mobile: number;
  desktop: number;
  tablet: number;
}

export interface LocationBidding {
  location: string;
  bid_modifier: number;
}

// Campaign templates for quick setup
export const CAMPAIGN_TEMPLATES = {
  local_service: {
    name: 'Local Service Campaign',
    description: 'Target local customers searching for your services',
    type: 'google_ads' as CampaignType,
    keywords: ['near me', 'local', 'emergency', 'same day'],
    target_audience: {
      age_range: { min: 25, max: 65 },
      gender: 'all',
      interests: ['home improvement', 'local services'],
      income_level: 'medium',
      device_type: 'mobile'
    }
  },
  brand_awareness: {
    name: 'Brand Awareness Campaign',
    description: 'Increase visibility and brand recognition',
    type: 'multi_platform' as CampaignType,
    keywords: ['brand name', 'company name'],
    target_audience: {
      age_range: { min: 18, max: 55 },
      gender: 'all',
      interests: ['business', 'professional services'],
      income_level: 'all',
      device_type: 'all'
    }
  },
  lead_generation: {
    name: 'Lead Generation Campaign',
    description: 'Focus on generating qualified leads',
    type: 'facebook_ads' as CampaignType,
    keywords: ['quote', 'estimate', 'consultation'],
    target_audience: {
      age_range: { min: 30, max: 60 },
      gender: 'all',
      interests: ['home improvement', 'professional services'],
      income_level: 'medium',
      device_type: 'all'
    }
  }
} as const;
