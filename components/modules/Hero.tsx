'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { CtaButton } from '../ui/CtaButton';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax effect on background video when scrolling down (compositor optimized)
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 15,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Smooth fade & move content down on scroll
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: 40,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'center center',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Initial page-load text reveal sequence with rich timing
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-title-line', {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
      }).from(
        '.hero-sub-text',
        {
          y: 20,
          opacity: 0,
          duration: 0.7,
        },
        '-=0.5'
      ).from(
        '.hero-cta-btn',
        {
          y: 15,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.4'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[88vh] flex flex-col justify-end bg-[#052618] overflow-hidden px-4 sm:px-8"
    >
      {/* Background Video with enhanced sharpness & vibrancy */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.webp"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover pointer-events-none origin-center will-change-transform transform-gpu brightness-[1.03] contrast-[1.05] saturate-[1.08]"
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Minimal subtle gradient overlay only at the bottom for crisp text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />

      {/* Main Content Container */}
      <div
        ref={contentRef}
        className="relative max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-14 lg:pb-16 2xl:pb-20 z-10 w-full will-change-transform"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-10 2xl:gap-14 w-full">
          {/* DIV 1: Heading */}
          <div className="w-full lg:w-[62%] text-left">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[54px] 2xl:text-[60px] font-bold text-white text-left tracking-[-0.035em] leading-[1.16] sm:leading-[1.18] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              <span className="hero-title-line block sm:whitespace-nowrap">Fresh from the Source.</span>
              <span className="hero-title-line block sm:whitespace-nowrap mt-1.5 sm:mt-2.5">Delivered Across Qatar.</span>
            </h1>
          </div>

          {/* DIV 2: Subheading & CTA Button */}
          <div className="w-full lg:w-[38%] flex flex-col justify-end items-start gap-5 2xl:gap-6 text-left">
            <p className="hero-sub-text font-sans text-xs sm:text-[13px] 2xl:text-[14px] text-gray-300 leading-relaxed max-w-[44ch] 2xl:max-w-[48ch] text-justify">
              Nairat Food imports, distributes and delivers premium fresh fruit and vegetables to Qatar’s leading supermarkets, markets and homes – every day of the year.
            </p>

            <div className="hero-cta-btn">
              <CtaButton href="#contact">
                Partner With Us
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





