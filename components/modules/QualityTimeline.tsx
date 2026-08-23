'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Sparkles, ThermometerSun } from 'lucide-react';

interface TimelineStep {
  step: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const timelineSteps: TimelineStep[] = [
  {
    step: '01',
    icon: <ClipboardCheck className="w-6 h-6 text-brand-forest" aria-hidden="true" />,
    title: 'Inspected at Origin',
    desc: 'Before packing, crops undergo sugar/acid inspections, residue testing, and sizing sorting matching international standards right at the farm gate.',
  },
  {
    step: '02',
    icon: <Sparkles className="w-6 h-6 text-brand-forest" aria-hidden="true" />,
    title: 'Tested on Arrival',
    desc: 'Upon landing at Doha port, QA specialists take physical pulp temperatures, check for transit blemishes, and verify sanitary compliance paperwork.',
  },
  {
    step: '03',
    icon: <ThermometerSun className="w-6 h-6 text-brand-forest" aria-hidden="true" />,
    title: 'Unbroken Cold Chain',
    desc: 'Stored in Salwa Road chilled warehouse and dispatched in active-telemetry temperature-regulated delivery vehicles to ensure fresh, safe shelf life.',
  },
];

export function QualityTimeline() {
  return (
    <section id="quality" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Headings */}
        <div className="max-w-2xl mx-auto text-center mb-20 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-lime font-bold">
            QUALITY PROCESS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-forest tracking-tight">
            Our Quality Supply Chain
          </h2>
          <p className="font-sans text-neutral-text-muted text-base">
            From the tree to the supermarket shelf, we maintain three stringent inspection and handling checkpoints.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-brand-forest/5 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {timelineSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-neutral-bg-soft rounded-2xl p-8 border border-brand-forest/5 flex flex-col items-center text-center relative hover:border-brand-lime/25 transition-all duration-300 group"
              >
                {/* Floating step number */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-saffron text-brand-forest font-mono text-xs font-bold tracking-widest px-4 py-1.5 rounded-full border-2 border-white shadow-md">
                  STEP {item.step}
                </div>

                {/* Icon wrapper */}
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md border border-brand-forest/5 mb-6 group-hover:scale-105 transition-transform duration-300">
                  {item.icon}
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-xl text-brand-forest">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-neutral-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
