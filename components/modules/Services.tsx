'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CtaButton } from '@/components/ui/CtaButton';
import { Accent, MarkedText } from '@/components/ui/Highlight';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLocale } from '@/context/LocaleContext';
import { useSectionReveal } from '@/lib/useSectionReveal';
import type { HomePageContent } from '@/sanity/lib/data';
import { homeServiceCards, type HomeServiceCard } from '@/data/homeServiceCards';

const accentPhrases = ['Every Scale.', 'كل المستويات.'];

interface ServicesProps {
  content?: HomePageContent;
}

function ServiceCardLink({ service, href }: { service: HomeServiceCard; href: string }) {
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  return (
    <Link
      href={href}
      className="service-card-item group flex flex-col gap-3.5 rounded-card ring-1 ring-inset ring-line p-3 pb-7 transition-shadow duration-300 hover:ring-nairat-green focus:outline-none focus-visible:ring-2 focus-visible:ring-nairat-green-deep"
    >
      <div className="relative h-[190px] rounded-tile overflow-hidden bg-leaf">
        <Image
          src={service.imageUrl}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1248px) 50vw, 380px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="mt-1.5 mx-4 font-sans font-bold text-xl leading-[1.3] text-ink text-start">
        {isAr ? service.titleAr : service.title}
      </h3>
      <p className="mx-4 font-sans text-sm leading-[1.6] text-ink-muted text-start">{isAr ? service.descriptionAr : service.description}</p>
    </Link>
  );
}

export function Services({ content }: ServicesProps = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const { locale, dict } = useLocale();
  const isAr = locale === 'ar';
  const servicesHref = isAr ? '/ar/services' : '/services';

  const eyebrow = (isAr ? content?.servicesEyebrowAr : content?.servicesEyebrow) || (isAr ? 'ما نقوم به' : 'WHAT WE DO');
  const title =
    (isAr ? content?.servicesTitleAr : content?.servicesTitle) ||
    (isAr ? 'إمداد المنتجات الطازجة على كل المستويات.' : 'Fresh Produce Supply at Every Scale.');

  const cards = content?.servicesCards ?? homeServiceCards;

  useSectionReveal(containerRef, ['.service-header-item', '.service-card-item']);

  return (
    <section id="services" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 section-pad bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col gap-12">
        <SectionHeading
          eyebrow={eyebrow}
          title={<MarkedText text={title} phrase={accentPhrases} as={Accent} />}
          action={
            <CtaButton href={servicesHref} variant="light">
              {(isAr ? content?.servicesCtaTextAr : content?.servicesCtaText) || dict.common.allServices}
            </CtaButton>
          }
          itemClassName="service-header-item"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((service) => (
            <ServiceCardLink key={service.title} service={service} href={servicesHref} />
          ))}
        </div>
      </div>
    </section>
  );
}
