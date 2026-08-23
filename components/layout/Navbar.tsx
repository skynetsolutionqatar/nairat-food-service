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
  { label: 'Company', href: '#about' },
  { label: 'Our Products', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'Sourcing & Quality', href: '#sourcing' },
  { label: 'Partners', href: '#partners' },
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
    <header className="fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300">
      <div className={`max-w-7xl mx-auto px-6 py-3 flex items-center justify-between shadow-lg border transition-all duration-300 rounded-full bg-[#0F7944] border-white/10`}>
        {/* Logo container */}
        <Link href="#home" className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-brand-lime rounded-lg" onClick={closeMobileMenu}>
          <img 
            src="/nairat-logo.jpeg" 
            alt="Nairat Logo" 
            className="h-10 w-auto rounded-lg border border-white/10" 
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-sm font-medium text-white hover:text-brand-lime transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand-lime rounded px-2 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTA Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#contact"
            className="bg-white hover:bg-white/90 text-[#0F7944] font-sans text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-brand-saffron focus-visible:outline-offset-2"
          >
            <span>Contact Us</span>
            <div className="w-6 h-6 rounded-full bg-[#0F7944] flex items-center justify-center shrink-0 shadow-sm text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
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

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0F7944] border border-white/10 px-6 py-4 absolute top-full left-4 right-4 rounded-3xl mt-2 shadow-xl">
          <nav className="flex flex-col gap-4">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="font-sans text-base font-semibold text-white hover:text-brand-lime py-2 border-b border-white/5 focus-visible:outline-2 focus-visible:outline-brand-lime rounded"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="bg-white text-[#0F7944] text-center font-sans font-bold py-3 rounded-full flex items-center justify-center gap-2"
              >
                <span>Contact Us</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
