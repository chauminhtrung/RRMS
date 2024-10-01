import { useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, MenuItem, Modal, Paper, Select, Typography } from '@mui/material'
import { getTinhThanh, getQuanHuyen } from '~/apis/apiClient'
import LoadingPage from '~/components/LoadingPage'

const ModalSearch = ({ open, handleClose }) => {
  const [propertyType, setPropertyType] = useState('Phòng trọ, nhà trọ')
  const [occupation, setOccupation] = useState('Ngành nghề khác')
  const [provinces, setProvinces] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')

  // Lấy danh sách tỉnh/thành phố khi component được render lần đầu
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getTinhThanh()
        if (response.data.error === 0) {
          setProvinces(response.data.data)
        } else {
          console.error('Error fetching provinces:', response.data.error_text)
        }
      } catch (error) {
        console.error('Error fetching provinces:', error)
      }
    }
    fetchProvinces()
  }, [selectedProvince])

  // Lấy danh sách quận/huyện khi tỉnh/thành phố được chọn
  useEffect(() => {
    if (selectedProvince) {
      console.log('Selected Province ID:', selectedProvince)
      getQuanHuyen(selectedProvince)
        .then((response) => {
          console.log('Districts response:', response.data)
          if (response.data.error === 0) {
            setDistricts(response.data.data)
            setSelectedDistrict('')
          } else {
            console.error('Error fetching districts:', response.data.error_text)
          }
        })
        .catch((error) => {
          console.error('Error fetching districts:', error)
        })
    } else {
      setDistricts([])
    }
  }, [selectedProvince])

  const propertyTypes = [
    'Phòng trọ, nhà trọ',
    'Nhà cho thuê',
    'Văn phòng',
    'Ở ghép & pass phòng',
    'Ký túc xá, sleepbox',
    'Căn hộ chung cư',
    'Kho, nhà xưởng',
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
            width: 800,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
          <Paper elevation={3} sx={{ maxWidth: 600, margin: 'auto', padding: 3, borderRadius: 2 }}>
            {/* Tiêu đề */}
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                backgroundColor: 'green',
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
                <Grid container justifyContent="center" spacing={2}>
                  {/* Chọn Tỉnh/Thành phố */}
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth>
                      <Select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
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
                      <Select
                        labelId="district-label"
                        id="quan"
                        value={selectedDistrict}
                        label="Chọn Quận Huyện"
                        onChange={(e) => setSelectedDistrict(e.target.value)}>
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
              <Grid container spacing={1}>
                {propertyTypes.map((type) => (
                  <Grid item xs={6} key={type}>
                    <Button
                      variant={propertyType === type ? 'contained' : 'outlined'}
                      onClick={() => setPropertyType(type)}
                      sx={{
                        width: '100%',
                        textTransform: 'none',
                        backgroundColor: propertyType === type ? 'lightgreen' : 'white',
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
              <Grid container spacing={1}>
                {occupations.map((occ) => (
                  <Grid item xs={6} key={occ}>
                    <Button
                      variant={occupation === occ ? 'contained' : 'outlined'}
                      onClick={() => setOccupation(occ)}
                      sx={{
                        width: '100%',
                        textTransform: 'none',
                        backgroundColor: occupation === occ ? 'lightgreen' : 'white',
                      }}>
                      {occ}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Nút hành động */}
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  width: '48%',
                  textTransform: 'none',
                  backgroundColor: 'lightgray',
                  border: '1px solid gray',
                }}>
                Đóng bộ lọc
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: '48%',
                  textTransform: 'none',
                  backgroundColor: 'green',
                  '&:hover': { backgroundColor: 'darkgreen' },
                }}
                onClick={() => console.log('Áp dụng tiêu chí tìm kiếm')}>
                Áp dụng tiêu chí
              </Button>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalSearch
