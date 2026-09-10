'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageBannerProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  description?: string;
  className?: string;
  showWatermark?: boolean;
}

export function PageBanner({
  title = 'Company',
  breadcrumbs,
  description,
  className = '',
  showWatermark = true,
}: PageBannerProps): React.ReactNode {
  const bannerRef = useRef<HTMLElement>(null);
  const resolvedBreadcrumbs: BreadcrumbItem[] =
    breadcrumbs && breadcrumbs.length > 0
      ? breadcrumbs
      : [
          { label: 'Home', href: '/' },
          { label: title },
        ];

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.banner-anim-title',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65 }
      );
      if (description) {
        tl.fromTo(
          '.banner-anim-desc',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.4'
        );
      }
      tl.fromTo(
        '.banner-anim-breadcrumbs',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45 },
        '-=0.35'
      );
    },
    { scope: bannerRef }
  );

  return (
    <section
      ref={bannerRef}
      className={`relative pt-28 pb-10 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-14 bg-[#158647] text-white overflow-hidden ${className}`}
    >
      {/* Decorative Organic Brand Watermark */}
      {showWatermark && (
        <div className="absolute -right-8 -bottom-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 opacity-[0.08] pointer-events-none select-none">
          <Image
            src="/icon/icon.png"
            alt=""
            fill
            sizes="320px"
            className="object-contain"
            aria-hidden="true"
          />
        </div>
      )}

      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="banner-anim-title font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          {title}
        </h1>

        {description && (
          <p className="banner-anim-desc mt-2 text-sm sm:text-base text-white/90 max-w-2xl font-sans leading-relaxed">
            {description}
          </p>
        )}

        <nav
          aria-label="Breadcrumb"
          className="banner-anim-breadcrumbs mt-2 sm:mt-2.5 flex items-center gap-2 text-xs sm:text-sm text-white/85 font-medium"
        >
          {resolvedBreadcrumbs.map((item, index) => {
            const isLast = index === resolvedBreadcrumbs.length - 1;

            return (
              <React.Fragment key={`${item.label}-${index}`}>
                {index > 0 && <span className="text-white/60">/</span>}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors underline-offset-2 hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white font-semibold">{item.label}</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </section>
  );
}

export const PageHeader = PageBanner;
export const CompanyHero = PageBanner;
