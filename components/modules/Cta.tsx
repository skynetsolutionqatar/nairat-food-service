'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Send, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Cta(): React.ReactNode {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useGSAP(
    () => {
      if (!containerRef.current || !bgImageRef.current) return;

      // Parallax scrub on background image
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.1, yPercent: -4 },
        {
          scale: 1.02,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      // Content reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        '.cta-header-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out' }
      );
    },
    { scope: containerRef }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        message: '',
      });
    }, 1200);
  };

  return (
    <section id="contact" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 relative w-full overflow-hidden bg-neutral-900">

      {/* Full-Bleed Background Image with GSAP Parallax */}
      <div ref={bgImageRef} className="absolute inset-0 w-full h-full pointer-events-none will-change-transform transform-gpu">
        <Image
          src="/cta/ctaft-bac.webp"
          alt="Fresh Fruits & Vegetables Background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle Dark Vignette & Left Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25" />
      </div>

      {/* Content Container Aligned Exactly with Other Sections */}
      <div className="relative z-10 max-w-[1140px] 2xl:max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 2xl:py-14">

        <div className="max-w-3xl 2xl:max-w-4xl space-y-3 sm:space-y-4">

          {/* Headline */}
          <h2 className="cta-header-item font-display type-h2 font-semibold text-white text-left">
            <span className="block sm:whitespace-nowrap">Fresh Fruits &amp; Vegetables from</span>
            <span className="block sm:whitespace-nowrap mt-0.5 sm:mt-1">Around the World</span>
          </h2>

          {/* Flags + Subtext Row */}
          <div className="cta-header-item flex items-center gap-3">
            <div className="relative shrink-0">
              <Image
                src="/cta/ctacontry.webp"
                alt="Sourced Around the World country flags"
                width={120}
                height={36}
                style={{ width: 'auto', height: 'auto' }}
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </div>
            <div className="font-sans text-xs sm:text-[13px] text-white leading-snug">
              <span className="block font-semibold text-white">Sourced Around the World.</span>
              <span className="block text-white/80">Delivered Across Qatar.</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="cta-header-item pt-1 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setIsFormOpen((prev) => !prev)}
              className="group inline-flex items-center gap-3 bg-[#168849] hover:bg-[#12753e] text-white font-sans text-xs sm:text-sm font-semibold tracking-[-0.01em] pl-5 pr-2 py-1.5 sm:py-2 rounded-full transition-all duration-300 shadow-lg shadow-[#168849]/25 cursor-pointer active:scale-95"
            >
              <span>Contact Us</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#168849] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </div>
            </button>
          </div>

        </div>

      </div>

      {/* Expandable Corporate Partnership Form Modal / Drawer */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden bg-[#F4F6F5] border-t border-white/10 relative z-20"
          >
            <div className="max-w-4xl mx-auto px-6 py-10 sm:py-12">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/5 shadow-xl relative">

                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-6 right-6 text-neutral-500 hover:text-black p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
                  aria-label="Close partnership form"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>

                <div className="mb-6 space-y-1">
                  <span className="font-display type-eyebrow text-[#168849] block">
                    PARTNERSHIP INQUIRY
                  </span>
                  <h3 className="font-display font-semibold text-2xl text-[#111814] tracking-[-0.015em]">
                    Submit Corporate Inquiry
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="font-sans text-xs font-semibold text-[#111814] uppercase tracking-[0.08em]">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        placeholder="e.g. Abdullah Al-Thani…"
                        className="w-full font-sans text-sm bg-[#F4F6F5] border border-black/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#168849] text-[#111814]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="companyName" className="font-sans text-xs font-semibold text-[#111814] uppercase tracking-[0.08em]">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        autoComplete="organization"
                        placeholder="e.g. Qatar Retail Group…"
                        className="w-full font-sans text-sm bg-[#F4F6F5] border border-black/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#168849] text-[#111814]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="font-sans text-xs font-semibold text-[#111814] uppercase tracking-[0.08em]">
                        Business Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        spellCheck={false}
                        placeholder="e.g. purchasing@qrg.qa…"
                        className="w-full font-sans text-sm bg-[#F4F6F5] border border-black/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#168849] text-[#111814]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="font-sans text-xs font-semibold text-[#111814] uppercase tracking-[0.08em]">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                        placeholder="e.g. +974 4647 1511…"
                        className="w-full font-sans text-sm bg-[#F4F6F5] border border-black/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#168849] text-[#111814]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="font-sans text-xs font-semibold text-[#111814] uppercase tracking-[0.08em]">
                      Partnership Request Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Describe your volume requirements, delivery frequency, or produce inquiries…"
                      className="w-full font-sans text-sm bg-[#F4F6F5] border border-black/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#168849] text-[#111814] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#168849] hover:bg-[#12753e] text-white font-sans text-sm font-semibold tracking-[-0.01em] py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-brand-forest shadow-md"
                    >
                      {isSubmitting ? (
                        <span>Sending Request…</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden="true" />
                          <span>Submit Corporate Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>

                  {submitStatus === 'success' && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="p-4 bg-[#168849]/10 border border-[#168849]/30 text-[#063B27] text-xs font-semibold rounded-xl text-center"
                    >
                      Thank you! Your inquiry has been submitted. Our procurement team will contact you shortly.
                    </div>
                  )}
                </form>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
