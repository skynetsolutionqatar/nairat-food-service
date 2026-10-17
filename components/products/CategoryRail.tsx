'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useLocale } from '@/context/LocaleContext';
import type { ProductItem } from '@/data/products';
import type { ProductRail } from '@/data/homeProductRails';

const toneStyles: Record<ProductRail['tone'], string> = {
  green: 'bg-nairat-green hover:bg-nairat-green-deep',
  forest: 'bg-forest hover:bg-[#123524]',
};

/** Phones show only the first two tiles of a rail; the rest appear from 640px up. */
const PHONE_TILE_COUNT = 2;

function RailTile({ product, phoneHidden }: { product: ProductItem; phoneHidden: boolean }) {
  const { locale } = useLocale();
  const name = (locale === 'ar' && product.nameAr) || product.name;

  return (
    <li
      className={cn(
        'product-rail-item group relative h-[clamp(170px,52vw,240px)] sm:h-[240px] md:h-[280px] lg:h-[360px] 2xl:h-[clamp(400px,22vw,520px)] overflow-hidden bg-forest',
        phoneHidden && 'hidden sm:block'
      )}
    >
      <Image
        src={product.imageUrl}
        alt=""
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent to-55%" aria-hidden="true" />
      <p className="absolute inset-x-0 bottom-0 p-3 sm:p-5 text-center font-sans font-semibold text-[13px] sm:text-[15px] 2xl:text-[17px] leading-[1.3] text-white text-balance">
        {name}
      </p>
    </li>
  );
}

/** Product strip: a vertical category label, then full-height photo tiles. */
export function CategoryRail({ rail }: { rail: ProductRail }) {
  const { locale } = useLocale();
  const prefix = locale === 'ar' ? '/ar' : '';

  return (
    <div className="grid grid-cols-[44px_repeat(2,minmax(0,1fr))] sm:grid-cols-[56px_repeat(2,minmax(0,1fr))] md:grid-cols-[56px_repeat(4,minmax(0,1fr))] lg:grid-cols-[64px_repeat(4,minmax(0,1fr))] 2xl:grid-cols-[72px_repeat(4,minmax(0,1fr))]">
      <Link
        href={`${prefix}/products/${rail.slug}`}
        className={cn(
          'sm:row-span-2 md:row-span-1 grid place-items-center text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white',
          toneStyles[rail.tone]
        )}
      >
        <span className="font-sans font-bold text-[11px] sm:text-[12px] lg:text-[13px] 2xl:text-[14px] leading-none tracking-[0.08em] sm:tracking-[0.14em] uppercase whitespace-nowrap rtl:tracking-normal [writing-mode:vertical-rl] rotate-180 rtl:rotate-0">
          {rail.label[locale]}
        </span>
      </Link>
      <ul className="contents">
        {rail.products.map((product, index) => (
          <RailTile key={product.id} product={product} phoneHidden={index >= PHONE_TILE_COUNT} />
        ))}
      </ul>
    </div>
  );
}
