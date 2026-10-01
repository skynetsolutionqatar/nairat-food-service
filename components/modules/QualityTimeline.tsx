'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ClipboardCheck, TestTube, Truck, ZoomIn, Award } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { CertificateModal } from '@/components/ui/CertificateModal';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';

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
    titleAr: 'فحص دقيق في بلد المنشأ',
    desc: 'Carefully selected and inspected at source to ensure the best quality.',
    descAr: 'اختيار دقيق وفحص في المصدر لضمان أعلى معايير الجودة الغذائية.',
  },
  {
    step: '2',
    icon: <TestTube className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    title: 'Tested on Arrival',
    titleAr: 'فحص مخبري عند الوصول',
    desc: 'Laboratory testing in line with Qatar food-safety requirements.',
    descAr: 'اختبارات مخبرية مطابقة لمتطلبات سلامة الغذاء في دولة قطر.',
  },
  {
    step: '3',
    icon: <Truck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    title: 'Protected Through Cold Chain',
    titleAr: 'حماية عبر سلسلة التبريد',
    desc: 'Temperature-controlled storage and transport preserve freshness.',
    descAr: 'تخزين ونقل مبرد ومضبوط حرارياً للحفاظ على طزاجة المحاصيل.',
  },
];

const certificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Food Safety Management',
    titleAr: 'إدارة سلامة الغذاء',
    subtitle: 'Quality Compliance Certificate',
    subtitleAr: 'شهادة الامتثال لمعايير الجودة',
    imageSrc: '/certificates/c1-1-1.png',
  },
  {
    id: 'cert-2',
    title: 'ISO Accreditation',
    titleAr: 'اعتماد الآيزو العالمي',
    subtitle: 'Official Supply Chain Accreditation',
    subtitleAr: 'اعتماد رسمي لسلاسل الإمداد والتوريد',
    imageSrc: '/certificates/c2-2-1.png',
  },
];

export function QualityTimeline() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          once: true,
        },
      });

      tl.fromTo(
        '.quality-header-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
      )
        .fromTo(
          '.quality-connector-line',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
          '-=0.3'
        )
        .fromTo(
          '.timeline-step-item',
          { opacity: 0, y: 25, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.certificate-card-item',
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out' },
          '-=0.35'
        );
    },
    { scope: containerRef }
  );

  return (
    <section id="quality" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 pt-8 sm:pt-10 2xl:pt-12 pb-14 sm:pb-16 2xl:pb-20 bg-[#F4F6F5] border-y border-neutral-200/70 overflow-hidden">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 2xl:space-y-10">
        
        {/* Split Layout: Left is Timeline, Right is Official Certificates Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 2xl:gap-14 items-center">
          
          {/* Left Column: Timeline details (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6 2xl:space-y-8">
            
            {/* Headings */}
            <div className="space-y-2.5 2xl:space-y-3">
              <div className="quality-header-item">
                <SectionEyebrow title={isAr ? 'الشهادات ومعايير الجودة' : 'CERTIFICATIONS & QUALITY'} />
              </div>
              <h2 className="quality-header-item font-display type-h2 font-semibold text-[#111814] text-start">
                {isAr ? 'جودة يمكنك الوثوق بها دائماً.' : 'Quality You Can Trust.'}
              </h2>
              <p className="quality-header-item font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]">
                {isAr
                  ? 'تعتبر الجودة وسلامة الغذاء جزءاً أساسياً في كل مرحلة من مراحل سلسلة التوريد لدينا — بدءاً من الفحص في بلد المنشأ إلى الفحص المخبري عند الوصول والنقل المبرد.'
                  : 'Quality and food safety are built into every stage of our supply chain – from inspection at origin to laboratory testing on arrival and temperature-controlled delivery.'}
              </p>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative pt-3 pb-1">
              {/* Connector line with GSAP scale animation */}
              <div className="quality-connector-line hidden md:block absolute top-9 left-[8%] right-[8%] h-0.5 bg-[#168849]/20 z-0 will-change-transform" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 2xl:gap-6 relative z-10">
                {timelineSteps.map((item) => {
                  const title = isAr ? item.titleAr : item.title;
                  const desc = isAr ? item.descAr : item.desc;

                  return (
                    <div
                      key={item.step}
                      className="timeline-step-item flex flex-col items-center md:items-start text-center md:text-start space-y-2.5 group will-change-transform"
                    >
                      {/* Circle Icon Badge */}
                      <div className="w-11 h-11 2xl:w-13 2xl:h-13 rounded-full bg-white border border-neutral-200/90 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:border-[#168849]/50 transition-all duration-300">
                        {item.icon}
                      </div>

                      {/* Step label + title */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 justify-center md:justify-start">
                          <span className="w-4 h-4 rounded-full border border-black/20 flex items-center justify-center font-mono text-[9px] font-bold text-[#6B7280] group-hover:border-[#168849] group-hover:text-[#168849] transition-colors">
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
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 2xl:gap-5 justify-center items-center lg:justify-end">
            {certificates.map((cert) => {
              const title = isAr ? cert.titleAr : cert.title;
              const subtitle = isAr ? cert.subtitleAr : cert.subtitle;

              return (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="certificate-card-item group relative bg-white border border-neutral-200/90 rounded-2xl p-3 2xl:p-3.5 cursor-pointer overflow-hidden shadow-xs hover:shadow-xl hover:border-[#168849]/50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-1/2 max-w-[210px] 2xl:max-w-[250px] will-change-transform"
                >
                  {/* Certificate Preview Image */}
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white border border-black/5 flex items-center justify-center">
                    <Image
                      src={cert.imageSrc}
                      alt={title}
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 250px"
                    />
                    
                    {/* Zoom Overlay Icon */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-white/90 text-[#168849] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Certificate Title Badge */}
                  <div className="pt-2.5 pb-0.5 px-1 text-center">
                    <h4 className="font-display font-semibold text-xs sm:text-sm text-[#111814] truncate group-hover:text-[#168849] transition-colors">
                      {title}
                    </h4>
                    <p className="font-sans text-[10px] sm:text-[11px] text-[#72807A] truncate pt-0.5">
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
