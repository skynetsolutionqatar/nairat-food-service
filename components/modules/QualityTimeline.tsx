'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, TestTube, Truck } from 'lucide-react';

interface TimelineStep {
  step: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const timelineSteps: TimelineStep[] = [
  {
    step: '1',
    icon: <ClipboardCheck className="w-5 h-5 text-[#063B27]" aria-hidden="true" />,
    title: 'Inspected at Origin',
    desc: 'Carefully selected and inspected at source to ensure the best quality.',
  },
  {
    step: '2',
    icon: <TestTube className="w-5 h-5 text-[#063B27]" aria-hidden="true" />,
    title: 'Tested on Arrival',
    desc: 'Laboratory testing in line with Qatar food-safety requirements.',
  },
  {
    step: '3',
    icon: <Truck className="w-5 h-5 text-[#063B27]" aria-hidden="true" />,
    title: 'Protected Through Cold Chain',
    desc: 'Temperature-controlled storage and transport preserve freshness.',
  },
];

export function QualityTimeline() {
  return (
    <section id="quality" className="py-10 sm:py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-10">
        
        {/* Split Layout: Left is Timeline, Right is Certificate Document Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Timeline details (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Headings */}
            <div className="space-y-3">
              <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-[#5C6662] block">
                CERTIFICATIONS & QUALITY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#063B27] tracking-tight">
                Quality You Can Trust.
              </h2>
              <p className="font-sans text-[#5C6662] text-xs sm:text-sm leading-relaxed max-w-2xl">
                Quality and food safety are built into every stage of our supply chain – from inspection at origin to laboratory testing on arrival and temperature-controlled delivery.
              </p>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative pt-4 pb-2">
              {/* Connector line */}
              <div className="hidden md:block absolute top-10 left-[8%] right-[8%] h-0.5 bg-[#4AA658]/30 z-0" />

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
                    <div className="w-12 h-12 rounded-full bg-[#F4F6F5] border border-black/5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                      {item.icon}
                    </div>

                    {/* Step label + title */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <span className="w-4 h-4 rounded-full border border-black/20 flex items-center justify-center font-mono text-[9px] font-bold text-[#5C6662]">
                          {item.step}
                        </span>
                        <h3 className="font-display font-extrabold text-sm text-[#063B27]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="font-sans text-xs text-[#5C6662] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: QA Certificate Document Preview (lg:col-span-4) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#F4F6F5] rounded-2xl p-6 border border-black/5 shadow-sm max-w-[260px] w-full space-y-5 relative overflow-hidden"
            >
              {/* Document Header */}
              <div className="border-b border-black/10 pb-3 text-center space-y-0.5">
                <span className="font-display font-extrabold text-xs text-[#063B27] tracking-widest uppercase">
                  Nairat Quality Report
                </span>
                <span className="font-mono text-[8px] text-[#5C6662] block">
                  REF: QA-2026-9840
                </span>
              </div>

              {/* Document Body */}
              <div className="space-y-2 font-sans text-[10px] text-[#1C2321]">
                <div className="flex justify-between border-b border-black/5 pb-1">
                  <span className="text-[#5C6662]">Temperature Log:</span>
                  <span className="font-bold text-[#4AA658]">100% Passed</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-1">
                  <span className="text-[#5C6662]">Origin Clearance:</span>
                  <span className="font-bold">Verified</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-1">
                  <span className="text-[#5C6662]">Arrival Port:</span>
                  <span className="font-bold">Doha, Qatar</span>
                </div>
              </div>

              {/* Seal */}
              <div className="flex justify-end pt-2">
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-[#E2B93C] flex items-center justify-center rotate-12">
                  <span className="font-mono text-[7px] font-bold text-[#E2B93C] tracking-tight">PASSED</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

