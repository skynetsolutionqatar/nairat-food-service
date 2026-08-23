'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Calendar, Shield, Award, ExternalLink, X } from 'lucide-react';

interface RegionData {
  id: string;
  name: string;
  countries: string[];
  produce: string[];
  transit: string;
  temp: string;
  coordinates: { x: number; y: number };
}

const regions: RegionData[] = [
  {
    id: 'mideast',
    name: 'Middle East',
    countries: ['Oman', 'Jordan', 'Lebanon'],
    produce: ['Fresh Mint', 'Coriander', 'Peaches'],
    transit: '1 - 3 Days',
    temp: '4°C to 8°C',
    coordinates: { x: 500, y: 190 },
  },
  {
    id: 'africa',
    name: 'Africa',
    countries: ['South Africa', 'Egypt', 'Kenya'],
    produce: ['Valencia Oranges', 'Egypt Onions'],
    transit: '10 - 15 Days',
    temp: '2°C to 4°C',
    coordinates: { x: 450, y: 280 },
  },
  {
    id: 'europe',
    name: 'Europe',
    countries: ['Italy', 'Spain', 'Netherlands'],
    produce: ['Royal Gala Apples', 'Iceberg Lettuce'],
    transit: '12 - 18 Days',
    temp: '3°C to 5°C',
    coordinates: { x: 410, y: 120 },
  },
  {
    id: 'asia',
    name: 'Asia',
    countries: ['India', 'Thailand', 'China'],
    produce: ['Alphonso Mangoes', 'Rambutan'],
    transit: '5 - 8 Days',
    temp: '8°C to 12°C',
    coordinates: { x: 620, y: 200 },
  },
  {
    id: 'americas',
    name: 'Americas',
    countries: ['Ecuador', 'Mexico', 'Peru'],
    produce: ['Cavendish Bananas', 'Hass Avocados'],
    transit: '22 - 28 Days',
    temp: '13°C to 15°C',
    coordinates: { x: 190, y: 260 },
  },
  {
    id: 'oceania',
    name: 'Oceania',
    countries: ['Australia', 'New Zealand'],
    produce: ['Red Grapes', 'Navel Oranges', 'Kiwi Fruit'],
    transit: '18 - 22 Days',
    temp: '1°C to 3°C',
    coordinates: { x: 750, y: 320 },
  },
];

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  code: string;
  desc: string;
  scope: string;
  badgeColor: string;
}

const certificates: Certificate[] = [
  {
    id: 'haccp',
    name: 'HACCP Certified',
    issuer: 'SGS International Services',
    code: 'HA-2026-9482',
    desc: 'Food Safety & Hazard Control',
    scope: 'Hazard analysis, temperature log consistency, and food safety risk mitigation protocols.',
    badgeColor: '#ED1C24',
  },
  {
    id: 'iso22000',
    name: 'ISO 22000:2018 Certified',
    issuer: 'Bureau Veritas Certification',
    code: 'ISO-22000-Q-938',
    desc: 'Food Safety Management System',
    scope: 'Global food safety management standards covering import, storage, and distribution operations.',
    badgeColor: '#0054A6',
  },
];

export function SourcingMap() {
  const [selectedRegion, setSelectedRegion] = useState<string>('mideast');
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);

  const currentRegion = regions.find((r) => r.id === selectedRegion) || regions[0];

  return (
    <section id="sourcing" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-10">
        
        {/* Main Grid Layout split into Left Info Column, Map, and Right Cert Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Sourcing Details (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-[#5C6662] block">
                GLOBAL SOURCING
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#063B27] tracking-tight leading-tight">
                Sourced From <br />
                Around the World.
              </h2>
              <p className="font-sans text-[#5C6662] text-xs sm:text-sm leading-relaxed">
                We partner with trusted growers in major producing regions to deliver the best, all year round.
              </p>
            </div>

            {/* Metrics List */}
            <div className="space-y-3 font-sans text-xs sm:text-sm text-[#1C2321]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-[#4AA658]/40 flex items-center justify-center text-[#4AA658] shrink-0">
                  <Shield className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-sm text-[#063B27]">15+</span>
                  <span className="text-[#5C6662] ml-1.5 text-xs">Sourcing Countries</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-[#4AA658]/40 flex items-center justify-center text-[#4AA658] shrink-0">
                  <Globe className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-sm text-[#063B27]">5</span>
                  <span className="text-[#5C6662] ml-1.5 text-xs">Continents Covered</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-[#4AA658]/40 flex items-center justify-center text-[#4AA658] shrink-0">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-sm text-[#063B27]">Year-Round</span>
                  <span className="text-[#5C6662] ml-1.5 text-xs">Sourcing Network</span>
                </div>
              </div>
            </div>

            {/* Region selectors */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`font-sans text-xs font-semibold py-1.5 px-3.5 rounded-full border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-forest ${
                    selectedRegion === region.id
                      ? 'bg-[#063B27] text-white border-[#063B27] shadow-sm'
                      : 'bg-[#F4F6F5] text-[#5C6662] border-black/5 hover:bg-black/5'
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>

          {/* Middle Column: Interactive Map (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[#F4F6F5] rounded-2xl p-5 border border-black/5 flex items-center justify-center relative min-h-[280px] overflow-hidden">
            <svg viewBox="0 0 900 450" className="w-full h-auto relative z-10 select-none">
              {/* World map stylized land dots representation */}
              <circle cx="530" cy="200" r="7" fill="#E2B93C" className="animate-ping" />
              <circle cx="530" cy="200" r="4.5" fill="#E2B93C" />
              <text x="530" y="218" textAnchor="middle" fill="#063B27" className="font-mono text-[9px] font-bold tracking-widest bg-white/80 px-1 rounded">
                DOHA
              </text>

              {regions.map((region) => {
                const isActive = selectedRegion === region.id;
                return (
                  <motion.path
                    key={`line-${region.id}`}
                    d={`M ${region.coordinates.x} ${region.coordinates.y} Q ${(region.coordinates.x + 530)/2} ${Math.min(region.coordinates.y, 200) - 25} 530 200`}
                    fill="none"
                    stroke={isActive ? '#4AA658' : '#063B27'}
                    strokeWidth={isActive ? '2' : '0.5'}
                    strokeOpacity={isActive ? '0.9' : '0.15'}
                    strokeDasharray={isActive ? '4 2' : 'none'}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />
                );
              })}

              {regions.map((region) => {
                const isActive = selectedRegion === region.id;
                return (
                  <g key={`node-${region.id}`} className="cursor-pointer" onClick={() => setSelectedRegion(region.id)}>
                    {isActive && (
                      <circle
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r="12"
                        fill="#4AA658"
                        fillOpacity="0.25"
                        className="animate-pulse"
                      />
                    )}
                    <circle
                      cx={region.coordinates.x}
                      cy={region.coordinates.y}
                      r="5"
                      fill={isActive ? '#4AA658' : '#063B27'}
                      fillOpacity={isActive ? '1' : '0.35'}
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Selected region context info badge */}
            <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl p-2.5 border border-black/5 flex justify-between items-center z-20">
              <div className="text-[10px] font-sans text-[#1C2321]">
                <strong>{currentRegion.name}:</strong> {currentRegion.countries.join(', ')}
              </div>
              <div className="text-[10px] font-sans text-[#4AA658] font-bold">
                Transit: {currentRegion.transit}
              </div>
            </div>
          </div>

          {/* Right Column: 2 Certificate Cards (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-4 justify-between">
            {certificates.map((cert) => (
              <button
                type="button"
                key={cert.id}
                onClick={() => setActiveCertificate(cert)}
                className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm hover:border-[#4AA658]/40 focus-visible:outline-2 focus-visible:outline-brand-forest transition-all duration-300 cursor-pointer flex flex-col justify-between flex-1 group text-left relative overflow-hidden"
              >
                {/* Certificate document header preview */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F4F6F5] border border-black/5 flex items-center justify-center">
                    <Award className="w-4 h-4 text-[#063B27]" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F4F6F5] text-[#063B27]">
                    QA PASS
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-sm text-[#063B27] leading-snug">
                    {cert.name}
                  </h4>
                  <span className="font-sans text-[11px] text-[#5C6662] block">
                    {cert.desc}
                  </span>
                </div>

                <div className="pt-3 mt-3 border-t border-black/5 flex items-center gap-1 text-[#4AA658] font-sans font-bold text-xs">
                  <span>View Certificate</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </div>
              </button>
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
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl border border-black/10 space-y-6"
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
                <div className="w-12 h-12 rounded-2xl bg-[#F4F6F5] flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#063B27]" aria-hidden="true" />
                </div>
                
                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#4AA658] font-bold uppercase tracking-widest">
                    Official Certification
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-[#063B27] leading-tight">
                    {activeCertificate.name}
                  </h3>
                </div>

                <div className="space-y-3 pt-4 border-t border-black/5 text-sm font-sans">
                  <div>
                    <span className="text-[#5C6662] text-xs block mb-0.5">Issuing Authority</span>
                    <strong className="text-[#1C2321]">{activeCertificate.issuer}</strong>
                  </div>
                  <div>
                    <span className="text-[#5C6662] text-xs block mb-0.5">Certificate Reference Code</span>
                    <code className="font-mono text-xs bg-[#F4F6F5] py-1 px-2.5 rounded border border-black/5 text-[#063B27] font-semibold">
                      {activeCertificate.code}
                    </code>
                  </div>
                  <div>
                    <span className="text-[#5C6662] text-xs block mb-0.5">Certified Operations Scope</span>
                    <p className="text-[#5C6662] leading-relaxed">{activeCertificate.scope}</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveCertificate(null)}
                    className="bg-[#063B27] hover:bg-[#063B27]/90 text-white font-sans text-xs font-bold py-3 px-6 rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-forest"
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

