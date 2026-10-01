'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';

export function PartnerLocalGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        '.local-anim-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out' }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="local-partnership"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-[#F4F8F5] text-[#111814] border-y border-[#E3EBE5]/70"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="local-anim-item rounded-3xl bg-white p-7 sm:p-10 border border-neutral-200/90 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Mahaseel Logo Showcase (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#F8FAF8] border border-neutral-200/80">
              <div className="relative h-16 sm:h-20 w-44 sm:w-52 flex items-center justify-center">
                <Image
                  src="/partners/mahaseel.png"
                  alt={isAr ? 'شركة محاصيل للخدمات الزراعية قطر' : 'Mahaseel Agricultural Services Company Qatar'}
                  fill
                  className="object-contain"
                  sizes="210px"
                />
              </div>
              <span className="font-mono text-xs font-bold text-[#168849] uppercase tracking-wider mt-3">
                {isAr ? 'شريك محلي استراتيجي' : 'Strategic Local Partner'}
              </span>
            </div>

            {/* Right Column: Heading & Content (8 cols) */}
            <div className="lg:col-span-8 space-y-4 text-start">
              <SectionEyebrow title={isAr ? 'التحالف الزراعي المحلي' : 'LOCAL AGRICULTURAL ALLIANCE'} />

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111814] tracking-tight">
                {isAr ? 'ربط المزارع القطرية بالأسواق المركزية' : 'Connecting Qatari Farms to the Market'}
              </h3>

              <p className="font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6]">
                {isAr
                  ? 'شراكة استراتيجية مع شركة محاصيل، لربط المزارع القطرية بالأسواق عبر توفير محاصيل محلية موسمية طازجة. نقوم بتجميع المنتجات الزراعية مباشرة من البيوت المحمية والمزارع القطرية، ونقلها وتوزيعها عبر أسطولنا المبرد إلى كبرى منافذ البيع والسوبرماركت في دولة قطر.'
                  : 'Strategic local partnerships with Mahaseel, connecting Qatari farms to the market with Qatari-grown seasonal supply. We aggregate fresh produce directly from local greenhouses and farms, providing cold-chain distribution into commercial supermarkets across Qatar.'}
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm font-semibold text-[#111814]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#168849]" />
                  <span>{isAr ? 'إنتاج قطري موسمي طازج' : 'Qatari-Grown Seasonal Supply'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#168849]" />
                  <span>{isAr ? 'توزيع مباشر من المزرعة إلى الرف' : 'Direct Farm-to-Shelf Distribution'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#168849]" />
                  <span>{isAr ? 'دعم منظومة الأمن الغذائي الوطني' : 'Supporting National Food Security'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
