'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Cta(): React.ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !bgImageRef.current) return;

      // Parallax scrub on background image
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.1, yPercent: -4 },
        {
          scale: 1.02,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      // Content reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        '.cta-header-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out' }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact-cta"
      ref={containerRef}
      className="scroll-mt-24 sm:scroll-mt-28 relative w-full overflow-hidden bg-neutral-900"
    >
      {/* Full-Bleed Background Image with GSAP Parallax */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform transform-gpu"
      >
        <Image
          src="/cta/ctaft-bac.webp"
          alt="Fresh Fruits & Vegetables Background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle Dark Vignette & Left Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25" />
      </div>

      {/* Content Container Aligned Exactly with Other Sections */}
      <div className="relative z-10 max-w-[1140px] 2xl:max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 2xl:py-14">
        <div className="max-w-3xl 2xl:max-w-4xl space-y-3 sm:space-y-4">
          {/* Headline */}
          <h2 className="cta-header-item font-display type-h2 font-semibold text-white text-left">
            <span className="block sm:whitespace-nowrap">Fresh Fruits &amp; Vegetables from</span>
            <span className="block sm:whitespace-nowrap mt-0.5 sm:mt-1">Around the World</span>
          </h2>

          {/* Flags + Subtext Row */}
          <div className="cta-header-item flex items-center gap-3">
            <div className="relative shrink-0">
              <Image
                src="/cta/ctacontry.webp"
                alt="Sourced Around the World country flags"
                width={120}
                height={36}
                style={{ width: 'auto', height: 'auto' }}
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </div>
            <div className="font-sans text-xs sm:text-[13px] text-white leading-snug">
              <span className="block font-semibold text-white">Sourced Around the World.</span>
              <span className="block text-white/80">Delivered Across Qatar.</span>
            </div>
          </div>

          {/* Action Link directly to /contact */}
          <div className="cta-header-item pt-1 flex flex-wrap gap-4 items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-[#168849] hover:bg-[#12753e] text-white font-sans text-xs sm:text-sm font-semibold tracking-[-0.01em] pl-5 pr-2 py-1.5 sm:py-2 rounded-full transition-all duration-300 shadow-lg shadow-[#168849]/25 cursor-pointer active:scale-95"
            >
              <span>Contact Us</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#168849] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
