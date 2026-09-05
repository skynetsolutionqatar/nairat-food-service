import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageBanner } from '@/components/ui/PageBanner';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Cta } from '@/components/modules/Cta';
import { productCategoriesData } from '@/data/products';

interface PageProps {
  params: Promise<{ category: string }>;
}

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

  return {
    title: `${data.title} — Nairat Food Services Qatar`,
    description: `${data.description} High-yield, temperature-controlled commercial supply across Qatar.`,
    openGraph: {
      title: `${data.title} — Nairat Food Services Qatar`,
      description: data.description,
      url: `https://nairatfood.com/products/${data.slug}`,
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner (Matches /company style: title + breadcrumbs) */}
      <PageBanner
        title={data.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Products' },
          { label: data.title },
        ]}
      />

      {/* 2. 4-in-a-Row Product Grid */}
      <ProductGrid category={data} />

      {/* 3. Final Sourcing & Partner CTA */}
      <Cta />
    </div>
  );
}
