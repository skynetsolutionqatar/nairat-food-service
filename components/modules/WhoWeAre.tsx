'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Globe2, Calendar, Truck, Leaf } from 'lucide-react';
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
          start: 'top 85%',
          once: true,
        },
      });

      // Smooth coordinated reveal
      tl.fromTo(
        '.who-header-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
      ).fromTo(
        '.metric-card',
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out' },
        '-=0.35'
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="about" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 py-14 sm:py-16 2xl:py-22 bg-white overflow-hidden">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 2xl:space-y-12">
        {/* Left / Top Section Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 2xl:gap-10 items-end border-b border-neutral-200/90 pb-8 sm:pb-9 2xl:pb-10">
          <div className="lg:col-span-7 space-y-3">

            <div className="who-header-item flex items-center gap-2">
              <Image
                src="/icon/icon.png"
                alt=""
                width={32}
                height={16}
                className="h-4 w-auto object-contain"
                aria-hidden="true"
              />
              <span className="font-display type-eyebrow text-[#168849] block">
                WHO WE ARE
              </span>
            </div>
            <h2 className="who-header-item font-display type-h2 font-semibold text-[#111814] text-left">
              Fresh Produce. <br />
              Strong Supply. <br />
              <span className="text-[#168849]">Trusted Across Qatar.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-4 2xl:space-y-5 flex flex-col items-start lg:items-end">
            <p className="who-header-item font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]">
              Nairat Food is one of Qatar’s leading fresh-produce suppliers, sourcing premium fresh fruits and vegetables from trusted growing regions worldwide and delivering them to retailers, wholesalers, food-service businesses and homes across Qatar.
            </p>

            <div className="who-header-item self-start lg:self-end">
              <CtaButton href="#services" text="Discover Our Story" />
            </div>
          </div>
        </div>

        {/* 3 Metric Cards Horizontal Grid */}
        <div className="metric-cards-grid grid grid-cols-1 md:grid-cols-3 gap-5 2xl:gap-6 pt-1">
          {metricCards.map((card) => (
            <div
              key={card.number}
              className={`metric-card group rounded-2xl sm:rounded-3xl p-6 sm:p-7 2xl:p-8 min-h-[200px] 2xl:min-h-[230px] flex flex-col justify-between space-y-5 transition-all duration-300 will-change-transform hover:-translate-y-1 ${card.isDark
                ? 'bg-[#0A2618] text-white shadow-md hover:shadow-xl'
                : 'bg-[#F6F8F5] text-[#111814] border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md'
                }`}
            >
              {/* Number Header */}
              <div className="flex items-center justify-between">
                <span
                  className={`font-display font-semibold text-3xl lg:text-4xl 2xl:text-5xl leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:scale-105 ${card.isDark ? 'text-white' : 'text-[#111814]'
                    }`}
                >
                  {card.number}
                </span>

                <div
                  className={`w-10 h-10 2xl:w-12 2xl:h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${card.isDark
                    ? 'bg-white/10 border-white/15'
                    : 'bg-white border-neutral-200 shadow-2xs'
                    }`}
                >
                  {card.icon}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <h3
                  className={`font-display font-semibold text-lg 2xl:text-xl tracking-[-0.015em] leading-snug ${card.isDark ? 'text-white' : 'text-[#111814]'
                    }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`font-sans text-xs sm:text-[13px] 2xl:text-sm leading-[1.55] ${card.isDark ? 'text-gray-300' : 'text-[#6B7280]'
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
