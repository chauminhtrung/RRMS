import { Box, Grid, Typography, Paper } from '@mui/material'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import RecentActorsRoundedIcon from '@mui/icons-material/RecentActorsRounded'
import MailRoundedIcon from '@mui/icons-material/MailRounded'
const ItemSearch = () => {
  return (
    <Box
      sx={{
        padding: 1,
        bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542'),
        color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894'),
      }}>
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
      <div className="text-center HTPost mt-3">
        <h3>Các bước đăng tin bài RRMS</h3>
        <p className="text-center description">Tiếp cận khách thuê dễ dàng với tính năng đăng tin</p>
      </div>
      <div className="container mb-4 mt-3">
        <div className="row feature card-benefit">
          <div className="col-md-4 item green">
            <div className="innerRRMS mb-2">
              <div className="icon-itemRRMS">
                <span>1</span>
              </div>
              <div className="content-item">
                <b>Đăng nhập/Đăng ký</b>
                <div>đăng ký sau đó đăng nhập</div>
              </div>
            </div>
          </div>
          <div className="col-md-4 item blue">
            <div className="innerRRMS mb-2">
              <div className="icon-itemRRMS ">
                <span>2</span>
              </div>
              <div className="content-item">
                <b>Đăng tin</b>
                <div>Đăng tin trong tài khoản cá nhân</div>
              </div>
            </div>
          </div>
          <div className="col-md-4 item yellow">
            <div className="innerRRMS mb-2">
              <div className="icon-itemRRMS ">
                <span>3</span>
              </div>
              <div className="content-item">
                <b>Xét duyệt &amp; tiếp cận khách thuê</b>
                <div>Chuyên viên sẵn sàng xét duyệt 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
