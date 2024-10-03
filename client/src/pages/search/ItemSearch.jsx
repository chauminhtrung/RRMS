import { Box, Grid, Typography, Paper } from '@mui/material'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import RecentActorsRoundedIcon from '@mui/icons-material/RecentActorsRounded'
import MailRoundedIcon from '@mui/icons-material/MailRounded'
const ItemSearch = () => {
  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Cho thuê phòng trọ:
      </Typography>

      {/* Danh sách các địa điểm */}
      <Grid container spacing={2} sx={{ mt: 2, border: '1px solid #dcdde1', borderRadius: '5px' }}>
        <style>
          {`
      ul li::marker {
        color: #00b894;
      }
      ul li:hover{
        color: #00b894;
        cursor: pointer
      }
    `}
        </style>
        <Grid item xs={6} md={3}>
          <ul>
            <li>Đống Đa</li>
            <li>Quận Ba Đình</li>
            <li>Bắc Từ Liêm</li>
            <li>Gia Lâm</li>
            <li>Mê Linh</li>
          </ul>
        </Grid>
        <Grid item xs={6} md={3}>
          <ul>
            <li>Hà Đông</li>
            <li>Thanh Xuân</li>
            <li>Cầu Giấy</li>
            <li>Hoài Đức</li>
            <li>Sơn Trà</li>
          </ul>
        </Grid>
        <Grid item xs={6} md={3}>
          <ul>
            <li>Hà Đông</li>
            <li>Thanh Xuân</li>
            <li>Cầu Giấy</li>
            <li>Hoài Đức</li>
            <li>Sơn Trà</li>
          </ul>
        </Grid>
        <Grid item xs={6} md={3}>
          <ul>
            <li>Hà Đông</li>
            <li>Thanh Xuân</li>
            <li>Cầu Giấy</li>
            <li>Hoài Đức</li>
            <li>Sơn Trà</li>
          </ul>
        </Grid>
      </Grid>

      {/* Các bước đăng tin */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mt: 3 }}>
          Các bước đăng tin DQ4T
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 3 }}>
          Tiếp cận khách thuê dễ dàng với tính năng đăng tin
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2, backgroundColor: '#00b894' }}>
              <Typography color="white">1. Đăng nhập/Đăng ký</Typography>
              <Typography color="white">Tải app và đăng ký sau đó đăng nhập</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2, backgroundColor: '#0984e3' }}>
              <Typography color="white">2. Đăng tin</Typography>
              <Typography color="white">Đăng tin trong tài khoản cá nhân</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2, backgroundColor: '#fdcb6e' }}>
              <Typography color="white">3. Xét duyệt & Tiếp cận khách thuê</Typography>
              <Typography color="white">Chuyên viên sẵn sàng xét duyệt 24/7</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          DQ4T có gì?
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Tại sao bạn phải chọn chúng tôi mà không phải một dịch vụ nào khác?
        </Typography>
      </Box>

      {/* DQ4T có gì */}
      <Grid container sx={{ gap: 2, justifyContent: 'center', my: 2, alignItems: 'center', mt: 2 }}>
        <Grid item xs={5} md={2.8} sx={{ border: '1px solid black', borderRadius: '5px', p: '5px', height: '130px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              sx={{
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Groups2RoundedIcon sx={{ fontSize: 50, color: '#00b894' }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                4,000+
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chủ nhà</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={5} md={2.8} sx={{ border: '1px solid black', borderRadius: '5px', p: '5px', height: '130px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              sx={{
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Groups2RoundedIcon
                sx={{
                  fontSize: 50,
                  color: '#00b894',
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                10,000+
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Khách thuê
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={5} md={2.8} sx={{ border: '1px solid black', borderRadius: '5px', p: '5px', height: '130px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              sx={{
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <RecentActorsRoundedIcon sx={{ fontSize: 50, color: '#00b894' }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                10+
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Môi giới</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={5} md={2.8} sx={{ border: '1px solid black', borderRadius: '5px', p: '5px', height: '130px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              sx={{
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <MailRoundedIcon sx={{ fontSize: 50, color: '#00b894' }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                3,000+
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Lượt truy cập
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
        Chúng tôi tự hào là một trong những dịch vụ tìm kiếm phòng trọ đứng đầu Việt Nam, với phương châm tìm là có
        chúng tôi luôn cập nhật phòng nhanh nhất, chính xác nhất và ưu tiên sự tiện lợi cho người tìm trọ lên hàng đầu.
      </Typography>
    </Box>
  )
}

export default ItemSearch
