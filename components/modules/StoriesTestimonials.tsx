'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    quote:
      'We had no idea which produce varieties would sell best, but Nairat’s supply team guided us through everything and created a reliable daily delivery schedule with the freshest quality.',
    author: 'Khaled Al-Ansari',
    role: 'Category Procurement Director, Leading Supermarket Chain',
  },
  {
    quote:
      'The consistency of their temperature-controlled intake has drastically reduced our food waste. Consignments arrive on time, pre-sorted, and ready for immediate hypermarket display.',
    author: 'Chef David Miller',
    role: 'Culinary Operations Lead, Qatar Hospitality Group',
  },
];

export function StoriesTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        '.stories-header-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      ).fromTo(
        '.story-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="reviews"
      ref={containerRef}
      className="py-16 sm:py-24 bg-[#0A2618] text-white px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="stories-header-item text-[11px] font-extrabold uppercase tracking-widest text-[#D4F056] block">
            TESTIMONIAL
          </span>
          <h2 className="stories-header-item font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            Stories That Prove Why Our <br />
            Work Matters
          </h2>
          <p className="stories-header-item text-xs sm:text-sm text-white/75 leading-relaxed font-normal">
            We&apos;re a trusted partner of Qatar&apos;s leading grocers and hospitality groups. Their stories reflect our commitment to total quality and reliable supply.
          </p>
        </div>

        {/* Dual Dark Testimonial Cards matching Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="story-card bg-[#0F3321] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xl hover:border-white/20 transition-all duration-300"
            >
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                &ldquo;{story.quote}&rdquo;
              </p>

              <div className="pt-4 border-t border-white/10 space-y-1">
                <h4 className="font-display font-bold text-sm text-white">
                  {story.author}
                </h4>
                <p className="text-xs text-white/60">
                  {story.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
