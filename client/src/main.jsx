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

createRoot(document.getElementById('root')).render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatAI />
      <App />
      <ToastContainer />
    </ThemeProvider>
  </>
)
