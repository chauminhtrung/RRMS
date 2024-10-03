import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import { GlassMagnifier } from '@datobs/react-image-magnifiers'

const Item = ({ item, index, totalItems, addressDetail }) => {
  const openGoogleMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${addressDetail}`
    window.open(url, '_blank')
  }
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ position: 'relative' }}>
      <GlassMagnifier
        imageSrc={item.image}
        imageAlt="Example"
        square={true}
        // style={{
        //   width: '100%',
        //   height: isMobile ? '250px' : '500px',
        //   objectFit: 'cover',
        // }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          display: 'flex',
          justifyContent: 'space-between',
          width: isMobile ? '90%' : '95%',
        }}>
        <Button
          sx={{
            bgcolor: 'primary.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          variant="contained"
          onClick={openGoogleMap}
          startIcon={<FmdGoodIcon />}>
          {isMobile ? '' : 'Xem vị trí'}
        </Button>
        <Typography color="white" variant="h6">
          Ảnh {index + 1}/{totalItems}
        </Typography>
      </Box>
    </Box>
  )
}

export default Item
