'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';
import type { CompanyPageContent } from '@/sanity/lib/data';
import { companyCertificates, companyImageAlts } from '@/data/pageImageAlts';

interface CompanyQualityProps {
  content?: CompanyPageContent;
}

export function CompanyQuality({ content }: CompanyQualityProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const eyebrow = isAr
    ? (content?.qualityEyebrowAr || 'الجودة وسلامة الغذاء')
    : (content?.qualityEyebrow || 'Quality & Food Safety');

  const title = isAr
    ? (content?.qualityTitleAr || 'جودة يمكنك الوثوق بها: بروتوكولات صارمة من المصدر إلى الوصول')
    : (content?.qualityTitle || 'Quality You Can Trust: Rigorous Protocols from Source to Arrival');

  const defaultParagraphs = isAr
    ? [
      'في نيرات للأغذية، تم دمج سلامة الغذاء والجودة في عملياتنا اليومية. يتم فحص الشحنات الواردة وإجراء الاختبارات المخبرية بما يتماشى مع متطلبات سلامة الغذاء في قطر.',
      'يتم بعد ذلك التعامل مع منتجاتنا من خلال عمليات سلسلة التبريد الخاضعة للرقابة والمصممة للحفاظ على النضارة والجودة حتى التسليم.',
    ]
    : [
      'At Nairat Food, food safety and quality are integrated into our daily operations. Incoming consignments are inspected and laboratory testing is carried out in line with Qatar food-safety requirements.',
      'Our produce is then handled through controlled cold-chain processes designed to maintain freshness and quality until delivery.',
    ];

  const narrativeText = isAr ? content?.qualityNarrativeAr : content?.qualityNarrative;
  const paragraphs = narrativeText?.includes('\n')
    ? narrativeText.split(/\n\s*\n|\n/).filter(Boolean)
    : narrativeText
      ? [narrativeText]
      : defaultParagraphs;

  const imageUrl = content?.qualityImageUrl || '/whychooseus/temperature-controlled.jpg';

  const badgeText = isAr
    ? (content?.qualityBadgeTextAr || 'معتمد بشهادة HACCP و ISO')
    : (content?.qualityBadgeText || 'HACCP & ISO Certified');

  const badgeSubtext = isAr
    ? (content?.qualityBadgeSubtextAr || 'معتمد في قطر')
    : (content?.qualityBadgeSubtext || 'Qatar Verified');

  const certificates = content?.qualityCertificates ?? companyCertificates;

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const card = section.querySelector('.quality-feature-card');
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
      id="quality"
      ref={sectionRef}
      className="scroll-mt-24 py-10 sm:py-12 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="quality-feature-card rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-md transition-shadow duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Image (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-neutral-100 border border-neutral-200/80">
                <Image
                  src={imageUrl}
                  alt={(content?.qualityImageAlt ?? companyImageAlts.quality)[locale]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-white text-xs font-semibold px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4F056]" />
                    <span>{badgeText}</span>
                  </div>
                  <span className="text-[#D4F056]">{badgeSubtext}</span>
                </div>
              </div>
            </div>

            {/* Right: Narrative & Cert Badges (7 cols) */}
            <div className="lg:col-span-7 space-y-4 text-start">
              <SectionEyebrow title={eyebrow} />

              <h3 className="font-display font-semibold text-2xl sm:text-3xl 2xl:text-4xl text-[#111814] tracking-tight leading-[1.18] text-start">
                {title}
              </h3>

              <div className="space-y-3 font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-start">
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Certification Badges */}
              <div className="pt-2 flex flex-wrap gap-3 items-center">
                {certificates.map((certificate, index) => {
                  const Icon = index === 0 ? Award : ShieldCheck;
                  return (
                    <span key={certificate.label} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#168849]/10 border border-[#168849]/30 text-[#168849] text-xs font-semibold">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{isAr ? certificate.labelAr || certificate.label : certificate.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
