'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, ShieldCheck, Sprout, ArrowRight, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: <Globe className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    title: 'Global Network',
    description: 'Trusted partners across 30+ countries',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    title: 'Quality First',
    description: 'Strict inspection at every stage',
  },
  {
    icon: <Sprout className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    title: 'Sustainable Sourcing',
    description: 'Supporting responsible farming practices',
  },
];

export function QualitySourcingPhilosophy(): React.ReactNode {
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
        '.philosophy-anim-left',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
      ).fromTo(
        '.philosophy-anim-right',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.35'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Narrative & 3 Value Pillars (5 cols) */}
          <div className="philosophy-anim-left lg:col-span-5 space-y-6">
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
                OUR SOURCING PHILOSOPHY
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111814] leading-[1.14] tracking-tight">
              Fresh Produce, <br className="hidden sm:inline" />
              Sourced Responsibly.
            </h2>

            <p className="font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6]">
              We work with trusted growers and suppliers across the world, combining strong global partnerships with local expertise to bring the best fresh produce to Qatar.
            </p>

            {/* 3 Pillars Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-neutral-100">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="space-y-2">
                  <div className="w-10 h-10 rounded-full border border-[#168849]/30 bg-[#168849]/5 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xs sm:text-[13px] text-[#111814] leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-[11px] text-[#6B7280] leading-[1.4] mt-0.5">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sourcing From Around the World Feature Card (7 cols) */}
          <div className="philosophy-anim-right lg:col-span-7">
            <div className="rounded-3xl bg-[#F4F8F5] p-5 sm:p-7 border border-[#E3EBE5] space-y-6 shadow-2xs">
              {/* Top Row: Cargo Ship Photo (Left) + Text & CTA (Right) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center">
                <div className="sm:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs">
                  <Image
                    src="/quality/cargo-ship.jpg"
                    alt="International Sourcing Cargo Container Ship"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 360px"
                  />
                </div>

                <div className="sm:col-span-6 space-y-3">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#111814] leading-snug">
                    Sourcing from <br />
                    Around the World
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-[#6B7280] leading-[1.6]">
                    We source fresh produce from leading growing regions across the Levant, Gulf, Africa, Asia and beyond, ensuring consistent supply and year-round availability.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="#supply-chain"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#168849] hover:bg-[#063B27] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all group cursor-pointer"
                    >
                      <span>Our Sourcing Regions</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Row: 3 Highlight Metrics */}
              <div className="pt-4 border-t border-[#E3EBE5] grid grid-cols-3 gap-3 sm:gap-4 items-center">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E3EBE5] flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-[#168849]" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-base sm:text-lg text-[#111814] block leading-none">
                      30+
                    </span>
                    <span className="text-[11px] text-[#6B7280] block mt-0.5">
                      Countries
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E3EBE5] flex items-center justify-center shrink-0">
                    <Sprout className="w-4 h-4 text-[#168849]" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-base sm:text-lg text-[#111814] block leading-none">
                      400+
                    </span>
                    <span className="text-[11px] text-[#6B7280] block mt-0.5">
                      Product Lines
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E3EBE5] flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-[#168849]" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm sm:text-base text-[#111814] block leading-none whitespace-nowrap">
                      Year-Round
                    </span>
                    <span className="text-[11px] text-[#6B7280] block mt-0.5">
                      Availability
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
