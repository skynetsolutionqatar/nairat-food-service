'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ClimateFeature() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        '.feature-split-left',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      ).fromTo(
        '.feature-split-right',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="features"
      ref={containerRef}
      className="py-12 sm:py-16 bg-white text-[#111814] px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Dark Forest Feature Card */}
          <div className="feature-split-left lg:col-span-6 rounded-3xl sm:rounded-[2.5rem] bg-[#0A2618] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8 shadow-xl border border-white/10">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white/50 block">
                02 / 04
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                Multi-Zone Climate Storage &amp; Fresh Nutrition
              </h2>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-lg font-normal">
                Keep your produce fresh, green, and thriving with professional cooling, humidity calibration, and continuous telematics monitoring tailored to your space.
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-block bg-[#D4F056] hover:bg-[#c4e046] text-[#0A2618] font-sans text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
                >
                  View Details
                </a>
              </div>
            </div>

            {/* Bottom Inactive List Item */}
            <div className="pt-6 border-t border-white/15 flex items-center justify-between text-xs text-white/60">
              <span className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-white/40">03</span>
                <span className="font-semibold text-white/80">Direct Fleet Delivery &amp; Store Logistics</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4F056]">
                NEXT
              </span>
            </div>
          </div>

          {/* Right Tall Feature Image Card */}
          <div className="feature-split-right lg:col-span-6 rounded-3xl sm:rounded-[2.5rem] overflow-hidden relative min-h-[380px] sm:min-h-[460px] lg:min-h-full shadow-xl bg-neutral-900 group">
            <Image
              src="/whychooseus/warehouse.avif"
              alt="Cold-chain warehouse facility"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
