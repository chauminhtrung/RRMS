import { Box, Grid, Typography, Card, CardMedia, CardContent, Button, Avatar, Pagination } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatterAmount } from '~/utils/formatterAmount'

const RoomList = () => {
  const [searchData, setSearchData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [])

  const handlePageChange = (roomId) => {
    navigate(`/detail/${roomId}`)
  }

  const loadData = async () => {
    try {
      const result = await axios.get('http://localhost:8080/searchs', {
        validateStatus: () => true,
      })

      console.log(result.data) // Kiểm tra cấu trúc dữ liệu

      if (result.status === 200) {
        // Kiểm tra nếu status là 200
        setSearchData(result.data.result || []) // Gán dữ liệu vào state, đảm bảo là mảng
      } else {
        console.log('Error: Status', result.status)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <Box>
      <Box sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {searchData.length > 0 ? (
              searchData.map((item, i) => (
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
                      variant="h6"
                      noWrap
                      sx={{
                        transition: 'color 0.3s',
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
                      {item.addressDetail}
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

                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <Box component="span" sx={{ mr: 2 }}>
                        {item.roomArea} m²
                      </Box>
                      {item.roomServices.map((service, index) => (
                        <Box key={index}>
                          {service.service.typeService === 'Điện nước' ? (
                            <Box>
                              {service.service.nameService === 'Nước' && (
                                <Box component="span" sx={{ mr: 2 }}>
                                  {formatterAmount(service.service.price)}/khối
                                </Box>
                              )}
                              {service.service.nameService === 'Điện' && (
                                <Box component="span">{formatterAmount(service.service.price)}/Kw</Box>
                              )}
                            </Box>
                          ) : null}
                        </Box>
                      ))}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Avatar src={item.motel.avatar} sx={{ mr: 1 }} />
                      <Typography variant="caption" color="textSecondary" noWrap>
                        Trinh, 2 ngày trước
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'row', sm: 'column' },
                      alignItems: { xs: 'center', sm: 'flex-end' },
                      gap: 1,
                      width: { xs: '100%', sm: 'auto' },
                      mt: { xs: 2, sm: 0 },
                    }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        transition: 'background-color 0.3s, color 0.3s',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: '#fff',
                        },
                      }}>
                      Zalo
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        ml: { xs: 2, sm: 0 },
                        transition: 'background-color 0.3s, color 0.3s',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: '#fff',
                        },
                      }}>
                      Xem SĐT
                    </Button>
                  </Box>
                </Card>
              ))
            ) : (
              <Typography variant="h6" color="textSecondary">
                Không có dữ liệu để hiển thị.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination count={10} />
        {/* <Pagination count={Math.ceil(searchData.length / 10)} color="primary" size="medium" />{' '} */}
        {/* Giả sử hiển thị 10 item mỗi trang */}
      </Box>
    </Box>
  )
}

export default RoomList
