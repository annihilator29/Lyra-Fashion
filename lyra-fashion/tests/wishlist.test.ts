import { addToWishlist, removeFromWishlist, getWishlist } from '@/app/actions/wishlist';

// Mock the Supabase client
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: { id: 'test-user-id' } },
        error: null,
      }),
    },
    from: jest.fn((table) => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
      data: [],
      error: null,
    })),
  })),
}));

// Import the actual createClient function for mocking
const { createClient } = require('@/lib/supabase/server');

describe('Wishlist Service', () => {
  beforeEach(() => {
    // Clear any mocks before each test
    jest.clearAllMocks();
  });

  describe('addToWishlist', () => {
    it('should add a product to the wishlist', async () => {
      const productId = 'test-product-id';
      
      const result = await addToWishlist(productId);
      
      expect(result).toEqual({ success: true });
    });

    it('should return an error when user is not authenticated', async () => {
      // Mock unauthenticated user
      (createClient as jest.Mock).mockReturnValueOnce({
        auth: {
          getUser: jest.fn().mockResolvedValue({
            data: { user: null },
            error: { message: 'User not authenticated' },
          }),
        },
        from: jest.fn().mockReturnThis(),
      } as any);

      const result = await addToWishlist('test-product-id');
      
      expect(result).toEqual({ error: 'User not authenticated' });
    });

    it('should return an error when product is already in wishlist', async () => {
      // Mock existing item in wishlist
      (createClient as jest.Mock).mockReturnValueOnce({
        auth: {
          getUser: jest.fn().mockResolvedValue({
            data: { user: { id: 'test-user-id' } },
            error: null,
          }),
        },
        from: jest.fn(() => ({
          select: jest.fn().mockResolvedValue({
            data: { id: 'existing-item' },
            error: null,
          }),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({
            data: { id: 'existing-item' },
            error: null,
          }),
        })),
      } as any);

      const result = await addToWishlist('test-product-id');
      
      expect(result).toEqual({ error: 'Product already in wishlist' });
    });
  });

  describe('removeFromWishlist', () => {
    it('should remove a product from the wishlist', async () => {
      const productId = 'test-product-id';
      
      const result = await removeFromWishlist(productId);
      
      expect(result).toEqual({ success: true });
    });

    it('should return an error when user is not authenticated', async () => {
      // Mock unauthenticated user
      (createClient as jest.Mock).mockReturnValueOnce({
        auth: {
          getUser: jest.fn().mockResolvedValue({
            data: { user: null },
            error: { message: 'User not authenticated' },
          }),
        },
        from: jest.fn().mockReturnThis(),
      } as any);

      const result = await removeFromWishlist('test-product-id');
      
      expect(result).toEqual({ error: 'User not authenticated' });
    });
  });

  describe('getWishlist', () => {
    it('should return the user\'s wishlist items', async () => {
      // Mock wishlist data
      const mockWishlistData = [
        {
          id: 'wishlist-item-1',
          user_id: 'test-user-id',
          product_id: 'product-1',
          created_at: '2023-01-01T00:00:00Z',
          product: {
            id: 'product-1',
            name: 'Test Product',
            description: 'Test Description',
            price: 10000, // $100.00 in cents
            images: ['image-url'],
            slug: 'test-product',
            category: 'Dresses',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            transparency_data: null,
            craftsmanship_content: null
          }
        }
      ];

      (createClient as jest.Mock).mockReturnValueOnce({
        auth: {
          getUser: jest.fn().mockResolvedValue({
            data: { user: { id: 'test-user-id' } },
            error: null,
          }),
        },
        from: jest.fn(() => ({
          select: jest.fn().mockResolvedValue({
            data: mockWishlistData,
            error: null,
          }),
          eq: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
        })),
      } as any);

      const result = await getWishlist();
      
      expect(result.data).toHaveLength(1);
      expect(result.data![0].product.name).toBe('Test Product');
    });

    it('should return an error when user is not authenticated', async () => {
      // Mock unauthenticated user
      (createClient as jest.Mock).mockReturnValueOnce({
        auth: {
          getUser: jest.fn().mockResolvedValue({
            data: { user: null },
            error: { message: 'User not authenticated' },
          }),
        },
        from: jest.fn().mockReturnThis(),
      } as any);

      const result = await getWishlist();
      
      expect(result).toEqual({ data: null, error: 'User not authenticated' });
    });
  });
});