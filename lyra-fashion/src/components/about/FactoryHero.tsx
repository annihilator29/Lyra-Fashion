'use client';

import { useEffect } from 'react';

export function FactoryHero() {
  useEffect(() => {
    // Add any client-side logic for the hero section here if needed
  }, []);

  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Immersive factory background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-158109126033-d5c48150db4e?auto=format&fit=crop&w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Overlay content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
          Our Ethical Factory
        </h1>
        <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
          Where traditional craftsmanship meets sustainable practices
        </p>
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-24 bg-primary"></div>
        </div>
      </div>
    </section>
  );
}