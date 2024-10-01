import { Box, Grid, Typography, Card, CardMedia, CardContent, Button, Avatar, Pagination } from '@mui/material'
import { search } from '~/apis/mock-data-search'
import { formatterAmount } from '~/utils/formatterAmount'

const RoomList = () => {
  return (
    <Box>
      <Box sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {search.images.length > 0 ? (
              search.images.map((item, i) => (
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
                    // '&:hover': {
                    //   transform: 'translateY(-5px)',
                    //   boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    // },
                  }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt="Chung cư"
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
                      {search.address}
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
                      {search.addressDetail}
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
                      {formatterAmount(search.price)} /Tháng
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <Box component="span" sx={{ mr: 2 }}>
                        {search.acreage} m²
                      </Box>
                      <Box component="span" sx={{ mr: 2 }}>
                        {formatterAmount(search.water)}/khối
                      </Box>
                      <Box component="span">{formatterAmount(search.electricity)}/Kw</Box>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Avatar src={item.avata} sx={{ mr: 1 }} />
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
        <Pagination count={20} color="primary.main" size="medium" />
      </Box>
    </Box>
  )
}

export default RoomList
