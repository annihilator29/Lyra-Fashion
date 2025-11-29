import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ProductGallery } from './product-gallery';

describe('ProductGallery', () => {
  const mockImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ];

  it('renders the main image', () => {
    render(<ProductGallery images={mockImages} />);
    
    const mainImage = screen.getByAltText('Product');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', mockImages[0]);
  });

  it('renders thumbnail images when there are multiple images', () => {
    render(<ProductGallery images={mockImages} />);
    
    const thumbnails = screen.getAllByRole('button');
    expect(thumbnails).toHaveLength(mockImages.length);
  });

  it('renders a single image without thumbnails when only one image is provided', () => {
    const singleImage = ['https://example.com/image1.jpg'];
    render(<ProductGallery images={singleImage} />);
    
    const mainImage = screen.getByAltText('Product');
    expect(mainImage).toBeInTheDocument();
    
    const thumbnails = screen.queryAllByRole('button');
    expect(thumbnails).toHaveLength(0); // No thumbnails should be rendered
  });
});