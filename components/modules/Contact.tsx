'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';

export function Contact() {
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

    // Simulate API request submission
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
    }, 1500);
  };

  return (
    <section id="contact" className="relative">
      
      {/* Global Call-to-Action Split Banner */}
      <div className="relative bg-brand-forest text-white py-20 overflow-hidden border-b border-white/5">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-multiply"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610832958506-ee56336191d1?q=80&w=1200')` }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12 z-10">
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-saffron font-bold">
              ESTABLISH PARTNERSHIP
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to Secure Your Fresh Supply Chain?
            </h2>
            <p className="font-sans text-white/80 text-base leading-relaxed">
              Contact our corporate wholesale division today to establish standard contract rates, custom packaging requirements, and scheduled daily deliveries.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <a
              href="https://wa.me/97431043814"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-lime hover:bg-brand-lime/90 text-white font-sans text-base font-bold px-8 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-brand-saffron"
            >
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
              <span>Contact via WhatsApp</span>
            </a>
            <a
              href="#contact-form"
              className="bg-brand-saffron hover:bg-brand-saffron/90 text-brand-forest font-sans text-base font-bold px-8 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Submit RFP Inquiry</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Contact Form Section */}
      <div id="contact-form" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Direct Contact Info (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-lime font-bold">
                  GET IN TOUCH
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-brand-forest tracking-tight">
                  Corporate Headquarters
                </h3>
                <p className="font-sans text-neutral-text-muted text-sm leading-relaxed">
                  Our B2B procurement division is available Sunday through Thursday, from 8:00 AM to 5:00 PM (Doha Time) to review supply contracts and logistics requests.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-6 font-sans text-sm text-neutral-text-dark">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-bg-soft border border-brand-forest/5">
                  <MapPin className="w-6 h-6 text-brand-lime shrink-0" aria-hidden="true" />
                  <div>
                    <strong className="block text-brand-forest mb-1 text-sm font-bold uppercase tracking-wider">Office Address</strong>
                    <p className="text-neutral-text-muted">Salwa Road, Doha, State of Qatar</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-bg-soft border border-brand-forest/5">
                  <Phone className="w-6 h-6 text-brand-lime shrink-0" aria-hidden="true" />
                  <div>
                    <strong className="block text-brand-forest mb-1 text-sm font-bold uppercase tracking-wider">Call Division</strong>
                    <a href="tel:+97446471511" className="text-neutral-text-muted hover:text-brand-lime transition-colors">
                      +974 4647 1511
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-bg-soft border border-brand-forest/5">
                  <Mail className="w-6 h-6 text-brand-lime shrink-0" aria-hidden="true" />
                  <div>
                    <strong className="block text-brand-forest mb-1 text-sm font-bold uppercase tracking-wider">Email RFP</strong>
                    <a href="mailto:info@nairatfood.com" className="text-neutral-text-muted hover:text-brand-lime transition-colors">
                      info@nairatfood.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: B2B Partnership Form (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-neutral-bg-soft rounded-3xl p-8 border border-brand-forest/5 shadow-sm">
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
                      className="w-full font-sans text-sm bg-white border border-brand-forest/10 rounded-xl py-3.5 px-4 focus:outline-none focus:border-brand-lime text-neutral-text-dark"
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
                      className="w-full font-sans text-sm bg-white border border-brand-forest/10 rounded-xl py-3.5 px-4 focus:outline-none focus:border-brand-lime text-neutral-text-dark"
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
                      className="w-full font-sans text-sm bg-white border border-brand-forest/10 rounded-xl py-3.5 px-4 focus:outline-none focus:border-brand-lime text-neutral-text-dark"
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
                      className="w-full font-sans text-sm bg-white border border-brand-forest/10 rounded-xl py-3.5 px-4 focus:outline-none focus:border-brand-lime text-neutral-text-dark"
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
                    className="w-full font-sans text-sm bg-white border border-brand-forest/10 rounded-xl py-3.5 px-4 focus:outline-none focus:border-brand-lime text-neutral-text-dark resize-none"
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
                  <div className="p-4 bg-brand-lime/10 border border-brand-lime/25 text-brand-forest text-sm font-semibold rounded-xl text-center">
                    Thank you! Your partnership request has been submitted. Our procurement team will contact you within 24 hours.
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
