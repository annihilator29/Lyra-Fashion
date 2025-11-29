import { render, screen } from '@testing-library/react';
import ValueProps from './value-props';

describe('ValueProps', () => {
 test('renders value propositions section with all three props', () => {
    render(<ValueProps />);
    
    // Check for the section content
    const factoryDirect = screen.getByText('Factory Direct');
    expect(factoryDirect).toBeInTheDocument();
    
    const transparentPricing = screen.getByText('Transparent Pricing');
    expect(transparentPricing).toBeInTheDocument();
    
    const premiumQuality = screen.getByText('Premium Quality');
    expect(premiumQuality).toBeInTheDocument();
    
    // Check for descriptions
    expect(screen.getByText('Cut out middlemen to bring you premium quality at fair prices')).toBeInTheDocument();
    expect(screen.getByText('Know exactly where your money goes with our clear cost breakdown')).toBeInTheDocument();
    expect(screen.getByText('Crafted with attention to detail using sustainable materials')).toBeInTheDocument();
  });
});