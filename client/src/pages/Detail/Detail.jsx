/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Pagination,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
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
import { formatterAmount } from '~/utils/formatterAmount'
import { useEffect, useState } from 'react'
import UserRaiting from './UserRaiting'
import { useTranslation } from 'react-i18next'

const Detail = ({ setIsAdmin }) => {
  const { t } = useTranslation()
  const [detail, setDetail] = useState(null)
  const [showArrows, setShowArrows] = useState(false)
  const [roomRating, setRoomRating] = useState(0)
  const { roomId } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [commentsPerPage] = useState(5)

  useEffect(() => {
    setIsAdmin(false)
    window.scrollTo(0, 0)
  }, [])

  const calculateAvgRating = () => {
    if (detail && detail.roomReviews && detail.roomReviews.length > 0) {
      let sum = 0
      detail.roomReviews.forEach((item) => {
        sum += item.rating
      })
      const avgRating = (sum / detail.roomReviews.length).toFixed(2)
      setRoomRating(Number(avgRating))
    } else {
      setRoomRating(0)
    }
  }

  useEffect(() => {
    getDetail(roomId).then((res) => {
      setDetail(res.data.result)
    })
  }, [roomId])

  const indexOfLastComment = currentPage * commentsPerPage
  const indexOfFirstComment = indexOfLastComment - commentsPerPage
  const currentComments = detail?.roomReviews.slice(indexOfFirstComment, indexOfLastComment)

  const paginate = (event, value) => {
    setCurrentPage(value)
  }

  const setReviews = (newReview) => {
    setDetail((prevDetail) => ({
      ...prevDetail,
      roomReviews: [...prevDetail.roomReviews, newReview], // Thêm bình luận mới
    }))
  }

  useEffect(() => {
    calculateAvgRating()
  }, [detail])

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
          <img className="image-paging" src={detail.roomImages[i].image}></img>
        </a>
      )
    },
  }

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
        <Link color="inherit" to="/">
          {t('trang-chu')}
        </Link>
        <Link color="inherit" to="/">
          {detail.motel.motelName}
        </Link>
        <Link color="inherit" to="/">
          {detail.typeRoom.name}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{detail.nameRoom}</Typography>
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
            {detail.roomImages.map((item, i) => (
              <Item
                key={i}
                index={i}
                item={item}
                addressDetail={detail.motel.address}
                totalItems={detail.roomImages.length}
              />
            ))}
          </Slider>

          <Typography variant="h5" sx={{ mt: 8 }}>
            {detail.nameRoom}
          </Typography>
          <Typography variant="h6">{detail.motel.address}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5" sx={{ my: 2, color: 'red' }}>
              {formatterAmount(detail.price)}/{t('thang')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 0 }}>
              <Rating
                sx={{ alignItems: 'center', my: 0.5 }}
                name="simple-controlled"
                value={roomRating}
                size="medium"
                readOnly
              />
              <Typography>{`(${roomRating})`}</Typography>
            </Box>
          </Box>

          <Grid container>
            <Grid item xs={6}>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <TagIcon sx={{ mr: 0.5 }} />
                <Typography sx={{ display: isMobile ? 'none' : 'block', mx: 0.5 }}>{t('chuyen-muc')}: </Typography>
                {detail.typeRoom.name}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <LanguageIcon sx={{ mr: 0.5 }} />
                <Typography sx={{ display: isMobile ? 'none' : 'block', mx: 0.5 }}>{t('tinh-trang')}: </Typography>
                {detail.available ? 'Đang cho thuê' : 'Đã có người thuê'}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <CalendarMonthIcon sx={{ mr: 0.5 }} />
                <Typography sx={{ display: isMobile ? 'none' : 'block', mx: 0.5 }}>{t('gio-giac')}: </Typography>
                {detail.hours}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <AccessTimeIcon sx={{ mr: 0.5 }} />
                <Typography sx={{ display: isMobile ? 'none' : 'block', mx: 0.5 }}>
                  {t('ngay-bat-dau-cho-thue')}:
                </Typography>
                {detail.rentalStartTime}
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  color: detail.censor ? 'lime' : 'red',
                }}>
                <ShieldOutlinedIcon sx={{ mr: 0.5, color: '#6B6B6B' }} />
                <Typography sx={{ display: isMobile ? 'none' : 'block', mx: 0.5 }}>{t('kiem-duyet')}: </Typography>
                {detail.censor ? 'Đã kiểm duyệt' : 'Chưa kiểm duyệt'}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <GroupIcon sx={{ mr: 0.5 }} />
                <Typography sx={{ display: isMobile ? 'none' : 'block', mr: 0.5 }}>{t('toi-da-nguoi-o')}: </Typography>
                {detail.maxPerson}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ gap: 2, justifyContent: 'center', my: 2 }}>
            <Grid item xs={5} md={2.8} sx={{ border: '1px solid black', borderRadius: '5px', p: '5px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoneyIcon />
                <Box>
                  <Typography>{t('tien-coc')}</Typography>
                  <Typography sx={{ color: '#2ed573' }}>{formatterAmount(detail.deposit)}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={5} md={2.8} sx={{ border: '1px solid black', borderRadius: '5px', p: '5px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CropIcon />
                <Box>
                  <Typography>{t('dien-tich')}</Typography>
                  <Typography>{detail.roomArea} m2</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={5} md={2.8} sx={{ border: '1px solid black', borderRadius: '5px', p: '5px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ElectricBoltIcon />
                <Box>
                  <Typography>{t('tien-dien')}</Typography>
                  {detail.roomServices.map(
                    (item, i) =>
                      item.service.nameService === 'Điện' && (
                        <Typography key={i}>{formatterAmount(item.service.price)}/Kw</Typography>
                      )
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={5} md={2.8} sx={{ border: '1px solid black', borderRadius: '5px', p: '5px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WaterDropOutlinedIcon />
                <Box>
                  <Typography>{t('tien-nuoc')}</Typography>
                  {detail.roomServices.map(
                    (item, i) =>
                      item.service.nameService === 'Nước' && (
                        <Typography key={i}>{formatterAmount(item.service.price)}/Khối</Typography>
                      )
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h5">{t('diem')} (+)</Typography>
          <Grid container sx={{ gap: 2, justifyContent: isMobile ? 'center' : 'start', my: 2 }}>
            {detail.roomServices.map(
              (item, i) =>
                item.service.nameService !== 'Điện' &&
                item.service.nameService !== 'Nước' && (
                  <Grid item md={3.8} xs={5} key={i}>
                    <Box
                      sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: '5px', p: '10px' }}>
                      {item.service.nameService}
                    </Box>
                  </Grid>
                )
            )}
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
              {t('sao-chep')}
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
                {t('luu-xem-sau')}
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
                {t('chia-se')} facebook
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
                {t('chia-se')}
              </Button>
            </Grid>
          </Grid>
          <BannerHorizontal />
          <RaitingAvg reviews={detail.roomReviews} rating={roomRating} />
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Pagination
              count={Math.ceil(detail.roomReviews.length / commentsPerPage)} // Tổng số trang
              page={currentPage} // Trang hiện tại
              onChange={paginate} // Hàm xử lý sự kiện khi chuyển trang
              color="primary.main"
              size="medium"
            />
          </Box>
          {currentComments.map((item, i) => (
            <Comment key={i} item={item} roomId={detail.roomId} />
          ))}
          <UserRaiting roomId={detail.roomId} setReviews={setReviews} username={'dung'} fullname={'Trí Dũng'} />
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
                <Typography variant="h5">{t('phong-tro-cung-dia-chi')}</Typography>
                <Typography variant="subtitle1">
                  {t('xem-them')} {detail.typeRoom.name}, {t('nha-tro-tai')} {detail.motelName}
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
