import { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Card,
  Divider
} from '@mui/material'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import HomeIcon from '@mui/icons-material/Home'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { deleteHeart, getHeartByUsername } from '~/apis/heartAPI'
import DeleteIcon from '@mui/icons-material/Delete'
import { blue } from '@mui/material/colors'
import Swal from 'sweetalert2'
import PeopleIcon from '@mui/icons-material/People'

const Heart = ({ setIsAdmin }) => {
  const [isFavorited, setIsFavorited] = useState(false)
  // const [showArrows, setShowArrows] = useState(false)
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
  const handleDelete = async (vl) => {
    const username = JSON.parse(sessionStorage.getItem('user')).username
    const response = await deleteHeart(username, vl)
    if (response.code == 200) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Xóa thành công'
      })
      getAllHeartByAccount()
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: 'Xóa thất bại'
      })
    }
  }

  useEffect(() => {
    setIsAdmin(false)
    getAllHeartByAccount()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleHeartClick = () => {
    setIsFavorited((prev) => !prev)
  }

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   nextArrow: <NextArrow visible={showArrows} />,
  //   prevArrow: <PrevArrow visible={showArrows} />
  // }

  const changeArea = (sortOrder) => {
    let sortedItems = [...hearts]

    if (sortOrder === 'asc') {
      // Sắp xếp tăng dần theo giá
      sortedItems.sort((a, b) => a.rentPrice - b.rentPrice)
    } else if (sortOrder === 'desc') {
      // Sắp xếp giảm dần theo giá
      sortedItems.sort((a, b) => b.rentPrice - a.rentPrice)
    } else if (sortOrder === 'new') {
      sortedItems.sort((a, b) => new Date(b.moveInDate) - new Date(a.moveInDate))
    }
    setHearts(sortedItems)
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
            Tổng số {hearts.length} phòng yêu thích
          </Typography>
        </Grid>
        <Grid item xs={12} md={2} sx={{ mb: 2 }}>
          <FormControl sx={{ width: 190 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => changeArea(e.target.value)}
              sx={{
                bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542'),
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}>
              <MenuItem value="new">Tin mới nhất</MenuItem>
              <MenuItem value="asc">Giá từ thấp đến cao</MenuItem>
              <MenuItem value="desc">Giá từ cao đến thấp</MenuItem>
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
                  <DeleteIcon
                    onClick={() => handleDelete(heart.bulletinBoardId)}
                    sx={{ fontSize: '40px', color: blue[500] }}
                  />
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
                <Grid container spacing={2} key={idx} sx={{ mb: 3 }}>
                  {[
                    { label: 'Giá tiền:', value: `${heart.rentPrice} VNĐ/tháng`, icon: <MonetizationOnIcon /> },
                    { label: 'Diện tích:', value: `${heart.area} m²`, icon: <ShowChartIcon /> },
                    {
                      label: 'Địa chỉ:',
                      value: heart.address,
                      icon: <HomeIcon />,
                      sx: { wordWrap: 'break-word', whiteSpace: 'normal' }
                    },
                    {
                      label: 'Tiện ích:',
                      value: heart.bulletinBoards_RentalAm?.rentalAmenities?.[0]?.name || 'Không có tiện ích',
                      icon: <DesignServicesIcon />
                    },
                    {
                      label: 'Tình trạng phòng:',
                      value: heart.isActive ? 'Còn phòng' : 'Hết phòng',
                      icon: <AutorenewIcon />
                    },
                    {
                      label: 'Số lượng người ở:',
                      value: heart.maxPerson || 'Không giới hạn',
                      icon: <PeopleIcon />
                    }
                  ].map((info, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Typography variant="span" sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        {info.icon}
                        <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>{info.label}</span>
                      </Typography>
                      <Typography
                        variant="span"
                        sx={{
                          mt: 1,
                          display: 'block',
                          wordWrap: 'break-word',
                          whiteSpace: 'normal',
                          ...(info.sx || {})
                        }}>
                        {info.value}
                      </Typography>
                    </Grid>
                  ))}

                  <Divider sx={{ width: '100%', my: 2 }} />
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
