import { productCategoriesData, ProductItem } from '@/data/products';

export interface ProductRail {
  slug: 'fruits' | 'vegetables';
  label: { en: string; ar: string };
  tone: 'green' | 'forest';
  products: ProductItem[];
}

function pickProducts(slug: string, productIds: string[]): ProductItem[] {
  const catalog = productCategoriesData[slug].products;
  return productIds.flatMap((id) => catalog.find((product) => product.id === id) ?? []);
}

/** The two home page rails, four hero products each. */
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
];
