'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, PhoneCall } from 'lucide-react';

interface NavigationLink {
  label: string;
  href: string;
}

const navigationLinks: NavigationLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'Sourcing', href: '#sourcing' },
  { label: 'Quality & Certifications', href: '#quality' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-forest/95 backdrop-blur-md py-3 shadow-md border-b border-brand-lime/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo container */}
          <Link href="#home" className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-brand-lime rounded-lg" onClick={closeMobileMenu}>
            <div className="flex flex-col text-left">
              <span className="font-display font-extrabold text-2xl tracking-tight text-white leading-none">
                na<span className="relative inline-block">ı<span className="absolute -top-1.5 left-px w-2 h-3.5 bg-brand-lime rounded-full rounded-tr-none rotate-12" /></span>rat
              </span>
              <span className="font-sans text-[7px] text-white/70 tracking-[0.3em] font-extrabold uppercase mt-1 leading-none">
                Food Services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-sm font-medium text-white/80 hover:text-brand-lime transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand-lime rounded px-2 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="https://wa.me/97431043814"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-brand-lime/50 hover:border-brand-lime bg-black/10 hover:bg-black/30 text-white font-sans text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-3.5 group focus-visible:outline-2 focus-visible:outline-brand-saffron focus-visible:outline-offset-2"
            >
              <span>Contact Us</span>
              <div className="w-6 h-6 rounded-full bg-brand-lime flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.488 1.977 14.03 1.053 11.4 1.053c-5.437 0-9.86 4.37-9.864 9.8.002 2.13.56 4.208 1.614 6.014l-.996 3.636 3.737-.972zm11.237-7.603c-.3-.15-1.772-.875-2.046-.975-.276-.1-.477-.15-.677.15-.2.3-.777.975-.951 1.174-.176.2-.351.224-.652.074-1.43-.715-2.458-1.321-3.444-3.007-.26-.445.26-.413.743-1.38.08-.163.04-.306-.02-.455-.06-.15-.477-1.15-.652-1.574-.171-.41-.345-.353-.477-.36l-.407-.007c-.14 0-.37.052-.564.26-.194.208-.742.728-.742 1.776 0 1.05.762 2.062.868 2.212.106.15 1.5 2.29 3.634 3.21.507.219.904.35 1.214.448.51.162.974.139 1.341.084.41-.061 1.772-.726 2.022-1.428.25-.702.25-1.303.176-1.428-.075-.125-.275-.201-.575-.351z" />
                </svg>
              </div>
            </a>
          </div>

          {/* Mobile menu toggler */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-brand-lime p-2 focus-visible:outline-2 focus-visible:outline-brand-lime rounded-md"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-brand-forest border-t border-white/10 px-6 py-4 absolute top-full left-0 right-0 shadow-xl">
          <nav className="flex flex-col gap-4">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="font-sans text-base font-semibold text-white/90 hover:text-brand-lime py-2 border-b border-white/5 focus-visible:outline-2 focus-visible:outline-brand-lime rounded"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="https://wa.me/97431043814"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="border border-brand-lime hover:bg-brand-lime text-white text-center font-sans font-bold py-3 rounded-full flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.488 1.977 14.03 1.053 11.4 1.053c-5.437 0-9.86 4.37-9.864 9.8.002 2.13.56 4.208 1.614 6.014l-.996 3.636 3.737-.972zm11.237-7.603c-.3-.15-1.772-.875-2.046-.975-.276-.1-.477-.15-.677.15-.2.3-.777.975-.951 1.174-.176.2-.351.224-.652.074-1.43-.715-2.458-1.321-3.444-3.007-.26-.445.26-.413.743-1.38.08-.163.04-.306-.02-.455-.06-.15-.477-1.15-.652-1.574-.171-.41-.345-.353-.477-.36l-.407-.007c-.14 0-.37.052-.564.26-.194.208-.742.728-.742 1.776 0 1.05.762 2.062.868 2.212.106.15 1.5 2.29 3.634 3.21.507.219.904.35 1.214.448.51.162.974.139 1.341.084.41-.061 1.772-.726 2.022-1.428.25-.702.25-1.303.176-1.428-.075-.125-.275-.201-.575-.351z" />
                </svg>
                <span>Contact via WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
