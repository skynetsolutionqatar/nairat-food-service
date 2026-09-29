'use client';

import React from 'react';
import { Logos3 } from '@/components/blocks/logos3';

const partnerLogos = [
  {
    id: 'almeera',
    description: 'Al Meera',
    image: '/partners/almeera-logo-b.svg',
    className: 'h-7 sm:h-9 md:h-10 w-auto object-contain cursor-pointer',
  },
  {
    id: 'lulu',
    description: 'LuLu Hypermarket',
    image: '/partners/lulu-logo.png',
    className: 'h-7 sm:h-9 md:h-10 w-auto object-contain cursor-pointer',
  },
  {
    id: 'carrefour',
    description: 'Carrefour Qatar',
    image: '/partners/careefour.svg',
    className: 'h-7 sm:h-9 md:h-10 w-auto object-contain cursor-pointer',
  },
  {
    id: 'safari',
    description: 'Safari Hypermarket',
    image: '/partners/safari-hypermarket-logo.png',
    className: 'h-7 sm:h-9 md:h-10 w-auto object-contain cursor-pointer',
  },
  {
    id: 'grand',
    description: 'Grand Mall',
    image: '/partners/grand-logo.webp',
    className: 'h-7 sm:h-9 md:h-10 w-auto object-contain cursor-pointer',
  },
  {
    id: 'rawabi',
    description: 'Rawabi Hypermarket',
    image: '/partners/rawabi-hypermarket.svg',
    className: 'h-7 sm:h-9 md:h-10 w-auto object-contain cursor-pointer',
  },
  {
    id: 'saudia',
    description: 'Saudia Hypermarket',
    image: '/partners/saudia.png',
    className: 'h-7 sm:h-9 md:h-10 w-auto object-contain cursor-pointer',
  },
  {
    id: 'abcfresh',
    description: 'ABC Fresh',
    image: '/partners/abc.webp',
    className: 'h-7 sm:h-9 md:h-10 w-auto object-contain cursor-pointer',
  },
  {
    id: 'talabat',
    description: 'Talabat Mart',
    image: '/partners/talabat-mart.svg',
    className: 'h-6 sm:h-8 md:h-9 w-auto object-contain cursor-pointer',
  },
  {
    id: 'mahaseel',
    description: 'Mahaseel',
    image: '/partners/mahaseel.png',
    className: 'h-7 sm:h-9 md:h-10 w-auto object-contain cursor-pointer',
  },
];

export function Partners() {
  return (
    <Logos3
      heading="TRUSTED BY QATAR’S LEADING PARTNERS"
      logos={partnerLogos}
    />
  );
}

