import { render, screen } from '@testing-library/react';
import HeroSection from './hero-section';

describe('HeroSection', () => {
  test('renders hero section with headline and CTA', () => {
    render(<HeroSection />);
    
    // Check for the headline
    const headline = screen.getByText('Discover Timeless Elegance');
    expect(headline).toBeInTheDocument();
    
    // Check for the subheading
    const subheading = screen.getByText('Experience premium quality crafted with transparency and care in our factory');
    expect(subheading).toBeInTheDocument();
    
    // Check for the CTA button
    const ctaButton = screen.getByText('Shop Collection');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveClass('bg-white');
  });
});