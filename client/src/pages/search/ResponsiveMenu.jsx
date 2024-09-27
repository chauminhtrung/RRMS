import { Box, Button, Grid } from '@mui/material'
import { Home, School, Apartment, Business, People, Share } from '@mui/icons-material' // Icons

const ResponsiveMenu = () => {
  return (
    <Box sx={{ padding: '10px', borderBottom: '3px solid green' }}>
      <Grid container spacing={2} alignItems="center">
        {/* Row with icon buttons */}
        <Grid item xs={12} sm={10}>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<Home />}
                sx={{
                  backgroundColor: '#E5F6E8',
                  color: 'green',
                  borderRadius: '20px',
                }}>
                Phòng trọ, nhà trọ
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                startIcon={<School />}
                sx={{
                  borderRadius: '20px',
                }}>
                Ký túc xá, sleepbox
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                startIcon={<Apartment />}
                sx={{
                  borderRadius: '20px',
                }}>
                Nhà cho thuê
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                startIcon={<Business />}
                sx={{
                  borderRadius: '20px',
                }}>
                Căn hộ chung cư
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                startIcon={<People />}
                sx={{
                  borderRadius: '20px',
                }}>
                Ở ghép & pass phòng
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Đăng tin button */}
        <Grid item xs={12} sm={2} sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            startIcon={<Share />}
            sx={{
              backgroundColor: '#FFD54F',
              color: 'black',
              borderRadius: '20px',
              fontWeight: 'bold',
            }}>
            Đăng tin | Lấp phòng trống
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ResponsiveMenu
