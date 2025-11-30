'use client';

import { useState, useEffect, useOptimistic } from 'react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { InventoryService, type InventoryItem } from '@/services/admin/inventory-service';
import { updateInventoryAction } from '@/app/actions/admin';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import InventoryTable from '@/components/admin/inventory-table';

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, startTransition] = useTransition();

  const [optimisticItems, setOptimisticItems] = useOptimistic<InventoryItem[], { id: string; newQuantity: number }>(
    [],
    (state, { id, newQuantity }) => {
      return state.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    }
  );

  const router = useRouter();
  const inventoryService = new InventoryService();

  // Load inventory data
  useEffect(() => {
    const loadInventory = async () => {
      try {
        setLoading(true);
        const { data, pages } = await inventoryService.getInventoryList(currentPage);
        setInventoryItems(data);
        setTotalPages(pages);
      } catch (error) {
        console.error('Error loading inventory:', error);
        toast.error('Failed to load inventory data');
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, [currentPage]);

  const handleUpdateStock = async (id: string, newQuantity: number) => {
    if (newQuantity < 0) {
      toast.error('Quantity cannot be negative');
      return;
    }

    // Optimistically update the UI
    setOptimisticItems({ id, newQuantity });

    startTransition(async () => {
      try {
        const result = await updateInventoryAction(id, newQuantity);

        if (result.success) {
          toast.success('Inventory updated successfully');

          // Refresh the inventory list to ensure consistency
          const { data, pages } = await inventoryService.getInventoryList(currentPage);
          setInventoryItems(data);
          setTotalPages(pages);
        } else {
          toast.error(result.error || 'Failed to update inventory');
          // If update failed, revert optimistic update by reloading data
          const { data } = await inventoryService.getInventoryList(currentPage);
          setInventoryItems(data);
        }
      } catch (error) {
        console.error('Error updating inventory:', error);
        toast.error('Error updating inventory');
        // If update failed, revert optimistic update by reloading data
        const { data } = await inventoryService.getInventoryList(currentPage);
        setInventoryItems(data);
      }
    });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">
            Manage stock levels for your products
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
      </div>

      <InventoryTable
        initialData={inventoryItems}
        optimisticData={optimisticItems}
        onUpdate={handleUpdateStock}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{(currentPage - 1) * 50 + 1}</strong> to{' '}
          <strong>{Math.min(currentPage * 50, inventoryItems.length)}</strong> of{' '}
          <strong>{inventoryItems.length}</strong> results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isPending}
          >
            Previous
          </Button>
          <div className="text-sm text-muted-foreground px-2">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isPending}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}