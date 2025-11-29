/**
 * Shop Page Loading State
 * 
 * Skeleton UI matching the actual product grid layout
 */

import { ProductCardSkeleton } from '@/components/product/product-card';

export default function ShopLoading() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Skeleton */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="h-9 w-32 bg-gray-200 rounded animate-pulse mb-3" />
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
