import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  styled,
  Switch,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import { useState } from 'react'
import LocationSelect from '~/components/ProvinceSelect'
import CameraAltIcon from '@mui/icons-material/CameraAlt'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  maxHeight: '80vh',
  overflowY: 'scroll',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollBehavior: 'smooth',
  '.MuiSelect-select': { bgcolor: 'white', border: '0.5px solid #dcdcdc', borderRadius: '5px' },
  '.MuiInputBase-input': { bgcolor: 'white', border: '0.5px solid #dcdcdc', borderRadius: '5px' },
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const PostModal = ({ open, handleClose }) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } }
  const [typeRooms, setTypeRooms] = useState('')
  const [maxPersion, setMaxPersion] = useState('')

  const handleChangeTypeRooms = (event) => {
    setTypeRooms(event.target.value)
  }

  const handleChangeMaxPersion = (event) => {
    setMaxPersion(event.target.value)
  }
  const handleProvinceChange = (selectedProvince) => {
    console.log('Selected Province:', selectedProvince)
  }

  const handleDistrictChange = (selectedDistrict) => {
    console.log('Selected District:', selectedDistrict)
  }

  const handleWardChange = (selectedWard) => {
    console.log('Selected Ward:', selectedWard)
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ViewInArIcon />
          <Typography id="modal-modal-title" variant="h6" component={'h2'}>
            Thêm tin đăng
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: '#333' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, mt: 1 }}>
          <Switch {...label} />
          <Box>
            <Typography variant="inherit" component="h2">
              Cho thuê
            </Typography>
            <Typography>Khi bật cho thuê, khách thuê có thể tiếp cận tin của bạn </Typography>
          </Box>
        </Box>
        <Box sx={{ fontStyle: 'italic' }}>
          <Typography component={'h3'} sx={{ fontStyle: 'normal' }}>
            Thông tin chủ nhà
          </Typography>
          <Typography>Nhập các thông tin về người cho thuê</Typography>
          <Typography>
            *Tiêu đề tốt:{' '}
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
              Cho thuê + loại hình phòng trọ + diện tích + giá + tên đường/quận
            </Typography>
          </Typography>
          <Typography>Ví dụ: </Typography>
          <Typography>Cho thuê phòng trọ 18m2 giá rẻ tại Bình Thạnh</Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField variant="filled" id="outlined-basic" label="filled" sx={{ minWidth: 350 }} />
            <FormControl variant="filled" sx={{ minWidth: 350 }}>
              <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={typeRooms}
                onChange={handleChangeTypeRooms}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField id="outlined-basic" label="Outlined" variant="filled" sx={{ minWidth: 350 }} />
            <TextField id="outlined-basic" label="Outlined" variant="filled" sx={{ minWidth: 350 }} />
          </Grid>
        </Grid>
        <Box>
          <Typography variant="inherit" component="h2">
            Mô tả
          </Typography>
          <Typography>Nhập mô tả về nhà cho thuê</Typography>
        </Box>
        <TextareaAutosize
          minRows={4}
          style={{
            borderRadius: '10px',
            border: '1px solid #ccc',
            padding: '10px',
            overflow: 'hidden',
            resize: 'none',
            width: '715px',
          }}
          placeholder="Nhập mô tả"
        />
        <Box>
          <Typography variant="inherit" component="h2">
            Thông tin cơ bản & giá
          </Typography>
          <Typography>Nhập các thông tin về phòng cho thuê</Typography>
        </Box>
        <Grid container spacing={1} sx={{ my: 1 }}>
          <Grid item xs={4}>
            <TextField required id="outlined-basic" label="Outlined" variant="filled" sx={{ width: '100%' }} />
          </Grid>
          <Grid item xs={4}>
            <TextField required id="outlined-basic" label="Outlined" variant="filled" sx={{ width: '100%' }} />
          </Grid>
          <Grid item xs={4}>
            <TextField required id="outlined-basic" label="Outlined" variant="filled" sx={{ width: '100%' }} />
          </Grid>
          <Grid item xs={4}>
            <TextField required id="outlined-basic" label="Outlined" variant="filled" sx={{ width: '100%' }} />
          </Grid>
          <Grid item xs={4}>
            <TextField required id="outlined-basic" label="Outlined" variant="filled" sx={{ width: '100%' }} />
          </Grid>
          <Grid item xs={4}>
            <TextField required id="outlined-basic" label="Outlined" variant="filled" sx={{ width: '100%' }} />
          </Grid>
          <Grid item xs={6}>
            <FormControl required variant="filled" sx={{ minWidth: 350 }}>
              <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={maxPersion}
                onChange={handleChangeMaxPersion}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              variant="filled"
              label="Ngày tháng năm sinh"
              fullWidth
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Box>
          <Typography variant="inherit" component="h2">
            Tiện ích cho thuê
          </Typography>
          <Typography>Tùy chọn tiện ích của nhà cho thuê</Typography>
        </Box>
        <Grid container>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
        </Grid>
        <Box>
          <Typography variant="inherit" component="h2">
            Quy định giờ giấc
          </Typography>
          <Typography>Tùy chọn thời gian hoạt động của nhà cho thuê</Typography>
        </Box>
        <Box sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <FormControl variant="filled" sx={{ minWidth: 350 }}>
            <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={typeRooms}
              onChange={handleChangeTypeRooms}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ minWidth: 350 }}>
            <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={typeRooms}
              onChange={handleChangeTypeRooms}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Typography variant="inherit" component="h2">
            Nội quy
          </Typography>
          <Typography>Tùy chọn nội quy của nhà cho thuê</Typography>
        </Box>
        <Grid container>
          <Grid item xs={6}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          </Grid>
        </Grid>
        <Box>
          <Typography variant="inherit" component="h2">
            Địa chỉ
          </Typography>
          <Typography>Vui lòng nhập địa chỉ chính xác để có thể tìm đến nhà cho thuê của bạn</Typography>
        </Box>
        <Box>
          <LocationSelect
            onChangeProvince={handleProvinceChange}
            onChangeDistrict={handleDistrictChange}
            onChangeWard={handleWardChange}
          />
          <TextField required id="outlined-basic" label="Outlined" variant="filled" sx={{ width: '100%', mt: -2 }} />
        </Box>
        <Box>
          <Typography variant="inherit" component="h2">
            Hình ảnh
          </Typography>
          <Typography>Hình ảnh về phòng cho thuê</Typography>
          <Box
            sx={{
              bgcolor: '#eeeeee',
              p: 1,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
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
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}>
              <CameraAltIcon fontSize="small" />
              <VisuallyHiddenInput type="file" accept="image/*" />
            </IconButton>
            <Typography>Chọn tối đa 5 ảnh</Typography>
          </Box>
        </Box>
        <Box sx={{ position: 'sticky', display: 'flex', mt: 1, justifyContent: 'end', gap: 1 }}>
          <Button variant="contained" sx={{ bgcolor: '#2f3542' }}>
            Đóng
          </Button>
          <Button variant="contained" sx={{ bgcolor: '#2ed573' }}>
            Thêm tin đăng
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default PostModal
