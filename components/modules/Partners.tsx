'use client';

import React from 'react';
import { Logos3 } from '@/components/blocks/logos3';

const partnerLogos = [
  {
    id: 'almeera',
    description: 'Al Meera',
    image: '/partners/almeera-logo-b.svg',
    className: 'h-10 md:h-12 w-auto object-contain',
  },
  {
    id: 'lulu',
    description: 'LuLu Hypermarket',
    image: '/partners/lulu-logo.png',
    className: 'h-10 md:h-12 w-auto object-contain',
  },
  {
    id: 'carrefour',
    description: 'Carrefour',
    image: '/partners/careefour.svg',
    className: 'h-10 md:h-12 w-auto object-contain',
  },
  {
    id: 'safari',
    description: 'Safari Hypermarket',
    image: '/partners/Safari Hyper Market Logo.png',
    className: 'h-10 md:h-12 w-auto object-contain',
  },
  {
    id: 'grand',
    description: 'Grand Hypermarket',
    image: '/partners/grand-logo.webp',
    className: 'h-10 md:h-12 w-auto object-contain',
  },
  {
    id: 'mahaseel',
    description: 'Mahaseel',
    image: '/partners/mahaseel.png',
    className: 'h-10 md:h-12 w-auto object-contain',
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

