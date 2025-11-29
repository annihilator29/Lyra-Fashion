'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WishlistButton } from '@/components/shop/wishlist-button';
import Link from 'next/link';
import { centsToFormattedPrice } from '@/types/database.types';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  images: string[];
  slug: string;
}

interface WishlistItemProps {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product: Product;
}

export default function WishlistItemComponent({ item }: { item: WishlistItemProps }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative">
        {item.product.images && item.product.images.length > 0 ? (
          <img
            src={item.product.images[0]}
            alt={item.product.name}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        
        {/* Wishlist Button - Top Right */}
        <div className="absolute top-4 right-4">
          <WishlistButton 
            productId={item.product.id} 
            className="border border-gray-300 bg-white/80 hover:bg-red-50 hover:border-red-300"
          />
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 truncate">
          {item.product.name}
        </h3>
        
        {item.product.description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {item.product.description}
          </p>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            {centsToFormattedPrice(item.product.price)}
          </span>
          
          <div className="flex space-x-2">
            <Link href={`/product/${item.product.slug}`}>
              <Button size="sm" variant="outline">
                View
              </Button>
            </Link>
            
            <Button size="sm">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}