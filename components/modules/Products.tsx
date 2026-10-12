'use client';

import React, { useRef } from 'react';
import { CategoryRail } from '@/components/products/CategoryRail';
import { MarkedText } from '@/components/ui/Highlight';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import { useLocale } from '@/context/LocaleContext';
import { homeProductSlides, ProductRail } from '@/data/homeProductRails';
import { useAutoRotate } from '@/lib/useAutoRotate';
import { useSectionReveal } from '@/lib/useSectionReveal';
import type { HomePageContent } from '@/sanity/lib/data';

const highlightPhrases = ['Around the World.', 'جميع أنحاء العالم.'];
const ROTATE_INTERVAL_MS = 5500;

interface SlidePagerProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

function slideName(slide: ProductRail[], locale: 'en' | 'ar'): string {
  return slide.map((rail) => rail.label[locale]).join(locale === 'ar' ? ' و' : ' and ');
}

function SlidePager({ activeIndex, onSelect }: SlidePagerProps) {
  const { locale } = useLocale();

  return (
    <div className="product-header-item flex justify-center gap-1 mb-8">
      {homeProductSlides.map((slide, index) => (
        <button
          key={slide[0].slug}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={slideName(slide, locale)}
          aria-pressed={index === activeIndex}
          className="grid place-items-center w-11 h-11 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-nairat-green-deep"
        >
          <span
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              index === activeIndex ? 'w-8 bg-nairat-green' : 'w-2 bg-ink/30'
            )}
          />
        </button>
      ))}
    </div>
  );
}

export function Products({ content }: { content?: HomePageContent } = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const { index, fading, goTo, setPaused } = useAutoRotate({
    count: homeProductSlides.length,
    intervalMs: ROTATE_INTERVAL_MS,
    containerRef,
  });

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
        className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-6"
      />

      <SlidePager activeIndex={index} onSelect={goTo} />

      {/* Rotation pauses while the pointer or keyboard focus is on the rails */}
      <div
        className={cn('transition-opacity duration-200 motion-reduce:transition-none', fading ? 'opacity-0' : 'opacity-100')}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {homeProductSlides[index].map((rail) => (
          <CategoryRail key={rail.slug} rail={rail} />
        ))}
      </div>
    </section>
  );
}
