'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import { CtaButton } from '@/components/ui/CtaButton';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';
import { CompanyProfile, companyProfile as defaultCompany } from '@/lib/config/company';

interface StrengthCard {
  id: string;
  number?: string;
  title: string;
  desc: string;
  imageUrl: string;
  alt: string;
}

import type { HomePageContent } from '@/sanity/lib/data';

interface StrengthsProps {
  company?: CompanyProfile;
  content?: HomePageContent;
}

export function Strengths({ company, content }: StrengthsProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale, dict } = useLocale();
  const prefix = locale === 'ar' ? '/ar' : '';
  const profile = company || defaultCompany;
  const isAr = locale === 'ar';

  const eyebrow = isAr
    ? (content?.strengthsEyebrowAr || 'لماذا تختار نيرات')
    : (content?.strengthsEyebrow || 'WHY CHOOSE US');
  const renderHeadline = () => {
    if (!isAr) {
      const text = content?.strengthsTitle || 'Built for Freshness. Ready to Deliver.';
      if (text.includes('Ready to Deliver.')) {
        const parts = text.split('Ready to Deliver.');
        return (
          <>
            {parts[0]} <br />
            Ready to Deliver.
          </>
        );
      }
      return text;
    } else {
      const text = content?.strengthsTitleAr || 'صُممت من أجل النضارة. جاهزون للتوصيل.';
      if (text.includes('جاهزون للتوصيل.')) {
        const parts = text.split('جاهزون للتوصيل.');
        return (
          <>
            {parts[0]} <br />
            جاهزون للتوصيل.
          </>
        );
      }
      return text;
    }
  };

  const strengthsList: StrengthCard[] = [
    {
      id: 'chiller-rooms',
      number: locale === 'ar' ? '20' : '20',
      title: locale === 'ar' ? 'غرف تبريد مخصصة' : 'Dedicated Chiller Rooms',
      desc: isAr
        ? (content?.strengthsChillerDescAr || 'نطاقات درجات حرارة مخصصة تم ضبطها خصيصاً للحفاظ على ذروة النضارة لكل نوع من الفواكه والخضروات.')
        : (content?.strengthsChillerDesc || 'Custom temperature zones configured specifically to maintain peak freshness for every variety of fruits and vegetables.'),
      imageUrl: '/whychooseus/chiller-warehouse.avif',
      alt: '20 Dedicated Chiller Rooms',
    },
    {
      id: 'warehouse',
      number: locale === 'ar' ? (profile.warehouseArea || '5,000 م²').replace(/m²\b/, 'م²') : (profile.warehouseArea || '5,000 m²'),
      title: locale === 'ar' ? 'مستودع سلسلة التبريد' : 'Cold-Chain Warehouse',
      desc: isAr
        ? (content?.strengthsWarehouseDescAr || 'منشأة تخزين مبرد فسيحة وحديثة تضمن مراقبة جودة متواصلة من الاستلام حتى الإرسال.')
        : (content?.strengthsWarehouseDesc || 'Spacious, state-of-the-art cold storage facility ensuring uninterrupted quality control from intake to dispatch.'),
      imageUrl: '/whychooseus/warehouse.avif',
      alt: `${profile.warehouseArea || '5,000 m²'} Cold-Chain Warehouse`,
    },
    {
      id: 'cold-chain',
      title: locale === 'ar' ? 'سلسلة تبريد غير منقطعة' : 'Cold Chain Unbroken',
      desc: isAr
        ? (content?.strengthsColdChainDescAr || 'تدوير صارم بنظام ما يدخل أولاً يخرج أولاً (FIFO) ومراقبة مستمرة للمناخ للحفاظ على المنتجات الطازجة في حالة مثالية عبر جميع مراحل النقل.')
        : (content?.strengthsColdChainDesc || 'Rigorous FIFO rotation and continuous climate monitoring keeping fresh produce in optimal condition across all transit stages.'),
      imageUrl: '/whychooseus/temperature-controlled.avif',
      alt: 'Cold Chain Unbroken',
    },
    {
      id: 'fleet',
      number: profile.fleetVehiclesCount || '40',
      title: locale === 'ar' ? 'مركبات مبردة' : 'Refrigerated Vehicles',
      desc: isAr
        ? (content?.strengthsFleetDescAr || 'أسطول توزيع حديث مضبوط الحرارة يوصل المنتجات الطازجة في جميع أنحاء قطر وفق جداول زمنية دقيقة.')
        : (content?.strengthsFleetDesc || 'Modern temperature-controlled distribution fleet delivering fresh produce across Qatar on precise schedules.'),
      imageUrl: '/whychooseus/truck.avif',
      alt: `${profile.fleetVehiclesCount || '40'} Refrigerated Vehicles`,
    },
  ];

  const tallCard: StrengthCard = {
    id: 'sourced-origin',
    title: locale === 'ar' ? 'التوريد من المنشأ' : 'Sourced at Origin',
    desc: isAr
      ? (content?.strengthsOriginDescAr || 'شراكات مباشرة مع مزارعين دوليين معتمدين تضمن توصيل منتجات طازجة من المزرعة مباشرة إلى قطر.')
      : (content?.strengthsOriginDesc || 'Direct partnerships with certified international growers guaranteeing premium farm-fresh produce delivered directly to Qatar.'),
    imageUrl: '/whychooseus/sourced-from-origin.avif',
    alt: 'Sourced at Origin',
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const headerItems = container.querySelectorAll('.strength-header-item');
      const cards = container.querySelectorAll('.strength-card-item');
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

          if (reduceMotion || isMobile) {
            gsap.set([headerItems, cards], { opacity: 1, y: 0, scale: 1, clearProps: 'all' });
            return;
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top 88%',
              once: true,
            },
          });

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
        },
        containerRef
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="strengths" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 py-14 sm:py-16 2xl:py-22 bg-[#F4F6F5] border-y border-neutral-200/70">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 2xl:space-y-12">
        {/* Header Grid: Left Headline vs Right Subtext & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 2xl:gap-10 items-end">
          {/* Left Headline */}
          <div className="lg:col-span-7 space-y-3">
            <div className="strength-header-item">
              <SectionEyebrow title={eyebrow} />
            </div>
            <h2 className="strength-header-item font-display type-h2 font-semibold text-[#111814] text-start">
              {renderHeadline()}
            </h2>
          </div>

          {/* Right Paragraph & CTA Button */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end space-y-4 2xl:space-y-5">
            <p className="strength-header-item font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-start max-w-[48ch] 2xl:max-w-[52ch]">
              {locale === 'ar'
                ? 'من التوريد العالمي إلى التوصيل في المرحلة الأخيرة، صُممت سلسلة التوريد المتكاملة لدينا لحماية الجودة، والحفاظ على الاتساق، وتوصيل المنتجات الطازجة بموثوقية في جميع أنحاء قطر.'
                : 'From global sourcing to last-mile delivery, our integrated supply chain is designed to protect quality, maintain consistency and deliver fresh produce reliably across Qatar.'}
            </p>
            <div className="strength-header-item self-start lg:self-end">
              <CtaButton href={`${prefix}/quality`}>
                {dict.common.learnMore}
              </CtaButton>
            </div>
          </div>
        </div>

        {/* Bento Grid: 2x2 Left Cards + 1 Tall Right Card */}
        <div className="strengths-bento-grid grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 2xl:gap-6 items-stretch">
          {/* Left 2x2 Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 2xl:gap-6">
            {strengthsList.map((card) => (
              <div
                key={card.id}
                className="strength-card-item group relative overflow-hidden rounded-2xl h-48 sm:h-52 md:h-56 2xl:h-64 shadow-sm flex flex-col justify-end p-5 2xl:p-6 bg-neutral-900 cursor-pointer"
              >
                {/* Background Image with Hover Zoom */}
                <Image
                  src={card.imageUrl}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform transform-gpu"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent group-hover:from-black/80 group-hover:via-black/35 transition-all duration-300 pointer-events-none" />

                {/* Card Content Overlay */}
                <div className="relative z-10 text-white flex flex-col justify-end transition-transform duration-300">
                  {card.number && (
                    <span className="font-display font-semibold text-2xl sm:text-3xl 2xl:text-4xl text-white leading-none block drop-shadow-md mb-1 tracking-[-0.03em] transition-transform duration-300 group-hover:-translate-y-0.5">
                      {card.number}
                    </span>
                  )}
                  <h3 className="font-display font-semibold text-base sm:text-lg 2xl:text-xl text-white tracking-[-0.015em] leading-snug drop-shadow-md">
                    {card.title}
                  </h3>

                  {/* Description Paragraph (Always visible on touch, hover expand on desktop) */}
                  <div className="grid grid-rows-[1fr] sm:grid-rows-[0fr] sm:group-hover:grid-rows-[1fr] transition-all duration-300 ease-out">
                    <div className="overflow-hidden">
                      <p className="font-sans text-[11px] sm:text-xs text-white/90 leading-[1.55] pt-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Tall Card */}
          <div
            className="strength-card-item lg:col-span-1 group relative overflow-hidden rounded-2xl min-h-[220px] sm:min-h-[280px] lg:min-h-full shadow-sm flex flex-col justify-end p-5 sm:p-6 2xl:p-7 bg-neutral-900 cursor-pointer"
          >
            {/* Background Image with Hover Zoom */}
            <Image
              src={tallCard.imageUrl}
              alt={tallCard.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 380px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform transform-gpu"
              loading="lazy"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent group-hover:from-black/80 group-hover:via-black/35 transition-all duration-300 pointer-events-none" />

            {/* Card Content Overlay */}
            <div className="relative z-10 text-white flex flex-col justify-end transition-transform duration-300">
              <h3 className="font-display font-semibold text-lg sm:text-xl 2xl:text-2xl text-white tracking-[-0.02em] leading-snug drop-shadow-md">
                {tallCard.title}
              </h3>

              {/* Description Paragraph */}
              <div className="grid grid-rows-[1fr] sm:grid-rows-[0fr] sm:group-hover:grid-rows-[1fr] transition-all duration-300 ease-out">
                <div className="overflow-hidden">
                  <p className="font-sans text-[11px] sm:text-xs text-white/90 leading-[1.55] pt-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {tallCard.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




