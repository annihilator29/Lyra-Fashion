'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShippingForm } from '@/components/checkout/shipping-form';
import { OrderSummary } from '@/components/checkout/order-summary';
import { Button } from '@/components/ui/button';
import { StripeProvider } from '@/components/checkout/stripe-provider';
import { PaymentForm } from '@/components/checkout/payment-form';
import { createPaymentIntent } from '@/app/actions/checkout';
import { useCartStore } from '@/lib/store/cart';
import { Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { items } = useCartStore();

  const handleShippingInfoChange = (data: any) => {
    setShippingInfo(data);
  };

  const handleFormValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const handleProceedToPayment = async () => {
    setIsCreatingIntent(true);
    setError(null);

    try {
      // Prepare cart items for server validation
      const cartItems = items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        variantId: item.variantId,
        size: item.size,
        color: item.color,
      }));

      // Create payment intent on server
      const result = await createPaymentIntent(cartItems);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.clientSecret && result.amount) {
        setClientSecret(result.clientSecret);
        setPaymentAmount(result.amount);
        setStep('payment');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to initialize payment');
    } finally {
      setIsCreatingIntent(false);
    }
  };

  const handlePaymentError = (errorMsg: string) => {
    setError(errorMsg);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Progress indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 'shipping' ? 'bg-black text-white' : 'bg-gray-300'}`}>
            1
          </div>
          <span className="ml-2 text-sm font-medium">Shipping</span>
        </div>
        <div className="w-16 h-0.5 bg-gray-300 mx-4" />
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 'payment' ? 'bg-black text-white' : 'bg-gray-300'}`}>
            2
          </div>
          <span className="ml-2 text-sm font-medium">Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column: Shipping Form or Payment Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {step === 'shipping' ? 'Shipping Information' : 'Payment Details'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step === 'shipping' ? (
                <ShippingForm
                  onShippingInfoChange={handleShippingInfoChange}
                  onFormValidation={handleFormValidation}
                />
              ) : clientSecret ? (
                <StripeProvider clientSecret={clientSecret}>
                  <PaymentForm
                    amount={paymentAmount}
                    onError={handlePaymentError}
                  />
                </StripeProvider>
              ) : null}

              {/* Error message */}
              {error && (
                <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-800">
                  {error}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderSummary />
              {step === 'shipping' && (
                <div className="mt-6">
                  <Button
                    className="w-full"
                    onClick={handleProceedToPayment}
                    disabled={!isFormValid || isCreatingIntent}
                  >
                    {isCreatingIntent ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Preparing payment...
                      </>
                    ) : (
                      'Proceed to Payment'
                    )}
                  </Button>
                </div>
              )}
              {step === 'payment' && (
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setStep('shipping')}
                  >
                    Back to Shipping
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

