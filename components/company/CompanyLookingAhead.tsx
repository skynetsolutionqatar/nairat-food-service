'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';
import type { CompanyPageContent } from '@/sanity/lib/data';

interface CompanyLookingAheadProps {
  content?: CompanyPageContent;
}

export function CompanyLookingAhead({ content }: CompanyLookingAheadProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const eyebrow = isAr
    ? (content?.lookingAheadEyebrowAr || 'التطلع إلى الأمام')
    : (content?.lookingAheadEyebrow || 'Looking Ahead');

  const headline = isAr
    ? (content?.lookingAheadHeadlineAr || 'بناء مستقبل إمداد المنتجات الطازجة')
    : (content?.lookingAheadHeadline || 'Building the Future of Fresh-Produce Supply');

  const defaultParagraphs = isAr
    ? [
        'تواصل نيرات للأغذية تعزيز شبكة التوريد الخاصة بها، وقدراتها التشغيلية، وبنيتها التحتية لتلبية الاحتياجات المتطورة لقطاعي الأغذية والتجزئة في قطر.',
        'يظل تركيزنا منصباً على بناء شراكات أقوى، وتوسيع نطاق الوصول إلى منتجات عالية الجودة، وتقديم إمداد موثوق من المنتجات الطازجة طوال العام.',
      ]
    : [
        "Nairat Food continues to strengthen its sourcing network, operational capabilities and infrastructure to meet the evolving needs of Qatar's food and retail sectors.",
        'Our focus remains on building stronger partnerships, expanding access to quality produce and delivering a dependable fresh-produce supply throughout the year.',
      ];

  const narrativeText = isAr ? content?.lookingAheadNarrativeAr : content?.lookingAheadNarrative;
  const paragraphs = narrativeText?.includes('\n')
    ? narrativeText.split(/\n\s*\n|\n/).filter(Boolean)
    : narrativeText
    ? [narrativeText]
    : defaultParagraphs;

  const ambitionLabel = isAr
    ? (content?.lookingAheadAmbitionLabelAr || 'طموحنا الاستراتيجي')
    : (content?.lookingAheadAmbitionLabel || 'Our Strategic Ambition');

  const ambitionQuote = isAr
    ? (content?.lookingAheadAmbitionQuoteAr || '«أن نصبح شريك المنتجات الطازجة الموثوق به للشركات والمستهلكين في جميع أنحاء قطر.»')
    : (content?.lookingAheadAmbitionQuote || '“To become the trusted fresh-produce partner for businesses and consumers across Qatar.”');

  const imageUrl = content?.lookingAheadImageUrl || '/whychooseus/truck.avif';

  const badgeText = isAr
    ? (content?.lookingAheadBadgeTextAr || 'شبكة التوصيل المبرد')
    : (content?.lookingAheadBadgeText || 'Refrigerated Delivery Network');

  const badgeSubtext = isAr
    ? (content?.lookingAheadBadgeSubtextAr || 'نشط 24/7')
    : (content?.lookingAheadBadgeSubtext || 'Active 24/7');

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const card = section.querySelector('.ahead-feature-card');
    if (!card) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 88%',
        once: true,
      },
    });

    timeline.fromTo(
      card,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
    );
  });

  return (
    <section
      id="looking-ahead"
      ref={sectionRef}
      className="scroll-mt-24 py-10 sm:py-12 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ahead-feature-card rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-md transition-shadow duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Narrative & Ambition (7 cols) */}
            <div className="lg:col-span-7 space-y-4 text-start">
              <SectionEyebrow title={eyebrow} />

              <h3 className="font-display font-semibold text-2xl sm:text-3xl 2xl:text-4xl text-[#111814] tracking-tight leading-[1.18]">
                {headline}
              </h3>

              <div className="space-y-3 font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6]">
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Ambition Highlight Quote Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F6F5] border-s-4 border-[#168849] space-y-1">
                <span className="font-eyebrow text-xs font-bold uppercase tracking-wider text-[#168849]">
                  {ambitionLabel}
                </span>
                <p className="font-display text-base font-semibold text-[#111814] leading-snug">
                  {ambitionQuote}
                </p>
              </div>
            </div>

            {/* Right: Image (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-neutral-100 border border-neutral-200/80">
                <Image
                  src={imageUrl}
                  alt={isAr ? 'أسطول نيرات للأغذية اللوجستي المبرد الحديث' : 'Nairat Food Modern Refrigerated Logistics Fleet'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-white text-xs font-semibold px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md">
                  <span>{badgeText}</span>
                  <span className="text-[#D4F056]">{badgeSubtext}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
