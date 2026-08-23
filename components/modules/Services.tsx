'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Store, Workflow, ShoppingBag, ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  points: string[];
  ctaText: string;
  href: string;
}

const services: ServiceItem[] = [
  {
    id: 'retail-wholesale',
    icon: <Store className="w-6 h-6 text-brand-forest" aria-hidden="true" />,
    title: 'Retail & Wholesale',
    desc: 'Bulk sourcing and packaging services custom-tailored for regional hypermarkets, luxury hotels, premium restaurants, and institutional caterers.',
    points: [
      'High-volume contract stability',
      'Custom B2B packaging & sorting',
      'Daily temperature-controlled shipping',
    ],
    ctaText: 'Open Business Account',
    href: '#contact',
  },
  {
    id: 'grower-partnerships',
    icon: <Workflow className="w-6 h-6 text-brand-forest" aria-hidden="true" />,
    title: 'Grower Partnerships',
    desc: 'Contract-growing and dynamic crop planning directly with global farmers to match Qatari demand curves, bypassing brokers completely.',
    points: [
      'Crop planning & seasonal hedging',
      'Direct farm-gate quality compliance',
      'Dedicated logistics tracking',
    ],
    ctaText: 'Partner with Nairat',
    href: '#contact',
  },
  {
    id: 'nairat-shop',
    icon: <ShoppingBag className="w-6 h-6 text-brand-forest" aria-hidden="true" />,
    title: 'Nairat Online Shop',
    desc: 'Bringing cold-chain wholesale grade fresh produce straight to Qatari homes. Order premium hand-selected fruits and vegetables via our B2C portal.',
    points: [
      'Next-day temperature-safe shipping',
      'Individually inspected premium grade',
      'Convenient contactless checkout',
    ],
    ctaText: 'Order Fresh Produce Online',
    href: '#contact',
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Headings */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-lime font-bold">
            WHAT WE DO
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-forest tracking-tight">
            Our Core Fresh Operations
          </h2>
          <p className="font-sans text-neutral-text-muted text-base leading-relaxed">
            From farm-gate sourcing to bulk retail distribution, Nairat manages every link in the fresh supply cycle to Qatari standards.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-neutral-bg-soft rounded-2xl p-8 border border-brand-forest/5 hover:border-brand-lime/20 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="space-y-6">
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-white border border-brand-forest/5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                  {service.icon}
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-2xl text-brand-forest tracking-tight">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm text-neutral-text-muted leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                {/* Point list */}
                <ul className="space-y-2.5 pt-2 border-t border-brand-forest/5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 font-sans text-xs text-neutral-text-dark font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <a
                  href={service.href}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-brand-forest hover:text-white border border-brand-forest/10 hover:border-brand-forest text-brand-forest font-sans text-sm font-bold py-3.5 px-6 rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-lime focus-visible:outline-offset-2"
                >
                  <span>{service.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
