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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const data = productCategoriesData[category];

  if (!data) {
    return {
      title: 'Our Products — Nairat Food Services Qatar',
      description: 'Explore Nairat Food Services produce lines across Qatar.',
    };
  }

  const categorySection = await getCategorySection(category);
  const displayTitle = categorySection?.title || data.title;
  const displayDesc = categorySection?.description || data.description;

  return {
    title: `${displayTitle} — Nairat Food Services Qatar`,
    description: `${displayDesc} High-yield, temperature-controlled commercial supply across Qatar.`,
    openGraph: {
      title: `${displayTitle} — Nairat Food Services Qatar`,
      description: displayDesc,
      url: `https://nairatfoodservices.com/products/${data.slug}`,
      siteName: 'Nairat Food Services',
      locale: 'en_US',
      type: 'website',
    },
  };
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
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
