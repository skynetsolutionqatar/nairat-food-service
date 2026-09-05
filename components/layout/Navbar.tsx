'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';

import { usePathname } from 'next/navigation';
import { useLocale } from '@/context/LocaleContext';

interface NavigationLink {
  label: string;
  href: string;
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const { locale, toggleLanguage } = useLocale();

  const isCompanyPage = pathname === '/company';

  const productCategories = [
    { label: 'Vegetables', href: '/products/vegetables' },
    { label: 'Fruits', href: '/products/fruits' },
    { label: 'Leafy & Herbs', href: '/products/leafy-herbs' },
    { label: 'Specialty & Gourmet', href: '/products/specialty-gourmet' },
  ];

  const navigationLinks: NavigationLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Company', href: '/company' },
    { label: 'Our Products', href: '#' },
    { label: 'Services', href: isCompanyPage ? '/#services' : '#services' },
    { label: 'Sourcing & Quality', href: isCompanyPage ? '/#quality' : '#quality' },
    { label: 'Partners', href: isCompanyPage ? '/#partners' : '#partners' },
  ];

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
          href="/"
          className="flex items-center"
          onClick={closeMobileMenu}
        >
          <Image
            src={locale === 'ar' ? '/LogoAR.png' : '/LogoEN.png'}
            alt="Nairat Food Services"
            width={180}
            height={75}
            style={{ width: 'auto' }}
            className="h-8 sm:h-9 w-auto object-contain rounded-md"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-5">
          {navigationLinks.map((link) => {
            const isProducts = link.label === 'Our Products';
            const isActive =
              link.href === '/company'
                ? isCompanyPage
                : isProducts
                ? pathname.startsWith('/products')
                : link.href === '/' && pathname === '/';

            if (isProducts) {
              return (
                <div
                  key={link.label}
                  className="relative py-2"
                  onMouseEnter={() => setIsProductsDropdownOpen(true)}
                  onMouseLeave={() => setIsProductsDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsProductsDropdownOpen((prev) => !prev);
                    }}
                    className={`inline-flex items-center gap-1.5 font-sans text-xs xl:text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white rounded px-2.5 py-1 tracking-[-0.01em] cursor-pointer ${
                      isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isProductsDropdownOpen}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-250 ${
                        isProductsDropdownOpen ? 'rotate-180 text-white' : 'text-white/80'
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`absolute bottom-1 left-2.5 right-7 h-0.5 bg-white transition-transform duration-200 rounded-full ${
                        isActive || isProductsDropdownOpen ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu matching JKH Fruits Reference */}
                  <div
                    className={`absolute top-full left-0 pt-2 min-w-[210px] transition-all duration-200 ease-out z-50 ${
                      isProductsDropdownOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                        : 'opacity-0 translate-y-1.5 pointer-events-none invisible'
                    }`}
                  >
                    <div className="bg-[#158647] border border-white/20 rounded-2xl p-2 shadow-2xl backdrop-blur-lg flex flex-col gap-0.5">
                      {productCategories.map((cat) => (
                        <Link
                          key={cat.label}
                          href={cat.href}
                          onClick={() => setIsProductsDropdownOpen(false)}
                          className="font-sans text-xs xl:text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 px-3.5 py-2.5 rounded-xl transition-all duration-150 tracking-[-0.01em]"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-sans text-xs xl:text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white rounded px-2.5 py-1 relative group tracking-[-0.01em] ${
                  isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-white transition-transform duration-200 rounded-full ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
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
          <nav className="flex flex-col gap-2">
            {navigationLinks.map((link) => {
              if (link.label === 'Our Products') {
                return (
                  <div key={link.label} className="border-b border-white/10 py-1">
                    <button
                      type="button"
                      onClick={() => setIsMobileProductsOpen((prev) => !prev)}
                      className="flex items-center justify-between w-full font-sans text-base font-medium text-white hover:text-white/80 py-2 focus-visible:outline-2 focus-visible:outline-white rounded tracking-[-0.01em] cursor-pointer text-left"
                      aria-label="Toggle products menu"
                      aria-expanded={isMobileProductsOpen}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isMobileProductsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isMobileProductsOpen && (
                      <div className="pl-3 pb-2 pt-1 flex flex-col gap-1">
                        {productCategories.map((cat) => (
                          <Link
                            key={cat.label}
                            href={cat.href}
                            onClick={closeMobileMenu}
                            className="font-sans text-sm text-white/85 hover:text-white py-2 px-3 rounded-xl hover:bg-white/10 transition-colors"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="font-sans text-base font-medium text-white hover:text-white/80 py-2.5 border-b border-white/10 focus-visible:outline-2 focus-visible:outline-white rounded tracking-[-0.01em]"
                >
                  {link.label}
                </Link>
              );
            })}

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
