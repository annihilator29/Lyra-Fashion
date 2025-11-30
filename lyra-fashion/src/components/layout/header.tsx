'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export function Header() {
    const getTotalItems = useCartStore((state) => state.getTotalItems);
    const [itemCount, setItemCount] = useState(0);

    // Handle hydration to prevent mismatch
    useEffect(() => {
        // Subscribe to store changes to update count
        const unsubscribe = useCartStore.subscribe((state) => {
            setItemCount(state.getTotalItems());
        });

        // Set initial count
        setItemCount(getTotalItems());

        return () => unsubscribe();
    }, [getTotalItems]);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold font-serif">Lyra Fashion</span>
                </Link>

                <nav className="flex items-center gap-6">
                    <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">
                        Shop
                    </Link>
                    <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                        About
                    </Link>

                    <Link href="/cart" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")}>
                        <ShoppingBag className="h-5 w-5" />
                        <span className="sr-only">Cart</span>
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
}
