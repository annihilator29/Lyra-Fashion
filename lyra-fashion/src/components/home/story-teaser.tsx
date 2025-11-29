'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const StoryTeaser = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Behind every piece is a story of craftsmanship, transparency, and dedication. 
              We believe in creating fashion that honors both the maker and the wearer.
            </p>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-6 py-3 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
              onClick={() => window.location.href = '/about'}
            >
              Read Our Story
            </Button>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden">
            <Image
              src="/about-factory-image.jpg"
              alt="Our factory and craftsmanship"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryTeaser;