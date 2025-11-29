/**
 * Lyra Fashion Database Types
 * Redeveloped: 2025-11-29
 * 
 * TypeScript interfaces matching the actual Supabase schema.
 * Auto-generated type definitions should be replaced with these.
 * 
 * Schema Reference: lyra-fashion/supabase/migrations/20251128_init_schema.sql
 */

/**
 * Transparency cost breakdown
 * All values in CENTS (integer)
 */
export interface TransparencyData {
  fabric: number;    // Fabric cost in cents
  labor: number;     // Labor cost in cents
  transport: number; // Transport cost in cents
  markup: number;    // Retail markup in cents
}

/**
 * Product categories
 */
export type ProductCategory = 'Dresses' | 'Tops' | 'Outerwear' | 'Accessories';

/**
 * Product row as returned from database
 */
export interface Product {
  id: string;                              // UUID
  name: string;
  slug: string;
  description: string | null;
  price: number;                           // CRITICAL: Price in CENTS (integer), not dollars
  images: string[];                        // Array of image URLs
  category: ProductCategory;
  transparency_data: TransparencyData | null;
  created_at: string;                      // ISO 8601 timestamp
  updated_at: string;                      // ISO 8601 timestamp
}

/**
 * Product insert type (for creating new products)
 */
export interface ProductInsert {
  id?: string;                            // Optional, auto-generated if not provided
  name: string;
  slug: string;
  description?: string | null;
  price: number;                          // Price in CENTS
  images?: string[];
  category: ProductCategory;
  transparency_data?: TransparencyData | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Product update type (for updating existing products)
 */
export interface ProductUpdate {
  id?: string;
  name?: string;
  slug?: string;
  description?: string | null;
  price?: number;                         // Price in CENTS
  images?: string[];
  category?: ProductCategory;
  transparency_data?: TransparencyData | null;
  updated_at?: string;
}

/**
 * Profile row (extends Supabase auth.users)
 */
export interface Profile {
  id: string;                             // UUID, references auth.users(id)
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Profile insert type
 */
export interface ProfileInsert {
  id: string;                             // Required, must match auth.users(id)
  email?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Profile update type
 */
export interface ProfileUpdate {
  email?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  updated_at?: string;
}

/**
 * Complete database schema
 */
export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: ProductInsert;
        Update: ProductUpdate;
      };
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

//==================== Utility Types ====================

/**
 * Product with formatted price (for display)
 */
export interface ProductWithFormattedPrice extends Product {
  formattedPrice: string;  // e.g., "$125.00"
}

/**
 * Product statistics
 */
export interface ProductStats {
  totalProducts: number;
  totalCategories: number;
  minPriceCents: number;
  maxPriceCents: number;
  avgPriceCents: number;
  minPriceFormatted: string;
  maxPriceFormatted: string;
  avgPriceFormatted: string;
}

/**
 * Category summary
 */
export interface CategorySummary {
  category: ProductCategory;
  productCount: number;
  avgPriceCents: number;
  avgPriceFormatted: string;
}

// ==================== Utility Functions ====================

/**
 * Convert cents to formatted dollar string
 */
export function centsToFormattedPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * Convert dollars to cents
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/**
 * Validate transparency data sums to product price
 */
export function validateTransparencyData(
  price: number,
  transparencyData: TransparencyData | null
): boolean {
  if (!transparencyData) return false;

  const { fabric, labor, transport, markup } = transparencyData;
  const sum = fabric + labor + transport + markup;

  return sum === price;
}

/**
 * Calculate transparency percentage breakdown
 */
export function calculateTransparencyPercentages(
  transparencyData: TransparencyData
): {
  fabric: number;
  labor: number;
  transport: number;
  markup: number;
} {
  const total = transparencyData.fabric + transparencyData.labor +
    transparencyData.transport + transparencyData.markup;

  return {
    fabric: (transparencyData.fabric / total) * 100,
    labor: (transparencyData.labor / total) * 100,
    transport: (transparencyData.transport / total) * 100,
    markup: (transparencyData.markup / total) * 100
  };
}

/**
 * Add formatted price to product
 */
export function addFormattedPrice(product: Product): ProductWithFormattedPrice {
  return {
    ...product,
    formattedPrice: centsToFormattedPrice(product.price)
  };
}