'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

interface CountUpProps {
  /** The finished figure, e.g. "20" or "5,000 m²". Text without a number is shown as it is. */
  value: string;
  className?: string;
}

const FIGURE_PATTERN = /^(\D*)(\d[\d,]*)(.*)$/;

/** Counts a figure up from zero the first time it scrolls into view. */
export function CountUp({ value, className }: CountUpProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = elementRef.current;
      const parts = value.match(FIGURE_PATTERN);
      if (!element || !parts) return;

      const [, prefix, digits, suffix] = parts;
      const target = Number(digits.replace(/,/g, ''));
      const format = (current: number) =>
        `${prefix}${digits.includes(',') ? current.toLocaleString('en-US') : current}${suffix}`;

      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const counter = { current: 0 };
        gsap.to(counter, {
          current: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          onStart: () => (element.textContent = format(0)),
          onUpdate: () => (element.textContent = format(Math.floor(counter.current))),
          onComplete: () => (element.textContent = value),
        });

        return () => (element.textContent = value);
      });
    },
    { scope: elementRef, dependencies: [value] }
  );

  return (
    <span ref={elementRef} className={className}>
      {value}
    </span>
  );
}
