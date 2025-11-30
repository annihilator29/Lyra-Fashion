'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/cart';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    slug: string;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      slug: product.slug,
    });
  };

  return (
    <Button onClick={handleAddToCart} className="w-full">
      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
    </Button>
  );
}