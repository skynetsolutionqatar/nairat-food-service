'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Accent, MarkedText } from '@/components/ui/Highlight';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLocale } from '@/context/LocaleContext';
import { useSectionReveal } from '@/lib/useSectionReveal';
import type { HomePageContent } from '@/sanity/lib/data';

const sourcingCountries: { en: string; ar: string }[] = [
  { en: 'JORDAN', ar: 'الأردن' },
  { en: 'SAUDI ARABIA', ar: 'المملكة العربية السعودية' },
  { en: 'SYRIA', ar: 'سوريا' },
  { en: 'IRAN', ar: 'إيران' },
  { en: 'LEBANON', ar: 'لبنان' },
  { en: 'EGYPT', ar: 'مصر' },
  { en: 'SOUTH AFRICA', ar: 'جنوب إفريقيا' },
  { en: 'TURKEY', ar: 'تركيا' },
  { en: 'INDIA', ar: 'الهند' },
];

const copy = {
  en: {
    eyebrow: 'SOURCING COUNTRIES',
    title: 'Connecting Global Harvests With Qatar.',
    beyond: 'AND BEYOND',
    mapAlt: 'World map showing the regions Nairat sources from',
  },
  ar: {
    eyebrow: 'بلدان التوريد',
    title: 'نربط المحاصيل العالمية بقطر.',
    beyond: 'والمزيد من الدول',
    mapAlt: 'خريطة العالم توضح مناطق التوريد لدى نيرات',
  },
};

const accentPhrases = ['Qatar.', 'the World', 'بقطر.', 'العالم'];

const pillBase =
  'sourcing-country-pill px-4 py-2.5 rounded-full font-sans text-[13px] leading-none tracking-[0.06em] rtl:tracking-normal';

interface SourcingMapProps {
  content?: HomePageContent;
}

export function SourcingMap({ content }: SourcingMapProps = {}): React.ReactNode {
  const containerRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const text = copy[locale];

  const eyebrow = (isAr ? content?.sourcingMapEyebrowAr : content?.sourcingMapEyebrow) || text.eyebrow;
  const title = (isAr ? content?.sourcingMapTitleAr : content?.sourcingMapTitle) || text.title;

  useSectionReveal(containerRef, ['.sourcing-header-item', '.sourcing-country-pill', '.sourcing-map-item']);

  return (
    <section id="sourcing" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 section-pad bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow={eyebrow}
            title={<MarkedText text={title} phrase={accentPhrases} as={Accent} />}
            itemClassName="sourcing-header-item"
          />

          <ul className="flex flex-wrap gap-2.5">
            {sourcingCountries.map((country) => (
              <li key={country.en} className={cn(pillBase, 'ring-1 ring-inset ring-line font-normal text-ink-muted')}>
                {country[locale]}
              </li>
            ))}
            <li className={cn(pillBase, 'bg-nairat-green font-bold text-white')}>{text.beyond}</li>
          </ul>
        </div>

        <Image
          src="/sourcing/world-map.png"
          alt={text.mapAlt}
          width={862}
          height={484}
          sizes="(max-width: 640px) 320px, (max-width: 768px) 420px, (max-width: 1248px) 50vw, 576px"
          className="sourcing-map-item w-full max-w-[320px] sm:max-w-[420px] md:max-w-none mx-auto h-auto"
        />
      </div>
    </section>
  );
}
