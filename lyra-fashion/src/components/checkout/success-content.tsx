'use client'

import { useEffect, useState } from 'react'
import { useCartStore } from '@/lib/store/cart'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SuccessContentProps {
    paymentIntentId?: string
    initialOrder: any | null
}

export function SuccessContent({ paymentIntentId, initialOrder }: SuccessContentProps) {
    const { clearCart } = useCartStore()
    const router = useRouter()
    const [polling, setPolling] = useState(!initialOrder)

    useEffect(() => {
        if (initialOrder) {
            clearCart()
        }
    }, [initialOrder, clearCart])

    useEffect(() => {
        if (!polling || !paymentIntentId) return

        const interval = setInterval(() => {
            router.refresh()
        }, 2000)

        return () => clearInterval(interval)
    }, [polling, paymentIntentId, router])

    useEffect(() => {
        if (initialOrder) {
            setPolling(false)
        }
    }, [initialOrder])

    if (!paymentIntentId) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-red-600">Invalid Request</h1>
                <p className="mt-2 text-gray-600">Missing payment information.</p>
                <Link href="/shop" className="mt-4 inline-block">
                    <Button>Return to Shop</Button>
                </Link>
            </div>
        )
    }

    if (polling) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <Loader2 className="h-16 w-16 animate-spin text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold">Finalizing your order...</h2>
                <p className="text-gray-500">Please wait while we confirm your payment.</p>
            </div>
        )
    }

    if (!initialOrder) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-red-600">Order Not Found</h1>
                <p className="mt-2 text-gray-600">We could not verify your order details. Please contact support.</p>
                <p className="text-sm text-gray-500 mt-1">Payment ID: {paymentIntentId}</p>
                <Link href="/shop" className="mt-4 inline-block">
                    <Button>Return to Shop</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center text-green-600 flex flex-col items-center gap-2">
                            <CheckCircle className="h-12 w-12" />
                            Order Confirmed!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <p className="text-gray-600">Thank you for your purchase.</p>
                            <p className="text-sm text-gray-500">Order ID: {initialOrder.id}</p>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2">Order Summary</h3>
                            {initialOrder.order_items?.map((item: any) => (
                                <div key={item.id} className="flex justify-between py-2 text-sm">
                                    <span>{item.product?.name || 'Product'} x {item.quantity}</span>
                                    <span>${((item.price_at_purchase * item.quantity) / 100).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                                <span>Total</span>
                                <span>${(initialOrder.total_amount / 100).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Link href="/shop" className="w-full">
                                <Button className="w-full">Continue Shopping</Button>
                            </Link>
                            <Link href="/account/orders" className="w-full">
                                <Button variant="outline" className="w-full">View Order History</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
