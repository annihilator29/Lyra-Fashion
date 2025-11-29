'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '/images/placeholder-product.jpg');

  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={selectedImage}
          alt="Product"
          width={600}
          height={600}
          className="object-cover w-full h-full"
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto py-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                selectedImage === image ? 'border-primary' : 'border-transparent'
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`Product ${index + 1}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}