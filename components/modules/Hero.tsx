'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CtaButton } from '../ui/CtaButton';

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex flex-col justify-end bg-[#052618] overflow-hidden px-4 sm:px-8"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.02]"
      >
        <source src="/hero.mp4" type="video/mp4" />
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero-bg.mp4" type="video/mp4" />
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for optimal text contrast and warmth */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-black/10" />

      {/* Main Content Container - Matches Navbar Container (max-w-7xl mx-auto px-4 sm:px-6) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-36 pb-16 lg:pb-20 z-10 w-full">
        {/* Single flex container holding two divs */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-14 w-full">

          {/* DIV 1: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[62%] text-left"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[66px] font-bold tracking-tight text-white leading-[1.12] text-left">
              <span className="block sm:whitespace-nowrap">Fresh from the Source.</span>
              <span className="block sm:whitespace-nowrap mt-2 sm:mt-3">Delivered Across Qatar.</span>
            </h1>
          </motion.div>

          {/* DIV 2: Subheading & CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-full lg:w-[38%] flex flex-col justify-end items-start gap-6 text-left"
          >
            <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed max-w-md text-left">
              Nairat Food imports, distributes and delivers premium fresh fruit and vegetables to Qatar’s leading supermarkets, markets and homes – every day of the year.
            </p>

            <div>

              <CtaButton href="#products">
                Explore Our Products
              </CtaButton>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}




