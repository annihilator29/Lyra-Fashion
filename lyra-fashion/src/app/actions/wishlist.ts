'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { WishlistItem } from '@/types/database.types';

export async function addToWishlist(productId: string) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: 'User not authenticated' };
    }

    // Check if product is already in wishlist
    const { data: existingItem, error: checkError } = await supabase
      .from('wishlists')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .single();

    if (existingItem) {
      return { error: 'Product already in wishlist' };
    }

    // Add product to wishlist
    const { error } = await supabase
      .from('wishlists')
      .insert([{ user_id: user.id, product_id: productId }]);

    if (error) {
      console.error('Error adding to wishlist:', error);
      return { error: 'Failed to add product to wishlist' };
    }

    revalidatePath('/account/wishlist');
    revalidatePath(`/product/${productId}`);

    return { success: true };
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function removeFromWishlist(productId: string) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: 'User not authenticated' };
    }

    // Remove product from wishlist
    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (error) {
      console.error('Error removing from wishlist:', error);
      return { error: 'Failed to remove product from wishlist' };
    }

    revalidatePath('/account/wishlist');
    revalidatePath(`/product/${productId}`);

    return { success: true };
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function getWishlist(): Promise<{ data: WishlistItem[] | null; error: string | null }> {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { data: null, error: 'User not authenticated' };
    }

    // First, get the wishlist items
    const { data: wishlistData, error: wishlistError } = await supabase
      .from('wishlists')
      .select('id, user_id, product_id, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (wishlistError) {
      console.error('Error fetching wishlist:', wishlistError);
      return { data: null, error: 'Failed to fetch wishlist' };
    }

    if (!wishlistData || wishlistData.length === 0) {
      return { data: [], error: null };
    }

    // Extract product IDs
    const productIds = wishlistData.map(item => item.product_id);

    // Fetch the product details separately
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('id, name, description, price, images, slug, category, created_at, updated_at, transparency_data, craftsmanship_content')
      .in('id', productIds);

    if (productsError) {
      console.error('Error fetching products:', productsError);
      return { data: null, error: 'Failed to fetch product details' };
    }

    // Combine the wishlist items with product details
    const combinedData: WishlistItem[] = wishlistData.map(wishlistItem => {
      const product = productsData?.find(p => p.id === wishlistItem.product_id);
      return {
        id: wishlistItem.id,
        user_id: wishlistItem.user_id,
        product_id: wishlistItem.product_id,
        created_at: wishlistItem.created_at,
        product: product || {
          id: wishlistItem.product_id,
          name: 'Product not found',
          description: null,
          price: 0,
          images: [],
          slug: '',
          category: 'Dresses',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          transparency_data: null,
          craftsmanship_content: null
        }
      };
    });

    return { data: combinedData, error: null };
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
}