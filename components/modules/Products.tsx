'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductItem {
  id: string;
  name: string;
  category: 'fruits' | 'vegetables' | 'herbs' | 'specialty';
  origin: string;
  imageUrl: string;
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'vegetables', label: 'Vegetables' },
  { id: 'herbs', label: 'Leafy & Herbs' },
  { id: 'specialty', label: 'Specialty' },
];

const products: ProductItem[] = [
  {
    id: 'pears',
    name: 'Pears',
    category: 'fruits',
    origin: 'South Africa',
    imageUrl: 'https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?q=80&w=400',
  },
  {
    id: 'rambutan',
    name: 'Rambutan',
    category: 'specialty',
    origin: 'Thailand',
    imageUrl: 'https://images.unsplash.com/photo-1562436260-8c9216eeb70a?q=80&w=400',
  },
  {
    id: 'cherries',
    name: 'Cherries',
    category: 'fruits',
    origin: 'Chile',
    imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=400',
  },
  {
    id: 'avocado-hass',
    name: 'Avocado Hass',
    category: 'specialty',
    origin: 'Kenya',
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=400',
  },
  {
    id: 'blueberries',
    name: 'Blueberries',
    category: 'fruits',
    origin: 'Peru',
    imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=400',
  },
  {
    id: 'grapes-red',
    name: 'Grapes (Red)',
    category: 'fruits',
    origin: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1537089944760-03a77870af67?q=80&w=400',
  },
  {
    id: 'apricots',
    name: 'Apricots',
    category: 'fruits',
    origin: 'Uzbekistan',
    imageUrl: 'https://images.unsplash.com/photo-1501746877-14782df589a4?q=80&w=400',
  },
  {
    id: 'roma-tomato',
    name: 'Roma Tomatoes',
    category: 'vegetables',
    origin: 'Netherlands',
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=400',
  },
  {
    id: 'iceberg-lettuce',
    name: 'Iceberg Lettuce',
    category: 'vegetables',
    origin: 'Spain',
    imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=400',
  },
  {
    id: 'coriander',
    name: 'Fresh Coriander',
    category: 'herbs',
    origin: 'Oman',
    imageUrl: 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fa?q=80&w=400',
  },
  {
    id: 'basil',
    name: 'Sweet Basil',
    category: 'herbs',
    origin: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=400',
  },
];

export function Products() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-20 bg-[#063B27] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-white/80 block">
            OUR PRODUCTS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Freshness, Sourced From Around the World.
          </h2>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-sans text-xs font-semibold py-2 px-5 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white ${
                  activeCategory === cat.id
                    ? 'bg-[#4AA658] text-white shadow-sm'
                    : 'bg-transparent text-white/70 border border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 7 Circular Products Row Grid */}
        <div className="relative min-h-[220px]">
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-center items-start"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  key={product.id}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Circle image container */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-[#4AA658] bg-black/20 transition-all duration-300 shadow-md">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url('${product.imageUrl}')` }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title and Origin */}
                  <div className="mt-3 space-y-0.5">
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-white tracking-tight leading-snug">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-white/70 font-medium">
                      {product.origin}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="font-sans text-sm text-white/60">No produce available in this category.</p>
            </div>
          )}
        </div>

        {/* View Details CTA Button */}
        <div className="flex justify-center pt-2">
          <a
            href="#contact"
            className="inline-flex border border-white/30 hover:border-white bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-bold px-6 py-2.5 rounded-full transition-all duration-300 items-center gap-3 group focus-visible:outline-2 focus-visible:outline-white"
          >
            <span>View More Product Details</span>
            <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">
              <svg className="w-3 h-3 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}

