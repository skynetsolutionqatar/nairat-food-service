'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CtaButton } from '@/components/ui/CtaButton';
import { useLocale } from '@/context/LocaleContext';

gsap.registerPlugin(ScrollTrigger);

interface FooterNavLink {
  label: string;
  href: string;
}

const footerNavLinks: FooterNavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Company', href: '#about' },
  { label: 'Our Products', href: '#products' },
  { label: 'Careers', href: '#contact' },
  { label: 'Contact Us', href: '#contact' },
];

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();

  useGSAP(
    () => {
      gsap.fromTo(
        '.footer-content-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 92%',
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <footer ref={containerRef} className="bg-white text-[#111814] pt-12 2xl:pt-16 pb-8 2xl:pb-10 border-t border-neutral-200 overflow-hidden will-change-transform">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-8 2xl:space-y-10">

        {/* Top Section: Logo (Left) | "Go Fresh for Future" (Center) | CtaButton (Right) */}
        <div className="footer-content-item flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">

          {/* Left: Brand Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="#home" className="inline-block">
              <Image
                src={locale === 'ar' ? '/LogoAR.png' : '/LogoEN.png'}
                alt="Nairat Food Services"
                width={240}
                height={100}
                style={{ width: 'auto' }}
                className="h-16 sm:h-20 w-auto object-contain rounded-md"
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Center: Bold Headline */}
          <div className="text-center">
            <h2 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-[#111814] tracking-[-0.03em]">
              Go Fresh for Future
            </h2>
          </div>

          {/* Right: Reusable CtaButton */}
          <div className="shrink-0">
            <CtaButton href="#about" text="Learn More" />
          </div>

        </div>

        {/* Divider 1 */}
        <div className="w-full border-t border-neutral-200" />

        {/* Middle Section: Social Icons (Left) | Horizontal Navigation (Right) */}
        <div className="footer-content-item flex flex-col sm:flex-row items-center justify-between gap-6">

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
                className="font-sans text-sm font-medium text-[#6B7280] hover:text-[#168849] transition-colors tracking-[-0.01em]"
              >
                {link.label}
              </a>
            ))}
          </nav>

        </div>

        {/* Divider 2 */}
        <div className="w-full border-t border-neutral-200" />

        {/* Bottom Section: Copyright (Left) | Terms & Privacy (Center) | Designed by (Right) */}
        <div className="footer-content-item flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF] font-normal">
          <p>Copyright &copy; {new Date().getFullYear()} Nairat Food Services. All rights reserved.</p>

          <div className="flex items-center gap-5 text-[#6B7280]">
            <Link href="#privacy" className="hover:text-[#168849] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-neutral-300">•</span>
            <Link href="#terms" className="hover:text-[#168849] transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>

          <p>Designed by Skynet Solutions WLL</p>
        </div>

      </div>
    </footer>
  );
}
