'use client';

import React from 'react';
import { Logos3 } from '@/components/blocks/logos3';
import { useLocale } from '@/context/LocaleContext';

import { partnerLogos } from '@/data/partners';

export function Partners() {
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  return (
    <Logos3
      heading={isAr ? 'شريك موثوق لكبرى المتاجر والشركات في قطر' : 'TRUSTED BY QATAR’S LEADING PARTNERS'}
      logos={partnerLogos}
    />
  );
}

