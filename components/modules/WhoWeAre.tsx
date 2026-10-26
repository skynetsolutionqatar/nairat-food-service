'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { CtaButton } from '@/components/ui/CtaButton';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';
import type { HomePageContent } from '@/sanity/lib/data';

interface StatItem {
  target: number;
  prefix?: string;
  suffix?: string;
  suffixAr?: string;
  hasSeparator?: boolean;
  displayEn: string;
  displayAr: string;
  labelEn: string;
  labelAr: string;
}

interface MetricCard {
  number: string;
  badgeClass: string;
  title: string;
  description: string;
  isDark: boolean;
}

interface WhoWeAreProps {
  content?: HomePageContent;
}

export function WhoWeAre({ content }: WhoWeAreProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { locale } = useLocale();
  const prefix = locale === 'ar' ? '/ar' : '';
  const isAr = locale === 'ar';

  const eyebrow = isAr
    ? (content?.whoWeAreEyebrowAr || 'من نحن')
    : (content?.whoWeAreEyebrow || 'WHO WE ARE');

  const renderHeadline = () => {
    if (!isAr) {
      const text = content?.whoWeAreTitle || 'Fresh Produce. Strong Supply. Trusted Across Qatar.';
      if (text.includes('Trusted Across Qatar.')) {
        return (
          <>
            Fresh Produce. <br />
            Strong Supply. <br />
            <span className="text-[#168849]">Trusted Across Qatar.</span>
          </>
        );
      }
      return text;
    } else {
      const text = content?.whoWeAreTitleAr || 'منتجات طازجة. إمداد قوي. موثوق في جميع أنحاء قطر.';
      if (text.includes('موثوق في جميع أنحاء قطر.')) {
        return (
          <>
            منتجات طازجة. <br />
            إمداد قوي. <br />
            <span className="text-[#168849]">موثوق في جميع أنحاء قطر.</span>
          </>
        );
      }
      return text;
    }
  };

  const narrative = isAr
    ? (content?.whoWeAreNarrativeAr || 'نيرات فود هي واحدة من الشركات الرائدة في توريد المنتجات الطازجة في قطر، حيث تستورد الفواكه والخضروات الطازجة المتميزة من مناطق زراعية موثوقة حول العالم وتوصلها إلى تجار التجزئة وتجار الجملة وشركات الخدمات الغذائية والمنازل في جميع أنحاء قطر.')
    : (content?.whoWeAreNarrative || 'Nairat Food is one of Qatar’s leading fresh-produce suppliers, sourcing premium fresh fruits and vegetables from trusted growing regions worldwide and delivering them to retailers, wholesalers, food-service businesses and homes across Qatar.');

  const stats: StatItem[] = [
    {
      target: 1200,
      prefix: '',
      suffix: '+',
      hasSeparator: true,
      displayEn: '1,200+',
      displayAr: '1,200+',
      labelEn: 'Active produce lines',
      labelAr: 'أصناف منتجات طازجة',
    },
    {
      target: 15,
      prefix: '',
      suffix: '+',
      hasSeparator: false,
      displayEn: '15+',
      displayAr: '15+',
      labelEn: 'Origin countries',
      labelAr: 'دولة منشأ',
    },
    {
      target: 100,
      prefix: '',
      suffix: '+',
      hasSeparator: false,
      displayEn: '100+',
      displayAr: '100+',
      labelEn: 'Retail branches supplied',
      labelAr: 'فرع تجزئة يتم تزويده',
    },
    {
      target: 100,
      prefix: '~',
      suffix: 't',
      suffixAr: ' طن',
      hasSeparator: false,
      displayEn: '~100t',
      displayAr: '~100 طن',
      labelEn: 'Delivered daily',
      labelAr: 'يتم تسليمها يومياً',
    },
  ];

  const metricCards: MetricCard[] = [
    {
      number: '01',
      badgeClass: 'bg-[#F2BD1D] text-[#111814]',
      title: isAr
        ? (content?.whoWeArePillar1TitleAr || 'التوريد العالمي')
        : (content?.whoWeArePillar1Title || 'Global Sourcing'),
      description: isAr
        ? (content?.whoWeArePillar1DescAr || 'توريد موثوق من مناطق زراعية متعددة حول العالم.')
        : (content?.whoWeArePillar1Desc || 'Reliable sourcing from multiple growing regions across the world.'),
      isDark: true,
    },
    {
      number: '02',
      badgeClass: 'bg-[#168849]/10 text-[#168849]',
      title: isAr
        ? (content?.whoWeArePillar2TitleAr || 'إمداد طوال العام')
        : (content?.whoWeArePillar2Title || 'Year-Round Supply'),
      description: isAr
        ? (content?.whoWeArePillar2DescAr || 'يساعد التوريد الموسمي في الحفاظ على توفر ثابت طوال العام.')
        : (content?.whoWeArePillar2Desc || 'Seasonal sourcing helps maintain consistent availability throughout the year.'),
      isDark: false,
    },
    {
      number: '03',
      badgeClass: 'bg-[#168849]/10 text-[#168849]',
      title: isAr
        ? (content?.whoWeArePillar3TitleAr || 'صُممت لقطر')
        : (content?.whoWeArePillar3Title || 'Built for Qatar'),
      description: isAr
        ? (content?.whoWeArePillar3DescAr || 'توزيع موثوق، وخدمات لوجستية لسلسلة التبريد، وتوصيل يومي في جميع أنحاء قطر.')
        : (content?.whoWeArePillar3Desc || 'Trusted distribution, cold-chain logistics and daily delivery across Qatar.'),
      isDark: false,
    },
  ];

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const headerItems = container.querySelectorAll('.who-header-item');
      const cards = container.querySelectorAll('.metric-card');
      if (headerItems.length === 0 || cards.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: '(max-width: 768px)',
          isDesktop: '(min-width: 769px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isMobile, reduceMotion } = context.conditions as {
            isMobile: boolean;
            isDesktop: boolean;
            reduceMotion: boolean;
          };

          if (reduceMotion) {
            gsap.set([headerItems, cards], { opacity: 1, y: 0, scale: 1, clearProps: 'all' });
            return;
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              once: true,
            },
          });

          if (!isMobile) {
            tl.fromTo(
              headerItems,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.05,
                ease: 'power3.out',
                clearProps: 'opacity,transform',
              }
            ).fromTo(
              cards,
              { opacity: 0, y: 20, scale: 0.99 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.48,
                stagger: 0.06,
                ease: 'power3.out',
                clearProps: 'opacity,transform',
              },
              '-=0.25'
            );
          } else {
            gsap.set([headerItems, cards], { opacity: 1, y: 0, scale: 1, clearProps: 'all' });
          }

          // Count-up animation for stats
          stats.forEach((stat, idx) => {
            const el = statRefs.current[idx];
            if (!el) return;

            const counter = { val: 0 };
            const suffix = isAr && stat.suffixAr !== undefined ? stat.suffixAr : (stat.suffix || '');
            const prefix = stat.prefix || '';

            tl.to(
              counter,
              {
                val: stat.target,
                duration: 1.6,
                ease: 'power2.out',
                onStart: () => {
                  el.textContent = `${prefix}0${suffix}`;
                },
                onUpdate: () => {
                  const current = Math.floor(counter.val);
                  const formatted = stat.hasSeparator
                    ? current.toLocaleString('en-US')
                    : current.toString();
                  el.textContent = `${prefix}${formatted}${suffix}`;
                },
                onComplete: () => {
                  el.textContent = isAr ? stat.displayAr : stat.displayEn;
                },
              },
              isMobile ? 0 : 0.1
            );
          });
        },
        containerRef
      );
    },
    { scope: containerRef, dependencies: [isAr] }
  );

  return (
    <section id="about" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 py-14 sm:py-16 2xl:py-22 bg-white overflow-hidden">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 2xl:space-y-12">
        {/* Top Section Content: Eyebrow + Title on left, Narrative on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 2xl:gap-10 items-start">
          <div className="md:col-span-7 space-y-3">
            <div className="who-header-item">
              <SectionEyebrow title={eyebrow} />
            </div>
            <h2 className="who-header-item font-display type-h2 max-[359px]:text-[26px]! font-semibold text-[#111814] text-start">
              {renderHeadline()}
            </h2>
          </div>

          <div className="md:col-span-5 flex flex-col items-start md:pt-8">
            <p className="who-header-item font-sans text-sm lg:text-[15px] xl:text-base 2xl:text-[17px] text-[#6B7280] leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]">
              {narrative}
            </p>
          </div>
        </div>

        {/* Stats & CTA Row */}
        <div className="who-header-item flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 border-b border-neutral-200/90 pb-8 sm:pb-9 2xl:pb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 sm:gap-6 lg:gap-10 xl:gap-14">
            {stats.map((stat, idx) => (
              <div key={idx} className="who-stat-item flex flex-col text-start">
                <span
                  ref={(el) => {
                    statRefs.current[idx] = el;
                  }}
                  className="font-display font-bold text-[26px] min-[360px]:text-[28px] md:text-3xl lg:text-[34px] xl:text-[38px] 2xl:text-[42px] text-[#111814] tracking-tight leading-none tabular-nums"
                  dir={isAr ? 'rtl' : 'ltr'}
                >
                  {isAr ? stat.displayAr : stat.displayEn}
                </span>
                <span className="font-sans text-xs sm:text-[13px] xl:text-sm 2xl:text-[15px] text-[#6B7280] font-normal mt-2 leading-tight">
                  {isAr ? stat.labelAr : stat.labelEn}
                </span>
              </div>
            ))}
          </div>

          <div className="shrink-0 self-start lg:self-center">
            <CtaButton
              href={`${prefix}/company`}
              text={locale === 'ar' ? 'اكتشف قصتنا' : 'Discover Our Story'}
            />
          </div>
        </div>

        {/* 3 Metric Cards Horizontal Grid */}
        <div className="metric-cards-grid grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 2xl:gap-6 pt-1">
          {metricCards.map((card) => (
            <div
              key={card.number}
              className={`metric-card group rounded-2xl sm:rounded-3xl p-5 lg:p-7 2xl:p-8 md:min-h-[180px] lg:min-h-[200px] 2xl:min-h-[220px] flex flex-col justify-between space-y-4 md:space-y-6 transition-[background-color,border-color,box-shadow,transform] duration-300 will-change-transform hover:-translate-y-1 ${
                card.isDark
                  ? 'bg-[#232323] text-white shadow-md hover:shadow-xl'
                  : 'bg-white text-[#111814] border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md'
              }`}
            >
              {/* Badge Header */}
              <div>
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-display font-semibold text-xs tracking-tight ${card.badgeClass}`}
                >
                  {card.number}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <h3
                  className={`font-display font-semibold text-base lg:text-lg xl:text-xl 2xl:text-[22px] tracking-[-0.015em] leading-snug ${
                    card.isDark ? 'text-white' : 'text-[#111814]'
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`font-sans text-[13px] lg:text-sm 2xl:text-[15px] leading-[1.55] ${
                    card.isDark ? 'text-gray-300' : 'text-[#6B7280]'
                  }`}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
