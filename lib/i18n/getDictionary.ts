import { Locale, Dictionary } from './types';
import { en } from './dictionaries/en';
import { ar } from './dictionaries/ar';

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ar,
};

export function getDictionary(locale: Locale = 'en'): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}
