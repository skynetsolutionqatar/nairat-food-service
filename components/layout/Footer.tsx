'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CtaButton } from '@/components/ui/CtaButton';
import { useLocale } from '@/context/LocaleContext';

interface FooterNavLink {
  label: string;
  href: string;
}

const footerNavLinks: FooterNavLink[] = [

  { label: 'Company', href: '/company' },
  { label: 'Services', href: '/services' },
  { label: 'Sourcing & Quality', href: '/quality' },
  { label: 'Partners', href: '/partners' },
  { label: 'Careers', href: '/career' },
  { label: 'Contact Us', href: '/contact' },
];

export function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="bg-white text-[#111814] pt-10 sm:pt-12 2xl:pt-16 pb-8 2xl:pb-10 border-t border-neutral-200">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 2xl:space-y-10">

        {/* Top Section: Logo (Left) | "Go Fresh for Future" (Center) | CtaButton (Right) */}
        <div className="footer-content-item flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 md:gap-8">

          {/* Left: Brand Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="inline-block">
              <Image
                src={locale === 'ar' ? '/LogoAR.png' : '/LogoEN.png'}
                alt="Nairat Food Services"
                width={240}
                height={100}
                style={{ width: 'auto' }}
                className="h-12 min-[380px]:h-14 sm:h-16 md:h-20 w-auto object-contain rounded-md"
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Center: Bold Headline */}
          <div className="text-left md:text-center">
            <h2 className="font-display font-medium text-[20px] min-[380px]:text-[22px] min-[480px]:text-2xl sm:text-3xl lg:text-4xl text-[#111814] tracking-[-0.03em] leading-tight">
              Go Fresh for Future
            </h2>
          </div>

          {/* Right: Reusable CtaButton */}
          <div className="shrink-0 self-start md:self-auto">
            <CtaButton href="/#about" text="Learn More" />
          </div>

        </div>

        {/* Divider 1 */}
        <div className="w-full border-t border-neutral-200" />

        {/* Middle Section: Social Icons (Left) | Horizontal Navigation (Right) */}
        <div className="footer-content-item flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">

          {/* Social Icons (Facebook & Instagram) */}
          <div className="flex items-center gap-3.5 sm:gap-4 shrink-0">
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
              href="https://www.instagram.com/nairatshop"
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
          <nav className="flex flex-wrap items-center justify-start md:justify-end gap-x-4 min-[380px]:gap-x-5 sm:gap-x-7 gap-y-2 sm:gap-y-2.5">
            {footerNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-xs min-[380px]:text-[13px] sm:text-sm font-medium text-[#6B7280] hover:text-[#168849] transition-colors tracking-[-0.01em]"
              >
                {link.label}
              </a>
            ))}
          </nav>

        </div>

        {/* Divider 2 */}
        <div className="w-full border-t border-neutral-200" />

        {/* Bottom Section: Copyright (Left) | Terms & Privacy (Center) | Designed by (Right) */}
        <div className="footer-content-item flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 text-[11px] min-[380px]:text-xs text-[#9CA3AF] font-normal text-left">
          <p className="text-left">Copyright &copy; {new Date().getFullYear()} Nairat Food Services. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[#6B7280] text-left">
            <Link href="#privacy" className="hover:text-[#168849] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-neutral-300">•</span>
            <Link href="#terms" className="hover:text-[#168849] transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>

          <p className="text-left">Designed by Skynet Solutions WLL</p>
        </div>

      </div>
    </footer>
  );
}
