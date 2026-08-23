'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Compass } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

const companyLinks: FooterLink[] = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Strengths', href: '#strengths' },
  { label: 'Careers', href: '#careers' },
  { label: 'News & Updates', href: '#news' },
];

const productLinks: FooterLink[] = [
  { label: 'Fruits', href: '#products' },
  { label: 'Vegetables', href: '#products' },
  { label: 'Leafy & Herbs', href: '#products' },
  { label: 'Specialty', href: '#products' },
];

const serviceLinks: FooterLink[] = [
  { label: 'Retail & Wholesale', href: '#services' },
  { label: 'Grower Partnerships', href: '#services' },
  { label: 'Nairat Shop', href: '#services' },
];

const sourcingLinks: FooterLink[] = [
  { label: 'Global Sourcing', href: '#sourcing' },
  { label: 'Our Partners', href: '#partners' },
  { label: 'Quality & Certifications', href: '#quality' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-forest text-white border-t border-brand-lime/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Main Footer Links Grid (5 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          
          {/* Column 1: Brand Info (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="#home" className="flex items-center gap-2">
              <div className="flex flex-col text-left">
                <span className="font-display font-extrabold text-2xl tracking-tight text-white leading-none">
                  na<span className="relative inline-block">ı<span className="absolute -top-1.5 left-px w-2 h-3.5 bg-brand-lime rounded-full rounded-tr-none rotate-12" /></span>rat
                </span>
                <span className="font-sans text-[7px] text-white/70 tracking-[0.3em] font-extrabold uppercase mt-1 leading-none">
                  Food Services
                </span>
              </div>
            </Link>
            
            <p className="font-sans text-white/70 text-sm leading-relaxed max-w-sm">
              Connecting Qatar with the world’s best fresh produce through quality, reliability and care.
            </p>
            
            {/* Social Icons row */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3.6L16 8h-3V6.3C13 5.4 13.5 5 14.5 5H16V2h-2.5C10.5 2 9 3.5 9 6.3V8z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://wa.me/97431043814" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors" aria-label="WhatsApp">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.488 1.977 14.03 1.053 11.4 1.053c-5.437 0-9.86 4.37-9.864 9.8.002 2.13.56 4.208 1.614 6.014l-.996 3.636 3.737-.972zm11.237-7.603c-.3-.15-1.772-.875-2.046-.975-.276-.1-.477-.15-.677.15-.2.3-.777.975-.951 1.174-.176.2-.351.224-.652.074-1.43-.715-2.458-1.321-3.444-3.007-.26-.445.26-.413.743-1.38.08-.163.04-.306-.02-.455-.06-.15-.477-1.15-.652-1.574-.171-.41-.345-.353-.477-.36l-.407-.007c-.14 0-.37.052-.564.26-.194.208-.742.728-.742 1.776 0 1.05.762 2.062.868 2.212.106.15 1.5 2.29 3.634 3.21.507.219.904.35 1.214.448.51.162.974.139 1.341.084.41-.061 1.772-.726 2.022-1.428.25-.702.25-1.303.176-1.428-.075-.125-.275-.201-.575-.351z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-6">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-brand-lime">
              Company
            </h3>
            <ul className="space-y-3 font-sans text-sm text-white/70">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-brand-lime transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="space-y-6">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-brand-lime">
              Products
            </h3>
            <ul className="space-y-3 font-sans text-sm text-white/70">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-brand-lime transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Services */}
          <div className="space-y-6">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-brand-lime">
              Services
            </h3>
            <ul className="space-y-3 font-sans text-sm text-white/70">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-brand-lime transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Sourcing */}
          <div className="space-y-6">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-brand-lime">
              Sourcing
            </h3>
            <ul className="space-y-3 font-sans text-sm text-white/70">
              {sourcingLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-brand-lime transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 6: Contact Us */}
          <div className="space-y-6">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-brand-lime">
              Contact Us
            </h3>
            <div className="space-y-4 font-sans text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-lime shrink-0" />
                <a href="tel:+97446471511" className="hover:text-brand-lime transition-colors">
                  +974 4647 1511
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-lime shrink-0" />
                <a href="mailto:info@nairatfood.com" className="hover:text-brand-lime transition-colors">
                  info@nairatfood.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-lime shrink-0 mt-0.5" />
                <span>P.O. Box 30858, Doha, Qatar</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-lime shrink-0" />
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-lime transition-colors font-bold">
                  Open on Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-sans text-xs text-white/50 text-center md:text-left">
            &copy; {currentYear} Nairat Food Services. All rights reserved.
          </p>
          <div className="flex gap-6 font-sans text-xs text-white/50">
            <Link href="#privacy" className="hover:text-brand-lime transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-brand-lime transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
