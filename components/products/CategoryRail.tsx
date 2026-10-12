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

function RailTile({ product }: { product: ProductItem }) {
  const { locale } = useLocale();
  const name = (locale === 'ar' && product.nameAr) || product.name;

  return (
    <li className="product-rail-item group relative h-[200px] sm:h-[360px] overflow-hidden bg-forest">
      <Image
        src={product.imageUrl}
        alt=""
        fill
        sizes="(max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent to-55%" aria-hidden="true" />
      <p className="absolute inset-x-0 bottom-0 p-5 text-center font-sans font-semibold text-[15px] leading-[1.3] text-white">
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
    <div className="grid grid-cols-2 sm:grid-cols-[64px_repeat(2,minmax(0,1fr))] lg:grid-cols-[64px_repeat(4,minmax(0,1fr))]">
      <Link
        href={`${prefix}/products/${rail.slug}`}
        className={cn(
          'col-span-2 sm:col-span-1 sm:row-span-2 lg:row-span-1 grid place-items-center min-h-14 text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white',
          toneStyles[rail.tone]
        )}
      >
        <span className="font-sans font-bold text-[13px] leading-none tracking-[0.14em] uppercase rtl:tracking-normal sm:[writing-mode:vertical-rl] sm:rotate-180 rtl:sm:rotate-0">
          {rail.label[locale]}
        </span>
      </Link>
      <ul className="contents">
        {rail.products.map((product) => (
          <RailTile key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
