import { RefObject } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

const REVEAL_FROM = { opacity: 0, y: 18 };
const REVEAL_TO = { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out', clearProps: 'opacity,transform' };

/**
 * Staggers each selector group into view once, when the section scrolls in.
 * Skipped on phones and for visitors who prefer reduced motion.
 */
export function useSectionReveal(containerRef: RefObject<HTMLElement | null>, selectors: string[]) {
  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const media = gsap.matchMedia();
      media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: container, start: 'top 88%', once: true },
        });

        selectors.forEach((selector, index) => {
          const targets = container.querySelectorAll(selector);
          if (targets.length === 0) return;
          timeline.fromTo(targets, REVEAL_FROM, REVEAL_TO, index === 0 ? 0 : '-=0.25');
        });
      });
    },
    { scope: containerRef }
  );
}
