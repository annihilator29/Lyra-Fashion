'use client';

import { useState } from 'react';
import { Product, centsToFormattedPrice } from '@/types/database.types';
import { VariantSelector } from '@/components/product/variant-selector';
import { useCartStore } from '@/lib/store/cart';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { name, description, category, price } = product;
  const formattedPrice = centsToFormattedPrice(price);
  const { addItem } = useCartStore();
  
  const handleAddToBag = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      quantity: 1,
      slug: product.slug,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
      <div className="mt-2 flex items-center">
        <span className="text-2xl font-semibold text-gray-900">{formattedPrice}</span>
      </div>
      <p className="mt-4 text-gray-600">{description}</p>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900">Category</h3>
        <p className="mt-1 text-gray-600">{category || product.category}</p>
      </div>
      
      <VariantSelector product={product} />
      
      <button
        onClick={handleAddToBag}
        className="mt-6 w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-md transition-colors"
      >
        Add to Bag
      </button>
    </div>
  );
}