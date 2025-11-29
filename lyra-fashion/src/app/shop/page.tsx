/**
 * Shop Page - Product Listing
 * 
 * Main product listing page with filtering and sorting.
 * Uses React Server Components for optimal performance.
 */

import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/api/products';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductCardSkeleton } from '@/components/product/product-card';
import { FilterSidebar } from '@/components/shop/filter-sidebar';
import { SortDropdown } from '@/components/shop/sort-dropdown';
import type { ProductQueryOptions } from '@/lib/api/products';

export const metadata: Metadata = {
    title: 'Shop | Lyra Fashion',
    description: 'Browse our collection of sustainably made fashion pieces. Discover dresses, tops, outerwear, and accessories with full transparency.',
    openGraph: {
        title: 'Shop | Lyra Fashion',
        description: 'Browse our collection of sustainably made fashion pieces',
        type: 'website',
    },
};

interface ShopPageProps {
    searchParams: Promise<{
        category?: string;
        sort?: string;
    }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams;
    const category = params.category;
    const sort = params.sort;

    // Build query options
    const queryOptions: ProductQueryOptions = {};

    if (category) {
        queryOptions.category = category;
    }

    if (sort) {
        queryOptions.sortBy = sort as ProductQueryOptions['sortBy'];
    }

    // Fetch products
    const { products, total } = await getProducts(queryOptions);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                {total} {total === 1 ? 'product' : 'products'}
                                {category && ` in ${category}`}
                            </p>
                        </div>

                        {/* Sort Dropdown - Desktop */}
                        <div className="hidden sm:block">
                            <SortDropdown />
                        </div>
                    </div>

                    {/* Sort Dropdown - Mobile */}
                    <div className="sm:hidden mt-4">
                        <SortDropdown />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-[auto_1fr] lg:gap-8">
                    {/* Filter Sidebar */}
                    <aside className="hidden lg:block">
                        <FilterSidebar />
                    </aside>

                    {/* Mobile Filter - TODO: Add Sheet/Drawer */}
                    <div className="lg:hidden mb-6">
                        <FilterSidebar />
                    </div>

                    {/* Product Grid */}
                    <main>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <ProductGrid products={products} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
