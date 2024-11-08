import { Box, Button, Chip, Typography, useMediaQuery } from '@mui/material'
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
        style={{ borderRadius: '10px' }}
        imageSrc={item.imageLink}
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
          width: isMobile ? '90%' : '95%'
        }}>
        <Button
          sx={{
            bgcolor: 'primary.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          variant="contained"
          onClick={openGoogleMap}
          startIcon={<FmdGoodIcon />}>
          {isMobile ? '' : 'Xem vị trí'}
        </Button>
        <Chip
          label={
            <Typography
              color="white"
              variant="h6"
              sx={{
                fontWeight: 'bold',
                textShadow: '1px 1px #000'
              }}>
              ảnh {index + 1}/{totalItems}
            </Typography>
          }
          variant="outlined"
        />
      </Box>
    </Box>
  )
}

export default Item
