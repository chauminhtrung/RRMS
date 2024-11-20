import { useState } from 'react'
import { Box, Card, CardContent, CardMedia, Chip, Rating, Typography } from '@mui/material'
import Slider from 'react-slick'

import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined'

import GppGoodIcon from '@mui/icons-material/GppGood'
import PrevArrow from './PrevArrow'
import NextArrow from './NextArrow'
import { formatterAmount } from '~/utils/formatterAmount'

const RoomOther = ({ items }) => {
  const [showArrows, setShowArrows] = useState(false)

  const calculateAvgRating = (listRating) => {
    if (listRating && listRating.length > 0) {
      const sum = listRating.reduce((total, { rating }) => total + rating, 0)
      return Number((sum / listRating.length).toFixed(2))
    }
    return 0
  }

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
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  }

  return (
    <Box
      sx={{
        padding: 2,
        position: 'relative'
      }}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}>
      <Slider {...settings}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: '0 10px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center'
              }}>
              <Box sx={{ position: 'absolute', top: 0, right: 10 }}>
                <div className="images-count">{item.bulletinBoardImages.length}</div>
                <div className="bookmark-item bookmark" data-post="712" id="post_712">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
              </Box>
              <Chip
                sx={{
                  position: 'absolute',
                  bottom: 115,
                  left: 20,
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.64)',
                  borderRadius: '5px',
                  width: 100,
                  height: 25,
                  '& .MuiChip-label': {
                    p: 0
                  }
                }}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <GppGoodIcon sx={{ color: '#2ed573', fontSize: '20px' }} />
                    <Typography variant="body2" color="text.primary" sx={{ color: '#043d1c', fontSize: '12px' }}>
                      Đã xác minh
                    </Typography>
                  </Box>
                }
                variant="outlined"
              />
              <Card sx={{ maxWidth: 350 }}>
                <CardMedia
                  component="img"
                  image={item?.bulletinBoardImages[0]?.imageLink || '/placeholder.jpg'}
                  sx={{ height: 200 }}
                />
                <CardContent sx={{ p: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ color: (theme) => (theme.palette.mode === 'light' ? '#ff4757' : '#ff6b81') }}>
                      {formatterAmount(item?.rentPrice)}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {item?.area} m²
                    </Typography>
                  </Box>
                  <Typography variant="body1" gutterBottom>
                    {item?.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Rating
                      name="rating"
                      value={calculateAvgRating(item?.bulletinBoardReviews)}
                      size="small"
                      readOnly
                    />
                    <Typography variant="caption">{item?.bulletinBoardReviews?.length} đánh giá</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Person4OutlinedIcon fontSize="small" />
                    <Typography variant="subtitle2" color="text.secondary">
                      {item?.account?.fullname}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                      {item?.address}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Slider>
    </Box>
  )
}

export default RoomOther
