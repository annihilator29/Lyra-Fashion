'use client';

import { useState } from 'react';
import { InventoryService, type InventoryItem } from '@/services/admin/inventory-service';
import { updateInventoryAction } from '@/app/actions/admin';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Edit3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InventoryTableProps {
  initialData: InventoryItem[];
  onUpdate?: (itemId: string, newQuantity: number) => void;
}

export default function InventoryTable({ initialData, onUpdate }: InventoryTableProps) {
  const [inventoryItems] = useState(initialData);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [quantityInput, setQuantityInput] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const inventoryService = new InventoryService();

  const handleUpdateStock = async (id: string, newQuantity: number) => {
    if (newQuantity < 0) {
      toast.error('Quantity cannot be negative');
      return;
    }

    try {
      const result = await updateInventoryAction(id, newQuantity);

      if (result.success) {
        if (onUpdate) {
          onUpdate(id, newQuantity);
        }

        toast.success('Inventory updated successfully');
        setOpenDialogId(null);
      } else {
        toast.error(result.error || 'Failed to update inventory');
      }
    } catch (error) {
      console.error('Error updating inventory:', error);
      toast.error('Error updating inventory');
    }
  };

  const handleQuantitySubmit = (id: string) => {
    const newQuantity = parseInt(quantityInput, 10);
    if (isNaN(newQuantity) || newQuantity < 0) {
      toast.error('Invalid quantity');
      return;
    }

    handleUpdateStock(id, newQuantity);
  };

  const openDialog = (id: string, currentQuantity: number) => {
    setOpenDialogId(id);
    setQuantityInput(currentQuantity.toString());
  };

  const closeDialog = () => {
    setOpenDialogId(null);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Variant (Size/Color)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SKU
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Stock
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inventoryItems.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {item.product_images && item.product_images.length > 0 ? (
                    <img
                      src={item.product_images[0]}
                      alt={item.product_name}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center">
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{item.product_name}</div>
                    <div className="text-sm text-gray-500">{item.product_slug}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.variant_name || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.sku || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {inventoryService.isLowStock(item) ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 capitalize">
                    Low Stock
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                    In Stock
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openDialog(item.id, item.quantity)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for updating stock */}
      {openDialogId && inventoryItems.find(item => item.id === openDialogId) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Update Stock for {inventoryItems.find(item => item.id === openDialogId)?.product_name}
            </h3>

            <div className="mb-4">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={quantityInput}
                onChange={(e) => setQuantityInput(e.target.value)}
                disabled={loading}
                className="mt-1"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={closeDialog}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => handleQuantitySubmit(openDialogId)}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Stock'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}