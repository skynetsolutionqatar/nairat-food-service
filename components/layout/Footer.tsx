'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const productLinks: FooterLink[] = [
  { label: 'Fresh Fruits', href: '#products' },
  { label: 'Premium Vegetables', href: '#products' },
  { label: 'Leafy & Herbs', href: '#products' },
  { label: 'Specialty Produce', href: '#products' },
];

const serviceLinks: FooterLink[] = [
  { label: 'B2B Wholesale & Retail', href: '#services' },
  { label: 'Grower Partnerships', href: '#services' },
  { label: 'Cold-Chain Logistics', href: '#services' },
  { label: 'Nairat Online Shop', href: '#services' },
];

const quickLinks: FooterLink[] = [
  { label: 'About Nairat', href: '#about' },
  { label: 'Global Sourcing Map', href: '#sourcing' },
  { label: 'Quality Standards', href: '#quality' },
  { label: 'Contact Us', href: '#contact' },
];

const legalLinks: FooterLink[] = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Sitemap', href: '#sitemap' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-forest text-white border-t border-brand-lime/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Main Footer Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2">
            <Link href="#home" className="flex items-center gap-2 mb-6">
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                NAIRAT
              </span>
              <span className="font-display text-xs text-brand-saffron tracking-wider font-semibold border-s border-white/20 ps-2 uppercase">
                Food Services
              </span>
            </Link>
            <p className="font-sans text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              Established in Qatar, Nairat Food Services is a premier supplier, wholesaler, and distributor of farm-fresh fruits and vegetables sourced globally through certified cold-chain networks.
            </p>
            <div className="flex flex-col gap-3 font-sans text-sm text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-lime shrink-0 mt-0.5" aria-hidden="true" />
                <span>Salwa Road, Doha, State of Qatar</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-lime shrink-0" aria-hidden="true" />
                <a href="tel:+97446471511" className="hover:text-brand-lime transition-colors">
                  +974 4647 1511
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-lime shrink-0" aria-hidden="true" />
                <a href="mailto:info@nairatfood.com" className="hover:text-brand-lime transition-colors">
                  info@nairatfood.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="font-display font-bold text-base tracking-wide text-brand-saffron mb-6 uppercase">
              Products
            </h3>
            <ul className="flex flex-col gap-3.5 font-sans text-sm text-white/70">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-brand-lime transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-display font-bold text-base tracking-wide text-brand-saffron mb-6 uppercase">
              Services
            </h3>
            <ul className="flex flex-col gap-3.5 font-sans text-sm text-white/70">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-brand-lime transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h3 className="font-display font-bold text-base tracking-wide text-brand-saffron mb-6 uppercase">
              Company
            </h3>
            <ul className="flex flex-col gap-3.5 font-sans text-sm text-white/70">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-brand-lime transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-sans text-xs text-white/50 text-center md:text-left">
            &copy; {currentYear} Nairat Food Services. All rights reserved. Built for Qatar.
          </p>
          <div className="flex gap-6 font-sans text-xs text-white/50">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-brand-lime transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
