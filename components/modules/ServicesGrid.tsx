'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    number: '01',
    title: 'Farm Gate Sourcing',
    desc: 'Direct partnerships with certified growers in Jordan, Egypt, India, and South Africa ensuring grade-A fruit & veg.',
    image: '/services/grower and exporter.avif',
  },
  {
    number: '02',
    title: 'Multi-Zone Chilled Storage',
    desc: '20 dedicated climate zones engineered for precise humidity and temperature profiles from intake to dispatch.',
    image: '/whychooseus/chiller warehouse.avif',
  },
  {
    number: '03',
    title: 'Custom Sorting & Packing',
    desc: 'Strict quality grading, retail barcode labeling, and customized packing for hypermarkets and grocers.',
    image: '/whychooseus/temperature conrolled.avif',
  },
  {
    number: '04',
    title: 'Scheduled Store Replenishment',
    desc: '40 temperature-controlled refrigerated vehicles delivering fresh produce across Qatar on precise timetables.',
    image: '/whychooseus/truck.avif',
  },
];

export function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        '.services-header-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      ).fromTo(
        '.service-pill-card',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
        '-=0.3'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-16 sm:py-24 bg-white text-[#111814] px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Header: Centered */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="services-header-item text-[11px] font-bold uppercase tracking-widest text-[#168849] block">
            OUR SERVICES
          </span>
          <h2 className="services-header-item font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111814] leading-[1.2]">
            Services Designed <br />
            To Keep Your Business Thriving
          </h2>
        </div>

        {/* 4-Card Visual Grid with Top Number Badges matching Screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((item) => (
            <div
              key={item.number}
              className="service-pill-card group relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-md flex flex-col justify-between p-6 bg-neutral-900 cursor-pointer"
            >
              {/* Background Image with Hover Zoom */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Dark Gradient Overlay for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 group-hover:from-black/90 transition-all duration-300 pointer-events-none" />

              {/* Top Circular Number Badge */}
              <div className="relative z-10 self-center">
                <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[#D4F056] font-mono text-xs font-bold flex items-center justify-center shadow-md">
                  {item.number}
                </div>
              </div>

              {/* Bottom Text Details */}
              <div className="relative z-10 text-center space-y-2">
                <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-normal line-clamp-3">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
