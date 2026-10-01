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

const categoryArabicTitles: Record<string, string> = {
  vegetables: 'خضروات طازجة',
  fruits: 'فواكه طازجة',
  'leafy-herbs': 'ورقيات وأعشاب',
  'specialty-gourmet': 'أصناف فاخرة ونادرة',
};

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
      title: 'منتجاتنا — نيرات للخدمات الغذائية قطر',
      description: 'استكشف خطوط إنتاج نيرات للخدمات الغذائية في دولة قطر.',
    };
  }

  const arabicTitle = categoryArabicTitles[category] || data.title;

  return {
    title: `${arabicTitle} — نيرات للخدمات الغذائية قطر`,
    description: `توريد تجاري عالي الجودة ومضبوط بدرجات الحرارة لـ ${arabicTitle} في كافة أنحاء دولة قطر.`,
    openGraph: {
      title: `${arabicTitle} — نيرات للخدمات الغذائية`,
      description: data.description,
      url: `https://nairatfoodservices.com/ar/products/${data.slug}`,
      siteName: 'نيرات للخدمات الغذائية',
      locale: 'ar_QA',
      type: 'website',
    },
  };
}

export default async function ArabicProductCategoryPage({ params }: PageProps): Promise<React.ReactNode> {
  const { category } = await params;
  const data = productCategoriesData[category];

  if (!data) {
    notFound();
  }

  const arabicTitle = categoryArabicTitles[category] || data.title;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title={arabicTitle}
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'منتجاتنا' },
          { label: arabicTitle },
        ]}
      />

      {/* 2. 4-in-a-Row Product Grid */}
      <ProductGrid category={data} />

      {/* 3. Final Sourcing & Partner CTA */}
      <Cta />
    </div>
  );
}
