/**
 * Search Bar Component
 * 
 * Client-side search input with debouncing for product search functionality.
 * Updates URL with query parameters for search state persistence.
 */

'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
    placeholder?: string;
    className?: string;
    mobileHidden?: boolean;
}

// Simple debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export function SearchBar({ 
    placeholder = "Search products...", 
    className = "",
    mobileHidden = false 
}: SearchBarProps) {
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const router = useRouter();
    const pathname = usePathname();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const updateSearchParams = useCallback((term: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        
        if (term.trim()) {
            currentParams.set('q', term.trim());
        } else {
            currentParams.delete('q');
        }

        // Navigate to the new URL with updated search params
        const newUrl = `${pathname}${currentParams.toString() ? `?${currentParams.toString()}` : ''}`;
        router.push(newUrl);
    }, [searchParams, pathname, router]);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
    }, []);

    // Update search params when debounced value changes
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
            updateSearchParams(debouncedSearchTerm);
        }, 50);
    }, [debouncedSearchTerm, updateSearchParams]);

    return (
        <div className={`relative ${className}`}>
            {/* Mobile Search Toggle */}
            <div className="sm:hidden">
                <button
                    onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                    className="p-2 text-gray-600 hover:text-gray-900"
                    aria-label="Toggle search"
                >
                    {isMobileSearchOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Search className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Search Bar */}
            <div className={`
                ${mobileHidden ? 'hidden' : ''}
                ${isMobileSearchOpen ? 'block' : 'hidden'}
                sm:block
            `}>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" data-testid="search-icon" />
                    </div>
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="pl-10 pr-4"
                    />
                </div>
            </div>
        </div>
    );
}