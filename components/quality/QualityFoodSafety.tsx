'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { CtaButton } from '../ui/CtaButton';

interface CertCardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
}

const certificates: CertCardItem[] = [
  {
    id: 'haccp',
    title: 'HACCP',
    subtitle: 'Food Safety Management System',
    description:
      'Certified in accordance with HACCP standards to ensure food safety at every stage of our operations.',
    imageSrc: '/certificates/c1-1-1.png',
  },
  {
    id: 'iso22000',
    title: 'ISO 22000:2018',
    subtitle: 'Food Safety Management System',
    description:
      'Certified to ISO 22000:2018 standards for a consistent and reliable food safety management system.',
    imageSrc: '/certificates/c2-2-1.png',
  },
];

export function QualityFoodSafety(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCert, setSelectedCert] = useState<CertCardItem | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        '.safety-anim-left',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
      ).fromTo(
        '.safety-card-item',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' },
        '-=0.35'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="food-safety"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-[#F4F8F5] text-[#111814] border-y border-[#E3EBE5]/70"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Eyebrow, Heading, Narrative & CTA (4.5 cols) */}
          <div className="safety-anim-left lg:col-span-5 space-y-5">
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
                QUALITY &amp; FOOD SAFETY
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[38px] font-bold text-[#111814] leading-[1.15] tracking-tight">
              Rigorous Checks. <br className="hidden sm:inline" />
              Superior Quality.
            </h2>

            <p className="font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6]">
              We follow strict quality control measures at every stage of the supply chain — from origin to delivery. Our produce is inspected, tested and handled under controlled conditions to ensure maximum freshness and safety.
            </p>

            <div className="pt-2">
              {/* <Link
                href="#supply-chain"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#168849] hover:bg-[#063B27] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all group cursor-pointer"
              >
                <span>Our Quality Process</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link> */}
              <CtaButton
                href="/company"
                text="Our Quality Process"
                variant="primary"
              />
            </div>
          </div>

          {/* Right Column: 2 Certificate Feature Cards (7.5 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="safety-card-item rounded-2xl bg-white p-5 sm:p-6 border border-neutral-200/90 shadow-2xs hover:shadow-md hover:border-[#168849]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#111814] leading-snug">
                      {cert.title}
                    </h3>
                    <span className="text-[11px] sm:text-xs text-[#6B7280] font-medium block mt-0.5">
                      {cert.subtitle}
                    </span>
                  </div>

                  {/* Body & Certificate Thumbnail */}
                  <div className="grid grid-cols-12 gap-3 items-center pt-2">
                    <div className="col-span-7 space-y-3">
                      <p className="font-sans text-xs text-[#6B7280] leading-[1.5]">
                        {cert.description}
                      </p>
                      <div>
                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#168849] hover:text-[#063B27] transition-colors cursor-pointer group"
                        >
                          <span>View Certificate</span>
                          <span className="w-5 h-5 rounded-full border border-[#168849]/30 flex items-center justify-center text-[#168849] group-hover:bg-[#168849] group-hover:text-white transition-colors">
                            <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="col-span-5 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="relative w-22 sm:w-24 aspect-[3/4] rounded-lg border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow group/thumb cursor-pointer bg-neutral-50"
                        title={`View ${cert.title} Certificate`}
                      >
                        <Image
                          src={cert.imageSrc}
                          alt={`${cert.title} Official Certificate Document`}
                          fill
                          className="object-contain p-1 group-hover/thumb:scale-105 transition-transform duration-300"
                          sizes="96px"
                        />
                        <div className="absolute inset-0 bg-[#168849]/0 group-hover/thumb:bg-[#168849]/10 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal Viewer */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="relative max-w-xl w-full bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <h4 className="font-display text-lg sm:text-xl font-bold text-[#111814]">
                    {selectedCert.title} Certificate
                  </h4>
                  <p className="text-xs text-[#6B7280]">
                    {selectedCert.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-neutral-500 hover:text-neutral-800"
                  aria-label="Close certificate preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[3/4] max-h-[68vh] w-full my-4 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                <Image
                  src={selectedCert.imageSrc}
                  alt={`${selectedCert.title} Official Certificate Document`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                />
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-[#6B7280]">
                <span>Official verification for Nairat Food Services Qatar</span>
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
