'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { LocaleProvider } from '@/context/LocaleContext';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    // Instantiate Lenis smooth scrolling with premium momentum
    const lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      lerp: 0.08,
    });

    queueMicrotask(() => {
      setLenis(lenisInstance);
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once Lenis and layout are initialized
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
      gsap.ticker.remove(tickerCb);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LocaleProvider>
      <LenisContext.Provider value={lenis}>
        {children}
      </LenisContext.Provider>
    </LocaleProvider>
  );
}
