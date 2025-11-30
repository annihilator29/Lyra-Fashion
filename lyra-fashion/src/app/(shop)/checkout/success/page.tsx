import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { SuccessContent } from '@/components/checkout/success-content'

export default async function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ payment_intent?: string; payment_intent_client_secret?: string; redirect_status?: string }>
}) {
    // Await searchParams in Next.js 15
    const { payment_intent, redirect_status } = await searchParams

    let order = null

    if (payment_intent && redirect_status === 'succeeded') {
        const supabase = await createClient()
        const { data } = await supabase
            .from('orders')
            .select('*, order_items(*, product:products(*))')
            .eq('stripe_payment_intent_id', payment_intent)
            .single()

        order = data
    }

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SuccessContent
                paymentIntentId={payment_intent}
                initialOrder={order}
            />
        </Suspense>
    )
}
