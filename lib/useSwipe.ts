import { TouchEvent, useRef } from 'react';

const MIN_SWIPE_PX = 45;

/** Touch handlers that report a horizontal swipe as -1 (towards the left) or 1 (towards the right). */
export function useSwipe(onSwipe: (direction: -1 | 1) => void) {
  const start = useRef({ x: 0, y: 0 });

  const onTouchStart = (event: TouchEvent) => {
    start.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };

  const onTouchEnd = (event: TouchEvent) => {
    const deltaX = event.changedTouches[0].clientX - start.current.x;
    const deltaY = event.changedTouches[0].clientY - start.current.y;
    const isHorizontal = Math.abs(deltaX) > MIN_SWIPE_PX && Math.abs(deltaX) > Math.abs(deltaY);
    if (isHorizontal) onSwipe(deltaX < 0 ? -1 : 1);
  };

  return { onTouchStart, onTouchEnd };
}
