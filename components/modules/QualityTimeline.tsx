'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, TestTube, Truck, ZoomIn, X, Award } from 'lucide-react';

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

  return (
    <section id="quality" className="py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Split Layout: Left is Timeline, Right is Official Certificates Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Timeline details (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Headings */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#168849]" aria-hidden="true" />
                <span className="font-sans type-eyebrow text-[#168849] block">
                  CERTIFICATIONS &amp; QUALITY
                </span>
              </div>
              <h2 className="font-display type-h2 font-medium text-[#111814]">
                Quality You Can Trust.
              </h2>
              <p className="font-sans text-base sm:text-[17px] text-[#6B7280] leading-[1.6] max-w-[55ch]">
                Quality and food safety are built into every stage of our supply chain – from inspection at origin to laboratory testing on arrival and temperature-controlled delivery.
              </p>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative pt-4 pb-2">
              {/* Connector line */}
              <div className="hidden md:block absolute top-10 left-[8%] right-[8%] h-0.5 bg-[#168849]/20 z-0" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {timelineSteps.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 group"
                  >
                    {/* Circle Icon Badge */}
                    <div className="w-12 h-12 rounded-full bg-[#F4F6F5] border border-black/5 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
                      {item.icon}
                    </div>

                    {/* Step label + title */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <span className="w-4 h-4 rounded-full border border-black/20 flex items-center justify-center font-mono text-[9px] font-bold text-[#6B7280]">
                          {item.step}
                        </span>
                        <h3 className="font-display font-semibold text-sm sm:text-base text-[#111814] tracking-[-0.01em]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-[1.6]">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: 2 Official Certificates Display (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 items-center justify-center">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onClick={() => setSelectedCert(cert)}
                className="group relative bg-[#F4F6F5] border border-black/10 rounded-2xl p-3 cursor-pointer overflow-hidden shadow-xs hover:shadow-xl hover:border-[#168849]/40 transition-all duration-300 w-full sm:w-1/2 max-w-[240px]"
              >
                {/* Certificate Preview Image */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white border border-black/5 flex items-center justify-center">
                  <Image
                    src={cert.imageSrc}
                    alt={cert.title}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 240px"
                  />
                  
                  {/* Zoom Overlay Icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-[#168849] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Certificate Title Badge */}
                <div className="pt-3 pb-1 px-1 text-center">
                  <h4 className="font-display font-semibold text-xs sm:text-sm text-[#111814] truncate group-hover:text-[#168849] transition-colors">
                    {cert.title}
                  </h4>
                  <p className="font-sans text-[11px] text-[#72807A] truncate pt-0.5">
                    {cert.subtitle}
                  </p>
                </div>
              </motion.div>
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
