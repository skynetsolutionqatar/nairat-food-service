'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface RetailPartner {
  id: string;
  name: string;
  image: string;
}

const retailPartners: RetailPartner[] = [
  {
    id: 'almeera',
    name: 'Al Meera',
    image: '/partners/almeera-logo-b.svg',
  },
  {
    id: 'lulu',
    name: 'LuLu Hypermarket',
    image: '/partners/lulu-logo.png',
  },
  {
    id: 'carrefour',
    name: 'Carrefour Qatar',
    image: '/partners/careefour.svg',
  },
  {
    id: 'safari',
    name: 'Safari Hypermarket',
    image: '/partners/Safari Hyper Market Logo.png',
  },
  {
    id: 'grand',
    name: 'Grand Mall',
    image: '/partners/grand-logo.webp',
  },
  {
    id: 'rawabi',
    name: 'Rawabi Hypermarket',
    image: '/partners/rawabi-hypermarket.svg',
  },
  {
    id: 'saudia',
    name: 'Saudia Hypermarket',
    image: '/partners/saudia.png',
  },
  {
    id: 'abcfresh',
    name: 'ABC Fresh',
    image: '/partners/abc.webp',
  },
  {
    id: 'talabat',
    name: 'Talabat Mart',
    image: '/partners/talabat-mart.svg',
  },
];

export function PartnerRetail(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        delay: 0.1,
      });

      tl.fromTo(
        '.retail-header-item',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55 }
      ).fromTo(
        '.retail-grid-container',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55 },
        '-=0.35'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="retail-partners"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="retail-header-item space-y-3">
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
              OUR RETAIL PARTNERS
            </span>
          </div>

          <h2 className="font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]">
            Trusted Daily Supplier to <br />
            <span className="text-[#168849]">Qatar&apos;s Leading Retail Groups</span>
          </h2>
        </div>

        {/* 4-Column Partner Logo Grid */}
        <div className="retail-grid-container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {retailPartners.map((partner) => (
            <div
              key={partner.id}
              className="retail-partner-card group p-5 sm:p-6 rounded-2xl bg-[#F8FAF8] border border-neutral-200/90 shadow-2xs hover:shadow-md hover:border-[#168849]/50 hover:bg-white transition-all duration-300 flex items-center justify-center text-center min-h-[110px] sm:min-h-[125px]"
            >
              <div className="relative h-9 sm:h-10 w-28 sm:w-36 flex items-center justify-center">
                <Image
                  src={partner.image}
                  alt={`${partner.name} logo`}
                  fill
                  sizes="(max-width: 640px) 120px, 150px"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
