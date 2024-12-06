export const redirectUri = 'http://localhost:5173/oauth2/redirect'
export const apiBaseUrl = 'http://localhost:8080'

export const env = {
  API_URL: import.meta.env.VITE_APP_API_URL,
  PORT: import.meta.env.VITE_PORT,
  SITE_KEY: import.meta.env.VITE_SITE_KEY_CAPTCHA,
  FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
  FPT_AI_KEY: import.meta.env.VITE_FPT_AI_KEY,
  FPT_APP_CODE: import.meta.env.VITE_FPT_APP_CODE,
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  FACEBOOK_APP_ID: import.meta.env.VITE_FACEBOOK_APP_ID
}
