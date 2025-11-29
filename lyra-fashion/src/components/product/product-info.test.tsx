import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ProductInfo } from './product-info';
import { Product } from '@/types/database.types';

// Mock product data
const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  slug: 'test-product',
  description: 'This is a test product',
  price: 10000, // $100.00 in cents
  images: ['https://example.com/image.jpg'],
  category: 'Dresses',
  transparency_data: {
    fabric: 3000,
    labor: 2000,
    transport: 1000,
    markup: 4000
  },
  created_at: '2025-11-29T00:00:00Z',
  updated_at: '2025-11-29T00:00:00Z'
};

describe('ProductInfo', () => {
  it('renders product name', () => {
    render(<ProductInfo product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });

  it('renders product price', () => {
    render(<ProductInfo product={mockProduct} />);
    
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('renders product description', () => {
    render(<ProductInfo product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.description as string)).toBeInTheDocument();
  });

  it('renders product category', () => {
    render(<ProductInfo product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
  });
});