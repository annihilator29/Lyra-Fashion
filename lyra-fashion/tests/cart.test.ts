import { act } from '@testing-library/react';
import { useCartStore } from '@/lib/store/cart';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('Cart Store', () => {
    const initialItem = {
        productId: 'prod-1',
        name: 'Test Product',
        price: 1000, // $10.00
        slug: 'test-product',
        quantity: 1,
        size: 'M',
        color: 'Red',
    };

    beforeEach(() => {
        act(() => {
            useCartStore.getState().clearCart();
        });
        localStorage.clear();
    });

    it('should start with an empty cart', () => {
        const { items } = useCartStore.getState();
        expect(items).toEqual([]);
    });

    it('should add an item to the cart', () => {
        act(() => {
            useCartStore.getState().addItem(initialItem);
        });

        const { items } = useCartStore.getState();
        expect(items).toHaveLength(1);
        expect(items[0]).toMatchObject(initialItem);
        expect(items[0].id).toBeDefined();
    });

    it('should increase quantity if adding the same item', () => {
        act(() => {
            useCartStore.getState().addItem(initialItem);
            useCartStore.getState().addItem(initialItem);
        });

        const { items } = useCartStore.getState();
        expect(items).toHaveLength(1);
        expect(items[0].quantity).toBe(2);
    });

    it('should add distinct items separately', () => {
        act(() => {
            useCartStore.getState().addItem(initialItem);
            useCartStore.getState().addItem({ ...initialItem, size: 'L' });
        });

        const { items } = useCartStore.getState();
        expect(items).toHaveLength(2);
    });

    it('should remove an item from the cart', () => {
        act(() => {
            useCartStore.getState().addItem(initialItem);
        });

        const { items: itemsBefore } = useCartStore.getState();
        const itemId = itemsBefore[0].id;

        act(() => {
            useCartStore.getState().removeItem(itemId);
        });

        const { items: itemsAfter } = useCartStore.getState();
        expect(itemsAfter).toHaveLength(0);
    });

    it('should update item quantity', () => {
        act(() => {
            useCartStore.getState().addItem(initialItem);
        });

        const { items: itemsBefore } = useCartStore.getState();
        const itemId = itemsBefore[0].id;

        act(() => {
            useCartStore.getState().updateQuantity(itemId, 5);
        });

        const { items: itemsAfter } = useCartStore.getState();
        expect(itemsAfter[0].quantity).toBe(5);
    });

    it('should not update quantity below 1', () => {
        act(() => {
            useCartStore.getState().addItem(initialItem);
        });

        const { items: itemsBefore } = useCartStore.getState();
        const itemId = itemsBefore[0].id;

        act(() => {
            useCartStore.getState().updateQuantity(itemId, 0);
        });

        const { items: itemsAfter } = useCartStore.getState();
        expect(itemsAfter[0].quantity).toBe(1);
    });

    it('should clear the cart', () => {
        act(() => {
            useCartStore.getState().addItem(initialItem);
            useCartStore.getState().clearCart();
        });

        const { items } = useCartStore.getState();
        expect(items).toHaveLength(0);
    });

    it('should calculate total items correctly', () => {
        act(() => {
            useCartStore.getState().addItem({ ...initialItem, quantity: 2 });
            useCartStore.getState().addItem({ ...initialItem, size: 'L', quantity: 3 });
        });

        const totalItems = useCartStore.getState().getTotalItems();
        expect(totalItems).toBe(5);
    });

    it('should calculate subtotal correctly', () => {
        act(() => {
            useCartStore.getState().addItem({ ...initialItem, price: 1000, quantity: 2 }); // 2000
            useCartStore.getState().addItem({ ...initialItem, size: 'L', price: 2000, quantity: 1 }); // 2000
        });

        const subtotal = useCartStore.getState().getSubtotal();
        expect(subtotal).toBe(4000);
    });
});
