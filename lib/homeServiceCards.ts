import { homeServiceCards, type HomeServiceCard } from '../data/homeServiceCards';

type RawCard = Partial<HomeServiceCard> | null | undefined;

function toCard(raw: RawCard, index: number): HomeServiceCard | null {
  if (!raw?.title) return null;
  const fallback = homeServiceCards[index];
  return {
    title: raw.title,
    titleAr: raw.titleAr || raw.title,
    description: raw.description || '',
    descriptionAr: raw.descriptionAr || raw.description || '',
    imageUrl: raw.imageUrl || fallback?.imageUrl || homeServiceCards[0].imageUrl,
  };
}

/** Maps Sanity rows to home service cards, falling back to the local cards. */
export function resolveHomeServiceCards(rows: RawCard[] | null | undefined): HomeServiceCard[] {
  const cards = (rows ?? []).map(toCard).filter((card): card is HomeServiceCard => card !== null);
  return cards.length > 0 ? cards : homeServiceCards;
}
