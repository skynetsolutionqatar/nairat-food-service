import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });

  const originalRefresh = ScrollTrigger.refresh.bind(ScrollTrigger);
  ScrollTrigger.refresh = ((safe?: boolean) => {
    try {
      return originalRefresh(safe);
    } catch (error) {
      console.warn('ScrollTrigger refresh safely caught:', error);
    }
  }) as typeof ScrollTrigger.refresh;
}

export { gsap, ScrollTrigger, useGSAP };
