/**
 * Search Bar Component Tests
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from '../search-bar';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockPush = jest.fn();

// Mock hooks before tests
beforeEach(() => {
  jest.clearAllMocks();
  
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  });
  (usePathname as jest.Mock).mockReturnValue('/shop');
  (useSearchParams as jest.Mock).mockReturnValue({
    get: jest.fn().mockReturnValue(null),
    toString: jest.fn().mockReturnValue(''),
  });
});

describe('SearchBar', () => {
  it('renders search input with placeholder', () => {
    render(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText('Search products...');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders search icon', () => {
    render(<SearchBar />);
    
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
  });

  it('updates input value when user types', () => {
    render(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'dress' } });
    
    expect(searchInput).toHaveValue('dress');
  });

  it('debounces search input updates', async () => {
    render(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'dress' } });
    fireEvent.change(searchInput, { target: { value: 'dress shirt' } });
    fireEvent.change(searchInput, { target: { value: 'dress shirt blue' } });
    
    // Should not trigger push immediately
    expect(mockPush).not.toHaveBeenCalled();
    
    // Wait for debounce delay
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/shop?q=dress+shirt+blue');
    }, { timeout: 350 });
  });

  it('clears search query when input is empty', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('dress'),
      toString: jest.fn().mockReturnValue('q=dress'),
    });
    
    render(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: '' } });
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/shop');
    }, { timeout: 350 });
  });

  it('preserves existing search params', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
      toString: jest.fn().mockReturnValue('category=dress'),
    });
    
    render(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'blue' } });
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/shop?category=dress&q=blue');
    }, { timeout: 350 });
  });

  it('initializes with existing search query from URL', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((param) => param === 'q' ? 'dress' : null),
      toString: jest.fn().mockReturnValue('q=dress'),
    });
    
    render(<SearchBar />);
    
    const searchInput = screen.getByPlaceholderText('Search products...');
    expect(searchInput).toHaveValue('dress');
  });
});
