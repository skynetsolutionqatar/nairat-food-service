'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Calendar, Truck } from 'lucide-react';

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
    icon: <Globe2 className="w-5 h-5 text-[#4AA658]" aria-hidden="true" />,
    title: 'Global Sourcing',
    description: 'Reliable sourcing from multiple growing regions across the world.',
    isDark: true,
  },
  {
    number: '02',
    icon: <Calendar className="w-5 h-5 text-[#063B27]" aria-hidden="true" />,
    title: 'Year-Round Supply',
    description: 'Seasonal sourcing helps maintain consistent availability throughout the year.',
    isDark: false,
  },
  {
    number: '03',
    icon: <Truck className="w-5 h-5 text-[#063B27]" aria-hidden="true" />,
    title: 'Built for Qatar',
    description: 'Trusted distribution, cold-chain logistics and daily delivery across Qatar.',
    isDark: false,
  },
];

export function WhoWeAre() {
  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
        
        {/* Left / Top Section Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-[#5C6662] block">
              WHO WE ARE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#063B27] leading-[1.15] tracking-tight">
              Fresh Produce. <br />
              Strong Supply. <br />
              Trusted Across Qatar.
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <p className="font-sans text-sm sm:text-base text-[#5C6662] leading-relaxed">
              Nairat Food is one of Qatar’s leading fresh-produce suppliers, sourcing premium fresh fruits and vegetables from trusted growing regions worldwide and delivering them to retailers, wholesalers, food-service businesses and homes across Qatar.
            </p>

            <div>
              <a
                href="#services"
                className="inline-flex bg-[#4AA658] hover:bg-[#3d8b49] text-white font-sans text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-md items-center gap-3 group focus-visible:outline-2 focus-visible:outline-brand-forest"
              >
                <span>Discover Our Story</span>
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 text-[#4AA658] group-hover:translate-x-0.5 transition-transform duration-200">
                  <svg className="w-3 h-3 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* 3 Metric Cards Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {metricCards.map((card, index) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`rounded-2xl p-7 flex flex-col justify-between space-y-6 transition-all duration-300 ${
                card.isDark
                  ? 'bg-[#063B27] text-white shadow-md'
                  : 'bg-[#F4F6F5] text-[#1C2321] border border-black/5 hover:border-black/10'
              }`}
            >
              {/* Number Header */}
              <div className="flex items-center justify-between">
                <span className={`font-display font-extrabold text-4xl lg:text-5xl leading-none ${
                  card.isDark ? 'text-white' : 'text-[#1C2321]'
                }`}>
                  {card.number}
                </span>

                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                  card.isDark
                    ? 'bg-white/10 border-white/10'
                    : 'bg-white border-black/5'
                }`}>
                  {card.icon}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className={`font-display font-extrabold text-lg tracking-tight ${
                  card.isDark ? 'text-white' : 'text-[#063B27]'
                }`}>
                  {card.title}
                </h3>
                <p className={`font-sans text-xs sm:text-sm leading-relaxed ${
                  card.isDark ? 'text-white/80' : 'text-[#5C6662]'
                }`}>
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

