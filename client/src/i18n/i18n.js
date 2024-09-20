import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next !",
      English: "English",
      Vietnamese: "Vietnamese",
      Light: "Light",
      Dark: "Dark",
      System: "System",
    },
  },
  vi: {
    translation: {
      "Welcome to React": "Chào mừng đến với React và react-i18next",
      English: "Tiếng Anh",
      Vietnamese: "Tiếng Việt",
      Light: "Sáng",
      Dark: "Tối",
      System: "Hệ thống",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
