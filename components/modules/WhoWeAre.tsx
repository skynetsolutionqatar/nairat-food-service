'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Globe2, Calendar, Truck } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';

gsap.registerPlugin(ScrollTrigger);

interface MetricCard {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

const metricCards: MetricCard[] = [
  {
    number: '01',
    icon: <Globe2 className="w-5 h-5 text-[#D4F056]" aria-hidden="true" />,
    title: 'Global Sourcing',
    description: 'Reliable sourcing from multiple growing regions across the world.',
    isDark: true,
  },
  {
    number: '02',
    icon: <Calendar className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    title: 'Year-Round Supply',
    description: 'Seasonal sourcing helps maintain consistent availability throughout the year.',
    isDark: false,
  },
  {
    number: '03',
    icon: <Truck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    title: 'Built for Qatar',
    description: 'Trusted distribution, cold-chain logistics and daily delivery across Qatar.',
    isDark: false,
  },
];

export function WhoWeAre() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 92%',
          once: true,
        },
      });

      // Snappy parallel reveal with zero lag
      tl.fromTo(
        '.who-header-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' }
      ).fromTo(
        '.metric-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' },
        '<0.05'
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="about" ref={containerRef} className="py-16 sm:py-20 2xl:py-28 bg-white overflow-hidden">
      <div className="max-w-[1440px] 2xl:max-w-[1620px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 2xl:space-y-16">
        {/* Left / Top Section Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 2xl:gap-12 items-end border-b border-neutral-200/90 pb-8 sm:pb-10 2xl:pb-12">
          <div className="lg:col-span-7 space-y-3">
            <span className="who-header-item font-sans type-eyebrow text-[#168849] block">
              WHO WE ARE
            </span>
            <h2 className="who-header-item font-display type-h2 font-medium text-[#111814] text-left">
              Fresh Produce. <br />
              Strong Supply. <br />
              <span className="text-[#168849]">Trusted Across Qatar.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-5 2xl:space-y-6 flex flex-col items-start lg:items-end">
            <p className="who-header-item font-sans text-sm sm:text-[15px] 2xl:text-[16px] text-[#6B7280] leading-[1.6] text-justify max-w-[52ch] 2xl:max-w-[56ch]">
              Nairat Food is one of Qatar’s leading fresh-produce suppliers, sourcing premium fresh fruits and vegetables from trusted growing regions worldwide and delivering them to retailers, wholesalers, food-service businesses and homes across Qatar.
            </p>

            <div className="who-header-item self-start lg:self-end">
              <CtaButton href="#services" text="Discover Our Story" />
            </div>
          </div>
        </div>

        {/* 3 Metric Cards Horizontal Grid */}
        <div className="metric-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-8 pt-2">
          {metricCards.map((card) => (
            <div
              key={card.number}
              className={`metric-card rounded-3xl p-8 2xl:p-10 min-h-[220px] 2xl:min-h-[260px] flex flex-col justify-between space-y-6 transition-all duration-300 ${
                card.isDark
                  ? 'bg-[#0A2618] text-white shadow-md'
                  : 'bg-[#F6F8F5] text-[#111814] border border-neutral-200/80 hover:border-neutral-300'
              }`}
            >
              {/* Number Header */}
              <div className="flex items-center justify-between">
                <span
                  className={`font-display font-semibold text-4xl lg:text-5xl 2xl:text-6xl leading-none tracking-[-0.03em] ${
                    card.isDark ? 'text-white' : 'text-[#111814]'
                  }`}
                >
                  {card.number}
                </span>

                <div
                  className={`w-11 h-11 2xl:w-13 2xl:h-13 rounded-2xl flex items-center justify-center border ${
                    card.isDark
                      ? 'bg-white/10 border-white/15'
                      : 'bg-white border-neutral-200 shadow-2xs'
                  }`}
                >
                  {card.icon}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3
                  className={`font-display font-semibold text-xl 2xl:text-2xl tracking-[-0.015em] leading-snug ${
                    card.isDark ? 'text-white' : 'text-[#111814]'
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`font-sans text-sm 2xl:text-base leading-[1.6] ${
                    card.isDark ? 'text-gray-300' : 'text-[#6B7280]'
                  }`}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
