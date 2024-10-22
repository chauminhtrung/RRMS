/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  MenuItem,
  Select,
  Card,
  CardContent,
  Paper,
  InputLabel,
  FormControl,
  Badge,
} from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import AddIcon from '@mui/icons-material/Add'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PrintIcon from '@mui/icons-material/Print'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useEffect } from 'react'
import MovingIcon from '@mui/icons-material/Moving'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
const IncomeSummary = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  useEffect(() => {
    setIsAdmin(true)
  }, [])
  return (
    <div>
      <NavAdmin
        setmotels={setmotels}
        motels={motels}
        setIsAdmin={setIsAdmin}
        setIsNavAdmin={setIsNavAdmin}
        isNavAdmin={isNavAdmin}
      />
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '15px 15px 15px 15px',
          borderRadius: '10px',
          margin: '0 10px 10px 10px',
        }}>
        <Box sx={{ flexGrow: 1 }}>
          {/* Header */}
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{
              '.MuiToolbar-root': {
                p: '16px',
              },
            }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Khoản thu / chi - tổng kết Nhà trọ
              </Typography>
              <Select defaultValue="Theo tháng" size="small">
                <MenuItem value="Theo tháng">Theo tháng</MenuItem>
                <MenuItem value="Theo quý">Theo quý</MenuItem>
                <MenuItem value="Theo năm">Theo năm</MenuItem>
              </Select>
              <IconButton color="primary">
                <CalendarMonthIcon />
              </IconButton>
            </Toolbar>
            <Typography variant="body2" color="textSecondary" sx={{ paddingLeft: 2 }}>
              Bạn sẽ thống kê được các khoản thu / chi qua hàng tháng, quý, năm.
            </Typography>
          </AppBar>

          {/* Filters */}
          <Paper
            variant="outlined"
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, mt: 2 }}>
            <Badge
              badgeContent={4}
              sx={{
                '.MuiBadge-badge': {
                  backgroundColor: '#7bed9f',
                  color: 'white',
                },
                '& .MuiButtonBase-root': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }}>
              <FilterAltIcon color="primary" />
            </Badge>

            <Badge
              badgeContent={4}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#2ed573',
                  color: 'white',
                },
              }}>
              <Button variant="outlined">Tất cả phiếu thu (tiền vào)</Button>{' '}
            </Badge>

            <Badge
              badgeContent={4}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ff4757',
                  color: 'white',
                },
              }}>
              <Button variant="outlined" color="error">
                Tất cả phiếu chi (tiền ra)
              </Button>
            </Badge>

            {/* Action Buttons */}
            <Button variant="contained" color="success" startIcon={<AddIcon />}>
              Quản lý danh mục
            </Button>

            <Button variant="contained" color="success" startIcon={<ReceiptIcon />}>
              Thêm phiếu thu
            </Button>

            <Button variant="contained" color="warning" startIcon={<AddIcon />}>
              Thêm phiếu chi
            </Button>

            <Button variant="contained" startIcon={<PrintIcon />}>
              In thu/chi
            </Button>

            <Button variant="contained" startIcon={<FileDownloadIcon />}>
              Xuất excel
            </Button>
          </Paper>

          <Paper variant="outlined" sx={{ display: 'flex', justifyContent: 'space-between', p: 2, mt: 2 }}>
            {/* Category and Report Type */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormControl sx={{ minWidth: 170 }} variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-label">Lọc theo danh mục</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Gender">
                  <MenuItem value={'MALE'}>Tất cả</MenuItem>
                  <MenuItem value={'FEMALE'}>Female</MenuItem>
                  <MenuItem value={'OTHER'}>Other</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 130 }} variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-label">Mẫu báo cáo</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Gender">
                  <MenuItem value={'MALE'}>Theo chi tiết</MenuItem>
                  <MenuItem value={'FEMALE'}>Female</MenuItem>
                  <MenuItem value={'OTHER'}>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Summary */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '.MuiCardContent-root': { p: 1, pb: 0.5, bgcolor: '#E8F5E9' },
              }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="textPrimary" sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>
                    Tổng khoản thu (tiền vào)
                  </Typography>
                  <Typography variant="h4" color="green" sx={{ fontSize: '1.25rem' }}>
                    <MovingIcon /> + 0 đ
                  </Typography>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="textPrimary" sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>
                    Tổng khoản chi (tiền ra)
                  </Typography>
                  <Typography variant="h4" color="red" sx={{ fontSize: '1.25rem' }}>
                    <MovingIcon sx={{ transform: 'rotate(70deg)' }} /> - 0 đ
                  </Typography>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="textPrimary" sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>
                    Lợi nhuận
                  </Typography>
                  <Typography variant="h4" sx={{ fontSize: '1.25rem' }}>
                    0 đ
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Paper>

          {/* No Data Found */}
          <Paper variant="outlined" sx={{ textAlign: 'center', marginTop: 4 }}>
            <img style={{ maxWidth: '200px' }} src="../../images/bg-banner.webp" />
            <Typography variant="body2">Không tìm thấy dữ liệu!</Typography>
          </Paper>
        </Box>
      </Box>
    </div>
  )
}

export default IncomeSummary
