'use client'

import { useState } from 'react'
import {
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface PaymentFormProps {
    amount: number
    onSuccess?: () => void
    onError?: (error: string) => void
}

/**
 * Payment form component using Stripe PaymentElement.
 * Handles payment confirmation and provides loading/error states.
 */
export function PaymentForm({ amount, onSuccess, onError }: PaymentFormProps) {
    const stripe = useStripe()
    const elements = useElements()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsProcessing(true)
        setErrorMessage(null)

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/checkout/success`,
                },
            })

            if (error) {
                // This point will only be reached if there's an immediate error
                // (e.g., card declined, validation error)
                const message = error.message || 'An unexpected error occurred.'
                setErrorMessage(message)
                onError?.(message)
            } else {
                // Payment succeeded - user will be redirected to return_url
                onSuccess?.()
            }
        } catch (err: any) {
            const message = err?.message || 'Payment processing failed'
            setErrorMessage(message)
            onError?.(message)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />

            {errorMessage && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
                    <p>{errorMessage}</p>
                </div>
            )}

            <div className="flex items-center justify-between border-t pt-4">
                <div className="text-sm text-gray-600">
                    Total: <span className="font-semibold text-black">${amount.toFixed(2)}</span>
                </div>
                <Button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="min-w-[140px]"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        `Pay $${amount.toFixed(2)}`
                    )}
                </Button>
            </div>
        </form>
    )
}
