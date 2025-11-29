import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TransparencyCard } from './transparency-card';
import { TransparencyData } from '@/types/database.types';

const mockTransparencyData: TransparencyData = {
  fabric: 3000,
  labor: 2000,
  transport: 1000,
  markup: 400
};

describe('TransparencyCard', () => {
 it('renders transparency data when provided', () => {
    render(<TransparencyCard transparencyData={mockTransparencyData} />);
    
    expect(screen.getByText('Transparency')).toBeInTheDocument();
    expect(screen.getByText('$30.00')).toBeInTheDocument(); // Fabric
    expect(screen.getByText('$20.00')).toBeInTheDocument(); // Labor
    expect(screen.getByText('$10.00')).toBeInTheDocument(); // Transport
    expect(screen.getByText('$40.00')).toBeInTheDocument(); // Markup
    expect(screen.getByText('$100.00')).toBeInTheDocument(); // Total
  });

  it('renders a message when no transparency data is provided', () => {
    render(<TransparencyCard transparencyData={null} />);
    
    expect(screen.getByText('Transparency')).toBeInTheDocument();
    expect(screen.getByText('No transparency data available for this product.')).toBeInTheDocument();
  });

  it('displays correct labels for each cost category', () => {
    render(<TransparencyCard transparencyData={mockTransparencyData} />);
    
    expect(screen.getByText('Fabric')).toBeInTheDocument();
    expect(screen.getByText('Labor')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Markup')).toBeInTheDocument();
  });
});