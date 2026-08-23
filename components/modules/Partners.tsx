'use client';

import React from 'react';

export function AlMeeraLogo() {
  return (
    <svg className="h-8 w-auto" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8C12 8 8 18 20 22C24 16 22 8 12 8Z" fill="#4AA658" />
      <path d="M16 12C16 12 13 19 22 22C25 18 24 12 16 12Z" fill="#E2B93C" />
      <path d="M6 18C12 22 10 32 4 32C0 26 2 18 6 18Z" fill="#4AA658" />
      <text x="32" y="22" fill="#063B27" className="font-display font-extrabold text-sm tracking-tight">Al Meera</text>
      <text x="32" y="32" fill="#4AA658" className="font-sans text-[7px] font-bold uppercase tracking-wider">الـمـيـرة</text>
    </svg>
  );
}

export function LuluLogo() {
  return (
    <svg className="h-8 w-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="20" r="10" fill="#4AA658" fillOpacity="0.1" />
      <path d="M15 13C12 13 10 16 10 20C10 24 13 27 17 27C21 27 23 23 20 20C18 18 17 18 15 18" stroke="#4AA658" strokeWidth="2.5" strokeLinecap="round" />
      <text x="32" y="24" fill="#E11D48" className="font-display font-black text-lg tracking-tighter italic">LuLu</text>
      <text x="72" y="22" fill="#4AA658" className="font-sans text-[8px] font-bold tracking-widest uppercase">لولو</text>
    </svg>
  );
}

export function CarrefourLogo() {
  return (
    <svg className="h-8 w-auto" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 10L6 20L16 30L26 20L16 10Z" fill="none" stroke="#2563EB" strokeWidth="2" />
      <path d="M11 20L16 15L16 25L11 20Z" fill="#EF4444" />
      <path d="M21 20L16 15L16 25L21 20Z" fill="#1D4ED8" />
      <text x="34" y="24" fill="#1E40AF" className="font-display font-extrabold text-base tracking-tight">Carrefour</text>
    </svg>
  );
}

export function SafariLogo() {
  return (
    <svg className="h-8 w-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="65" height="24" rx="4" fill="#EF4444" />
      <text x="37.5" y="24" fill="#FFFFFF" textAnchor="middle" className="font-display font-black text-xs tracking-widest">SAFARI</text>
      <text x="75" y="22" fill="#EF4444" className="font-sans text-[8px] font-extrabold tracking-wider uppercase">سفاري</text>
    </svg>
  );
}

export function GrandMallLogo() {
  return (
    <svg className="h-8 w-auto" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="25" fill="#DC2626" className="font-display font-black text-base tracking-tighter">Grand</text>
      <text x="54" y="25" fill="#4AA658" className="font-display font-black text-base tracking-tighter">Mall</text>
      <circle cx="102" cy="18" r="4" fill="#4AA658" />
    </svg>
  );
}

export function Partners() {
  return (
    <section className="bg-white py-10 border-y border-brand-forest/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-6 text-center">
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-text-muted font-bold">
          Trusted by Qatar’s Leading Partners
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between gap-4">
        {/* Left Arrow */}
        <button 
          type="button"
          aria-label="Previous partners"
          className="w-8 h-8 rounded-full border border-neutral-text-muted/20 flex items-center justify-center text-neutral-text-muted hover:bg-neutral-bg-soft hover:text-brand-forest transition-colors shrink-0"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Logos container */}
        <div className="flex-grow overflow-x-auto scrollbar-none py-2">
          <div className="flex items-center justify-between min-w-[700px] md:min-w-0 md:w-full px-4 gap-6">
            <div className="flex-1 flex justify-center"><AlMeeraLogo /></div>
            <div className="flex-1 flex justify-center"><LuluLogo /></div>
            <div className="flex-1 flex justify-center"><CarrefourLogo /></div>
            <div className="flex-1 flex justify-center"><SafariLogo /></div>
            <div className="flex-1 flex justify-center"><GrandMallLogo /></div>
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          type="button"
          aria-label="Next partners"
          className="w-8 h-8 rounded-full border border-neutral-text-muted/20 flex items-center justify-center text-neutral-text-muted hover:bg-neutral-bg-soft hover:text-brand-forest transition-colors shrink-0"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
}
