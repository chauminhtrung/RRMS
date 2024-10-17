import { useState } from 'react'
import {
  Box,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  InputLabel,
  IconButton,
  FormHelperText,
  TableContainer,
  TablePagination,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import VisibilityIcon from '@mui/icons-material/Visibility'

function AccountManagement() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    fullname: '',
    phone: '',
    email: '',
    avatar: '',
    birthday: '',
    gender: '',
    cccd: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [cccdError, setCccdError] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5) // Số dòng mỗi trang

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Đặt lại trang về 0 khi thay đổi số dòng
  }

  const genders = [
    { id: 'MALE', name: 'Nam' },
    { id: 'FEMALE', name: 'Nữ' },
    { id: 'OTHER', name: 'Khác' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleChangePassWord = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleChangePhone = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    if (name === 'phone') {
      const phoneRegex = /^0[0-9]{9}$/

      if (!phoneRegex.test(value)) {
        setPhoneError('Số điện thoại không hợp lệ (phải bắt đầu bằng số 0 và có 10 chữ số)')
      } else {
        setPhoneError('')
      }
    }
  }

  const handleChangeEmail = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        setEmailError('Địa chỉ email không hợp lệ')
      } else {
        setEmailError('')
      }
    }
  }

  const handleChangeCCCD = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    if (name === 'cccd') {
      const cccdRegex = /^[0-9]{12}$/
      if (!cccdRegex.test(value)) {
        setCccdError('Số CCCD không hợp lệ (12 chữ số)')
      } else {
        setCccdError('')
      }
    }
  }

  const handleChangeBirthday = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const today = new Date().toISOString().split('T')[0]

  const data = Array.from({ length: 20 }, (_, index) => ({
    username: `user${index + 1}`,
    fullname: `Nguyễn Văn ${index + 1}`,
    phone: `090123456${index}`,
    email: `user${index + 1}@example.com`,
    cccd: `12345678${index}`,
    gender: index % 2 === 0 ? 'Nam' : 'Nữ',
    birthday: `01-01-20${index + 1}`,
  }))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'hidden',
        mt: 5,
        mx: 'auto',
        maxWidth: 'lg',
        mr: 4,
      }}>
      <Typography variant="h4" align="center" justifyContent="center" color="error" gutterBottom>
        Quản Lý Người Dùng
      </Typography>

      <Grid container spacing={2} sx={{ mb: 5, width: '100%', paddingLeft: '20px', marginLeft: '-10px' }}>
        {/* Ảnh đại diện */}
        <Grid
          item
          xs={12}
          sm={3}
          textAlign="center"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            marginRight: { xs: 0, sm: '20px' },
          }}>
          <input
            type="file"
            hidden
            id="avatar"
            accept="image/*"
            onChange={(e) => setForm({ ...form, avatar: URL.createObjectURL(e.target.files[0]) })}
          />
          <label htmlFor="avatar">
            <img
              src={form.avatar || '/placeholder.png'}
              style={{
                width: '100%',
                maxWidth: '280px',
                height: 'auto',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
                borderRadius: '50%',
                cursor: 'pointer',
                border: '3px solid #ddd',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                transition: '0.3s',
              }}
            />
          </label>
        </Grid>

        {/* Các input fields */}
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tên người dùng"
                name="username"
                value={form.username}
                onChange={handleChange}
                sx={{ height: '56px', fontSize: '1.2rem' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChangePassWord}
                sx={{ height: '56px', fontSize: '1.2rem' }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={toggleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ tên"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                sx={{ height: '56px', fontSize: '1.2rem' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phone"
                value={form.phone}
                onChange={handleChangePhone}
                error={!!phoneError}
                sx={{ height: '56px', fontSize: '1.2rem' }}
              />
              {phoneError && <FormHelperText error>{phoneError}</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChangeEmail}
                error={!!emailError}
                sx={{ height: '56px', fontSize: '1.2rem' }}
              />
              {emailError && <FormHelperText error>{emailError}</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số CCCD"
                name="cccd"
                value={form.cccd}
                onChange={handleChangeCCCD}
                error={!!cccdError}
                sx={{ height: '56px', fontSize: '1.2rem' }}
              />
              {cccdError && <FormHelperText error>{cccdError}</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="birthday"
                type="date"
                value={form.birthday}
                onChange={handleChangeBirthday}
                inputProps={{ max: today }}
                sx={{ height: '56px', fontSize: '1.2rem' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ height: '56px' }}>
                <InputLabel id="gender-label" sx={{ backgroundColor: 'white', px: 0.5 }}>
                  Giới tính
                </InputLabel>
                <Select
                  labelId="gender-label"
                  value={form.gender || ''}
                  name="gender"
                  onChange={handleChange}
                  displayEmpty>
                  {genders.map((g) => (
                    <MenuItem key={g.id} value={g.id}>
                      {g.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" sx={{ mt: 2, paddingLeft: '22px', marginLeft: '-8px' }}>
        <Grid container spacing={2} justifyContent="center" wrap="nowrap">
          <Grid item xs={3} sm={2} textAlign="center">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              fullWidth
              sx={{ height: '40px', justifyContent: 'center' }}>
              Thêm
            </Button>
          </Grid>
          <Grid item xs={3} sm={2} textAlign="center">
            <Button
              variant="outlined"
              color="success"
              startIcon={<SaveIcon />}
              fullWidth
              sx={{ height: '40px', justifyContent: 'center' }}>
              Cập nhật
            </Button>
          </Grid>
          <Grid item xs={3} sm={2} textAlign="center">
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              fullWidth
              sx={{ height: '40px', justifyContent: 'center' }}>
              Xóa
            </Button>
          </Grid>
          <Grid item xs={3} sm={2} textAlign="center">
            <Button
              variant="outlined"
              color="info"
              startIcon={<RefreshIcon />}
              fullWidth
              sx={{ height: '40px', justifyContent: 'center' }}>
              Mới
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số CCCD</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.username}>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.fullname}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.cccd}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.birthday}</TableCell>
                <TableCell>{row.image}</TableCell>
                <TableCell>
                  <IconButton color="default" size="small" sx={{ color: 'black' }}>
                    <RefreshIcon />
                  </IconButton>

                  <IconButton color="primary" size="small">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          sx={{
            marginTop: '10px',
            padding: '0 16px',
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length} // Tổng số dòng
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  )
}

export default AccountManagement
