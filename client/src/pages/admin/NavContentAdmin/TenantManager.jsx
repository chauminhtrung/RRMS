import { useState, useEffect } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import AddIcon from '@mui/icons-material/Add'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import WorkIcon from '@mui/icons-material/Work'
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
  Tooltip,
  Chip
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PrintIcon from '@mui/icons-material/Print'
import * as XLSX from 'xlsx'
import AddTenantModal from './ModalTenant'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import TenantMenuUpdate from './TenantMenuUpdate'
const TenantManager = ({ setIsAdmin, setIsNavAdmin, motels, setmotels }) => {
  const [open, setOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [avatar, setAvatar] = useState(true)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [editId, setEditId] = useState()

  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleOpen = (tenantId) => {
    setOpen(true)
    setEditId(tenantId)
  }
  const handleClose = () => {
    setEditId(null)
    setOpen(false)
    setAvatar(true)
  }
  // Hàm mở menu khi nhấn vào icon
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClickDoc = (tenantId) => {
    navigate(`/ResidenceForm/${tenantId}`)
    console.log(tenantId)
  }
  // Hàm đóng menu
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  useEffect(() => {
    setIsAdmin(true)
  }, [])

  // Hàm chuyển trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Hàm thay đổi số dòng mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const loadData = async () => {
    try {
      const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null

      if (!token) {
        console.error('No token found')
        return
      }

      const response = await axios.get('http://localhost:8080/tenant', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        const fetchedData = response.data?.result
        console.log('Fetched Data:', fetchedData)

        if (Array.isArray(fetchedData)) {
          setRows(fetchedData)
          console.log('State rows set to:', fetchedData)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message || error)
    }
  }
  const deleteTenant = async (id, e) => {
    e.preventDefault()

    const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Token is missing, please login again.'
      })
      return
    }

    try {
      const response = await axios.delete(`http://localhost:8080/tenant/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      console.log('Tenant deleted successfully:', response.data)
      Swal.fire({ icon: 'success', title: 'Thành công', text: 'Xóa tenant thành công!' })
      reloadData() // Gọi lại hàm reloadData sau khi xóa thành công
    } catch (error) {
      console.error('Error deleting tenant:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Xóa tenant không thành công!'
      })
    }
  }

  useEffect(() => {
    loadData()
  }, [])
  const reloadData = () => {
    loadData()
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
      <Box>
        <NavAdmin
          setmotels={setmotels}
          motels={motels}
          setIsAdmin={setIsAdmin}
          setIsNavAdmin={setIsNavAdmin}
          isNavAdmin={true}
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
                      <TableCell padding="checkbox" sx={{ borderRight: '1px solid #ddd' }}>
                        <Checkbox />
                      </TableCell>

                      <Tooltip title="Tên khách hàng" placement="top">
                        <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Tên KH</TableCell>
                      </Tooltip>

                      <Tooltip title="Số điện thoại" placement="top">
                        <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>SĐT</TableCell>
                      </Tooltip>

                      <Tooltip title="Ngày sinh" placement="top">
                        <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>NS</TableCell>
                      </Tooltip>

                      <Tooltip title="Giới tính" placement="top">
                        <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>GT</TableCell>
                      </Tooltip>

                      <Tooltip title="Địa chỉ & Nghề nghiệp" placement="top">
                        <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>ĐC & NN</TableCell>
                      </Tooltip>

                      <Tooltip title="Số CMND & CCCD" placement="top">
                        <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>CCCD</TableCell>
                      </Tooltip>

                      <Tooltip title="Ngày cấp CMND/CCCD" placement="top">
                        <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>NgC</TableCell>
                      </Tooltip>

                      <Tooltip title="Nơi cấp CMND/CCCD" placement="top">
                        <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>NC</TableCell>
                      </Tooltip>

                      <Tooltip title="Ảnh mặt trước CCCD" placement="top">
                        <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Ảnh MT</TableCell>
                      </Tooltip>

                      <Tooltip title="Ảnh mặt sau CCCD" placement="top">
                        <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Ảnh MS</TableCell>
                      </Tooltip>

                      <Tooltip title="Quan hệ" placement="top">
                        <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>QH</TableCell>
                      </Tooltip>

                      <Tooltip title="Loại người thuê" placement="top">
                        <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Loại NT</TableCell>
                      </Tooltip>

                      <Tooltip title="Trạng thái giấy tờ" placement="top">
                        <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>TTGT</TableCell>
                      </Tooltip>

                      <Tooltip title="Trạng thái tạm trú" placement="top">
                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>TTTT</TableCell>
                      </Tooltip>

                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody sx={{ height: '70px', overflow: 'auto' }}>
                    {rows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={15} align="center">
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            height="420px">
                            <img
                              src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fempty-box-4085812-3385481.webp?alt=media&token=eaf37b59-00e3-4d16-8463-5441f54fb60e"
                              alt="Không có dữ liệu"
                              style={{ maxWidth: '500px', height: 'auto', marginBottom: '16px', opacity: 0.6 }}
                            />
                            <Typography variant="h4" color="gray">
                              Không có dữ liệu
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow hover key={row.tenantId || row.fullname}>
                          <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                            <PersonIcon sx={{ color: 'red' }} />
                          </TableCell>

                          <TableCell sx={{ borderRight: '1px solid #ddd' }}>{row.fullname}</TableCell>
                          <TableCell sx={{ borderRight: '1px solid #ddd' }}>{row.phone}</TableCell>
                          <TableCell sx={{ borderRight: '1px solid #ddd' }}>{row.birthday}</TableCell>
                          <TableCell sx={{ borderRight: '1px solid #ddd' }}>{row.gender}</TableCell>
                          <TableCell
                            sx={{
                              borderRight: '1px solid #ddd',
                              display: 'flex',
                              flexDirection: 'column',
                              width: '250px'
                            }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#333',
                                fontSize: '14px',
                                marginBottom: '8px'
                              }}>
                              <LocationOnIcon fontSize="small" sx={{ color: '#4caf50', marginTop: '2px' }} />
                              <strong style={{ fontWeight: 600, color: '#333' }}>Địa chỉ:</strong>
                              <span style={{ color: '#555' }}>{row.address}</span>
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#333',
                                fontSize: '14px',
                                marginBottom: '8px'
                              }}>
                              <WorkIcon fontSize="small" sx={{ color: '#ff9800', marginTop: '2px' }} />
                              <strong style={{ fontWeight: 600, color: '#333' }}>Nghề nghiệp:</strong>
                              <span style={{ color: '#555' }}>{row.job}</span>
                            </Typography>
                          </TableCell>

                          <TableCell sx={{ borderRight: '1px solid #ddd' }}>{row.cccd}</TableCell>
                          <TableCell sx={{ borderRight: '1px solid #ddd' }}>{row.licenseDate}</TableCell>
                          <TableCell sx={{ borderRight: '1px solid #ddd' }}>{row.placeOfLicense}</TableCell>
                          <TableCell sx={{ borderRight: '1px solid #ddd', padding: 1 }}>
                            <img src={row.frontPhoto || 'Chưa ghi nhận'} alt="" style={{ width: '100px' }} />
                          </TableCell>
                          <TableCell sx={{ borderRight: '1px solid #ddd', padding: 1 }}>
                            <img src={row.backPhoto || 'Chưa ghi nhận'} alt="" style={{ width: '100px' }} />
                          </TableCell>
                          <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                            <Chip label={row.relationship || 'Chưa ghi nhận'} size="small" />
                          </TableCell>
                          <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                            <Chip
                              label={row.type_of_tenant ? 'Người liên hệ' : 'Thành viên'}
                              color={row.type_of_tenant ? 'success' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                            <Chip
                              label={row.temporaryResidence ? 'Đã đầy đủ' : 'Chưa đầy đủ'}
                              color={row.temporaryResidence ? 'success' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                            <Chip
                              label={row.informationVerify ? 'Đã có tạm trú' : 'Chưa có tạm trú'}
                              color={row.informationVerify ? 'success' : 'error'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell sx={{ width: '60px', textAlign: 'center' }}>
                            <TenantMenuUpdate
                              handleClick={handleClick}
                              anchorEl={anchorEl}
                              handleCloseMenu={handleCloseMenu}
                              handleClickDoc={handleClickDoc}
                              tenantId={row.tenantId}
                              handleOpen={handleOpen}
                              setEditId={setEditId}
                              setAvatar={setAvatar}
                              handleClose={handleClose}
                              reloadData={reloadData}
                              deleteTenant={deleteTenant}
                            />
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
        <AddTenantModal avatar={avatar} editId={editId} open={open} onClose={handleClose} reloadData={reloadData} />
      </Box>
    </div>
  )
}

export default TenantManager
