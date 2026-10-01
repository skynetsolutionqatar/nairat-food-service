import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nairatfoodservices.com';
  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/ar', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/company', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/ar/company', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/products', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/ar/products', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/products/vegetables', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/ar/products/vegetables', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/products/fruits', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/ar/products/fruits', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/products/leafy-herbs', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/ar/products/leafy-herbs', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/products/specialty-gourmet', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/ar/products/specialty-gourmet', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/services', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/ar/services', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/quality', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/ar/quality', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/partners', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/ar/partners', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/ar/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/ar/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/ar/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
