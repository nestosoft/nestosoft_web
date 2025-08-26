import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import yaml from 'js-yaml';

// Custom backend to load YAML files
const yamlBackend = {
  type: 'backend' as const,
  init: () => {},
  read: (language: string, namespace: string, callback: (error: any, translations?: any) => void) => {
    fetch(`/locales/${language}/${namespace}.yaml`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${language}/${namespace}.yaml`);
        }
        return response.text();
      })
      .then((yamlText) => {
        const translations = yaml.load(yamlText);
        callback(null, translations);
      })
      .catch((error) => {
        console.error('Error loading translation:', error);
        callback(error);
      });
  },
};

i18n
  .use(yamlBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: undefined, // Let the language detector determine the language
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    // Define available languages
    supportedLngs: ['en', 'es'],
    
    // Configure namespaces
    ns: ['translation'],
    defaultNS: 'translation',

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.yaml',
    },
  });

export default i18n;
