'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';

export function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
    <section id="contact" className="relative">
      
      {/* High-Fidelity Call-to-Action Split Banner */}
      <div className="relative bg-brand-forest text-white py-24 overflow-hidden border-b border-brand-lime/10">
        {/* Rich fresh fruit background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610832958506-ee56336191d1?q=80&w=1200')` }}
          aria-hidden="true"
        />
        
        {/* Sand overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-brand-forest/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12 z-10">
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Sourced Around the World. <br />
              <span className="text-brand-lime">Delivered Across Qatar.</span>
            </h2>
            <p className="font-sans text-white/80 text-base leading-relaxed">
              Partner with Nairat for reliable supply, premium quality and freshness you can trust – every day.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            {/* Toggle form button */}
            <button
              onClick={() => setIsFormOpen((prev) => !prev)}
              className="bg-brand-lime hover:bg-brand-lime/90 text-white font-sans text-sm font-bold px-8 py-3.5 rounded-full transition-all duration-200 shadow-md flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-brand-saffron"
            >
              <span>Partner With Us</span>
            </button>

            {/* WhatsApp button */}
            <a
              href="https://wa.me/97431043814"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white hover:bg-white/10 text-white font-sans text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 flex items-center justify-center gap-3.5 group focus-visible:outline-2 focus-visible:outline-brand-saffron"
            >
              <span>Contact Nairat</span>
              <div className="w-6 h-6 rounded-full bg-brand-lime flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.488 1.977 14.03 1.053 11.4 1.053c-5.437 0-9.86 4.37-9.864 9.8.002 2.13.56 4.208 1.614 6.014l-.996 3.636 3.737-.972zm11.237-7.603c-.3-.15-1.772-.875-2.046-.975-.276-.1-.477-.15-.677.15-.2.3-.777.975-.951 1.174-.176.2-.351.224-.652.074-1.43-.715-2.458-1.321-3.444-3.007-.26-.445.26-.413.743-1.38.08-.163.04-.306-.02-.455-.06-.15-.477-1.15-.652-1.574-.171-.41-.345-.353-.477-.36l-.407-.007c-.14 0-.37.052-.564.26-.194.208-.742.728-.742 1.776 0 1.05.762 2.062.868 2.212.106.15 1.5 2.29 3.634 3.21.507.219.904.35 1.214.448.51.162.974.139 1.341.084.41-.061 1.772-.726 2.022-1.428.25-.702.25-1.303.176-1.428-.075-.125-.275-.201-.575-.351z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Expandable B2B Partnership Form Drawer Panel */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden bg-[#F4F6F5]"
          >
            <div className="max-w-4xl mx-auto px-6 py-16">
              <div className="bg-white rounded-3xl p-8 border border-brand-forest/5 shadow-md relative">
                
                {/* Close Form Drawer */}
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-6 right-6 text-neutral-text-muted hover:text-brand-forest p-1.5 rounded-full hover:bg-neutral-bg-soft"
                  aria-label="Close partnership form"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>

                <div className="mb-8 space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-lime font-bold">
                    PARTNERSHIP INQUIRY
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-brand-forest tracking-tight">
                    Submit B2B RFP Details
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="font-sans text-xs font-bold text-neutral-text-dark uppercase tracking-wider">
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
                        className="w-full font-sans text-sm bg-neutral-bg-soft border border-brand-forest/10 rounded-xl py-3.5 px-4 focus:outline-none focus:border-brand-lime text-neutral-text-dark"
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="font-sans text-xs font-bold text-neutral-text-dark uppercase tracking-wider">
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
                        className="w-full font-sans text-sm bg-neutral-bg-soft border border-brand-forest/10 rounded-xl py-3.5 px-4 focus:outline-none focus:border-brand-lime text-neutral-text-dark"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="font-sans text-xs font-bold text-neutral-text-dark uppercase tracking-wider">
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
                        className="w-full font-sans text-sm bg-neutral-bg-soft border border-brand-forest/10 rounded-xl py-3.5 px-4 focus:outline-none focus:border-brand-lime text-neutral-text-dark"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="font-sans text-xs font-bold text-neutral-text-dark uppercase tracking-wider">
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
                        placeholder="e.g. +974 5555 1234…"
                        className="w-full font-sans text-sm bg-neutral-bg-soft border border-brand-forest/10 rounded-xl py-3.5 px-4 focus:outline-none focus:border-brand-lime text-neutral-text-dark"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="font-sans text-xs font-bold text-neutral-text-dark uppercase tracking-wider">
                      Partnership Request details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Describe your volume requirements, delivery frequency, or certified produce inquiries…"
                      className="w-full font-sans text-sm bg-neutral-bg-soft border border-brand-forest/10 rounded-xl py-3.5 px-4 focus:outline-none focus:border-brand-lime text-neutral-text-dark resize-none"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-forest hover:bg-brand-forest/90 text-white font-sans text-base font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-brand-lime"
                    >
                      {isSubmitting ? (
                        <span>Sending Request…</span>
                      ) : (
                        <>
                          <Send className="w-5 h-5" aria-hidden="true" />
                          <span>Submit Corporate Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Status Notifications */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-brand-lime/10 border border-brand-lime/25 text-brand-forest text-sm font-semibold rounded-xl text-center animate-fade-in">
                      Thank you! Your partnership request has been submitted. Our procurement team will contact you within 24 hours.
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
