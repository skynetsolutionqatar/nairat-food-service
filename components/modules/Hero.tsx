'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const servicePills = [
  'Farm Quality Inspection',
  'Multi-Zone Cold Storage',
  'Direct Store Replenishment',
  'Laboratory Clearance',
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-anim-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.1 }
      ).fromTo(
        '.hero-bottom-widget',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        '-=0.3'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-8 bg-white text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main Inset Rounded Dark Hero Card */}
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] bg-[#0A2618] overflow-hidden p-8 sm:p-14 lg:p-16 min-h-[580px] sm:min-h-[640px] flex flex-col justify-between shadow-2xl border border-white/10">
          
          {/* Background Lush Foliage & Orchard Texture */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=85"
              alt="Lush green agricultural fields"
              fill
              priority
              className="object-cover object-center opacity-30 mix-blend-luminosity"
            />
            {/* Dark Vignette Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A2618] via-[#0A2618]/90 to-[#0A2618]/60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,240,86,0.1),transparent_50%)]" />
          </div>

          {/* Top Hero Text Section */}
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="hero-anim-item inline-block">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4F056]">
                FRESH PRODUCE &amp; COLD LOGISTICS
              </span>
            </div>

            <h1 className="hero-anim-item font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12]">
              Bringing Your Produce <br />
              And Quality To Life
            </h1>

            <p className="hero-anim-item text-xs sm:text-base text-white/80 leading-relaxed max-w-xl font-normal">
              Certified Farm Sourcing &amp; Cold-Chain Logistics, Tailored Just for Your Market — Because Every Fresh Consignment Deserves Peak Care.
            </p>

            {/* Dual Action Buttons matching Screenshot */}
            <div className="hero-anim-item flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#contact"
                className="bg-[#D4F056] hover:bg-[#c4e046] text-[#0A2618] font-sans text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
              >
                Get Started
              </a>
              <a
                href="#services"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-sans text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300"
              >
                Explore Products
              </a>
            </div>
          </div>

          {/* Bottom Row of Hero: Services Pills (Left) vs 2 Floating Preview Cards (Right) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-12 border-t border-white/15">
            
            {/* Left: Service Pills */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block">
                OUR SERVICES
              </span>
              <div className="flex flex-wrap gap-2">
                {servicePills.map((pill, idx) => (
                  <span
                    key={idx}
                    className="hero-bottom-widget text-[11px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 backdrop-blur-xs"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Dual Floating Thumbnail Cards matching Screenshot */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Card 1 */}
              <div className="hero-bottom-widget bg-[#0F3321]/90 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 flex items-center gap-3 shadow-lg group hover:border-[#D4F056]/40 transition-all">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <Image
                    src="/whychooseus/chiller warehouse.avif"
                    alt="Chiller warehouse"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-display font-bold text-xs text-white truncate">
                    Livening Up Your Fresh Supply
                  </h4>
                  <p className="text-[10px] text-white/70 truncate mt-0.5">
                    Expert Cold Chain &amp; Logistics
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="hero-bottom-widget bg-[#0F3321]/90 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 flex items-center gap-3 shadow-lg group hover:border-[#D4F056]/40 transition-all">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <Image
                    src="/whychooseus/warehouse.avif"
                    alt="Warehouse logistics"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-display font-bold text-xs text-white truncate">
                    Continuous Temperature Control
                  </h4>
                  <p className="text-[10px] text-white/70 truncate mt-0.5">
                    0°C - 4°C Unbroken Integrity
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
