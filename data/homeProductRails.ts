import { productCategoriesData, ProductItem } from '@/data/products';

export interface ProductRail {
  slug: 'fruits' | 'vegetables' | 'leafy-herbs' | 'specialty-gourmet';
  label: { en: string; ar: string };
  tone: 'green' | 'forest';
  products: ProductItem[];
}

function pickProducts(slug: string, productIds: string[]): ProductItem[] {
  const catalog = productCategoriesData[slug].products;
  return productIds.flatMap((id) => catalog.find((product) => product.id === id) ?? []);
}

/** One rail per product category, four hero products each. The home page shows them two at a time. */
export const homeProductRails: ProductRail[] = [
  {
    slug: 'fruits',
    label: { en: 'Fresh Fruits', ar: 'فواكه طازجة' },
    tone: 'green',
    products: pickProducts('fruits', ['watermelon', 'citrus', 'grapes', 'mango']),
  },
  {
    slug: 'vegetables',
    label: { en: 'Vegetables', ar: 'خضروات' },
    tone: 'forest',
    products: pickProducts('vegetables', ['tomatoes', 'capsicum', 'cauliflower', 'potatoes']),
  },
  {
    slug: 'leafy-herbs',
    label: { en: 'Leafy & Herbs', ar: 'ورقيات وأعشاب' },
    tone: 'green',
    products: pickProducts('leafy-herbs', ['lettuce', 'broccoli', 'beetroot', 'fresh-herbs']),
  },
  {
    slug: 'specialty-gourmet',
    label: { en: 'Specialty & Gourmet', ar: 'أصناف خاصة وفاخرة' },
    tone: 'forest',
    products: pickProducts('specialty-gourmet', ['exotic-mushrooms', 'passion-fruit', 'dragon-fruit', 'black-figs']),
  },
];

const RAILS_PER_SLIDE = 2;

/** Rails grouped into the slides the home page rotates through. */
export const homeProductSlides: ProductRail[][] = homeProductRails.reduce<ProductRail[][]>((slides, rail, index) => {
  if (index % RAILS_PER_SLIDE === 0) slides.push([]);
  slides[slides.length - 1].push(rail);
  return slides;
}, []);
