/**
 * Product API - Server-side data fetching
 * 
 * All functions run server-side only. Use in Server Components or Server Actions.
 */

import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/types/database.types';

/**
 * Query options for fetching products
 */
export interface ProductQueryOptions {
    category?: string;
    sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'name_asc' | 'name_desc';
    limit?: number;
    offset?: number;
}

/**
 * Result type for product queries
 */
export interface ProductQueryResult {
    products: Product[];
    total: number;
}

/**
 * Fetch products with optional filtering and sorting
 * 
 * @param options - Query options for filtering and sorting
 * @returns Products array and total count
 */
export async function getProducts(
    options: ProductQueryOptions = {}
): Promise<ProductQueryResult> {
    const supabase = await createClient();

    const {
        category,
        sortBy = 'newest',
        limit,
        offset = 0
    } = options;

    try {
        // Start building query
        let query = supabase
            .from('products')
            .select('*', { count: 'exact' });

        // Apply category filter
        if (category && category !== 'all') {
            query = query.eq('category', category);
        }

        // Apply sorting
        switch (sortBy) {
            case 'price_asc':
                query = query.order('price', { ascending: true });
                break;
            case 'price_desc':
                query = query.order('price', { ascending: false });
                break;
            case 'name_asc':
                query = query.order('name', { ascending: true });
                break;
            case 'name_desc':
                query = query.order('name', { ascending: false });
                break;
            case 'newest':
            default:
                query = query.order('created_at', { ascending: false });
                break;
        }

        // Apply pagination
        if (limit) {
            query = query.range(offset, offset + limit - 1);
        }

        const { data, error, count } = await query;

        if (error) {
            console.error('Error fetching products:', error);
            throw new Error(`Failed to fetch products: ${error.message}`);
        }

        return {
            products: data || [],
            total: count || 0
        };

    } catch (error) {
        console.error('Product fetch error:', error);
        throw error;
    }
}

/**
 * Fetch a single product by slug
 * 
 * @param slug - Product slug
 * @returns Product or null if not found
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // Not found
                return null;
            }
            console.error('Error fetching product:', error);
            throw new Error(`Failed to fetch product: ${error.message}`);
        }

        return data;

    } catch (error) {
        console.error('Product fetch error:', error);
        throw error;
    }
}

/**
 * Fetch all unique categories with product counts
 * 
 * @returns Array of categories with counts
 */
export async function getCategories(): Promise<Array<{ category: string; count: number }>> {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from('products')
            .select('category');

        if (error) {
            console.error('Error fetching categories:', error);
            throw new Error(`Failed to fetch categories: ${error.message}`);
        }

        // Count products per category
        const categoryCounts = (data || []).reduce((acc, { category }) => {
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // Convert to array and sort by name
        return Object.entries(categoryCounts)
            .map(([category, count]) => ({ category, count }))
            .sort((a, b) => a.category.localeCompare(b.category));

    } catch (error) {
        console.error('Categories fetch error:', error);
        throw error;
    }
}

/**
 * Get product count for a category
 * 
 * @param category - Category name (undefined = all products)
 * @returns Product count
 */
export async function getProductCount(category?: string): Promise<number> {
    const supabase = await createClient();

    try {
        let query = supabase
            .from('products')
            .select('*', { count: 'exact', head: true });

        if (category && category !== 'all') {
            query = query.eq('category', category);
        }

        const { count, error } = await query;

        if (error) {
            console.error('Error counting products:', error);
            throw new Error(`Failed to count products: ${error.message}`);
        }

        return count || 0;

    } catch (error) {
        console.error('Product count error:', error);
        throw error;
    }
}
