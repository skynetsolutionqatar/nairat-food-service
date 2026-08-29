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
  { label: 'Our Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Values', href: '#values' },
  { label: 'Programs', href: '#programs' },
  { label: 'Reviews', href: '#reviews' },
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

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8">
      <div
        className={`max-w-[1440px] mx-auto px-6 sm:px-8 py-3 flex items-center justify-between rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#168849]/95 backdrop-blur-md shadow-xl border border-white/20'
            : 'bg-[#168849] border border-white/15 shadow-lg'
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="#home"
          className="flex items-center gap-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image
            src="/en.jpg"
            alt="Nairat Food Services"
            width={135}
            height={42}
            className="h-8 w-auto object-contain rounded"
            priority
          />
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-xs sm:text-sm font-semibold text-white/95 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/97431043814"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-neutral-100 text-[#168849] font-sans text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>Get Started</span>
            <div className="w-6 h-6 rounded-full bg-[#168849] text-white flex items-center justify-center shrink-0">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-white hover:text-white/80 p-1.5 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden max-w-sm mx-auto mt-3 bg-[#168849] border border-white/20 px-6 py-6 rounded-3xl shadow-2xl backdrop-blur-xl">
          <nav className="flex flex-col gap-3">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-sm font-semibold text-white hover:text-white/80 py-2 border-b border-white/10"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-white text-[#168849] font-sans text-sm font-bold py-2.5 rounded-full text-center block"
              >
                Get Started
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
