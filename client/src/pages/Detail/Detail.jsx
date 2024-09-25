import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Pagination,
  Rating,
  TextareaAutosize,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Link } from 'react-router-dom'
import Item from './Item'
import UserDetail from './UserDetail'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import FacebookIcon from '@mui/icons-material/Facebook'
import SendIcon from '@mui/icons-material/Send'
import TagIcon from '@mui/icons-material/Tag'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CropIcon from '@mui/icons-material/Crop'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined'
import GroupIcon from '@mui/icons-material/Group'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import { useEffect, useState } from 'react'
import { getDetail } from '~/apis/apiClient'
import { roomOrder } from '~/apis/mock-data-room-order'
import RoomOther from './RoomOther'
import RaitingAvg from './RaitingAvg'
import Comment from './Comment'
import BannerHorizontal from '~/components/BannerHorizontal'
import Slider from 'react-slick'
import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'
import LoadingPage from '~/components/LoadingPage'

const Detail = () => {
  const [detail, setDetail] = useState(null)
  const [raiting, setRaiting] = useState(0)
  const [showArrows, setShowArrows] = useState(false)

  useEffect(() => {
    getDetail().then((res) => {
      setDetail(res.data)
    })
  }, [])

  const share = async () => {
    try {
      await navigator.share({
        title: detail.title,
        text: detail.name,
        url: window.location.href,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getDescription = (description) => {
    navigator.clipboard.writeText(description)
    alert('Đã sao chép mô tả')
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value)
  }

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  if (!detail) {
    return <LoadingPage />
  }

  const settings = {
    dotsClass: 'slick-dots slick-thumb',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow visible={showArrows} />,
    prevArrow: <PrevArrow visible={showArrows} />,
    customPaging: function (i) {
      if (isMobile) return <Box sx={{ display: 'none' }}></Box>
      return (
        <a>
          <img className="image-paging" src={detail.images[i].image}></img>
        </a>
      )
    },
  }

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
        <Link color="inherit" to="/">
          Trang chủ
        </Link>
        <Link color="inherit" to="/">
          {detail.address}
        </Link>
        <Link color="inherit" to="/">
          {detail.type}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{detail.name}</Typography>
      </Breadcrumbs>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={8}
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
          sx={{
            '.slick-dots.slick-thumb': {
              position: 'relative',
              ml: -3,
            },
            '.slick-dots.slick-thumb li': {
              mx: '30px',
            },
            '.image-paging': {
              width: '50px',
              height: '50px',
              transition: 'all 0.1s ease-in-out',
            },
            '.slick-dots.slick-thumb li.slick-active a img': {
              transform: 'scale(1.2)',
            },
          }}>
          <Slider {...settings} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {detail.images.map((item, i) => (
              <Item
                key={i}
                index={i}
                item={item}
                addressDetail={detail.addressDetail}
                totalItems={detail.images.length}
              />
            ))}
          </Slider>

          <Typography variant="h5" sx={{ mt: 8 }}>
            {detail.name}
          </Typography>
          <Typography variant="h6">{detail.addressDetail}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5" sx={{ my: 2, color: 'red' }}>
              {formatNumber(detail.price)}đ/tháng
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 0 }}>
              <Rating
                sx={{ alignItems: 'center', my: 0.5 }}
                name="simple-controlled"
                value={5}
                size="medium"
                readOnly
              />
              <Typography>{'(5)'}</Typography>
            </Box>
          </Box>

          <Grid container>
            <Grid item xs={6}>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <TagIcon sx={{ mr: 0.5 }} />
                <Typography sx={{ display: isMobile ? 'none' : 'block', mx: 0.5 }}>Chuyên mục: </Typography>
                {detail.type}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <LanguageIcon sx={{ mr: 0.5 }} />
                <Typography sx={{ display: isMobile ? 'none' : 'block', mx: 0.5 }}>Tình trạng: </Typography>
                {detail.status}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <CalendarMonthIcon sx={{ mr: 0.5 }} />
                <Typography sx={{ display: isMobile ? 'none' : 'block', mx: 0.5 }}>Giờ giấc: </Typography>
                {detail.hours}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <AccessTimeIcon sx={{ mr: 0.5 }} />
                <Typography sx={{ display: isMobile ? 'none' : 'block', mx: 0.5 }}>Ngày bắt đầu cho thuê:</Typography>
                {detail.rentalStartTime}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ShieldOutlinedIcon sx={{ mr: 0.5 }} />
                <Typography sx={{ display: isMobile ? 'none' : 'block', mx: 0.5 }}>Kiểm duyệt: </Typography>
                {detail.censor}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <GroupIcon sx={{ mr: 0.5 }} />
                <Typography sx={{ display: isMobile ? 'none' : 'block', mr: 0.5 }}>Tối đa người ở: </Typography>
                {detail.maximum}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ gap: 2, justifyContent: 'center', my: 2 }}>
            <Grid item xs={5} md={2.8} sx={{ border: '1px solid black', borderRadius: '5px', p: '5px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoneyIcon />
                <Box>
                  <Typography>Tiền cọc</Typography>
                  <Typography sx={{ color: '#2ed573' }}>{formatNumber(detail.deposit)}đ</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={5} md={2.8} sx={{ border: '1px solid black', borderRadius: '5px', p: '5px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CropIcon />
                <Box>
                  <Typography>Diện tích</Typography>
                  <Typography>{detail.area} m2</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={5} md={2.8} sx={{ border: '1px solid black', borderRadius: '5px', p: '5px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ElectricBoltIcon />
                <Box>
                  <Typography>Tiền điện</Typography>
                  <Typography>{formatNumber(detail.priceElectric)}đ/Kw</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={5} md={2.8} sx={{ border: '1px solid black', borderRadius: '5px', p: '5px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WaterDropOutlinedIcon />
                <Box>
                  <Typography>Tiền nước</Typography>
                  <Typography>{formatNumber(detail.priceWater)}đ/Khối</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h5">Điểm (+)</Typography>
          <Grid container sx={{ gap: 2, justifyContent: isMobile ? 'center' : 'start', my: 2 }}>
            {detail.plusPoint.map((item, i) => (
              <Grid item md={3.8} xs={5} key={i}>
                <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: '5px', p: '10px' }}>
                  {item}
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mb: 2, display: isMobile ? 'block' : 'none' }}>
            <UserDetail item={detail} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">Thông tin mô tả</Typography>
            <Button
              variant="outlined"
              sx={{ borderRadius: '25px' }}
              startIcon={<ContentCopyIcon />}
              onClick={() => getDescription(detail.description)}>
              Copy
            </Button>
          </Box>
          <TextField
            id="outlined-multiline-static"
            multiline
            variant="outlined"
            value={detail.description}
            sx={{ width: '100%', my: 2 }}
          />
          {/* 3 nút action */}
          <Grid
            container
            sx={{
              justifyContent: 'center',
              gap: 2,
            }}>
            <Grid item md={3.8} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  width: '200px',
                  bgcolor: (theme) => (theme.palette.mode === 'light' ? '#2ed573' : '#7bed9f'),
                }}
                startIcon={<BookmarkIcon />}>
                Lưu xem sau
              </Button>
            </Grid>
            <Grid item md={3.8} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  width: '200px',
                  bgcolor: (theme) => (theme.palette.mode === 'light' ? '#1e90ff' : '#70a1ff'),
                }}
                startIcon={<FacebookIcon />}>
                Chia sẻ facebook
              </Button>
            </Grid>
            <Grid item md={3.8} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  width: '200px',
                  bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffa502' : '#eccc68'),
                }}
                startIcon={<SendIcon />}
                onClick={share}>
                Chia sẻ
              </Button>
            </Grid>
          </Grid>
          <BannerHorizontal />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component="legend" sx={{ fontSize: '20px' }}>
              Đánh giá của bạn:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                sx={{
                  alignItems: 'center',
                  mx: 'auto',
                  my: 0.5,
                }}
                name="simple-controlled"
                value={raiting}
                size="large"
                onChange={(event, newValue) => {
                  setRaiting(newValue)
                }}
              />
            </Box>
            <TextareaAutosize minRows={4} sx={{ width: '100vw' }}></TextareaAutosize>
            <Button variant="contained" sx={{ mt: 2, right: 1, ml: 'auto' }}>
              Đánh giá
            </Button>
          </Box>
          <RaitingAvg />
          <Comment />
          <Comment />
          <Comment />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination count={10} color="primary.main" size="medium" />
          </Box>
          {/* Giới thiệu trọ khác */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              my: 2,
              alignItems: 'center',
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                <Typography variant="h5">Phòng trọ, nhà trọ cùng địa chỉ</Typography>
                <Typography variant="subtitle1">
                  Xem thêm {detail.type}, nhà trọ tại {detail.address}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: isMobile ? '325px' : '756px',
                    mb: 2,
                    mx: 'auto',
                  }}>
                  <RoomOther items={roomOrder} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: isMobile ? 'none' : 'block' }}>
          <UserDetail item={detail} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Detail
