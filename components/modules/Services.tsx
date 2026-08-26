'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Sprout, ShoppingBag } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  imageUrl: string;
}

const services: ServiceItem[] = [
  {
    id: 'retail-wholesale',
    icon: <Truck className="w-4 h-4 text-white" aria-hidden="true" />,
    title: 'Retail & Wholesale Distribution',
    desc: 'Reliable supply and timely delivery to supermarkets, hypermarkets, grocers, restaurants and hotels across Qatar.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600',
  },
  {
    id: 'grower-partnerships',
    icon: <Sprout className="w-4 h-4 text-white" aria-hidden="true" />,
    title: 'Grower & Exporter Partnerships',
    desc: 'Strong partnerships with growers and exporters worldwide for consistent quality and long-term supply.',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600',
  },
  {
    id: 'nairat-shop',
    icon: <ShoppingBag className="w-4 h-4 text-white" aria-hidden="true" />,
    title: 'Nairat Shop',
    desc: 'Your destination for hand-picked fresh fruits and vegetables with quality you can trust.',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
        
        {/* Section Headings with Carousel controls */}
        <div className="flex items-end justify-between">
          <div className="space-y-3">
            <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-[#5C6662] block">
              OUR SERVICES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#063B27] tracking-tight">
              What We Do
            </h2>
          </div>
          
          {/* Carousel Arrows */}
          <div className="flex gap-2">
            <button 
              type="button" 
              aria-label="Previous services"
              className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-neutral-text-muted hover:bg-neutral-bg-soft hover:text-brand-forest transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button 
              type="button" 
              aria-label="Next services"
              className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-neutral-text-muted hover:bg-neutral-bg-soft hover:text-brand-forest transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="bg-white rounded-2xl overflow-hidden border border-black/5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="space-y-6">
                {/* Image Header with Overlapping Icon Badge */}
                <div className="relative h-52 w-full overflow-hidden bg-[#F4F6F5]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${service.imageUrl}')` }}
                    aria-hidden="true"
                  />
                  
                  {/* Floating Circle Icon Badge */}
                  <div className="absolute -bottom-4 left-6 w-9 h-9 rounded-full bg-[#4AA658] flex items-center justify-center shadow-md border-2 border-white">
                    {service.icon}
                  </div>
                </div>

                {/* Text Content */}
                <div className="px-6 pb-6 pt-1 space-y-2">
                  <h3 className="font-display font-extrabold text-lg text-[#063B27] tracking-tight group-hover:text-[#4AA658] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#5C6662] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Centered Learn More Action Button */}
        <div className="flex justify-center pt-2">
          <CtaButton href="#contact">
            Learn More About Our Services
          </CtaButton>
        </div>

      </div>
    </section>
  );
}

