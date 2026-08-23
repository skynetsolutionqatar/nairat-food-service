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
        {/* Eyebrow badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
        >
          <Leaf className="w-4 h-4 text-brand-lime" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-brand-saffron font-bold">
            Qatar’s Premier Cold-Chain Partner
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mb-8"
        >
          Fresh from the Source. <br />
          <span className="text-brand-lime">Delivered Across Qatar.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed mb-10"
        >
          Connecting Qatar to certified growers worldwide. Preserving freshness and nutritional integrity with Qatari B2B cold-chain excellence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
        >
          <a
            href="#products"
            className="w-full sm:w-auto bg-brand-lime hover:bg-brand-lime/90 text-white font-sans text-base font-semibold px-8 py-4 rounded-full transition-all duration-200 shadow-lg shadow-brand-lime/25 flex items-center justify-center gap-2 group focus-visible:outline-2 focus-visible:outline-brand-saffron focus-visible:outline-offset-2"
          >
            <span>Explore Our Products</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-sans text-base font-semibold px-8 py-4 rounded-full transition-all duration-200 backdrop-blur-sm flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            <span>Become a Partner</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
