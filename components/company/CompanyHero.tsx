'use client';

import React from 'react';
import Link from 'next/link';

export function CompanyHero(): React.ReactNode {
  return (
    <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-14 bg-[#158647] text-white overflow-hidden">

      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Company
        </h1>
        <nav
          aria-label="Breadcrumb"
          className="mt-2 sm:mt-2.5 flex items-center gap-2 text-xs sm:text-sm text-white/85 font-medium"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-white/60">/</span>
          <span className="text-white font-semibold">Company</span>
        </nav>
      </div>
    </section>
  );
}
