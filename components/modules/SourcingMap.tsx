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
  coordinates: { x: number; y: number }; // Coordinates on SVG map
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
}

const certificates: Certificate[] = [
  {
    id: 'haccp',
    name: 'HACCP Certified',
    issuer: 'SGS International Services',
    code: 'HA-2026-9482',
    desc: 'Food Safety & Hazard Control',
    scope: 'Hazard analysis, temperature log consistency, and food safety risk mitigation protocols.',
  },
  {
    id: 'iso22000',
    name: 'ISO 22000 Certified',
    issuer: 'Bureau Veritas Certification',
    code: 'ISO-22000-Q-938',
    desc: 'Food Safety Management System',
    scope: 'Global food safety management standards covering import, storage, and distribution operations.',
  },
];

export function SourcingMap() {
  const [selectedRegion, setSelectedRegion] = useState<string>('mideast');
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);

  const currentRegion = regions.find((r) => r.id === selectedRegion) || regions[0];

  return (
    <section id="sourcing" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Main Grid Layout split into Left Info Column, Map, and Right Cert Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Sourcing Details (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-lime font-bold">
                GLOBAL SOURCING
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-forest tracking-tight text-balance leading-tight">
                Sourced From <br />
                Around the World.
              </h2>
              <p className="font-sans text-neutral-text-muted text-sm sm:text-base leading-relaxed">
                We partner with trusted growers in major producing regions to deliver the best, all year round.
              </p>
            </div>

            {/* Metrics List */}
            <div className="space-y-4 font-sans text-xs sm:text-sm text-neutral-text-dark">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full border border-brand-lime/30 flex items-center justify-center text-brand-lime shrink-0">
                  <Shield className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-base text-brand-forest">15+</span>
                  <span className="text-neutral-text-muted ml-1.5">Sourcing Countries</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full border border-brand-lime/30 flex items-center justify-center text-brand-lime shrink-0">
                  <Globe className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-base text-brand-forest">5</span>
                  <span className="text-neutral-text-muted ml-1.5">Continents Covered</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full border border-brand-lime/30 flex items-center justify-center text-brand-lime shrink-0">
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-base text-brand-forest">Year-Round</span>
                  <span className="text-neutral-text-muted ml-1.5">Sourcing Network</span>
                </div>
              </div>
            </div>

            {/* Region selectors */}
            <div className="flex flex-wrap gap-2 pt-4">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`font-sans text-xs font-bold py-2.5 px-4 rounded-full border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-lime ${
                    selectedRegion === region.id
                      ? 'bg-brand-forest text-white border-brand-forest shadow-sm'
                      : 'bg-white text-neutral-text-muted border-brand-forest/10 hover:bg-neutral-bg-soft'
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>

          {/* Middle Column: Interactive SVG Map (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[#F4F6F5] rounded-3xl p-6 border border-brand-forest/5 flex items-center justify-center relative min-h-[300px] overflow-hidden">
            {/* Sourcing Connection Lines to Qatar */}
            <svg viewBox="0 0 900 450" className="w-full h-auto relative z-10 select-none">
              {/* Qatar Doha Base Node */}
              <circle cx="530" cy="200" r="7" fill="#E2B93C" className="animate-ping" />
              <circle cx="530" cy="200" r="4.5" fill="#E2B93C" />
              <text x="530" y="218" textAnchor="middle" fill="#063B27" className="font-mono text-[9px] font-bold tracking-widest bg-white/70 px-1 rounded">
                DOHA
              </text>

              {/* Sourcing connection lines */}
              {regions.map((region) => {
                const isActive = selectedRegion === region.id;
                return (
                  <motion.path
                    key={`line-${region.id}`}
                    d={`M ${region.coordinates.x} ${region.coordinates.y} Q ${(region.coordinates.x + 530)/2} ${Math.min(region.coordinates.y, 200) - 25} 530 200`}
                    fill="none"
                    stroke={isActive ? '#E2B93C' : '#063B27'}
                    strokeWidth={isActive ? '2' : '0.5'}
                    strokeOpacity={isActive ? '0.8' : '0.15'}
                    strokeDasharray={isActive ? '4 2' : 'none'}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2 }}
                  />
                );
              })}

              {/* Sourcing nodes */}
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

            {/* Display selected region context stats floating inside map container */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-brand-forest/5 flex justify-between items-center z-20">
              <div className="text-[10px] font-sans text-neutral-text-dark">
                <strong>{currentRegion.name}:</strong> {currentRegion.countries.join(', ')}
              </div>
              <div className="text-[10px] font-sans text-brand-lime font-bold">
                Transit: {currentRegion.transit}
              </div>
            </div>
          </div>

          {/* Right Column: Three Vertical Certificate Cards (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-5 justify-between">
            {certificates.map((cert) => (
              <button
                type="button"
                key={cert.id}
                onClick={() => setActiveCertificate(cert)}
                className="bg-white rounded-2xl p-5 border border-brand-forest/5 shadow-sm hover:border-brand-lime/30 focus-visible:outline-2 focus-visible:outline-brand-lime focus-visible:outline-offset-2 transition-all duration-300 cursor-pointer flex flex-col justify-between flex-1 group text-left"
              >
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-forest/5 flex items-center justify-center">
                    <Award className="w-5 h-5 text-brand-forest" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-base text-brand-forest leading-snug">
                      {cert.name}
                    </h4>
                    <span className="font-mono text-[9px] text-neutral-text-muted font-semibold mt-0.5 block">
                      {cert.desc}
                    </span>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-brand-forest/5 flex items-center gap-1.5 text-brand-lime font-sans font-bold text-xs">
                  <span>View Certificate</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </div>
              </button>
            ))}

            {/* Document preview card */}
            <div className="bg-white rounded-2xl p-4 border border-brand-forest/5 shadow-sm flex flex-row items-center gap-4 flex-1">
              {/* Stylized Document Icon represent certificate */}
              <div className="w-16 h-20 bg-neutral-bg-soft rounded-lg border border-brand-forest/10 p-2 flex flex-col justify-between relative overflow-hidden shrink-0">
                <div className="w-full h-1 bg-brand-forest/30 rounded" />
                <div className="w-4/5 h-1 bg-brand-forest/20 rounded" />
                <div className="w-3/5 h-1 bg-brand-forest/20 rounded" />
                <div className="flex justify-end">
                  <div className="w-4 h-4 rounded-full bg-brand-saffron/20 border border-brand-saffron flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-saffron" />
                  </div>
                </div>
              </div>
              <div className="space-y-1 font-sans text-xs">
                <strong className="block text-brand-forest font-bold">Standard QA Protocols</strong>
                <p className="text-neutral-text-muted">Uncompromising inspection compliance from harvest to terminal.</p>
              </div>
            </div>
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
