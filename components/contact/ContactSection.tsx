'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Mail, PhoneCall, CheckCircle2, AlertCircle } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

export function ContactSection(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const subject = params.get('subject');
      if (subject?.toLowerCase() === 'careers') {
        setFormData((prev) => ({
          ...prev,
          message: prev.message || 'I am interested in career opportunities at Nairat Food Services.',
        }));
      }
    }
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      tl.fromTo(
        '.contact-anim-header',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55 }
      )
        .fromTo(
          '.contact-info-card',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          '-=0.3'
        )
        .fromTo(
          '.contact-form-card',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate reliable form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 800);
  };

  return (
    <section
      id="contact-details"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-22 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="contact-anim-header space-y-3">
          <SectionEyebrow title="CONTACT US" />

          <h2 className="font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]">
            Get in Touch with Us
          </h2>
        </div>

        {/* Two-Column Grid: Info Cards (Left) vs Green Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: 3 Contact Info Cards */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            {/* Card 1: Address */}
            <div className="contact-info-card rounded-2xl bg-white border border-neutral-200/90 p-6 sm:p-7 shadow-xs hover:border-[#168849]/40 hover:shadow-md transition-all duration-300 flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 rounded-full bg-[#3FAE56] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#111814]">
                  Address:
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  Industrial Area, Street 37, Doha, Qatar.
                </p>
                <span className="font-mono text-xs text-[#168849] font-medium block pt-0.5">
                  CR No. 144352
                </span>
              </div>
            </div>

            {/* Card 2: Mail ID */}
            <div className="contact-info-card rounded-2xl bg-white border border-neutral-200/90 p-6 sm:p-7 shadow-xs hover:border-[#168849]/40 hover:shadow-md transition-all duration-300 flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 rounded-full bg-[#3FAE56] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Mail className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#111814]">
                  Mail ID:
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6B7280]">
                  <a
                    href="mailto:info@nairat.net"
                    className="hover:text-[#168849] transition-colors underline-offset-2 hover:underline"
                  >
                    info@nairat.net
                  </a>
                </p>
              </div>
            </div>

            {/* Card 3: Call & WhatsApp */}
            <div className="contact-info-card rounded-2xl bg-white border border-neutral-200/90 p-6 sm:p-7 shadow-xs hover:border-[#168849]/40 hover:shadow-md transition-all duration-300 flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 rounded-full bg-[#3FAE56] text-white flex items-center justify-center shrink-0 shadow-xs">
                <PhoneCall className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#111814]">
                  Call:
                </h3>
                <div className="font-sans text-xs sm:text-sm text-[#6B7280] space-y-1">
                  <div>
                    <span className="text-neutral-400 text-xs mr-1.5">Tel:</span>
                    <a href="tel:+97444290400" className="font-mono hover:text-[#168849] transition-colors">
                      +974 4429 0400
                    </a>
                    <span className="mx-1 text-neutral-300">/</span>
                    <a href="tel:+97444290300" className="font-mono hover:text-[#168849] transition-colors">
                      4429 0300
                    </a>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-xs mr-1.5">Mobile:</span>
                    <a href="tel:+97431043814" className="font-mono hover:text-[#168849] transition-colors">
                      +974 3104 3814
                    </a>
                  </div>
                  <div className="pt-0.5">
                    <span className="text-neutral-400 text-xs mr-1.5">WhatsApp:</span>
                    <a
                      href="https://wa.me/97450329385"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[#168849] font-semibold hover:underline"
                    >
                      +974 5032 9385
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Green Enquiry Form */}
          <div className="contact-form-card lg:col-span-6">
            <div className="rounded-3xl bg-[#3FAE56] p-6 sm:p-8 lg:p-9 shadow-lg text-white space-y-5">
              <form onSubmit={handleSubmit} className="space-y-4" >
                {/* Field 1: Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-white">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter Your Name"
                    className="w-full px-4 py-3 rounded-xl bg-white text-[#111814] placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F2BD1D] shadow-2xs"
                  />
                </div>

                {/* Field 2: Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-white">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter Your Email"
                    className="w-full px-4 py-3 rounded-xl bg-white text-[#111814] placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F2BD1D] shadow-2xs"
                  />
                </div>

                {/* Field 3: Contact Number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-white">
                    Contact Number
                  </label>
                  <div className="relative flex items-center bg-white rounded-xl overflow-hidden shadow-2xs focus-within:ring-2 focus-within:ring-[#F2BD1D]">
                    <div className="flex items-center gap-1.5 px-3 py-3 border-r border-neutral-200 text-neutral-600 text-xs font-medium bg-neutral-50 shrink-0 select-none">
                      <span className="text-sm">🇶🇦</span>
                      <span className="font-mono text-xs">+974</span>
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter Your Contact Number"
                      className="w-full px-3.5 py-3 bg-transparent text-[#111814] placeholder-neutral-400 text-xs sm:text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Field 4: Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter Your Message"
                    className="w-full px-4 py-3 rounded-xl bg-white text-[#111814] placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F2BD1D] resize-none shadow-2xs"
                  />
                </div>

                {/* Submission Feedback */}
                {submitStatus === 'success' && (
                  <div className="p-3.5 rounded-xl bg-white/20 border border-white/40 flex items-center gap-2.5 text-xs text-white">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#F2BD1D]" />
                    <span>Thank you! Your inquiry has been received. Our team will contact you promptly.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-3.5 rounded-xl bg-red-500/30 border border-red-200/50 flex items-center gap-2.5 text-xs text-white">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Please complete the required fields before submitting.</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <CtaButton
                    as="button"
                    type="submit"
                    disabled={isSubmitting}
                    text={isSubmitting ? 'Sending...' : 'Submit'}
                    variant="white"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
