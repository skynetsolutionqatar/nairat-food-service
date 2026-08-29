'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const metricCards = [
  {
    value: '1,200+',
    title: 'Transforming Stores',
    desc: 'Into daily fresh, thriving supermarket aisles across the country.',
  },
  {
    value: '20+',
    title: 'Chiller Specialists',
    desc: 'Dedicated multi-temperature cold storage zones since 2015.',
  },
  {
    value: '98%',
    title: 'Customer Satisfaction',
    desc: 'Trusted by hypermarkets and grocers for unbroken cold chain.',
  },
  {
    value: '50+',
    title: 'Partner Sourcing Areas',
    desc: 'Direct farm gate origin supply with international compliance.',
  },
];

export function AboutMetrics() {
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
        '.about-header-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      ).fromTo(
        '.about-stat-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
        '-=0.3'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-16 sm:py-24 bg-white text-[#111814] px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-16">
        
        {/* Top Header: Left Tag vs Right Big Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <span className="about-header-item text-[11px] font-bold uppercase tracking-widest text-[#168849] block">
              ABOUT US
            </span>
          </div>

          <div className="lg:col-span-9 space-y-4">
            <h2 className="about-header-item font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111814] leading-[1.3] max-w-4xl">
              Delivering farm-fresh produce across Qatar since 2015, with 160K+ completed deliveries. We take pride in delivering tailored solutions that match your space, style, and schedule.
            </h2>
            <p className="about-header-item text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-2xl font-normal">
              Every successful fresh supply begins with a thoughtful inspection. From origin packing house to dock clearance and store shelf, our team manages temperature integrity every step of the way.
            </p>
          </div>
        </div>

        {/* 4 Clean White Metric Cards in a Row matching Screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((card, idx) => (
            <div
              key={idx}
              className="about-stat-card bg-[#F6F8F5] border border-neutral-200/90 rounded-3xl p-7 flex flex-col justify-between space-y-4 hover:shadow-md hover:border-neutral-300 transition-all duration-300"
            >
              <span className="font-display font-bold text-3xl sm:text-4xl text-[#168849] bg-white border border-neutral-200 w-fit px-3.5 py-1 rounded-2xl tracking-tight shadow-2xs">
                {card.value}
              </span>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-base text-[#111814]">
                  {card.title}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
