import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    lng: localStorage.getItem('stadiumMindLang') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

// Persist language choice and apply RTL for Arabic
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('stadiumMindLang', lng);
  document.documentElement.lang = lng;
  document.documentElement.dir  = lng === 'ar' ? 'rtl' : 'ltr';
});

// Apply on initial load
const savedLang = localStorage.getItem('stadiumMindLang') || 'en';
document.documentElement.lang = savedLang;
document.documentElement.dir  = savedLang === 'ar' ? 'rtl' : 'ltr';

export default i18n;
