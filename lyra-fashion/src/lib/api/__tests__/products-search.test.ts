/**
 * Product Search API Tests
 */

import { getProducts } from '../products';
import { createClient } from '@/lib/supabase/server';

// Mock Supabase client
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

const mockSupabase = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  or: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  range: jest.fn().mockReturnThis(),
};

beforeEach(() => {
  (createClient as jest.Mock).mockResolvedValue(mockSupabase);
  jest.clearAllMocks();
});

describe('getProducts with search', () => {
  it('applies search query to filter products by name', async () => {
    const mockResult = {
      data: [
        { id: 1, name: 'Blue Dress', description: 'Beautiful blue dress' },
        { id: 2, name: 'Red Dress', description: 'Elegant red dress' },
      ],
      error: null,
      count: 2,
    };

    mockSupabase.select.mockReturnThis();
    mockSupabase.or.mockReturnThis();
    mockSupabase.order.mockReturnThis();
    mockSupabase.range.mockReturnThis();

    const mockQuery = {
      data: mockResult.data,
      error: null,
      count: mockResult.count,
    };

    mockSupabase.range.mockResolvedValue(mockQuery);

    const result = await getProducts({ query: 'dress' });

    expect(mockSupabase.select).toHaveBeenCalledWith('*', { count: 'exact' });
    expect(mockSupabase.or).toHaveBeenCalledWith('name.ilike.%dress%,description.ilike.%dress%');
    expect(result).toEqual({
      products: mockResult.data,
      total: 2,
    });
  });

  it('applies search query to filter products by description', async () => {
    const mockResult = {
      data: [
        { id: 1, name: 'Blue Top', description: 'Cotton shirt with patterns' },
      ],
      error: null,
      count: 1,
    };

    mockSupabase.select.mockReturnThis();
    mockSupabase.or.mockReturnThis();
    mockSupabase.order.mockReturnThis();
    mockSupabase.range.mockReturnThis();

    const mockQuery = {
      data: mockResult.data,
      error: null,
      count: mockResult.count,
    };

    mockSupabase.range.mockResolvedValue(mockQuery);

    const result = await getProducts({ query: 'cotton' });

    expect(mockSupabase.select).toHaveBeenCalledWith('*', { count: 'exact' });
    expect(mockSupabase.or).toHaveBeenCalledWith('name.ilike.%cotton%,description.ilike.%cotton%');
    expect(result).toEqual({
      products: mockResult.data,
      total: 1,
    });
  });

  it('combines search with category filter', async () => {
    const mockResult = {
      data: [
        { id: 1, name: 'Dress', description: 'Summer dress', category: 'dresses' },
      ],
      error: null,
      count: 1,
    };

    mockSupabase.select.mockReturnThis();
    mockSupabase.eq.mockReturnThis();
    mockSupabase.or.mockReturnThis();
    mockSupabase.order.mockReturnThis();
    mockSupabase.range.mockReturnThis();

    const mockQuery = {
      data: mockResult.data,
      error: null,
      count: mockResult.count,
    };

    mockSupabase.range.mockResolvedValue(mockQuery);

    const result = await getProducts({
      query: 'dress',
      category: 'dresses'
    });

    expect(mockSupabase.select).toHaveBeenCalledWith('*', { count: 'exact' });
    expect(mockSupabase.eq).toHaveBeenCalledWith('category', 'dresses');
    expect(mockSupabase.or).toHaveBeenCalledWith('name.ilike.%dress%,description.ilike.%dress%');
    expect(result).toEqual({
      products: mockResult.data,
      total: 1,
    });
  });

  it('trims whitespace from search query', async () => {
    const mockResult = {
      data: [],
      error: null,
      count: 0,
    };

    mockSupabase.select.mockReturnThis();
    mockSupabase.or.mockReturnThis();
    mockSupabase.order.mockReturnThis();
    mockSupabase.range.mockReturnThis();

    const mockQuery = {
      data: mockResult.data,
      error: null,
      count: mockResult.count,
    };

    mockSupabase.range.mockResolvedValue(mockQuery);

    await getProducts({ query: '  dress  ' });

    expect(mockSupabase.or).toHaveBeenCalledWith('name.ilike.%dress%,description.ilike.%dress%');
  });

  it('handles case-insensitive search', async () => {
    const mockResult = {
      data: [
        { id: 1, name: 'Blue DRESS', description: 'UPPER CASE DRESS' },
      ],
      error: null,
      count: 1,
    };

    mockSupabase.select.mockReturnThis();
    mockSupabase.or.mockReturnThis();
    mockSupabase.order.mockReturnThis();
    mockSupabase.range.mockReturnThis();

    const mockQuery = {
      data: mockResult.data,
      error: null,
      count: mockResult.count,
    };

    mockSupabase.range.mockResolvedValue(mockQuery);

    const result = await getProducts({ query: 'Dress' });

    expect(mockSupabase.or).toHaveBeenCalledWith('name.ilike.%Dress%,description.ilike.%Dress%');
    expect(result.products).toHaveLength(1);
  });

  it('returns empty array when search query is empty', async () => {
    const mockResult = {
      data: [],
      error: null,
      count: 0,
    };

    mockSupabase.select.mockReturnThis();
    mockSupabase.order.mockReturnThis();
    mockSupabase.range.mockReturnThis();

    const mockQuery = {
      data: mockResult.data,
      error: null,
      count: mockResult.count,
    };

    mockSupabase.range.mockResolvedValue(mockQuery);

    const result = await getProducts({ query: '' });

    expect(mockSupabase.or).not.toHaveBeenCalled();
    expect(result).toEqual({
      products: [],
      total: 0,
    });
  });

  it('handles API errors gracefully', async () => {
    const mockError = new Error('Database connection failed');
    mockSupabase.select.mockRejectedValue(mockError);

    await expect(getProducts({ query: 'dress' })).rejects.toThrow('Database connection failed');
  });

  it('combines search with sorting options', async () => {
    const mockResult = {
      data: [
        { id: 1, name: 'A Dress', price: 50 },
        { id: 2, name: 'B Dress', price: 30 },
      ],
      error: null,
      count: 2,
    };

    mockSupabase.select.mockReturnThis();
    mockSupabase.or.mockReturnThis();
    mockSupabase.order.mockReturnThis();
    mockSupabase.range.mockReturnThis();

    const mockQuery = {
      data: mockResult.data,
      error: null,
      count: mockResult.count,
    };

    mockSupabase.range.mockResolvedValue(mockQuery);

    const result = await getProducts({
      query: 'dress',
      sortBy: 'price_asc'
    });

    expect(mockSupabase.order).toHaveBeenCalledWith('price', { ascending: true });
    expect(result.products).toHaveLength(2);
  });
});
