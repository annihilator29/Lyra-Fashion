'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WishlistEmpty() {
  return (
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
  );
}