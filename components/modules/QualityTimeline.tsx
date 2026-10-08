'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ClipboardCheck, TestTube, Truck, ZoomIn, Award } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { CertificateModal } from '@/components/ui/CertificateModal';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';
import type { HomePageContent } from '@/sanity/lib/data';

interface TimelineStep {
  step: string;
  icon: React.ReactNode;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
}

interface Certificate {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  imageSrc: string;
}

const timelineSteps: TimelineStep[] = [
  {
    step: '1',
    icon: <ClipboardCheck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    title: 'Inspected at Origin',
    titleAr: 'تم الفحص في بلد المنشأ',
    desc: 'Carefully selected and inspected at source to ensure the best quality.',
    descAr: 'تم الاختيار والفحص بعناية في المصدر لضمان أفضل جودة.',
  },
  {
    step: '2',
    icon: <TestTube className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    title: 'Tested on Arrival',
    titleAr: 'تم الاختبار عند الوصول',
    desc: 'Laboratory testing in line with Qatar food-safety requirements.',
    descAr: 'اختبارات مخبرية تتماشى مع متطلبات سلامة الغذاء في قطر.',
  },
  {
    step: '3',
    icon: <Truck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    title: 'Protected Through Cold Chain',
    titleAr: 'محمية عبر سلسلة التبريد',
    desc: 'Temperature-controlled storage and transport preserve freshness.',
    descAr: 'تخزين ونقل يتم التحكم في درجة حرارته للحفاظ على النضارة.',
  },
];

const certificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Food Safety Management',
    titleAr: 'إدارة سلامة الغذاء',
    subtitle: 'Quality Compliance Certificate',
    subtitleAr: 'شهادة الامتثال للجودة',
    imageSrc: '/certificates/c1-1-1.png',
  },
  {
    id: 'cert-2',
    title: 'ISO Accreditation',
    titleAr: 'اعتماد الآيزو',
    subtitle: 'Official Supply Chain Accreditation',
    subtitleAr: 'اعتماد رسمي لسلسلة التوريد',
    imageSrc: '/certificates/c2-2-1.png',
  },
];

interface QualityTimelineProps {
  content?: HomePageContent;
}

export function QualityTimeline({ content }: QualityTimelineProps = {}) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const eyebrow = isAr
    ? content?.qualityEyebrowAr || 'الشهادات والجودة'
    : content?.qualityEyebrow || 'CERTIFICATIONS & QUALITY';

  const title = isAr
    ? content?.qualityTitleAr || 'جودة يمكنك الوثوق بها.'
    : content?.qualityTitle || 'Quality You Can Trust.';

  const narrative = isAr
    ? content?.qualityNarrativeAr ||
      'تم بناء الجودة وسلامة الغذاء في كل مرحلة من مراحل سلسلة التوريد لدينا – بدءاً من الفحص في بلد المنشأ إلى الاختبارات المخبرية عند الوصول والتسليم الذي يتم التحكم في درجة حرارته.'
    : content?.qualityNarrative ||
      'Quality and food safety are built into every stage of our supply chain – from inspection at origin to laboratory testing on arrival and temperature-controlled delivery.';

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 88%',
          once: true,
        },
      });

      tl.fromTo(
        '.quality-header-item',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out' }
      )
        .fromTo(
          '.quality-connector-line',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.45, ease: 'power2.inOut' },
          '-=0.25'
        )
        .fromTo(
          '.timeline-step-item',
          { opacity: 0, y: 18, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.certificate-card-item',
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.48, stagger: 0.07, ease: 'power3.out' },
          '-=0.25'
        );
    },
    { scope: containerRef }
  );

  return (
    <section id="quality" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 py-10 min-[410px]:py-12 sm:py-16 2xl:py-22 bg-[#F4F6F5] border-y border-neutral-200/70 overflow-hidden">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 2xl:space-y-12">
        
        {/* Split Layout: Left is Timeline, Right is Official Certificates Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 2xl:gap-14 items-center">
          
          {/* Left Column: Timeline details (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 2xl:space-y-8">
            
            {/* Headings */}
            <div className="space-y-2.5 2xl:space-y-3">
              <div className="quality-header-item">
                <SectionEyebrow title={eyebrow} />
              </div>
              <h2 className="quality-header-item font-display text-[22px] min-[360px]:text-[25px] min-[410px]:text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] 2xl:text-[50px] font-semibold text-[#111814] text-start tracking-[-0.025em] leading-[1.18] sm:leading-[1.12]">
                {title}
              </h2>
              <p className="quality-header-item font-sans text-[12px] min-[360px]:text-[12.5px] min-[410px]:text-[13px] sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.65] text-justify w-full lg:max-w-[48ch] 2xl:max-w-[52ch]">
                {narrative}
              </p>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative pt-2 sm:pt-3 pb-1">
              {/* Connector line with GSAP scale animation */}
              <div className="quality-connector-line hidden md:block absolute top-9 left-[8%] right-[8%] h-0.5 bg-[#168849]/20 z-0 will-change-transform" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 2xl:gap-6 relative z-10">
                {timelineSteps.map((item) => {
                  const title = isAr ? item.titleAr : item.title;
                  const desc = isAr ? item.descAr : item.desc;

                  return (
                    <div
                      key={item.step}
                      className="timeline-step-item flex flex-row md:flex-col items-start text-start gap-3.5 md:gap-0 md:space-y-2.5 group will-change-transform"
                    >
                      {/* Circle Icon Badge */}
                      <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 2xl:w-13 2xl:h-13 rounded-full bg-white border border-neutral-200/90 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:border-[#168849]/50 transition-all duration-300">
                        {item.icon}
                      </div>

                      {/* Step label + title + desc */}
                      <div className="flex-1 space-y-1 text-start">
                        <div className="flex items-center gap-1.5 justify-start">
                          <span className="w-4 h-4 rounded-full border border-black/20 flex items-center justify-center font-mono text-[9px] font-bold text-[#6B7280] group-hover:border-[#168849] group-hover:text-[#168849] transition-colors shrink-0">
                            {item.step}
                          </span>
                          <h3 className="font-display font-semibold text-xs sm:text-sm 2xl:text-base text-[#111814] tracking-[-0.01em] group-hover:text-[#168849] transition-colors">
                            {title}
                          </h3>
                        </div>
                        <p className="font-sans text-[11px] sm:text-xs 2xl:text-[13px] text-[#6B7280] leading-[1.55]">
                          {desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Official Certificates Preview (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-row gap-3 sm:gap-4 2xl:gap-5 justify-center items-stretch lg:justify-end w-full">
            {certificates.map((cert) => {
              const title = isAr ? cert.titleAr : cert.title;
              const subtitle = isAr ? cert.subtitleAr : cert.subtitle;

              return (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="certificate-card-item group relative bg-white border border-neutral-200/90 rounded-2xl p-2.5 min-[380px]:p-3 2xl:p-3.5 cursor-pointer overflow-hidden shadow-xs hover:shadow-xl hover:border-[#168849]/50 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 w-1/2 sm:w-auto max-w-[155px] min-[380px]:max-w-[175px] sm:max-w-[210px] 2xl:max-w-[250px] will-change-transform flex flex-col justify-between"
                >
                  {/* Certificate Preview Image */}
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white border border-black/5 flex items-center justify-center">
                    <Image
                      src={cert.imageSrc}
                      alt={title}
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 250px"
                    />
                    
                    {/* Zoom Overlay Icon */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 text-[#168849] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Certificate Title Badge */}
                  <div className="pt-2 pb-0.5 px-0.5 text-center">
                    <h4 className="font-display font-semibold text-[11px] min-[380px]:text-xs sm:text-sm text-[#111814] truncate group-hover:text-[#168849] transition-colors">
                      {title}
                    </h4>
                    <p className="font-sans text-[9.5px] min-[380px]:text-[10px] sm:text-[11px] text-[#72807A] truncate pt-0.5">
                      {subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Interactive Certificate Lightbox Modal */}
      <CertificateModal
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />
    </section>
  );
}
