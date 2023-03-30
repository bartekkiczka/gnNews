import { Languages } from './enums/Languages';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

const resources = {
  pl: { translation: require('./i18n/pl.json') },
  en: { translation: require('./i18n/en.json') },
};

i18n.use(initReactI18next).use(detector).init({
  resources,
  debug: true,
  fallbackLng: Languages.POLISH,
});

export default i18n;
