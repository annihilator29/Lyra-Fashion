'use client';

import { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WishlistButton } from '@/components/shop/wishlist-button';
import { getWishlist } from '@/app/actions/wishlist';
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

interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product: Product;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await getWishlist();
        
        if (result.error) {
          setError(result.error);
        } else if (result.data) {
          setWishlistItems(result.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Wishlist</h2>
            <p className="text-red-600">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-xl font-medium text-gray-900">Your wishlist is empty</h3>
            <p className="mt-2 text-gray-500">
              Start adding items you love to your wishlist so you can find them easily later.
            </p>
            <div className="mt-6">
              <Link href="/">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}