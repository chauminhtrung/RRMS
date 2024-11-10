import { Box, useMediaQuery } from '@mui/material'
import { bannerHorizontal } from '~/apis/mock/mock-data-banner-horizontal'

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
        src={bannerHorizontal[0].image}
        alt=""
        width="50%"
        height="auto"
        sx={{ borderRadius: '8px' }}
      />
      <Box
        component="img"
        src={bannerHorizontal[1].image}
        alt=""
        width="50%"
        height="auto"
        sx={{ borderRadius: '8px' }}
      />
    </Box>
  )
}

export default BannerHorizontal
