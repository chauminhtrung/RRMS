import { useState, useEffect } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  Tooltip
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PrintIcon from '@mui/icons-material/Print'
import * as XLSX from 'xlsx'
import AddTenantModal from './ModalTenant'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'

const TenantManager = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  const [page, setPage] = useState(0)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  useEffect(() => {
    setIsAdmin(true)
  }, [])

  const columns = [
    { id: 'name', label: 'Tên KH', des: 'Tên khách hàng' },
    { id: 'phone', label: 'SĐT', des: 'Số điện thoại' },
    { id: 'birthDate', label: 'NS', des: 'Ngày sinh' },
    { id: 'gender', label: 'GT', des: 'Giới tính' },
    { id: 'address', label: 'ĐC & NN', des: 'Địa chỉ & Nghề nghiệp' },
    { id: 'idCard', label: 'CMND/CCCD', des: 'Số CMND & CCCD' },
    { id: 'issueDate', label: 'NgC', des: 'Ngày cấp CMND/CCCD' },
    { id: 'issuePlace', label: 'NC', des: 'Nơi cấp CMND/CCCD' },
    { id: 'image', label: 'MT CCCD', des: 'Ảnh mặt trước CCCD' },
    { id: 'image1', label: 'MS CCCD', des: 'Ảnh mặt sau CCCD' },
    { id: 'relationship', label: 'QH', des: 'Quan hệ' },
    { id: 'tenantType', label: 'LNT', des: 'Loại người thuê' },
    { id: 'documentStatus', label: 'TTGT', des: 'Trạng thái giấy tờ' },
    { id: 'residenceStatus', label: 'TTTT', des: 'Trạng thái tạm trú' }
  ]

  const rows = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      phone: '0123456789',
      birthDate: '1990-01-01',
      gender: 'Nam',
      address: '123 Đường ABC, Quận 1',
      idCard: '123456789',
      issueDate: '2015-01-01',
      issuePlace: 'Công an TP.HCM',
      image: 'link_to_image_a',
      image1: 'link_to_image_a',
      relationship: 'Người thân',
      tenantType: 'Người thuê chính',
      documentStatus: 'Đã nộp',
      residenceStatus: 'Đang cư trú'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      phone: '0987654321',
      birthDate: '1985-05-15',
      gender: 'Nữ',
      address: '456 Đường XYZ, Quận 2',
      idCard: '987654321',
      issueDate: '2018-02-15',
      issuePlace: 'Công an Hà Nội',
      image: 'link_to_image_b',
      image1: 'link_to_image_b',
      relationship: 'Bạn bè',
      tenantType: 'Người thuê phụ',
      documentStatus: 'Chưa nộp',
      residenceStatus: 'Tạm vắng'
    }
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // Hàm xuất file Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'KhachThue')
    XLSX.writeFile(workbook, 'DanhSachKhachThue.xlsx')

    // Mở Snackbar thông báo thành công
    setSnackbarMessage('Xuất Excel thành công!')
    setSnackbarOpen(true)
  }

  // Hàm đóng Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }
  return (
    <div>
      <NavAdmin
        setmotels={setmotels}
        motels={motels}
        setIsAdmin={setIsAdmin}
        setIsNavAdmin={setIsNavAdmin}
        isNavAdmin={isNavAdmin}
      />
      <div
        style={{
          backgroundColor: '#fff',
          padding: '15px',
          borderRadius: '10px',
          margin: '0 10px 10px 10px'
        }}>
        <Box sx={{ padding: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9} container alignItems="flex-start">
              <Box
                sx={{
                  width: '4px',
                  height: '60px',
                  bgcolor: 'primary.main',
                  border: '1px solid #0056b3',
                  marginRight: 3,
                  alignSelf: 'flex-start'
                }}
              />
              <Grid item>
                <Typography variant="h5" gutterBottom>
                  Quản lý danh sách khách thuê
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Tất cả danh sách khách thuê trong Nhà trọ của bạn
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  background: '#1e90ff',
                  borderRadius: '50px',
                  color: 'white',
                  padding: '10px 20px',
                  textTransform: 'none'
                }}>
                Tra cứu khách thuê cũ
              </Button>
              <IconButton
                onClick={handleOpen}
                sx={{
                  backgroundColor: '#1e90ff',
                  color: 'white',
                  borderRadius: '50%',
                  '&:hover': { backgroundColor: '#1e90ff' }
                }}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Box
            sx={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: 2,
              backgroundColor: '#fff',
              mt: 3
            }}>
            <Grid container spacing={2} alignItems="center" direction={{ xs: 'column', sm: 'row' }}>
              <Grid item xs={12} sm={8} display="flex" alignItems="center" gap={2}>
                {/* Icon Button */}
                <IconButton color="primary">
                  <FilterAltIcon fontSize="small" />
                </IconButton>

                {/* First Label - Đã đăng ký tạm trú */}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  position="relative"
                  border="1px solid #ddd"
                  borderRadius="8px"
                  padding={1}
                  minWidth={100}>
                  <Typography
                    variant="caption"
                    color="white"
                    position="absolute"
                    top="-13px"
                    right="-0.5px"
                    bgcolor="#007BFF"
                    border="1px solid #0056b3"
                    borderRadius={2}
                    fontSize="0.8rem"
                    boxShadow={3}
                    padding="0px 2px"
                    transition="0.3s"
                    sx={{
                      '&:hover': {
                        bgcolor: '#0056b3',
                        boxShadow: 1,
                        cursor: 'pointer'
                      }
                    }}>
                    0
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.2}>
                    <Checkbox size="small" />
                    <Typography variant="caption">Đã đăng ký tạm trú</Typography>
                  </Box>
                </Box>

                {/* Second Label - Chưa đăng ký tạm trú */}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  position="relative"
                  border="1px solid #ddd"
                  borderRadius="8px"
                  padding={1}
                  minWidth={100}>
                  <Typography
                    variant="caption"
                    color="white"
                    position="absolute"
                    top="-13px"
                    right="-0.5px"
                    bgcolor="#007BFF"
                    border="1px solid #0056b3"
                    borderRadius={2}
                    fontSize="0.8rem"
                    boxShadow={3}
                    padding="0px 2px"
                    transition="0.3s"
                    sx={{
                      '&:hover': {
                        bgcolor: '#0056b3',
                        boxShadow: 1,
                        cursor: 'pointer'
                      }
                    }}>
                    0
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.2}>
                    <Checkbox size="small" />
                    <Typography variant="caption">Chưa đăng ký tạm trú</Typography>
                  </Box>
                </Box>

                {/* Third Label - Khách đã nộp giấy tờ */}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  position="relative"
                  border="1px solid #ddd"
                  borderRadius="8px"
                  padding={1}
                  minWidth={100}>
                  <Typography
                    variant="caption"
                    color="white"
                    position="absolute"
                    top="-13px"
                    right="-0.5px"
                    bgcolor="#007BFF"
                    border="1px solid #0056b3"
                    borderRadius={2}
                    fontSize="0.8rem"
                    boxShadow={3}
                    padding="0px 2px"
                    transition="0.3s"
                    sx={{
                      '&:hover': {
                        bgcolor: '#0056b3',
                        boxShadow: 1,
                        cursor: 'pointer'
                      }
                    }}>
                    0
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.2}>
                    <Checkbox size="small" />
                    <Typography variant="caption">Khách đã nộp giấy tờ</Typography>
                  </Box>
                </Box>

                {/* Fourth Label - Khách chưa nộp giấy tờ */}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  position="relative"
                  border="1px solid #ddd"
                  borderRadius="8px"
                  padding={1}
                  minWidth={100}>
                  <Typography
                    variant="caption"
                    color="white"
                    position="absolute"
                    top="-13px"
                    right="-0.5px"
                    bgcolor="#007BFF"
                    border="1px solid #0056b3"
                    borderRadius={2}
                    fontSize="0.8rem"
                    boxShadow={3}
                    padding="0px 2px"
                    transition="0.3s"
                    sx={{
                      '&:hover': {
                        bgcolor: '#0056b3',
                        boxShadow: 1,
                        cursor: 'pointer'
                      }
                    }}>
                    0
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.2}>
                    <Checkbox size="small" />
                    <Typography variant="caption">Khách chưa nộp giấy tờ</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
                <Button
                  sx={{ background: '#1e90ff' }}
                  variant="contained"
                  color="success"
                  startIcon={<PrintIcon />}
                  onClick={exportToExcel}>
                  Xuất excel
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Paper sx={{ mt: 3 }}>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    {columns.map((column, index) => (
                      <Tooltip key={column.id} title={column.des} placement="top">
                        <TableCell
                          style={{
                            height: '80px',
                            minWidth: column.minWidth,
                            borderRight: index < columns.length - 1 ? '1px solid rgba(224, 224, 224, 1)' : 'none'
                          }}>
                          {column.label}
                        </TableCell>
                      </Tooltip>
                    ))}
                    <TableCell
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '80px',
                        alignItems: 'center'
                      }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length + 1} align="center">
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          height="420px">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fempty-box-4085812-3385481.webp?alt=media&token=eaf37b59-00e3-4d16-8463-5441f54fb60e"
                            alt="Không có dữ liệu"
                            style={{
                              maxWidth: '500px', // Giới hạn chiều rộng tối đa để hình ảnh không quá lớn
                              height: 'auto', // Đảm bảo hình ảnh giữ tỉ lệ
                              marginBottom: '16px', // Thêm khoảng cách giữa hình và văn bản
                              opacity: 0.6 // Tăng độ mờ để hình ảnh nhẹ nhàng hơn
                            }}
                          />
                          <Typography variant="h4" color="gray">
                            Không có dữ liệu
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                      <TableRow hover key={index}>
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>
                        {columns.map((column) => (
                          <TableCell key={column.id}>{row[column.id]}</TableCell>
                        ))}
                        <TableCell sx={{ display: 'flex', justifyContent: 'center', height: '80px' }}>
                          <DeleteIcon />
                          <SaveIcon />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <AddTenantModal open={open} onClose={handleClose} />
    </div>
  )
}

export default TenantManager
