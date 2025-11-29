/**
 * Shop Page Error Boundary
 * 
 * Handles errors during product fetching with retry and navigation options
 */

'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ShopError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to console for debugging
        console.error('Shop page error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Error Icon */}
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                        className="w-8 h-8 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                {/* Error Message */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Failed to load products
                </h2>
                <p className="text-gray-600 mb-6">
                    We encountered an error while loading the product catalog. Please try again.
                </p>

                {/* Error Details (development only) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
                        <p className="text-sm font-mono text-gray-700 break-words">
                            {error.message}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
