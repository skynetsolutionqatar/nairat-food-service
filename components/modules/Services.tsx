'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';

interface ServiceCard {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  actionText: string;
  actionHref: string;
}

const serviceCards: ServiceCard[] = [
  {
    id: 'retail-wholesale',
    title: 'Retail & Wholesale Distribution',
    desc: 'Daily fresh-produce supply to retailers, wholesalers, supermarkets and food-service businesses across Qatar.',
    imageUrl: '/services/wholesale-distribution.avif',
    actionText: 'Explore Distribution',
    actionHref: '#contact',
  },
  {
    id: 'grower-partnerships',
    title: 'Grower & Exporter Partnerships',
    desc: 'A reliable local partner for growers and exporters looking to bring fresh produce to the Qatar market.',
    imageUrl: '/services/grower and exporter.avif',
    actionText: 'Partner With Us',
    actionHref: '#contact',
  },
  {
    id: 'nairat-shop',
    title: 'Nairat Retail Shop',
    desc: 'Fresh fruits and vegetables available directly to consumers at our retail store.',
    imageUrl: '/services/nairat shop.avif',
    actionText: 'Visit Nairat Shop',
    actionHref: '#contact',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
        
        {/* Header Grid: Left Headline vs Right Subtext & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Left Headline */}
          <div className="lg:col-span-7 space-y-4">
            <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-[#000000] block">
              WHAT WE DO
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#000000] leading-[1.15] tracking-tight">
              Fresh Produce Supply <br />
              at Every Scale.
            </h2>
          </div>

          {/* Right Paragraph & CTA Button */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end space-y-6">
            <p className="font-sans text-sm sm:text-base text-[#B9B9B9] leading-relaxed text-left">
              From sourcing and distribution to retail, we connect premium fresh produce with businesses and consumers across Qatar.
            </p>
            <div className="self-start lg:self-end">
              <CtaButton href="#contact">
                Learn More
              </CtaButton>
            </div>
          </div>

        </div>

        {/* 3 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {serviceCards.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="flex flex-col space-y-4 group"
            >
              {/* Top Rounded Image */}
              <div className="relative w-full h-56 sm:h-60 md:h-64 rounded-2xl overflow-hidden bg-neutral-100">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${service.imageUrl}')` }}
                  aria-label={service.title}
                />
              </div>

              {/* Card Text & Link below image */}
              <div className="space-y-3 pt-1">
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#000000] tracking-tight leading-snug group-hover:text-[#168849] transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#B9B9B9] leading-relaxed">
                  {service.desc}
                </p>
                <div className="pt-2">
                  <a
                    href={service.actionHref}
                    className="inline-flex items-center gap-2 font-sans text-xs font-bold text-[#000000] hover:text-[#168849] transition-colors group/link cursor-pointer"
                  >
                    <span>{service.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


