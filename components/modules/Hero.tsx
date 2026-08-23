'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section 
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center bg-brand-forest overflow-hidden"
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 scale-100"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974')` 
        }}
        aria-hidden="true"
      />
      
      {/* Radial and linear dark gradient overlays to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/40 to-brand-forest/60" />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 pt-44 pb-20 z-10 w-full">
        {/* Asymmetrical 50/50 Grid layout matching user's target mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end">
          
          {/* Left Column: Huge Title */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight text-pretty"
            >
              Fresh from the Source. <br />
              Delivered Across Qatar.
            </motion.h1>
          </div>

          {/* Right Column: Description & Action */}
          <div className="flex flex-col items-start justify-end space-y-4 lg:ps-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-sans text-sm sm:text-base text-white/90 leading-relaxed max-w-md"
            >
              Nairat Food imports, distributes and delivers premium fresh fruit <br className="hidden sm:inline" />
              and vegetables to Qatar’s leading supermarkets, markets and homes <br className="hidden sm:inline" />
              - every day of the year
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <a
                href="#products"
                className="inline-flex bg-[#0F7944] hover:bg-[#0E6C3B] text-white font-sans text-sm font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-lg items-center gap-3.5 group focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>Explore Our Products</span>
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 text-[#0F7944] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                  <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
