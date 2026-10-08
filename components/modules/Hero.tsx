'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { CtaButton } from '../ui/CtaButton';
import { useLocale } from '@/context/LocaleContext';
import type { HomePageContent } from '@/sanity/lib/data';

interface HeroProps {
  content?: HomePageContent;
}

export function Hero({ content }: HeroProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { locale, dict } = useLocale();
  const prefix = locale === 'ar' ? '/ar' : '';
  const isAr = locale === 'ar';

  const titleLine1 = isAr
    ? (content?.heroTitleLine1Ar || dict.hero.titleLine1)
    : (content?.heroTitleLine1 || dict.hero.titleLine1);
  const titleLine2 = isAr
    ? (content?.heroTitleLine2Ar || dict.hero.titleLine2)
    : (content?.heroTitleLine2 || dict.hero.titleLine2);
  const subtitle = isAr
    ? (content?.heroSubtitleAr || dict.hero.subtitle)
    : (content?.heroSubtitle || dict.hero.subtitle);
  const ctaPrimary = isAr
    ? (content?.heroCtaPrimaryAr || dict.hero.ctaPrimary)
    : (content?.heroCtaPrimary || dict.hero.ctaPrimary);

  // Auto-recovery & resilient playback handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly set muted property on the DOM element for strict Safari/iOS policy
    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay prevented by browser power-saving mode
        });
      }
    };

    playVideo();

    let isIntersecting = true;

    // Pause playback when scrolled out of viewport to save GPU/CPU and battery
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (entry.isIntersecting) {
          playVideo();
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(video);

    // Auto-resume if tab becomes active after being in background or minimized
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && isIntersecting && video.paused) {
        playVideo();
      }
    };

    // Auto-resume if stream temporarily stalled or was waiting for buffer
    const handleStall = () => {
      if (video.paused && isIntersecting) {
        playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    video.addEventListener('waiting', handleStall);
    video.addEventListener('stalled', handleStall);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      video.removeEventListener('waiting', handleStall);
      video.removeEventListener('stalled', handleStall);
    };
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Initial page-load text reveal sequence with faster, responsive timing
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-title-line', {
        y: 22,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
      }).from(
        '.hero-sub-text',
        {
          y: 14,
          opacity: 0,
          duration: 0.42,
        },
        '-=0.35'
      ).from(
        '.hero-cta-btn',
        {
          y: 10,
          opacity: 0,
          duration: 0.38,
        },
        '-=0.25'
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
      {/* Background Video with preload="auto" and lightweight GPU rendering */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/hero-poster.webp"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover pointer-events-none origin-center will-change-transform transform-gpu"
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Minimal subtle gradient overlay only at the bottom for crisp text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent pointer-events-none" />

      {/* Main Content Container */}
      <div
        ref={contentRef}
        className="relative max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 min-[410px]:pt-28 sm:pt-36 pb-10 min-[410px]:pb-12 sm:pb-14 lg:pb-16 2xl:pb-20 z-10 w-full will-change-transform"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-5 min-[410px]:gap-6 lg:gap-10 2xl:gap-14 w-full">
          {/* DIV 1: Heading */}
          <div className="w-full lg:w-[60%] 2xl:w-[62%] text-start">
            <h1 className="font-display text-[22px] min-[360px]:text-[25px] min-[390px]:text-[28px] min-[410px]:text-[32px] sm:text-[36px] md:text-[44px] lg:text-[44px] xl:text-[52px] 2xl:text-[60px] font-bold text-white text-start tracking-[-0.035em] leading-[1.2] min-[410px]:leading-[1.18] sm:leading-[1.16] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              <span className="hero-title-line block sm:whitespace-nowrap">{titleLine1}</span>
              <span className="hero-title-line block sm:whitespace-nowrap mt-1 min-[410px]:mt-1.5 sm:mt-2.5">{titleLine2}</span>
            </h1>
          </div>

          {/* DIV 2: Subheading & CTA Button */}
          <div className="w-full lg:w-[40%] 2xl:w-[38%] flex flex-col justify-end items-start gap-4 min-[410px]:gap-5 2xl:gap-6 text-start">
            <p className="hero-sub-text font-sans text-[11.5px] min-[360px]:text-xs min-[410px]:text-[13px] sm:text-sm md:text-[14.5px] lg:text-[13.5px] xl:text-[14.5px] 2xl:text-base text-gray-200/90 leading-relaxed max-w-[42ch] sm:max-w-[48ch] lg:max-w-[42ch] xl:max-w-[46ch] 2xl:max-w-[50ch] text-justify">
              {subtitle}
            </p>

            <div className="hero-cta-btn">
              <CtaButton href={`${prefix}/contact`}>
                {ctaPrimary}
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





