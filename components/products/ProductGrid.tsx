'use client';

import React from 'react';
import { ProductCategoryData } from '@/data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  category: ProductCategoryData;
}

export function ProductGrid({ category }: ProductGridProps) {
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-in-a-Row Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {category.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categorySlug={category.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
