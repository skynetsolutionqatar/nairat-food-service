'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A2618] text-white pt-16 sm:pt-20 pb-10 border-t border-white/10 overflow-hidden px-4 sm:px-8">
      <div className="max-w-[1440px] mx-auto space-y-12">
        
        {/* Top Grid: Brand + Navigation Columns + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="#home" className="inline-block">
              <Image
                src="/en.jpg"
                alt="Nairat Food Services"
                width={140}
                height={44}
                className="h-8 sm:h-9 w-auto object-contain rounded"
              />
            </Link>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm font-normal">
              Qatar’s trusted fresh produce importer, cold-chain logistics operator, and wholesale distributor. Connecting global orchards directly with local supermarket shelves.
            </p>
            <div className="pt-2 text-xs text-white/70 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4F056]" />
                <span>Central Market Terminal, Doha, Qatar</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4F056]" />
                <span>+974 3104 3814</span>
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <a href="#home" className="hover:text-[#D4F056] transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4F056] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4F056] transition-colors">Services</a>
              </li>
              <li>
                <a href="#values" className="hover:text-[#D4F056] transition-colors">Our Values</a>
              </li>
              <li>
                <a href="#programs" className="hover:text-[#D4F056] transition-colors">Programs</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Capabilities (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li>Farm Gate Sourcing</li>
              <li>20 Dedicated Chiller Rooms</li>
              <li>Multi-Zone Refrigeration</li>
              <li>Retail Barcode Labeling</li>
              <li>40 Refrigerated Fleet Vehicles</li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Trade Inquiry (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Trade Newsletter
            </h4>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              Subscribe to receive weekly Qatar import schedules and seasonal price sheets.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative flex items-center"
            >
              <input
                type="email"
                placeholder="Enter your work email"
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#D4F056] transition-colors pr-10"
              />
              <button
                type="submit"
                className="absolute right-1.5 w-7 h-7 rounded-full bg-[#D4F056] text-[#0A2618] flex items-center justify-center hover:bg-[#c4e046] transition-colors shadow-sm"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Nairat Food Services. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Trade</a>
            <a href="#compliance" className="hover:text-white transition-colors">Food Safety Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
