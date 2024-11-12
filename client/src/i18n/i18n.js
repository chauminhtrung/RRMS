import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import vi from './vi.json'
import en from './en.json'

i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: vi },
    en: { translation: en }
  },
  lng: 'vi',
  fallbackLng: 'vi',

  interpolation: {
    escapeValue: false
  }
})

export default i18n
