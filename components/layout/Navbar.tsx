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
  { label: 'Quality', href: '#quality' },
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
          ? 'bg-brand-forest/95 backdrop-blur-md py-4 shadow-md border-b border-brand-lime/10'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo container */}
          <Link href="#home" className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-brand-lime rounded-lg" onClick={closeMobileMenu}>
            {/* Fallback typography representation of modern logo */}
            <span className="font-display font-extrabold text-2xl tracking-tight text-white">
              NAIRAT
            </span>
            <span className="font-display text-xs text-brand-saffron tracking-wider font-semibold border-s border-white/20 ps-2 uppercase hidden sm:inline">
              Food Services
            </span>
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
              className="bg-brand-lime hover:bg-brand-lime/90 text-white font-sans text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-brand-saffron focus-visible:outline-offset-2"
            >
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
              <span>Contact Us</span>
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
                className="bg-brand-lime hover:bg-brand-lime/90 text-white text-center font-sans font-bold py-3 rounded-full flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-5 h-5" aria-hidden="true" />
                <span>Contact via WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
