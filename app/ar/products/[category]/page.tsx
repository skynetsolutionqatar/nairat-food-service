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

const categoryArabicTitles: Record<string, string> = {
  vegetables: 'خضروات طازجة',
  fruits: 'فواكه طازجة',
  'leafy-herbs': 'ورقيات وأعشاب',
  'specialty-gourmet': 'أصناف خاصة وفاخرة',
};

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
      title: 'منتجاتنا — توريد المنتجات الطازجة بالجملة',
      description: 'استكشف خطوط منتجات نيرات للخدمات الغذائية في قطر.',
      pathname: '/ar/products/vegetables',
      isArabic: true,
    });
  }

  const categorySection = await getCategorySection(category);
  const arabicTitle =
    categorySection?.titleAr || categoryArabicTitles[category] || data.title;
  const arabicDesc = categorySection?.descriptionAr || data.description;

  return buildPageMetadata({
    title: `${arabicTitle} بالجملة والتوزيع`,
    description: `توريد تجاري عالي الجودة ويتم التحكم في درجة حرارته لـ ${arabicTitle} في جميع أنحاء قطر.`,
    pathname: `/ar/products/${data.slug}`,
    isArabic: true,
  });
}

export default async function ArabicProductCategoryPage({ params }: PageProps): Promise<React.ReactNode> {
  const { category } = await params;
  const data = productCategoriesData[category];

  if (!data) {
    notFound();
  }

  const [products, categorySection] = await Promise.all([
    getProducts(category),
    getCategorySection(category),
  ]);

  const arabicCategoryTitle =
    categorySection?.titleAr || categoryArabicTitles[category] || data.title;

  const categoryData = {
    ...data,
    title: arabicCategoryTitle,
    products,
  };

  const breadcrumbsData = [
    { name: 'الرئيسية', url: '/ar' },
    { name: 'منتجاتنا', url: '/ar/products/vegetables' },
    { name: arabicCategoryTitle, url: `/ar/products/${data.slug}` },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <JsonLd data={getBreadcrumbJsonLd(breadcrumbsData)} />
      {/* 1. Header Banner (Matches original clean style: title + breadcrumbs) */}
      <PageBanner
        title={arabicCategoryTitle}
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'منتجاتنا' },
          { label: arabicCategoryTitle },
        ]}
      />

      {/* 2. 4-in-a-Row Product Grid (Older clean layout) */}
      <ProductGrid category={categoryData} />

      {/* 3. Final Sourcing & Partner CTA */}
      <Cta />
    </div>
  );
}
