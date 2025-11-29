'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Full-screen background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/30 z-0" />
      
      {/* Background image/video - placeholder for now */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder-hero-image.jpg"
          alt="Hero background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Discover Timeless Elegance
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Experience premium quality crafted with transparency and care in our factory
          </p>
          <div className="pt-6">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-white text-gray-900 hover:bg-gray-200"
              onClick={() => window.location.href = '/shop'}
            >
              Shop Collection
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;