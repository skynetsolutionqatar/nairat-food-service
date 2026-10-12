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

interface Localized {
  en: string;
  ar: string;
}

interface ServiceCard {
  id: string;
  title: Localized;
  description: Localized;
  imageUrl: string;
}

const serviceCards: ServiceCard[] = [
  {
    id: 'global-sourcing-import',
    title: { en: 'Global Sourcing & Import', ar: 'التوريد العالمي والاستيراد' },
    description: {
      en: 'Direct relationships with growers and exporters across Europe, the Middle East and Asia.',
      ar: 'علاقات مباشرة مع المزارعين والمصدرين عبر أوروبا والشرق الأوسط وآسيا.',
    },
    imageUrl: '/services/global-sourcing-import.webp',
  },
  {
    id: 'retail-supply-management',
    title: { en: 'Retail Supply & Category Management', ar: 'توريد التجزئة وإدارة الفئات' },
    description: {
      en: 'Daily supply to hypermarket and supermarket chains, up to full fresh-section management.',
      ar: 'إمداد يومي لسلاسل الهايبرماركت والسوبرماركت، وصولاً إلى الإدارة الكاملة لقسم المنتجات الطازجة.',
    },
    imageUrl: '/services/retail-supply-management.webp',
  },
  {
    id: 'wholesale-foodservice',
    title: { en: 'Wholesale & Foodservice', ar: 'التوريد بالجملة والخدمات الغذائية' },
    description: {
      en: 'Bulk supply to wholesalers, caterers, restaurants and independent grocers.',
      ar: 'توريد بالجملة لتجار الجملة ومتعهدي التموين والمطاعم ومتاجر البقالة المستقلة.',
    },
    imageUrl: '/services/wholesale-foodservice.webp',
  },
];

const accentPhrases = ['Every Scale.', 'كل المستويات.'];

interface ServicesProps {
  content?: HomePageContent;
}

function ServiceCardLink({ service, href }: { service: ServiceCard; href: string }) {
  const { locale } = useLocale();

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
      <h3 className="mt-1.5 mx-4 font-display font-bold text-xl leading-[1.3] text-ink text-start">
        {service.title[locale]}
      </h3>
      <p className="mx-4 font-sans text-sm leading-[1.6] text-ink-muted text-start">{service.description[locale]}</p>
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

  useSectionReveal(containerRef, ['.service-header-item', '.service-card-item']);

  return (
    <section id="services" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 section-pad bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col gap-12">
        <SectionHeading
          eyebrow={eyebrow}
          title={<MarkedText text={title} phrase={accentPhrases} as={Accent} />}
          action={
            <CtaButton href={servicesHref} variant="light">
              {dict.common.allServices}
            </CtaButton>
          }
          itemClassName="service-header-item"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceCards.map((service) => (
            <ServiceCardLink key={service.id} service={service} href={servicesHref} />
          ))}
        </div>
      </div>
    </section>
  );
}
