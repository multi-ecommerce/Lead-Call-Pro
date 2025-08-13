import { BusinessProfile } from '@/lib/types/business';

// Google Business API configuration
const GOOGLE_BUSINESS_API_BASE = 'https://mybusinessbusinessinformation.googleapis.com/v1';
const GOOGLE_BUSINESS_ACCOUNTS_API = 'https://mybusinessaccountmanagement.googleapis.com/v1';

export interface GoogleBusinessLocation {
  name: string;
  locationKey: {
    placeId: string;
  };
  storeCode: string;
  locationState: {
    isVerified: boolean;
    isPublished: boolean;
  };
  profile: {
    storefrontAddress: {
      addressLines: string[];
      locality: string;
      administrativeArea: string;
      postalCode: string;
      regionCode: string;
    };
    phoneNumbers: {
      primaryPhone: string;
    };
    websiteUri: string;
    regularHours: {
      periods: Array<{
        openDay: string;
        openTime: string;
        closeDay: string;
        closeTime: string;
      }>;
    };
    specialHours: {
      specialHourPeriods: Array<{
        startDate: {
          year: number;
          month: number;
          day: number;
        };
        endDate: {
          year: number;
          month: number;
          day: number;
        };
        openTime: string;
        closeTime: string;
        closed: boolean;
      }>;
    };
    serviceArea: {
      businessType: string;
      places: {
        placeInfos: Array<{
          name: string;
          placeId: string;
        }>;
      };
    };
    labels: string[];
    adWordsLocationExtensions: {
      adPhone: string;
    };
    latlng: {
      latitude: number;
      longitude: number;
    };
    openInfo: {
      status: string;
      canReopen: boolean;
      openingDate: {
        year: number;
        month: number;
        day: number;
      };
    };
    locationKey: {
      placeId: string;
    };
    metadata: {
      mapsUri: string;
      newReviewUri: string;
    };
    priceLists: {
      priceListIds: string[];
    };
    profile: {
      description: string;
    };
    relationshipData: {
      parentChain: {
        chainNames: string[];
      };
    };
    moreHours: {
      hoursTypeId: string;
      periods: Array<{
        openDay: string;
        openTime: string;
        closeDay: string;
        closeTime: string;
      }>;
    };
  };
}

export class GoogleBusinessAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${GOOGLE_BUSINESS_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Google Business API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Get all business locations
  async getLocations(): Promise<GoogleBusinessLocation[]> {
    const accounts = await this.getAccounts();
    const locations: GoogleBusinessLocation[] = [];

    for (const account of accounts) {
      const accountLocations = await this.makeRequest(`/accounts/${account.name}/locations`);
      locations.push(...accountLocations.locations || []);
    }

    return locations;
  }

  // Get business accounts
  private async getAccounts() {
    const response = await fetch(`${GOOGLE_BUSINESS_ACCOUNTS_API}/accounts`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get accounts: ${response.statusText}`);
    }

    const data = await response.json();
    return data.accounts || [];
  }

  // Update business information
  async updateBusinessInfo(locationName: string, businessData: Partial<BusinessProfile>) {
    const updateData: any = {};

    // Update basic information
    if (businessData.description) {
      updateData.profile = {
        description: businessData.description,
      };
    }

    // Update address
    if (businessData.address) {
      updateData.storefrontAddress = {
        addressLines: [businessData.address.street_address],
        locality: businessData.address.city,
        administrativeArea: businessData.address.state,
        postalCode: businessData.address.zip_code,
        regionCode: businessData.address.country,
      };
    }

    // Update phone number
    if (businessData.phone_number) {
      updateData.phoneNumbers = {
        primaryPhone: businessData.phone_number,
      };
    }

    // Update website
    if (businessData.website_url) {
      updateData.websiteUri = businessData.website_url;
    }

    // Update business hours
    if (businessData.hours) {
      const periods = this.convertHoursToGoogleFormat(businessData.hours);
      updateData.regularHours = { periods };
    }

    const response = await this.makeRequest(`/${locationName}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });

    return response;
  }

  // Convert our hours format to Google's format
  private convertHoursToGoogleFormat(hours: any) {
    const dayMap: { [key: string]: string } = {
      monday: 'MONDAY',
      tuesday: 'TUESDAY',
      wednesday: 'WEDNESDAY',
      thursday: 'THURSDAY',
      friday: 'FRIDAY',
      saturday: 'SATURDAY',
      sunday: 'SUNDAY',
    };

    const periods: any[] = [];

    Object.entries(hours).forEach(([day, dayHours]: [string, any]) => {
      if (dayHours.is_open && dayHours.open_time && dayHours.close_time) {
        periods.push({
          openDay: dayMap[day],
          openTime: dayHours.open_time,
          closeDay: dayMap[day],
          closeTime: dayHours.close_time,
        });
      }
    });

    return periods;
  }

  // Create a Google Business post
  async createPost(locationName: string, postData: {
    summary: string;
    callToAction?: {
      actionType: string;
      url: string;
    };
    media?: {
      mediaFormat: string;
      sourceUrl: string;
    };
  }) {
    const response = await this.makeRequest(`/${locationName}/localPosts`, {
      method: 'POST',
      body: JSON.stringify(postData),
    });

    return response;
  }

  // Get business insights
  async getInsights(locationName: string, dateRange: {
    startDate: string;
    endDate: string;
  }) {
    const response = await this.makeRequest(`/${locationName}/reportInsights`, {
      method: 'POST',
      body: JSON.stringify({
        locationNames: [locationName],
        basicRequest: {
          metricRequests: [
            { metric: 'QUERIES_DIRECT' },
            { metric: 'QUERIES_INDIRECT' },
            { metric: 'VIEWS_MAPS' },
            { metric: 'VIEWS_SEARCH' },
            { metric: 'ACTIONS_WEBSITE' },
            { metric: 'ACTIONS_PHONE' },
            { metric: 'ACTIONS_DRIVING_DIRECTIONS' },
          ],
          timeRange: dateRange,
        },
      }),
    });

    return response;
  }
}

// Utility function to schedule Google Business updates
export async function scheduleGoogleBusinessUpdate(
  businessId: string,
  updateType: 'info' | 'hours' | 'posts',
  data: any,
  scheduledFor: Date
) {
  // In a real implementation, this would be stored in a database
  // and processed by a background job
  const update = {
    id: Date.now().toString(),
    business_id: businessId,
    update_type: updateType,
    status: 'pending',
    data,
    scheduled_for: scheduledFor.toISOString(),
    completed_at: null,
    error_message: null,
  };

  // Store in database (mock implementation)
  console.log('Scheduling Google Business update:', update);
  
  return update;
}

// Utility function to process pending updates
export async function processPendingUpdates() {
  // This would be called by a cron job or background worker
  // to process all pending Google Business updates
  
  // Mock implementation
  console.log('Processing pending Google Business updates...');
}

// SEO optimization suggestions based on business type
export function getSEORecommendations(businessType: string) {
  const recommendations = {
    'Restaurant & Food': [
      'Add high-quality food photos',
      'Include menu items and prices',
      'Add dietary restriction information',
      'Highlight popular dishes',
      'Include chef bios and restaurant history',
    ],
    'Healthcare & Medical': [
      'List accepted insurance providers',
      'Include doctor credentials and specialties',
      'Add patient forms and resources',
      'Highlight emergency services',
      'Include testimonials and success stories',
    ],
    'Automotive': [
      'List services and pricing',
      'Include warranty information',
      'Add appointment booking',
      'Highlight certifications and awards',
      'Include customer testimonials',
    ],
    'Professional Services': [
      'List service areas and expertise',
      'Include case studies and results',
      'Add client testimonials',
      'Highlight certifications and awards',
      'Include free consultation offers',
    ],
  };

  return recommendations[businessType as keyof typeof recommendations] || [
    'Add business photos',
    'Include detailed service descriptions',
    'Add customer testimonials',
    'Highlight unique selling points',
    'Include contact information',
  ];
}
