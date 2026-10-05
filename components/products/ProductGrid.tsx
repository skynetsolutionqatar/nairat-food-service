'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ProductCategoryData } from '@/data/products';
import { ProductCard } from './ProductCard';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';
import { gsap, useGSAP } from '@/lib/gsap';
import type { CategorySectionItem, ProductsPageContent } from '@/sanity/lib/data';

interface ProductGridProps {
  category: ProductCategoryData;
  categorySection?: CategorySectionItem;
  pageContent?: ProductsPageContent;
}

const CATEGORY_TABS = [
  { slug: 'vegetables', label: 'Fresh Vegetables', labelAr: 'خضروات طازجة' },
  { slug: 'fruits', label: 'Fresh Fruits', labelAr: 'فواكه طازجة' },
  { slug: 'leafy-herbs', label: 'Leafy & Herbs', labelAr: 'ورقيات وأعشاب' },
  { slug: 'specialty-gourmet', label: 'Specialty & Gourmet', labelAr: 'أصناف خاصة وفاخرة' },
];

export function ProductGrid({ category, categorySection }: ProductGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const prefix = isAr ? '/ar' : '';

  const eyebrow = isAr
    ? (categorySection?.badgeAr || 'منتجاتنا')
    : (categorySection?.badge || 'OUR PRODUCE');

  const title = isAr
    ? (categorySection?.titleAr || category.title)
    : (categorySection?.title || category.title);

  const subtitle = isAr
    ? (categorySection?.subtitleAr || category.subtitle)
    : (categorySection?.subtitle || category.subtitle);

  const description = isAr
    ? (categorySection?.descriptionAr || category.description)
    : (categorySection?.description || category.description);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 88%',
          once: true,
        },
      });

      tl.fromTo(
        '.grid-header-anim',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      ).fromTo(
        '.grid-card-anim',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' },
        '-=0.2'
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Category Filter Pills */}
        <div className="grid-header-anim flex flex-wrap items-center justify-center gap-2">
          {CATEGORY_TABS.map((tab) => {
            const isActive = tab.slug === category.slug;
            return (
              <Link
                key={tab.slug}
                href={`${prefix}/products/${tab.slug}`}
                className={`font-sans text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#168849] text-white shadow-md shadow-[#168849]/25 scale-105 pointer-events-none'
                    : 'bg-[#F4F6F5] text-[#6B7280] hover:text-[#111814] hover:bg-[#eaecea]'
                }`}
              >
                {isAr ? tab.labelAr : tab.label}
              </Link>
            );
          })}
        </div>

        {/* Category Header Narrative */}
        <div className="grid-header-anim text-start max-w-3xl space-y-3">
          <SectionEyebrow title={eyebrow} />
          <h2 className="font-display type-h2 font-semibold text-[#111814] leading-[1.15]">
            {title}
          </h2>
          {subtitle && (
            <p className="font-sans text-xs sm:text-sm font-medium text-[#168849] leading-relaxed">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* 4-in-a-Row Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {category.products.map((product) => (
            <div key={product.id} className="grid-card-anim">
              <ProductCard
                product={product}
                categorySlug={category.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
