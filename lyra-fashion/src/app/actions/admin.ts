'use server';

import { createClient } from '@/lib/supabase/server';

interface AdminMetrics {
  totalRevenue: number; // in cents
  totalOrders: number;
  lowStockItems: number;
}

export async function getAdminMetrics(): Promise<AdminMetrics> {
  const supabase = await createClient();

  // Query for total revenue (sum of paid orders)
  const { data: revenueData, error: revenueError } = await supabase
    .from('orders')
    .select('total_amount, status')
    .in('status', ['paid', 'production', 'quality_check', 'shipped', 'delivered']);

  if (revenueError) {
    console.error('Error fetching revenue data:', revenueError);
    throw new Error('Failed to fetch revenue data');
  }

  const totalRevenue = revenueData.reduce((sum, order) => sum + (order.total_amount || 0), 0);

  // Query for total order count
  const { count: totalOrders, error: countError } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Error fetching order count:', countError);
    throw new Error('Failed to fetch order count');
  }

  // Query for low stock items (items with quantity <= 5, configurable threshold)
  const { count: lowStockItems, error: lowStockError } = await supabase
    .from('inventory')
    .select('*', { count: 'exact', head: true })
    .lte('quantity', 5); // Consider items with 5 or fewer as low stock

  if (lowStockError) {
    console.error('Error fetching low stock items:', lowStockError);
    throw new Error('Failed to fetch low stock items');
  }

  return {
    totalRevenue,
    totalOrders: totalOrders ?? 0,
    lowStockItems: lowStockItems ?? 0,
  };
}