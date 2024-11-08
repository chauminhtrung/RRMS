import { Box } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelect = () => {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'vi' ? 'en' : 'vi'
    i18n.changeLanguage(newLanguage)
    setCurrentLanguage(newLanguage)
  }

  return (
    <Box
      onClick={toggleLanguage}
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        gap: 1,
        width: '100px'
      }}>
      {currentLanguage === 'vi' ? (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fvietnam.png?alt=media&token=9e4a0137-2346-4190-b71b-147842b01ff7"
          alt="Vietnam"
          width={24}
          height={24}
        />
      ) : (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Funited-kingdom.png?alt=media&token=82b89dec-9bfa-4b78-a551-5149518d4068"
          alt="English"
          width={24}
          height={24}
        />
      )}
      <span>{currentLanguage === 'vi' ? 'Tiếng Việt' : 'English'}</span>
    </Box>
  )
}

export default LanguageSelect
