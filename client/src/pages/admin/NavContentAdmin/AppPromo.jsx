import { Box, Typography, Button, Grid } from '@mui/material'
import AndroidIcon from '@mui/icons-material/Android'
import AppleIcon from '@mui/icons-material/Apple'
import QRCode from 'react-qr-code'

export default function AppPromo() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#ffffff" padding={2}>
      <Grid container justifyContent="center" alignItems="center">
        {/* Hình ảnh điện thoại */}
        <Grid item xs={12} md={4} textAlign="center">
          <Box
            component="img"
            src="https://quanlytro.me/images/quan-ly-tro-smart-7-2022.png?version=244342"
            alt="App Preview"
            sx={{ width: '100%' }}
          />
        </Grid>

        {/* Phần tải ứng dụng và mã QR */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Để thực hiện kết nối với chủ nhà.
            <br />
            Vui lòng tải App Khách thuê
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1} marginY={1}>
            {/* Nút tải ứng dụng và QR */}
            <Box display="flex" flexDirection="column" gap={1}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AndroidIcon />}
                sx={{
                  bgcolor: '#1e90ff',
                  '&:hover': { bgcolor: '#34c174' },
                  width: 300,
                  height: 50,
                  textTransform: 'none'
                }}>
                Tải ứng dụng trên Google Play
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AppleIcon />}
                sx={{
                  bgcolor: '#1e90ff',
                  '&:hover': { bgcolor: '#34c174' },
                  width: 300,
                  height: 50,
                  textTransform: 'none'
                }}>
                Tải ứng dụng trên App Store
              </Button>
            </Box>

            {/* Mã QR */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              border="1px solid #ccc"
              borderRadius={2}
              padding={1}
              width={150}
              height={130}>
              <QRCode value="https://your-qr-code-link.com" size={100} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
