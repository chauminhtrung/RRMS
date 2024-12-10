/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
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
  Checkbox
} from '@mui/material'
import { env } from '~/configs/environment'
import { Modal, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import AddIcon from '@mui/icons-material/Add'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PrintIcon from '@mui/icons-material/Print'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MovingIcon from '@mui/icons-material/Moving'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import { ReactTabulator } from 'react-tabulator'
import axios from 'axios'
import Swal from 'sweetalert2'

const IncomeSummary = ({ setIsAdmin, setIsNavAdmin, motels, setmotels }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const userData = JSON.parse(sessionStorage.getItem('user')) // Lấy dữ liệu người dùng từ session storage
  const token = userData?.token // Lấy token
  const [transactionType, setTransactionType] = useState('receipt') // 'receipt' or 'expense'
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState(null)
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    profit: 0
  })

  useEffect(() => {
    setIsAdmin(true)
    fetchTransactions() // Gọi hàm để lấy dữ liệu
    fetchPayments()
    fetchSummary()
  }, [setIsAdmin])

  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${env.API_URL}/transactions/summary`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setSummary(response.data) // Cập nhật dữ liệu tổng hợp vào state
    } catch (err) {
      setError(err.message) // Cập nhật lỗi vào state
      console.error('Có lỗi xảy ra khi lấy dữ liệu tổng hợp:', err)
    }
  }

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${env.API_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}` // Thêm token vào header
        }
      })
      setTransactions(response.data) // Cập nhật dữ liệu vào state
      console.log(response.data) // In dữ liệu ra console
    } catch (err) {
      setError(err.message) // Cập nhật lỗi vào state
      console.error('Có lỗi xảy ra khi lấy dữ liệu:', err)
    } finally {
      setLoading(false) // Đặt loading là false sau khi hoàn thành
    }
  }

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${env.API_URL}/payment/list_payment`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPayments(response.data) // Cập nhật danh sách phương thức thanh toán
      console.log(response.data)
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh sách phương thức thanh toán:', error)
    }
  }

  const deleteTransaction = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn xóa giao dịch này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Hủy'
    })

    if (isConfirmed) {
      try {
        const response = await axios.delete(`${env.API_URL}/transactions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        Swal.fire('Thành công!', response.data, 'success')
        fetchTransactions() // Cập nhật lại danh sách giao dịch
        fetchSummary()
      } catch (error) {
        console.error('Có lỗi xảy ra khi xóa giao dịch:', error.response ? error.response.data : error.message)
        Swal.fire('Lỗi!', 'Có lỗi xảy ra khi xóa giao dịch.', 'error')
      }
    }
  }

  // Đảm bảo hàm này có thể được truy cập từ global scope
  window.deleteTransaction = deleteTransaction

  const handleOpenModal = (type) => {
    setTransactionType(type)
    setModalOpen(true)
  }
  const handleCloseModal = () => setModalOpen(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const amount = parseFloat(formData.get('amount'))
    if (isNaN(amount) || amount <= 0) {
      console.error('Số tiền không hợp lệ')
      Swal.fire('Lỗi!', 'Số tiền không hợp lệ.', 'error') // Thông báo lỗi
      return // Ngăn không cho gửi yêu cầu
    }

    const paymentMethod = formData.get('paymentMethod')
    const payment = payments.find((payment) => payment.paymentName === paymentMethod)
    if (!payment) {
      console.error('Phương thức thanh toán không hợp lệ')
      Swal.fire('Lỗi!', 'Phương thức thanh toán không hợp lệ.', 'error') // Thông báo lỗi
      return // Ngăn không cho gửi yêu cầu
    }

    const data = {
      amount: amount,
      paymentId: payment.paymentId, // Lấy paymentId từ tên
      payerName: formData.get('payer'),
      paymentDescription: formData.get('description'),
      category: formData.get('category'),
      transactionDate: formData.get('date')
    }

    // Hiển thị thông báo xác nhận trước khi gửi
    const { isConfirmed } = await Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn thêm giao dịch này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Hủy'
    })

    if (isConfirmed) {
      try {
        const url =
          transactionType === 'receipt'
            ? `${env.API_URL}/transactions/receipts`
            : `${env.API_URL}/transactions/expenses`

        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        // Cập nhật danh sách giao dịch
        setTransactions((prev) => [...prev, response.data])

        fetchSummary()
        // Gọi lại fetchTransactions để đảm bảo dữ liệu mới
        await fetchTransactions()
        handleCloseModal()
        Swal.fire('Thành công!', 'Giao dịch đã được thêm thành công!', 'success') // Thông báo thành công
      } catch (error) {
        console.error('Có lỗi xảy ra khi thêm giao dịch:', error.response ? error.response.data : error.message)
        Swal.fire('Lỗi!', 'Có lỗi xảy ra khi thêm giao dịch.', 'error') // Thông báo lỗi
        if (error.response) {
          console.error('Response:', error.response)
        }
      }
    }
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  // Hàm định dạng giá tiền theo kiểu Việt Nam
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }
  // Cấu hình các cột của bảng
  const columns = [
    {
      title: '',
      field: 'id',
      formatter: (cell) => {
        const transactionType = cell.getRow().getData().transactionType
        const iconColor = transactionType ? 'green' : 'red' // Xác định màu sắc của biểu tượng
        return `
        <span style="display: flex; align-items: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${iconColor}" class="bi bi-card-list" viewBox="0 0 16 16">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
          </svg>
       
        </span>
      `
      }
    },
    { title: 'Danh mục thu chi', width: 220, field: 'category' },
    { title: 'Số Tiền', width: 220, field: 'amount', formatter: (cell) => formatCurrency(cell.getValue()) },
    { title: 'Tên Người Thanh Toán', width: 220, field: 'payerName' },
    { title: 'Nội Dung Thanh Toán', width: 220, field: 'paymentDescription' },
    { title: 'Phương thức thanh toán', width: 220, field: 'payment.paymentName' },
    { title: 'Ngày lập phiếu', width: 220, field: 'transactionDate', sorter: 'date' },
    {
      title: 'Loại Giao Dịch',
      field: 'transactionType',
      width: 150,
      formatter: (cell) => {
        const type = cell.getValue() ? 'Thu' : 'Chi'
        const backgroundColor = type === 'Chi' ? 'red' : 'green'

        // Trả về một chuỗi HTML

        cell.getElement().style.color = backgroundColor
        cell.getElement().style.padding = '5px'
        cell.getElement().style.borderRadius = '5px'

        return type // Trả về giá trị hiển thị
      }
    },
    {
      title: 'Xóa',
      field: 'delete',
      width: 150,
      formatter: (cell) => {
        const transactionId = cell.getRow().getData().transactionId // Lấy ID giao dịch
        return `
          <span style="cursor: pointer; color: red; display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash-fill" viewBox="0 0 16 16" onclick="deleteTransaction('${transactionId}')">
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
        </svg>
      </span>
        `
      }
    }
  ]

  // Tùy chọn cho bảng
  const options = {
    layout: 'fitDataStretch',
    placeholder: 'Không có dữ liệu để hiển thị'
  }

  return (
    <div>
      <NavAdmin
        setmotels={setmotels}
        motels={motels}
        setIsAdmin={setIsAdmin}
        setIsNavAdmin={setIsNavAdmin}
        isNavAdmin={true}
      />
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '15px 15px 15px 15px',
          borderRadius: '10px',
          margin: '0 10px 10px 10px'
        }}>
        <Box sx={{ flexGrow: 1 }}>
          {/* Header */}
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{
              '.MuiToolbar-root': {
                p: '16px'
              }
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
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, mt: 2 }}>
            <Badge
              badgeContent={4}
              sx={{
                '.MuiBadge-badge': {
                  backgroundColor: '#7bed9f',
                  color: 'white'
                },
                '& .MuiButtonBase-root': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }}>
              <FilterAltIcon color="primary" />
            </Badge>

            <Badge
              badgeContent={4}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#2ed573',
                  color: 'white'
                }
              }}>
              <Paper variant="outlined" sx={{ pr: 1 }}>
                <Checkbox {...label} defaultChecked />
                Tất cả phiếu thu (tiền vào)
              </Paper>
            </Badge>

            <Badge
              badgeContent={4}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ff4757',
                  color: 'white'
                }
              }}>
              <Paper variant="outlined" sx={{ pr: 1 }}>
                <Checkbox {...label} defaultChecked />
                Tất cả phiếu chi (tiền ra)
              </Paper>
            </Badge>

            {/* Action Buttons */}
            <Button
              variant="contained"
              color="success"
              startIcon={<ReceiptIcon />}
              onClick={() => handleOpenModal('receipt')}>
              Thêm phiếu thu
            </Button>

            <Button
              variant="contained"
              color="warning"
              startIcon={<AddIcon />}
              onClick={() => handleOpenModal('expense')}>
              Thêm phiếu chi
            </Button>

            <Button variant="contained" startIcon={<PrintIcon />}>
              In thu/chi
            </Button>

            <Button variant="contained" startIcon={<FileDownloadIcon />}>
              Xuất excel
            </Button>
          </Paper>

          {/* Modal */}

          <Modal show={modalOpen} onHide={handleCloseModal} size="md" centered>
            <Modal.Header closeButton>
              <Modal.Title>{transactionType === 'receipt' ? 'Thêm phiếu thu' : 'Thêm phiếu chi'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="amount">
                  <Form.Label>Nhập số tiền *</Form.Label>
                  <Form.Control type="number" name="amount" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="paymentMethod">
                  <Form.Label>Phương thức thanh toán *</Form.Label>
                  <Form.Control as="select" name="paymentMethod" required>
                    <option value="">Chọn phương thức</option>
                    {payments.map((payment) => (
                      <option key={payment.paymentId} value={payment.paymentName}>
                        {payment.paymentName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="payer">
                  <Form.Label>Người thanh toán *</Form.Label>
                  <Form.Control type="text" name="payer" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Nội dung thanh toán *</Form.Label>
                  <Form.Control type="text" name="description" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Danh mục phiếu *</Form.Label>
                  <Form.Control type="text" name="category" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="date">
                  <Form.Label>Ngày lập phiếu *</Form.Label>
                  <Form.Control type="date" name="date" required />
                </Form.Group>

                <Box display="flex" justifyContent="flex-end">
                  <Button className="me-2" variant="contained" color="error" onClick={handleCloseModal}>
                    Hủy
                  </Button>
                  <Button variant="contained" color="success" type="submit">
                    {transactionType === 'receipt' ? 'Thêm phiếu thu' : 'Thêm phiếu chi'}
                  </Button>
                </Box>
              </Form>
            </Modal.Body>
          </Modal>

          <Paper variant="outlined" sx={{ display: 'flex', justifyContent: 'space-between', p: 1, mt: 2 }}>
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
                '.MuiCardContent-root': { bgcolor: '#E8F5E9' }
              }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="textPrimary" sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>
                    Tổng khoản thu (tiền vào)
                  </Typography>
                  <Typography variant="h4" color="green" sx={{ fontSize: '1.25rem' }}>
                    <MovingIcon /> + {formatCurrency(summary.totalIncome)}
                  </Typography>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="textPrimary" sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>
                    Tổng khoản chi (tiền ra)
                  </Typography>
                  <Typography variant="h4" color="red" sx={{ fontSize: '1.25rem' }}>
                    <MovingIcon sx={{ transform: 'rotate(70deg)' }} /> - {formatCurrency(summary.totalExpense)}
                  </Typography>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="textPrimary" sx={{ fontSize: '0.875rem', fontWeight: 'normal' }}>
                    Lợi nhuận
                  </Typography>
                  <Typography variant="h4" color="green" sx={{ fontSize: '1.25rem' }}>
                    {formatCurrency(summary.profit)}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Paper>

          {/* No Data Found */}
          <Paper variant="outlined" sx={{ textAlign: 'center', marginTop: 2 }}>
            <div className="mt-3" style={{ marginLeft: '15px', marginRight: '10px' }}>
              <ReactTabulator
                className="m-custom-table rounded"
                columns={columns}
                data={transactions}
                options={options}
                style={{
                  backgroundColor: 'white', // Màu nền trắng
                  width: '100%', // Chiều rộng 100%
                  maxWidth: '100%', // Chiều rộng tối đa
                  borderRadius: '8px', // Bo tròn góc
                  overflow: 'hidden' // Ẩn phần thừa ra ngoài
                }}
              />
            </div>
          </Paper>
        </Box>
      </Box>
    </div>
  )
}

export default IncomeSummary
