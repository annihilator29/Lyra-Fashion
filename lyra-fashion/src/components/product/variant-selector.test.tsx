import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { VariantSelector } from './variant-selector';

describe('VariantSelector', () => {
  it('renders size selector buttons', () => {
    render(<VariantSelector />);
    
    const sizeButtons = screen.getAllByText(/XS|S|M|L|XL/);
    expect(sizeButtons).toHaveLength(5);
  });

  it('renders color selector buttons', () => {
    render(<VariantSelector />);
    
    const colorButtons = screen.getAllByText(/Black|White|Blue|Red|Green/);
    expect(colorButtons).toHaveLength(5);
  });

  it('allows selecting a size', () => {
    render(<VariantSelector />);
    
    const sizeButton = screen.getByText('M');
    fireEvent.click(sizeButton);
    
    expect(sizeButton).toHaveClass('border-primary');
  });

  it('allows selecting a color', () => {
    render(<VariantSelector />);
    
    const colorButton = screen.getByText('Blue');
    fireEvent.click(colorButton);
    
    expect(colorButton).toHaveClass('border-primary');
  });
});