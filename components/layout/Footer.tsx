'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface FooterNavLink {
  label: string;
  href: string;
}

const footerNavLinks: FooterNavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Company', href: '#about' },
  { label: 'Our Ventures', href: '#services' },
  { label: 'Careers', href: '#contact' },
  { label: 'Contact Us', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="bg-white text-[#111814] pt-14 pb-8 border-t border-neutral-200 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8 sm:space-y-10">
        
        {/* Top Section: Logo (Left) | "Go Fresh for Future" (Center) | "Learn More" Button (Right) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          
          {/* Left: Brand Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="#home" className="inline-block">
              <Image
                src="/en.jpg"
                alt="Nairat Food Services"
                width={120}
                height={80}
                className="h-16 sm:h-20 w-auto object-contain rounded-md"
                priority
              />
            </Link>
          </div>

          {/* Center: Bold Headline */}
          <div className="text-center">
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#111814] tracking-tight">
              Go Fresh for Future
            </h2>
          </div>

          {/* Right: Learn More Pill CTA */}
          <div className="shrink-0">
            <a
              href="#about"
              className="bg-[#168849] hover:bg-[#12753e] text-white font-sans text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-3 group shadow-md shadow-[#168849]/15 active:scale-95 cursor-pointer"
            >
              <span>Learn More</span>
              <div className="w-6 h-6 rounded-full bg-white text-[#168849] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </a>
          </div>

        </div>

        {/* Divider 1 */}
        <div className="w-full border-t border-neutral-200" />

        {/* Middle Section: Social Icons (Left) | Horizontal Navigation (Right) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Social Icons (Facebook & Instagram) */}
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-800 hover:text-[#168849] hover:border-[#168849] transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3.6L16 8h-3V6.3C13 5.4 13.5 5 14.5 5H16V2h-2.5C10.5 2 9 3.5 9 6.3V8z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-800 hover:text-[#168849] hover:border-[#168849] transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-4 h-4 stroke-current fill-none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>

          {/* Horizontal Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {footerNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-xs sm:text-sm font-semibold text-neutral-700 hover:text-[#168849] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

        </div>

        {/* Divider 2 */}
        <div className="w-full border-t border-neutral-200" />

        {/* Bottom Section: Copyright (Left) | Designed by (Right) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-medium">
          <p>Copyright &copy; {new Date().getFullYear()} Nairat Food Services</p>
          <p>Designed by Skynet Solutions WLL</p>
        </div>

      </div>
    </footer>
  );
}
