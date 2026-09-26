import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import mm from "./locales/mm.json";

// ? Detect device language
const deviceLanguage = getLocales ? getLocales()[0]?.languageCode : "en";

const resources = {
  en: { translation: en },
  mm: { translation: mm }
};

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage, //  ? Set default language to device preference
  fallbackLng: "en", // ? Use English if a translation key is missing
  compatibilityJSON: "v3", // ? Required for older Android environments
  interpolation: {
    escapeValue: false // ? React already safeguards against XSS
  }
});

export default i18n;
