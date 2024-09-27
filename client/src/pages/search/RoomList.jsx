import { Box, Grid, Typography, Card, CardMedia, CardContent, Button, Avatar, Pagination } from '@mui/material'
import { search } from '~/apis/mock-data-search'
import { formatterAmount } from '~/utils/formatterAmount'

const RoomList = () => {
  // console.log(search.images); // Kiểm tra dữ liệu

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
                    }}
                  />

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      textAlign: { xs: 'center', sm: 'left' },
                    }}>
                    <Typography variant="h6" noWrap>
                      {search.address}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal', // Cho phép xuống dòng
                      }}>
                      {search.addressDetail} {/* Sử dụng item.addressDetail */}
                    </Typography>

                    <Typography variant="h6" color="error" sx={{ mt: 1 }}>
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
                    <Button variant="outlined" color="primary" fullWidth sx={{ textTransform: 'none' }}>
                      Zalo
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      sx={{ textTransform: 'none', ml: { xs: 2, sm: 0 } }}>
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
