import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Amazonbot'],
        allow: '/',
        disallow: ['/api/', '/studio/'],
      },
    ],
    sitemap: 'https://nairatfoodservices.com/sitemap.xml',
  };
}
