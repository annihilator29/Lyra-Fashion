'use server'

import { stripe } from '@/lib/stripe/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Schema for cart items passed from client
const cartItemSchema = z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    variantId: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
})

const checkoutSchema = z.object({
    items: z.array(cartItemSchema).min(1, 'Cart must have at least one item'),
})

/**
 * Create a Stripe Payment Intent for the given cart items.
 * Validates product IDs and calculates the total amount server-side for security.
 */
export async function createPaymentIntent(items: Array<{
    productId: string
    quantity: number
    variantId?: string
    size?: string
    color?: string
}>) {
    try {
        // Validate input
        const validatedFields = checkoutSchema.safeParse({ items })

        if (!validatedFields.success) {
            return {
                error: 'Invalid cart data: ' + validatedFields.error.errors[0].message,
            }
        }

        // Get product prices from database (server-side validation)
        const supabase = await createClient()
        const productIds = items.map((item) => item.productId)

        const { data: products, error: dbError } = await supabase
            .from('products')
            .select('id, price')
            .in('id', productIds)

        if (dbError || !products) {
            return {
                error: 'Failed to fetch product information',
            }
        }

        // Calculate total amount server-side (NEVER trust client)
        let totalAmount = 0
        const productMap = new Map(products.map((p) => [p.id, p.price]))

        for (const item of items) {
            const price = productMap.get(item.productId)
            if (!price) {
                return {
                    error: `Invalid product ID: ${item.productId}`,
                }
            }
            totalAmount += price * item.quantity
        }

        // Convert to cents for Stripe (Stripe uses smallest currency unit)
        const amountInCents = Math.round(totalAmount * 100)

        // Validate minimum amount (Stripe requires at least $0.50 USD)
        if (amountInCents < 50) {
            return {
                error: 'Order total must be at least $0.50',
            }
        }

        // Create Payment Intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                productIds: productIds.join(','),
                cartItems: JSON.stringify(items.map(item => ({ id: item.productId, qty: item.quantity }))),
                itemCount: items.reduce((sum, item) => sum + item.quantity, 0).toString(),
            },
        })

        return {
            clientSecret: paymentIntent.client_secret,
            amount: totalAmount,
        }
    } catch (error: any) {
        console.error('Payment Intent creation failed:', error)
        return {
            error: error?.message || 'Failed to initialize payment. Please try again.',
        }
    }
}
