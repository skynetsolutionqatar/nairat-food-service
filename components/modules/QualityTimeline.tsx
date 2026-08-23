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
    icon: <ClipboardCheck className="w-6 h-6 text-brand-forest" aria-hidden="true" />,
    title: 'Inspected at Origin',
    desc: 'Carefully selected and inspected at source to ensure the best quality.',
  },
  {
    step: '2',
    icon: <TestTube className="w-6 h-6 text-brand-forest" aria-hidden="true" />,
    title: 'Tested on Arrival',
    desc: 'Laboratory testing in line with Qatar food-safety requirements.',
  },
  {
    step: '3',
    icon: <Truck className="w-6 h-6 text-brand-forest" aria-hidden="true" />,
    title: 'Protected Through Cold Chain',
    desc: 'Temperature-controlled storage and transport preserve freshness.',
  },
];

export function QualityTimeline() {
  return (
    <section id="quality" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Split Layout: Left is Timeline, Right is Certificate Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Timeline details (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Headings */}
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-lime font-bold">
                CERTIFICATIONS & QUALITY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-forest tracking-tight">
                Quality You Can Trust.
              </h2>
              <p className="font-sans text-neutral-text-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                Quality and food safety are built into every stage of our supply chain – from inspection at origin to laboratory testing on arrival and temperature-controlled delivery.
              </p>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative pt-6 pb-2">
              {/* Connector line behind circles */}
              <div className="hidden md:block absolute top-14 left-[10%] right-[10%] h-0.5 bg-brand-lime/30 z-0" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {timelineSteps.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 group"
                  >
                    {/* Circle Icon Badge */}
                    <div className="w-16 h-16 rounded-full bg-[#F4F6F5] border border-brand-lime/20 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                      {item.icon}
                    </div>

                    {/* Step label + title */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <span className="w-5 h-5 rounded-full border border-brand-forest/20 flex items-center justify-center font-mono text-[10px] font-bold text-neutral-text-muted">
                          {item.step}
                        </span>
                        <h3 className="font-display font-extrabold text-base text-brand-forest">
                          {item.title}
                        </h3>
                      </div>
                      <p className="font-sans text-xs text-neutral-text-muted leading-relaxed max-w-xs">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: QA Certificate Document Preview (lg:col-span-4) */}
          <div className="lg:col-span-4 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-6 border border-brand-forest/10 shadow-lg max-w-[280px] w-full space-y-6 relative overflow-hidden"
            >
              {/* Document Header representation */}
              <div className="border-b-2 border-brand-forest/10 pb-4 text-center space-y-1">
                <span className="font-display font-extrabold text-xs text-brand-forest tracking-widest uppercase">
                  Nairat QA Report
                </span>
                <span className="font-mono text-[8px] text-neutral-text-muted block">
                  Serial: QA-2026-9840
                </span>
              </div>

              {/* Document Body lines */}
              <div className="space-y-3 font-sans text-[10px] text-neutral-text-dark">
                <div className="flex justify-between border-b border-brand-forest/5 pb-1">
                  <span className="text-neutral-text-muted">Audit Parameters:</span>
                  <span className="font-bold">Temperature Log Integrity</span>
                </div>
                <div className="flex justify-between border-b border-brand-forest/5 pb-1">
                  <span className="text-neutral-text-muted">Harvest Date:</span>
                  <span className="font-bold">2026-08-20</span>
                </div>
                <div className="flex justify-between border-b border-brand-forest/5 pb-1">
                  <span className="text-neutral-text-muted">Arrival Port:</span>
                  <span className="font-bold">Hamad Port, Doha</span>
                </div>
                <div className="flex justify-between border-b border-brand-forest/5 pb-1">
                  <span className="text-neutral-text-muted">Status:</span>
                  <span className="text-brand-lime font-bold">100% Passed</span>
                </div>
              </div>

              {/* Graphic seal */}
              <div className="flex justify-end pt-4">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-brand-saffron/40 flex items-center justify-center rotate-12">
                  <div className="w-9 h-9 rounded-full bg-brand-saffron/10 border border-brand-saffron flex items-center justify-center">
                    <span className="font-mono text-[7px] font-bold text-brand-saffron tracking-tighter">PASSED</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
