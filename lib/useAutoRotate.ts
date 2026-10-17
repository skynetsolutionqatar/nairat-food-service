import { RefObject, useCallback, useEffect, useState } from 'react';

const FADE_MS = 200;

interface AutoRotateOptions {
  count: number;
  intervalMs: number;
  /** Rotation only runs while this element is on screen. */
  containerRef: RefObject<HTMLElement | null>;
}

function useInView(containerRef: RefObject<HTMLElement | null>): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [containerRef]);

  return inView;
}

/**
 * Steps through `count` slides on a timer, fading between them.
 * Pauses while off screen or while `setPaused(true)` is in effect, and never
 * starts for visitors who prefer reduced motion (they still get `goTo`).
 */
export function useAutoRotate({ count, intervalMs, containerRef }: AutoRotateOptions) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const inView = useInView(containerRef);

  const goTo = useCallback((next: number | ((current: number) => number)) => {
    setFading(true);
    window.setTimeout(() => {
      setIndex(next);
      setFading(false);
    }, FADE_MS);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || !inView || count < 2 || reducedMotion) return;

    const timer = window.setInterval(() => goTo((current) => (current + 1) % count), intervalMs);
    return () => window.clearInterval(timer);
  }, [paused, inView, count, intervalMs, goTo]);

  return { index, fading, goTo, setPaused };
}
