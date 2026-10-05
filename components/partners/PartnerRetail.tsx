'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';

import { partnerLogos, PartnerItem } from '@/data/partners';

import type { PartnersPageContent } from '@/sanity/lib/data';

const retailPartners = partnerLogos.filter((partner) => partner.id !== 'mahaseel');

interface PartnerRetailProps {
  partners?: PartnerItem[];
  content?: PartnersPageContent;
}

export function PartnerRetail({ partners, content }: PartnerRetailProps = {}): React.ReactNode {
  const activePartners = (content?.retailPartners && content.retailPartners.length > 0)
    ? content.retailPartners
    : (partners && partners.length > 0
      ? partners.filter((p) => p.id !== 'mahaseel')
      : retailPartners);

  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const eyebrow = isAr
    ? (content?.retailEyebrowAr || 'شركاؤنا في التجزئة')
    : (content?.retailEyebrow || 'OUR RETAIL PARTNERS');
  const renderHeadline = () => {
    if (!isAr) {
      const text = content?.retailTitle || "Trusted Daily Supplier to Qatar's Leading Retail Groups";
      if (text.includes("Qatar's Leading Retail Groups") || text.includes("Qatar’s Leading Retail Groups")) {
        return (
          <>
            Trusted Daily Supplier to <br />
            <span className="text-[#168849]">Qatar&apos;s Leading Retail Groups</span>
          </>
        );
      }
      return text;
    } else {
      const text = content?.retailTitleAr || 'المورد اليومي الموثوق به لمجموعات التجزئة الرائدة في قطر';
      if (text.includes('لمجموعات التجزئة الرائدة في قطر')) {
        return (
          <>
            المورد اليومي الموثوق به <br />
            <span className="text-[#168849]">لمجموعات التجزئة الرائدة في قطر</span>
          </>
        );
      }
      return text;
    }
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      tl.fromTo(
        '.retail-header-item',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.42 }
      ).fromTo(
        '.retail-grid-container',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45 },
        '-=0.25'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="retail-partners"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="retail-header-item space-y-3 text-start">
          <SectionEyebrow title={eyebrow} />

          <h2 className="font-display type-h2 font-semibold text-[#111814] text-start leading-[1.12]">
            {renderHeadline()}
          </h2>
        </div>

        {/* 4-Column Partner Logo Grid */}
        <div className="retail-grid-container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {activePartners.map((partner, index) => {
            const partnerName = isAr && partner.nameAr ? partner.nameAr : partner.name;
            return (
              <div
                key={partner.id || partner.name || index}
                className="retail-partner-card group p-5 sm:p-6 rounded-2xl bg-[#F8FAF8] border border-neutral-200/90 shadow-2xs hover:shadow-md hover:border-[#168849]/50 hover:bg-white transition-all duration-300 flex items-center justify-center text-center min-h-[110px] sm:min-h-[125px]"
              >
                <div className="relative h-9 sm:h-10 w-28 sm:w-36 flex items-center justify-center">
                  <Image
                    src={partner.image}
                    alt={`${partnerName} logo`}
                    fill
                    sizes="(max-width: 640px) 120px, 150px"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
