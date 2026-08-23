'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';

export function Hero() {
  return (
    <section 
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center bg-brand-forest overflow-hidden"
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974')` 
        }}
        aria-hidden="true"
      />
      
      {/* Radial Gradient overlay for premium depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-brand-forest/70 to-transparent" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-brand-forest/40 to-brand-forest" />

      {/* Decorative Floating Element */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-brand-lime/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-saffron/5 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-20 text-center z-10 flex flex-col items-center">
        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mb-8"
        >
          Fresh from the Source. <br />
          <span className="text-brand-lime">Delivered Across Qatar.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-sans text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed mb-10 text-pretty"
        >
          Nairat Food imports, distributes and delivers premium fresh fruits and vegetables to Qatar’s leading supermarkets, markets and homes – every day of the year.
        </motion.p>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center items-center"
        >
          <a
            href="#products"
            className="bg-brand-lime hover:bg-brand-lime/90 text-white font-sans text-sm font-bold px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-brand-lime/20 flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-brand-saffron focus-visible:outline-offset-2"
          >
            <span>Explore Our Products</span>
            <span className="w-5 h-5 rounded-full border border-white flex items-center justify-center text-white shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">
              <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
