'use client';

import React, { useRef } from 'react';
import { CtaButton } from '@/components/ui/CtaButton';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { MarkedText } from '@/components/ui/Highlight';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import { useLocale } from '@/context/LocaleContext';
import { useSectionReveal } from '@/lib/useSectionReveal';
import type { HomePageContent } from '@/sanity/lib/data';
import { homeQualityCertificates, homeQualitySteps, homeQualityText } from '@/data/homeQuality';

const pillStyles = ['bg-lime text-ink', 'bg-white text-ink'];

const highlightPhrases = ['Trust.', 'الوثوق بها.'];

interface QualityTimelineProps {
  content?: HomePageContent;
}

export function QualityTimeline({ content }: QualityTimelineProps = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const steps = content?.qualitySteps ?? homeQualitySteps;
  const certificates = content?.qualityCertificates ?? homeQualityCertificates;
  const note = (isAr ? content?.qualityCertifiedNoteAr : content?.qualityCertifiedNote) || (isAr ? homeQualityText.certifiedNoteAr : homeQualityText.certifiedNote);
  const ctaText = (isAr ? content?.qualityCtaTextAr : content?.qualityCtaText) || (isAr ? homeQualityText.ctaTextAr : homeQualityText.ctaText);

  const eyebrow =
    (isAr ? content?.qualityEyebrowAr : content?.qualityEyebrow) || (isAr ? 'الشهادات والجودة' : 'CERTIFICATIONS & QUALITY');
  const title =
    (isAr ? content?.qualityTitleAr : content?.qualityTitle) || (isAr ? 'جودة يمكنك الوثوق بها.' : 'Quality You Can Trust.');

  useSectionReveal(containerRef, ['.quality-header-item', '.quality-card-item']);

  return (
    <section id="quality" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 section-pad bg-surface-alt">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col gap-10">
        <SectionHeading
          eyebrow={eyebrow}
          title={<MarkedText text={title} phrase={highlightPhrases} />}
          action={<CtaButton href={isAr ? '/ar/quality' : '/quality'}>{ctaText}</CtaButton>}
          itemClassName="quality-header-item"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((item, index) => (
            <FeatureCard key={item.title} className="quality-card-item gap-2.5 text-start">
              <span className="font-sans font-extrabold text-[40px] leading-none text-nairat-green-deep">{index + 1}</span>
              <h3 className="font-sans font-bold text-lg leading-[1.35]">{isAr ? item.titleAr : item.title}</h3>
              <p className="font-sans text-sm leading-[1.6] text-ink-muted">{isAr ? item.descriptionAr : item.description}</p>
            </FeatureCard>
          ))}

          <FeatureCard variant="dark" className="quality-card-item items-start justify-center">
            {certificates.map((certificate, index) => (
              <span
                key={certificate}
                className={cn(
                  'inline-flex items-center min-h-11 px-4 rounded-full font-sans font-bold text-[13px] leading-none',
                  pillStyles[index % pillStyles.length]
                )}
              >
                {certificate}
              </span>
            ))}
            <p className="font-sans text-sm leading-[1.6] text-on-forest-muted text-start">{note}</p>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
