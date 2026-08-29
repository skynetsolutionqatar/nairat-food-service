'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const retailFeatures = [
  'Daily morning store delivery (Doha & Suburbs)',
  'Custom retail barcode labeling & carton packing',
  'Strict grade-A sorting and quality quarantine',
  'Flexible volume adjustments & emergency replenishment',
  'Full temperature logs & HACCP compliance certificates',
];

const wholesaleFeatures = [
  'Direct multi-pallet cross-docking at Central Market',
  'Scheduled air-freight exotic berries & herbs',
  'Dedicated 24/7 commercial produce desk manager',
  'Priority port intake & expedited MOPH clearance',
  'Long-term fixed seasonal contracts & spot pricing',
];

export function CommercialPrograms() {
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
        '.pricing-header-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      ).fromTo(
        '.pricing-plan-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="programs"
      ref={containerRef}
      className="py-16 sm:py-24 bg-white text-[#111814] px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-16">
        
        {/* Header: Centered */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="pricing-header-item text-[11px] font-bold uppercase tracking-widest text-[#168849] block">
            PRICING &amp; PROGRAMS
          </span>
          <h2 className="pricing-header-item font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111814] leading-[1.2]">
            Commercial Supply Programs
          </h2>
          <p className="pricing-header-item text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
            Whether you need a one-time seasonal order or continuous retail replenishment, our commercial terms are clear, flexible, and transparent.
          </p>
        </div>

        {/* Dual Cards matching Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Retail Plan (Clean White Card) */}
          <div className="pricing-plan-card bg-[#F6F8F5] border border-neutral-200 rounded-3xl p-8 sm:p-12 flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-5">
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#111814]">
                    Retail &amp; Supermarkets
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Perfect for grocers &amp; supermarket branches
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#111814]">
                    Custom
                  </span>
                  <span className="text-[11px] text-neutral-500 block">/ Volume Rate</span>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3.5">
                {retailFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#168849] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <a
                href="#contact"
                className="w-full bg-[#168849] hover:bg-[#12753e] text-white font-sans text-xs sm:text-sm font-bold py-3.5 rounded-full transition-all duration-300 shadow-md text-center block"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Card 2: Wholesale & Hospitality Contract (Deep Dark Forest Green Card) */}
          <div className="pricing-plan-card bg-[#0A2618] border border-white/10 rounded-3xl p-8 sm:p-12 text-white flex flex-col justify-between space-y-8 shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/15 pb-5">
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    Wholesale &amp; Hospitality
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    For luxury dining, catering &amp; central merchants
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    Volume
                  </span>
                  <span className="text-[11px] text-white/60 block">/ Contract Rate</span>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3.5">
                {wholesaleFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#D4F056] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <a
                href="#contact"
                className="w-full bg-white hover:bg-neutral-100 text-[#0A2618] font-sans text-xs sm:text-sm font-bold py-3.5 rounded-full transition-all duration-300 shadow-sm text-center block"
              >
                Inquire Contract Terms
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Custom Inquiry Box */}
        <div className="bg-[#F6F8F5] border border-neutral-200/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-display font-bold text-base text-[#111814]">
              Need a Custom Supply Plan?
            </h4>
            <p className="text-xs text-neutral-500 mt-0.5">
              We&apos;ll tailor our refrigerated logistics to match your store size, schedule, and volume needs.
            </p>
          </div>
          <a
            href="https://wa.me/97431043814"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#168849] hover:underline shrink-0"
          >
            <span>Talk to Logistics Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
