import { createClient } from '@/lib/supabase/server';

export interface InventoryItem {
  id: string;
  product_id: string;
  product_name: string;
  product_slug: string;
  product_images: string[];
  variant_id?: string; // Optional, for future variant support
  variant_name?: string; // Optional, for future variant support
  sku?: string; // Optional, for future variant support
  quantity: number;
  low_stock_threshold: number;
  reserved_quantity: number;
}

export interface InventoryUpdate {
  id: string;
  quantity: number;
}

interface InventoryResponse {
  id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  low_stock_threshold: number;
  reserved_quantity: number;
  products: {
    id: string;
    name: string;
    slug: string;
    images: string[];
  }[];
}

export class InventoryService {
  private supabase: any;

  constructor() {
    // For now we'll initialize in the methods since createClient is async
    // A better approach would be to use async initialization
  }

  /**
   * Get paginated list of all inventory items with product details
   */
  async getInventoryList(page: number = 1, limit: number = 50): Promise<{
    data: InventoryItem[];
    total: number;
    pages: number;
  }> {
    const supabase = await createClient();
    const offset = (page - 1) * limit;

    // First get the total count
    const { count, error: countError } = await supabase
      .from('inventory')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error fetching inventory count:', countError);
      throw new Error('Failed to fetch inventory count');
    }

    // Then get the inventory items with product details
    const { data, error } = await supabase
      .from('inventory')
      .select(`
        id,
        product_id,
        variant_id,
        quantity,
        low_stock_threshold,
        reserved_quantity,
        products!inner (
          id,
          name,
          slug,
          images
        )
      `)
      .eq('products.deleted_at', null) // Only include non-deleted products
      .order('quantity', { ascending: false }) // Sort by lowest stock first
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching inventory list:', error);
      throw new Error('Failed to fetch inventory list');
    }

    // Transform the data to the expected interface
    const inventoryItems: InventoryItem[] = data.map((item: InventoryResponse) => ({
      id: item.id,
      product_id: item.product_id,
      variant_id: item.variant_id || undefined,
      product_name: item.products && item.products[0] ? item.products[0].name : '',
      product_slug: item.products && item.products[0] ? item.products[0].slug : '',
      product_images: item.products && item.products[0] ? item.products[0].images : [],
      quantity: item.quantity,
      low_stock_threshold: item.low_stock_threshold,
      reserved_quantity: item.reserved_quantity
    }));

    const total = count || 0;
    const pages = Math.ceil(total / limit);

    return {
      data: inventoryItems,
      total,
      pages
    };
  }

  /**
   * Update stock quantity for a specific inventory item
   */
  async updateStock(update: InventoryUpdate): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from('inventory')
      .update({
        quantity: update.quantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', update.id);

    if (error) {
      console.error('Error updating inventory:', error);
      throw new Error('Failed to update inventory');
    }
  }

  /**
   * Check if an inventory item is low in stock
   */
  isLowStock(item: InventoryItem): boolean {
    return item.quantity <= item.low_stock_threshold;
  }
}