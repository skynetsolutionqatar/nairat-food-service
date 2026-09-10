'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { MapPin, Navigation, Clock, Warehouse, ShieldCheck } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';

export function ContactMap() {
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
        '.map-anim-header',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      ).fromTo(
        '.map-container-card',
        { opacity: 0, y: 24, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out' },
        '-=0.35'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="warehouse-location"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-[#F4F8F5] text-[#111814] border-t border-neutral-200/80"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="map-anim-header space-y-3">
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
              FACILITY LOCATION
            </span>
          </div>

          <h2 className="font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]">
            Our Doha Central Warehouse &amp; Cold Storage
          </h2>
        </div>

        {/* Map Container with Details Overlay */}
        <div className="map-container-card rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-sm relative">
          {/* Top Facility Summary Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 bg-[#F8FAF8] border-b border-neutral-200/80 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#168849]/10 text-[#168849] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-[#6B7280] block">Location</span>
                <span className="font-semibold text-[#111814]">Street 37, Industrial Area</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#168849]/10 text-[#168849] flex items-center justify-center shrink-0">
                <Warehouse className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-[#6B7280] block">Capacity</span>
                <span className="font-semibold text-[#111814]">5,000 m² &bull; 20 Chillers</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#168849]/10 text-[#168849] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-[#6B7280] block">Operations</span>
                <span className="font-semibold text-[#111814]">24/7 Receiving &amp; Dispatch</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#168849]/10 text-[#168849] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-[#6B7280] block">Compliance</span>
                <span className="font-semibold text-[#111814]">HACCP &bull; ISO 22000</span>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px]">
            <iframe
              title="Nairat Food Central Warehouse Location Doha Qatar"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14436.327854619374!2d51.42875155!3d25.1979435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d070d65b75b9%3A0x13c7cbdf4b2568f6!2sIndustrial%20Area%2C%20Street%2037%2C%20Doha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-95 contrast-105"
            />

            {/* Float Navigation Card */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200 shadow-md flex items-center justify-between gap-4">
              <div>
                <span className="font-display font-bold text-sm text-[#111814] block">
                  Nairat Food Services
                </span>
                <span className="font-sans text-xs text-[#6B7280] block">
                  Street 37, Industrial Area, Doha
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Street+37+Industrial+Area+Doha+Qatar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#168849] hover:bg-[#12723c] text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
