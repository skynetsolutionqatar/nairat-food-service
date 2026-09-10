'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Globe, Lock, CheckCircle2 } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';

interface SourcingRegion {
  country: string;
  region: string;
  produce: string;
  transit: string;
}

const sourcingRegions: SourcingRegion[] = [
  {
    country: 'Jordan',
    region: 'Jordan Valley & Highlands',
    produce: 'Vine tomatoes, cucumbers, bell peppers, stone fruits',
    transit: 'Overland reefer via Abu Samra border',
  },
  {
    country: 'Saudi Arabia',
    region: 'Al Qassim & Eastern Province',
    produce: 'Premium dates, seasonal open-field crops, hydroponics',
    transit: 'Direct GCC reefer land corridor',
  },
  {
    country: 'Lebanon',
    region: 'Bekaa Valley & Mount Lebanon',
    produce: 'Mountain apples, cherries, peaches, fresh herbs',
    transit: 'Air cargo & refrigerated maritime lines',
  },
  {
    country: 'Egypt',
    region: 'Nile Delta & Desert Corridors',
    produce: 'Valencia citrus, yellow onions, table potatoes, garlic',
    transit: 'Direct sea freight into Hamad Port',
  },
  {
    country: 'South Africa',
    region: 'Western Cape & Limpopo',
    produce: 'Navel oranges, table grapes, lemons, stone fruits, pears',
    transit: 'Deep-sea controlled atmosphere containers',
  },
  {
    country: 'Iran',
    region: 'Southern & Central Basins',
    produce: 'Sweet watermelons, pomegranates, melons, pistachios',
    transit: 'Fast maritime reefer transit across the Gulf',
  },
  {
    country: 'Syria',
    region: 'Coastal & Southern Belts',
    produce: 'Citrus, stone fruits, pomegranates, seasonal root crops',
    transit: 'Scheduled overland and sea routes',
  },
  {
    country: 'Global Origins',
    region: 'India, Turkey, Europe & Beyond',
    produce: 'Exotic tropicals, culinary herbs, greenhouse specialties',
    transit: 'Regular air-cargo charter & container arrivals',
  },
];

export function PartnerGlobalGrowers(): React.ReactNode {
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
        '.global-anim-header',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
      )
        .fromTo(
          '.global-region-card',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.global-confidentiality-note',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.2'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="global-sourcing"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* Section Header */}
        <div className="global-anim-header space-y-3">
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
              GLOBAL SOURCING ALLIANCES
            </span>
          </div>

          <h2 className="font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]">
            Long-Standing Partnerships with <br />
            <span className="text-[#168849]">Growers &amp; Export Houses.</span>
          </h2>
        </div>

        {/* 8 Sourcing Regions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {sourcingRegions.map((item) => (
            <div
              key={item.country}
              className="global-region-card group p-5 rounded-2xl bg-[#F8FAF8] border border-neutral-200/80 shadow-2xs hover:shadow-md hover:border-[#168849]/40 hover:bg-white transition-all duration-300 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-lg text-[#111814] group-hover:text-[#168849] transition-colors">
                    {item.country}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#168849]/10 flex items-center justify-center">
                    <Globe className="w-3.5 h-3.5 text-[#168849]" />
                  </div>
                </div>

                <span className="font-mono text-[11px] font-semibold text-[#168849] block">
                  {item.region}
                </span>

                <p className="font-sans text-xs text-[#6B7280] leading-[1.5]">
                  {item.produce}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                <CheckCircle2 className="w-3 h-3 text-[#168849] shrink-0" />
                <span className="truncate">{item.transit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Confidentiality & Trade Ethics Box */}
        <div className="global-confidentiality-note p-5 sm:p-6 rounded-2xl bg-[#F4F8F5] border border-[#168849]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#168849]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Lock className="w-4 h-4 text-[#168849]" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-[#111814]">
                Commercial Confidentiality &amp; Ethical Grower Partnerships
              </h4>
              <p className="font-sans text-xs text-[#6B7280] leading-[1.55] mt-0.5">
                In compliance with commercial partner agreements, individual grower and exporter names remain confidential while maintaining transparent geographical origin and batch-level traceability for food-safety inspection.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-[#168849] font-bold bg-white px-3 py-1.5 rounded-lg border border-[#168849]/20">
            <span>Direct Consignment &amp; Trade</span>
          </div>
        </div>
      </div>
    </section>
  );
}
