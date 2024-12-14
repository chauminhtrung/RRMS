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
import DeleteIcon from '@mui/icons-material/Delete'
import { blue } from '@mui/material/colors'

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
        <Grid item xs={12} md={6}>
          {/* <Slider {...settings}>
            {hearts.map((heart) => (
              <Card
                key={heart.bulletinBoardId}
                sx={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  mb: 4
                }}>
                <Box>
                  <img
                    src={heart.bulletinBoardImages[0].imageLink}
                    alt={`Slide ${heart.bulletinBoardId}`}
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
          </Slider> */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {hearts.map((heart) => (
              <Card
                key={heart.bulletinBoardId}
                sx={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  mb: 4
                }}>
                <Box>
                  <img
                    src={heart.bulletinBoardImages[0]?.imageLink} // Assuming the image is in this structure
                    alt={`Slide ${heart.bulletinBoardId}`}
                    style={{ width: '100%', maxHeight: '380px', objectFit: 'cover' }}
                  />
                </Box>

                <IconButton
                  onClick={() => handleHeartClick(heart.bulletinBoardId)}
                  sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '25px',
                    transition: 'color 0.3s ease, border 0.3s ease',
                    borderRadius: '50%',
                    padding: '6px'
                  }}>
                  <DeleteIcon sx={{ fontSize: '40px', color: blue[500] }} />
                </IconButton>
              </Card>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#3f51b5', mb: 2, fontWeight: 'bold' }}>
              Chi tiết nhà trọ
            </Typography>
            <Divider sx={{ my: 1 }} />
            {hearts.length > 0 &&
              hearts.map((heart, idx) => (
                <Grid container spacing={2} key={idx}>
                  {[
                    { label: 'Giá tiền:', value: `${heart.rentPrice} VNĐ/tháng`, icon: <MonetizationOnIcon /> },
                    { label: 'Diện tích:', value: `${heart.area} m²`, icon: <ShowChartIcon /> },
                    { label: 'Địa chỉ:', value: heart.address, icon: <HomeIcon /> },
                    {
                      label: 'Tiện ích:',
                      value: heart.bulletinBoards_RentalAm?.rentalAmenities?.[0]?.name || 'Không có tiện ích',
                      icon: <DesignServicesIcon />
                    },
                    {
                      label: 'Tình trạng phòng:',
                      value: heart.isActive ? 'Còn phòng' : 'Hết phòng',
                      icon: <AutorenewIcon />
                    }
                  ].map((info, index) => (
                    <Grid item xs={12} sm={6} md={6} key={index}>
                      <Typography
                        variant="span"
                        sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', mt: 3 }}>
                        {info.icon}
                        <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>{info.label}</span>
                      </Typography>
                      <Typography variant="span" sx={{ whiteSpace: 'nowrap', mt: 1 }}>
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
              ))}
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 5 }} />
    </Container>
  )
}

export default Heart
