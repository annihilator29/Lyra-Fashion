/**
 * Filter Sidebar Component
 * 
 * Category filtering with responsive design:
 * - Desktop: Fixed sidebar
 * - Mobile: Drawer/Sheet using shadcn/ui
 */

'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface Category {
    name: string;
    count?: number;
}

const CATEGORIES: Category[] = [
    { name: 'All' },
    { name: 'Dresses' },
    { name: 'Tops' },
    { name: 'Outerwear' },
    { name: 'Accessories' },
];

export function FilterSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category') || 'All';

    const handleCategoryChange = useCallback((category: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (category === 'All') {
            params.delete('category');
        } else {
            params.set('category', category);
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, router, searchParams]);

    const handleClearAll = useCallback(() => {
        router.push(pathname, { scroll: false });
    }, [pathname, router]);

    const hasActiveFilters = currentCategory !== 'All' || searchParams.has('sort');

    return (
        <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold text-gray-900">Filters</h2>
                    {hasActiveFilters && (
                        <button
                            onClick={handleClearAll}
                            className="text-sm text-primary hover:text-primary/80 font-medium"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Categories */}
                <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                        Category
                    </h3>
                    <div className="space-y-2">
                        {CATEGORIES.map((category) => {
                            const isActive = currentCategory === category.name;

                            return (
                                <button
                                    key={category.name}
                                    onClick={() => handleCategoryChange(category.name)}
                                    className={`
                    w-full text-left px-3 py-2 rounded-md transition-colors
                    ${isActive
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }
                  `}
                                >
                                    <span className="flex items-center justify-between">
                                        <span>{category.name}</span>
                                        {category.count !== undefined && (
                                            <span className="text-sm text-gray-500">
                                                {category.count}
                                            </span>
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}


/**
 * Mobile Filter Button
 * 
 * Opens filter drawer on mobile devices
 */
export function MobileFilterButton() {
    return (
        <button className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
            </svg>
            Filters
        </button>
    );
}
