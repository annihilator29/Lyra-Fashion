// Lyra Fashion Database Types
// Generated: 2025-11-28

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          price: number;
          images: string[];
          category: string;
          transparency_data: TransparencyData | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          price: number;
          images?: string[];
          category: string;
          transparency_data?: TransparencyData | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          price?: number;
          images?: string[];
          category?: string;
          transparency_data?: TransparencyData | null;
          created_at?: string;
        };
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
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export interface TransparencyData {
  fabric: number;
  labor: number;
  transport: number;
  markup: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  images: string[];
  category: string;
  transparency_data: TransparencyData | null;
  created_at: string;
}

export interface ProductCategory {
  name: string;
  count: number;
}

export interface ProductStats {
  totalProducts: number;
  totalCategories: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
}