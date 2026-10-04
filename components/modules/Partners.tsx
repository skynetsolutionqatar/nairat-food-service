'use client';

import React from 'react';
import { Logos3 } from '@/components/blocks/logos3';
import { useLocale } from '@/context/LocaleContext';

import { partnerLogos, PartnerItem } from '@/data/partners';
import type { HomePageContent } from '@/sanity/lib/data';

interface PartnersProps {
  partners?: PartnerItem[];
  content?: HomePageContent;
}

export function Partners({ partners, content }: PartnersProps = {}) {
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const activeLogos = partners && partners.length > 0 ? partners : partnerLogos;
  const defaultHeading = isAr ? 'شريك موثوق لكبرى المتاجر والشركات في قطر' : 'TRUSTED BY QATAR’S LEADING PARTNERS';
  const heading = isAr
    ? content?.partnersHeadingAr || defaultHeading
    : content?.partnersHeading || defaultHeading;

  return (
    <Logos3
      heading={heading}
      logos={activeLogos}
    />
  );
}

