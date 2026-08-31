'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, TestTube, Truck, ZoomIn, X, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineStep {
  step: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
}

const timelineSteps: TimelineStep[] = [
  {
    step: '1',
    icon: <ClipboardCheck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    title: 'Inspected at Origin',
    desc: 'Carefully selected and inspected at source to ensure the best quality.',
  },
  {
    step: '2',
    icon: <TestTube className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    title: 'Tested on Arrival',
    desc: 'Laboratory testing in line with Qatar food-safety requirements.',
  },
  {
    step: '3',
    icon: <Truck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    title: 'Protected Through Cold Chain',
    desc: 'Temperature-controlled storage and transport preserve freshness.',
  },
];

const certificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Food Safety Management',
    subtitle: 'Quality Compliance Certificate',
    imageSrc: '/certificates/c1-1 1.png',
  },
  {
    id: 'cert-2',
    title: 'ISO Accreditation',
    subtitle: 'Official Supply Chain Accreditation',
    imageSrc: '/certificates/c2-2 1.png',
  },
];

export function QualityTimeline() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          once: true,
        },
      });

      tl.fromTo(
        '.quality-header-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
      )
        .fromTo(
          '.quality-connector-line',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
          '-=0.3'
        )
        .fromTo(
          '.timeline-step-item',
          { opacity: 0, y: 25, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.certificate-card-item',
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out' },
          '-=0.35'
        );
    },
    { scope: containerRef }
  );

  return (
    <section id="quality" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 pt-8 sm:pt-10 2xl:pt-12 pb-14 sm:pb-16 2xl:pb-20 bg-[#F4F6F5] border-y border-neutral-200/70 overflow-hidden">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 2xl:space-y-10">
        
        {/* Split Layout: Left is Timeline, Right is Official Certificates Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 2xl:gap-14 items-center">
          
          {/* Left Column: Timeline details (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6 2xl:space-y-8">
            
            {/* Headings */}
            <div className="space-y-2.5 2xl:space-y-3">
              <div className="quality-header-item flex items-center gap-2">
                <Award className="w-4 h-4 text-[#168849]" aria-hidden="true" />
                <span className="font-display type-eyebrow text-[#168849] block">
                  CERTIFICATIONS &amp; QUALITY
                </span>
              </div>
              <h2 className="quality-header-item font-display type-h2 font-semibold text-[#111814]">
                Quality You Can Trust.
              </h2>
              <p className="quality-header-item font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]">
                Quality and food safety are built into every stage of our supply chain – from inspection at origin to laboratory testing on arrival and temperature-controlled delivery.
              </p>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative pt-3 pb-1">
              {/* Connector line with GSAP scale animation */}
              <div className="quality-connector-line hidden md:block absolute top-9 left-[8%] right-[8%] h-0.5 bg-[#168849]/20 z-0 will-change-transform" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 2xl:gap-6 relative z-10">
                {timelineSteps.map((item) => (
                  <div
                    key={item.step}
                    className="timeline-step-item flex flex-col items-center md:items-start text-center md:text-left space-y-2.5 group will-change-transform"
                  >
                    {/* Circle Icon Badge */}
                    <div className="w-11 h-11 2xl:w-13 2xl:h-13 rounded-full bg-white border border-neutral-200/90 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:border-[#168849]/50 transition-all duration-300">
                      {item.icon}
                    </div>

                    {/* Step label + title */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 justify-center md:justify-start">
                        <span className="w-4 h-4 rounded-full border border-black/20 flex items-center justify-center font-mono text-[9px] font-bold text-[#6B7280] group-hover:border-[#168849] group-hover:text-[#168849] transition-colors">
                          {item.step}
                        </span>
                        <h3 className="font-display font-semibold text-xs sm:text-sm 2xl:text-base text-[#111814] tracking-[-0.01em] group-hover:text-[#168849] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <p className="font-sans text-[11px] sm:text-xs 2xl:text-[13px] text-[#6B7280] leading-[1.55]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Official Certificates Preview (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 2xl:gap-5 justify-center items-center lg:justify-end">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="certificate-card-item group relative bg-white border border-neutral-200/90 rounded-2xl p-3 2xl:p-3.5 cursor-pointer overflow-hidden shadow-xs hover:shadow-xl hover:border-[#168849]/50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-1/2 max-w-[210px] 2xl:max-w-[250px] will-change-transform"
              >
                {/* Certificate Preview Image */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white border border-black/5 flex items-center justify-center">
                  <Image
                    src={cert.imageSrc}
                    alt={cert.title}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                  
                  {/* Zoom Overlay Icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-white/90 text-[#168849] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Certificate Title Badge */}
                <div className="pt-2.5 pb-0.5 px-1 text-center">
                  <h4 className="font-display font-semibold text-xs sm:text-sm text-[#111814] truncate group-hover:text-[#168849] transition-colors">
                    {cert.title}
                  </h4>
                  <p className="font-sans text-[10px] sm:text-[11px] text-[#72807A] truncate pt-0.5">
                    {cert.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Interactive Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-white rounded-3xl p-4 sm:p-6 overflow-hidden shadow-2xl space-y-4"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3 px-2">
                <div>
                  <h3 className="font-display font-semibold text-lg sm:text-xl text-[#111814] tracking-[-0.015em]">
                    {selectedCert.title}
                  </h3>
                  <p className="font-sans text-xs text-[#72807A]">
                    {selectedCert.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-9 h-9 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close certificate modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="relative w-full aspect-[4/3] max-h-[70vh] bg-neutral-50 rounded-2xl overflow-hidden flex items-center justify-center">
                <Image
                  src={selectedCert.imageSrc}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 90vw, 800px"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
