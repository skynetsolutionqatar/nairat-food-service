'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StrengthItem {
  id: string;
  number?: string;
  title: string;
  desc: string;
  imageUrl: string;
  gridClass: string;
  isFullBleed?: boolean;
}

const strengths: StrengthItem[] = [
  {
    id: 'chiller-rooms',
    number: '20',
    title: 'Dedicated Chiller Rooms',
    desc: 'Each room set to the right temperature for every type of produce.',
    imageUrl: 'https://images.unsplash.com/photo-1583258292688-d0213df4a3a8?q=80&w=600',
    gridClass: 'lg:col-span-1 lg:row-span-1',
    isFullBleed: false,
  },
  {
    id: 'warehouse',
    number: '5,000 m²',
    title: 'Cold-Chain Warehouse',
    desc: 'State-of-the-art facility built to maintain freshness at every step.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600',
    gridClass: 'lg:col-span-1 lg:row-span-1',
    isFullBleed: false,
  },
  {
    id: 'grower-partnerships',
    title: 'Sourced at Origin',
    desc: 'Direct relationships with trusted growers worldwide ensure quality right from the source.',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600',
    gridClass: 'lg:col-span-1 lg:row-span-2 min-h-[400px] lg:min-h-full',
    isFullBleed: true,
  },
  {
    id: 'cold-chain',
    title: 'Cold Chain, Unbroken',
    desc: 'Strict FIFO rotation and temperature-controlled storage to preserve freshness from arrival to delivery.',
    imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=600',
    gridClass: 'lg:col-span-1 lg:row-span-1',
    isFullBleed: false,
  },
  {
    id: 'fleet',
    number: '40',
    title: 'Refrigerated Vehicles',
    desc: 'Modern fleet ensuring safe and on-time deliveries across Qatar.',
    imageUrl: 'https://images.unsplash.com/photo-1516576885230-101c031d0473?q=80&w=600',
    gridClass: 'lg:col-span-1 lg:row-span-1',
    isFullBleed: false,
  },
];

export function Strengths() {
  return (
    <section id="strengths" className="py-24 bg-[#F4F6F5]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Headings */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-lime font-bold">
            OUR STRENGTHS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-forest tracking-tight">
            Built for Freshness. Ready to Deliver.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {strengths.map((item, index) => {
            if (item.isFullBleed) {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative overflow-hidden bg-brand-forest rounded-2xl shadow-sm border border-brand-forest/5 flex flex-col justify-end p-8 ${item.gridClass}`}
                >
                  {/* Background Image with hover zoom */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.imageUrl}')` }}
                    aria-hidden="true"
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-brand-forest/70 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Content Panel */}
                  <div className="relative space-y-3 z-10 text-white">
                    <h3 className="font-display font-extrabold text-2xl tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-white/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-sm border border-brand-forest/5 flex flex-row overflow-hidden group ${item.gridClass}`}
              >
                {/* Left side: Text Content */}
                <div className="w-1/2 p-6 flex flex-col justify-center space-y-2 text-neutral-text-dark">
                  {item.number && (
                    <span className="font-display font-extrabold text-3xl sm:text-4xl text-brand-forest leading-none">
                      {item.number}
                    </span>
                  )}
                  <h3 className="font-display font-extrabold text-base tracking-tight leading-snug text-brand-forest">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-neutral-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Right side: Image block */}
                <div className="w-1/2 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.imageUrl}')` }}
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
