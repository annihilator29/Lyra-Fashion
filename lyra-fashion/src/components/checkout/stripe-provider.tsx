'use client'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { ReactNode } from 'react'

// Load Stripe publishable key
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

interface StripeProviderProps {
    children: ReactNode
    clientSecret: string
}

/**
 * Provider component that wraps the payment form with Stripe Elements context.
 * This component initializes Stripe.js and provides it to child components.
 */
export function StripeProvider({ children, clientSecret }: StripeProviderProps) {
    if (!clientSecret) {
        return null
    }

    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret,
                appearance: {
                    theme: 'stripe',
                    variables: {
                        colorPrimary: '#000000',
                        colorBackground: '#ffffff',
                        colorText: '#30313d',
                        colorDanger: '#df1b41',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        spacingUnit: '4px',
                        borderRadius: '8px',
                    },
                },
            }}
        >
            {children}
        </Elements>
    )
}
