'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { CertificateModal } from '@/components/ui/CertificateModal';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { CtaButton } from '../ui/CtaButton';
import { useLocale } from '@/context/LocaleContext';

interface CertCardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
}

export function QualityFoodSafety(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const [selectedCert, setSelectedCert] = useState<CertCardItem | null>(null);

  const certificates: CertCardItem[] = [
    {
      id: 'haccp',
      title: 'HACCP',
      subtitle: isAr ? 'شهادة الامتثال' : 'Certificate of Compliance',
      description: isAr
        ? 'تحليل المخاطر ونقاط التحكم الحرجة، هيئة الدستور الغذائي (Codex Alimentarius).'
        : 'Hazard Analysis and Critical Control Points, Codex Alimentarius.',
      imageSrc: '/certificates/c1-1-1.png',
    },
    {
      id: 'iso22000',
      title: 'ISO 22000:2018',
      subtitle: isAr ? 'شهادة التسجيل والاعتماد' : 'Certificate of Registration',
      description: isAr
        ? 'نظام إدارة سلامة الغذاء العالمي المعتمد لضمان النظافة والتتبع الكامل.'
        : 'Food safety management system certified for end-to-end traceability and hygiene.',
      imageSrc: '/certificates/c2-2-1.png',
    },
  ];

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
      });

      tl.fromTo(
        '.safety-anim-left',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      ).fromTo(
        '.safety-card-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out' },
        '-=0.25'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="food-safety"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-[#F4F8F5] text-[#111814] border-y border-[#E3EBE5]/70"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Eyebrow, Heading, Narrative & CTA (5 cols) */}
          <div className="safety-anim-left lg:col-span-5 space-y-5 text-start">
            <SectionEyebrow title={isAr ? 'الجودة وسلامة الغذاء' : 'QUALITY & FOOD SAFETY'} />

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[38px] font-bold text-[#111814] leading-[1.15] tracking-tight">
              {isAr ? (
                <>
                  سلامة الغذاء أولاً <br className="hidden sm:inline" />
                  في كل خطوة وعملية.
                </>
              ) : (
                <>
                  Food Safety First <br className="hidden sm:inline" />
                  in Every Process.
                </>
              )}
            </h2>

            <p className="font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6]">
              {isAr
                ? 'تأتي سلامة الغذاء في مقدمة أولوياتنا في كل عملية داخل نيرات. تعمل منشأتنا بنظام إدارة سلامة الغذاء القائم على تحليل المخاطر ونقاط التحكم الحرجة (HACCP) والمعتمد وفق معيار ISO 22000:2018، كما أن إجراءاتنا مصممة للامتثال لكافة القوانين واللوائح القطرية المنظمة لسلامة الأغذية. تُطبَّق تدابير الرقابة والتحكم في كل مرحلة، من الاستلام والفرز إلى التعبئة والتخزين والتوزيع، لضمان وصول المنتجات لعملائنا آمنة، طازجة وقابلة للتتبع بالكامل.'
                : 'Food safety comes first in every process at Nairat. Our facility runs a HACCP-based food safety management system certified to ISO 22000:2018, and our procedures are designed to comply with all Qatari laws and regulations governing food safety. Control measures apply at every stage, from receiving and sorting to packing, storage and distribution, so that produce reaches our customers safe, fresh and traceable.'}
            </p>

            <div className="pt-2">
              <CtaButton
                href={isAr ? '/ar/company#quality' : '/company#quality'}
                text={isAr ? 'عملية الجودة لدينا' : 'Our Quality Process'}
                variant="primary"
              />
            </div>
          </div>

          {/* Right Column: 2 Certificate Feature Cards (7.5 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="safety-card-item rounded-2xl bg-white p-5 sm:p-6 border border-neutral-200/90 shadow-2xs hover:shadow-md hover:border-[#168849]/40 transition-all duration-300 flex flex-col justify-between text-start"
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#111814] leading-snug">
                      {cert.title}
                    </h3>
                    <span className="text-[11px] sm:text-xs text-[#6B7280] font-medium block mt-0.5">
                      {cert.subtitle}
                    </span>
                  </div>

                  {/* Body & Certificate Thumbnail */}
                  <div className="grid grid-cols-12 gap-3 items-center pt-2">
                    <div className="col-span-7 space-y-3">
                      <p className="font-sans text-xs text-[#6B7280] leading-[1.5]">
                        {cert.description}
                      </p>
                      <div>
                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#168849] hover:text-[#063B27] transition-colors cursor-pointer group"
                        >
                          <span>{isAr ? 'عرض الشهادة' : 'View Certificate'}</span>
                          <span className="w-5 h-5 rounded-full border border-[#168849]/30 flex items-center justify-center text-[#168849] group-hover:bg-[#168849] group-hover:text-white transition-colors">
                            <ArrowUpRight className="w-3 h-3 rtl:rotate-[-90deg]" />
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="col-span-5 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="relative w-22 sm:w-24 aspect-[3/4] rounded-lg border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow group/thumb cursor-pointer bg-neutral-50"
                        title={isAr ? `عرض شهادة ${cert.title}` : `View ${cert.title} Certificate`}
                      >
                        <Image
                          src={cert.imageSrc}
                          alt={isAr ? `وثيقة شهادة ${cert.title} الرسمية` : `${cert.title} Official Certificate Document`}
                          fill
                          className="object-contain p-1 group-hover/thumb:scale-105 transition-transform duration-300"
                          sizes="96px"
                        />
                        <div className="absolute inset-0 bg-[#168849]/0 group-hover/thumb:bg-[#168849]/10 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal Viewer */}
      <CertificateModal
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />
    </section>
  );
}
