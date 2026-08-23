'use client';

import React from 'react';

export function AlMeeraLogo() {
  return (
    <svg className="h-10 w-auto" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Al Meera logo: green/yellow leaf circle */}
      <circle cx="20" cy="20" r="16" fill="#8CC63F" fillOpacity="0.15" />
      <path d="M12 20C12 15.58 15.58 12 20 12C24.42 12 28 15.58 28 20" stroke="#8CC63F" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M16 20C16 17.79 17.79 16 20 16C22.21 16 24 17.79 24 20" stroke="#00A651" strokeWidth="3" strokeLinecap="round" />
      {/* almeera text */}
      <text x="44" y="22" fill="#006837" className="font-sans font-black text-base tracking-tighter">almeera</text>
      <text x="44" y="32" fill="#00A651" className="font-sans text-[8px] font-bold uppercase tracking-wider">الميرة</text>
    </svg>
  );
}

export function LuluLogo() {
  return (
    <svg className="h-10 w-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* LuLu logo: stylized green letters matching the screenshot */}
      <text x="10" y="28" fill="#00A651" className="font-sans font-black text-3xl italic tracking-tighter">LuLu</text>
      <path d="M85 15C82 12 78 12 75 15L70 20L65 15" stroke="#00A651" strokeWidth="3" strokeLinecap="round" />
      <text x="95" y="24" fill="#00A651" className="font-sans text-[9px] font-bold tracking-widest uppercase">لولو</text>
    </svg>
  );
}

export function CarrefourLogo() {
  return (
    <svg className="h-10 w-auto" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Carrefour logo: blue/red shield emblem + text */}
      <path d="M18 10L8 20L18 30L28 20L18 10Z" fill="none" stroke="#ED1C24" strokeWidth="1.5" />
      <path d="M13 20L18 15L18 25L13 20Z" fill="#ED1C24" />
      <path d="M23 20L18 15L18 25L23 20Z" fill="#0054A6" />
      {/* Text "Carrefour" & Arabic */}
      <text x="36" y="20" fill="#000000" className="font-sans font-black text-sm tracking-tighter">Carrefour</text>
      <text x="36" y="30" fill="#000000" className="font-sans font-bold text-[9px]">كارفور</text>
    </svg>
  );
}

export function SafariLogo() {
  return (
    <svg className="h-10 w-auto" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Safari logo: red square box containing white capital 'S' */}
      <rect x="15" y="4" width="32" height="32" rx="4" fill="#ED1C24" />
      <path d="M26 12C26 10 28 9 31 9C34 9 36 10 36 12C36 14 34 15 31 16C28 17 26 19 26 22C26 25 28 27 31 27C34 27 36 25 36 22" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
      <text x="56" y="24" fill="#ED1C24" className="font-sans text-[8px] font-black tracking-widest uppercase">سفاري</text>
    </svg>
  );
}

export function MahaseelLogo() {
  return (
    <svg className="h-10 w-auto" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Mahaseel logo: green circular seal showing a plant/leaf */}
      <circle cx="20" cy="20" r="14" fill="#39B54A" fillOpacity="0.1" stroke="#39B54A" strokeWidth="2" />
      <path d="M20 10C17 14 17 24 20 28C23 24 23 14 20 10Z" fill="#39B54A" />
      <path d="M15 17C18 19 20 22 20 22" stroke="#39B54A" strokeWidth="1.5" />
      <path d="M25 17C22 19 20 22 20 22" stroke="#39B54A" strokeWidth="1.5" />
      {/* mahaseel text */}
      <text x="42" y="22" fill="#1A4A25" className="font-sans font-extrabold text-[11px] tracking-tight">محاصيل</text>
      <text x="42" y="32" fill="#39B54A" className="font-sans text-[8px] font-bold uppercase tracking-wider">Mahaseel</text>
    </svg>
  );
}

export function GrandLogo() {
  return (
    <svg className="h-10 w-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Grand logo: red word "Grand" with a red/orange sun-shape */}
      <text x="10" y="28" fill="#D2232A" className="font-sans font-black text-2xl tracking-tighter">Grand</text>
      <circle cx="85" cy="18" r="8" fill="#F7931E" />
      <path d="M85 6V10M85 26V30M73 18H77M93 18H97" stroke="#F7931E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Partners() {
  return (
    <section id="partners" className="bg-[#F8F9FA] py-8 border-y border-neutral-text-muted/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-6 text-center">
        <span className="font-sans text-sm text-neutral-text-muted font-medium">
          Trusted by Qatar’s leading retailers
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Flat grid of logos side-by-side matching the screenshot exactly */}
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-8 md:gap-12 py-2">
          <div className="flex justify-center"><AlMeeraLogo /></div>
          <div className="flex justify-center"><LuluLogo /></div>
          <div className="flex justify-center"><CarrefourLogo /></div>
          <div className="flex justify-center"><SafariLogo /></div>
          <div className="flex justify-center"><MahaseelLogo /></div>
          <div className="flex justify-center"><GrandLogo /></div>
        </div>
      </div>
    </section>
  );
}
