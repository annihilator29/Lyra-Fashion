/**
 * Sort Dropdown Component
 * 
 * Allows users to sort products by various criteria
 */

'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'name_asc', label: 'Name: A-Z' },
    { value: 'name_desc', label: 'Name: Z-A' },
] as const;

export function SortDropdown() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get('sort') || 'newest';

    const handleSortChange = useCallback((sort: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (sort === 'newest') {
            params.delete('sort');
        } else {
            params.set('sort', sort);
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, router, searchParams]);

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Sort by:
            </label>
            <select
                id="sort"
                value={currentSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
                {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
