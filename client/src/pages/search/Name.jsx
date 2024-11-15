import { Box, Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Name = () => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        gap: 1,
        m: 2,

        bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542'),
        color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894')
      }}>
      <Box>
        <Typography variant="h6" sx={{ color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894') }}>
          {t('phong-tro-nha-tro-gan-khu-vuc-nay')}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
        {[
          t('truong-cao-dang-viet-sai-gon'),
          t('truong-cao-dang-viet-sai-gon'),
          t('truong-cao-dang-viet-sai-gon'),
          t('truong-cao-dang-viet-sai-gon'),
          t('truong-cao-dang-viet-sai-gon'),
          t('truong-cao-dang-viet-sai-gon'),
          t('truong-cao-dang-viet-sai-gon'),
          t('truong-cao-dang-viet-sai-gon'),
          t('truong-cao-dang-viet-sai-gon')
        ].map((school, index) => (
          <Button
            key={index}
            variant="outlined"
            fullWidth={true}
            sx={{
              textTransform: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              color: '#3f51b5',
              border: '1px solid #3f51b5',
              backgroundColor: '#fff',
              '&:hover': {
                backgroundColor: '#e3f2fd'
              }
            }}>
            {school}
          </Button>
        ))}
      </Box>
    </Box>
  )
}

export default Name
