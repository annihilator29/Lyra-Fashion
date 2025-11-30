'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShippingForm } from '@/components/checkout/shipping-form';
import { OrderSummary } from '@/components/checkout/order-summary';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  const handleShippingInfoChange = (data: any) => {
    setShippingInfo(data);
  };

  const handleFormValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const handleProceedToPayment = () => {
    // In a real app, this would navigate to the payment page
    // For now, we'll just show an alert
    alert('Proceeding to payment with the provided shipping information.');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column: Shipping Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ShippingForm 
                onShippingInfoChange={handleShippingInfoChange}
                onFormValidation={handleFormValidation}
              />
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
              <div className="mt-6">
                <Button 
                  className="w-full" 
                  onClick={handleProceedToPayment}
                  disabled={!isFormValid}
                >
                  Proceed to Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
