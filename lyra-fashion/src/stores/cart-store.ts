import { create } from 'zustand';

// Define the item type
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the store state type
interface CartState {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
 updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Create the store
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  subtotal: 0,
  shippingCost: 10, // Fixed shipping cost for MVP
  total: 0,
  
  addItem: (newItem) => {
    const state = get();
    const existingItem = state.items.find(item => item.id === newItem.id);
    
    if (existingItem) {
      // If item exists, increase quantity
      const updatedItems = state.items.map(item =>
        item.id === newItem.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      
      set({ items: updatedItems });
    } else {
      // If item doesn't exist, add as new with quantity 1
      const updatedItems = [...state.items, { ...newItem, quantity: 1 }];
      set({ items: updatedItems });
    }
    
    // Update calculated values
    const updatedState = get();
    const newSubtotal = updatedState.items.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
    const newTotal = newSubtotal + updatedState.shippingCost;
    
    set({ 
      subtotal: newSubtotal,
      total: newTotal
    });
 },
  
  removeItem: (id) => {
    const state = get();
    const updatedItems = state.items.filter(item => item.id !== id);
    
    set({ items: updatedItems });
    
    // Update calculated values
    const newSubtotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
    const newTotal = newSubtotal + state.shippingCost;
    
    set({ 
      subtotal: newSubtotal,
      total: newTotal
    });
 },
  
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    
    const state = get();
    const updatedItems = state.items.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    
    set({ items: updatedItems });
    
    // Update calculated values
    const newSubtotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
    const newTotal = newSubtotal + state.shippingCost;
    
    set({ 
      subtotal: newSubtotal,
      total: newTotal
    });
 },
  
  clearCart: () => {
    set({ 
      items: [],
      subtotal: 0,
      total: 10 // shipping cost remains
    });
  }
}));