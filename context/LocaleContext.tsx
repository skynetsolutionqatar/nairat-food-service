'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, Dictionary } from '@/lib/i18n/types';
import { getDictionary } from '@/lib/i18n/getDictionary';

interface LocaleContextType {
  locale: Locale;
  isRTL: boolean;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLanguage: () => void;
}

const defaultDict = getDictionary('en');

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  isRTL: false,
  dict: defaultDict,
  setLocale: () => {},
  toggleLanguage: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const router = useRouter();

  // The locale is derived from the URL, so it is computed rather than stored.
  const locale: Locale = pathname.startsWith('/ar') ? 'ar' : 'en';

  // Keep the <html> lang and dir attributes in sync with the route.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    if (newLocale === 'ar') {
      const targetPath = pathname === '/' ? '/ar' : `/ar${pathname}`;
      router.push(targetPath);
    } else {
      const targetPath = pathname.startsWith('/ar') ? pathname.replace(/^\/ar(\/|$)/, '$1') || '/' : pathname;
      router.push(targetPath);
    }
  };

  const toggleLanguage = () => {
    if (locale === 'en') {
      // Transition from English to Arabic
      const targetPath = pathname === '/' ? '/ar' : `/ar${pathname}`;
      router.push(targetPath);
    } else {
      // Transition from Arabic to English
      const targetPath = pathname.startsWith('/ar') ? pathname.replace(/^\/ar(\/|$)/, '$1') || '/' : pathname;
      router.push(targetPath);
    }
  };

  const dict = getDictionary(locale);
  const isRTL = locale === 'ar';

  return (
    <LocaleContext.Provider value={{ locale, isRTL, dict, setLocale, toggleLanguage }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
