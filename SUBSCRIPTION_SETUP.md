# SaaS Subscription System Setup Guide

This guide will help you set up the complete SaaS subscription system for Lead Call Pro.

## 🚀 Features Implemented

### Authentication & User Management
- ✅ Supabase authentication with email/password
- ✅ User profiles with role-based access
- ✅ Protected routes with middleware
- ✅ AuthContext for global state management

### Subscription System
- ✅ Three-tier pricing plans (Free, Pro, Enterprise)
- ✅ Stripe integration for payments
- ✅ Subscription management dashboard
- ✅ Usage tracking and limits
- ✅ Customer portal for billing management

### Payment Processing
- ✅ Stripe checkout sessions
- ✅ Webhook handling for subscription events
- ✅ Automatic subscription status updates
- ✅ Payment failure handling

## 📋 Prerequisites

1. **Supabase Account** - For authentication and database
2. **Stripe Account** - For payment processing
3. **Node.js 18+** - For development

## 🔧 Environment Setup

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Supabase Database Setup

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL,
  price_id TEXT NOT NULL,
  quantity INTEGER,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO subscriptions (user_id, status, price_id)
  VALUES (NEW.id, 'active', 'price_free');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### 3. Stripe Setup

1. **Create Products and Prices** in your Stripe dashboard:
   - Free Plan: `price_free` (no price needed)
   - Pro Plan: `price_pro` ($49/month)
   - Enterprise Plan: `price_enterprise` ($199/month)

2. **Set up Webhooks** in Stripe dashboard:
   - Endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

3. **Get Webhook Secret** from the webhook details page

## 🛠 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)**

## 📱 Usage

### For Users

1. **Sign Up**: Visit `/sign-up` to create an account
2. **Choose Plan**: Visit `/pricing` to view and select a plan
3. **Manage Subscription**: Use the dashboard to view usage and manage billing
4. **Upgrade/Downgrade**: Use the customer portal to change plans

### For Developers

1. **Authentication**: Use `useAuth()` hook in components
2. **Subscription Data**: Access via `useAuth().subscription`
3. **Usage Tracking**: Implement in `UsageTracker` component
4. **Webhooks**: Handle in `/api/webhooks/stripe/route.ts`

## 🔒 Security Features

- **Row Level Security** on all database tables
- **Protected routes** with middleware
- **Stripe webhook signature verification**
- **Environment variable protection**
- **Type-safe API endpoints**

## 📊 Monitoring

### Key Metrics to Track

1. **Subscription Metrics:**
   - Monthly Recurring Revenue (MRR)
   - Churn rate
   - Conversion rate from free to paid

2. **Usage Metrics:**
   - Feature usage by plan
   - Usage limits and upgrades
   - Customer satisfaction

3. **Payment Metrics:**
   - Failed payment rate
   - Payment method updates
   - Refund requests

## 🚨 Troubleshooting

### Common Issues

1. **Webhook failures**: Check webhook secret and endpoint URL
2. **Database errors**: Verify RLS policies and table structure
3. **Authentication issues**: Check Supabase configuration
4. **Payment failures**: Verify Stripe keys and webhook setup

### Debug Mode

Enable debug logging by adding to your environment:
```env
DEBUG=true
```

## 🔄 Deployment

### Production Checklist

- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Set up production Stripe webhook endpoint
- [ ] Configure production Supabase instance
- [ ] Set up monitoring and logging
- [ ] Test payment flows in production
- [ ] Set up backup and recovery procedures

### Environment Variables for Production

```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## 📚 API Reference

### Authentication Endpoints

- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-out` - User logout

### Subscription Endpoints

- `POST /api/create-checkout-session` - Create Stripe checkout
- `POST /api/create-portal-session` - Create customer portal
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

### Database Tables

- `profiles` - User profile information
- `subscriptions` - Subscription data and status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact the development team or create an issue in the repository. 