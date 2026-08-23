'use client';

import React, { useState } from 'react';

export function AlMeeraLogo() {
  return (
    <svg className="h-9 md:h-10 w-auto" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" fill="#8CC63F" fillOpacity="0.15" />
      <path d="M12 20C12 15.58 15.58 12 20 12C24.42 12 28 15.58 28 20" stroke="#8CC63F" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M16 20C16 17.79 17.79 16 20 16C22.21 16 24 17.79 24 20" stroke="#00A651" strokeWidth="3" strokeLinecap="round" />
      <text x="44" y="22" fill="#006837" className="font-sans font-black text-base tracking-tighter">almeera</text>
      <text x="44" y="32" fill="#00A651" className="font-sans text-[8px] font-bold uppercase tracking-wider">الميرة</text>
    </svg>
  );
}

export function LuluLogo() {
  return (
    <svg className="h-9 md:h-10 w-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="28" fill="#00A651" className="font-sans font-black text-3xl italic tracking-tighter">LuLu</text>
      <path d="M85 15C82 12 78 12 75 15L70 20L65 15" stroke="#00A651" strokeWidth="3" strokeLinecap="round" />
      <text x="95" y="24" fill="#00A651" className="font-sans text-[9px] font-bold tracking-widest uppercase">لولو</text>
    </svg>
  );
}

export function CarrefourLogo() {
  return (
    <svg className="h-9 md:h-10 w-auto" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10L8 20L18 30L28 20L18 10Z" fill="none" stroke="#ED1C24" strokeWidth="1.5" />
      <path d="M13 20L18 15L18 25L13 20Z" fill="#ED1C24" />
      <path d="M23 20L18 15L18 25L23 20Z" fill="#0054A6" />
      <text x="36" y="20" fill="#000000" className="font-sans font-black text-sm tracking-tighter">Carrefour</text>
      <text x="36" y="30" fill="#000000" className="font-sans font-bold text-[9px]">كارفور</text>
    </svg>
  );
}

export function SafariLogo() {
  return (
    <svg className="h-9 md:h-10 w-auto" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="4" width="32" height="32" rx="4" fill="#ED1C24" />
      <path d="M26 12C26 10 28 9 31 9C34 9 36 10 36 12C36 14 34 15 31 16C28 17 26 19 26 22C26 25 28 27 31 27C34 27 36 25 36 22" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
      <text x="56" y="24" fill="#ED1C24" className="font-sans text-[8px] font-black tracking-widest uppercase">سفاري</text>
    </svg>
  );
}

export function GrandLogo() {
  return (
    <svg className="h-9 md:h-10 w-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="28" fill="#D2232A" className="font-sans font-black text-2xl tracking-tighter">Grand</text>
      <circle cx="85" cy="18" r="8" fill="#F7931E" />
      <path d="M85 6V10M85 26V30M73 18H77M93 18H97" stroke="#F7931E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Partners() {
  const [scrollIndex, setScrollIndex] = useState(0);

  const handlePrev = () => {
    setScrollIndex((prev) => (prev > 0 ? prev - 1 : 4));
  };

  const handleNext = () => {
    setScrollIndex((prev) => (prev < 4 ? prev + 1 : 0));
  };

  return (
    <section id="partners" className="bg-[#FFFFFF] py-8 border-b border-black/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between gap-4">
        
        {/* Previous Carousel Button */}
        <button
          onClick={handlePrev}
          className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-neutral-text-muted hover:bg-neutral-bg-soft hover:text-brand-forest transition-colors shrink-0"
          aria-label="Previous partner logos"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Center Container with Header + Logos */}
        <div className="flex-1 space-y-4 text-center">
          <span className="font-sans text-[11px] text-[#5C6662] font-extrabold uppercase tracking-widest block">
            TRUSTED BY QATAR’S LEADING PARTNERS
          </span>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 py-1">
            <div className="flex justify-center transition-all duration-300 transform hover:scale-105"><AlMeeraLogo /></div>
            <div className="flex justify-center transition-all duration-300 transform hover:scale-105"><LuluLogo /></div>
            <div className="flex justify-center transition-all duration-300 transform hover:scale-105"><CarrefourLogo /></div>
            <div className="flex justify-center transition-all duration-300 transform hover:scale-105"><SafariLogo /></div>
            <div className="flex justify-center transition-all duration-300 transform hover:scale-105"><GrandLogo /></div>
          </div>
        </div>

        {/* Next Carousel Button */}
        <button
          onClick={handleNext}
          className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-neutral-text-muted hover:bg-neutral-bg-soft hover:text-brand-forest transition-colors shrink-0"
          aria-label="Next partner logos"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

      </div>
    </section>
  );
}

