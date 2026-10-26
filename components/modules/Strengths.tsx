'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { CountUp } from '@/components/ui/CountUp';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { MarkedText } from '@/components/ui/Highlight';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLocale } from '@/context/LocaleContext';
import { strengthDefinitions, StrengthDefinition } from '@/data/strengths';
import { CompanyProfile, companyProfile as defaultCompany } from '@/lib/config/company';
import { useSectionReveal } from '@/lib/useSectionReveal';
import type { HomePageContent } from '@/sanity/lib/data';

interface StrengthsProps {
  company?: CompanyProfile;
  content?: HomePageContent;
}

const copy = {
  en: {
    eyebrow: 'WHY CHOOSE US',
    title: 'Built for Freshness. Ready to Deliver.',
    highlight: 'Freshness.',
    lead: 'From global sourcing to last-mile delivery, our integrated supply chain is designed to protect quality and deliver fresh produce reliably across Qatar.',
    photoAlt: 'Refrigerated delivery truck loading at the Nairat warehouse in Doha',
  },
  ar: {
    eyebrow: 'لماذا تختار نيرات',
    title: 'صُممت من أجل النضارة. جاهزون للتوصيل.',
    highlight: 'النضارة.',
    lead: 'من التوريد العالمي إلى التوصيل في المرحلة الأخيرة، صُممت سلسلة التوريد المتكاملة لدينا لحماية الجودة وتوصيل المنتجات الطازجة بموثوقية في جميع أنحاء قطر.',
    photoAlt: 'شاحنة توصيل مبردة أثناء التحميل في مستودع نيرات بالدوحة',
  },
};

interface StrengthCardProps {
  strength: StrengthDefinition;
  profile: CompanyProfile;
  content?: HomePageContent;
}

function StrengthCard({ strength, profile, content }: StrengthCardProps) {
  const { locale } = useLocale();
  const Icon = strength.icon;

  return (
    <FeatureCard className="strength-card-item items-center text-center">
      <Icon className="w-11 h-11 text-nairat-green" strokeWidth={1.6} aria-hidden="true" />
      <p className="font-sans font-bold text-[40px] leading-none tracking-[-0.02em] tabular-nums">
        <CountUp value={strength.figure(profile)[locale]} />
      </p>
      <h3 className="font-sans font-bold text-[17px] leading-[1.35]">
        <MarkedText text={strength.title[locale]} phrase={strength.highlight[locale]} />
      </h3>
      <p className="font-sans text-sm leading-[1.6] text-ink-muted">{strength.description(content)[locale]}</p>
    </FeatureCard>
  );
}

export function Strengths({ company, content }: StrengthsProps = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const profile = company || defaultCompany;
  const text = copy[locale];
  const eyebrow = (locale === 'ar' ? content?.strengthsEyebrowAr : content?.strengthsEyebrow) || text.eyebrow;
  const title = (locale === 'ar' ? content?.strengthsTitleAr : content?.strengthsTitle) || text.title;

  useSectionReveal(containerRef, ['.strength-header-item', '.strength-card-item']);

  return (
    <section id="strengths" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 section-pad bg-surface-alt">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col gap-12">
        <SectionHeading
          align="center"
          eyebrow={eyebrow}
          title={<MarkedText text={title} phrase={text.highlight} />}
          lead={text.lead}
          itemClassName="strength-header-item"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {strengthDefinitions.map((strength) => (
            <StrengthCard key={strength.id} strength={strength} profile={profile} content={content} />
          ))}
        </div>

        <div className="strength-card-item relative h-[260px] sm:h-[420px] rounded-panel overflow-hidden bg-leaf">
          <Image
            src="/whychooseus/warehouse.jpg"
            alt={text.photoAlt}
            fill
            sizes="(max-width: 1248px) 100vw, 1200px"
            className="object-fill"
          />
        </div>
      </div>
    </section>
  );
}
