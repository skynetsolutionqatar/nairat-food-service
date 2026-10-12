'use client';

import React, { useRef, useState } from 'react';
import { CertificateModal, CertificateModalData } from '@/components/ui/CertificateModal';
import { CtaButton } from '@/components/ui/CtaButton';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { MarkedText } from '@/components/ui/Highlight';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import { useLocale } from '@/context/LocaleContext';
import { useSectionReveal } from '@/lib/useSectionReveal';
import type { HomePageContent } from '@/sanity/lib/data';

interface Localized {
  en: string;
  ar: string;
}

interface QualityStep {
  step: string;
  title: Localized;
  description: Localized;
}

interface Certificate {
  id: string;
  label: string;
  title: Localized;
  subtitle: Localized;
  imageSrc: string;
  pillStyle: string;
}

const qualitySteps: QualityStep[] = [
  {
    step: '1',
    title: { en: 'Inspected at Origin', ar: 'تم الفحص في بلد المنشأ' },
    description: {
      en: 'Selected and inspected at source for the best quality.',
      ar: 'تم الاختيار والفحص في المصدر لضمان أفضل جودة.',
    },
  },
  {
    step: '2',
    title: { en: 'Tested on Arrival', ar: 'تم الاختبار عند الوصول' },
    description: {
      en: 'Laboratory testing in line with Qatar food-safety requirements.',
      ar: 'اختبارات مخبرية تتماشى مع متطلبات سلامة الغذاء في قطر.',
    },
  },
  {
    step: '3',
    title: { en: 'Protected Through Cold Chain', ar: 'محمية عبر سلسلة التبريد' },
    description: {
      en: 'Temperature-controlled storage and transport preserve freshness.',
      ar: 'تخزين ونقل يتم التحكم في درجة حرارته للحفاظ على النضارة.',
    },
  },
];

const certificates: Certificate[] = [
  {
    id: 'haccp',
    label: 'HACCP',
    title: { en: 'Food Safety Management', ar: 'إدارة سلامة الغذاء' },
    subtitle: { en: 'Quality Compliance Certificate', ar: 'شهادة الامتثال للجودة' },
    imageSrc: '/certificates/c1-1-1.png',
    pillStyle: 'bg-lime text-ink hover:bg-white',
  },
  {
    id: 'iso-22000',
    label: 'ISO 22000:2018',
    title: { en: 'ISO Accreditation', ar: 'اعتماد الآيزو' },
    subtitle: { en: 'Official Supply Chain Accreditation', ar: 'اعتماد رسمي لسلسلة التوريد' },
    imageSrc: '/certificates/c2-2-1.png',
    pillStyle: 'bg-white text-ink hover:bg-lime',
  },
];

const copy = {
  en: {
    certified: 'Certified food safety management.',
    viewCertificate: (label: string) => `View the ${label} certificate`,
  },
  ar: {
    certified: 'إدارة معتمدة لسلامة الغذاء.',
    viewCertificate: (label: string) => `عرض شهادة ${label}`,
  },
};

const highlightPhrases = ['Trust.', 'الوثوق بها.'];

interface QualityTimelineProps {
  content?: HomePageContent;
}

export function QualityTimeline({ content }: QualityTimelineProps = {}) {
  const [selected, setSelected] = useState<CertificateModalData | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const { locale, dict } = useLocale();
  const isAr = locale === 'ar';
  const text = copy[locale];

  const eyebrow =
    (isAr ? content?.qualityEyebrowAr : content?.qualityEyebrow) || (isAr ? 'الشهادات والجودة' : 'CERTIFICATIONS & QUALITY');
  const title =
    (isAr ? content?.qualityTitleAr : content?.qualityTitle) || (isAr ? 'جودة يمكنك الوثوق بها.' : 'Quality You Can Trust.');

  useSectionReveal(containerRef, ['.quality-header-item', '.quality-card-item']);

  const openCertificate = (certificate: Certificate) =>
    setSelected({
      title: certificate.title[locale],
      subtitle: certificate.subtitle[locale],
      imageSrc: certificate.imageSrc,
    });

  return (
    <section id="quality" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 section-pad bg-surface-alt">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col gap-10">
        <SectionHeading
          eyebrow={eyebrow}
          title={<MarkedText text={title} phrase={highlightPhrases} />}
          action={<CtaButton href={isAr ? '/ar/quality' : '/quality'}>{dict.common.qualityProcess}</CtaButton>}
          itemClassName="quality-header-item"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {qualitySteps.map((item) => (
            <FeatureCard key={item.step} className="quality-card-item gap-2.5 text-start">
              <span className="font-sans font-extrabold text-[40px] leading-none text-nairat-green-deep">{item.step}</span>
              <h3 className="font-sans font-bold text-lg leading-[1.35]">{item.title[locale]}</h3>
              <p className="font-sans text-sm leading-[1.6] text-ink-muted">{item.description[locale]}</p>
            </FeatureCard>
          ))}

          <FeatureCard variant="dark" className="quality-card-item items-start justify-center">
            {certificates.map((certificate) => (
              <button
                key={certificate.id}
                type="button"
                onClick={() => openCertificate(certificate)}
                aria-label={text.viewCertificate(certificate.label)}
                className={cn(
                  'min-h-11 px-4 rounded-full font-sans font-bold text-[13px] leading-none cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-forest',
                  certificate.pillStyle
                )}
              >
                {certificate.label}
              </button>
            ))}
            <p className="font-sans text-sm leading-[1.6] text-on-forest-muted text-start">{text.certified}</p>
          </FeatureCard>
        </div>
      </div>

      <CertificateModal isOpen={Boolean(selected)} onClose={() => setSelected(null)} certificate={selected} />
    </section>
  );
}
