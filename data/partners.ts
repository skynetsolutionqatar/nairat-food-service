/**
 * Nairat Food Services — Official Partners Data (2026)
 * Source of truth for commercial retail, wholesale, quick-commerce, and agricultural partners.
 */

export interface PartnerItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  category: 'hypermarket' | 'supermarket' | 'quick-commerce' | 'wholesale' | 'agriculture';
  image: string;
  className?: string;
  featured?: boolean;
}

export const partnerLogos: PartnerItem[] = [
  {
    id: 'almeera',
    name: 'Al Meera',
    nameAr: 'الميرة',
    description: 'Al Meera',
    category: 'hypermarket',
    image: '/partners/almeera-logo-b.svg',
    className: 'h-7 sm:h-8 md:h-9 max-w-[130px] sm:max-w-[150px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'lulu',
    name: 'LuLu Hypermarket',
    nameAr: 'لولو هايبرماركت',
    description: 'LuLu Hypermarket',
    category: 'hypermarket',
    image: '/partners/lulu-logo.png',
    className: 'h-7 sm:h-8 md:h-9 max-w-[115px] sm:max-w-[135px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'carrefour',
    name: 'Carrefour Qatar',
    nameAr: 'كارفور قطر',
    description: 'Carrefour Qatar',
    category: 'hypermarket',
    image: '/partners/careefour.svg',
    className: 'h-7 sm:h-8 md:h-9 max-w-[125px] sm:max-w-[145px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'safari',
    name: 'Safari Hypermarket',
    nameAr: 'سفاري هايبرماركت',
    description: 'Safari Hypermarket',
    category: 'hypermarket',
    image: '/partners/safari-hypermarket-logo.png',
    className: 'h-11 sm:h-13 md:h-14 max-w-[55px] sm:max-w-[65px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'grand',
    name: 'Grand Mall',
    nameAr: 'جراند مول',
    description: 'Grand Mall',
    category: 'hypermarket',
    image: '/partners/grand-logo.webp',
    className: 'h-8 sm:h-9 md:h-10 max-w-[85px] sm:max-w-[100px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'rawabi',
    name: 'Rawabi Hypermarket',
    nameAr: 'روابي هايبرماركت',
    description: 'Rawabi Hypermarket',
    category: 'hypermarket',
    image: '/partners/rawabi-hypermarket.svg',
    className: 'h-9 sm:h-10 md:h-11 max-w-[60px] sm:max-w-[70px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'saudia',
    name: 'Saudia Hypermarket',
    nameAr: 'السعودية هايبرماركت',
    description: 'Saudia Hypermarket',
    category: 'hypermarket',
    image: '/partners/saudia.png',
    className: 'h-11 sm:h-13 md:h-14 max-w-[65px] sm:max-w-[75px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'abcfresh',
    name: 'ABC Fresh',
    nameAr: 'إيه بي سي فريش',
    description: 'ABC Fresh',
    category: 'wholesale',
    image: '/partners/abc.webp',
    className: 'h-9 sm:h-11 md:h-12 max-w-[75px] sm:max-w-[90px] w-auto object-contain cursor-pointer',
  },
  {
    id: 'talabat',
    name: 'Talabat Mart',
    nameAr: 'طلبات مارت',
    description: 'Talabat Mart',
    category: 'quick-commerce',
    image: '/partners/talabat-mart.svg',
    className: 'h-6 sm:h-7 md:h-8 max-w-[125px] sm:max-w-[145px] w-auto object-contain cursor-pointer',
    featured: true,
  },
  {
    id: 'mahaseel',
    name: 'Mahaseel',
    nameAr: 'محاصيل',
    description: 'Mahaseel',
    category: 'agriculture',
    image: '/partners/mahaseel.png',
    className: 'h-9 sm:h-11 md:h-12 max-w-[75px] sm:max-w-[90px] w-auto object-contain cursor-pointer',
    featured: true,
  },
];
