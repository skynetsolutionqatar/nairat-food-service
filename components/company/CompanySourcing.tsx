'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function CompanySourcing(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      timeline
        .fromTo(
          '.sourcing-header-item',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
        )
        .fromTo(
          '.sourcing-card-item',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=0.3'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="sourcing"
      ref={sectionRef}
      className="scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Title & Narrative (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <h2 className="sourcing-header-item font-display text-3xl sm:text-4xl lg:text-[40px] font-semibold tracking-[-0.035em] leading-[1.15] text-[#111814]">
              Strategic Sourcing: <br />
              <span className="text-[#168849]">From Global Orchards</span> <br />
              to Qatar.
            </h2>

            <div className="sourcing-header-item space-y-3.5 text-base text-[#47554E] leading-relaxed">
              <p>
                Fresh produce is seasonal. Our supply needs to be dependable. Nairat works directly with growers and suppliers across major producing regions around the world.
              </p>
              <p>
                Our sourcing network spans the Levant, Gulf, Africa, Asia and beyond, allowing us to plan supply according to seasonal availability and market demand.
              </p>
              <p>
                By sourcing from multiple regions simultaneously, we maintain greater consistency in product quality, variety, and availability throughout the entire year.
              </p>
            </div>
          </div>

          {/* Right Column: Stacked Sourcing Cards with Yellow Badges (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Card 1: Multi-Region Network */}
            <div className="sourcing-card-item p-6 sm:p-7 rounded-2xl bg-[#F8FAF8] border border-neutral-200/80 shadow-2xs space-y-3">
              <div className="inline-block">
                <span className="px-3 py-1 rounded-md bg-[#FDE047] text-[#111814] font-display text-xs font-bold uppercase tracking-wider">
                  Diversified Sourcing
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-[#111814]">
                The Levant, Gulf, Africa &amp; Asia
              </h3>
              <p className="font-sans text-sm text-[#47554E] leading-relaxed">
                Direct relationships with verified growers across Jordan, Lebanon, Syria, Saudi Arabia, Egypt, South Africa, Turkey, and India ensure uninterrupted arrivals of citrus, stone fruits, leafy greens, root vegetables, and exotic culinary lines.
              </p>
            </div>

            {/* Card 2: Point of Entry Inspection */}
            <div className="sourcing-card-item p-6 sm:p-7 rounded-2xl bg-[#F8FAF8] border border-neutral-200/80 shadow-2xs space-y-3">
              <div className="inline-block">
                <span className="px-3 py-1 rounded-md bg-[#FDE047] text-[#111814] font-display text-xs font-bold uppercase tracking-wider">
                  Abu Samra Border &amp; QA
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-[#111814]">
                Border Quarantine &amp; Origin Inspection
              </h3>
              <p className="font-sans text-sm text-[#47554E] leading-relaxed">
                Our procurement teams inspect consignments at origin and maintain active quality verification at key entry points, including overland QA inspection at the Abu Samra land border, before cargo enters our temperature-controlled warehouse in Doha.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
