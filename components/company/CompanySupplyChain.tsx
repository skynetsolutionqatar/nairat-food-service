'use client';

import React, { useRef } from 'react';
import { Route, Sprout, SearchCheck, Snowflake, Truck, ArrowRight } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';

interface SupplyStep {
  step: string;
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: SupplyStep[] = [
  {
    step: '01',
    label: 'Source',
    title: 'Grower Engagement',
    description: 'We establish relationships with trusted growers and suppliers across global producing regions.',
    icon: <Sprout className="w-6 h-6 text-[#168849]" aria-hidden="true" />,
  },
  {
    step: '02',
    label: 'Inspect',
    title: 'Quality Verification',
    description: 'Our teams inspect consignments at origin and upon arrival to maintain quality standards.',
    icon: <SearchCheck className="w-6 h-6 text-[#168849]" aria-hidden="true" />,
  },
  {
    step: '03',
    label: 'Protect',
    title: 'Cold-Chain Integrity',
    description: 'Produce is handled through controlled cold-chain facilities and refrigerated transportation.',
    icon: <Snowflake className="w-6 h-6 text-[#168849]" aria-hidden="true" />,
  },
  {
    step: '04',
    label: 'Deliver',
    title: 'Nationwide Delivery',
    description: 'Our distribution network delivers fresh produce reliably to customers across Qatar.',
    icon: <Truck className="w-6 h-6 text-[#168849]" aria-hidden="true" />,
  },
];

export function CompanySupplyChain(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      timeline
        .fromTo(
          '.supply-header-item',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
        )
        .fromTo(
          '.supply-step-card',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out' },
          '-=0.3'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="supply-chain"
      ref={sectionRef}
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="supply-header-item flex items-center gap-2">
            <Route className="w-4 h-4 text-[#168849]" aria-hidden="true" />
            <span className="font-display type-eyebrow text-[#168849] block">
              Our Supply Chain
            </span>
          </div>

          <h2 className="supply-header-item font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]">
            From source to shelf.
          </h2>

          <p className="supply-header-item font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6]">
            Every shipment follows an unbroken, auditable protocol ensuring that freshness, nutrition, and appearance are preserved from the moment of harvest until final delivery.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((stepItem, index) => (
            <div
              key={stepItem.step}
              className="supply-step-card group bg-[#F8FAF8] p-7 rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-xl hover:border-[#168849]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#168849]/10 text-[#168849]">
                    STEP {stepItem.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {stepItem.icon}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#72807A]">
                    {stepItem.label}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[#111814] tracking-tight">
                    {stepItem.title}
                  </h3>
                </div>

                <p className="font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55]">
                  {stepItem.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block pt-4 mt-4 border-t border-neutral-200/60 text-right">
                  <span className="text-[11px] font-semibold text-[#168849] inline-flex items-center gap-1">
                    <span>Next Phase</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
