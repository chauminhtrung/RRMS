/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
  Typography
} from '@mui/material'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import { useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import LocationSelect from '~/components/ProvinceSelect'

import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '~/configs/firebaseConfig'
import { v4 } from 'uuid'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TitleAttribute from './TitleAttribute'
import { processImage } from '~/utils/processImage'
import { postRoom } from '~/apis/roomAPI'

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
    display: 'none'
  },
  scrollBehavior: 'smooth',
  '.MuiSelect-select': { bgcolor: 'white', border: '0.5px solid #dcdcdc', borderRadius: '5px' },
  '.MuiInputBase-input': { bgcolor: 'white', border: '0.5px solid #dcdcdc', borderRadius: '5px' }
}

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

const validationSchema = Yup.object({
  nameRoom: Yup.string()
    .required('Tiêu đề là bắt buộc.')
    .min(2, 'Tiêu đề phải có ít nhất 2 ký tự.')
    .max(50, 'Tiêu đề không được quá 50 ký tự.'),
  typeRoomName: Yup.string().required('Loại phòng là bắt buộc.'),
  // owner: Yup.string().required('Tên chủ phòng là bắt buộc.'),
  // phone: Yup.string()
  //   .required('Số điện thoại là bắt buộc.')
  //   .matches(/^[0-9]+$/, 'Số điện thoại chỉ chứa số.')
  //   .min(10, 'Số điện thoại phải có ít nhất 10 ký tự.')
  //   .max(15, 'Số điện thoại không được quá 15 ký tự.'),
  description: Yup.string().required('Mô tả là bắt buộc.').max(500, 'Mô tả không được quá 500 ký tự.'),
  price: Yup.number().required('Giá phòng là bắt buộc.').min(0, 'Giá phòng phải lớn hơn hoặc bằng 0.'),
  deposit: Yup.number().required('Tiền đặt cọc là bắt buộc.').min(0, 'Tiền đặt cọc phải lớn hơn hoặc bằng 0.'),
  roomArea: Yup.number()
    .required('Diện tích phòng là bắt buộc.')
    .min(0, 'Diện tích phòng phải lớn hơn hoặc bằng 0.')
    .max(100, 'Diện tích phần phải lớn hơn hoặc bằng 100.'),
  maxPerson: Yup.number().required('Số người tối đa là bắt buộc.').min(1, 'Số người tối đa phải lớn hơn hoặc bằng 1.'),
  rentalStartTime: Yup.date()
    .required('Thời gian bắt đầu cho thuê là bắt buộc.')
    .min(new Date(), 'Thời gian bắt đầu không được là trong quá khứ.'),
  roomServices: Yup.array()
    .of(Yup.string())
    .min(1, 'Ít nhất một dịch vụ phải được chọn.')
    .required('Dịch vụ là bắt buộc.'),
  roomImages: Yup.array().of(Yup.string().url('Hình ảnh phải là một URL hợp lệ.')).min(1, 'Cần ít nhất một hình ảnh.'),
  rules: Yup.array()
    .of(Yup.string().required('Quy định là bắt buộc.'))
    .required('Ít nhất một quy định phải được cung cấp.'),
  address: Yup.string().required('Địa chỉ là bắt buộc.')
})
const PostModal = ({ open, handleClose }) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } }
  const [typeRooms, setTypeRooms] = useState('')
  const [maxPerson, setMaxPerson] = useState('')
  const [selectedImages, setSelectedImages] = useState([])
  const [openHour, setOpenHour] = useState()
  const [closeHour, setCloseHour] = useState()
  const [address, setAddress] = useState('')

  const [room, setRoom] = useState({
    available: false,
    nameRoom: '',
    typeRoomName: '',
    description: '',
    price: 0,
    username: 'dung',
    deposit: 0,
    roomArea: 0,
    censor: false,
    priceElectric: 0,
    priceWater: 0,
    maxPerson: 0,
    rentalStartTime: '',
    hours: 'Tự do',
    roomServices: [],
    roomImages: [],
    rules: [],
    address: ''
  })

  const formik = useFormik({
    initialValues: {
      nameRoom: room.nameRoom,
      typeRoomName: room.typeRoomName,
      description: room.description,
      price: room.price,
      deposit: room.deposit,
      roomArea: room.roomArea,
      censor: room.censor,
      username: 'dung',
      priceElectric: room.priceElectric,
      priceWater: room.priceWater,
      maxPerson: room.maxPerson,
      rentalStartTime: room.rentalStartTime,
      roomServices: room.roomServices,
      roomImages: room.roomImages,
      rules: room.rules,
      address: room.address
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  useEffect(() => {
    formik.setValues({
      nameRoom: room.nameRoom,
      typeRoomName: room.typeRoomName,
      description: room.description,
      price: room.price,
      deposit: room.deposit,
      roomArea: room.roomArea,
      censor: room.censor,
      priceElectric: room.priceElectric,
      priceWater: room.priceWater,
      maxPerson: room.maxPerson,
      rentalStartTime: room.rentalStartTime,
      roomServices: room.roomServices,
      roomImages: room.roomImages,
      rules: room.rules,
      address: room.address
    })
  }, [room])

  const handleChangeTypeRooms = (event) => {
    setRoom({ ...room, typeRoomName: event.target.value })
    setTypeRooms(event.target.value)
  }

  const handleChangeMaxPerson = (event) => {
    setRoom({ ...room, maxPerson: event.target.value })
    setMaxPerson(event.target.value)
  }
  const handleLocationChange = (province, district, ward) => {
    const newAddress = [ward, district, province].filter(Boolean).join(', ')
    setRoom((prevRoom) => ({ ...prevRoom, province, district, ward, address: newAddress }))
  }

  const handleDetailAddressChange = (event) => {
    const detailAddress = event.target.value

    // Cập nhật room với địa chỉ chi tiết
    setRoom((prevRoom) => ({
      ...prevRoom,
      detailAddress,
      address: createAddress({ ...prevRoom, detailAddress })
    }))
  }
  const createAddress = ({ province, district, ward, detailAddress }) => {
    return [detailAddress, ward, district, province].filter(Boolean).join(', ')
  }

  const handleProvinceChange = (newProvince) => {
    setRoom((prevRoom) => {
      const updatedRoom = { ...prevRoom, province: newProvince }
      return { ...updatedRoom, address: createAddress(updatedRoom) }
    })
  }

  const handleDistrictChange = (newDistrict) => {
    setRoom((prevRoom) => {
      const updatedRoom = { ...prevRoom, district: newDistrict }
      return { ...updatedRoom, address: createAddress(updatedRoom) }
    })
  }

  const handleWardChange = (newWard) => {
    setRoom((prevRoom) => {
      const updatedRoom = { ...prevRoom, ward: newWard }
      return { ...updatedRoom, address: createAddress(updatedRoom) }
    })
  }

  const handleImageRemove = (indexToRemove) => {
    setSelectedImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove))
  }

  const handleChangeOpenHour = (event) => {
    const newOpenHour = event.target.value
    setRoom((prevRoom) => {
      const updatedRoom = { ...prevRoom, openHour: newOpenHour }

      const newHours =
        newOpenHour && prevRoom.closeHour
          ? `${newOpenHour} - ${prevRoom.closeHour}`
          : newOpenHour || prevRoom.closeHour
          ? newOpenHour || prevRoom.closeHour
          : 'Tự do'

      return { ...updatedRoom, hours: newHours }
    })
  }

  const handleChangeCloseHour = (event) => {
    const newCloseHour = event.target.value
    setRoom((prevRoom) => {
      const updatedRoom = { ...prevRoom, closeHour: newCloseHour }

      const newHours =
        prevRoom.openHour && newCloseHour
          ? `${prevRoom.openHour} - ${newCloseHour}`
          : prevRoom.openHour || newCloseHour
          ? prevRoom.openHour || newCloseHour
          : 'Tự do'

      return { ...updatedRoom, hours: newHours }
    })
  }

  const handleImageChange = async (event) => {
    const images = Array.from(event.target.files)
    console.log('Selected files:', images)

    if (selectedImages.length + images.length > 5) {
      toast.info('Chỉ được chọn tối đa 5 ảnh')
      return
    }

    const processedImagesPromises = images.map(async (image) => {
      if (image) {
        try {
          return await processImage(image, 16 / 9, 1)
        } catch (error) {
          console.log('Error processing image:', error)
          return null
        }
      }
      return null
    })

    const processedImages = await Promise.all(processedImagesPromises)
    setSelectedImages((prevImages) => [...prevImages, ...processedImages.filter((img) => img !== null)])
  }

  const handlePost = () => {
    if (selectedImages && selectedImages.length > 0) {
      const uploadPromises = selectedImages.map((image) => {
        const imageName = v4()
        const storageRef = ref(storage, `images/room-images/${imageName}`)

        const metadata = {
          contentType: image.type
        }

        const uploadTask = uploadBytesResumable(storageRef, image, metadata)

        return new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              console.log(`Upload is ${progress}% done`)
            },
            (error) => {
              console.log(error)
              toast.error('Có lỗi xảy ra khi tải lên hình ảnh.')
              reject(error)
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                  console.log('Download URL:', url)
                  resolve(url)
                })
                .catch((error) => {
                  console.error('Error getting download URL:', error)
                  reject(error)
                })
            }
          )
        })
      })

      Promise.all(uploadPromises)
        .then((downloadURLs) => {
          const updatedRoom = { ...room, roomImages: downloadURLs }
          postRoom(updatedRoom).then((res) => {
            if (res.data.code === 400) {
              toast.error(res.data.message)
            }
          })
          toast.success('Đăng tin thành công!')
          handleClose(true)
          setRoom({
            available: false,
            nameRoom: '',
            typeRoomName: '',
            description: '',
            price: 0,
            deposit: 0,
            roomArea: 0,
            censor: false,
            priceElectric: 0,
            priceWater: 0,
            maxPerson: 0,
            rentalStartTime: '',
            hours: 'Tự do',
            roomServices: [],
            roomImages: [],
            rules: [],
            address: ''
          })
        })
        .catch((error) => {
          console.error('Error uploading images:', error)
          toast.error('Có lỗi xảy ra khi tải lên hình ảnh.')
        })
    } else {
      console.log('Room without images:', room)
      postRoom(room).then((res) => {
        if (res.data.code === 400) {
          toast.error(res.data.message)
        }
      })
      handleClose(true)
    }
  }

  const handleCheckboxChange = (service) => {
    setRoom((prevRoom) => {
      const newServices = prevRoom.roomServices.includes(service)
        ? prevRoom.roomServices.filter((s) => s !== service)
        : [...prevRoom.roomServices, service]

      return { ...prevRoom, roomServices: newServices }
    })
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
          <Switch {...label} onChange={(e) => setRoom({ ...room, available: event.target.checked })} />
          <Box>
            <Typography variant="inherit" component="h2">
              Cho thuê
            </Typography>
            <Typography>Khi bật cho thuê, khách thuê có thể tiếp cận tin của bạn </Typography>
          </Box>
        </Box>
        <Box sx={{ fontStyle: 'italic' }}>
          <TitleAttribute title="Thông tin chủ nhà" description="Nhập các thông tin về người cho thuê" />
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
            <TextField
              onChange={(event) => {
                setRoom({ ...room, nameRoom: event.target.value })
                formik.handleChange
              }}
              onBlur={formik.handleBlur}
              name="nameRoom"
              required
              variant="filled"
              id="outlined-basic"
              label="Tiêu đề"
              error={formik.touched.nameRoom && Boolean(formik.errors.nameRoom)}
              helperText={formik.touched.nameRoom && formik.errors.nameRoom}
              sx={{ minWidth: 350 }}
            />
            <FormControl
              required
              variant="filled"
              sx={{ minWidth: 350 }}
              error={formik.touched.typeRoomName && Boolean(formik.errors.typeRoomName)}>
              <InputLabel id="demo-simple-select-filled-label">Danh mục thuê</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="typeRoomName"
                value={formik.values.typeRoomName}
                onChange={(event) => {
                  setRoom({ ...room, typeRoomName: event.target.value })
                  formik.handleChange
                }}
                onBlur={formik.handleBlur}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'Nhà trọ'}>Nhà trọ</MenuItem>
                <MenuItem value={'Chung cư mini'}>Chung cư mini</MenuItem>
                <MenuItem value={'Ký túc xá'}>Ký túc xá</MenuItem>
                <MenuItem value={'Căn hộ dịch vụ'}>Căn hộ dịch vụ</MenuItem>
                <MenuItem value={'Phòng trọ có gác lửng'}>Phòng trọ có gác lửng</MenuItem>
                <MenuItem value={'Nhà nguyên căn'}>Nhà nguyên căn</MenuItem>
                <MenuItem value={'Biệt thự'}>Biệt thự</MenuItem>
                <MenuItem value={'Homestay'}>Homestay</MenuItem>
                <MenuItem value={'Căn hộ studio'}>Căn hộ studio</MenuItem>
                <MenuItem value={'Officetel'}>Officetel</MenuItem>
              </Select>
              <FormHelperText>{formik.touched.typeRoomName && formik.errors.typeRoomName}</FormHelperText>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="owner"
              required
              id="outlined-basic"
              label="Tên người liên hệ"
              variant="filled"
              error={formik.touched.owner && Boolean(formik.errors.owner)}
              helperText={formik.touched.owner && formik.errors.owner}
              sx={{ minWidth: 350 }}
            />

            <TextField
              required
              id="outlined-basic"
              label="SĐT"
              variant="filled"
              name="phone"
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                formik.handleChange(e)
                setRoom({ ...room, phone: e.target.value })
              }}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              sx={{ minWidth: 350 }}
            />
          </Grid> */}
        </Grid>
        <TitleAttribute title="Mô tả" description="Nhập mô tả về nhà cho thuê" />
        <TextareaAutosize
          required
          minRows={4}
          onChange={(event) => {
            setRoom({ ...room, description: event.target.value })
            formik.handleChange
          }}
          onBlur={formik.handleBlur}
          name="description"
          style={{
            borderRadius: '10px',
            border: '1px solid #ccc',
            padding: '10px',
            overflow: 'hidden',
            resize: 'none',
            width: '715px'
          }}
          placeholder="Nhập mô tả"
        />
        {formik.touched.description && formik.errors.description && (
          <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.description}</div>
        )}
        <TitleAttribute title="Thông tin cơ bản & giá" description="Nhập các thông tin về phòng cho thuê" />
        <Grid container spacing={1} sx={{ my: 1 }}>
          <Grid item xs={4}>
            <TextField
              onChange={(event) => {
                setRoom({ ...room, price: event.target.value })
                formik.handleChange
              }}
              onBlur={formik.handleBlur}
              name="price"
              required
              id="outlined-basic"
              label="Giá thuê"
              variant="filled"
              type="number"
              sx={{ width: '100%' }}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              onChange={(event) => {
                setRoom({ ...room, promotionalPrice: event.target.value })
                formik.handleChange
              }}
              onBlur={formik.handleBlur}
              name="promotionalPrice"
              id="outlined-basic"
              label="Giá thuê khuyến mãi"
              variant="filled"
              type="number"
              sx={{ width: '100%' }}
              error={formik.touched.promotionalPrice && Boolean(formik.errors.promotionalPrice)}
              helperText={formik.touched.promotionalPrice && formik.errors.promotionalPrice}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={(event) => {
                setRoom({ ...room, deposit: event.target.value })
                formik.handleChange
              }}
              onBlur={formik.handleBlur}
              name="deposit"
              required
              id="outlined-basic"
              label="Tiền cọc"
              variant="filled"
              type="number"
              sx={{ width: '100%' }}
              error={formik.touched.deposit && Boolean(formik.errors.deposit)}
              helperText={formik.touched.deposit && formik.errors.deposit}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={(event) => {
                setRoom({ ...room, roomArea: event.target.value })
                formik.handleChange
              }}
              onBlur={formik.handleBlur}
              name="roomArea"
              required
              id="outlined-basic"
              label="Diện tích"
              variant="filled"
              type="number"
              sx={{ width: '100%' }}
              error={formik.touched.roomArea && Boolean(formik.errors.roomArea)}
              helperText={formik.touched.roomArea && formik.errors.roomArea}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={(event) => {
                setRoom({ ...room, priceElectric: event.target.value })
                formik.handleChange
              }}
              onBlur={formik.handleBlur}
              name="priceElectric"
              required
              id="outlined-basic"
              label="Giá điện"
              variant="filled"
              type="number"
              sx={{ width: '100%' }}
              error={formik.touched.priceElectric && Boolean(formik.errors.priceElectric)}
              helperText={formik.touched.priceElectric && formik.errors.priceElectric}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={(event) => {
                setRoom({ ...room, priceWater: event.target.value })
                formik.handleChange
              }}
              onBlur={formik.handleBlur}
              name="priceWater"
              required
              id="outlined-basic"
              label="Giá nước"
              variant="filled"
              type="number"
              sx={{ width: '100%' }}
              error={formik.touched.priceWater && Boolean(formik.errors.priceWater)}
              helperText={formik.touched.priceWater && formik.errors.priceWater}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl
              required
              variant="filled"
              sx={{ minWidth: 350 }}
              error={formik.touched.maxPerson && Boolean(formik.errors.maxPerson)}>
              <InputLabel id="demo-simple-select-filled-label">Tối đa người ở / phòng</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="maxPerson"
                value={formik.values.maxPerson}
                onChange={(event) => {
                  setRoom({ ...room, maxPerson: event.target.value })
                  formik.handleChange
                }}
                onBlur={formik.handleBlur}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
              <FormHelperText>{formik.touched.maxPerson && formik.errors.maxPerson}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={(event) => {
                setRoom({ ...room, rentalStartTime: event.target.value })
                formik.handleChange
              }}
              onBlur={formik.handleBlur}
              name="rentalStartTime"
              required
              variant="filled"
              label="Ngày có thể vào ở"
              fullWidth
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              error={formik.touched.rentalStartTime && Boolean(formik.errors.rentalStartTime)}
              helperText={formik.touched.rentalStartTime && formik.errors.rentalStartTime}
            />
          </Grid>
        </Grid>
        <Box>
          <TitleAttribute title="Tiện ích cho thuê" description="Tùy chọn tiện ích của nhà cho thuê" />
        </Box>
        <Grid container>
          {[
            'Có gác lửng',
            'Có chỗ giữ xe',
            'Toilet riêng',
            'Riêng với chủ',
            'Có wifi',
            'Có camera an ninh',
            'Được nuôi thú cưng',
            'Có ban công',
            'Có nơi sinh hoạt'
          ].map((service) => (
            <Grid item xs={4} key={service}>
              <FormControlLabel
                checked={room.roomServices.includes(service)}
                onChange={() => {
                  const newServices = room.roomServices.includes(service)
                    ? room.roomServices.filter((s) => s !== service)
                    : [...room.roomServices, service]
                  setRoom({ ...room, roomServices: newServices })
                  formik.setFieldValue('roomServices', newServices)
                }}
                control={<Checkbox checked={room.roomServices.includes(service)} />}
                label={service}
              />
            </Grid>
          ))}
        </Grid>
        <TitleAttribute title=" Quy định giờ giấc" description="Tùy chọn thời gian hoạt động của nhà cho thuê" />
        <Box sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <FormControl
            variant="filled"
            value={openHour}
            onChange={handleChangeOpenHour}
            sx={{ minWidth: 350 }}
            error={formik.touched.openHour && Boolean(formik.errors.openHour)}>
            <InputLabel id="demo-simple-select-filled-label">Giờ mở cửa</InputLabel>
            <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" name="openHour">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'4 SA'}>4 SA</MenuItem>
              <MenuItem value={'5 SA'}>5 SA</MenuItem>
              <MenuItem value={'6 SA'}>6 SA</MenuItem>
            </Select>
            <FormHelperText>{formik.touched.openHour && formik.errors.openHour}</FormHelperText>
          </FormControl>
          <FormControl
            variant="filled"
            value={closeHour}
            onChange={handleChangeCloseHour}
            sx={{ minWidth: 350 }}
            error={formik.touched.closeHour && Boolean(formik.errors.closeHour)}>
            <InputLabel id="demo-simple-select-filled-label">Giờ đóng cửa</InputLabel>
            <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" name="closeHour">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'22 CH'}>22 CH</MenuItem>
              <MenuItem value={'23 CH'}>23 CH</MenuItem>
              <MenuItem value={'00 SA'}>00 SA</MenuItem>
            </Select>
            <FormHelperText>{formik.touched.closeHour && formik.errors.closeHour}</FormHelperText>
          </FormControl>
        </Box>
        {/* <Box>
          <Typography variant="inherit" component="h2">
            Nội quy
          </Typography>
          <Typography>Tùy chọn nội quy của nhà cho thuê</Typography>
        </Box>
        <Grid container>
          <Grid item xs={6}>
            <RoomRule title={'Nhà trọ có giờ giấc không về quá khuya'} desciption={'Không về sau 12h tối'} />
          </Grid>
          <Grid item xs={6}>
            <RoomRule title={'Đóng tiền trọ đúng ngày'} desciption={'Đóng tiền trọ đúng ngày'} />
          </Grid>
          <Grid item xs={6}>
            <RoomRule
              title={'Không hút thuốc, say xỉn'}
              desciption={'Không tụ tập nhậu nhặt hát hò làm ảnh hưởng phòng xung quanh'}
            />
          </Grid>
          <Grid item xs={6}>
            <RoomRule
              title={'Không chứa chấp tội phạm'}
              desciption={'Không che dấu và chứa chấp tội phạm trong phòng'}
            />
          </Grid>
          <Grid item xs={6}>
            <RoomRule
              title={'Không hát karaoke, nhậu nhặt ảnh hưởng tới phòng kế bên'}
              desciption={'Không gây ồn ào, mất trật tự, nhậu nhặt, say xỉn...'}
            />
          </Grid>
          <Grid item xs={6}>
            <RoomRule
              title={'Cư xử văn hóa'}
              desciption={
                'Không gây gỗ chữi thề, gây hiềm khích với mọi người, tạo văn hóa phòng trọ yên bình hòa đồng.'
              }
            />
          </Grid>
        </Grid> */}
        <Box>
          <TitleAttribute
            title="Địa chỉ"
            description="Vui lòng nhập địa chỉ chính xác để có thể tìm đến nhà cho thuê của bạn"
          />
        </Box>
        <Box>
          <LocationSelect
            onChangeProvince={handleProvinceChange}
            onChangeDistrict={handleDistrictChange}
            onChangeWard={handleWardChange}
            onChange={(province, district, ward) => handleLocationChange(province, district, ward)}
          />
          <TextField
            onChange={(event) => {
              handleDetailAddressChange(event)
              formik.handleChange
            }}
            onBlur={formik.handleBlur}
            name="address"
            required
            id="outlined-basic"
            label="Địa chỉ chi tiết"
            variant="filled"
            sx={{ width: '100%', mt: -2 }}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Box>
        <Box>
          <TitleAttribute title="Hình ảnh" description="Hình ảnh về phòng cho thuê" />
          <Box
            sx={{
              bgcolor: '#eeeeee',
              p: 1,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center'
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
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => {
                  handleImageChange(event)
                  formik.setFieldValue('roomImages', event.currentTarget.files)
                }}
              />
            </IconButton>
            <Box sx={{ display: selectedImages.length > 0 ? 'none' : 'block', textAlign: 'center' }}>
              <Typography>Chọn tối đa 5 ảnh</Typography>
              <Typography variant="body2">
                Lưu ý ảnh sẽ được cắt theo tỉ lệ 16:9 để phù hợp với trang web, vui lòng chọn ảnh có tỉ lệ gần giống để
                không làm mất thông tin quan trọng !
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                maxWidth: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              {selectedImages &&
                Array.from(selectedImages).map((image, i) => (
                  <Box
                    key={image.name || i}
                    component="img"
                    src={URL.createObjectURL(image)}
                    alt={`Hình ảnh ${i + 1}`}
                    width={200}
                    height="auto"
                    onLoad={() => URL.revokeObjectURL(image)}
                    onError={() => console.log('Lỗi tải hình ảnh')}
                    sx={{ borderRadius: 1, boxShadow: 2 }}
                    onClick={() => handleImageRemove(i)}
                  />
                ))}
            </Box>
          </Box>
        </Box>
        <Box sx={{ position: 'sticky', display: 'flex', mt: 1, justifyContent: 'end', gap: 1 }}>
          <Button variant="contained" sx={{ bgcolor: '#2f3542' }}>
            Đóng
          </Button>
          <Button variant="contained" sx={{ bgcolor: '#2ed573' }} onClick={handlePost}>
            Thêm tin đăng
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default PostModal
