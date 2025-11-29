'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Factory, DollarSign, Sparkles } from 'lucide-react';
import React from 'react';

const ValueProps = () => {
  const valueProps = [
    {
      icon: <Factory className="h-12 w-12 text-gray-900" />,
      title: 'Factory Direct',
      description: 'Cut out middlemen to bring you premium quality at fair prices',
    },
    {
      icon: <DollarSign className="h-12 w-12 text-gray-900" />,
      title: 'Transparent Pricing',
      description: 'Know exactly where your money goes with our clear cost breakdown',
    },
    {
      icon: <Sparkles className="h-12 w-12 text-gray-900" />,
      title: 'Premium Quality',
      description: 'Crafted with attention to detail using sustainable materials',
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <Card key={index} className="text-center p-6 border-0 shadow-none bg-white">
              <CardContent className="p-0 space-y-4">
                <div className="flex justify-center">
                  {prop.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{prop.title}</h3>
                <p className="text-gray-600">{prop.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;