import {
  Container,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ResidenceForm = () => {
  const { tenantId } = useParams() // Lấy tenantId từ URL
  const [tenant, setTenant] = useState(null) // Dữ liệu người thuê
  const [loading, setLoading] = useState(true) // Track loading state
  const [error, setError] = useState(null) // Track errors if any

  useEffect(() => {
    const fetchTenantData = async () => {
      console.log('tenantId:', tenantId)
      const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null

      if (!token) {
        setError('No token found. Please log in again.')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`http://localhost:8080/tenant/tenant-id?id=${tenantId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          console.error('Error data:', data)
          setTenant(data.result)
        } else if (response.status === 404) {
          setError('Tenant not found. Please check the ID.')
        } else {
          setError('Failed to fetch tenant data. Please try again later.')
        }
      } catch (error) {
        setError('Error fetching tenant data: ' + error.message)
      } finally {
        setLoading(false)
      }
    }

    if (tenantId) {
      fetchTenantData()
    } else {
      setError('No tenant ID provided.')
      setLoading(false)
    }
  }, [tenantId])

  // Loading, error, and tenant data states handling
  if (loading) {
    return <div>Loading...</div> // Show loading message
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div> // Display error message
  }

  return (
    <Container sx={{ backgroundColor: '#f5f5f5', paddingTop: 4 }}>
      <Box sx={{ backgroundColor: '#fff', padding: 2, width: '21cm', margin: '0 auto' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', paddingTop: 2, paddingBottom: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
            Mẫu CT01 ban hành kèm theo Thông tư số 66/2023/TT-BCA
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '12px', fontStyle: 'italic' }}>
            Ngày 17/11/2023 của Bộ trưởng Bộ Công an
          </Typography>
        </Box>

        {/* Content */}
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '14pt', fontWeight: 'bold' }}>
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </Typography>
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', fontSize: '14pt', fontWeight: 'bold', borderBottom: 2 }}>
              Độc lập-Tự do-Hạnh phúc
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ fontSize: '12pt', fontWeight: 'bold' }}>
              TỜ KHAI THAY ĐỔI THÔNG TIN CƯ TRÚ
            </Typography>
          </Grid>
        </Grid>

        {/* Form Content */}
        <Box sx={{ padding: '0 1cm', fontSize: '12pt' }}>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', fontSize: '12pt', fontWeight: 'bold', marginTop: 2, mt: 2 }}>
            Kính gửi: CÔNG AN PHƯỜNG Tân Hưng Thuận, Quận 12, Thành phố Hồ Chí Minh
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            1. Họ, chữ đệm và tên: <strong>{tenant.fullname}</strong>
          </Typography>
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body1">
                2. Ngày, tháng, năm sinh: <strong>{tenant.birthday}</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                3. Giới tính: <strong>{tenant.gender}</strong>
              </Typography>
            </Grid>
          </Grid>

          {/* Số định danh cá nhân */}
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            4. Số định danh cá nhân: <strong>{tenant.cccd}</strong>
          </Typography>

          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body1">
                5. Số điện thoại liên hệ: <strong>{tenant.phone}</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                6. Email: <strong>{tenant?.email}</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body1">7. Họ, chữ đệm và tên chủ hộ: ...............................</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">8. Quan hệ với chủ hộ: {tenant.relationship}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body1">9. Số định danh cá nhân của chủ hộ:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"></Typography>
            </Grid>
          </Grid>
          <Typography variant="body1">
            10. Nội dung đề nghị(2): Xin đăng ký tạm trú đến địa chỉ 122 nguyễn duy trinh, Tân Hưng Thuận, Quận 12,
            Thành phố Hồ Chí Minh
          </Typography>
          <Typography variant="body1">11. Những thành viên trong hộ gia đình cùng thay đổi:</Typography>
        </Box>

        {/* Table of family members */}
        <TableContainer sx={{ marginBottom: 3 }}>
          <Table sx={{ minWidth: 650, border: '1px solid #ddd' }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}>
                  TT
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}>
                  Họ, chữ đệm và tên
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}>
                  Ngày, tháng, năm sinh
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}>
                  Giới tính
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}>
                  Số định danh cá nhân/CMND
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Mối quan hệ với chủ hộ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell align="center" />
                  <TableCell align="center" />
                  <TableCell align="center" />
                  <TableCell align="center" />
                  <TableCell align="center" />
                  <TableCell align="center" />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        <Box sx={{ display: 'flex', paddingBottom: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={3} sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Ý KIẾN CỦA CHỦ HỘ
              </Typography>
              <Typography variant="body2">Ngày....tháng....năm.....</Typography>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Ý KIẾN CỦA CHỦ SỞ HỮU
              </Typography>
              <Typography variant="body2">Ngày....tháng....năm.....</Typography>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Ý KIẾN CỦA CHA, MẸ
              </Typography>
              <Typography variant="body2">Ngày....tháng....năm.....</Typography>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                NGƯỜI KÊ KHAI
              </Typography>
              <Typography variant="body2">Ngày....tháng....năm.....</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default ResidenceForm
