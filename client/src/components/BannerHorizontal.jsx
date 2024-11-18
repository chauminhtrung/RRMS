import { Box, useMediaQuery } from '@mui/material'

const BannerHorizontal = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        my: 2,
        gap: isMobile ? 1 : 2
      }}>
      <Box
        component="img"
        src={'https://lozido.com/images/promotion/banner-1-desktop.webp'}
        alt=""
        width="50%"
        height="auto"
        sx={{ borderRadius: '8px' }}
      />
      <Box
        component="img"
        src={'https://lozido.com/images/promotion/banner-2-desktop.webp'}
        alt=""
        width="50%"
        height="auto"
        sx={{ borderRadius: '8px' }}
      />
    </Box>
  )
}

export default BannerHorizontal
