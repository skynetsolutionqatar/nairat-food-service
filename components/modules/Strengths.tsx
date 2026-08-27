'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CtaButton } from '@/components/ui/CtaButton';

gsap.registerPlugin(ScrollTrigger);

interface StrengthCard {
  id: string;
  number?: string;
  title: string;
  desc: string;
  imageUrl: string;
  alt: string;
}

const strengthsList: StrengthCard[] = [
  {
    id: 'chiller-rooms',
    number: '20',
    title: 'Dedicated Chiller Rooms',
    desc: 'Custom temperature zones configured specifically to maintain peak freshness for every variety of fruits and vegetables.',
    imageUrl: '/whychooseus/chiller warehouse.avif',
    alt: '20 Dedicated Chiller Rooms',
  },
  {
    id: 'warehouse',
    number: '5,000 m2',
    title: 'Cold-Chain Warehouse',
    desc: 'Spacious, state-of-the-art cold storage facility ensuring uninterrupted quality control from intake to dispatch.',
    imageUrl: '/whychooseus/warehouse.avif',
    alt: '5,000 m2 Cold-Chain Warehouse',
  },
  {
    id: 'cold-chain',
    title: 'Cold Chain Unbroken',
    desc: 'Rigorous FIFO rotation and continuous climate monitoring keeping fresh produce in optimal condition across all transit stages.',
    imageUrl: '/whychooseus/temperature conrolled.avif',
    alt: 'Cold Chain Unbroken',
  },
  {
    id: 'fleet',
    number: '40',
    title: 'Refrigerated Vehicles',
    desc: 'Modern temperature-controlled distribution fleet delivering fresh produce across Qatar on precise schedules.',
    imageUrl: '/whychooseus/truck.avif',
    alt: '40 Refrigerated Vehicles',
  },
];

const tallCard: StrengthCard = {
  id: 'sourced-origin',
  title: 'Sourced at Origin',
  desc: 'Direct partnerships with certified international growers guaranteeing premium farm-fresh produce delivered directly to Qatar.',
  imageUrl: '/whychooseus/sourced from origin.avif',
  alt: 'Sourced at Origin',
};

export function Strengths() {
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
        '.strength-header-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
      ).fromTo(
        '.strength-card-item',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      );

      // Image Parallax Scrub Effect for each card
      const cardImages = gsap.utils.toArray<HTMLElement>('.strength-card-bg');
      cardImages.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15, yPercent: -4 },
          {
            scale: 1.02,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="strengths" ref={containerRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
        {/* Header Grid: Left Headline vs Right Subtext & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Headline */}
          <div className="lg:col-span-7 space-y-4">
            <span className="strength-header-item font-sans text-[11px] font-extrabold uppercase tracking-widest text-[#000000] block">
              WHY CHOOSE US
            </span>
            <h2 className="strength-header-item font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#000000] leading-[1.15] tracking-tight">
              Built for Freshness. <br />
              Ready to Deliver.
            </h2>
          </div>

          {/* Right Paragraph & CTA Button */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end space-y-6">
            <p className="strength-header-item font-sans text-sm sm:text-base text-[#B9B9B9] leading-relaxed text-left">
              From global sourcing to last-mile delivery, our integrated supply chain is designed to protect quality, maintain consistency and deliver fresh produce reliably across Qatar.
            </p>
            <div className="strength-header-item self-start lg:self-end">
              <CtaButton href="#contact">
                Read More
              </CtaButton>
            </div>
          </div>
        </div>

        {/* Bento Grid: 2x2 Left Cards + 1 Tall Right Card */}
        <div className="strengths-bento-grid grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {/* Left 2x2 Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {strengthsList.map((card) => (
              <div
                key={card.id}
                className="strength-card-item group relative overflow-hidden rounded-2xl h-56 sm:h-60 md:h-64 shadow-sm flex flex-col justify-end p-6 bg-neutral-900 cursor-pointer"
              >
                {/* Background Image with Hover Zoom & Scroll Parallax */}
                <div
                  className="strength-card-bg absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${card.imageUrl}')` }}
                  aria-label={card.alt}
                />

                {/* Dark Gradient Overlay - Lightened for brighter imagery */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent group-hover:from-black/75 group-hover:via-black/30 transition-all duration-300 pointer-events-none" />

                {/* Card Content Overlay */}
                <div className="relative z-10 text-white flex flex-col justify-end transition-transform duration-300">
                  {card.number && (
                    <span className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-none block drop-shadow-md mb-1 transition-transform duration-300 group-hover:-translate-y-0.5">
                      {card.number}
                    </span>
                  )}
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug drop-shadow-md">
                    {card.title}
                  </h3>

                  {/* Hover Description Paragraph */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out">
                    <div className="overflow-hidden">
                      <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Tall Card */}
          <div
            className="strength-card-item lg:col-span-1 group relative overflow-hidden rounded-2xl min-h-[380px] sm:min-h-[440px] lg:min-h-full shadow-sm flex flex-col justify-end p-7 bg-neutral-900 cursor-pointer"
          >
            {/* Background Image with Hover Zoom & Scroll Parallax */}
            <div
              className="strength-card-bg absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${tallCard.imageUrl}')` }}
              aria-label={tallCard.alt}
            />

            {/* Dark Gradient Overlay - Lightened for brighter imagery */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent group-hover:from-black/75 group-hover:via-black/30 transition-all duration-300 pointer-events-none" />

            {/* Card Content Overlay */}
            <div className="relative z-10 text-white flex flex-col justify-end transition-transform duration-300">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug drop-shadow-md">
                {tallCard.title}
              </h3>

              {/* Hover Description Paragraph */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out">
                <div className="overflow-hidden">
                  <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {tallCard.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




