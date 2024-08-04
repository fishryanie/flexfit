/** @format */

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en';
import vi from './locales/vi';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
  fallbackLng: 'vi',
});

export default i18n;
