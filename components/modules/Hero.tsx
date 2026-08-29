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
      className="relative min-h-[90vh] flex flex-col justify-end bg-[#052618] overflow-hidden px-4 sm:px-8"
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
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-black/10 pointer-events-none" />

      {/* Main Content Container */}
      <div
        ref={contentRef}
        className="relative max-w-[1440px] mx-auto px-4 sm:px-6 pt-36 pb-16 lg:pb-20 z-10 w-full"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-14 w-full">
          {/* DIV 1: Heading */}
          <div className="w-full lg:w-[64%] text-left">
            <h1 className="font-display type-display font-medium text-white text-left">
              <span className="hero-title-line block sm:whitespace-nowrap">Fresh from the Source.</span>
              <span className="hero-title-line block sm:whitespace-nowrap mt-1.5 sm:mt-2">Delivered Across Qatar.</span>
            </h1>
          </div>

          {/* DIV 2: Subheading & CTA Button */}
          <div className="hero-sub-text w-full lg:w-[36%] flex flex-col justify-end items-start gap-6 text-left">
            <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed max-w-[48ch] text-left">
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





