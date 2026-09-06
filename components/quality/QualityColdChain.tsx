'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { DoorClosed, Building2, ThermometerSnowflake, RefreshCw, Truck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface InfrastructurePillar {
  id: string;
  metric: string;
  unit?: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl?: string;
}

const pillars: InfrastructurePillar[] = [
  {
    id: 'loading-docks',
    metric: '6',
    unit: 'Doors',
    title: 'Loading Dock Truck Doors',
    description:
      'Pneumatically sealed loading bays designed to enclose refrigerated reefer containers immediately, preventing thermal shock from Qatar’s outdoor climate.',
    icon: <DoorClosed className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
  },
  {
    id: 'warehouse',
    metric: '5,000',
    unit: 'm²',
    title: 'Cold-Chain Warehouse',
    description:
      'A purpose-built logistics facility in Doha’s Industrial Area engineered for high-volume fresh produce intake, systematic grading, and continuous dispatch.',
    icon: <Building2 className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    imageUrl: '/whychooseus/warehouse.avif',
  },
  {
    id: 'chiller-rooms',
    metric: '20',
    unit: 'Chambers',
    title: 'Dedicated Chiller Rooms',
    description:
      'Independently regulated temperature and humidity zones customized specifically for each produce type—from delicate berries (0–2°C) to subtropical fruits.',
    icon: <ThermometerSnowflake className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    imageUrl: '/whychooseus/chiller warehouse.avif',
  },
  {
    id: 'fifo-rotation',
    metric: '100%',
    unit: 'FIFO',
    title: 'Strict FIFO Inventory Rotation',
    description:
      'Produce is strictly rotated First-In, First-Out using barcode traceability, ensuring optimal freshness, rapid inventory turnover, and zero batch stagnation.',
    icon: <RefreshCw className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
  },
  {
    id: 'refrigerated-fleet',
    metric: '40',
    unit: 'Vehicles',
    title: 'Refrigerated Fleet Delivery',
    description:
      'Active temperature-controlled transport vehicles with continuous GPS and thermal monitoring, delivering fresh produce store-by-store across Qatar daily.',
    icon: <Truck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    imageUrl: '/whychooseus/truck.avif',
  },
];

export function QualityColdChain(): React.ReactNode {
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
        '.coldchain-header-item',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
      )
      .fromTo(
        '.coldchain-card',
        { opacity: 0, y: 28, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
        '-=0.35'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="infrastructure"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-22 bg-[#F4F6F5] text-[#111814] border-y border-neutral-200/80"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header: Full-Width 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="lg:col-span-7 space-y-3">
            <span className="coldchain-header-item font-display type-eyebrow text-[#168849] block">
              UNBROKEN COLD-CHAIN LOGISTICS
            </span>
            <h2 className="coldchain-header-item font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]">
              Engineered for Freshness: <br />
              <span className="text-[#168849]">Intake, Climate Control &amp; Dispatch</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            <p className="coldchain-header-item font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]">
              From the moment containers pull up to our loading bays until goods reach supermarket shelves, our infrastructure is built to protect the cold chain without interruption.
            </p>
          </div>
        </div>

        {/* 5 Infrastructure Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="coldchain-card rounded-3xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col justify-between"
            >
              {pillar.imageUrl && (
                <div className="relative aspect-[16/9] w-full bg-neutral-100 overflow-hidden">
                  <Image
                    src={pillar.imageUrl}
                    alt={pillar.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#168849]/10 flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#168849]">
                      {pillar.metric} <span className="text-xs uppercase font-sans text-[#6B7280] font-medium">{pillar.unit}</span>
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-lg sm:text-xl 2xl:text-2xl text-[#111814] tracking-[-0.015em] leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55]">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
