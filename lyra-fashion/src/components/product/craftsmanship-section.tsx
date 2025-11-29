'use client';

import Image from 'next/image';
import { CraftsmanshipContent } from '@/types/database.types';

interface CraftsmanshipSectionProps {
    craftsmanshipContent: CraftsmanshipContent | null;
}

export function CraftsmanshipSection({ craftsmanshipContent }: CraftsmanshipSectionProps) {
    // If no craftsmanship data exists, hide the section (AC 5)
    if (!craftsmanshipContent) {
        return null;
    }

    const { origin_story, material_details, artisan_note, images } = craftsmanshipContent;

    return (
        <section className="w-full bg-sage-100/30 py-16 md:py-24">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl text-sage-900 mb-4">
                        Craftsmanship Story
                    </h2>
                    <div className="w-24 h-[2px] bg-sage-600 mx-auto"></div>
                </div>

                {/* Origin Story with Split Screen Layout (AC 1, 3, 4) */}
                {origin_story && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
                        <div className="flex flex-col justify-center space-y-6">
                            <h3 className="font-serif text-2xl md:text-3xl text-sage-900">
                                Origin
                            </h3>
                            <p className="text-sage-700 leading-relaxed font-serif text-lg">
                                {origin_story}
                            </p>
                        </div>
                        {images && images[0] && (
                            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-lg shadow-lg">
                                <Image
                                    src={images[0]}
                                    alt="Craftsmanship origin"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Material Details */}
                {material_details && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
                        {images && images[1] && (
                            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-lg shadow-lg order-2 lg:order-1">
                                <Image
                                    src={images[1]}
                                    alt="Material details"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    loading="lazy"
                                />
                            </div>
                        )}
                        <div className="flex flex-col justify-center space-y-6 order-1 lg:order-2">
                            <h3 className="font-serif text-2xl md:text-3xl text-sage-900">
                                Materials
                            </h3>
                            <p className="text-sage-700 leading-relaxed font-serif text-lg">
                                {material_details}
                            </p>
                        </div>
                    </div>
                )}

                {/* Artisan Note - Full Width Banner */}
                {artisan_note && (
                    <div className="bg-cream p-8 md:p-12 rounded-lg shadow-sm border border-sage-200">
                        <div className="max-w-3xl mx-auto text-center space-y-6">
                            <h3 className="font-serif text-2xl md:text-3xl text-sage-900">
                                Artisan Note
                            </h3>
                            <blockquote className="text-sage-700 leading-relaxed font-serif text-lg italic">
                                &ldquo;{artisan_note}&rdquo;
                            </blockquote>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
