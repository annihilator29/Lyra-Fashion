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

  // Query for low stock items (items with quantity <= low_stock_threshold)
  const { data: lowStockData, error: lowStockError } = await supabase
    .from('inventory')
    .select('quantity, low_stock_threshold');

  if (lowStockError) {
    console.error('Error fetching low stock items:', lowStockError);
    throw new Error('Failed to fetch low stock items');
  }

  // Count items where quantity <= low_stock_threshold
  const lowStockItems = lowStockData.filter(item => item.quantity <= item.low_stock_threshold).length;

  return {
    totalRevenue,
    totalOrders: totalOrders ?? 0,
    lowStockItems: lowStockItems ?? 0,
  };
}

// Server action to update inventory stock with admin role check
export async function updateInventoryAction(id: string, quantity: number): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  // Check if user is authenticated and has admin role
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: 'User not authenticated' };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile || profile.role !== 'admin') {
    return { success: false, error: 'Insufficient permissions' };
  }

  // Update inventory item
  const { error } = await supabase
    .from('inventory')
    .update({
      quantity,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating inventory:', error);
    return { success: false, error: 'Failed to update inventory' };
  }

  return { success: true };
}