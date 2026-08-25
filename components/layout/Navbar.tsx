'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';

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
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between  rounded-full transition-all duration-300 ${isScrolled
          ? 'bg-[#168849]/95 backdrop-blur-md '
          : 'bg-[#168849] '
          }`}
      >
        {/* Brand Logo */}
        <Link
          href="#home"
          className="flex items-center "
          onClick={closeMobileMenu}
        >
          <Image
            src="/en.jpg"
            alt="Nairat Food Services"
            width={150}
            height={50}
            className="h-8 sm:h-9 w-auto object-contain "
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-xs xl:text-lg font-semibold text-white/95 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white rounded px-2 py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
            </a>
          ))}
        </nav>

        {/* Action CTA Button */}
        <div className="hidden sm:flex items-center">
          <a
            href="https://wa.me/97431043814"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-[#168849] text-[#168849] hover:text-white font-sans text-xs sm:text-sm font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-300 flex items-center gap-2.5 group shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-white border border-transparent hover:border-white/30"
          >
            <span>Contact Us</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#168647] text-white group-hover:bg-white group-hover:text-[#168849] flex items-center justify-center shrink-0 transition-all duration-300 shadow-inner">
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </a>
        </div>

        {/* Mobile Menu Toggler */}
        <div className="lg:hidden flex items-center">
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
        <div className="lg:hidden bg-[#28844B] border border-white/20 px-6 py-5 absolute top-full left-4 right-4 rounded-3xl mt-3 shadow-2xl backdrop-blur-lg">
          <nav className="flex flex-col gap-3">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="font-sans text-sm font-semibold text-white hover:text-white/80 py-2 border-b border-white/10 focus-visible:outline-2 focus-visible:outline-white rounded"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <a
                href="https://wa.me/97431043814"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="bg-white hover:bg-[#168849] text-[#168849] hover:text-white text-center font-sans font-bold py-2.5 px-5 rounded-full flex items-center justify-center gap-2.5 shadow transition-all duration-300 group"
              >
                <span>Contact Us</span>
                <div className="w-7 h-7 rounded-full bg-[#168849] text-white group-hover:bg-white group-hover:text-[#168849] flex items-center justify-center shrink-0 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}


