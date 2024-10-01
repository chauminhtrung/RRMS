import { Avatar, Box, Button, Grid, Paper, styled, TextField, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})
const ProfileTab = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={4}>
        {/* Profile Picture Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
            <Avatar
              alt="Image"
              src="https://mui.com/static/images/avatar/6.jpg"
              sx={{ width: 100, height: 100, margin: 'auto' }}
            />
            <Typography variant="body1" sx={{ marginTop: '10px' }}>
              Ảnh phải là định dạng PNG hoặc JPG và không được lớn hơn 5MB
            </Typography>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}>
              Tải ảnh lên
              <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
            </Button>
          </Paper>
        </Grid>

        {/* Account Details Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Thông tin chi tiết
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Tên tài khoản" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Họ và tên" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Địa chỉ" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Email" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Số điện thoại" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Ngày tháng năm sinh"
                  fullWidth
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth>
                  Lưu thay đổi
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProfileTab
