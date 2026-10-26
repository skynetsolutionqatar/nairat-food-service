'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';
import type { CompanyPageContent } from '@/sanity/lib/data';

interface CompanyCeoMessageProps {
  content?: CompanyPageContent;
}

export function CompanyCeoMessage({ content }: CompanyCeoMessageProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const eyebrow = isAr
    ? (content?.ceoEyebrowAr || 'رسالة القيادة')
    : (content?.ceoEyebrow || 'LEADERSHIP MESSAGE');

  const renderHeading = () => {
    if (!isAr) {
      const text = content?.ceoHeading || 'Committed to Freshness. Driven by Qatar’s Vision.';
      if (text.includes('Driven by Qatar’s Vision.')) {
        const parts = text.split('Driven by Qatar’s Vision.');
        return (
          <>
            {parts[0]} <br className="hidden sm:inline" />
            <span className="text-[#168849]">Driven by Qatar’s Vision.</span>
            {parts[1]}
          </>
        );
      }
      return text;
    } else {
      const text = content?.ceoHeadingAr || 'ملتزمون بالنضارة. مدفوعون برؤية قطر.';
      if (text.includes('مدفوعون برؤية قطر.')) {
        const parts = text.split('مدفوعون برؤية قطر.');
        return (
          <>
            {parts[0]} <br className="hidden sm:inline" />
            <span className="text-[#168849]">مدفوعون برؤية قطر.</span>
            {parts[1]}
          </>
        );
      }
      return text;
    }
  };

  const rawCeoName = isAr
    ? (content?.ceoNameAr || 'حيدر علي غلام حسين حيدري')
    : (content?.ceoName || 'Haidar Ali Ghulamhussain Haidari');
  const ceoName =
    rawCeoName === 'Nasser Al-Kuwari'
      ? 'Haidar Ali Ghulamhussain Haidari'
      : rawCeoName === 'ناصر الكواري'
      ? 'حيدر علي غلام حسين حيدري'
      : rawCeoName;

  const ceoTitle = isAr
    ? (content?.ceoTitleAr || 'الرئيس التنفيذي، نيرات للخدمات الغذائية')
    : (content?.ceoTitle || 'Chief Executive Officer, Nairat Food Services');

  const quote = isAr
    ? (content?.ceoQuoteAr ||
        'رسالتنا تتجاوز مجرد توريد المنتجات، بل تتمحور حول تعزيز منظومة الأمن الغذائي في قطر بموثوقية لا تهاون فيها وتميز مستمد من أصالة المزارع.')
    : (content?.ceoQuote ||
        'Our mission goes beyond delivering produce; it is about strengthening Qatar’s food ecosystem with uncompromising reliability and farm-fresh excellence.');

  const defaultParagraphs = isAr
    ? [
        'منذ تأسيسنا في عام 2020، انطلقت نيرات للخدمات الغذائية بتركيز راسخ على جودة الغذاء، وتطوير بنية تحتية حديثة لسلسلة التبريد، وبناء شراكات وثيقة وموثوقة حول العالم.',
        'يعمل فريقنا المتفاني يومياً لربط حقول الحصاد العالمية مباشرة بكبرى المتاجر، والمطاعم، والمنازل في جميع أنحاء قطر. نحن نستثمر باستمرار في كوادرنا، وتقنيات التبريد المتقدمة، وأعلى معايير سلامة الأغذية لضمان وصول المنتجات في أوج نضارتها.',
        'ومع استمرار مسيرة النمو في دولة قطر، نفخر بالقيام بدورنا المحوري في دعم الأمن الغذائي الوطني والارتقاء بمعايير المنتجات الطازجة في كافة أنحاء البلاد.',
      ]
    : [
        'Since our founding in 2020, Nairat Food Services has been driven by a relentless focus on food quality, modern cold-chain infrastructure, and trusted partnerships across the world.',
        'Every day, our dedicated team works tirelessly to bridge international harvest fields directly to hypermarkets, restaurants, and homes across Qatar. We invest in people, advanced chilling logistics, and stringent food safety protocols to ensure our partners receive produce at peak freshness.',
        'As Qatar continues to grow, we remain proud to play our role in supporting national food security and elevating the standard of fresh produce across the country.',
      ];

  const narrativeText = isAr ? content?.ceoMessageAr : content?.ceoMessage;
  const paragraphs = narrativeText?.includes('\n')
    ? narrativeText.split(/\n\s*\n|\n/).filter(Boolean)
    : narrativeText
    ? [narrativeText]
    : defaultParagraphs;

  const imageUrl = content?.ceoImageUrl || '/team/ceo.jpg';

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const imageCard = section.querySelector('.ceo-image-card');
    const textItems = section.querySelectorAll('.ceo-text-item');
    if (!imageCard || textItems.length === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 88%',
        once: true,
      },
    });

    timeline
      .fromTo(
        imageCard,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      )
      .fromTo(
        textItems,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power3.out' },
        '-=0.3'
      );
  });

  return (
    <section
      id="ceo-message"
      ref={sectionRef}
      className="scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-white text-[#111814] border-t border-neutral-100"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Visual Image Card (5 cols) */}
          <div className="ceo-image-card lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full rounded-[20px] overflow-hidden shadow-2xs border border-neutral-200/90 bg-neutral-100 group">
              <Image
                src={imageUrl}
                alt={ceoName}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

              {/* Floating Name & Title Badge Matching Section Floating Cards */}
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-[16px] bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-md">
                <h3 className="font-display font-semibold text-base sm:text-lg text-[#111814]">
                  {ceoName}
                </h3>
                <p className="font-sans text-xs sm:text-[13px] text-[#6B7280] leading-snug">
                  {ceoTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy + Quote Box (7 cols) */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="ceo-text-item">
              <SectionEyebrow title={eyebrow} />
            </div>

            <h2 className="ceo-text-item font-display type-h2 font-semibold text-[#111814] text-start leading-[1.12]">
              {renderHeading()}
            </h2>

            {/* Quote Box Matching Commitment Box Styling */}
            <div className="ceo-text-item group p-5 sm:p-6 rounded-[19px] border border-neutral-200/90 flex items-start gap-4 sm:gap-5 shadow-2xs hover:border-neutral-300 transition-colors duration-300 bg-[#F8FAF8]">
              <div className="shrink-0 w-11 h-11 rounded-full bg-white border border-neutral-200/80 flex items-center justify-center shadow-2xs">
                <Quote
                  className="w-5 h-5 text-[#88888A] group-hover:text-[#168849] transition-colors duration-300"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-1.5 flex-1 text-start">
                <p className="font-sans text-xs sm:text-[14px] 2xl:text-[15px] font-medium text-[#111814] leading-[1.6]">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-3.5 font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-start">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="ceo-text-item">
                  {p}
                </p>
              ))}
            </div>

            {/* Sign-off Signature Block */}
            <div className="ceo-text-item pt-4 border-t border-neutral-200/80 flex items-center justify-between">
              <div>
                <p className="font-display font-semibold text-sm sm:text-base text-[#111814]">
                  {ceoName}
                </p>
                <p className="font-sans text-xs text-[#6B7280]">
                  {ceoTitle}
                </p>
              </div>
              <div className="h-8 w-px bg-neutral-200" aria-hidden="true" />
              <div className="font-display font-semibold text-xs tracking-wider text-[#168849] uppercase">
                {isAr ? 'نيرات للخدمات الغذائية' : 'Nairat Food Services'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
