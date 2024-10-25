/* eslint-disable no-unused-vars */
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Avatar,
  Pagination,
  IconButton,
  Snackbar,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatterAmount } from '~/utils/formatterAmount'
import MuiAlert from '@mui/material/Alert'
import SearchList from './SearchList'
import FilterSearch from './FilterSearch'
import LoadingPage from '~/components/LoadingPage'

const RoomList = ({ setSearchValue, searchData, totalRooms }) => {
  const [favorites, setFavorites] = useState({})
  const [visiblePhoneNumbers, setVisiblePhoneNumbers] = useState({})
  const [open, setOpen] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  // Thêm trạng thái cho trang hiện tại
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7 // Số lượng item hiển thị mỗi trang

  const handleToggle = (id) => {
    setVisiblePhoneNumbers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleClick = () => {
    const linkToCopy = 'https://www.youtube.com/watch?v=sshkYoROZrI'

    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        setLinkCopied(true)
        setOpen(true)
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleHeartClick = (cardId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = {
        ...prevFavorites,
        [cardId]: !prevFavorites[cardId],
      }
      console.log('Updated favorites:', newFavorites)
      return newFavorites
    })
  }
  // Hàm xử lý sự kiện thay đổi trang
  const handlePageChangeNumber = (event, value) => {
    setCurrentPage(value)
  }
  const navigate = useNavigate()

  const handlePageChange = (roomId) => {
    navigate(`/detail/${roomId}`)
  }

  useEffect(() => {}, [])

  // Gọi loadData khi searchValue thay đổi

  // const handleSearchResult = (search) => {
  //   setSearchValue(search)
  //   loadData(search)
  // }

  // Tính toán các item hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage // Vị trí item cuối trên trang hiện tại
  const indexOfFirstItem = indexOfLastItem - itemsPerPage // Vị trí item đầu trên trang hiện tại
  let currentItems = []
  if (Array.isArray(searchData)) {
    currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem)
    console.log(currentItems) // Hiển thị các phần tử hiện tại
  } else {
    currentItems = []
  }

  return (
    <Box>
      {/* <FilterSearch onSearch={handleSearchResult} /> */}
      <SearchList totalRooms={totalRooms} />
      <Box sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {currentItems.length > 0 ? (
              currentItems.map((item, i) => (
                <Card
                  key={i}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    p: 2,
                    boxShadow: 3,
                    width: '100%',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    mt: 1,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}>
                  <CardMedia
                    component="img"
                    image={item.roomImages[0].image}
                    alt="Chung cư"
                    onClick={() => handlePageChange(item.roomId)}
                    sx={{
                      width: { xs: '100%', sm: 200 },
                      height: { xs: 200, sm: 150 },
                      objectFit: 'cover',
                      borderRadius: '8px',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      textAlign: { xs: 'center', sm: 'left' },
                      transition: 'color 0.3s',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}>
                    <Typography
                      variant="h5"
                      noWrap
                      sx={{
                        transition: 'color 0.3s',
                        fontWeight: 'bold',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}>
                      {item.nameRoom}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        transition: 'color 0.3s, font-weight 0.3s',
                        '&:hover': {
                          color: 'primary.main',
                          fontWeight: 500,
                        },
                      }}>
                      {item.motel.address}
                    </Typography>

                    <Typography
                      variant="h6"
                      color="error"
                      sx={{
                        mt: 1,
                        transition: 'color 0.3s, transform 0.3s',
                        '&:hover': {
                          color: 'primary.main',
                          transform: 'scale(1.05)',
                        },
                      }}>
                      {formatterAmount(item.price)} /Tháng
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ mt: 1, display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                      <Box component="span" sx={{ mr: 2 }}>
                        {item.roomArea} m²
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
                        {item.roomServices.map((service, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mr: 2, mx: 1 }}>
                            {service.service.typeService === 'Điện nước' && (
                              <>
                                {service.service.nameService === 'Nước' && (
                                  <Box component="span">{formatterAmount(service.service.price)}/khối</Box>
                                )}
                                {service.service.nameService === 'Điện' && (
                                  <Box component="span">{formatterAmount(service.service.price)}/Kw</Box>
                                )}
                              </>
                            )}
                          </Box>
                        ))}
                      </Box>
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Avatar src={item.motel.account.avatar} sx={{ mr: 1 }} />
                      <Typography variant="caption" color="textSecondary" noWrap>
                        {item.motel.account.username}, 2 ngày trước
                      </Typography>
                      <IconButton
                        onClick={() => handleHeartClick(item.roomId)}
                        sx={{
                          ml: 'auto',
                          color: favorites[item.roomId] ? 'red' : 'gray',
                          transition: 'color 0.3s ease, border 0.3s ease',
                          border: favorites[item.roomId] ? '2px solid red' : '1px solid transparent',
                          borderRadius: '50%',
                          padding: '5px',
                          mx: 3,
                          marginLeft: 8,
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <FavoriteIcon sx={{ fontSize: '35px' }} />
                      </IconButton>
                    </Box>
                  </CardContent>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'row', sm: 'column' },
                      alignItems: { xs: 'center', sm: 'flex-end' },
                      gap: 1.75,
                      width: { xs: '100%', sm: 'auto' },
                      mt: { xs: 2, sm: 0 },
                    }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={handleClick} // Gọi hàm khi click vào nút
                      sx={{
                        textTransform: 'none',
                        padding: '8px 16px',
                      }}>
                      Zalo
                    </Button>

                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => handleToggle(item.roomId)}
                      sx={{
                        textTransform: 'none',
                        ml: { xs: 2, sm: 0 },
                        transition: 'background-color 0.3s, color 0.3s',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: '#fff',
                        },
                      }}>
                      {visiblePhoneNumbers[item.roomId] ? item.motel.account.phone : 'Xem SĐT'}
                    </Button>
                  </Box>
                </Card>
              ))
            ) : (
              <LoadingPage />
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Component Pagination */}
      <Pagination
        count={Math.ceil(searchData.length / itemsPerPage)} // Tổng số trang
        page={currentPage} // Trang hiện tại
        onChange={handlePageChangeNumber} // Hàm xử lý khi thay đổi trang
        variant="outlined"
        color="primary"
        sx={{ mt: 4, display: 'flex', justifyContent: 'center' }} // Đặt margin-top và căn giữa
      />

      {/* Snackbar thông báo */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert elevation={6} severity="success" onClose={handleClose}>
          Sao chép liên kết thành công!
        </MuiAlert>
      </Snackbar>
    </Box>
  )
}

export default RoomList
