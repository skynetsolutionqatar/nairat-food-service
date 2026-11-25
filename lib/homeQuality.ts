import { homeQualityCertificates, homeQualitySteps, type HomeQualityStep } from '../data/homeQuality';

type RawStep = Partial<HomeQualityStep> | null | undefined;

function toStep(raw: RawStep): HomeQualityStep | null {
  if (!raw?.title) return null;
  return {
    title: raw.title,
    titleAr: raw.titleAr || raw.title,
    description: raw.description || '',
    descriptionAr: raw.descriptionAr || raw.description || '',
  };
}

/** Maps Sanity rows to quality steps, falling back to the local steps. */
export function resolveQualitySteps(rows: RawStep[] | null | undefined): HomeQualityStep[] {
  const steps = (rows ?? []).map(toStep).filter((step): step is HomeQualityStep => step !== null);
  return steps.length > 0 ? steps : homeQualitySteps;
}

/** Keeps non-empty certificate labels, falling back to the local labels. */
export function resolveQualityCertificates(labels: (string | null)[] | null | undefined): string[] {
  const kept = (labels ?? []).map((label) => label?.trim() ?? '').filter(Boolean);
  return kept.length > 0 ? kept : homeQualityCertificates;
}
