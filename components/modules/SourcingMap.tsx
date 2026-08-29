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
  { id: 'uae', location: [25.2048, 55.2708], label: 'UAE Hub' },
  { id: 'saudi', location: [24.7136, 46.6753], label: 'Saudi Arabia' },
  { id: 'jordan', location: [31.9539, 35.9106], label: 'Jordan' },
  { id: 'egypt', location: [30.0444, 31.2357], label: 'Egypt' },
  { id: 'turkey', location: [39.9334, 32.8597], label: 'Turkey' },
  { id: 'india', location: [20.5937, 78.9629], label: 'India' },
  { id: 'southafrica', location: [-30.5595, 22.9375], label: 'South Africa' },
  { id: 'lebanon', location: [33.8938, 35.5018], label: 'Lebanon' },
];

const globeArcs: Arc[] = [
  { id: 'india-uae', from: [20.5937, 78.9629], to: [25.2048, 55.2708], label: 'India → Gulf' },
  { id: 'egypt-uae', from: [30.0444, 31.2357], to: [25.2048, 55.2708], label: 'Egypt → Gulf' },
  { id: 'turkey-uae', from: [39.9334, 32.8597], to: [25.2048, 55.2708], label: 'Turkey → Gulf' },
  { id: 'jordan-uae', from: [31.9539, 35.9106], to: [25.2048, 55.2708], label: 'Jordan → Gulf' },
];

export function SourcingMap(): React.ReactNode {
  return (
    <section id="quality" className="py-10 sm:py-12 bg-white text-neutral-900 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
          {/* Left Column: Interactive 3D Cobe Globe (40% / 5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full max-w-md mx-auto lg:max-w-none">
            <div className="w-full aspect-square max-w-[420px]">
              <Globe
                markers={globeMarkers}
                arcs={globeArcs}
                markerColor={[0.22, 0.66, 0.31]}
                baseColor={[0.95, 0.96, 0.95]}
                arcColor={[0.22, 0.66, 0.31]}
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
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#168849]" aria-hidden="true" />
              <span className="font-sans text-xs font-extrabold uppercase tracking-widest text-[#168849]">
                SOURCING COUNTRIES
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
              Sourced From Around <br />
              the World.
            </h2>

            {/* Country Pill Badges Grid */}
            <div className="flex flex-wrap gap-2.5 pt-2 max-w-2xl">
              {sourcingCountries.map((countryName) => (
                <span
                  key={countryName}
                  className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full border border-neutral-200 bg-neutral-50/80 text-neutral-600 shadow-2xs  transition-colors duration-200 hover:bg-[#168849] hover:text-white cursor-pointer"
                >
                  {countryName}
                </span>
              ))}

              <span className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-wider px-6 py-2.5 rounded-full bg-[#168849] text-white shadow-md shadow-[#38A84E]/20">
                AND BEYOND
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
