export const siteConfig = {
  name: 'Nairat Food Services',
  legalName: 'Nairat Food Services W.L.L',
  description:
    'Qatar’s leading fresh-produce supplier, importing and distributing premium fresh fruits and vegetables to retailers, wholesalers, food-service businesses, and homes across Qatar.',
  url: 'https://nairatfoodservices.com',
  crNumber: '144352',
  contact: {
    address: 'Industrial Area, Street 37, Doha, Qatar',
    email: 'info@nairat.net',
    emailAlt: 'info@nairatfoodservices.com',
    tel: '+974 4429 0400',
    telSecondary: '+974 4429 0300',
    mobile: '+974 3104 3814',
    whatsapp: '+974 5032 9385',
    whatsappUrl: 'https://wa.me/97450329385',
  },
  social: {
    instagram: 'https://www.instagram.com/nairatshop',
  },
  nav: [
    { label: 'Company', href: '/company' },
    { label: 'Our Products', href: '/products/vegetables' },
    { label: 'Services', href: '/services' },
    { label: 'Sourcing & Quality', href: '/quality' },
    { label: 'Partners', href: '/partners' },
    { label: 'Careers', href: '/contact?subject=careers' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

export type SiteConfig = typeof siteConfig;
