import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/api/products';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductInfo } from '@/components/product/product-info';
import { TransparencyCard } from '@/components/product/transparency-card';
import { CraftsmanshipSection } from '@/components/product/craftsmanship-section';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductGallery images={product.images} />
          <div className="space-y-6">
            <ProductInfo product={product} />
            <TransparencyCard transparencyData={product.transparency_data} />
          </div>
        </div>
      </div>

      {/* Craftsmanship Section - AC 1: Below main product info */}
      <CraftsmanshipSection craftsmanshipContent={product.craftsmanship_content} />
    </>
  );
}