'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Mail, PhoneCall, CheckCircle2, AlertCircle } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';
import { CompanyProfile, companyProfile as defaultCompany } from '@/lib/config/company';
import type { ContactPageContent } from '@/sanity/lib/data';

interface ContactSectionProps {
  company?: CompanyProfile;
  content?: ContactPageContent;
}

export function ContactSection({ company, content }: ContactSectionProps = {}): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale, dict } = useLocale();
  const isAr = locale === 'ar';
  const profile = company || defaultCompany;

  const eyebrow = isAr
    ? (content?.inquiryEyebrowAr || 'تواصل معنا')
    : (content?.inquiryEyebrow || 'CONTACT US');
  const headline = isAr
    ? (content?.inquiryTitleAr || 'تواصل معنا')
    : (content?.inquiryTitle || 'Get in Touch with Us');
  const subtitle = isAr ? content?.inquirySubtitleAr : content?.inquirySubtitle;
  const addressLabel = isAr
    ? (content?.addressLabelAr || 'العنوان:')
    : (content?.addressLabel || 'Address:');
  const addressText = isAr
    ? (content?.addressTextAr || profile.contact?.address || 'المنطقة الصناعية، شارع 37، الدوحة، قطر.')
    : (content?.addressText || profile.contact?.address || 'Industrial Area, Street 37, Doha, Qatar.');
  const crNumber = isAr
    ? (content?.crNumberAr || 'السجل التجاري رقم 144352')
    : (content?.crNumber || 'CR No. 144352');

  const emailLabel = isAr
    ? (content?.emailLabelAr || 'البريد الإلكتروني:')
    : (content?.emailLabel || 'Mail ID:');
  const emailAddress = content?.emailAddress || profile.contact?.email || 'info@nairat.net';

  const callLabel = isAr
    ? (content?.callLabelAr || 'اتصل:')
    : (content?.callLabel || 'Call:');
  const phoneTel = content?.phoneTel || '+974 4429 0400 / 4429 0300';
  const phoneMobile = content?.phoneMobile || '+974 3104 3814';
  const phoneWhatsApp = content?.phoneWhatsApp || '+974 5032 9385';
  const cleanWhatsApp = phoneWhatsApp.replace(/[^0-9]/g, '');
  const cleanMobile = phoneMobile.replace(/[^0-9+]/g, '');

  const formSubmitText = isAr
    ? (content?.formSubmitTextAr || 'إرسال')
    : (content?.formSubmitText || 'Submit');
  const formSuccessMessage = isAr
    ? (content?.formSuccessMessageAr || 'شكراً لك! تم استلام استفسارك. سيتصل بك فريقنا قريباً.')
    : (content?.formSuccessMessage || 'Thank you! Your inquiry has been received. Our team will contact you promptly.');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

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
          start: 'top 88%',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      tl.fromTo(
        '.contact-anim-header',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.42 }
      )
        .fromTo(
          '.contact-info-card',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 },
          '-=0.25'
        )
        .fromTo(
          '.contact-form-card',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45 },
          '-=0.3'
        );
    },
    { scope: sectionRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setFeedbackMessage(
        locale === 'ar' ? 'يرجى إكمال جميع الحقول المطلوبة.' : 'Please complete all required fields.'
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone ? `+974 ${formData.phone}` : '',
          message: formData.message,
          botcheck: honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFeedbackMessage(formSuccessMessage || result.message);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
        setFeedbackMessage(
          locale === 'ar' ? 'تعذر إرسال الاستفسار. يرجى المحاولة مرة أخرى.' : (result.message || 'Unable to send inquiry. Please try again.')
        );
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmitStatus('error');
      setFeedbackMessage(
        locale === 'ar'
          ? 'حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.'
          : 'A network error occurred. Please try again or reach out on WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
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
          <SectionEyebrow title={eyebrow} />

          <h2 className="font-display type-h2 font-semibold text-[#111814] text-start leading-[1.12]">
            {headline}
          </h2>

          {subtitle && (
            <p className="font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] max-w-2xl text-start">
              {subtitle}
            </p>
          )}
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
              <div className="space-y-1 text-start">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#111814]">
                  {addressLabel}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  {addressText}
                </p>
                <span className="font-mono text-xs text-[#168849] font-medium block pt-0.5">
                  {crNumber}
                </span>
              </div>
            </div>

            {/* Card 2: Mail ID */}
            <div className="contact-info-card rounded-2xl bg-white border border-neutral-200/90 p-6 sm:p-7 shadow-xs hover:border-[#168849]/40 hover:shadow-md transition-all duration-300 flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 rounded-full bg-[#3FAE56] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Mail className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-1 text-start">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#111814]">
                  {emailLabel}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6B7280]">
                  <a
                    href={`mailto:${emailAddress}`}
                    className="hover:text-[#168849] transition-colors underline-offset-2 hover:underline"
                  >
                    {emailAddress}
                  </a>
                </p>
              </div>
            </div>

            {/* Card 3: Call & WhatsApp */}
            <div className="contact-info-card rounded-2xl bg-white border border-neutral-200/90 p-6 sm:p-7 shadow-xs hover:border-[#168849]/40 hover:shadow-md transition-all duration-300 flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 rounded-full bg-[#3FAE56] text-white flex items-center justify-center shrink-0 shadow-xs">
                <PhoneCall className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-1.5 text-start">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#111814]">
                  {callLabel}
                </h3>
                <div className="font-sans text-xs sm:text-sm text-[#6B7280] space-y-1">
                  <div>
                    <span className="text-neutral-400 text-xs ms-1.5">{locale === 'ar' ? 'الهاتف:' : 'Tel:'}</span>
                    {phoneTel.includes('/') ? (
                      phoneTel.split('/').map((num, idx, arr) => {
                        const trimmed = num.trim();
                        const dial = trimmed.startsWith('+') ? trimmed : `+974${trimmed}`;
                        return (
                          <React.Fragment key={idx}>
                            <a href={`tel:${dial.replace(/\s+/g, '')}`} className="font-mono hover:text-[#168849] transition-colors">
                              {trimmed}
                            </a>
                            {idx < arr.length - 1 && <span className="mx-1 text-neutral-300">/</span>}
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <a href={`tel:${phoneTel.replace(/\s+/g, '')}`} className="font-mono hover:text-[#168849] transition-colors">
                        {phoneTel}
                      </a>
                    )}
                  </div>
                  <div>
                    <span className="text-neutral-400 text-xs ms-1.5">{locale === 'ar' ? 'الجوال:' : 'Mobile:'}</span>
                    <a href={`tel:${cleanMobile}`} className="font-mono hover:text-[#168849] transition-colors">
                      {phoneMobile}
                    </a>
                  </div>
                  <div className="pt-0.5">
                    <span className="text-neutral-400 text-xs ms-1.5">{locale === 'ar' ? 'واتساب:' : 'WhatsApp:'}</span>
                    <a
                      href={`https://wa.me/${cleanWhatsApp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[#168849] font-semibold hover:underline"
                    >
                      {phoneWhatsApp}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Green Enquiry Form */}
          <div className="contact-form-card lg:col-span-6">
            <div className="rounded-3xl bg-[#3FAE56] p-6 sm:p-8 lg:p-9 shadow-lg text-white space-y-5 text-start">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot Spam Protection (Hidden from humans, catches automated bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_url">Leave this field empty</label>
                  <input
                    id="website_url"
                    type="text"
                    name="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Field 1: Name */}
                <div className="space-y-1.5 text-start">
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-white">
                    {locale === 'ar' ? 'الاسم' : 'Name'}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={locale === 'ar' ? 'أدخل اسمك' : 'Enter Your Name'}
                    className="w-full px-4 py-3 rounded-xl bg-white text-[#111814] placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F2BD1D] shadow-2xs"
                  />
                </div>

                {/* Field 2: Email */}
                <div className="space-y-1.5 text-start">
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-white">
                    {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={locale === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter Your Email'}
                    className="w-full px-4 py-3 rounded-xl bg-white text-[#111814] placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F2BD1D] shadow-2xs"
                  />
                </div>

                {/* Field 3: Contact Number */}
                <div className="space-y-1.5 text-start">
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-white">
                    {locale === 'ar' ? 'رقم الاتصال' : 'Contact Number'}
                  </label>
                  <div className="relative flex items-center bg-white rounded-xl overflow-hidden shadow-2xs focus-within:ring-2 focus-within:ring-[#F2BD1D]">
                    <div className="flex items-center gap-1.5 px-3 py-3 border-e border-neutral-200 text-neutral-600 text-xs font-medium bg-neutral-50 shrink-0 select-none">
                      <span className="text-sm">🇶🇦</span>
                      <span className="font-mono text-xs">+974</span>
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={locale === 'ar' ? 'أدخل رقم الاتصال الخاص بك' : 'Enter Your Contact Number'}
                      className="w-full px-3.5 py-3 bg-transparent text-[#111814] placeholder-neutral-400 text-xs sm:text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Field 4: Message */}
                <div className="space-y-1.5 text-start">
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-white">
                    {locale === 'ar' ? 'الرسالة' : 'Message'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={locale === 'ar' ? 'أدخل رسالتك' : 'Enter Your Message'}
                    className="w-full px-4 py-3 rounded-xl bg-white text-[#111814] placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F2BD1D] resize-none shadow-2xs"
                  />
                </div>

                {/* Submission Feedback */}
                {submitStatus === 'success' && (
                  <div className="p-3.5 rounded-xl bg-white/20 border border-white/40 flex items-center gap-2.5 text-xs text-white">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#F2BD1D]" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-3.5 rounded-xl bg-red-500/30 border border-red-200/50 flex items-center gap-2.5 text-xs text-white">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <CtaButton
                    as="button"
                    type="submit"
                    disabled={isSubmitting}
                    text={
                      isSubmitting
                        ? (locale === 'ar' ? 'جارٍ الإرسال...' : 'Sending...')
                        : formSubmitText
                    }
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
