import { Box, Grid, Typography } from '@mui/material'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import RecentActorsRoundedIcon from '@mui/icons-material/RecentActorsRounded'
import MailRoundedIcon from '@mui/icons-material/MailRounded'
import { useTranslation } from 'react-i18next'
const ItemSearch = () => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        padding: 1,
        bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542'),
        color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894')
      }}>
      <Typography variant="h6" sx={{ mt: 2 }}>
        {t('cho-thue-phong-tro')}
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
        <h3>{t('tiep-can-khach-hang-de-dang-tin')}</h3>
        <p className="text-center description">{t('tiep-can-khach-hang-de-dang-tin')}</p>
      </div>
      <div className="container mb-4 mt-3">
        <div className="row feature card-benefit">
          <div className="col-md-4 item green">
            <div className="innerRRMS mb-2">
              <div className="icon-itemRRMS">
                <span>1</span>
              </div>
              <div className="content-item">
                <b>{t('dang-nhap-dang-ky')}</b>
                <div>{t('dang-ky-sau-do-dang-nhap')}</div>
              </div>
            </div>
          </div>
          <div className="col-md-4 item blue">
            <div className="innerRRMS mb-2">
              <div className="icon-itemRRMS ">
                <span>2</span>
              </div>
              <div className="content-item">
                <b>{t('dang-tin')}</b>
                <div>{t('dang-tin-trong-tai-khoan-ca-nhan')}</div>
              </div>
            </div>
          </div>
          <div className="col-md-4 item yellow">
            <div className="innerRRMS mb-2">
              <div className="icon-itemRRMS ">
                <span>3</span>
              </div>
              <div className="content-item">
                <b>
                  {t('xet-duyet')} &amp; {t('tiep-can')}
                </b>
                <div>{t('chuyen-vien-san-sang-tu-van')}</div>
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
                flexDirection: 'column'
              }}>
              <Groups2RoundedIcon sx={{ fontSize: 50, color: '#00b894' }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                4,000+
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {t('chu-nha')}
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
                flexDirection: 'column'
              }}>
              <Groups2RoundedIcon
                sx={{
                  fontSize: 50,
                  color: '#00b894'
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                10,000+
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {t('khach-thue')}
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
                flexDirection: 'column'
              }}>
              <RecentActorsRoundedIcon sx={{ fontSize: 50, color: '#00b894' }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                10+
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {t('moi-gioi')}
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
                flexDirection: 'column'
              }}>
              <MailRoundedIcon sx={{ fontSize: 50, color: '#00b894' }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                3,000+
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {t('luot-truy-cap')}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
        {t('chung-toi-tu-hao')}
      </Typography>
    </Box>
  )
}

export default ItemSearch
