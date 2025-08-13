export type UserRole = 'user' | 'admin' | 'moderator';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  status: string;
  price_id: string;
  quantity: number | null;
  cancel_at_period_end: boolean | null;
  current_period_end: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

// Subscription plans
export const PLANS = {
  free: {
    name: 'Free',
    description: 'Basic features',
    price: 0,
    priceId: 'price_free',
    features: [
      'Basic lead access',
      'Email support',
      'Limited leads per month'
    ]
  },
  pro: {
    name: 'Pro',
    description: 'Professional features',
    price: 49,
    priceId: 'price_pro',
    features: [
      'Premium lead access',
      'Priority support',
      'Unlimited leads',
      'Advanced analytics'
    ]
  },
  enterprise: {
    name: 'Enterprise',
    description: 'Custom solutions',
    price: 199,
    priceId: 'price_enterprise',
    features: [
      'All Pro features',
      'Dedicated account manager',
      'Custom integrations',
      'API access'
    ]
  }
} as const;

export type PlanId = keyof typeof PLANS;
