'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ScaleItem {
  value: string;
  label: string;
  description: string;
}

const scaleItems: ScaleItem[] = [
  {
    value: '200+',
    label: 'Team Members',
    description: 'Skilled logistics professionals, QA inspectors, and cold-storage operators.',
  },
  {
    value: '5,000 m²',
    label: 'Cold-Chain Warehouse',
    description: 'Purpose-built facility in Doha’s Industrial Area engineered for high-volume fresh handling.',
  },
  {
    value: '20',
    label: 'Dedicated Chiller Rooms',
    description: 'Custom temperature-controlled rooms, storing produce according to specific climate needs.',
  },
  {
    value: '40',
    label: 'Refrigerated Vehicles',
    description: 'Temperature-controlled fleet providing reliable daily distribution across all districts in Qatar.',
  },
  {
    value: '6',
    label: 'Loading-Dock Truck Doors',
    description: 'High-throughput receiving and dispatch bays minimizing produce exposure to ambient heat.',
  },
  {
    value: '400+',
    label: 'Product Lines',
    description: 'Diverse catalog spanning premium fresh fruits, vegetables, and specialty lines.',
  },
];

export function CompanyInfrastructure(): React.ReactNode {
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
          '.infra-green-header',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out' }
        )
        .fromTo(
          '.infra-green-card',
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '.infra-green-item',
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
          '-=0.4'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="infrastructure"
      ref={sectionRef}
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24 bg-[#158647] text-white overflow-hidden"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* Top Header: Left Title | Right Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end border-b border-white/20 pb-8 sm:pb-10">
          <div className="lg:col-span-7">
            <h2 className="infra-green-header font-display type-h2 font-semibold text-white text-left leading-[1.12]">
              Built Around Freshness: <br />
              <span className="text-[#D4F056]">Infrastructure Designed for Scale</span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            <p className="infra-green-header font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-white/90 leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]">
              Our purpose-built cold-chain facility in Doha&apos;s Industrial Area forms the heart of our distribution operation. With dedicated chiller rooms, efficient loading infrastructure and refrigerated transportation, our facility is designed to move fresh produce quickly and safely from arrival to delivery.
            </p>
          </div>
        </div>

        {/* Bottom Content: Left Photo | Right Stacked Scale Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Big Warehouse Photo Card */}
          <div className="infra-green-card lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[4/3] sm:aspect-[4/4] lg:aspect-[4/5]">
              <Image
                src="/whychooseus/chiller warehouse.avif"
                alt="Nairat Food Cold Storage Chiller Warehouse Facility"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/50 backdrop-blur-md text-white text-xs space-y-1">
                <span className="font-semibold text-[#D4F056] block uppercase tracking-wider">
                  Industrial Area Hub · Doha
                </span>
                <span className="text-white/80 block">
                  Unbroken cold-chain infrastructure operating 24/7 across Qatar.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Vertical Stack of 6 Scale Items */}
          <div className="lg:col-span-7 space-y-5">
            {scaleItems.map((item) => (
              <div
                key={item.label}
                className="infra-green-item pb-4 border-b border-white/15 last:border-b-0 last:pb-0 space-y-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#D4F056]">
                    {item.value}
                  </span>
                  <span className="font-display text-base sm:text-lg font-semibold text-white">
                    {item.label}
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
