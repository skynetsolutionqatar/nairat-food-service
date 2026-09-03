'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';

import { useLocale } from '@/context/LocaleContext';

interface NavigationLink {
  label: string;
  href: string;
}

const navigationLinks: NavigationLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Company', href: '#about' },
  { label: 'Our Products', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'Sourcing & Quality', href: '#quality' },
  { label: 'Partners', href: '#partners' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, toggleLanguage } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 transition-all duration-300 pointer-events-none">
      <div
        className={`max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between rounded-full transition-all duration-300 pointer-events-auto ${isScrolled
          ? 'bg-[#158647] backdrop-blur-md shadow-xl'
          : 'bg-[#158647] shadow-lg'
          }`}
      >
        {/* Brand Logo */}
        <Link
          href="#home"
          className="flex items-center"
          onClick={closeMobileMenu}
        >
          <Image
            src={locale === 'ar' ? '/LogoAR.png' : '/LogoEN.png'}
            alt="Nairat Food Services"
            width={180}
            height={75}
            className="h-8 sm:h-9 w-auto object-contain rounded-md"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-xs xl:text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white rounded px-2.5 py-1 relative group tracking-[-0.01em]"
            >
              {link.label}
              <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions: Language Toggle + CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Toggle Button: Shows AR when in English, EN when in Arabic */}
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center justify-center min-w-[42px] px-3.5 py-1.5 rounded-full border border-white/30 hover:border-white/70 bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs active:scale-95 tracking-wide"
            aria-label="Toggle language"
          >
            <span>{locale === 'en' ? 'AR' : 'EN'}</span>
          </button>

          {/* Action CTA Button using CtaButton */}
          <CtaButton
            variant="white"
            href="https://wa.me/97431043814"
            target="_blank"
            rel="noopener noreferrer"
            text="Contact Us"
          />
        </div>

        {/* Mobile Actions: Language Toggle + Menu Button */}
        <div className="sm:hidden flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center justify-center min-w-[38px] px-3 py-1.5 rounded-full border border-white/30 bg-white/10 text-white font-sans text-xs font-bold"
            aria-label="Toggle language"
          >
            <span>{locale === 'en' ? 'AR' : 'EN'}</span>
          </button>

          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-white/80 p-2 focus-visible:outline-2 focus-visible:outline-white rounded-md"
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

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#168749] border border-white/20 px-6 py-5 absolute top-full left-4 right-4 rounded-3xl mt-3 shadow-2xl backdrop-blur-lg">
          <nav className="flex flex-col gap-3">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="font-sans text-base font-medium text-white hover:text-white/80 py-2.5 border-b border-white/10 focus-visible:outline-2 focus-visible:outline-white rounded tracking-[-0.01em]"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  toggleLanguage();
                  closeMobileMenu();
                }}
                className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-full border border-white/30 bg-white/10 text-white font-sans text-sm font-semibold tracking-[-0.01em]"
              >
                <span>Switch to {locale === 'en' ? 'AR' : 'EN'}</span>
              </button>

              <CtaButton
                variant="white"
                href="https://wa.me/97431043814"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                text="Contact Us"
                className="w-full justify-center"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
