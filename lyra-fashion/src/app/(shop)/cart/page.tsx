'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="container py-20 text-center">
                <p>Loading cart...</p>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="container flex flex-col items-center justify-center py-20 space-y-4">
                <h1 className="text-3xl font-bold font-serif">Your Cart is Empty</h1>
                <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
                <Button asChild>
                    <Link href="/shop">Start Shopping</Link>
                </Button>
            </div>
        );
    }

    const subtotal = getSubtotal();
    const shipping = 0; // Free shipping for now
    const total = subtotal + shipping;

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold font-serif mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-card">
                            {/* Product Image */}
                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="flex flex-1 flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium">
                                            <Link href={`/shop/${item.slug}`} className="hover:underline">
                                                {item.name}
                                            </Link>
                                        </h3>
                                        <div className="text-sm text-muted-foreground mt-1">
                                            {item.size && <span className="mr-3">Size: {item.size}</span>}
                                            {item.color && <span>Color: {item.color}</span>}
                                        </div>
                                    </div>
                                    <p className="font-medium">${(item.price / 100).toFixed(2)}</p>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center border rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="p-1 hover:bg-muted disabled:opacity-50"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:bg-muted"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeItem(item.id)}
                                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <Button variant="outline" onClick={clearCart} size="sm">
                            Clear Cart
                        </Button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 bg-card sticky top-24">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${(subtotal / 100).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${(shipping / 100).toFixed(2)}`}</span>
                            </div>

                            <Separator />

                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${(total / 100).toFixed(2)}</span>
                            </div>

                            <Button className="w-full" size="lg" asChild>
                                <Link href="/checkout">
                                    Proceed to Checkout
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                Taxes calculated at checkout.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
