'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import type { Marker, Arc } from '@/components/ui/cobe-globe';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';

const Globe = dynamic(
  () => import('@/components/ui/cobe-globe').then((mod) => mod.Globe),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square max-w-[360px] 2xl:max-w-[420px] rounded-full bg-neutral-100/60 animate-pulse flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border border-[#168849]/20" />
      </div>
    ),
  }
);

const sourcingCountriesData: { en: string; ar: string }[] = [
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

const globeMarkers: Marker[] = [
  { id: 'uae', location: [25.2048, 55.2708], label: 'Qatar & Gulf Hub' },
  { id: 'saudi', location: [24.7136, 46.6753], label: 'Saudi Arabia' },
  { id: 'jordan', location: [31.9539, 35.9106], label: 'Jordan' },
  { id: 'egypt', location: [30.0444, 31.2357], label: 'Egypt' },
  { id: 'turkey', location: [39.9334, 32.8597], label: 'Turkey' },
  { id: 'india', location: [20.5937, 78.9629], label: 'India' },
  { id: 'southafrica', location: [-30.5595, 22.9375], label: 'South Africa' },
  { id: 'lebanon', location: [33.8938, 35.5018], label: 'Lebanon' },
];

const globeArcs: Arc[] = [
  { id: 'india-uae', from: [20.5937, 78.9629], to: [25.2048, 55.2708], label: 'India → Qatar' },
  { id: 'egypt-uae', from: [30.0444, 31.2357], to: [25.2048, 55.2708], label: 'Egypt → Qatar' },
  { id: 'turkey-uae', from: [39.9334, 32.8597], to: [25.2048, 55.2708], label: 'Turkey → Qatar' },
  { id: 'jordan-uae', from: [31.9539, 35.9106], to: [25.2048, 55.2708], label: 'Jordan → Qatar' },
];

export function SourcingMap(): React.ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          once: true,
        },
      });

      tl.fromTo(
        '.sourcing-globe-container',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.75, ease: 'power3.out' }
      )
        .fromTo(
          '.sourcing-header-item',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.sourcing-country-pill',
          { opacity: 0, scale: 0.9, y: 12 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.04, ease: 'back.out(1.5)' },
          '-=0.4'
        );
    },
    { scope: containerRef }
  );

  return (
    <section id="sourcing" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 py-8 sm:py-10 lg:py-14 2xl:py-16 bg-white overflow-hidden">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 2xl:gap-12 items-center">
          
          {/* Left Column: Interactive 3D World Globe (40% / 5 cols) */}
          <div className="sourcing-globe-container lg:col-span-5 relative flex items-center justify-center w-full max-w-sm mx-auto lg:max-w-none will-change-transform">
            <div className="w-full aspect-square max-w-[360px] 2xl:max-w-[420px]">
              <Globe
                markers={globeMarkers}
                arcs={globeArcs}
                markerColor={[0.086, 0.533, 0.286]}
                baseColor={[0.95, 0.96, 0.95]}
                glowColor={[0.92, 0.95, 0.93]}
                dark={0}
                mapBrightness={8}
                diffuse={1.2}
              />
            </div>
          </div>

          {/* Right Column: Sourcing Text & Country Pills (60% / 7 cols) */}
          <div className="lg:col-span-7 space-y-5 2xl:space-y-6">
            <div className="sourcing-header-item">
              <SectionEyebrow title={isAr ? 'بلدان الاستيراد والتوريد' : 'SOURCING COUNTRIES'} />
            </div>

            <h2 className="sourcing-header-item font-display type-h2 font-semibold text-[#111814] text-start">
              {isAr ? (
                <>
                  نستورد محاصيلنا من أجود <br />
                  <span className="text-[#168849]">مزارع العالم.</span>
                </>
              ) : (
                <>
                  Sourced From Around <br />
                  <span className="text-[#168849]">the World.</span>
                </>
              )}
            </h2>

            {/* Country Pill Badges Grid */}
            <div className="flex flex-wrap gap-2 2xl:gap-3 pt-1 max-w-2xl 2xl:max-w-3xl">
              {sourcingCountriesData.map((item) => (
                <span
                  key={item.en}
                  className="sourcing-country-pill font-sans text-xs sm:text-[12.5px] 2xl:text-[13px] font-semibold uppercase tracking-[0.05em] px-3.5 sm:px-4 2xl:px-5 py-1.5 sm:py-2 2xl:py-2.5 rounded-full border border-neutral-200 bg-neutral-50 text-[#6B7280] shadow-2xs hover:bg-[#168849]/10 hover:border-[#168849]/40 hover:text-[#168849] hover:scale-105 transition-all duration-200 cursor-default will-change-transform"
                >
                  {isAr ? item.ar : item.en}
                </span>
              ))}

              <span className="sourcing-country-pill font-sans text-xs sm:text-[12.5px] 2xl:text-[13px] font-semibold uppercase tracking-[0.05em] px-4 sm:px-5 2xl:px-6 py-1.5 sm:py-2 2xl:py-2.5 rounded-full bg-[#168849] text-white shadow-md shadow-[#168849]/20 hover:scale-105 transition-transform duration-200 will-change-transform">
                {isAr ? 'والمزيد من الدول' : 'AND BEYOND'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
