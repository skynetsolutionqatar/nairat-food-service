'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';

import { usePathname } from 'next/navigation';
import { useLocale } from '@/context/LocaleContext';

interface NavigationLink {
  id: string;
  label: string;
  href: string;
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const { locale, dict, toggleLanguage } = useLocale();
  const isLanguageToggleEnabled = process.env.NEXT_PUBLIC_ENABLE_LANGUAGE_TOGGLE === 'true';

  const isSubpage = pathname !== '/' && pathname !== '/ar';
  const prefix = locale === 'ar' ? '/ar' : '';

  const productCategories = [
    { label: dict.nav.categories.vegetables, href: `${prefix}/products/vegetables` },
    { label: dict.nav.categories.fruits, href: `${prefix}/products/fruits` },
    { label: dict.nav.categories.leafyHerbs, href: `${prefix}/products/leafy-herbs` },
    { label: dict.nav.categories.specialtyGourmet, href: `${prefix}/products/specialty-gourmet` },
  ];

  const navigationLinks: NavigationLink[] = [
    { id: 'home', label: dict.nav.home, href: prefix || '/' },
    { id: 'company', label: dict.nav.company, href: `${prefix}/company` },
    { id: 'products', label: dict.nav.products, href: '#' },
    { id: 'services', label: dict.nav.services, href: `${prefix}/services` },
    { id: 'quality', label: dict.nav.quality, href: `${prefix}/quality` },
    { id: 'partners', label: dict.nav.partners, href: `${prefix}/partners` },
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled((prev) => {
            const next = window.scrollY > 20;
            return prev === next ? prev : next;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 transition-all duration-300">
      <div
        className={`max-w-[1140px] 2xl:max-w-[1240px] mx-auto rounded-full transition-all duration-300 px-5 sm:px-6 py-2.5 flex items-center justify-between border transform-gpu will-change-transform ${isScrolled
          ? 'bg-[#158647] backdrop-blur-md shadow-lg border-white/20'
          : 'bg-[#158647] backdrop-blur-sm shadow-md border-white/10'
          }`}
      >
        {/* Left: Brand Logo */}
        <Link
          href={prefix || '/'}
          className="relative flex items-center shrink-0 w-[86px] h-8 sm:h-9 focus-visible:outline-2 focus-visible:outline-white rounded"
          onClick={closeMobileMenu}
        >
          <Image
            src={locale === 'ar' ? '/LogoAR.webp' : '/LogoEN.webp'}
            alt="Nairat Food Services"
            width={86}
            height={36}
            className="h-8 sm:h-9 w-auto object-contain rounded-md"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-5">
          {navigationLinks.map((link) => {
            const isProducts = link.id === 'products';
            const isActive = isProducts
              ? pathname.startsWith(`${prefix}/products`) || pathname.startsWith('/products')
              : link.href === (prefix || '/')
                ? pathname === (prefix || '/')
                : pathname.startsWith(link.href);

            if (isProducts) {
              return (
                <div
                  key={link.id}
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
                    className={`inline-flex items-center gap-1.5 font-sans text-xs xl:text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white rounded px-2.5 py-1 tracking-[-0.01em] cursor-pointer ${isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white'
                      }`}
                    aria-haspopup="true"
                    aria-expanded={isProductsDropdownOpen}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-250 ${isProductsDropdownOpen ? 'rotate-180 text-white' : 'text-white/80'
                        }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`absolute bottom-1 start-2.5 end-7 h-0.5 bg-white transition-transform duration-200 rounded-full ${isActive || isProductsDropdownOpen ? 'scale-x-100' : 'scale-x-0'
                        }`}
                    />
                  </button>

                  {/* Dropdown Menu matching JKH Fruits Reference */}
                  <div
                    className={`absolute top-full start-0 pt-2 min-w-[210px] transition-all duration-200 ease-out z-50 ${isProductsDropdownOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                      : 'opacity-0 translate-y-1.5 pointer-events-none invisible'
                      }`}
                  >
                    <div className="bg-[#158647] border border-white/20 rounded-2xl p-2 shadow-2xl backdrop-blur-lg flex flex-col gap-0.5 text-start">
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
                key={link.id}
                href={link.href}
                className={`font-sans text-xs xl:text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white rounded px-2.5 py-1 relative group tracking-[-0.01em] ${isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white'
                  }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 start-2.5 end-2.5 h-0.5 bg-white transition-transform duration-200 rounded-full ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Language Toggle + CTA Button, then the Menu Button below desktop */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Toggle Button: Shows العربية when in English, EN when in Arabic */}
            {isLanguageToggleEnabled && (
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center justify-center min-w-[50px] px-3.5 py-1.5 rounded-full border border-white/30 hover:border-white/70 bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs active:scale-95 tracking-wide"
                aria-label="Toggle language"
              >
                <span>{locale === 'en' ? 'العربية' : 'EN'}</span>
              </button>
            )}

            {/* Action CTA Button using CtaButton */}
            <CtaButton
              variant="white"
              href={`${prefix}/contact`}
              text={dict.common.contactUs}
            />
          </div>

          {/* Mobile & Tablet Actions: Language Toggle (phones only) + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {isLanguageToggleEnabled && (
              <button
                onClick={toggleLanguage}
                className="sm:hidden inline-flex items-center justify-center min-w-[44px] px-3 py-1.5 rounded-full border border-white/30 bg-white/10 text-white font-sans text-xs font-bold"
                aria-label="Toggle language"
              >
                <span>{locale === 'en' ? 'عربي' : 'EN'}</span>
              </button>
            )}

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
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#168749] border border-white/20 px-6 py-5 absolute top-full start-4 end-4 sm:start-6 sm:end-6 rounded-3xl mt-3 shadow-2xl backdrop-blur-lg">
          <nav className="flex flex-col gap-2">
            {navigationLinks.map((link) => {
              if (link.id === 'products') {
                return (
                  <div key={link.id} className="border-b border-white/10 py-1">
                    <button
                      type="button"
                      onClick={() => setIsMobileProductsOpen((prev) => !prev)}
                      className="flex items-center justify-between w-full font-sans text-base font-medium text-white hover:text-white/80 py-2 focus-visible:outline-2 focus-visible:outline-white rounded tracking-[-0.01em] cursor-pointer text-start"
                      aria-label="Toggle products menu"
                      aria-expanded={isMobileProductsOpen}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </button>

                    {isMobileProductsOpen && (
                      <div className="ps-3 pb-2 pt-1 flex flex-col gap-1 text-start">
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
                  key={link.id}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="font-sans text-base font-medium text-white hover:text-white/80 py-2.5 border-b border-white/10 focus-visible:outline-2 focus-visible:outline-white rounded tracking-[-0.01em] text-start"
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="sm:hidden pt-3 flex flex-col gap-2.5">
              {isLanguageToggleEnabled && (
                <button
                  onClick={() => {
                    toggleLanguage();
                    closeMobileMenu();
                  }}
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-full border border-white/30 bg-white/10 text-white font-sans text-sm font-semibold tracking-[-0.01em]"
                >
                  <span>{locale === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}</span>
                </button>
              )}

              <CtaButton
                variant="white"
                href={`${prefix}/contact`}
                onClick={closeMobileMenu}
                text={dict.common.contactUs}
                className="w-full justify-center"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
