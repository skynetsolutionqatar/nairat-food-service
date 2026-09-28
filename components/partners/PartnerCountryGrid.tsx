'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Lock } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

interface CountryPartner {
  name: string;
  flag: string;
  crops?: string;
}

const countryPartners: CountryPartner[] = [
  {
    name: 'Jordan',
    flag: '/flags/jordan.svg',
    crops: 'Tomatoes, cucumbers, bell peppers, stone fruits',
  },
  {
    name: 'Saudi Arabia',
    flag: '/flags/saudi-arabia.svg',
    crops: 'Premium dates, seasonal open-field crops, hydroponics',
  },
  {
    name: 'Lebanon',
    flag: '/flags/lebanon.svg',
    crops: 'Mountain apples, cherries, peaches, fresh herbs',
  },
  {
    name: 'Egypt',
    flag: '/flags/egypt.svg',
    crops: 'Valencia citrus, yellow onions, potatoes, garlic',
  },
  {
    name: 'South Africa',
    flag: '/flags/south-africa.svg',
    crops: 'Table grapes, navel citrus, lemons, stone fruits, pears',
  },
  {
    name: 'Iran',
    flag: '/flags/iran.svg',
    crops: 'Sweet watermelons, pomegranates, melons, pistachios',
  },
  {
    name: 'Syria',
    flag: '/flags/syria.svg',
    crops: 'Citrus, stone fruits, pomegranates, seasonal root crops',
  },
  {
    name: 'Global Origins',
    flag: '/cta/ctacontry.webp',
    crops: 'Specialty culinary lines from India, Turkey, and Europe',
  },
];

export function PartnerCountryGrid(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        '.country-header-item',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
      ).fromTo(
        '.country-grid-container',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.35'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="country-partners"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="country-header-item space-y-3">
          <SectionEyebrow title="GLOBAL SOURCING PARTNERSHIPS" />

          <h2 className="font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]">
            Long-Standing Partnerships with <br />
            <span className="text-[#168849]">Growers &amp; Export Houses</span>
          </h2>
        </div>

        {/* Country Logo / Flag Grid */}
        <div className="country-grid-container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {countryPartners.map((country) => {
            const isGlobalOrigins = country.name === 'Global Origins';

            return (
              <div
                key={country.name}
                className="country-flag-card group p-5 sm:p-6 rounded-2xl bg-[#F8FAF8] border border-neutral-200/90 shadow-2xs hover:shadow-md hover:border-[#168849]/50 hover:bg-white transition-all duration-300 flex flex-col items-center justify-center text-center space-y-3 min-h-[120px] sm:min-h-[135px]"
              >
                {/* Country Flag Logo */}
                <div
                  className={
                    isGlobalOrigins
                      ? 'relative w-28 h-10 sm:w-36 sm:h-12 flex items-center justify-center group-hover:scale-105 transition-transform duration-300'
                      : 'relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden shadow-xs border border-neutral-200 group-hover:scale-105 transition-transform duration-300 bg-neutral-100 flex items-center justify-center'
                  }
                >
                  <Image
                    src={country.flag}
                    alt={`${country.name} country flag logo`}
                    fill
                    sizes={isGlobalOrigins ? '160px' : '80px'}
                    className={isGlobalOrigins ? 'object-contain' : 'object-cover'}
                  />
                </div>

                <h3 className="font-display font-bold text-sm sm:text-base text-[#111814] group-hover:text-[#168849] transition-colors">
                  {country.name}
                </h3>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
