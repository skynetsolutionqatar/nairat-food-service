'use client';

import { usePathname } from 'next/navigation';

import { useLocale } from '@/context/LocaleContext';
import { siteConfig } from '@/lib/config/site';
import { whatsappChatUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

const labels = {
  en: 'Chat with us on WhatsApp',
  ar: 'تواصل معنا عبر واتساب',
};

/** Floating click-to-chat button shown on every public page. */
export function WhatsAppButton() {
  const pathname = usePathname() ?? '/';
  const { locale } = useLocale();

  if (pathname.startsWith('/studio')) return null;

  return (
    <a
      href={whatsappChatUrl(siteConfig.contact.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={labels[locale]}
      title={labels[locale]}
      className="fixed bottom-5 end-5 sm:bottom-6 sm:end-6 z-40 size-14 rounded-full shadow-lg shadow-black/20 transition-transform duration-200 hover:-translate-y-1 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <WhatsAppIcon className="size-full" />
    </a>
  );
}
