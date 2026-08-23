'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Calendar, Truck, ArrowRight } from 'lucide-react';

interface MetricCard {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

const metricCards: MetricCard[] = [
  {
    number: '01',
    icon: <Globe2 className="w-6 h-6 text-brand-saffron" aria-hidden="true" />,
    title: 'Global Sourcing',
    description: 'Reliable sourcing from multiple growing regions across the world.',
    isDark: true,
  },
  {
    number: '02',
    icon: <Calendar className="w-6 h-6 text-brand-lime" aria-hidden="true" />,
    title: 'Year-Round Supply',
    description: 'Seasonal sourcing helps maintain consistent availability throughout the year.',
    isDark: false,
  },
  {
    number: '03',
    icon: <Truck className="w-6 h-6 text-brand-lime" aria-hidden="true" />,
    title: 'Built for Qatar',
    description: 'Trusted distribution, cold-chain logistics and daily delivery across Qatar.',
    isDark: false,
  },
];

export function WhoWeAre() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Context Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-lime font-bold">
                WHO WE ARE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-forest leading-[1.1] tracking-tight">
                Fresh Produce. <br />
                Strong Supply. <br />
                Trusted Across Qatar.
              </h2>
            </div>
            <p className="font-sans text-neutral-text-dark text-sm sm:text-base leading-relaxed">
              Nairat Food is one of Qatar’s leading fresh-produce suppliers, sourcing premium fresh fruits and vegetables from trusted growing regions worldwide and delivering them to retailers, wholesalers, food-service businesses and homes across Qatar.
            </p>
            <div className="pt-2">
              <a
                href="#services"
                className="bg-brand-forest hover:bg-brand-forest/90 text-white font-sans text-sm font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-md flex items-center gap-3 w-fit group focus-visible:outline-2 focus-visible:outline-brand-lime"
              >
                <span>Discover Our Story</span>
                <span className="w-5 h-5 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">
                  <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Three Vertical Metric Cards */}
          <div className="space-y-6">
            {metricCards.map((card, index) => (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border transition-all duration-300 ${
                  card.isDark
                    ? 'bg-brand-forest text-white border-brand-forest shadow-md'
                    : 'bg-neutral-bg-soft text-neutral-text-dark border-brand-forest/5 hover:border-brand-lime/20'
                }`}
              >
                {/* Number & Icon container */}
                <div className="flex items-center sm:items-start justify-between sm:justify-start gap-4">
                  <span className="font-display font-bold text-4xl leading-none opacity-85">
                    {card.number}
                  </span>
                </div>

                {/* Text Content */}
                <div className="space-y-2 flex-1">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 border ${
                    card.isDark
                      ? 'bg-white/10 border-white/10'
                      : 'bg-white border-brand-forest/5'
                  }`}>
                    {card.icon}
                  </div>
                  
                  <h3 className={`font-display font-extrabold text-base tracking-tight leading-snug ${
                    card.isDark ? 'text-white' : 'text-brand-forest'
                  }`}>
                    {card.title}
                  </h3>
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed ${
                    card.isDark ? 'text-white/80' : 'text-neutral-text-muted'
                  }`}>
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
