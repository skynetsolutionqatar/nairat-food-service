'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CtaButton } from '@/components/ui/CtaButton';

interface StrengthCard {
  id: string;
  number?: string;
  title: string;
  imageUrl: string;
  alt: string;
}

const strengthsList: StrengthCard[] = [
  {
    id: 'chiller-rooms',
    number: '20',
    title: 'Dedicated Chiller Rooms',
    imageUrl: '/whychooseus/chiller warehouse.avif',
    alt: '20 Dedicated Chiller Rooms',
  },
  {
    id: 'warehouse',
    number: '5,000 m2',
    title: 'Cold-Chain Warehouse',
    imageUrl: '/whychooseus/warehouse.avif',
    alt: '5,000 m2 Cold-Chain Warehouse',
  },
  {
    id: 'cold-chain',
    title: 'Cold Chain Unbroken',
    imageUrl: '/whychooseus/temperature conrolled.avif',
    alt: 'Cold Chain Unbroken',
  },
  {
    id: 'fleet',
    number: '40',
    title: 'Refrigerated Vehicles',
    imageUrl: '/whychooseus/truck.avif',
    alt: '40 Refrigerated Vehicles',
  },
];

const tallCard: StrengthCard = {
  id: 'sourced-origin',
  title: 'Sourced at Origin',
  imageUrl: '/whychooseus/sourced from origin.avif',
  alt: 'Sourced at Origin',
};

export function Strengths() {
  return (
    <section id="strengths" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
        
        {/* Header Grid: Left Headline vs Right Subtext & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Left Headline */}
          <div className="lg:col-span-7 space-y-4">
            <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-[#000000] block">
              WHY CHOOSE US
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#000000] leading-[1.15] tracking-tight">
              Built for Freshness. <br />
              Ready to Deliver.
            </h2>
          </div>

          {/* Right Paragraph & CTA Button */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end space-y-6">
            <p className="font-sans text-sm sm:text-base text-[#B9B9B9] leading-relaxed text-left">
              From global sourcing to last-mile delivery, our integrated supply chain is designed to protect quality, maintain consistency and deliver fresh produce reliably across Qatar.
            </p>
            <div className="self-start lg:self-end">
              <CtaButton href="#contact">
                Read More
              </CtaButton>
            </div>
          </div>

        </div>

        {/* Bento Grid: 2x2 Left Cards + 1 Tall Right Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          
          {/* Left 2x2 Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {strengthsList.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl h-52 sm:h-56 md:h-60 shadow-sm flex flex-col justify-end p-6 bg-neutral-900"
              >
                {/* Background Image with Hover Zoom */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${card.imageUrl}')` }}
                  aria-label={card.alt}
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:from-black/90 transition-opacity duration-300" />

                {/* Card Content Overlay */}
                <div className="relative z-10 space-y-1 text-white">
                  {card.number && (
                    <span className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-none block drop-shadow-md">
                      {card.number}
                    </span>
                  )}
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug drop-shadow-md">
                    {card.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Tall Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1 group relative overflow-hidden rounded-2xl min-h-[380px] sm:min-h-[440px] lg:min-h-full shadow-sm flex flex-col justify-end p-7 bg-neutral-900"
          >
            {/* Background Image with Hover Zoom */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${tallCard.imageUrl}')` }}
              aria-label={tallCard.alt}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:from-black/90 transition-opacity duration-300" />

            {/* Card Content Overlay */}
            <div className="relative z-10 text-white">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug drop-shadow-md">
                {tallCard.title}
              </h3>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}


