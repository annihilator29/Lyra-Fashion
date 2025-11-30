import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  // Warn instead of throw during build, but throw at runtime if used
  console.warn('STRIPE_SECRET_KEY is not set in environment variables')
}

// Initialize Stripe with server-side secret key
export const stripe = new Stripe(stripeSecretKey || 'dummy_key_for_build', {
  apiVersion: '2025-11-17.clover',
  appInfo: {
    name: 'Lyra Fashion',
    version: '0.1.0',
  },
})
