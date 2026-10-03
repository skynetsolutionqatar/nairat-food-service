'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Detect initial locale from URL pathname
  const isArabicRoute = pathname.startsWith('/ar') || pathname === '/ar';
  const initialLocale: Locale = isArabicRoute ? 'ar' : 'en';

  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Synchronize document attributes whenever route changes
  useEffect(() => {
    const isAr = pathname.startsWith('/ar') || pathname === '/ar';
    const currentLocale: Locale = isAr ? 'ar' : 'en';

    setLocaleState(currentLocale);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLocale;
      document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    }
  }, [pathname]);

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
