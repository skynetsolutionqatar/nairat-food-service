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
    icon: <Globe2 className="w-5 h-5 text-[#4AA658]" aria-hidden="true" />,
    title: 'Global Sourcing',
    description: 'Reliable sourcing from multiple growing regions across the world.',
    isDark: true,
  },
  {
    number: '02',
    icon: <Calendar className="w-5 h-5 text-[#063B27]" aria-hidden="true" />,
    title: 'Year-Round Supply',
    description: 'Seasonal sourcing helps maintain consistent availability throughout the year.',
    isDark: false,
  },
  {
    number: '03',
    icon: <Truck className="w-5 h-5 text-[#063B27]" aria-hidden="true" />,
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
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        '.who-header-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
      ).fromTo(
        '.metric-card',
        { opacity: 0, y: 35, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
        '-=0.3'
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="about" ref={containerRef} className="py-10 sm:py-12 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 space-y-12">
        {/* Left / Top Section Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <span className="who-header-item font-sans text-[11px] font-extrabold uppercase tracking-widest text-[#000000] block">
              WHO WE ARE
            </span>
            <h2 className="who-header-item font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#000000] leading-[1.15] tracking-tight">
              Fresh Produce. <br />
              Strong Supply. <br />
              Trusted Across Qatar.
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <p className="who-header-item font-sans text-sm sm:text-base text-[#B9B9B9] leading-relaxed">
              Nairat Food is one of Qatar’s leading fresh-produce suppliers, sourcing premium fresh fruits and vegetables from trusted growing regions worldwide and delivering them to retailers, wholesalers, food-service businesses and homes across Qatar.
            </p>

            <div className="who-header-item">
              <CtaButton href="#services">
                Discover Our Story
              </CtaButton>
            </div>
          </div>
        </div>

        {/* 3 Metric Cards Horizontal Grid */}
        <div className="metric-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {metricCards.map((card) => (
            <div
              key={card.number}
              className={`metric-card rounded-2xl p-7 flex flex-col justify-between space-y-6 transition-all duration-300 ${
                card.isDark
                  ? 'bg-[#063B27] text-white shadow-md'
                  : 'bg-[#F4F6F5] text-[#1C2321] border border-black/5 hover:border-black/10'
              }`}
            >
              {/* Number Header */}
              <div className="flex items-center justify-between">
                <span
                  className={`font-display font-extrabold text-4xl lg:text-5xl leading-none ${
                    card.isDark ? 'text-white' : 'text-[#1C2321]'
                  }`}
                >
                  {card.number}
                </span>

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                    card.isDark
                      ? 'bg-white/10 border-white/10'
                      : 'bg-white border-black/5'
                  }`}
                >
                  {card.icon}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3
                  className={`font-display font-extrabold text-lg tracking-tight ${
                    card.isDark ? 'text-white' : 'text-[#063B27]'
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`font-sans text-xs sm:text-sm leading-relaxed ${
                    card.isDark ? 'text-white/80' : 'text-[#5C6662]'
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


