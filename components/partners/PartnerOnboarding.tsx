'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Ship, ShoppingBag, Sprout, ArrowRight } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { CtaButton } from '@/components/ui/CtaButton';

const tracks = [
  {
    icon: <Ship className="w-6 h-6 text-[#168849]" aria-hidden="true" />,
    role: 'Growers & Exporters',
    title: 'Access the Qatar Market',
    description:
      'Partner with Nairat for consignment or direct trade. We manage local port clearance, cold storage across 20 chiller rooms, retail marketing, and provide transparent settlement.',
    features: [
      'Port clearance & customs handling at Hamad Port & Abu Samra',
      '5,000 m² temperature-controlled warehousing',
      'Transparent market reporting & timely audit settlement',
    ],
    ctaText: 'Partner as an Exporter',
    href: '#contact',
  },
  {
    icon: <ShoppingBag className="w-6 h-6 text-[#168849]" aria-hidden="true" />,
    role: 'Supermarkets & Food Service',
    title: 'Dependable Daily Supply',
    description:
      'Ensure your shelves and commercial kitchens are stocked with market-fresh produce every morning. Benefit from store-level delivery and dedicated account management.',
    features: [
      'Daily scheduled store-level morning deliveries',
      'Custom grading, sorting, and private labeling',
      'Continuous 12-month supply across 400+ fresh lines',
    ],
    ctaText: 'Open a Retail Account',
    href: '#contact',
  },
  {
    icon: <Sprout className="w-6 h-6 text-[#168849]" aria-hidden="true" />,
    role: 'Local Qatari Farmers',
    title: 'Distribute Local Harvests',
    description:
      'Connect your farm harvest directly to Qatar’s primary retail outlets. We provide cold-chain collection, quality sorting, and premium placement across top supermarkets.',
    features: [
      'Direct farm-gate pickup & harvest aggregation',
      'Rapid same-day dispatch into retail hypermarkets',
      'Fair commercial terms supporting Qatari agriculture',
    ],
    ctaText: 'Collaborate as a Local Farm',
    href: '#contact',
  },
];

export function PartnerOnboarding(): React.ReactNode {
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
        '.onboard-anim-header',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
      ).fromTo(
        '.onboard-track-card',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.35'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="become-a-partner"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-[#F4F8F5] text-[#111814] border-t border-[#E3EBE5]/70"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* Section Header: 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="onboard-anim-header lg:col-span-7 space-y-3">
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
                BECOME A PARTNER
              </span>
            </div>

            <h2 className="font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]">
              Grow Your Reach with <br />
              <span className="text-[#168849]">Nairat Food Services.</span>
            </h2>
          </div>

          <div className="onboard-anim-header lg:col-span-5 flex flex-col items-start lg:items-end">
            <p className="font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]">
              Whether you are an international produce exporter, a commercial retail chain in Doha, or a local Qatari farmer, Nairat delivers the logistics, infrastructure, and commercial reach to expand your business.
            </p>
          </div>
        </div>

        {/* 3 Partnership Tracks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
          {tracks.map((track) => (
            <div
              key={track.role}
              className="onboard-track-card rounded-3xl bg-white p-7 sm:p-8 border border-neutral-200/90 shadow-2xs hover:shadow-md hover:border-[#168849]/40 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#168849]/10 border border-[#168849]/20 flex items-center justify-center">
                    {track.icon}
                  </div>
                  <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-[#168849]/10 text-[#168849]">
                    {track.role}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#111814] leading-snug">
                  {track.title}
                </h3>

                <p className="font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55]">
                  {track.description}
                </p>

                <ul className="space-y-2 pt-2 border-t border-neutral-100">
                  {track.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs text-[#6B7280] leading-[1.5]"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-[#168849] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <CtaButton
                  href={track.href}
                  text={track.ctaText}
                  variant="primary"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
