import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'gsap', '@gsap/react', 'lenis'],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/company',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/company',
        permanent: true,
      },
      {
        source: '/aboutus',
        destination: '/company',
        permanent: true,
      },
      {
        source: '/who-we-are',
        destination: '/company',
        permanent: true,
      },
      {
        source: '/our-products',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/catalog',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/our-services',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/sourcing',
        destination: '/quality',
        permanent: true,
      },
      {
        source: '/quality-control',
        destination: '/quality',
        permanent: true,
      },
      {
        source: '/quality-assurance',
        destination: '/quality',
        permanent: true,
      },
      {
        source: '/our-partners',
        destination: '/partners',
        permanent: true,
      },
      {
        source: '/clients',
        destination: '/partners',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/contactus',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/contact?subject=careers',
        permanent: true,
      },
      {
        source: '/ar/about',
        destination: '/ar/company',
        permanent: true,
      },
      {
        source: '/ar/about-us',
        destination: '/ar/company',
        permanent: true,
      },
      {
        source: '/ar/our-products',
        destination: '/ar/products',
        permanent: true,
      },
      {
        source: '/ar/our-services',
        destination: '/ar/services',
        permanent: true,
      },
      {
        source: '/ar/contact-us',
        destination: '/ar/contact',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
