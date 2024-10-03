import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import LoadingPage from '~/components/LoadingPage'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const ModalSearch = ({ open, handleClose }) => {
  const [propertyType, setPropertyType] = useState('Phòng trọ, nhà trọ')
  const [occupation, setOccupation] = useState('Ngành nghề khác')
  const [provinces, setProvinces] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Sử dụng breakpoint để xác định màn hình nhỏ

  // Hàm để lấy danh sách tỉnh/thành từ API
  const fetchProvinces = async () => {
    try {
      const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
      const data = await response.json()
      setProvinces(data.data)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách tỉnh/thành:', error)
    }
  }

  // Hàm để lấy danh sách quận/huyện theo tỉnh/thành từ API
  const fetchDistricts = async (provinceId) => {
    try {
      const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`)
      const data = await response.json()
      setDistricts(data.data)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách quận/huyện:', error)
    }
  }

  // Lấy danh sách tỉnh/thành khi component được render lần đầu
  useEffect(() => {
    fetchProvinces()
  }, [])

  // Hàm xử lý khi chọn tỉnh/thành
  const handleProvinceChange = (event) => {
    const provinceId = event.target.value
    setSelectedProvince(provinceId)
    fetchDistricts(provinceId)
  }

  // Hàm xử lý khi chọn quận/huyện
  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value)
  }

  const propertyTypes = [
    'Phòng trọ, nhà trọ',
    'Nhà cho thuê',
    'Văn phòng',
    'Căn hộ chung cư',
    'Kho, nhà xưởng',
    'Ký túc xá, sleepbox',
    'Ở ghép & pass phòng',
  ]

  const occupations = ['Sinh viên', 'Nhân viên văn phòng', 'Nhân viên xí nghiệp', 'Ngành nghề khác']

  if (!provinces.length) {
    return <LoadingPage />
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '95%' : 800, // Responsive kích thước cho mobile
            bgcolor: 'background.paper',
            border: 'none',
            boxShadow: 24,
            borderRadius: 2,
            p: isMobile ? 2 : 4, // Giảm padding cho mobile
          }}>
          <Paper elevation={3} sx={{ maxWidth: '100%', padding: isMobile ? 2 : 3, borderRadius: 2 }}>
            {/* Tiêu đề */}
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                backgroundColor: '#1e90ff',
                color: 'white',
                padding: 1,
                textAlign: 'center',
                borderRadius: 1,
              }}>
              TIÊU CHÍ TÌM KIẾM
            </Typography>

            {/* Chọn Khu vực */}
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Bạn muốn tìm kiếm tại Khu vực quận/huyện nào?
              </Typography>
              <FormControl fullWidth>
                <Grid container justifyContent="center" spacing={isMobile ? 1 : 2}>
                  {/* Chọn Tỉnh/Thành phố */}
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                      <InputLabel id="province-label">Chọn Tỉnh/Thành phố</InputLabel>

                      {/* Select */}
                      <Select
                        labelId="province-label"
                        id="province"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        label="Chọn Tỉnh/Thành phố">
                        <MenuItem value="">
                          <em>Chọn tỉnh/thành phố</em>
                        </MenuItem>
                        {provinces.map((province) => (
                          <MenuItem key={province.id} value={province.id}>
                            {province.full_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Chọn Quận/Huyện */}
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="province-label">Chọn Quận/Huyện</InputLabel>
                      <Select
                        labelId="district-label"
                        id="quan"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        size={isMobile ? 'small' : 'medium'}
                        label="Chọn Quận/Huyện">
                        <MenuItem value="">
                          <em>Chọn quận/huyện</em>
                        </MenuItem>
                        {districts.map((district) => (
                          <MenuItem key={district.id} value={district.id}>
                            {district.full_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormControl>
            </Box>

            {/* Loại hình tìm kiếm */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Loại hình tìm kiếm?
              </Typography>
              <Grid container spacing={isMobile ? 0.5 : 1}>
                {propertyTypes.map((type) => (
                  <Grid item xs={6} key={type}>
                    <Button
                      variant={propertyType === type ? 'contained' : 'outlined'}
                      onClick={() => setPropertyType(type)}
                      startIcon={propertyType === type ? <CheckCircleIcon sx={{ color: '#0984e3', ml: -1 }} /> : <></>}
                      sx={{
                        width: '100%',
                        textTransform: 'none',
                        justifyContent: 'flex-start', // Đẩy nội dung của Button ra sát lề trái
                        backgroundColor: propertyType === type ? 'lightgreen' : 'white',
                        fontSize: isMobile ? '0.75rem' : '1rem', // Điều chỉnh font cho mobile
                      }}>
                      {type}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Hiện tại bạn đang làm gì? */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Hiện tại bạn đang làm gì?
              </Typography>
              <Grid container spacing={isMobile ? 0.5 : 1}>
                {occupations.map((occ) => (
                  <Grid item xs={6} key={occ}>
                    <Button
                      variant={occupation === occ ? 'contained' : 'outlined'}
                      onClick={() => setOccupation(occ)}
                      startIcon={occupation === occ ? <CheckCircleIcon sx={{ color: '#0984e3', ml: -1 }} /> : <></>}
                      sx={{
                        width: '100%',
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        backgroundColor: occupation === occ ? 'lightgreen' : 'white',
                        fontSize: isMobile ? '0.75rem' : '1rem',
                      }}>
                      {occ}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Nút hành động */}
            <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="space-between">
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  width: isMobile ? '100%' : '48%',
                  textTransform: 'none',
                  marginBottom: isMobile ? 1 : 0,
                  backgroundColor: '#1e90ff',
                  border: '1px solid gray',
                  color: '#ffffff',
                }}>
                Đóng bộ lọc
              </Button>
              <Button
                variant="contained"
                sx={{ width: isMobile ? '100%' : '48%', textTransform: 'none', backgroundColor: '#1e90ff' }}>
                Tìm kiếm ngay
              </Button>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalSearch
