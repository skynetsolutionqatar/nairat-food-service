'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Clock, ShieldCheck, Award, FileText, X } from 'lucide-react';

interface RegionData {
  id: string;
  name: string;
  countries: string[];
  produce: string[];
  transit: string;
  temp: string;
  activeCoordinates: { x: number; y: number }; // Coordinates on SVG map
}

const regions: RegionData[] = [
  {
    id: 'mideast',
    name: 'Middle East',
    countries: ['Oman', 'Jordan', 'Lebanon'],
    produce: ['Fresh Mint', 'Coriander', 'Peaches', 'Local Herbs'],
    transit: '1 - 3 Days (Land/Air)',
    temp: '4°C to 8°C (Chilled)',
    activeCoordinates: { x: 500, y: 190 },
  },
  {
    id: 'africa',
    name: 'Africa',
    countries: ['South Africa', 'Egypt', 'Kenya'],
    produce: ['Valencia Oranges', 'Egypt Onions', 'Baby Vegetables'],
    transit: '10 - 15 Days (Sea/Reefer)',
    temp: '2°C to 4°C (Chilled)',
    activeCoordinates: { x: 450, y: 280 },
  },
  {
    id: 'europe',
    name: 'Europe',
    countries: ['Italy', 'Spain', 'Netherlands'],
    produce: ['Royal Gala Apples', 'Iceberg Lettuce', 'Roma Tomatoes'],
    transit: '12 - 18 Days (Sea)',
    temp: '3°C to 5°C (Chilled)',
    activeCoordinates: { x: 410, y: 120 },
  },
  {
    id: 'asia',
    name: 'Asia',
    countries: ['India', 'Thailand', 'China'],
    produce: ['Alphonso Mangoes', 'Red Onions', 'Rambutan', 'Ginger'],
    transit: '5 - 8 Days (Sea/Air)',
    temp: '8°C to 12°C (Varies)',
    activeCoordinates: { x: 620, y: 200 },
  },
  {
    id: 'americas',
    name: 'Americas',
    countries: ['Ecuador', 'Mexico', 'Peru'],
    produce: ['Cavendish Bananas', 'Hass Avocados', 'White Asparagus'],
    transit: '22 - 28 Days (Sea)',
    temp: '13°C to 15°C (Bananas Zone)',
    activeCoordinates: { x: 190, y: 260 },
  },
  {
    id: 'oceania',
    name: 'Oceania',
    countries: ['Australia', 'New Zealand'],
    produce: ['Red Grapes', 'Navel Oranges', 'Kiwi Fruit'],
    transit: '18 - 22 Days (Sea)',
    temp: '1°C to 3°C (Citrus Zone)',
    activeCoordinates: { x: 750, y: 320 },
  },
];

interface Certificate {
  id: string;
  name: string;
  code: string;
  issuer: string;
  scope: string;
}

const certificates: Certificate[] = [
  {
    id: 'haccp',
    name: 'HACCP Certified',
    code: 'HA-2026-9482',
    issuer: 'SGS International Services',
    scope: 'Hazard analysis, temperature log consistency, and food safety risk mitigation protocols.',
  },
  {
    id: 'iso22000',
    name: 'ISO 22000:2018',
    code: 'ISO-22000-Q-938',
    issuer: 'Bureau Veritas Certification',
    scope: 'Global food safety management standards covering import, storage, and distribution operations.',
  },
];

export function SourcingMap() {
  const [selectedRegion, setSelectedRegion] = useState<string>('mideast');
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);

  const currentRegion = regions.find((r) => r.id === selectedRegion) || regions[0];

  return (
    <section id="sourcing" className="py-24 bg-neutral-bg-soft">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-lime font-bold">
            GLOBAL SOURCING
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-forest tracking-tight">
            Sourced From Around the World
          </h2>
          <p className="font-sans text-neutral-text-muted text-base">
            Click region tabs below to inspect logistic networks, transit times, and temperature-controlled transport profiles.
          </p>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Region Selectors & Info Card (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Tabs */}
            <div className="grid grid-cols-3 gap-2">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`font-sans text-xs font-bold py-3 px-2 rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-lime ${
                    selectedRegion === region.id
                      ? 'bg-brand-forest text-white shadow-sm'
                      : 'bg-white text-neutral-text-muted hover:bg-brand-forest/5 border border-brand-forest/5'
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-2xl p-6 border border-brand-forest/5 shadow-sm flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-brand-saffron font-bold uppercase tracking-wider block">
                  Region Logistics Data
                </span>
                <h3 className="font-display font-extrabold text-2xl text-brand-forest">
                  {currentRegion.name} Network
                </h3>
                
                <div className="space-y-3 font-sans text-sm">
                  <div className="flex items-center gap-3 text-neutral-text-dark">
                    <Globe className="w-5 h-5 text-brand-lime shrink-0" aria-hidden="true" />
                    <span><strong>Countries:</strong> {currentRegion.countries.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-text-dark">
                    <Clock className="w-5 h-5 text-brand-lime shrink-0" aria-hidden="true" />
                    <span><strong>Transit Time:</strong> {currentRegion.transit}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-text-dark">
                    <ShieldCheck className="w-5 h-5 text-brand-lime shrink-0" aria-hidden="true" />
                    <span><strong>Reefer Settings:</strong> {currentRegion.temp}</span>
                  </div>
                </div>
              </div>

              {/* Sourced produce tags */}
              <div className="space-y-2.5 pt-4 border-t border-brand-forest/5">
                <span className="font-sans text-xs font-bold text-neutral-text-muted uppercase tracking-wider block">
                  Key Imports Sourced
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentRegion.produce.map((p) => (
                    <span
                      key={p}
                      className="font-sans text-xs font-semibold text-brand-forest bg-brand-forest/5 py-1 px-3 rounded-full border border-brand-forest/5"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Column 2: Interactive SVG World Map (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-brand-forest rounded-3xl p-6 shadow-md flex items-center justify-center relative min-h-[300px] border border-white/5 overflow-hidden">
            {/* Abstract Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Stylized Network Sourcing Map */}
            <svg viewBox="0 0 900 450" className="w-full h-auto relative z-10 select-none">
              {/* Qatar Base Terminal Anchor Node */}
              <circle cx="530" cy="200" r="8" fill="#E2B93C" className="animate-ping" />
              <circle cx="530" cy="200" r="5" fill="#E2B93C" />
              <text x="530" y="218" textAnchor="middle" fill="#FFFFFF" className="font-mono text-[9px] font-bold tracking-widest bg-brand-forest px-1">
                DOHA
              </text>

              {/* Sourcing Connection Lines to Qatar */}
              {regions.map((region) => {
                const isActive = selectedRegion === region.id;
                return (
                  <motion.path
                    key={`line-${region.id}`}
                    d={`M ${region.activeCoordinates.x} ${region.activeCoordinates.y} Q ${(region.activeCoordinates.x + 530)/2} ${Math.min(region.activeCoordinates.y, 200) - 30} 530 200`}
                    fill="none"
                    stroke={isActive ? '#E2B93C' : '#FFFFFF'}
                    strokeWidth={isActive ? '2' : '0.5'}
                    strokeOpacity={isActive ? '0.8' : '0.15'}
                    strokeDasharray={isActive ? '4 2' : 'none'}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                );
              })}

              {/* Sourcing Nodes representing continents */}
              {regions.map((region) => {
                const isActive = selectedRegion === region.id;
                return (
                  <g key={`node-${region.id}`} className="cursor-pointer" onClick={() => setSelectedRegion(region.id)}>
                    {isActive && (
                      <circle
                        cx={region.activeCoordinates.x}
                        cy={region.activeCoordinates.y}
                        r="14"
                        fill="#4AA658"
                        fillOpacity="0.3"
                        className="animate-pulse"
                      />
                    )}
                    <circle
                      cx={region.activeCoordinates.x}
                      cy={region.activeCoordinates.y}
                      r="6"
                      fill={isActive ? '#4AA658' : '#FFFFFF'}
                      fillOpacity={isActive ? '1' : '0.4'}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="transition-all duration-300"
                    />
                    <text
                      x={region.activeCoordinates.x}
                      y={region.activeCoordinates.y - 12}
                      textAnchor="middle"
                      fill={isActive ? '#E2B93C' : '#FFFFFF'}
                      fillOpacity={isActive ? '1' : '0.5'}
                      className="font-display font-semibold text-[10px]"
                    >
                      {region.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Column 3: Quality Certificate Cards (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-6 justify-between">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setActiveCertificate(cert)}
                className="bg-white rounded-2xl p-6 border border-brand-forest/5 shadow-sm hover:border-brand-lime/30 transition-all duration-300 cursor-pointer flex flex-col justify-between flex-1 group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-forest/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Award className="w-5 h-5 text-brand-forest" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-lg text-brand-forest leading-snug">
                      {cert.name}
                    </h4>
                    <span className="font-mono text-[10px] text-brand-saffron font-bold tracking-wider">
                      {cert.code}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-neutral-text-muted leading-relaxed">
                    {cert.scope.substring(0, 100)}...
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-forest/5 flex items-center gap-1 text-brand-forest hover:text-brand-lime font-sans font-bold text-xs">
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Inspect Certificate Document</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Certificate Viewer Popup Modal Overlay */}
      <AnimatePresence>
        {activeCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setActiveCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl border border-brand-forest/10 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCertificate(null)}
                className="absolute top-6 right-6 text-neutral-text-muted hover:text-brand-forest p-1.5 rounded-full hover:bg-neutral-bg-soft"
                aria-label="Close certificate detail view"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-forest/5 flex items-center justify-center">
                  <Award className="w-6 h-6 text-brand-forest" aria-hidden="true" />
                </div>
                
                <div className="space-y-1">
                  <span className="font-mono text-xs text-brand-saffron font-bold uppercase tracking-widest">
                    Official Verification Card
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-brand-forest leading-tight">
                    {activeCertificate.name}
                  </h3>
                </div>

                <div className="space-y-3 pt-4 border-t border-brand-forest/5 text-sm font-sans">
                  <div>
                    <span className="text-neutral-text-muted text-xs block mb-0.5">Verification Issuer</span>
                    <strong className="text-neutral-text-dark">{activeCertificate.issuer}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-text-muted text-xs block mb-0.5">Certificate ID Code</span>
                    <code className="font-mono text-xs bg-neutral-bg-soft py-1 px-2.5 rounded border border-brand-forest/5 text-brand-forest font-semibold">
                      {activeCertificate.code}
                    </code>
                  </div>
                  <div>
                    <span className="text-neutral-text-muted text-xs block mb-0.5">Certified Operations Scope</span>
                    <p className="text-neutral-text-muted leading-relaxed">{activeCertificate.scope}</p>
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    onClick={() => setActiveCertificate(null)}
                    className="bg-brand-forest hover:bg-brand-forest/90 text-white font-sans text-sm font-bold py-3 px-6 rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-lime"
                  >
                    Close Document Review
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
