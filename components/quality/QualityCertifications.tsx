'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, ZoomIn, X, CheckCircle2, FileCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface CertificateItem {
  id: string;
  title: string;
  standard: string;
  scope: string;
  imageSrc: string;
  badgeColor: string;
  bulletPoints: string[];
}

const certificates: CertificateItem[] = [
  {
    id: 'haccp',
    title: 'HACCP Food Safety System',
    standard: 'Codex Alimentarius HACCP Principles',
    scope: 'Receipt, Storage, Handling, and Distribution of Fresh Fruits & Vegetables',
    imageSrc: '/certificates/c1-1 1.png',
    badgeColor: 'bg-[#168849]',
    bulletPoints: [
      'Systematic identification and prevention of biological, chemical, and physical hazards',
      'Continuous Critical Control Point (CCP) monitoring throughout the cold chain',
      'Rigorous hygiene protocols and staff sanitization compliance across all facilities',
    ],
  },
  {
    id: 'iso22000',
    title: 'ISO 22000:2018 Certification',
    standard: 'Food Safety Management System (FSMS)',
    scope: 'Wholesale & Retail Fresh Produce Supply Chain & Logistics Operations',
    imageSrc: '/certificates/c2-2 1.png',
    badgeColor: 'bg-[#063B27]',
    bulletPoints: [
      'Internationally benchmarked standard integrating HACCP with management systems',
      'Independent annual third-party audits verifying operational integrity',
      'Full supplier traceability from overseas grower packhouses to Qatar retail points',
    ],
  },
];

export function QualityCertifications(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

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
        '.cert-header-item',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
      )
      .fromTo(
        '.cert-card',
        { opacity: 0, y: 28, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out' },
        '-=0.35'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-22 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header: Full-Width 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="lg:col-span-7 space-y-3">
            <span className="cert-header-item font-display type-eyebrow text-[#168849] block">
              ACCREDITED FOOD SAFETY
            </span>
            <h2 className="cert-header-item font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]">
              Certified Excellence: <br />
              <span className="text-[#168849]">HACCP &amp; ISO 22000:2018</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            <p className="cert-header-item font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]">
              Nairat operates under internationally recognized food-safety management systems. Our certifications provide tangible assurance that every carton meets stringent quality benchmarks.
            </p>
          </div>
        </div>

        {/* 2-Column Certification Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="cert-card rounded-3xl border border-neutral-200/90 bg-[#F8FAF8] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-5">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#168849]/15 flex items-center justify-center text-[#168849]">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-[#168849]">
                      {cert.standard}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#168849]/10 text-[#168849]">
                    Audited &amp; Active
                  </span>
                </div>

                {/* Title & Scope */}
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-lg sm:text-xl 2xl:text-2xl text-[#111814] tracking-[-0.015em] leading-snug">
                    {cert.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55]">
                    <span className="font-medium text-[#111814]">Certified Scope:</span> {cert.scope}
                  </p>
                </div>

                {/* Key Verification Checkmarks */}
                <ul className="space-y-2.5 pt-2 border-t border-neutral-200/70">
                  {cert.bulletPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#168849] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certificate Preview Thumbnail & Action Button */}
              <div className="pt-4 border-t border-neutral-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="relative w-14 h-18 rounded-lg overflow-hidden border border-neutral-300 bg-white shadow-xs cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label={`Preview ${cert.title}`}
                  >
                    <Image
                      src={cert.imageSrc}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="56px"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-4 h-4 text-white drop-shadow-md opacity-80 group-hover:opacity-100" />
                    </div>
                  </div>
                  <div className="text-xs text-[#6B7280]">
                    <p className="font-semibold text-[#111814]">Official Certificate Copy</p>
                    <p className="text-[#6B7280]">Click to view high-resolution scan</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#168849] hover:bg-[#063B27] text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Inspect Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive High-Resolution Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-3xl w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="space-y-0.5">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#111814]">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#168849] font-medium">
                    {selectedCert.standard}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Image Preview */}
              <div className="relative mt-4 aspect-[1/1.4] max-h-[70vh] w-full rounded-xl overflow-hidden bg-neutral-50 border border-neutral-200">
                <Image
                  src={selectedCert.imageSrc}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>

              {/* Modal Footer */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
                <span>Verified &amp; active registration for Nairat Food Services Qatar</span>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#111814] font-semibold transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
