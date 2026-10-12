'use client';

import React, { useRef } from 'react';
import { CategoryRail } from '@/components/products/CategoryRail';
import { MarkedText } from '@/components/ui/Highlight';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLocale } from '@/context/LocaleContext';
import { homeProductRails } from '@/data/homeProductRails';
import { useSectionReveal } from '@/lib/useSectionReveal';
import type { HomePageContent } from '@/sanity/lib/data';

const highlightPhrases = ['Around the World.', 'جميع أنحاء العالم.'];

export function Products({ content }: { content?: HomePageContent } = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const eyebrow = (isAr ? content?.productsEyebrowAr : content?.productsEyebrow) || (isAr ? 'منتجاتنا' : 'OUR PRODUCTS');
  const title =
    (isAr ? content?.productsTitleAr : content?.productsTitle) ||
    (isAr ? 'نضارة، تم توريدها من جميع أنحاء العالم.' : 'Freshness, Sourced From Around the World.');

  useSectionReveal(containerRef, ['.product-header-item', '.product-rail-item']);

  return (
    <section id="products" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 pt-16 lg:pt-24 bg-white overflow-hidden">
      <SectionHeading
        align="center"
        eyebrow={eyebrow}
        title={<MarkedText text={title} phrase={highlightPhrases} />}
        itemClassName="product-header-item"
        className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-10"
      />

      {homeProductRails.map((rail) => (
        <CategoryRail key={rail.slug} rail={rail} />
      ))}
    </section>
  );
}
