'use client';

import React, { useRef } from 'react';
import { Globe2, Calendar, Sun, Snowflake, Leaf, Flower2, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SeasonalQuarter {
  season: string;
  months: string;
  icon: React.ReactNode;
  origins: string[];
  focusProduce: string;
}

const seasonalQuarters: SeasonalQuarter[] = [
  {
    season: 'Q1 · Winter Peak',
    months: 'January – March',
    icon: <Snowflake className="w-5 h-5 text-sky-600" />,
    origins: ['Mediterranean', 'Egypt', 'Local Qatar Farms', 'South Africa'],
    focusProduce: 'Citrus, stone fruits (Southern Hemisphere), local tomatoes, cucumbers, peppers, and field greens.',
  },
  {
    season: 'Q2 · Spring Transition',
    months: 'April – June',
    icon: <Flower2 className="w-5 h-5 text-emerald-600" />,
    origins: ['Spain', 'Morocco', 'Jordan', 'India', 'Kenya'],
    focusProduce: 'Watermelons, early stone fruits, avocados, mangoes, herbs, and gourmet asparagus.',
  },
  {
    season: 'Q3 · Summer Harvest',
    months: 'July – September',
    icon: <Sun className="w-5 h-5 text-amber-500" />,
    origins: ['Southern Europe', 'Turkey', 'Pakistan', 'South America'],
    focusProduce: 'Melons, grapes, cherries, tropical fruits, and chilled-container root crops.',
  },
  {
    season: 'Q4 · Autumn Bounty',
    months: 'October – December',
    icon: <Leaf className="w-5 h-5 text-amber-700" />,
    origins: ['Europe', 'East Africa', 'Lebanon', 'Local Qatar Re-start'],
    focusProduce: 'Apples, pears, pomegranates, persimmons, brassicas, and winter salad leaves.',
  },
];

export function QualitySeasonalSourcing(): React.ReactNode {
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
        '.sourcing-header-item',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
      )
      .fromTo(
        '.sourcing-quarter-card',
        { opacity: 0, y: 28, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
        '-=0.35'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="seasonal-strategy"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-22 bg-[#F8FAF8] text-[#111814] border-t border-neutral-200/80"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Grid: Full-Width 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="lg:col-span-7 space-y-3">
            <span className="sourcing-header-item font-display type-eyebrow text-[#168849] block">
              GLOBAL SUPPLY PLANNING
            </span>
            <h2 className="sourcing-header-item font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]">
              Twelve Months a Year: <br />
              <span className="text-[#168849]">Seasonal Sourcing Across Origins</span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            <p className="sourcing-header-item font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]">
              Produce availability naturally shifts with the seasons. Our buyers proactively plan supply across complementary growing zones and hemispheres, guaranteeing reliable volume, stable pricing, and peak freshness every week of the year.
            </p>
          </div>
        </div>

        {/* 4 Quarters Seasonal Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalQuarters.map((quarter) => (
            <div
              key={quarter.season}
              className="sourcing-quarter-card rounded-3xl bg-white border border-neutral-200/90 p-6 flex flex-col justify-between space-y-5 shadow-2xs hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                    {quarter.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#168849] bg-[#168849]/10 px-2.5 py-1 rounded-md">
                    {quarter.months}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-semibold text-lg text-[#111814]">
                    {quarter.season}
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-[#6B7280] leading-[1.55]">
                    {quarter.focusProduce}
                  </p>
                </div>
              </div>

              {/* Origins Tag List */}
              <div className="pt-3 border-t border-neutral-100 space-y-2">
                <span className="text-xs uppercase font-mono font-semibold text-[#6B7280] block">
                  Active Origins
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quarter.origins.map((origin) => (
                    <span
                      key={origin}
                      className="px-2 py-0.5 rounded-md bg-neutral-100 text-[#111814] text-xs font-medium"
                    >
                      {origin}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Procurement Assurance Banner */}
        <div className="sourcing-quarter-card rounded-2xl bg-[#168849] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="font-display text-xl sm:text-2xl font-bold">
              Looking for a Dependable Year-Round Fresh Partner?
            </h3>
            <p className="font-sans text-sm text-white/90 max-w-xl">
              From daily retail store delivery to large-scale hotel contracts, Nairat eliminates seasonal gaps with managed global contracts.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-6 py-3 rounded-full bg-white text-[#168849] hover:bg-[#D4F056] hover:text-[#111814] font-sans text-sm font-semibold transition-colors duration-300 shadow-sm"
          >
            Inquire for Contract Supply
          </a>
        </div>
      </div>
    </section>
  );
}
