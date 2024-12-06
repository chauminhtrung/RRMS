import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import 'react-toastify/dist/ReactToastify.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import theme from './theme.js'
import './i18n/i18n.js'
import { ToastContainer } from 'react-toastify'
import ChatAI from './pages/AI/ChatAI.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { env } from './configs/environment.js'

createRoot(document.getElementById('root')).render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatAI />
      <BrowserRouter>
        <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  </>
)
