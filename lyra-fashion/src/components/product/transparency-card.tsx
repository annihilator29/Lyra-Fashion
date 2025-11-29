import { TransparencyData } from '@/types/database.types';
import { centsToFormattedPrice } from '@/types/database.types';

interface TransparencyCardProps {
  transparencyData: TransparencyData | null;
}

export function TransparencyCard({ transparencyData }: TransparencyCardProps) {
  if (!transparencyData) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900">Transparency</h3>
        <p className="mt-2 text-gray-600">No transparency data available for this product.</p>
      </div>
    );
  }

  const { fabric, labor, transport, markup } = transparencyData;
  const total = fabric + labor + transport + markup;

 return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Transparency</h3>
      <p className="mt-2 text-gray-600">See how your purchase is distributed across the supply chain.</p>
      
      <div className="mt-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-700">Fabric</span>
          <span className="font-medium">{centsToFormattedPrice(fabric)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Labor</span>
          <span className="font-medium">{centsToFormattedPrice(labor)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Transport</span>
          <span className="font-medium">{centsToFormattedPrice(transport)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Markup</span>
          <span className="font-medium">{centsToFormattedPrice(markup)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-semibold">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-90">{centsToFormattedPrice(total)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${(fabric / total) * 100}%` }}
            />
          </div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden ml-1">
            <div
              className="h-full bg-green-500"
              style={{ width: `${(labor / total) * 100}%` }}
            />
          </div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden ml-1">
            <div
              className="h-full bg-yellow-500"
              style={{ width: `${(transport / total) * 100}%` }}
            />
          </div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden ml-1">
            <div
              className="h-full bg-purple-500"
              style={{ width: `${(markup / total) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Fabric</span>
          <span>Labor</span>
          <span>Transport</span>
          <span>Markup</span>
        </div>
      </div>
    </div>
  );
}