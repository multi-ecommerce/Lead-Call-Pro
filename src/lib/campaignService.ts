import { supabase } from './supabaseClient';
import { 
  Campaign, 
  CampaignStatus, 
  CampaignType, 
  AdCreative, 
  CallData, 
  CampaignAnalytics,
  CampaignSettings,
  CAMPAIGN_TEMPLATES 
} from './types/campaign';

export class CampaignService {
  // Get all campaigns for a user
  static async getUserCampaigns(userId: string): Promise<Campaign[]> {
    const { data, error } = await supabase
      .from('campaigns')
      .select(`
        *,
        business:businesses(business_name, business_type),
        performance_metrics:campaign_metrics(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get a single campaign by ID
  static async getCampaign(campaignId: string): Promise<Campaign | null> {
    const { data, error } = await supabase
      .from('campaigns')
      .select(`
        *,
        business:businesses(*),
        ad_creatives:ad_creatives(*),
        calls:call_data(*),
        analytics:campaign_analytics(*),
        settings:campaign_settings(*)
      `)
      .eq('id', campaignId)
      .single();

    if (error) throw error;
    return data;
  }

  // Create a new campaign
  static async createCampaign(campaignData: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>): Promise<Campaign> {
    const { data, error } = await supabase
      .from('campaigns')
      .insert([campaignData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update campaign
  static async updateCampaign(campaignId: string, updates: Partial<Campaign>): Promise<Campaign> {
    const { data, error } = await supabase
      .from('campaigns')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', campaignId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete campaign
  static async deleteCampaign(campaignId: string): Promise<void> {
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', campaignId);

    if (error) throw error;
  }

  // Change campaign status
  static async updateCampaignStatus(campaignId: string, status: CampaignStatus): Promise<Campaign> {
    return this.updateCampaign(campaignId, { status });
  }

  // Get campaign analytics
  static async getCampaignAnalytics(campaignId: string, startDate?: string, endDate?: string): Promise<CampaignAnalytics[]> {
    let query = supabase
      .from('campaign_analytics')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('date', { ascending: true });

    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  // Get campaign calls
  static async getCampaignCalls(campaignId: string): Promise<CallData[]> {
    const { data, error } = await supabase
      .from('call_data')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get ad creatives for a campaign
  static async getCampaignCreatives(campaignId: string): Promise<AdCreative[]> {
    const { data, error } = await supabase
      .from('ad_creatives')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Create ad creative
  static async createAdCreative(creativeData: Omit<AdCreative, 'id' | 'created_at'>): Promise<AdCreative> {
    const { data, error } = await supabase
      .from('ad_creatives')
      .insert([creativeData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update ad creative
  static async updateAdCreative(creativeId: string, updates: Partial<AdCreative>): Promise<AdCreative> {
    const { data, error } = await supabase
      .from('ad_creatives')
      .update(updates)
      .eq('id', creativeId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get campaign settings
  static async getCampaignSettings(campaignId: string): Promise<CampaignSettings | null> {
    const { data, error } = await supabase
      .from('campaign_settings')
      .select('*')
      .eq('campaign_id', campaignId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
    return data;
  }

  // Update campaign settings
  static async updateCampaignSettings(campaignId: string, settings: Partial<CampaignSettings>): Promise<CampaignSettings> {
    const { data, error } = await supabase
      .from('campaign_settings')
      .upsert([{ campaign_id: campaignId, ...settings }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get campaign performance summary
  static async getCampaignPerformance(campaignId: string): Promise<{
    total_calls: number;
    total_spend: number;
    conversion_rate: number;
    cost_per_lead: number;
    roi: number;
  }> {
    const { data, error } = await supabase
      .from('campaigns')
      .select('performance_metrics')
      .eq('id', campaignId)
      .single();

    if (error) throw error;
    
    const metrics = data?.performance_metrics || {
      total_calls: 0,
      total_spend: 0,
      total_conversions: 0,
      cost_per_lead: 0,
      roi: 0
    };

    return {
      total_calls: metrics.total_calls,
      total_spend: metrics.total_spend,
      conversion_rate: metrics.total_calls > 0 ? (metrics.total_conversions / metrics.total_calls) * 100 : 0,
      cost_per_lead: metrics.cost_per_lead,
      roi: metrics.roi
    };
  }

  // Create campaign from template
  static async createFromTemplate(
    userId: string,
    businessId: string,
    templateKey: keyof typeof CAMPAIGN_TEMPLATES,
    customData: Partial<Campaign>
  ): Promise<Campaign> {
    const template = CAMPAIGN_TEMPLATES[templateKey];
    
    const campaignData: Omit<Campaign, 'id' | 'created_at' | 'updated_at'> = {
      user_id: userId,
      business_id: businessId,
      name: template.name,
      description: template.description,
      status: 'draft',
      type: template.type,
      budget: 1000, // Default budget
      daily_budget: 50, // Default daily budget
      start_date: new Date().toISOString(),
      end_date: null,
      target_location: {
        city: '',
        state: '',
        zip_codes: [],
        radius_miles: 25
      },
      target_audience: template.target_audience,
      ad_platforms: [],
      keywords: template.keywords,
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
      },
      ...customData
    };

    return this.createCampaign(campaignData);
  }

  // Get campaign statistics
  static async getCampaignStats(userId: string): Promise<{
    total_campaigns: number;
    active_campaigns: number;
    total_spend: number;
    total_calls: number;
    average_roi: number;
  }> {
    const { data, error } = await supabase
      .from('campaigns')
      .select('status, performance_metrics')
      .eq('user_id', userId);

    if (error) throw error;

    const campaigns = data || [];
    const total_campaigns = campaigns.length;
    const active_campaigns = campaigns.filter(c => c.status === 'active').length;
    
    const total_spend = campaigns.reduce((sum, c) => sum + (c.performance_metrics?.total_spend || 0), 0);
    const total_calls = campaigns.reduce((sum, c) => sum + (c.performance_metrics?.total_calls || 0), 0);
    const total_roi = campaigns.reduce((sum, c) => sum + (c.performance_metrics?.roi || 0), 0);
    const average_roi = total_campaigns > 0 ? total_roi / total_campaigns : 0;

    return {
      total_campaigns,
      active_campaigns,
      total_spend,
      total_calls,
      average_roi
    };
  }
}
