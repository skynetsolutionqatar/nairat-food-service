'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const coreValueItems = [
  'Every harvest, pallet, and box is handled with precision and pride',
  'On time, on point, and always temperature-controlled',
  'Certified harvests, safe methods, zero cold-chain breaches',
  'Your satisfaction is our top priority — every store, every delivery',
];

export function CoreValues() {
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
        '.values-card-left',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      ).fromTo(
        '.values-card-right',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="values"
      ref={containerRef}
      className="py-12 sm:py-20 bg-white text-[#111814] px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Dark Card: Core Values Content */}
          <div className="values-card-left lg:col-span-6 rounded-3xl sm:rounded-[2.5rem] bg-[#0A2618] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8 shadow-xl border border-white/10">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4F056]">
                CORE VALUES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                It&apos;s not just <br />
                produce supply
              </h2>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-lg font-normal">
                We&apos;ve been connecting global orchards into thriving fresh produce aisles across Qatar since 2015. Whether it&apos;s scheduled morning deliveries or high-volume wholesale contracts — we&apos;re here to help you grow.
              </p>
            </div>

            {/* 4 Checklist Divider Rows */}
            <div className="space-y-4 border-t border-white/15 pt-6">
              {coreValueItems.map((item, idx) => (
                <div
                  key={idx}
                  className="pb-3 border-b border-white/10 text-xs sm:text-sm text-white/90 font-medium leading-relaxed"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-block bg-[#D4F056] hover:bg-[#c4e046] text-[#0A2618] font-sans text-xs sm:text-sm font-bold px-7 py-3.5 rounded-full transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Right Card: Tall Visual Photo with Floating Inset Pill */}
          <div className="values-card-right lg:col-span-6 rounded-3xl sm:rounded-[2.5rem] overflow-hidden relative min-h-[440px] sm:min-h-[540px] lg:min-h-full shadow-xl bg-neutral-900 group">
            <Image
              src="/whychooseus/sourced from origin.avif"
              alt="Fresh farm produce sourced from origin"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Floating Bottom Badge matching Screenshot */}
            <div className="absolute bottom-6 left-6 right-6 text-center bg-black/40 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white">
              <span className="font-mono text-xs font-bold uppercase tracking-wider block text-[#D4F056]">
                01-03
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide block mt-0.5">
                EVERY SHIPMENT HANDLED WITH INTEGRITY
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
