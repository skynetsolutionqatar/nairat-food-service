export interface HomeServiceCard {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  imageUrl: string;
}

export const homeServiceCards: HomeServiceCard[] = [
  {
    title: 'Global Sourcing & Import',
    titleAr: 'التوريد العالمي والاستيراد',
    description: 'Direct relationships with growers and exporters across Europe, the Middle East and Asia.',
    descriptionAr: 'علاقات مباشرة مع المزارعين والمصدرين عبر أوروبا والشرق الأوسط وآسيا.',
    imageUrl: '/services/global-sourcing-import.webp',
  },
  {
    title: 'Retail Supply & Category Management',
    titleAr: 'توريد التجزئة وإدارة الفئات',
    description: 'Daily supply to hypermarket and supermarket chains, up to full fresh-section management.',
    descriptionAr: 'إمداد يومي لسلاسل الهايبرماركت والسوبرماركت، وصولاً إلى الإدارة الكاملة لقسم المنتجات الطازجة.',
    imageUrl: '/services/retail-supply-management.webp',
  },
  {
    title: 'Wholesale & Foodservice',
    titleAr: 'التوريد بالجملة والخدمات الغذائية',
    description: 'Bulk supply to wholesalers, caterers, restaurants and independent grocers.',
    descriptionAr: 'توريد بالجملة لتجار الجملة ومتعهدي التموين والمطاعم ومتاجر البقالة المستقلة.',
    imageUrl: '/services/wholesale-foodservice.webp',
  },
];
