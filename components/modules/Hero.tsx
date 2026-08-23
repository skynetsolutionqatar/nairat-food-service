'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section 
      id="home"
      className="relative min-h-[90vh] flex items-center bg-[#063B27] overflow-hidden"
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-100"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974')` 
        }}
        aria-hidden="true"
      />
      
      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#063B27] via-[#063B27]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#063B27] via-transparent to-[#063B27]/50" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 pt-40 pb-20 z-10 w-full">
        <div className="max-w-2xl space-y-6">
          
          {/* Main Title with Green Second Line */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
          >
            <span className="text-white block">Fresh from the Source.</span>
            <span className="text-[#4AA658] block mt-1">Delivered Across Qatar.</span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-sans text-sm sm:text-base text-white/85 leading-relaxed max-w-xl"
          >
            Nairat Food imports, distributes and delivers premium fresh fruits and vegetables to Qatar’s leading supermarkets, markets and homes – every day of the year.
          </motion.p>
          
          {/* CTA Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-2"
          >
            <a
              href="#products"
              className="inline-flex bg-[#4AA658] hover:bg-[#3d8b49] text-white font-sans text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-md items-center gap-3 group focus-visible:outline-2 focus-visible:outline-white"
            >
              <span>Explore Our Products</span>
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 text-[#4AA658] group-hover:translate-x-0.5 transition-transform duration-200">
                <svg className="w-3 h-3 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

