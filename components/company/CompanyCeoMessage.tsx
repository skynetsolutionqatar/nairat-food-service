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

  const heading = isAr
    ? (content?.ceoHeadingAr || 'ملتزمون بالنضارة. مدفوعون برؤية قطر.')
    : (content?.ceoHeading || 'Committed to Freshness. Driven by Qatar’s Vision.');

  const ceoName = isAr
    ? (content?.ceoNameAr || 'ناصر الكواري')
    : (content?.ceoName || 'Nasser Al-Kuwari');

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

    const imageBox = section.querySelector('.ceo-image-card');
    const contentItems = section.querySelectorAll('.ceo-content-item');
    if (!imageBox || contentItems.length === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        once: true,
      },
    });

    timeline
      .fromTo(
        imageBox,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(
        contentItems,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        '-=0.3'
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#F8FAF8] border-y border-emerald-900/5 relative overflow-hidden"
      aria-label={isAr ? 'رسالة الرئيس التنفيذي' : 'CEO Message'}
    >
      {/* Decorative background watermark */}
      <div
        className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Column 1: CEO Portrait & Credentials */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="ceo-image-card relative w-full max-w-[380px] sm:max-w-[420px] rounded-2xl overflow-hidden shadow-xl bg-white border border-emerald-950/10 group">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={imageUrl}
                  alt={ceoName}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>

              {/* Bottom Badge inside portrait container */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white bg-gradient-to-t from-[#063B27]/95 via-[#063B27]/80 to-transparent backdrop-blur-[2px]">
                <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white mb-0.5">
                  {ceoName}
                </h3>
                <p className="text-sm font-medium text-emerald-200 tracking-wide">
                  {ceoTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Editorial Message & Quote */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="ceo-content-item mb-3">
              <SectionEyebrow title={eyebrow} textColor="text-[#168849]" />
            </div>

            <h2 className="ceo-content-item text-3xl sm:text-4xl font-extrabold font-display text-[#111814] tracking-tight leading-[1.2] mb-6">
              {heading}
            </h2>

            {/* Pull Quote Box */}
            <div className="ceo-content-item relative bg-white p-6 sm:p-7 rounded-2xl border border-emerald-900/10 shadow-sm mb-6">
              <Quote
                className={`w-9 h-9 text-[#168849]/25 absolute top-5 ${
                  isAr ? 'left-5' : 'right-5'
                }`}
                aria-hidden="true"
              />
              <p
                className={`text-base sm:text-lg font-medium text-[#063B27] leading-relaxed relative z-10 ${
                  isAr ? 'font-arabic' : 'italic'
                }`}
              >
                &ldquo;{quote}&rdquo;
              </p>
            </div>

            {/* Narrative Paragraphs */}
            <div className="ceo-content-item space-y-4 text-[#47554E] text-base leading-relaxed mb-6">
              {paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>

            {/* Sign-off badge */}
            <div className="ceo-content-item flex items-center gap-4 pt-4 border-t border-emerald-950/10">
              <div className="w-10 h-10 rounded-full bg-[#168849]/10 text-[#168849] flex items-center justify-center font-bold text-sm shrink-0">
                NF
              </div>
              <div>
                <p className="text-sm font-bold text-[#111814]">{ceoName}</p>
                <p className="text-xs text-[#72807A]">{ceoTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
