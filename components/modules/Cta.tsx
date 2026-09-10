'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { CtaButton } from '@/components/ui/CtaButton';
import { gsap, useGSAP } from '@/lib/gsap';

export function Cta() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Content reveal on scroll
      gsap.fromTo(
        '.cta-header-item',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        }
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
      {/* Full-Bleed Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/cta/ctaft-bac.webp"
          alt="Fresh Fruits & Vegetables Background"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle Dark Vignette & Left Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/35 sm:from-black/90 sm:via-black/60 sm:to-black/25" />
      </div>

      {/* Content Container Aligned Exactly with Other Sections */}
      <div className="relative z-10 max-w-[1140px] 2xl:max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-7 sm:py-10 lg:py-12 2xl:py-14">
        <div className="max-w-3xl 2xl:max-w-4xl space-y-2.5 sm:space-y-4">
          {/* Headline */}
          <h2 className="cta-header-item font-display text-[21px] min-[380px]:text-[23px] min-[440px]:text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px] xl:text-[50px] 2xl:text-[54px] font-semibold text-white text-left leading-[1.14] sm:leading-[1.1] md:leading-[1.08] tracking-[-0.025em]">
            <span className="block sm:whitespace-nowrap">Fresh Fruits &amp; Vegetables from</span>
            <span className="block sm:whitespace-nowrap mt-0.5 sm:mt-1">Around the World</span>
          </h2>

          {/* Flags + Subtext Row */}
          <div className="cta-header-item flex items-center gap-2.5 sm:gap-3">
            <div className="relative shrink-0">
              <Image
                src="/cta/ctacontry.webp"
                alt="Sourced Around the World country flags"
                width={120}
                height={36}
                style={{ width: 'auto', height: 'auto' }}
                className="h-6 min-[380px]:h-7 sm:h-8 md:h-9 w-auto object-contain"
              />
            </div>
            <div className="font-sans text-[11px] min-[380px]:text-xs sm:text-[13px] md:text-sm text-white leading-tight sm:leading-snug">
              <span className="block font-semibold text-white">Sourced Around the World.</span>
              <span className="block text-white/80">Delivered Across Qatar.</span>
            </div>
          </div>

          {/* Action Link directly to /contact using CtaButton */}
          <div className="cta-header-item pt-1 flex flex-wrap gap-4 items-center">
            <CtaButton
              href="/contact"
              text="Contact Us"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
