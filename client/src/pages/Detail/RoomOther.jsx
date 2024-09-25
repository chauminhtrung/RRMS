/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Box, Card, CardContent, CardMedia, Rating, Typography } from '@mui/material'
import Slider from 'react-slick'

import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined'
import PrevArrow from './PrevArrow'
import NextArrow from './NextArrow'

const RoomOther = ({ items }) => {
  const [showArrows, setShowArrows] = useState(false)

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow visible={showArrows} />,
    prevArrow: <PrevArrow visible={showArrows} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <Box
      sx={{
        padding: 2,
        position: 'relative',
      }}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <Slider {...settings}>
        {items.map((item, index) => (
          <Box key={index} sx={{ padding: '0 10px' }}>
            <Card>
              <CardMedia component="img" image={item.images[0]} />
              <CardContent
                sx={{
                  p: 1,
                  '&:last-child': {
                    pb: 0,
                  },
                }}
              >
                <Typography variant="inherit">{item.name}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: 0,
                  }}
                >
                  <Rating
                    sx={{
                      alignItems: 'center',
                      my: 0.5,
                    }}
                    name="simple-controlled"
                    value={2}
                    size="small"
                    readOnly
                  />
                  <Typography>{'(5)'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Person4OutlinedIcon />
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.owner} -
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.address}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: (theme) => (theme.palette.mode === 'light' ? '#ff4757' : '#ff6b81'),
                    }}
                  >
                    {item.price} VND
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {item.area} m2
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

export default RoomOther
