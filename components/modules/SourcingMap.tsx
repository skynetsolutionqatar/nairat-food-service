'use client';

import React from 'react';
import { Leaf } from 'lucide-react';
import { Globe, Marker, Arc } from '@/components/ui/cobe-globe';

const sourcingCountries: string[] = [
  'JORDAN',
  'SAUDI ARABIA',
  'SYRIA',
  'IRAN',
  'LEBANON',
  'EGYPT',
  'SOUTH AFRICA',
  'TURKEY',
  'INDIA',
];

const globeMarkers: Marker[] = [
  { id: 'uae', location: [25.2048, 55.2708], label: 'Qatar & Gulf Hub' },
  { id: 'saudi', location: [24.7136, 46.6753], label: 'Saudi Arabia' },
  { id: 'jordan', location: [31.9539, 35.9106], label: 'Jordan' },
  { id: 'egypt', location: [30.0444, 31.2357], label: 'Egypt' },
  { id: 'turkey', location: [39.9334, 32.8597], label: 'Turkey' },
  { id: 'india', location: [20.5937, 78.9629], label: 'India' },
  { id: 'southafrica', location: [-30.5595, 22.9375], label: 'South Africa' },
  { id: 'lebanon', location: [33.8938, 35.5018], label: 'Lebanon' },
];

const globeArcs: Arc[] = [
  { id: 'india-uae', from: [20.5937, 78.9629], to: [25.2048, 55.2708], label: 'India → Qatar' },
  { id: 'egypt-uae', from: [30.0444, 31.2357], to: [25.2048, 55.2708], label: 'Egypt → Qatar' },
  { id: 'turkey-uae', from: [39.9334, 32.8597], to: [25.2048, 55.2708], label: 'Turkey → Qatar' },
  { id: 'jordan-uae', from: [31.9539, 35.9106], to: [25.2048, 55.2708], label: 'Jordan → Qatar' },
];

export function SourcingMap(): React.ReactNode {
  return (
    <section id="sourcing" className="py-8 sm:py-10 2xl:py-14 bg-white text-neutral-900 overflow-hidden">
      <div className="max-w-[1440px] 2xl:max-w-[1620px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12 2xl:gap-16">
          {/* Left Column: Interactive 3D Cobe Globe (40% / 5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full max-w-md mx-auto lg:max-w-none">
            <div className="w-full aspect-square max-w-[420px] 2xl:max-w-[480px]">
              <Globe
                markers={globeMarkers}
                arcs={globeArcs}
                markerColor={[0.086, 0.533, 0.286]}
                baseColor={[0.95, 0.96, 0.95]}
                arcColor={[0.086, 0.533, 0.286]}
                glowColor={[0.92, 0.95, 0.93]}
                dark={0}
                mapBrightness={8}
                markerSize={0.03}
                markerElevation={0.01}
                arcWidth={0.6}
                arcHeight={0.25}
                speed={0.008}
              />
            </div>
          </div>

          {/* Right Column: Sourcing Text & Country Pills (60% / 7 cols) */}
          <div className="lg:col-span-7 space-y-6 2xl:space-y-8">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#168849]" aria-hidden="true" />
              <span className="font-sans type-eyebrow text-[#168849]">
                SOURCING COUNTRIES
              </span>
            </div>

            <h2 className="font-display type-h2 font-medium text-[#111814] text-left">
              Sourced From Around <br />
              <span className="text-[#168849]">the World.</span>
            </h2>

            {/* Country Pill Badges Grid */}
            <div className="flex flex-wrap gap-2.5 2xl:gap-3.5 pt-2 max-w-2xl 2xl:max-w-3xl">
              {sourcingCountries.map((countryName) => (
                <span
                  key={countryName}
                  className="font-sans text-xs sm:text-[13px] 2xl:text-sm font-semibold uppercase tracking-[0.06em] px-4 sm:px-5 2xl:px-6 py-2 sm:py-2.5 2xl:py-3 rounded-full border border-neutral-200 bg-neutral-50 text-[#6B7280] shadow-2xs hover:bg-[#168849]/10 hover:border-[#168849]/40 hover:text-[#168849] transition-all duration-200 cursor-default"
                >
                  {countryName}
                </span>
              ))}

              <span className="font-sans text-xs sm:text-[13px] 2xl:text-sm font-semibold uppercase tracking-[0.06em] px-5 sm:px-6 2xl:px-7 py-2 sm:py-2.5 2xl:py-3 rounded-full bg-[#168849] text-white shadow-md shadow-[#168849]/20">
                AND BEYOND
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
