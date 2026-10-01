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

export function Footer() {
  const { locale, dict } = useLocale();
  const prefix = locale === 'ar' ? '/ar' : '';

  const footerNavLinks: FooterNavLink[] = [
    { label: dict.nav.company, href: `${prefix}/company` },
    { label: dict.nav.services, href: `${prefix}/services` },
    { label: dict.nav.quality, href: `${prefix}/quality` },
    { label: dict.nav.partners, href: `${prefix}/partners` },
    { label: dict.common.contactUs, href: `${prefix}/contact` },
  ];

  return (
    <footer className="bg-white text-[#111814] pt-10 sm:pt-12 2xl:pt-16 pb-8 2xl:pb-10 border-t border-neutral-200">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 2xl:space-y-10">

        {/* Top Section: Logo (Left) | "Go Fresh for Future" (Center) | CtaButton (Right) */}
        <div className="footer-content-item flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 md:gap-8">

          {/* Left: Brand Logo */}
          <div className="shrink-0 flex items-center">
            <Link href={prefix || '/'} className="inline-block">
              <div className="relative h-12 min-[380px]:h-14 sm:h-16 md:h-20 aspect-[2.4/1]">
                <Image
                  src={locale === 'ar' ? '/LogoAR.webp' : '/LogoEN.webp'}
                  alt="Nairat Food Services"
                  fill
                  sizes="(max-width: 640px) 140px, 192px"
                  className="object-contain rounded-md"
                  loading="lazy"
                />
              </div>
            </Link>
          </div>

          {/* Center: Bold Headline */}
          <div className="text-start md:text-center">
            <h2 className="font-display font-medium text-[20px] min-[380px]:text-[22px] min-[480px]:text-2xl sm:text-3xl lg:text-4xl text-[#111814] tracking-[-0.03em] leading-tight">
              {locale === 'ar' ? 'طازجة دائماً نحو المستقبل' : 'Go Fresh for Future'}
            </h2>
          </div>

          {/* Right: Reusable CtaButton */}
          <div className="shrink-0 self-start md:self-auto">
            <CtaButton href={`${prefix}/company`} text={dict.common.learnMore} />
          </div>

        </div>

        {/* Divider 1 */}
        <div className="w-full border-t border-neutral-200" />

        {/* Middle Section: Social Icons | Horizontal Navigation */}
        <div className="footer-content-item flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">

          {/* Social Icons (Instagram) */}
          <div className="flex items-center gap-3.5 sm:gap-4 shrink-0">
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
              <Link
                key={link.label}
                href={link.href}
                className="font-sans text-xs min-[380px]:text-[13px] sm:text-sm font-medium text-[#6B7280] hover:text-[#168849] transition-colors tracking-[-0.01em]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

        </div>

        {/* Divider 2 */}
        <div className="w-full border-t border-neutral-200" />

        {/* Bottom Section: Copyright | Terms & Privacy | Credits */}
        <div className="footer-content-item flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 text-[11px] min-[380px]:text-xs text-[#9CA3AF] font-normal text-start">
          <p className="text-start">
            {locale === 'ar'
              ? `جميع الحقوق محفوظة © ${new Date().getFullYear()} نيرات للخدمات الغذائية.`
              : `Copyright © ${new Date().getFullYear()} Nairat Food Services. All rights reserved.`}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[#6B7280] text-start">
            <Link href="#privacy" className="hover:text-[#168849] transition-colors">
              {dict.footer.privacyPolicy}
            </Link>
            <span className="text-neutral-300">•</span>
            <Link href="#terms" className="hover:text-[#168849] transition-colors">
              {dict.footer.termsOfService}
            </Link>
          </div>

          <p className="text-start">
            {locale === 'ar' ? 'تصميم شركة سكاي نت سوليوشنز ذ.م.م' : 'Designed by Skynet Solutions WLL'}
          </p>
        </div>

      </div>
    </footer>
  );
}
