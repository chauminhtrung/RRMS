import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Avatar,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  Divider,
  styled,
  IconButton
} from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AddIcon from '@mui/icons-material/Add'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})
const AddTenantModal = ({ open, onClose }) => {
  const [gender, setGender] = useState('')
  const [idType, setIdType] = useState('CCCD')
  const [provinces, setProvinces] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [wards, setWards] = useState([])
  const [selectedWard, setSelectedWard] = useState('')
  const items = ['Là người liên hệ của phòng', 'Đã đăng ký tạm trú', 'Thông tin đã được xác minh']
  const items1 = [
    'Là người chịu trách nhiệm nhận hóa đơn, báo cáo các vấn đề của phòng',
    'Tình trạng đăng ký tạm trú của khách thuê',
    'Tình trạng cung cấp thông tin hoặc giấy tờ để chuẩn bị làm tạm trú'
  ]
  // Tạo một mảng trạng thái `checkedStates` với giá trị `false` cho mỗi công tắc
  const [checkedStates, setCheckedStates] = useState(Array(items.length).fill(false))

  // Hàm xử lý khi thay đổi trạng thái của một công tắc
  const handleCheckboxChange = (index) => (event) => {
    const newCheckedStates = [...checkedStates]
    newCheckedStates[index] = event.target.checked
    setCheckedStates(newCheckedStates)
  }
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
  // Lấy danh sách phường/xã dựa trên quận/huyện đã chọn
  const fetchWards = async (districtId) => {
    try {
      const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`)
      const data = await response.json()
      setWards(data.data)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phường/xã:', error)
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
    setDistricts([]) // Xóa dữ liệu quận/huyện khi chọn tỉnh mới
    setWards([]) // Xóa dữ liệu phường/xã khi chọn tỉnh mới
    fetchDistricts(provinceId)
  }

  // Hàm xử lý khi chọn quận/huyện
  const handleDistrictChange = (event) => {
    const districtId = event.target.value
    setSelectedDistrict(districtId)
    setWards([]) // Xóa dữ liệu phường/xã khi chọn quận mới
    fetchWards(districtId)
  }

  // Hàm xử lý khi chọn phường/xã
  const handleWardChange = (event) => {
    setSelectedWard(event.target.value)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1000,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
          maxHeight: '80vh',
          overflowY: 'scroll'
        }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          <IconButton
            sx={{
              backgroundColor: '#1e90ff',
              color: 'white',
              borderRadius: '50%',
              '&:hover': { backgroundColor: '#43a047' }
            }}>
            <AddIcon />
          </IconButton>
          Thêm thông tin khách thuê cho phòng
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  width: '5px',
                  height: '40px',
                  bgcolor: 'primary.main',
                  border: '1px solid #0056b3',
                  marginRight: 1,
                  mt: 0.5
                }}
              />
              <Box>
                <Typography variant="h6">Danh sách phòng</Typography>
                <Typography variant="body2">Danh sách phòng để thêm khách thuê</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Không có phòng nào để thêm khách thuê
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  width: '5px',
                  height: '40px',
                  bgcolor: 'primary.main',
                  border: '1px solid #0056b3',
                  marginRight: 1,
                  mt: 0.5
                }}
              />
              <Box>
                <Typography variant="h6">Thông tin cá nhân của khách thuê:</Typography>
                <Typography variant="body2">Các thông tin về khách thuê và tiền cọc</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                border: '2px solid #1e90ff',
                borderRadius: 2,
                padding: 2,
                width: 130,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fafafa',
                margin: 'auto',
                mt: 1
              }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 70,
                  bgcolor: '#e0e0e0',
                  color: '#9e9e9e',
                  cursor: 'pointer',
                  margin: 'auto'
                }}>
                <IconButton
                  component="label"
                  sx={{
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    border: '2px solid #f0f0f0',
                    width: 30,
                    height: 30,
                    padding: 0,
                    '&:hover': { backgroundColor: '#f0f0f0' }
                  }}>
                  <CloudUploadIcon fontSize="medium" />
                  <VisuallyHiddenInput type="file" accept="image/*" multiple />
                </IconButton>
              </Avatar>
              <Typography variant="body2" sx={{ mt: 1, color: '#9e9e9e' }}>
                Hình đại diện
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField label="Tên khách thuê" fullWidth required />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Số điện thoại khách thuê" fullWidth />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <RadioGroup row value={idType} onChange={(e) => setIdType(e.target.value)}>
                <FormControlLabel value="CCCD" control={<Radio />} label="Định dạng CCCD" />
                <FormControlLabel value="Passport" control={<Radio />} label="Định dạng Passport/Visa" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField label="CMND/CCCD" fullWidth />
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField label="Zalo của khách" fullWidth />
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField label="Ngày sinh" type="date" InputLabelProps={{ shrink: true }} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Giới tính</InputLabel>
                  <Select value={gender} onChange={(e) => setGender(e.target.value)} label="Giới tính">
                    <MenuItem value="Nam">Nam</MenuItem>
                    <MenuItem value="Nữ">Nữ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={6} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Chọn Tỉnh/Thành phố</InputLabel>
                  <Select
                    labelId="province-label"
                    id="province"
                    fullWidth
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    label="Chọn Tỉnh/Thành phố">
                    <MenuItem value=""></MenuItem>
                    {provinces.map((province) => (
                      <MenuItem key={province.id} value={province.id}>
                        {province.full_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Chọn Quận/Huyện</InputLabel>
                  <Select
                    labelId="district-label"
                    id="quan"
                    fullWidth
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    label="Chọn Quận/Huyện">
                    <MenuItem value=""></MenuItem>
                    {districts.map((district) => (
                      <MenuItem key={district.id} value={district.id}>
                        {district.full_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Chọn Phường/Xã</InputLabel>
                <Select
                  value={selectedWard}
                  onChange={handleWardChange}
                  labelId="address-label"
                  id="phuong"
                  label="Chọn Phường/Xã"
                  fullWidth>
                  {wards.map((ward) => (
                    <MenuItem key={ward.id} value={ward.id}>
                      {ward.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField label="Địa chỉ chi tiết. Ví dụ: 122 - Đường Phan Chu Trinh" fullWidth />
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField label="Nhập công việc" fullWidth />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField label="Ngày cấp CMND/CCCD" type="date" fullWidth InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Nơi cấp CMND/CCCD" fullWidth />
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    textAlign: 'center',
                    border: '2px solid #1e90ff',
                    borderRadius: 2,
                    padding: 2,
                    width: 220,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fafafa',
                    margin: 'auto',
                    mt: 1
                  }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 70,
                      bgcolor: '#e0e0e0',
                      color: '#9e9e9e',
                      cursor: 'pointer',
                      margin: 'auto'
                    }}>
                    <IconButton
                      component="label"
                      sx={{
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        border: '2px solid #f0f0f0',
                        width: 30,
                        height: 30,
                        padding: 0,
                        '&:hover': { backgroundColor: '#f0f0f0' }
                      }}>
                      <CloudUploadIcon fontSize="medium" />
                      <VisuallyHiddenInput type="file" accept="image/*" multiple />
                    </IconButton>
                  </Avatar>
                  <Typography variant="body2" sx={{ mt: 1, color: '#9e9e9e' }}>
                    Ảnh mặt trước CMND/CCCD
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    textAlign: 'center',
                    border: '2px solid #1e90ff',
                    borderRadius: 2,
                    padding: 2,
                    width: 220,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fafafa',
                    margin: 'auto',
                    mt: 1
                  }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 70,
                      bgcolor: '#e0e0e0',
                      color: '#9e9e9e',
                      cursor: 'pointer',
                      margin: 'auto'
                    }}>
                    <IconButton
                      component="label"
                      sx={{
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        border: '2px solid #f0f0f0',
                        width: 30,
                        height: 30,
                        padding: 0,
                        '&:hover': { backgroundColor: '#f0f0f0' }
                      }}>
                      <CloudUploadIcon fontSize="medium" />
                      <VisuallyHiddenInput type="file" accept="image/*" multiple />
                    </IconButton>
                  </Avatar>
                  <Typography variant="body2" sx={{ mt: 1, color: '#9e9e9e' }}>
                    Ảnh mặt sau CMND/CCCD
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', mt: 2 }}>
              <Box
                sx={{
                  width: '5px',
                  height: '40px',
                  bgcolor: 'primary.main',
                  border: '1px solid #0056b3',
                  marginRight: 1,
                  mt: 0.5
                }}
              />
              <Box>
                <Typography variant="h6" component="div">
                  Thông tin quản lý
                </Typography>
                <Typography variant="body2">Các thông tin về khách thuê và tiền cọc</Typography>
              </Box>
            </Grid>
            <Box>
              {items.map((item, index) => (
                <Fragment key={index}>
                  <FormControlLabel
                    control={
                      <Switch checked={checkedStates[index]} onChange={handleCheckboxChange(index)} color="primary" />
                    }
                    label={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body1" component="div" sx={{ mt: 1 }}>
                          <b>{item}</b>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                          {items1[index]}
                        </Typography>
                      </Box>
                    }
                  />
                  {items.length > 1 && index < items.length - 1 && <Divider />}
                </Fragment>
              ))}
            </Box>
            <Box
              sx={{
                position: 'sticky',
                bottom: -20,
                left: 0,
                width: '100%',
                bgcolor: 'white',
                p: 2,
                px: 3, // Padding hai bên để nội dung đẹp hơn
                borderTop: '1px solid',
                borderColor: 'divider', // Đường viền ngăn cách với nội dung trên
                boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)', // Đổ bóng nhẹ ở trên
                zIndex: 1, // Giữ nó nằm trên nội dung khi cuộn
                mt: 3
              }}>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={onClose}
                  color="inherit"
                  sx={{
                    mr: 2,
                    bgcolor: 'grey.300',
                    '&:hover': { bgcolor: 'grey.400' }, // Màu khi hover
                    color: 'text.primary'
                  }}>
                  Đóng
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    backgroundColor: '#1e90ff',
                    boxShadow: '0px 4px 10px rgba(76, 175, 80, 0.3)', // Đổ bóng nhẹ cho nút Thêm
                    '&:hover': { boxShadow: '0px 6px 12px rgba(76, 175, 80, 0.5)' } // Đổ bóng khi hover
                  }}>
                  Thêm thông tin khách thuê
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default AddTenantModal
