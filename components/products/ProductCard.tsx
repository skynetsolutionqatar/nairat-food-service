'use client';

import React from 'react';
import Image from 'next/image';
import { ProductItem } from '@/data/products';

interface ProductCardProps {
  product: ProductItem;
  categorySlug: string;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-neutral-100 shadow-xs hover:shadow-xl transition-all duration-300 border border-neutral-200/80">
      {/* Product Image */}
      <Image
        src={product.imageUrl}
        alt={`${product.name} - Nairat Food Services`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

      {/* Product Name in the Image */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="font-sans text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-xs">
          {product.name}
        </h3>
      </div>
    </div>
  );
}
