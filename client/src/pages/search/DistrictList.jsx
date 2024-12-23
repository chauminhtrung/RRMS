import { Grid, Link, Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const districts = [
  'Quận 1',
  'Thành phố Thủ Đức',
  'Quận Bình Thạnh',
  'Quận Tân Phú',
  'Quận 3',
  'Quận 11',
  'Quận 5',
  'Quận 8',
  'Quận 7',
  'Hóc Môn',
  'Nhà Bè',
  'Quận 12',
  'Quận Gò Vấp',
  'Quận Tân Bình',
  'Quận Phú Nhuận',
  'Quận 10',
  'Quận 4',
  'Quận 6',
  'Quận Bình Tân',
  'Củ Chi',
  'Bình Chánh',
  'Cần Giờ'
]

const DistrictLinks = () => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        m: 1
      }}>
      <Box
        sx={{
          padding: '20px',
          borderRadius: '8px',
          bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ffffff' : '#2f3542'),
          color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#00b894')
        }}>
        <Typography variant="h6" sx={{ marginBottom: '15px' }}>
          {t('khu-vuc')}: Hồ Chí Minh
        </Typography>
        <Grid container spacing={2}>
          {districts.map((district, index) => (
            <Grid item xs={6} key={index}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Link
                  href={`#${district.replace(/\s/g, '-')}`}
                  underline="none"
                  sx={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    padding: '10px',
                    backgroundColor: '#fff',
                    border: '1px solid #3f51b5',
                    color: '#3f51b5',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#e3f2fd'
                    }
                  }}>
                  {district}
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default DistrictLinks
