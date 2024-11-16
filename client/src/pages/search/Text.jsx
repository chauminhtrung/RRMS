import { Box, Typography, Button } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Text = () => {
  const [showMore, setShowMore] = useState(false)
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542'),
        color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894')
      }}>
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          mt: 3
        }}>
        {t('cho-thue-phong-tro-chat-luong')}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        {t('noi-dung')}
      </Typography>

      <Box
        sx={{
          transition: 'max-height 0.5s linear, opacity 0.5s linear, transform 0.5s linear',
          maxHeight: showMore ? '1200px' : '0',
          opacity: showMore ? 1 : 0.5,
          transform: showMore ? 'translateY(0)' : 'translateY(-10px)',
          overflow: 'hidden'
        }}>
        {showMore && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>
              {t('noi-dung-2')}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
              {t('dac-diem')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                mt: 2
              }}>
              <img
                src="https://picsum.photos/1000/500?random=1"
                alt="Random"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </Box>
            <Typography variant="h6" sx={{ mt: 3 }}>
              {t('noi-dung-3')}{' '}
              <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                {t('cho-thue-phong-tro-hcm')}
              </Typography>{' '}
              {t('noi-dung-4')}
            </Typography>
            <Typography variant="h6" sx={{ mt: 3 }}>
              {t('noi-dung-5')} {}
              <Typography variant="span" sx={{ fontWeight: 'bold', mt: 3 }}>
                {t('cho-thue-phong-tro-hcm')}
              </Typography>
              {} {t('noi-dung-6')}
            </Typography>
            <Typography variant="h6" sx={{ mt: 3 }}>
              {t('cho-thue-phong-tro-hcm')}Không chỉ cung cấp thông tin về dịch vụ{' '}
              <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                {t('cho-thue-phong-tro-hcm')}
              </Typography>
              ,{' '}
              <Link
                onClick={() => {
                  window.open('https://rrms.vercel.app', '_blank')
                }}
                variant="span"
                sx={{ fontWeight: 'bold', color: 'blue', m: 2 }}>
                rrms.vercel.app
              </Link>{' '}
              {t('noi-dung-7')}{' '}
              <Typography variant="span" sx={{ color: 'blue' }}>
                {t('noi-dung-8')}
              </Typography>
              {t('noi-dung-9')}
            </Typography>
          </>
        )}
      </Box>

      <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <Button onClick={() => setShowMore(!showMore)} sx={{ mt: 2, color: 'blue' }}>
          {showMore ? t('an-bot') : t('xem-them')}
        </Button>
      </Box>
    </Box>
  )
}

export default Text
