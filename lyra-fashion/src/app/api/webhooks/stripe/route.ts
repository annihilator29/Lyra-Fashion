import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'
import { createClient } from '@supabase/supabase-js'
import { Database, ShippingAddress } from '@/types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: NextRequest) {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
        return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })
    }

    let event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message)
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object

        try {
            // Use service role client to bypass RLS
            const supabase = createClient(supabaseUrl, supabaseServiceKey)

            // Check if order already exists (idempotency)
            const { data: existingOrder } = await supabase
                .from('orders')
                .select('id')
                .eq('stripe_payment_intent_id', paymentIntent.id)
                .single()

            if (existingOrder) {
                console.log('Order already exists for payment intent:', paymentIntent.id)
                return NextResponse.json({ received: true, existing: true })
            }

            // Extract metadata from payment intent
            const cartItems = paymentIntent.metadata.cartItems
                ? JSON.parse(paymentIntent.metadata.cartItems)
                : []

            const productIds = cartItems.map((item: any) => item.id)

            // Fetch product prices to recalculate total (security)
            const { data: products } = await supabase
                .from('products')
                .select('id, price')
                .in('id', productIds)

            if (!products || products.length === 0) {
                throw new Error('Products not found')
            }

            // Calculate total amount from products
            const productMap = new Map(products.map(p => [p.id, p.price]))
            let totalAmount = 0
            const orderItems: any[] = []

            for (const item of cartItems) {
                const price = productMap.get(item.id)
                if (price) {
                    totalAmount += price * item.qty
                    orderItems.push({
                        product_id: item.id,
                        quantity: item.qty,
                        price_at_purchase: price,
                    })
                }
            }

            // Validate total amount matches payment intent amount
            if (totalAmount !== paymentIntent.amount) {
                console.error(`Amount mismatch: Calculated ${totalAmount}, PaymentIntent ${paymentIntent.amount}`)
                // In a real scenario, you might want to flag this order for review
                // For now, we'll proceed but log the discrepancy
            }

            // Create order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: paymentIntent.metadata.userId || null,
                    status: 'paid',
                    total_amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                    stripe_payment_intent_id: paymentIntent.id,
                    shipping_address: paymentIntent.metadata.shippingAddress
                        ? JSON.parse(paymentIntent.metadata.shippingAddress) as ShippingAddress
                        : null,
                } as Database['public']['Tables']['orders']['Insert'])
                .select()
                .single()

            if (orderError) {
                throw orderError
            }

            // Create order items
            const orderItemsWithOrderId = orderItems.map(item => ({
                ...item,
                order_id: order.id,
            }))

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItemsWithOrderId as any)

            if (itemsError) {
                throw itemsError
            }

            console.log('Order created successfully:', order.id)

            // Send email notification
            try {
                // Fetch order items with product details for email
                const { data: orderWithItems } = await supabase
                    .from('orders')
                    .select('*, order_items(*, product:products(name))')
                    .eq('id', order.id)
                    .single()

                if (orderWithItems && orderWithItems.order_items) {
                    const { sendOrderConfirmationEmail } = await import('@/lib/email')

                    await sendOrderConfirmationEmail({
                        to: paymentIntent.receipt_email || 'customer@example.com', // Use receipt email from Stripe
                        orderId: order.id,
                        totalAmount: order.total_amount,
                        orderItems: orderWithItems.order_items.map((item: any) => ({
                            productName: item.product?.name || 'Product',
                            quantity: item.quantity,
                            price: item.price_at_purchase,
                        })),
                    })

                    console.log('Order confirmation email sent')
                }
            } catch (emailError: any) {
                // Log but don't fail the webhook if email fails
                console.error('Failed to send email:', emailError.message)
            }

            return NextResponse.json({ received: true, orderId: order.id })
        } catch (error: any) {
            console.error('Error creating order:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
    }

    // Return a response to acknowledge receipt of the event
    return NextResponse.json({ received: true })
}
