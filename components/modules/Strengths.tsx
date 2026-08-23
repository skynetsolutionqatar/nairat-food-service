'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Snowflake, Warehouse, Trees } from 'lucide-react';

interface StrengthItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  desc: string;
  imageUrl: string;
  gridClass: string;
}

const strengths: StrengthItem[] = [
  {
    id: 'chiller-rooms',
    icon: <Snowflake className="w-6 h-6 text-white" aria-hidden="true" />,
    label: 'Temperature Zones',
    title: '20 Dedicated Chiller Rooms',
    desc: 'Individually regulated, customized temperature and humidity chambers optimized to maintain the absolute peak of fruit and vegetable shelf lives.',
    imageUrl: 'https://images.unsplash.com/photo-1583258292688-d0213df4a3a8?q=80&w=600',
    gridClass: 'lg:col-span-1 lg:row-span-1',
  },
  {
    id: 'warehouse',
    icon: <Warehouse className="w-6 h-6 text-white" aria-hidden="true" />,
    label: 'Salwa Road Facility',
    title: '5,000 m² Cold Warehouse',
    desc: 'Fully insulated logistics depot with high-volume handling facilities, guaranteeing rapid distribution and intake under optimal conditions.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600',
    gridClass: 'lg:col-span-1 lg:row-span-1',
  },
  {
    id: 'grower-partnerships',
    icon: <Trees className="w-6 h-6 text-white" aria-hidden="true" />,
    label: 'Global Farms',
    title: 'Sourced Direct at Origin',
    desc: 'Bypassing brokers to work directly with growers across 15+ countries. From hand-picking to cargo loading, we negotiate direct quality protocols, maintaining pricing stability and volume security regardless of season.',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600',
    gridClass: 'lg:col-span-1 lg:row-span-2 flex flex-col justify-between',
  },
  {
    id: 'cold-chain',
    icon: <ShieldCheck className="w-6 h-6 text-white" aria-hidden="true" />,
    label: 'Quality Standard',
    title: 'Cold Chain, Unbroken',
    desc: 'Monitored temperature transitions from farm to supermarket, eliminating thermal shock and bacterial contamination vectors.',
    imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=600',
    gridClass: 'lg:col-span-1 lg:row-span-1',
  },
  {
    id: 'fleet',
    icon: <Truck className="w-6 h-6 text-white" aria-hidden="true" />,
    label: 'Refrigerated Fleet',
    title: '40 Refrigerated Vehicles',
    desc: 'Active monitoring equipped logistics fleet distributing daily to Al Meera, Lulu, and luxury hotel locations across Doha.',
    imageUrl: 'https://images.unsplash.com/photo-1516576885230-101c031d0473?q=80&w=600',
    gridClass: 'lg:col-span-1 lg:row-span-1',
  },
];

export function Strengths() {
  return (
    <section id="strengths" className="py-24 bg-neutral-bg-soft">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Headings */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-lime font-bold">
            OUR STRENGTHS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-forest tracking-tight">
            Built for Freshness. Ready to Deliver.
          </h2>
          <p className="font-sans text-neutral-text-muted text-base">
            We invest in advanced machinery, infrastructure, and direct grower ties to provide the Qatari food sector with absolute B2B supply chain integrity.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden bg-brand-forest rounded-2xl shadow-sm border border-brand-forest/5 flex flex-col justify-end min-h-[350px] ${item.gridClass}`}
            >
              {/* Background Image with hover zoom */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.imageUrl}')` }}
                aria-hidden="true"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-brand-forest/75 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Hover highlight border line */}
              <div className="absolute inset-0 border border-transparent group-hover:border-brand-lime/30 rounded-2xl transition-all duration-300 pointer-events-none" />

              {/* Content Panel (Relative for z-index rendering) */}
              <div className="relative p-8 space-y-4 z-10 text-white">
                {/* Floating Icon badge */}
                <div className="w-10 h-10 rounded-xl bg-brand-lime/80 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/10 shadow-md">
                  {item.icon}
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-brand-saffron font-bold uppercase tracking-wider">
                    {item.label}
                  </span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight leading-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed max-w-lg">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
