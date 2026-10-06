import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';
import { companyProfile } from '@/lib/config/company';

export const SITE_URL = 'https://nairatfoodservices.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/LogoEN.png`;

export interface AlternatesResult {
  canonical: string;
  languages: {
    en: string;
    ar: string;
    'x-default': string;
  };
}

export function getAlternates(pathname: string): AlternatesResult {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const isArabic = normalized === '/ar' || normalized.startsWith('/ar/');

  let enPath = normalized;
  let arPath = normalized;

  if (isArabic) {
    enPath = normalized === '/ar' ? '/' : normalized.replace(/^\/ar/, '');
  } else {
    arPath = normalized === '/' ? '/ar' : `/ar${normalized}`;
  }

  const canonicalUrl = `${SITE_URL}${normalized === '/' ? '' : normalized}`;
  const enUrl = `${SITE_URL}${enPath === '/' ? '' : enPath}`;
  const arUrl = `${SITE_URL}${arPath}`;

  return {
    canonical: canonicalUrl,
    languages: {
      en: enUrl,
      ar: arUrl,
      'x-default': enUrl,
    },
  };
}

export interface PageMetadataOptions {
  title: string;
  description: string;
  pathname: string;
  isArabic?: boolean;
  ogImage?: string;
}

export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const { title, description, pathname, isArabic = false, ogImage = DEFAULT_OG_IMAGE } = options;
  const alternates = getAlternates(pathname);
  const locale = isArabic ? 'ar_QA' : 'en_US';
  const alternateLocale = isArabic ? 'en_US' : 'ar_QA';
  const siteName = isArabic ? 'نيرات للخدمات الغذائية' : siteConfig.name;

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName,
      locale,
      alternateLocale: [alternateLocale],
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WholesaleStore',
    name: companyProfile.name,
    legalName: companyProfile.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/LogoEN.png`,
    description: siteConfig.description,
    foundingDate: companyProfile.establishedYear,
    telephone: siteConfig.contact.tel,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Street 37, Industrial Area',
      addressLocality: 'Doha',
      postalCode: '64040',
      addressCountry: 'QA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.1872',
      longitude: '51.4428',
    },
    hasCredential: companyProfile.certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Food Safety Certification',
      name: cert,
    })),
    sameAs: [
      siteConfig.social.instagram,
    ],
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
