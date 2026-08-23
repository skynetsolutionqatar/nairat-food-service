'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Tag } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  category: 'fruits' | 'vegetables' | 'herbs' | 'specialty';
  origin: string;
  imageUrl: string;
  isSeasonal?: boolean;
}

const categories = [
  { id: 'all', label: 'All Produce' },
  { id: 'fruits', label: 'Fresh Fruits' },
  { id: 'vegetables', label: 'Vegetables' },
  { id: 'herbs', label: 'Leafy & Herbs' },
  { id: 'specialty', label: 'Specialty Produce' },
];

const products: ProductItem[] = [
  // Fruits
  {
    id: 'valencia-orange',
    name: 'Valencia Oranges',
    category: 'fruits',
    origin: 'South Africa',
    imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=400',
  },
  {
    id: 'cavendish-banana',
    name: 'Cavendish Bananas',
    category: 'fruits',
    origin: 'Ecuador',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=400',
  },
  {
    id: 'royal-gala-apple',
    name: 'Royal Gala Apples',
    category: 'fruits',
    origin: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=400',
  },
  // Vegetables
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
    id: 'red-onion',
    name: 'Red Onions',
    category: 'vegetables',
    origin: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1618228473054-9a09c7a054db?q=80&w=400',
  },
  // Herbs
  {
    id: 'coriander',
    name: 'Fresh Coriander',
    category: 'herbs',
    origin: 'Oman',
    imageUrl: 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fa?q=80&w=400',
    isSeasonal: true,
  },
  {
    id: 'basil',
    name: 'Sweet Basil',
    category: 'herbs',
    origin: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=400',
  },
  // Specialty
  {
    id: 'white-asparagus',
    name: 'White Asparagus',
    category: 'specialty',
    origin: 'Peru',
    imageUrl: 'https://images.unsplash.com/photo-1515471204580-f7cbb770309e?q=80&w=400',
  },
  {
    id: 'hass-avocado',
    name: 'Hass Avocados',
    category: 'specialty',
    origin: 'Mexico',
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=400',
  },
  {
    id: 'rambutan',
    name: 'Rambutan',
    category: 'specialty',
    origin: 'Thailand',
    imageUrl: 'https://images.unsplash.com/photo-1562436260-8c9216eeb70a?q=80&w=400',
    isSeasonal: true,
  },
];

export function Products() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Title and Category Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-lime font-bold">
              OUR PRODUCE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-forest tracking-tight">
              Premium Fresh Products
            </h2>
            <p className="font-sans text-neutral-text-muted text-base max-w-xl">
              Imported daily from global regions and processed in clean chillers, our produce guarantees maximum shelf life and peak nutritional index.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2.5 border-b border-brand-forest/5 pb-2 lg:pb-0 lg:border-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-sans text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-lime focus-visible:outline-offset-2 ${
                  activeCategory === cat.id
                    ? 'bg-brand-forest text-white shadow-sm'
                    : 'bg-neutral-bg-soft text-neutral-text-muted hover:bg-brand-forest/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid / Carousel Container */}
        <div className="relative min-h-[400px]">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  className="group bg-neutral-bg-soft rounded-3xl p-6 border border-brand-forest/5 hover:border-brand-lime/20 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Circle Image Wrapper with Zoom */}
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-brand-forest/5 flex items-center justify-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url('${product.imageUrl}')` }}
                        aria-hidden="true"
                      />
                      
                      {/* Seasonal Indicator */}
                      {product.isSeasonal && (
                        <div className="absolute top-3 left-3 bg-brand-saffron text-brand-forest font-mono text-[9px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full shadow-sm">
                          Seasonal
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-neutral-text-muted uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-brand-lime" aria-hidden="true" />
                        {product.category === 'herbs' ? 'Leafy & Herbs' : product.category}
                      </span>
                      <h3 className="font-display font-bold text-lg text-brand-forest leading-snug">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  {/* Origin Badge */}
                  <div className="pt-4 border-t border-brand-forest/5 flex items-center justify-between">
                    <span className="font-sans text-xs text-neutral-text-muted">Origin:</span>
                    <span className="font-sans text-xs font-semibold text-brand-forest bg-white py-1 px-3 rounded-full border border-brand-forest/5">
                      {product.origin}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Fallback Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-sans text-base text-neutral-text-muted">No produce available in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
