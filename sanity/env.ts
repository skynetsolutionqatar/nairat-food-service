/**
 * Sanity Environment Configuration
 * Project: Nairat Food Services (chjf5z1y)
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'chjf5z1y';

export const useCdn = process.env.NODE_ENV === 'production';

export function isSanityConfigured(): boolean {
  return Boolean(projectId && projectId.length > 0);
}
