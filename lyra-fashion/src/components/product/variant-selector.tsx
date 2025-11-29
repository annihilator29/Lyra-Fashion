'use client';

import { useState } from 'react';

export function VariantSelector() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Sample sizes and colors - in a real app, these would come from the product
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Blue', 'Red', 'Green'];

  return (
    <div className="mt-6 space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900">Size</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-4 py-2 border rounded-md ${
                selectedSize === size
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Color</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className={`px-4 py-2 border rounded-md ${
                selectedColor === color
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}