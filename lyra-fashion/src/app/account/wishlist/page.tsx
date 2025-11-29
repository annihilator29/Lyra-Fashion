'use client';

import { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WishlistButton } from '@/components/shop/wishlist-button';
import { getWishlist } from '@/app/actions/wishlist';
import Link from 'next/link';
import { centsToFormattedPrice } from '@/types/database.types';
import WishlistLoading from './loading';
import WishlistEmpty from './empty';
import WishlistItemComponent from './item';

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
    return <WishlistLoading />;
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
          <WishlistEmpty />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <WishlistItemComponent key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}