'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToWishlist, removeFromWishlist, getWishlist } from '@/app/actions/wishlist';
import { toast } from 'sonner';

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export function WishlistButton({ productId, className }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Check if product is in wishlist on mount and when product ID changes
  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        setIsLoading(true);
        const result = await getWishlist();
        
        if (result.error) {
          console.error('Error fetching wishlist:', result.error);
          // Don't set isInWishlist to false here as we don't want to show incorrect state
          return;
        }
        
        if (result.data) {
          const isInList = result.data.some(item => item.product_id === productId);
          setIsInWishlist(isInList);
        }
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkWishlistStatus();
  }, [productId]);

  const handleToggleWishlist = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    
    try {
      if (isInWishlist) {
        // Remove from wishlist
        const result = await removeFromWishlist(productId);
        if (result.error) {
          toast.error(result.error);
        } else {
          setIsInWishlist(false);
          toast.success('Removed from wishlist');
        }
      } else {
        // Add to wishlist
        const result = await addToWishlist(productId);
        if (result.error) {
          toast.error(result.error);
        } else {
          setIsInWishlist(true);
          toast.success('Added to wishlist');
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <Button 
        variant="outline" 
        size="icon" 
        className={className}
        disabled
      >
        <Heart className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant={isInWishlist ? 'destructive' : 'outline'}
      size="icon"
      onClick={handleToggleWishlist}
      disabled={isUpdating}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      className={className}
    >
      <Heart
        className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`}
        aria-hidden="true"
      />
    </Button>
  );
}