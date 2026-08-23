'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

interface MetricCard {
  number: string;
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

const metricCards: MetricCard[] = [
  {
    number: '01',
    icon: <Globe2 className="w-6 h-6 text-brand-lime" aria-hidden="true" />,
    title: 'Global Sourcing Network',
    value: '15+ Source Countries',
    description: 'Direct relationships with certified global growers in South Africa, Australia, Europe, and South America.',
  },
  {
    number: '02',
    icon: <Calendar className="w-6 h-6 text-brand-lime" aria-hidden="true" />,
    title: 'Year-Round Supply',
    value: '365 Days Uninterrupted',
    description: 'Bypassing seasonal shortages through dual-hemisphere sourcing networks to maintain supermarket stock levels.',
  },
  {
    number: '03',
    icon: <ShieldCheck className="w-6 h-6 text-brand-lime" aria-hidden="true" />,
    title: 'Built for Qatari Scale',
    value: '100% Logistics Reliability',
    description: 'Providing food supply security aligned with Qatar’s National Food Security Strategy for major hypermarket networks.',
  },
];

export function WhoWeAre() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Context Text */}
          <div className="space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-lime font-bold">
              WHO WE ARE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-forest leading-[1.15] tracking-tight">
              Qatar’s Trusted Gateway to Fresh Produce.
            </h2>
            <p className="font-sans text-neutral-text-dark text-base leading-relaxed">
              Established as a key pillar in Qatar’s B2B food import ecosystem, Nairat Food Services bridges the gap between global agricultural standard-setters and regional food retailers. 
            </p>
            <p className="font-sans text-neutral-text-muted text-base leading-relaxed">
              By controlling every variable of the cold chain logistics pipeline—from direct farm harvesting agreements, controlled atmosphere transit, to temperature-controlled customs clearance—we deliver premium quality that protects your bottom line and guarantees shelf-life.
            </p>
            <div className="pt-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-brand-forest hover:text-brand-lime font-sans font-bold text-base transition-colors group focus-visible:outline-2 focus-visible:outline-brand-lime focus-visible:outline-offset-4 rounded"
              >
                <span>Discover our service capabilities</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
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
                className="flex flex-col sm:flex-row gap-6 p-8 bg-neutral-bg-soft rounded-2xl border border-brand-forest/5 hover:border-brand-lime/20 transition-all duration-300"
              >
                {/* Number & Icon container */}
                <div className="flex items-center sm:items-start justify-between sm:justify-start gap-4">
                  <span className="font-mono text-xs text-brand-saffron tracking-widest font-bold border border-brand-saffron/30 rounded-full px-2 py-0.5">
                    {card.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0 border border-brand-forest/5">
                    {card.icon}
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-xs text-neutral-text-muted uppercase tracking-wider leading-none">
                    {card.title}
                  </h3>
                  <div className="font-display font-extrabold text-xl text-brand-forest leading-tight">
                    {card.value}
                  </div>
                  <p className="font-sans text-sm text-neutral-text-muted leading-relaxed">
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
