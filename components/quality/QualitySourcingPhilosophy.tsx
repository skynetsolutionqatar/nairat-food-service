'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, ShieldCheck, Sprout, ArrowRight, Calendar } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { CtaButton } from '../ui/CtaButton';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';
import type { QualityPageContent } from '@/sanity/lib/data';

interface QualitySourcingPhilosophyProps {
  content?: QualityPageContent;
}

export function QualitySourcingPhilosophy({ content }: QualitySourcingPhilosophyProps = {}): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const eyebrow = isAr
    ? (content?.philosophyEyebrowAr || 'فلسفة التوريد لدينا')
    : (content?.philosophyEyebrow || 'OUR SOURCING PHILOSOPHY');

  const renderHeadline = () => {
    if (!isAr) {
      const text = content?.philosophyTitle || 'Fresh Produce, Sourced Responsibly.';
      if (text.includes('Sourced Responsibly.')) {
        return (
          <>
            Fresh Produce, <br className="hidden sm:inline" />
            Sourced Responsibly.
          </>
        );
      }
      return text;
    } else {
      const text = content?.philosophyTitleAr || 'منتجات طازجة، تم توريدها بمسؤولية.';
      if (text.includes('تم توريدها بمسؤولية.')) {
        return (
          <>
            منتجات طازجة، <br className="hidden sm:inline" />
            تم توريدها بمسؤولية.
          </>
        );
      }
      return text;
    }
  };
  const narrative = isAr
    ? (content?.philosophyNarrativeAr || 'نحن نعمل مع مزارعين وموردين موثوقين في جميع أنحاء العالم، ونجمع بين الشراكات العالمية القوية والخبرة المحلية لجلب أفضل المنتجات الطازجة إلى قطر.')
    : (content?.philosophyNarrative || 'We work with trusted growers and suppliers across the world, combining strong global partnerships with local expertise to bring the best fresh produce to Qatar.');

  const pillars = [
    {
      icon: <Globe className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
      title: isAr
        ? (content?.philosophyPillar1TitleAr || 'شبكة عالمية')
        : (content?.philosophyPillar1Title || 'Global Network'),
      description: isAr
        ? (content?.philosophyPillar1DescAr || 'شركاء موثوقون عبر 60 دولة')
        : (content?.philosophyPillar1Desc || 'Trusted partners across 60 countries'),
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
      title: isAr
        ? (content?.philosophyPillar2TitleAr || 'الجودة أولاً')
        : (content?.philosophyPillar2Title || 'Quality First'),
      description: isAr
        ? (content?.philosophyPillar2DescAr || 'فحص صارم في كل مرحلة')
        : (content?.philosophyPillar2Desc || 'Strict inspection at every stage'),
    },
    {
      icon: <Sprout className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
      title: isAr
        ? (content?.philosophyPillar3TitleAr || 'توريد مستدام')
        : (content?.philosophyPillar3Title || 'Sustainable Sourcing'),
      description: isAr
        ? (content?.philosophyPillar3DescAr || 'دعم ممارسات الزراعة المسؤولة')
        : (content?.philosophyPillar3Desc || 'Supporting responsible farming practices'),
    },
  ];

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
        '.philosophy-anim-left',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
      ).fromTo(
        '.philosophy-anim-right',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.35'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Narrative & 3 Value Pillars (5 cols) */}
          <div className="philosophy-anim-left lg:col-span-5 space-y-6 text-start">
            <SectionEyebrow title={eyebrow} />

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111814] leading-[1.14] tracking-tight">
              {renderHeadline()}
            </h2>

            <p className="font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6]">
              {narrative}
            </p>

            {/* 3 Pillars Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-neutral-100">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="space-y-2">
                  <div className="w-10 h-10 rounded-full border border-[#168849]/30 bg-[#168849]/5 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xs sm:text-[13px] text-[#111814] leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-[11px] text-[#6B7280] leading-[1.4] mt-0.5">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sourcing From Around the World Feature Card (7 cols) */}
          <div className="philosophy-anim-right lg:col-span-7">
            <div className="rounded-3xl bg-[#F4F8F5] p-5 sm:p-7 border border-[#E3EBE5] space-y-6 shadow-2xs">
              {/* Top Row: Cargo Ship Photo (Left) + Text & CTA (Right) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center">
                <div className="sm:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs">
                  <Image
                    src="/quality/cargo-ship.jpg"
                    alt={isAr ? 'شحنات استيراد بحري للمحاصيل الزراعية' : 'International Sourcing Cargo Container Ship'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 360px"
                  />
                </div>

                <div className="sm:col-span-6 space-y-3 text-start">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#111814] leading-snug">
                    {isAr ? (
                      <>
                        التوريد من <br />
                        جميع أنحاء العالم
                      </>
                    ) : (
                      <>
                        Sourcing from <br />
                        Around the World
                      </>
                    )}
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-[#6B7280] leading-[1.6]">
                    {isAr
                      ? 'نحن نورد منتجات طازجة من مناطق الزراعة الرائدة عبر بلاد الشام، والخليج، وإفريقيا، وآسيا وما وراءها، مما يضمن إمداداً متسقاً وتوافراً على مدار العام.'
                      : 'We source fresh produce from leading growing regions across the Levant, Gulf, Africa, Asia and beyond, ensuring consistent supply and year-round availability.'}
                  </p>
                  <div className="pt-1">
                    <CtaButton
                      href={isAr ? '/ar/company#sourcing' : '/company#sourcing'}
                      text={isAr ? 'مناطق التوريد لدينا' : 'Our Sourcing Regions'}
                      variant="primary"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Row: 3 Highlight Metrics */}
              <div className="pt-4 border-t border-[#E3EBE5] grid grid-cols-3 gap-3 sm:gap-4 items-center text-start">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E3EBE5] flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-[#168849]" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-base sm:text-lg text-[#111814] block leading-none">
                      15+
                    </span>
                    <span className="text-[11px] text-[#6B7280] block mt-0.5">
                      {isAr ? 'أصول رئيسية' : 'Core Origins'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E3EBE5] flex items-center justify-center shrink-0">
                    <Sprout className="w-4 h-4 text-[#168849]" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-base sm:text-lg text-[#111814] block leading-none">
                      1,200+
                    </span>
                    <span className="text-[11px] text-[#6B7280] block mt-0.5">
                      {isAr ? 'خطوط نشطة' : 'Active Lines'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E3EBE5] flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-[#168849]" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm sm:text-base text-[#111814] block leading-none whitespace-nowrap">
                      {isAr ? 'على مدار العام' : 'Year-Round'}
                    </span>
                    <span className="text-[11px] text-[#6B7280] block mt-0.5">
                      {isAr ? 'التوافر' : 'Availability'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
