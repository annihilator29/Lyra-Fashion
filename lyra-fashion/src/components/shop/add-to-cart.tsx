'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AddToCartProps {
    product: {
        id: string;
        name: string;
        price: number;
        image?: string;
        slug: string;
    };
    variants?: {
        sizes?: string[];
        colors?: string[];
    };
    className?: string;
}

export function AddToCart({ product, variants, className }: AddToCartProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [selectedSize, setSelectedSize] = useState<string | undefined>(
        variants?.sizes?.[0]
    );
    const [selectedColor, setSelectedColor] = useState<string | undefined>(
        variants?.colors?.[0]
    );

    const handleAddToCart = () => {
        if (variants?.sizes && !selectedSize) {
            toast.error('Please select a size');
            return;
        }
        if (variants?.colors && !selectedColor) {
            toast.error('Please select a color');
            return;
        }

        addItem({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            slug: product.slug,
            quantity: 1,
            size: selectedSize,
            color: selectedColor,
        });

        toast.success('Added to cart');
    };

    return (
        <div className={cn('flex flex-col gap-4', className)}>
            {variants && (
                <div className="flex flex-col gap-4">
                    {variants.sizes && variants.sizes.length > 0 && (
                        <div className="space-y-2">
                            <span className="text-sm font-medium">Size</span>
                            <div className="flex flex-wrap gap-2">
                                {variants.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={cn(
                                            'px-3 py-1 border rounded-md text-sm transition-colors',
                                            selectedSize === size
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-black border-gray-200 hover:border-black'
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {variants.colors && variants.colors.length > 0 && (
                        <div className="space-y-2">
                            <span className="text-sm font-medium">Color</span>
                            <div className="flex flex-wrap gap-2">
                                {variants.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={cn(
                                            'px-3 py-1 border rounded-md text-sm transition-colors',
                                            selectedColor === color
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-black border-gray-200 hover:border-black'
                                        )}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <Button onClick={handleAddToCart} className="w-full" size="lg">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
            </Button>
        </div>
    );
}
