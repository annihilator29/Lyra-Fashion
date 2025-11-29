import { render, screen } from '@testing-library/react';
import StoryTeaser from './story-teaser';

describe('StoryTeaser', () => {
  test('renders story teaser section with headline and link', () => {
    render(<StoryTeaser />);
    
    // Check for the headline
    const headline = screen.getByText('Our Story');
    expect(headline).toBeInTheDocument();
    
    // Check for the description
    expect(screen.getByText('Behind every piece is a story of craftsmanship, transparency, and dedication. We believe in creating fashion that honors both the maker and the wearer.')).toBeInTheDocument();
    
    // Check for the CTA button
    const ctaButton = screen.getByText('Read Our Story');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveClass('border-gray-900');
  });
});