import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe-server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
]);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return new NextResponse('Webhook signature verification failed', { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object;
          await handleCheckoutSessionCompleted(session);
          break;
        }
        case 'customer.subscription.created':
        case 'customer.subscription.updated': {
          const subscription = event.data.object;
          await handleSubscriptionUpdated(subscription);
          break;
        }
        case 'customer.subscription.deleted': {
          const subscription = event.data.object;
          await handleSubscriptionDeleted(subscription);
          break;
        }
        case 'invoice.payment_succeeded': {
          const invoice = event.data.object;
          await handleInvoicePaymentSucceeded(invoice);
          break;
        }
        case 'invoice.payment_failed': {
          const invoice = event.data.object;
          await handleInvoicePaymentFailed(invoice);
          break;
        }
        default:
          console.warn('Unhandled relevant event:', event.type);
      }
    } catch (error) {
      console.error('Error handling webhook event:', error);
      return new NextResponse('Webhook handler failed', { status: 500 });
    }
  }

  return new NextResponse('Webhook processed successfully', { status: 200 });
}

async function handleCheckoutSessionCompleted(session: any) {
  const { customer, subscription, metadata } = session;
  const userId = metadata?.userId;

  if (!userId || !subscription) return;

  // Update or create subscription record
  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      stripe_subscription_id: subscription,
      status: 'active',
      price_id: session.line_items?.data?.[0]?.price?.id || 'price_free',
      quantity: session.line_items?.data?.[0]?.quantity || 1,
      cancel_at_period_end: false,
      current_period_end: new Date(session.expires_at * 1000).toISOString(),
    });

  if (error) {
    console.error('Error updating subscription:', error);
  }
}

async function handleSubscriptionUpdated(subscription: any) {
  const { id, status, current_period_end, cancel_at_period_end, items } = subscription;

  // Find user by stripe subscription id
  const { data: existingSub } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_subscription_id', id)
    .single();

  if (!existingSub) return;

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status,
      current_period_end: new Date(current_period_end * 1000).toISOString(),
      cancel_at_period_end,
      price_id: items?.data?.[0]?.price?.id || 'price_free',
      quantity: items?.data?.[0]?.quantity || 1,
    })
    .eq('stripe_subscription_id', id);

  if (error) {
    console.error('Error updating subscription:', error);
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  const { id } = subscription;

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      cancel_at_period_end: true,
    })
    .eq('stripe_subscription_id', id);

  if (error) {
    console.error('Error canceling subscription:', error);
  }
}

async function handleInvoicePaymentSucceeded(invoice: any) {
  const { subscription, customer } = invoice;

  if (!subscription) return;

  // Update subscription status to active
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'active',
    })
    .eq('stripe_subscription_id', subscription);

  if (error) {
    console.error('Error updating subscription status:', error);
  }
}

async function handleInvoicePaymentFailed(invoice: any) {
  const { subscription, customer } = invoice;

  if (!subscription) return;

  // Update subscription status to past_due
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'past_due',
    })
    .eq('stripe_subscription_id', subscription);

  if (error) {
    console.error('Error updating subscription status:', error);
  }
} 