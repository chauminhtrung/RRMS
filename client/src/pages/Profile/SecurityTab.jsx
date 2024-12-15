import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { changePassword } from '~/apis/profileAPI'

const SecurityTab = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData
    console.log(oldPassword, newPassword, confirmPassword)
    setPasswordData({ ...passwordData, username: 'dung' })

    if (newPassword !== confirmPassword) {
      toast.info('Mật khẩu xác nhận không khớp với mật khẩu mới!')
      return
    }

    await changePassword(passwordData)

    toast.success('Thay đổi mật khẩu thành công!')
  }

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={4}>
        {/* Change Password Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Thay đổi mật khẩu
            </Typography>
            <Box>
              <FormControl
                sx={{
                  width: '100%',
                  '.MuiInputBase-input': {
                    border: 'none',
                    height: 'auto'
                  }
                }}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu hiện tại</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  name="oldPassword"
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl
                sx={{
                  width: '100%',
                  my: 3,
                  '.MuiInputBase-input': {
                    border: 'none',
                    height: 'auto'
                  }
                }}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu mới</InputLabel>
                <OutlinedInput
                  name="newPassword"
                  onChange={handleChange}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Mật khẩu mới"
                />
              </FormControl>

              <FormControl
                sx={{
                  width: '100%',
                  mb: 3,
                  '.MuiInputBase-input': {
                    border: 'none',
                    height: 'auto'
                  }
                }}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Nhập lại mật khẩu</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <Button variant="contained" color="primary" fullWidth onClick={handleChangePassword}>
                Đổi mật khẩu
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Two-Factor Authentication Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Xác thực bằng 2 lớp
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '15px' }}>
              Thêm một cấp độ an toàn bộ bảo mật bằng cách bật xác thực bằng 2 lớp.
            </Typography>
            <RadioGroup defaultValue="on">
              <FormControlLabel value="on" control={<Radio />} label="On" />
              <FormControlLabel value="off" control={<Radio />} label="Off" />
            </RadioGroup>
            <TextField
              label="Số điện thoại"
              fullWidth
              placeholder="Nhập số điện thoại SMS"
              sx={{ marginTop: '15px' }}
            />
          </Paper>
        </Grid>

        {/* Account Privacy Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Tuỳ chọn bảo mật
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Quyền riêng tư của tài khoản
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
              Đặt tài khoản của bạn ở chế độ riêng tư hoặc công khai.
            </Typography>
            <RadioGroup defaultValue="public">
              <FormControlLabel value="public" control={<Radio />} label="Công khai" />
              <FormControlLabel value="private" control={<Radio />} label="Riêng tư" />
            </RadioGroup>

            <Typography variant="subtitle1" gutterBottom sx={{ marginTop: '20px' }}>
              Chia sẻ dữ liệu
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
              Chọn cách dữ liệu của bạn được chia sẻ với nhà phát triển ứng dụng.
            </Typography>
            <RadioGroup defaultValue="yes">
              <FormControlLabel value="yes" control={<Radio />} label="Có, chia sẻ dữ liệu" />
              <FormControlLabel value="no" control={<Radio />} label="Không, giới hạn chia sẻ dữ liệu" />
            </RadioGroup>
          </Paper>
        </Grid>

        {/* Delete Account Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Xóa tài khoản
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '15px' }}>
              Xóa tài khoản của bạn là bất đồng bộ và không thể hoàn tác.
            </Typography>
            <Button variant="contained" color="error">
              Tôi hiểu, xóa tài khoản của tôi
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SecurityTab
