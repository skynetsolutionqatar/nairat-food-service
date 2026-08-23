'use client';

import React from 'react';

const partners = [
  { name: 'Al Meera', sub: 'Hypermarket' },
  { name: 'Lulu', sub: 'Hypermarket' },
  { name: 'Carrefour', sub: 'Retail Group' },
  { name: 'Safari', sub: 'Mall Group' },
  { name: 'Grand Mall', sub: 'Hypermarket' },
];

// Duplicate list for infinite scrolling marquee effect
const doublePartners = [...partners, ...partners, ...partners];

export function Partners() {
  return (
    <section className="bg-neutral-bg-soft py-12 border-y border-brand-forest/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-6 text-center">
        <h2 className="font-mono text-xs uppercase tracking-widest text-brand-lime font-bold">
          Trusted by Qatar’s Leading Retailers
        </h2>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full flex items-center select-none overflow-hidden">
        {/* Gradients on the side for soft fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-neutral-bg-soft to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-neutral-bg-soft to-transparent z-10 pointer-events-none" />

        {/* Marquee track */}
        <div className="flex gap-8 w-max animate-marquee whitespace-nowrap">
          {doublePartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center gap-3 bg-white border border-brand-forest/5 py-4 px-8 rounded-xl shadow-sm min-w-[200px]"
            >
              {/* Monogram placeholder */}
              <div className="w-8 h-8 rounded-lg bg-brand-forest/10 flex items-center justify-center font-display font-extrabold text-brand-forest text-sm">
                {partner.name.charAt(0)}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-bold text-neutral-text-dark text-base tracking-tight leading-none mb-1">
                  {partner.name}
                </span>
                <span className="font-sans text-[10px] text-neutral-text-muted uppercase tracking-wider font-semibold leading-none">
                  {partner.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
}
