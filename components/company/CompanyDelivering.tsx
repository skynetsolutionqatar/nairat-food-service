'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Calendar, ShieldCheck, MapPin } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';

export function CompanyDelivering() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      timeline
        .fromTo(
          '.delivering-image-card',
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.75, ease: 'power2.out' }
        )
        .fromTo(
          '.delivering-text-item',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' },
          '-=0.4'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="delivering"
      ref={sectionRef}
      className="scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Visual Image Card (5 cols) */}
          <div className="delivering-image-card lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-neutral-200/80 aspect-[4/3] sm:aspect-[4/4] lg:aspect-[4/4.5]">
              <Image
                src="/whychooseus/warehouse.avif"
                alt="Nairat Food Cold-Chain Distribution Facility in Doha"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Meta Badges */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-white text-xs font-semibold">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#168849]/95 backdrop-blur-md shadow-sm">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Est. 2020</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md">
                  <MapPin className="w-3.5 h-3.5 text-[#D4F056]" aria-hidden="true" />
                  <span>Doha Industrial Area</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy + Commitment Box (7 cols) */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="delivering-text-item flex items-center gap-2">
              <Image
                src="/icon/icon.png"
                alt=""
                width={32}
                height={16}
                className="h-4 w-auto object-contain"
                aria-hidden="true"
              />
              <span className="font-display type-eyebrow text-[#168849] block">
                Delivering Freshness
              </span>
            </div>

            <h2 className="delivering-text-item font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]">
              A comprehensive fresh-produce <br className="hidden sm:inline" />
              <span className="text-[#168849]">partner for Qatar.</span>
            </h2>

            <div className="space-y-3.5 font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6]">
              <p className="delivering-text-item">
                Nairat Food is one of Qatar&apos;s leading fresh-produce houses, specializing in the import, distribution and delivery of premium fruits and vegetables.
              </p>
              <p className="delivering-text-item">
                Established in 2020, Nairat has grown rapidly by combining global sourcing, strong local market knowledge and dependable logistics. Today, we serve hypermarkets, supermarkets, wholesale buyers, food-service businesses and consumers across Qatar.
              </p>
              <p className="delivering-text-item">
                From farms across the Levant, Gulf, Africa, Asia and beyond, our produce travels through an integrated supply chain designed to preserve freshness from source to customer.
              </p>
            </div>

            {/* Commitment Box Matching Reference Card */}
            <div className="delivering-text-item group p-5 sm:p-6 rounded-[19px] border border-neutral-200/90 flex items-start gap-5 shadow-2xs hover:border-neutral-300 transition-colors duration-300">
              <div className="commitment-icon-ring shrink-0 bg-white">
                <ShieldCheck
                  className="w-7 h-7 text-[#88888A] group-hover:text-[#168849] transition-colors duration-300 relative z-10"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-display font-semibold text-base sm:text-lg text-[#111814]">
                  Our Core Commitment
                </h3>
                <p className="font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55]">
                  To deliver high-quality fresh produce safely, efficiently and consistently. Sourced with care. Handled with precision. Delivered with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
