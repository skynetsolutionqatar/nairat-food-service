'use client';

import React from 'react';
import { Logos3 } from '@/components/blocks/logos3';
import { useLocale } from '@/context/LocaleContext';

import { partnerLogos, PartnerItem } from '@/data/partners';

interface PartnersProps {
  partners?: PartnerItem[];
}

export function Partners({ partners }: PartnersProps = {}) {
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const activeLogos = partners && partners.length > 0 ? partners : partnerLogos;

  return (
    <Logos3
      heading={isAr ? 'شريك موثوق لكبرى المتاجر والشركات في قطر' : 'TRUSTED BY QATAR’S LEADING PARTNERS'}
      logos={activeLogos}
    />
  );
}

