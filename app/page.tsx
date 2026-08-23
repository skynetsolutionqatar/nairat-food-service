import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Placeholder */}
      <section className="bg-brand-forest text-white py-24 px-6 md:px-8 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-block font-mono text-xs uppercase tracking-widest text-brand-saffron bg-brand-saffron/10 px-3 py-1 rounded-full border border-brand-saffron/20">
            Phase 1 • Milestone 2 Scaffolding
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Fresh from the Source. <br />
            <span className="text-brand-lime">Delivered Across Qatar.</span>
          </h1>
          <p className="font-sans text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            Nairat Food Services is Qatar’s premium fresh produce importer, wholesaler, and cold-chain distributor.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <a
              href="#about"
              className="bg-brand-lime hover:bg-brand-lime/90 text-white font-sans text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-lime focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Learn More
            </a>
            <a
              href="#products"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-sans text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Browse Products
            </a>
          </div>
        </div>
      </section>

      {/* Scaffolding Section */}
      <section className="bg-neutral-bg-soft py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-forest/5 space-y-4">
            <h3 className="font-display font-bold text-xl text-brand-forest">01. Global Sourcing</h3>
            <p className="font-sans text-sm text-neutral-text-muted leading-relaxed">
              Importing directly from trusted growers across five continents to ensure consistent, premium quality.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-forest/5 space-y-4">
            <h3 className="font-display font-bold text-xl text-brand-forest">02. Cold-Chain Integrity</h3>
            <p className="font-sans text-sm text-neutral-text-muted leading-relaxed">
              Unbroken cold-chain warehousing and distribution network preserving peak freshness from farm to table.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-forest/5 space-y-4">
            <h3 className="font-display font-bold text-xl text-brand-forest">03. B2B & Retail Scale</h3>
            <p className="font-sans text-sm text-neutral-text-muted leading-relaxed">
              Equipped to supply hypermarkets, luxury hospitality, and premium home-delivery demands throughout Qatar.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
