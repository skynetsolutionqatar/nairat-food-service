'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Sprout, ShieldCheck, MapPin, Award } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';

const localProduceHighlights = [
  { name: 'Cucumbers', period: 'Peak Nov – May', note: 'Greenhouse crisp harvest' },
  { name: 'Tomatoes', period: 'Peak Dec – May', note: 'Vine-ripened local varieties' },
  { name: 'Sweet Peppers', period: 'Peak Dec – Apr', note: 'Bell & colored blocky peppers' },
  { name: 'Leafy Herbs', period: 'Year-Round', note: 'Mint, coriander, parsley & rocca' },
];

export function PartnerLocalAgriculture(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        '.local-anim-header',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
      )
        .fromTo(
          '.local-mahaseel-card',
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' },
          '-=0.35'
        )
        .fromTo(
          '.local-feature-pill',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          '-=0.3'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="local-agriculture"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-[#F4F8F5] text-[#111814] border-y border-[#E3EBE5]/70"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* Section Header: 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="local-anim-header lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <Image
                src="/icon/icon.png"
                alt=""
                width={32}
                height={16}
                className="h-4 w-auto object-contain"
                aria-hidden="true"
              />
              <span className="font-display type-eyebrow text-[#168849] block">
                LOCAL AGRICULTURAL PARTNERSHIP
              </span>
            </div>

            <h2 className="font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]">
              Empowering Qatari Farms: <br />
              <span className="text-[#168849]">Strategic Partnership with Mahaseel.</span>
            </h2>
          </div>

          <div className="local-anim-header lg:col-span-5 flex flex-col items-start lg:items-end">
            <p className="font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]">
              In close collaboration with Mahaseel, Nairat connects local Qatari farmers to premier supermarket shelves—championing national food security and delivering freshly harvested homegrown produce to consumers within hours of picking.
            </p>
          </div>
        </div>

        {/* Highlight Grid: Mahaseel Feature Card + Produce Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Mahaseel Partnership Showcase Card (5 cols) */}
          <div className="local-mahaseel-card lg:col-span-5">
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="relative h-12 w-36">
                  <Image
                    src="/partners/mahaseel.png"
                    alt="Mahaseel Agricultural Services Company Qatar"
                    fill
                    className="object-contain"
                    sizes="150px"
                  />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#168849]/10 text-[#168849] text-xs font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  <span>National Partner</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-bold text-xl text-[#111814]">
                  Connecting Local Harvests to Qatar&apos;s Retail Tables
                </h3>
                <p className="font-sans text-xs sm:text-[13px] text-[#6B7280] leading-[1.6]">
                  Mahaseel facilitates commercial marketing for Qatari agricultural producers. Nairat provides the critical cold-chain distribution network that moves bulk farm yields into commercial hypermarkets and retail outlets throughout Doha and regional towns.
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-[#111814] font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#168849]" />
                  <span>Qatari Greenhouses &amp; Open Farms</span>
                </div>
                <span className="font-mono text-[#168849] font-bold">100% Local</span>
              </div>
            </div>
          </div>

          {/* Right: Local Agricultural Benefits & Produce Matrix (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="local-feature-pill p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#168849]/10 flex items-center justify-center text-[#168849]">
                  <Sprout className="w-5 h-5" />
                </div>
                <h4 className="font-display font-semibold text-base text-[#111814]">
                  National Food Security
                </h4>
                <p className="font-sans text-xs text-[#6B7280] leading-[1.55]">
                  Strengthening Qatar&apos;s self-sufficiency by ensuring local farm output receives prime visibility and prompt distribution across high-volume retail.
                </p>
              </div>

              <div className="local-feature-pill p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#168849]/10 flex items-center justify-center text-[#168849]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-display font-semibold text-base text-[#111814]">
                  Same-Day Freshness
                </h4>
                <p className="font-sans text-xs text-[#6B7280] leading-[1.55]">
                  Crops harvested in Al Khor, Al Shamal, and Al Shahaniya are collected, inspected, and delivered to supermarkets on the very same day.
                </p>
              </div>
            </div>

            {/* Local Seasonal Produce Strip */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs font-bold uppercase tracking-wider text-[#168849]">
                  Homegrown Seasonal Supply Lines
                </span>
                <span className="text-[11px] font-mono text-[#6B7280]">
                  Winter &amp; Spring Peak
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {localProduceHighlights.map((item) => (
                  <div key={item.name} className="p-3 rounded-xl bg-[#F8FAF8] border border-neutral-100 space-y-1">
                    <span className="font-display font-semibold text-xs sm:text-sm text-[#111814] block">
                      {item.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#168849] font-medium block">
                      {item.period}
                    </span>
                    <span className="text-[10px] text-[#6B7280] block">
                      {item.note}
                    </span>
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
