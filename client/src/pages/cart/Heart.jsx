import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import {
  Box,
  Grid,
  Typography,
  Container,
  Button,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Card,
  Divider
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import HomeIcon from '@mui/icons-material/Home'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import NextArrow from '../Detail/NextArrow'
import PrevArrow from '../Detail/PrevArrow'
import { getHeartByUsername } from '~/apis/heartAPI'

const Heart = ({ setIsAdmin }) => {
  const [age, setAge] = useState(10)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showPhoneNumber, setShowPhoneNumber] = useState(false)
  const [totalPosts, setTotalPosts] = useState(1)
  const [showArrows, setShowArrows] = useState(false)
  const [hearts, setHearts] = useState([])
  const getAllHeartByAccount = async () => {
    const username = JSON.parse(sessionStorage.getItem('user')).username
    const response = await getHeartByUsername(username)
    console.log(response.data.result.bulletinBoards)
    if (response.data.code == 200) {
      setHearts(response.data.result.bulletinBoards)
      console.log(hearts)
    } else {
      setHearts([])
    }
  }
  useEffect(() => {
    setIsAdmin(false)
    getAllHeartByAccount()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  const handleHeartClick = () => {
    setIsFavorited((prev) => !prev)
  }

  const handleToggle = () => {
    setShowPhoneNumber((prev) => !prev)
  }

  // Hàm để thêm tin đăng
  const addPost = () => {
    setTotalPosts((prevTotal) => prevTotal + 1)
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow visible={showArrows} />,
    prevArrow: <PrevArrow visible={showArrows} />
  }
  const slides = [
    { id: 1, src: 'https://picsum.photos/1000/580?random=20' },
    { id: 2, src: 'https://picsum.photos/1000/580?random=19' },
    { id: 3, src: 'https://picsum.photos/1000/580?random=18' },
    { id: 4, src: 'https://picsum.photos/1000/580?random=15' },
    { id: 5, src: 'https://picsum.photos/1000/580?random=12' },
    { id: 6, src: 'https://picsum.photos/1000/580?random=10' }
  ]

  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Typography variant="h4" sx={{ mb: 1.5, fontWeight: 'bold', color: '#3f51b5' }}>
            Tin đăng đã lưu
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1, color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894') }}>
            Tổng số {totalPosts} tin đăng
          </Typography>
        </Grid>
        <Grid item xs={12} md={2} sx={{ mb: 2 }}>
          <FormControl sx={{ width: 190 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
              sx={{
                bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542'),
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}>
              <MenuItem value={10}>Tin mới nhất</MenuItem>
              <MenuItem value={20}>Giá từ thấp đến cao</MenuItem>
              <MenuItem value={30}>Giá từ cao đến thấp</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} sx={{}}>
          <Slider {...settings}>
            {slides.map((slide) => (
              <Card
                key={slide.id}
                sx={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  mb: 4
                }}>
                <Box>
                  <img
                    src={slide.src}
                    alt={`Slide ${slide.id}`}
                    onMouseEnter={() => setShowArrows(true)}
                    onMouseLeave={() => setShowArrows(false)}
                    style={{ width: '100%', maxHeight: '380px', objectFit: 'cover' }}
                  />
                </Box>

                <IconButton
                  onClick={handleHeartClick}
                  sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '25px',
                    color: isFavorited ? 'red' : 'gray',
                    transition: 'color 0.3s ease, border 0.3s ease',
                    border: isFavorited ? '2px solid red' : '1px solid transparent',
                    borderRadius: '50%',
                    padding: '6px'
                  }}>
                  <FavoriteIcon sx={{ fontSize: '40px' }} onClick={addPost} />
                </IconButton>
              </Card>
            ))}
          </Slider>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#3f51b5', mb: 2, fontWeight: 'bold' }}>
              Chi tiết nhà trọ
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Grid container spacing={2}>
              {[
                {
                  label: 'Giá tiền:',
                  value: '5,000,000 VNĐ/tháng',
                  icon: <MonetizationOnIcon />
                },
                {
                  label: 'Diện tích:',
                  value: '30 m²',
                  icon: <ShowChartIcon />
                },
                {
                  label: 'Địa chỉ:',
                  value: '123 Đường ABC, Quận XYZ, TP.HCM',
                  icon: <HomeIcon />
                },
                {
                  label: 'Tiện ích:',
                  value: 'Có chỗ để xe, Wifi miễn phí, Gần trường học',
                  icon: <DesignServicesIcon />
                },
                {
                  label: 'Tình trạng phòng:',
                  value: 'Còn phòng',
                  icon: <AutorenewIcon />
                }
              ].map((info, idx) => (
                <Grid item xs={12} sm={6} md={6} key={idx}>
                  {' '}
                  {/* Chỉnh sửa ở đây */}
                  <Typography
                    variant="span"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      mt: 3
                    }}>
                    {info.icon}
                    <span style={{ marginLeft: '8px', mt: 4 }}>{info.label}</span>
                  </Typography>
                  <Typography variant="span" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
                    {info.value}
                  </Typography>
                </Grid>
              ))}

              <Box sx={{ mt: 5, textAlign: 'center', mx: 2.5 }}>
                <Button variant="contained" onClick={handleToggle} sx={{ width: '180px', textAlign: 'center' }}>
                  {showPhoneNumber ? '0123-456-789' : 'Lấy số điện thoại'}
                </Button>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 5 }} />
    </Container>
  )
}

export default Heart
