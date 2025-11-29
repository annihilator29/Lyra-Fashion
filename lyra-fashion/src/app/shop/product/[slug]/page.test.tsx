import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductPage, { generateMetadata } from './page';
import { getProductBySlug } from '@/lib/api/products';
import { notFound } from 'next/navigation';
import { Product } from '@/types/database.types';

// Mock the dependencies
jest.mock('@/lib/api/products');
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
  redirect: jest.fn(),
}));

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
    transport: 100,
    markup: 4000
  },
  created_at: '2025-11-29T00:00:00Z',
  updated_at: '2025-11-29T00:00:00Z'
};

describe('ProductPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product page when product is found', async () => {
    (getProductBySlug as jest.MockedFunction<typeof getProductBySlug>)
      .mockResolvedValue(mockProduct);

    // Since ProductPage is an async component, we need to await the render
    const { container } = await render(
      <ProductPage params={{ slug: 'test-product' }} />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('This is a test product')).toBeInTheDocument();
  });

  it('calls notFound when product is not found', async () => {
    (getProductBySlug as jest.MockedFunction<typeof getProductBySlug>)
      .mockResolvedValue(null);

    await render(<ProductPage params={{ slug: 'non-existent' }} />);

    expect(notFound).toHaveBeenCalled();
  });

  describe('generateMetadata', () => {
    it('generates correct metadata when product is found', async () => {
      (getProductBySlug as jest.MockedFunction<typeof getProductBySlug>)
        .mockResolvedValue(mockProduct);

      const metadata = await generateMetadata({ params: { slug: 'test-product' } });

      expect(metadata.title).toBe('Test Product');
      expect(metadata.description).toBe('This is a test product');
    });

    it('returns not found metadata when product is not found', async () => {
      (getProductBySlug as jest.MockedFunction<typeof getProductBySlug>)
        .mockResolvedValue(null);

      const metadata = await generateMetadata({ params: { slug: 'non-existent' } });

      expect(metadata.title).toBe('Product Not Found');
      expect(metadata.description).toBe('The requested product could not be found.');
    });
  });
});