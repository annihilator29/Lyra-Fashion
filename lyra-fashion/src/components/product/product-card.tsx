/**
 * Product Card Component
 * 
 * Displays a single product with image, name, price, and category.
 * Optimized for performance with next/image and proper sizing.
 */

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/database.types';
import { centsToFormattedPrice } from '@/types/database.types';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { name, slug, price, images, category } = product;

    // Use first image or fallback
    const imageUrl = images && images.length > 0
        ? images[0]
        : '/images/placeholder-product.jpg';

    return (
        <Link
            href={`/shop/product/${slug}`}
            className="group block"
        >
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority={false}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-gray-700">
                            {category}
                        </span>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                        {name}
                    </h3>

                    <p className="mt-2 text-lg font-semibold text-gray-900">
                        {centsToFormattedPrice(price)}
                    </p>
                </div>
            </div>
        </Link>
    );
}

/**
 * Product Card Skeleton for loading states
 */
export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            {/* Image Skeleton */}
            <div className="relative aspect-square bg-gray-200 animate-pulse" />

            {/* Info Skeleton */}
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
            </div>
        </div>
    );
}
