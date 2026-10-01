'use client';

import React from 'react';
import { Logos3 } from '@/components/blocks/logos3';
import { useLocale } from '@/context/LocaleContext';

const partnerLogos = [
  {
    id: 'almeera',
    description: 'Al Meera',
    image: '/partners/almeera-logo-b.svg',
    className: 'h-7 sm:h-8 md:h-9 max-w-[130px] sm:max-w-[150px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'lulu',
    description: 'LuLu Hypermarket',
    image: '/partners/lulu-logo.png',
    className: 'h-7 sm:h-8 md:h-9 max-w-[115px] sm:max-w-[135px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'carrefour',
    description: 'Carrefour Qatar',
    image: '/partners/careefour.svg',
    className: 'h-7 sm:h-8 md:h-9 max-w-[125px] sm:max-w-[145px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'safari',
    description: 'Safari Hypermarket',
    image: '/partners/safari-hypermarket-logo.png',
    className: 'h-11 sm:h-13 md:h-14 max-w-[55px] sm:max-w-[65px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'grand',
    description: 'Grand Mall',
    image: '/partners/grand-logo.webp',
    className: 'h-8 sm:h-9 md:h-10 max-w-[85px] sm:max-w-[100px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'rawabi',
    description: 'Rawabi Hypermarket',
    image: '/partners/rawabi-hypermarket.svg',
    className: 'h-9 sm:h-10 md:h-11 max-w-[60px] sm:max-w-[70px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'saudia',
    description: 'Saudia Hypermarket',
    image: '/partners/saudia.png',
    className: 'h-11 sm:h-13 md:h-14 max-w-[65px] sm:max-w-[75px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'abcfresh',
    description: 'ABC Fresh',
    image: '/partners/abc.webp',
    className: 'h-9 sm:h-11 md:h-12 max-w-[75px] sm:max-w-[90px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'talabat',
    description: 'Talabat Mart',
    image: '/partners/talabat-mart.svg',
    className: 'h-6 sm:h-7 md:h-8 max-w-[125px] sm:max-w-[145px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'mahaseel',
    description: 'Mahaseel',
    image: '/partners/mahaseel.png',
    className: 'h-9 sm:h-11 md:h-12 max-w-[75px] sm:max-w-[90px] w-auto object-contain cursor-pointer',
  },
];

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

