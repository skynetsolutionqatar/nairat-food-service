'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck, CheckCircle2, FlaskConical, SearchCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const inspectionSteps = [
  {
    title: 'Origin Pre-Shipment Inspection',
    description:
      'Rigorous quality grading, sizing, Brix sugar-content testing, and temperature verification conducted directly at certified partner packhouses before export clearance.',
    icon: <SearchCheck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
  },
  {
    title: 'Qatar Arrival Laboratory Testing',
    description:
      'Mandatory chemical residue analysis, microbiological safety screening, and sensory evaluations performed in full compliance with Qatar food-safety regulations.',
    icon: <FlaskConical className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
  },
  {
    title: 'Unbroken Temperature Verification',
    description:
      'Digital data loggers audited at receiving docks to ensure the cold chain was consistently maintained within specified microclimates throughout transit.',
    icon: <ShieldCheck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
  },
];

export function QualityHeroFeature(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      });

      tl.fromTo(
        '.quality-hero-text-item',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
      )
      .fromTo(
        '.quality-hero-image-card',
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        '.quality-inspection-step',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        '-=0.3'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-22 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Grid: Full-Width 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="lg:col-span-7 space-y-3">
            <span className="quality-hero-text-item font-display type-eyebrow text-[#168849] block">
              OUR QUALITY PHILOSOPHY
            </span>
            <h2 className="quality-hero-text-item font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]">
              Freshness is Logistics: <br />
              <span className="text-[#168849]">Inspected at Origin. Verified in Qatar.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            <p className="quality-hero-text-item font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]">
              Freshness isn&apos;t accidental—it is the result of disciplined, continuous logistics. Every carton is inspected at the grower packhouse and re-evaluated the moment it lands in Doha.
            </p>
          </div>
        </div>

        {/* Two-Column Feature Card: Visual on Left, Step Protocol on Right */}
        <div className="rounded-3xl border border-neutral-200/90 bg-[#F8FAF8] p-6 sm:p-8 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: High-Resolution QA Visual (5 cols) */}
            <div className="quality-hero-image-card lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[4/3.5] lg:aspect-[4/4] bg-neutral-200 shadow-md">
                <Image
                  src="/whychooseus/temperature conrolled.avif"
                  alt="Nairat Produce QA Inspection and Temperature Controlled Laboratory"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

                {/* Floating Laboratory Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-3.5 py-2 rounded-xl bg-black/65 backdrop-blur-md text-white text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4F056]" />
                    <span>Qatar Food Safety Verified</span>
                  </div>
                  <span className="text-[#D4F056] font-mono">100% Lab Tested</span>
                </div>
              </div>
            </div>

            {/* Right: Inspection & Laboratory Steps (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h3 className="font-display font-semibold text-lg sm:text-xl 2xl:text-2xl text-[#111814] tracking-[-0.015em] leading-snug">
                  Dual-Tier Quality Assurance Workflow
                </h3>
                <p className="font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55]">
                  Laboratory testing is carried out on arriving consignments in strict accordance with Qatar national food-safety requirements, eliminating risks before produce reaches supermarket shelves.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {inspectionSteps.map((step) => (
                  <div
                    key={step.title}
                    className="quality-inspection-step flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs hover:border-[#168849]/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#168849]/10 flex items-center justify-center shrink-0 mt-0.5">
                      {step.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-semibold text-base text-[#111814]">
                        {step.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
