interface SmoothScrollContext {
  pathname: string;
  pointerFine: boolean;
}

/** Routes that manage their own scroll containers and must keep native wheel scrolling. */
const nativeScrollRoutes = ['/studio'];

export function isNativeScrollRoute(pathname: string): boolean {
  return nativeScrollRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

/**
 * Lenis smooth scrolling runs only for mouse users on site pages. It hijacks wheel
 * events on the window, which breaks inner scroll panes such as Sanity Studio's.
 */
export function shouldUseSmoothScroll({ pathname, pointerFine }: SmoothScrollContext): boolean {
  return pointerFine && !isNativeScrollRoute(pathname);
}
