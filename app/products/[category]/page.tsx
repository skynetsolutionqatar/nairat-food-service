import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageBanner } from '@/components/ui/PageBanner';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Cta } from '@/components/modules/Cta';
import { productCategoriesData } from '@/data/products';
import { getProducts, getCategorySection } from '@/sanity/lib/data';

interface PageProps {
  params: Promise<{ category: string }>;
}

export const revalidate = 60;

export function generateStaticParams() {
  return Object.keys(productCategoriesData).map((slug) => ({
    category: slug,
  }));
}

import { buildPageMetadata, getBreadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const data = productCategoriesData[category];

  if (!data) {
    return buildPageMetadata({
      title: 'Our Products — Fresh Wholesale Produce',
      description: 'Explore Nairat Food Services produce lines across Qatar.',
      pathname: '/products/vegetables',
    });
  }

  const categorySection = await getCategorySection(category);
  const displayTitle = categorySection?.title || data.title;
  const displayDesc = categorySection?.description || data.description;

  return buildPageMetadata({
    title: `${displayTitle} Wholesale & Distribution`,
    description: `${displayDesc} High-yield, temperature-controlled commercial supply across Qatar.`,
    pathname: `/products/${data.slug}`,
  });
}

export default async function ProductCategoryPage({ params }: PageProps): Promise<React.ReactNode> {
  const { category } = await params;
  const data = productCategoriesData[category];

  if (!data) {
    notFound();
  }

  const [products, categorySection] = await Promise.all([
    getProducts(category),
    getCategorySection(category),
  ]);

  const displayCategoryTitle = categorySection?.title || data.title;
  const categoryData = { ...data, title: displayCategoryTitle, products };

  const breadcrumbsData = [
    { name: 'Home', url: '/' },
    { name: 'Our Products', url: '/products/vegetables' },
    { name: displayCategoryTitle, url: `/products/${data.slug}` },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <JsonLd data={getBreadcrumbJsonLd(breadcrumbsData)} />
      {/* 1. Header Banner (Matches original clean style: title + breadcrumbs) */}
      <PageBanner
        title={displayCategoryTitle}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Products' },
          { label: displayCategoryTitle },
        ]}
      />

      {/* 2. 4-in-a-Row Product Grid (Older clean layout) */}
      <ProductGrid category={categoryData} />

      {/* 3. Final Sourcing & Partner CTA */}
      <Cta />
    </div>
  );
}
