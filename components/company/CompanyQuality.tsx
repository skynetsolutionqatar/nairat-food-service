'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, ZoomIn, X, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function CompanyQuality(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCert, setActiveCert] = useState<string | null>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      timeline.fromTo(
        '.quality-feature-card',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="quality"
      ref={sectionRef}
      className="scroll-mt-24 py-10 sm:py-12 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="quality-feature-card rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-md transition-shadow duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Image (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-neutral-100 border border-neutral-200/80">
                <Image
                  src="/whychooseus/temperature conrolled.avif"
                  alt="Nairat Food QA Laboratory Inspection & Temperature Control"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4F056]" />
                    <span>HACCP &amp; ISO Certified</span>
                  </div>
                  <span className="text-[#D4F056]">Qatar Verified</span>
                </div>
              </div>
            </div>

            {/* Right: Narrative & Cert Badges (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-block">
                <span className="px-3 py-1 rounded-md bg-[#FDE047] text-[#111814] font-display text-xs font-bold uppercase tracking-wider">
                  Quality &amp; Food Safety
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#111814] tracking-tight">
                Quality You Can Trust: Rigorous Protocols from Source to Arrival
              </h3>

              <div className="space-y-3 text-sm sm:text-base text-[#47554E] leading-relaxed">
                <p>
                  At Nairat, food safety and quality are integrated into our daily operations. Incoming consignments are inspected and laboratory testing is carried out in line with Qatar food-safety requirements.
                </p>
                <p>
                  Our produce is then handled through controlled cold-chain processes designed to maintain freshness and quality until delivery.
                </p>
              </div>

              {/* Certification Badges */}
              <div className="pt-2 flex flex-wrap gap-3 items-center">
                <button
                  type="button"
                  onClick={() => setActiveCert('/certificates/c1-1 1.png')}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#168849]/10 border border-[#168849]/30 text-[#168849] text-xs font-semibold hover:bg-[#168849] hover:text-white transition-all cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>HACCP Certified</span>
                  <ZoomIn className="w-3 h-3 opacity-70" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCert('/certificates/c2-2 1.png')}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#168849]/10 border border-[#168849]/30 text-[#168849] text-xs font-semibold hover:bg-[#168849] hover:text-white transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ISO 22000:2018</span>
                  <ZoomIn className="w-3 h-3 opacity-70" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-xl w-full bg-white rounded-3xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h4 className="font-display text-lg font-bold text-[#111814]">
                  Official Certification Document
                </h4>
                <button
                  type="button"
                  onClick={() => setActiveCert(null)}
                  className="p-1.5 rounded-full hover:bg-neutral-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative aspect-[3/4] max-h-[65vh] w-full my-3 rounded-xl overflow-hidden bg-neutral-100">
                <Image
                  src={activeCert}
                  alt="Certificate document"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
