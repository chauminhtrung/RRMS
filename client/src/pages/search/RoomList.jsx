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
  Snackbar
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatterAmount } from '~/utils/formatterAmount'
import MuiAlert from '@mui/material/Alert'
import SearchList from './SearchList'
import FilterSearch from './FilterSearch'
import LoadingPage from '~/components/LoadingPage/LoadingPage'
import { getHeartByUsername, insertHeart } from '~/apis/heartAPI'
import Swal from 'sweetalert2'

const RoomList = ({ setSearchValue, searchData, totalRooms }) => {
  const [favorites, setFavorites] = useState({})
  const [visiblePhoneNumbers, setVisiblePhoneNumbers] = useState({})
  const [open, setOpen] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  // Thêm trạng thái cho trang hiện tại
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // Số lượng item hiển thị mỗi trang
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
  console.log('77777')
  console.log(hearts)

  const handleToggle = (id) => {
    setVisiblePhoneNumbers((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }
  const handleAddHeart = async (it) => {
    const username = JSON.parse(sessionStorage.getItem('user')).username
    const response = await insertHeart(username, it)
    if (response.code == 201) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Đã thêm vào yêu thích'
      })
      getAllHeartByAccount()
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: 'Thêm yêu thích thất bại'
      })
    }
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
  function hasMatchingItem(array, item) {
    return array.some((element) => element.bulletinBoardId === item.bulletinBoardId) // Thay đổi tùy thuộc vào cấu trúc dữ liệu của bạn
  }

  const handleHeartClick = (cardId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = {
        ...prevFavorites,
        [cardId]: !prevFavorites[cardId]
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

  useEffect(() => {
    getAllHeartByAccount()
  }, [])

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
    // console.log(currentItems) // Hiển thị các phần tử hiện tại
  } else {
    currentItems = []
  }
  const [message, setMessage] = useState('')

  // Hàm sẽ được gọi từ component con
  const handleFilter = (e) => {
    console.log(e) // Kiểm tra giá trị, ví dụ: "asc" hoặc "desc"

    // Tạo bản sao mảng `currentItems` (đảm bảo bạn định nghĩa trước đó)
    const sortedItems = [...currentItems].sort((a, b) => {
      if (e === 'asc') {
        return a.rentPrice - b.rentPrice // Sắp xếp tăng dần
      } else if (e === 'desc') {
        return b.rentPrice - a.rentPrice // Sắp xếp giảm dần
      }
      return 0 // Nếu không phải "asc" hoặc "desc", không thay đổi thứ tự
    })

    console.log(sortedItems) // Kiểm tra mảng đã sắp xếp
    currentItems = sortedItems // Cập nhật state
  }

  return (
    <Box>
      {/* <FilterSearch onSearch={handleSearchResult} /> */}
      <SearchList setFilter={handleFilter} totalRooms={totalRooms} searchData={searchData} />
      <Box sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {currentItems?.length > 0 ? (
              currentItems?.map((item1, i) => (
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
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}>
                  <CardMedia
                    component="img"
                    image={item1?.bulletinBoardImages?.[0]?.imageLink || 'default_image_url.jpg'}
                    alt="Chung cư"
                    onClick={() => handlePageChange(item1?.bulletinBoardId)}
                    sx={{
                      width: { xs: '100%', sm: 200 },
                      height: { xs: 200, sm: 150 },
                      objectFit: 'cover',
                      borderRadius: '8px',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
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
                        color: 'primary.main'
                      }
                    }}>
                    <Typography
                      variant="h5"
                      noWrap
                      sx={{
                        transition: 'color 0.3s',
                        fontWeight: 'bold',
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}>
                      {item1?.title}
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
                          fontWeight: 500
                        }
                      }}>
                      {item1?.address}
                    </Typography>

                    <Typography
                      variant="h6"
                      color="error"
                      sx={{
                        mt: 1,
                        transition: 'color 0.3s, transform 0.3s',
                        '&:hover': {
                          color: 'primary.main',
                          transform: 'scale(1.05)'
                        }
                      }}>
                      {formatterAmount(item1?.rentPrice)} /Tháng
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ mt: 1, display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                      <Box component="span" sx={{ mr: 2 }}>
                        {item1?.area} m²
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
                        {/* Hiển thị giá Nước nếu có */}
                        {item1?.waterPrice && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            <Box component="span">{formatterAmount(item1?.waterPrice)}/khối</Box>
                          </Box>
                        )}

                        {/* Hiển thị giá Điện nếu có */}
                        {item1?.electricityPrice && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            <Box component="span">{formatterAmount(item1?.electricityPrice)}/Kw</Box>
                          </Box>
                        )}
                      </Box>
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Avatar
                        src={item1?.account?.avatar || '/path/to/default-avatar.png'} // Dùng ảnh mặc định nếu avatar không có
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="caption" color="textSecondary" noWrap>
                        {item1?.account?.username || 'Người dùng không có sẵn'}, 2 ngày trước
                      </Typography>
                      {console.log(hasMatchingItem(hearts, item1))}
                      {hasMatchingItem(hearts, item1) ? (
                        <IconButton
                          sx={{
                            ml: 'auto',
                            color: 'red',
                            transition: 'color 0.3s ease, border 0.3s ease',
                            border: '2px solid red',
                            borderRadius: '50%',
                            padding: '5px',
                            mx: 3,
                            marginLeft: 8,
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                          <FavoriteIcon
                            onClick={() =>
                              Swal.fire({
                                icon: 'error',
                                title: 'Thông báo',
                                text: 'Phòng này đã được thêm trước đó'
                              })
                            }
                            sx={{ fontSize: '35px' }}
                          />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => handleHeartClick(item1?.bulletinBoardRules[0].bulletinBoardRuleId)} // Here we access the bulletinBoardRuleId of the first rule (adjust as necessary)
                          sx={{
                            ml: 'auto',
                            borderRadius: '50%',
                            padding: '5px',
                            mx: 3,
                            marginLeft: 8,
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                          <FavoriteIcon
                            onClick={() => handleAddHeart(item1.bulletinBoardId)}
                            sx={{ fontSize: '35px' }}
                          />
                        </IconButton>
                      )}
                    </Box>
                  </CardContent>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'row', sm: 'column' },
                      alignItems: { xs: 'center', sm: 'flex-end' },
                      gap: 1.75,
                      width: { xs: '100%', sm: 'auto' },
                      mt: { xs: 2, sm: 0 }
                    }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={handleClick} // Gọi hàm khi click vào nút
                      sx={{
                        textTransform: 'none',
                        padding: '8px 16px'
                      }}>
                      Zalo
                    </Button>

                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => handleToggle(item1?.roomId)}
                      sx={{
                        textTransform: 'none',
                        ml: { xs: 2, sm: 0 },
                        transition: 'background-color 0.3s, color 0.3s',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: '#fff'
                        }
                      }}>
                      {visiblePhoneNumbers[item1?.roomId] ? item1?.motel.account.phone : 'Xem SĐT'}
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
        count={Math.ceil(searchData?.length / itemsPerPage)} // Tổng số trang
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
