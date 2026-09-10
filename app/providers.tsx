'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

import { gsap, ScrollTrigger } from '@/lib/gsap';

import { usePathname } from 'next/navigation';

import { LocaleProvider } from '@/context/LocaleContext';

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
      try {
        ScrollTrigger.refresh();
      } catch {
        // Ignore initial refresh if elements are settling
      }
    }, 100);

    const handleLoad = () => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // Ignore load refresh
      }
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

  // Auto-recover from production ChunkLoadError or stale deployment asset mismatches
  useEffect(() => {
    const handleChunkError = (event: ErrorEvent | PromiseRejectionEvent) => {
      const error = 'error' in event ? event.error : event.reason;
      const message = error?.message || (typeof error === 'string' ? error : '');
      const isChunkError =
        error?.name === 'ChunkLoadError' ||
        /Loading chunk [\w-]+ failed/i.test(message) ||
        /Failed to fetch dynamically imported module/i.test(message) ||
        /Failed to load resource: net::ERR_FILE_NOT_FOUND/i.test(message);

      if (isChunkError) {
        const lastReload = sessionStorage.getItem('last_chunk_reload');
        const now = Date.now();

        // Prevent infinite reload loops by allowing only 1 auto-reload every 15 seconds
        if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
          sessionStorage.setItem('last_chunk_reload', now.toString());
          window.location.reload();
        }
      }
    };

    window.addEventListener('error', handleChunkError);
    window.addEventListener('unhandledrejection', handleChunkError);

    return () => {
      window.removeEventListener('error', handleChunkError);
      window.removeEventListener('unhandledrejection', handleChunkError);
    };
  }, []);

  const pathname = usePathname();

  // Reset scroll to top and recalculate GSAP positions on route change
  useEffect(() => {
    // 1. Reset scroll to top
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);

    // 2. If navigating to an anchor hash (e.g., #delivering or #contact), safely preserve anchor positioning
    const hash = window.location.hash;
    if (hash && hash.length > 1 && hash !== '#') {
      try {
        const target = document.querySelector(hash);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target as HTMLElement, { immediate: true });
          } else {
            target.scrollIntoView();
          }
        }
      } catch {
        // Invalid selector hash, fall through
      }
    }

    // 3. Clean up only orphaned triggers whose DOM nodes are no longer in the document, then refresh
    const timer = setTimeout(() => {
      try {
        ScrollTrigger.getAll().forEach((trigger) => {
          const el = trigger.trigger;
          if (el && typeof el === 'object' && 'nodeType' in el && !document.body.contains(el as Node)) {
            trigger.kill();
          }
        });
        ScrollTrigger.refresh();
      } catch (err) {
        console.warn('ScrollTrigger refresh skipped on route change:', err);
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return (
    <LocaleProvider>
      <LenisContext.Provider value={lenis}>
        {children}
      </LenisContext.Provider>
    </LocaleProvider>
  );
}
