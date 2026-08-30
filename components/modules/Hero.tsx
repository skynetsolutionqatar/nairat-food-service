'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CtaButton } from '../ui/CtaButton';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax effect on background video when scrolling down
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 18,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Fade & move content down on scroll
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: 50,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'center center',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Initial page-load text reveal sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-title-line', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
      }).from(
        '.hero-sub-text',
        {
          y: 25,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.6'
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
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.02] origin-center"
      >
        <source src="/hero.mp4" type="video/mp4" />
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero-bg.mp4" type="video/mp4" />
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for optimal text contrast and warmth */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/5 to-black/10 pointer-events-none" />

      {/* Main Content Container */}
      <div
        ref={contentRef}
        className="relative max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-14 lg:pb-16 2xl:pb-20 z-10 w-full"
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
          <div className="hero-sub-text w-full lg:w-[38%] flex flex-col justify-end items-start gap-5 2xl:gap-6 text-left">
            <p className="font-sans text-xs sm:text-[13px] 2xl:text-[14px] text-gray-300 leading-relaxed max-w-[44ch] 2xl:max-w-[48ch] text-justify">
              Nairat Food imports, distributes and delivers premium fresh fruit and vegetables to Qatar’s leading supermarkets, markets and homes – every day of the year.
            </p>

            <div>
              <CtaButton href="#products">
                Explore Our Products
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





