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
import MapComponent from './MapComponent'
import { getAccountByUsername, introspect } from '~/apis/accountAPI'
import { getBulletinBoard, postBulletinBoard, updateBulletinBoard } from '~/apis/bulletinBoardAPI'
import { deleteImageFromApi } from '~/apis/bulletinBoardImageAPI'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  maxHeight: '90vh',
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
  title: Yup.string().required('Tiêu đề là bắt buộc.').max(100, 'Tiêu đề không được vượt quá 100 ký tự.'),
  rentalCategory: Yup.string().required('Danh mục cho thuê là bắt buộc.'),
  description: Yup.string().max(500, 'Mô tả không được vượt quá 500 ký tự.'),
  rentPrice: Yup.number().required('Giá thuê là bắt buộc.').min(0, 'Giá thuê phải lớn hơn hoặc bằng 0.'),
  promotionalRentalPrice: Yup.number()
    .nullable()
    .min(0, 'Giá khuyến mãi phải lớn hơn hoặc bằng 0.')
    .max(Yup.ref('rentPrice'), 'Giá khuyến mãi phải nhỏ hơn hoặc bằng giá thuê.'),
  deposit: Yup.number().required('Tiền cọc là bắt buộc.').min(0, 'Tiền cọc phải lớn hơn hoặc bằng 0.'),
  area: Yup.number().required('Diện tích là bắt buộc.').min(0, 'Diện tích phải lớn hơn hoặc bằng 0.'),
  electricityPrice: Yup.number().required('Giá điện là bắt buộc.').min(0, 'Giá điện phải lớn hơn hoặc bằng 0.'),
  waterPrice: Yup.number().required('Giá nước là bắt buộc.').min(0, 'Giá nước phải lớn hơn hoặc bằng 0.'),
  maxPerson: Yup.string().required('Số người ở là bắt buộc.'),
  moveInDate: Yup.date()
    .nullable()
    .required('Ngày chuyển vào là bắt buộc.')
    .min(new Date(), 'Ngày chuyển vào không được ở quá khứ.'),
  openingHours: Yup.string().required('Giờ mở cửa là bắt buộc.'),
  closeHours: Yup.string().required('Giờ đóng cửa là bắt buộc.'),
  address: Yup.string().required('Địa chỉ là bắt buộc.').max(200, 'Địa chỉ không được vượt quá 200 ký tự.')
})

const PostModal = ({ open, handleClose, refreshBulletinBoards, bulletinBoardId }) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } }
  const [selectedImages, setSelectedImages] = useState([])
  const [address, setAddress] = useState('')
  const [position, setPosition] = useState(null)
  const [account, setAccount] = useState()
  const defaultBulletinBoard = {
    username: '',
    title: '',
    rentalCategory: '',
    description: '',
    rentPrice: '',
    promotionalRentalPrice: '',
    deposit: '',
    area: '',
    electricityPrice: '',
    waterPrice: '',
    maxPerson: '',
    moveInDate: null,
    openingHours: '',
    closeHours: '',
    address: '',
    longitude: '',
    latitude: '',
    status: false,
    isActive: false,
    bulletinBoardImages: [],
    bulletinBoardRules: [],
    bulletinBoards_RentalAm: []
  }

  const [bulletinBoard, setBulletinBoard] = useState(defaultBulletinBoard)

  useEffect(() => {
    if (position) {
      // Cập nhật cả latitude và longitude cùng một lúc
      setBulletinBoard((prevState) => ({
        ...prevState,
        latitude: position.lat,
        longitude: position.lng
      }))
    }
  }, [position])

  useEffect(() => {
    if (bulletinBoardId) {
      // Khi có bulletinBoardId, lấy dữ liệu từ API và cập nhật bulletinBoard
      setSelectedImages([]) // Đặt lại selectedImages
      getBulletinBoard(bulletinBoardId).then((res) => {
        setBulletinBoard(res.result) // Cập nhật bulletinBoard với dữ liệu từ API
      })
    } else {
      // Khi không có bulletinBoardId, đặt bulletinBoard với giá trị mặc định
      setBulletinBoard(defaultBulletinBoard)

      // Lấy thông tin tài khoản khi không có bulletinBoardId
      introspect().then((res) => {
        getAccountByUsername(res.data.issuer).then((accountRes) => {
          setAccount(accountRes.data) // Set account từ API

          // Cập nhật username sau khi có tài khoản
          setBulletinBoard((prevBulletinBoard) => ({
            ...prevBulletinBoard, // Giữ nguyên các giá trị cũ
            username: accountRes.data.username // Chỉ thay đổi trường username
          }))
        })
      })
    }
  }, [bulletinBoardId]) // Hook chỉ chạy khi bulletinBoardId thay đổi

  const formik = useFormik({
    initialValues: {
      title: '',
      rentalCategory: '',
      description: '',
      rentPrice: '',
      promotionalRentalPrice: '',
      deposit: '',
      area: '',
      electricityPrice: '',
      waterPrice: '',
      maxPerson: '',
      moveInDate: null,
      openingHours: '',
      closeHours: '',
      address: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  useEffect(() => {
    if (bulletinBoard) {
      formik.setValues({
        title: bulletinBoard.title || '',
        rentalCategory: bulletinBoard.rentalCategory || '',
        description: bulletinBoard.description || '',
        rentPrice: bulletinBoard.rentPrice || '',
        promotionalRentalPrice: bulletinBoard.promotionalRentalPrice || '',
        deposit: bulletinBoard.deposit || '',
        area: bulletinBoard.area || '',
        electricityPrice: bulletinBoard.electricityPrice || '',
        waterPrice: bulletinBoard.waterPrice || '',
        maxPerson: bulletinBoard.maxPerson || '',
        moveInDate: bulletinBoard.moveInDate || null,
        openingHours: bulletinBoard.openingHours || '',
        closeHours: bulletinBoard.closeHours || '',
        address: bulletinBoard.address || ''
      })
    }
  }, [bulletinBoard])

  const handleLocationChange = (province, district, ward) => {
    const newAddress = [ward, district, province].filter(Boolean).join(', ')
    setBulletinBoard((prevRoom) => ({ ...prevRoom, province, district, ward, address: newAddress }))
  }

  const handleDetailAddressChange = (event) => {
    const detailAddress = event.target.value

    // Cập nhật room với địa chỉ chi tiết
    setBulletinBoard((prevRoom) => ({
      ...prevRoom,
      detailAddress,
      address: createAddress({ ...prevRoom, address })
    }))
  }
  const createAddress = ({ province, district, ward, detailAddress }) => {
    return [detailAddress, ward, district, province].filter(Boolean).join(', ')
  }

  const handleProvinceChange = (newProvince) => {
    setBulletinBoard((prevRoom) => {
      const updatedRoom = { ...prevRoom, province: newProvince }
      return { ...updatedRoom, address: createAddress(updatedRoom) }
    })
  }

  const handleDistrictChange = (newDistrict) => {
    setBulletinBoard((prevRoom) => {
      const updatedRoom = { ...prevRoom, district: newDistrict }
      return { ...updatedRoom, address: createAddress(updatedRoom) }
    })
  }

  const handleWardChange = (newWard) => {
    setBulletinBoard((prevRoom) => {
      const updatedRoom = { ...prevRoom, ward: newWard }
      return { ...updatedRoom, address: createAddress(updatedRoom) }
    })
  }

  const handleImageChange = async (event) => {
    const images = Array.from(event.target.files)
    console.log('Selected files:', images)

    if (selectedImages.length + images.length < 2 || selectedImages.length + images.length > 5) {
      toast.info('Chỉ được chọn từ 2 đến 5 ảnh')
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

  const createdURLs = []

  const handlePost = () => {
    if (selectedImages && selectedImages.length > 0) {
      if (selectedImages.length + bulletinBoard.bulletinBoardImages.length < 2) {
        toast.info('Chọn tối thiểu 2 ảnh')
        return
      }

      const uploadPromises = selectedImages.map((image) => {
        const imageName = v4()
        const storageRef = ref(storage, `images/bulletin-board-images/${imageName}`)

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
          const formattedImages = downloadURLs.map((url) => ({ imageLink: url }))
          const updatedRoom = { ...bulletinBoard, bulletinBoardImages: formattedImages }

          const apiCall = bulletinBoardId
            ? updateBulletinBoard(bulletinBoardId, updatedRoom)
            : postBulletinBoard(updatedRoom)

          apiCall.then((res) => {
            refreshBulletinBoards()
            if (res.code === 400) {
              toast.error(res.message)
            } else {
              toast.success('Đăng tin thành công!')
              handleClose(true)
              setBulletinBoard(defaultBulletinBoard)

              // Giải phóng URL đã tạo
              createdURLs.forEach((url) => URL.revokeObjectURL(url))
              createdURLs.length = 0 // Reset danh sách URL
            }
          })
        })
        .catch((error) => {
          console.error('Error uploading images:', error)
          toast.error('Có lỗi xảy ra khi tải lên hình ảnh.')
        })
    } else {
      console.log('Room without images:', bulletinBoard)
      if (selectedImages.length + bulletinBoard.bulletinBoardImages.length < 2) {
        toast.info('Chọn tối thiểu 2 ảnh')
        return
      }

      const apiCall = bulletinBoardId
        ? updateBulletinBoard(bulletinBoardId, bulletinBoard)
        : postBulletinBoard(bulletinBoard)

      apiCall.then((res) => {
        refreshBulletinBoards()
        if (res.code === 400) {
          toast.error(res.message)
        } else {
          toast.success('Đăng tin thành công!')
          handleClose(true)
        }
      })
    }
  }

  // Sử dụng `handleImageRemove` trong JSX
  // Hàm xử lý xóa ảnh
  const handleImageRemove = (index, isFromApi) => {
    if (isFromApi) {
      // Nếu ảnh đến từ API, gọi API để xóa ảnh
      const imageToRemove = bulletinBoard.bulletinBoardImages[index]
      // Gọi API để xóa ảnh (giả sử có hàm xóa ảnh API là `deleteImageFromApi`)
      deleteImageFromApi(imageToRemove.bulletinBoardImageId)
        .then(() => {
          // Sau khi xóa thành công, cập nhật lại danh sách ảnh
          const updatedImages = bulletinBoard.bulletinBoardImages.filter((image, i) => i !== index)
          setBulletinBoard((prevBoard) => ({
            ...prevBoard,
            bulletinBoardImages: updatedImages
          }))
        })
        .catch((error) => console.error('Error deleting image:', error))
    } else {
      // Nếu ảnh đến từ selectedImages, chỉ cần xóa khỏi selectedImages
      const updatedImages = selectedImages.filter((_, i) => i !== index)
      setSelectedImages(updatedImages)
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ViewInArIcon />
            <Typography id="modal-modal-title" variant="h6" component={'h2'}>
              Thêm tin đăng
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: '#333' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, mt: 1 }}>
            <Switch
              {...label}
              checked={bulletinBoard.status === true}
              onChange={(event) => setBulletinBoard({ ...bulletinBoard, status: event.target.checked })}
            />
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
                  formik.handleChange(event)
                  setBulletinBoard({ ...bulletinBoard, title: event.target.value })
                }}
                value={formik.values.title}
                name="nameRoom"
                required
                variant="filled"
                id="outlined-basic"
                label="Tiêu đề"
                InputLabelProps={{
                  shrink: !!bulletinBoard.title
                }}
                error={Boolean(formik.errors.title)}
                helperText={formik.errors.title}
                sx={{ minWidth: 350 }}
              />
              <FormControl
                required
                variant="filled"
                sx={{ minWidth: 350 }}
                error={Boolean(formik.errors.rentalCategory)}>
                <InputLabel id="demo-simple-select-filled-label">Danh mục thuê</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  name="rentalCategory"
                  value={formik.values.rentalCategory}
                  onChange={(event) => {
                    setBulletinBoard({ ...bulletinBoard, rentalCategory: event.target.value })
                    formik.handleChange(event)
                  }}>
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
                <FormHelperText>{formik.errors.rentalCategory}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextField
                name="owner"
                id="outlined-basic"
                label="Tên người liên hệ"
                variant="filled"
                value={account?.fullname}
                sx={{ minWidth: 350 }}
                slotProps={{
                  input: {
                    readOnly: true
                  }
                }}
              />

              <TextField
                id="outlined-basic"
                label="SĐT"
                variant="filled"
                name="phone"
                value={account?.phone}
                sx={{ minWidth: 350 }}
                slotProps={{
                  input: {
                    readOnly: true
                  }
                }}
              />
            </Grid>
          </Grid>
          <TitleAttribute title="Mô tả" description="Nhập mô tả về nhà cho thuê" />
          <TextareaAutosize
            required
            minRows={4}
            onChange={(event) => {
              setBulletinBoard({ ...bulletinBoard, description: event.target.value })
              formik.handleChange(event)
            }}
            value={formik.values.description}
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
          {formik.errors.description && (
            <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.description}</div>
          )}
          <TitleAttribute title="Thông tin cơ bản & giá" description="Nhập các thông tin về phòng cho thuê" />
          <Grid container spacing={1} sx={{ my: 1 }}>
            <Grid item xs={4}>
              <TextField
                onChange={(event) => {
                  setBulletinBoard({ ...bulletinBoard, rentPrice: event.target.value })
                  formik.handleChange
                }}
                value={formik.values.rentPrice}
                name="rentPrice"
                required
                id="outlined-basic"
                label="Giá thuê"
                variant="filled"
                type="number"
                sx={{ width: '100%' }}
                InputLabelProps={{
                  shrink: !!bulletinBoard.rentPrice
                }}
                error={Boolean(formik.errors.rentPrice)}
                helperText={formik.errors.rentPrice}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                onChange={(event) => {
                  setBulletinBoard({ ...bulletinBoard, promotionalRentalPrice: event.target.value })
                  formik.handleChange
                }}
                name="promotionalRentalPrice"
                id="outlined-basic"
                label="Giá thuê khuyến mãi"
                variant="filled"
                type="number"
                sx={{ width: '100%' }}
                value={formik.values.promotionalRentalPrice}
                InputLabelProps={{
                  shrink: !!bulletinBoard.promotionalRentalPrice
                }}
                error={Boolean(formik.errors.promotionalRentalPrice)}
                helperText={formik.errors.promotionalRentalPrice}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={(event) => {
                  setBulletinBoard({ ...bulletinBoard, deposit: event.target.value })
                  formik.handleChange
                }}
                name="deposit"
                required
                id="outlined-basic"
                label="Tiền cọc"
                variant="filled"
                type="number"
                sx={{ width: '100%' }}
                value={formik.values.deposit}
                InputLabelProps={{
                  shrink: !!bulletinBoard.deposit
                }}
                error={Boolean(formik.errors.deposit)}
                helperText={formik.errors.deposit}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={(event) => {
                  setBulletinBoard({ ...bulletinBoard, area: event.target.value })
                  formik.handleChange
                }}
                name="area"
                required
                id="outlined-basic"
                label="Diện tích"
                variant="filled"
                type="number"
                sx={{ width: '100%' }}
                value={formik.values.area}
                InputLabelProps={{
                  shrink: !!bulletinBoard.area
                }}
                error={Boolean(formik.errors.area)}
                helperText={formik.errors.area}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={(event) => {
                  setBulletinBoard({ ...bulletinBoard, electricityPrice: event.target.value })
                  formik.handleChange
                }}
                name="priceElectric"
                required
                id="outlined-basic"
                label="Giá điện"
                variant="filled"
                type="number"
                sx={{ width: '100%' }}
                value={formik.values.electricityPrice}
                InputLabelProps={{
                  shrink: !!bulletinBoard.electricityPrice
                }}
                error={Boolean(formik.errors.electricityPrice)}
                helperText={formik.errors.electricityPrice}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={(event) => {
                  setBulletinBoard({ ...bulletinBoard, waterPrice: event.target.value })
                  formik.handleChange
                }}
                name="priceWater"
                required
                id="outlined-basic"
                label="Giá nước"
                variant="filled"
                type="number"
                sx={{ width: '100%' }}
                value={formik.values.waterPrice}
                InputLabelProps={{
                  shrink: !!bulletinBoard.waterPrice
                }}
                error={Boolean(formik.errors.waterPrice)}
                helperText={formik.errors.waterPrice}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl required variant="filled" sx={{ minWidth: 350 }} error={Boolean(formik.errors.maxPerson)}>
                <InputLabel id="demo-simple-select-filled-label">Tối đa người ở / phòng</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  name="maxPerson"
                  value={formik.values.maxPerson}
                  onChange={(event) => {
                    setBulletinBoard({ ...bulletinBoard, maxPerson: event.target.value })
                    formik.handleChange
                  }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'1 người ở'}>1 người ở</MenuItem>
                  <MenuItem value={'2 người ở'}>2 người ở</MenuItem>
                  <MenuItem value={'3 người ở'}>3 người ở</MenuItem>
                  <MenuItem value={'4 người ở'}>4 người ở</MenuItem>
                  <MenuItem value={'5-6 người ở'}>5-6 người ở</MenuItem>
                  <MenuItem value={'7-10 người ở'}>7-10 người ở</MenuItem>
                  <MenuItem value={'Không giới hạn'}>Không giới hạn</MenuItem>
                </Select>
                <FormHelperText>{formik.errors.maxPerson}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(event) => {
                  setBulletinBoard({ ...bulletinBoard, moveInDate: event.target.value })
                  formik.handleChange
                }}
                name="moveInDate"
                required
                variant="filled"
                label="Ngày có thể vào ở"
                fullWidth
                type="date"
                value={formik.values.moveInDate ? formik.values.moveInDate.split('T')[0] : ''}
                InputLabelProps={{
                  shrink: true
                }}
                error={Boolean(formik.errors.moveInDate)}
                helperText={formik.errors.moveInDate}
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
                  checked={bulletinBoard.bulletinBoards_RentalAm.some((s) => s.rentalAmenities.name === service)}
                  onChange={() => {
                    const serviceObject = { rentalAmenities: { name: service } }

                    const newServices = bulletinBoard.bulletinBoards_RentalAm.some(
                      (s) => s.rentalAmenities.name === service
                    )
                      ? bulletinBoard.bulletinBoards_RentalAm.filter((s) => s.rentalAmenities.name !== service)
                      : [...bulletinBoard.bulletinBoards_RentalAm, serviceObject]
                    setBulletinBoard({ ...bulletinBoard, bulletinBoards_RentalAm: newServices })
                  }}
                  control={
                    <Checkbox
                      checked={bulletinBoard.bulletinBoards_RentalAm.some((s) => s.rentalAmenities.name === service)}
                    />
                  }
                  label={service}
                />
              </Grid>
            ))}
          </Grid>
          <TitleAttribute title=" Quy định giờ giấc" description="Tùy chọn thời gian hoạt động của nhà cho thuê" />
          <Box sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormControl
              variant="filled"
              name="openingHours"
              sx={{ minWidth: 350 }}
              error={Boolean(formik.errors.openingHours)}>
              <InputLabel id="demo-simple-select-filled-label">Giờ mở cửa</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="openingHours"
                value={formik.values.openingHours}
                onChange={(event) => {
                  setBulletinBoard({ ...bulletinBoard, openingHours: event.target.value })
                  formik.handleChange
                }}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'4 SA'}>4 SA</MenuItem>
                <MenuItem value={'5 SA'}>5 SA</MenuItem>
                <MenuItem value={'6 SA'}>6 SA</MenuItem>
              </Select>
              <FormHelperText>{formik.errors.openingHours}</FormHelperText>
            </FormControl>
            <FormControl variant="filled" sx={{ minWidth: 350 }} error={Boolean(formik.errors.closeHours)}>
              <InputLabel id="demo-simple-select-filled-label">Giờ đóng cửa</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="closeHour"
                value={bulletinBoard.closeHours}
                onChange={(event) => {
                  setBulletinBoard({ ...bulletinBoard, closeHours: event.target.value })
                  formik.handleChange
                }}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'22 CH'}>22 CH</MenuItem>
                <MenuItem value={'23 CH'}>23 CH</MenuItem>
                <MenuItem value={'00 SA'}>00 SA</MenuItem>
              </Select>
              <FormHelperText>{formik.errors.closeHours}</FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <TitleAttribute title="Nội quy" description="Tùy chọn nội quy của nhà cho thuê" />
          </Box>
          <Grid container>
            {[
              {
                title: 'Nhà trọ có giờ giấc không về quá khuya',
                desciption: 'Không về sau 12h tối'
              },
              {
                title: 'Đóng tiền trọ đúng ngày',
                desciption: 'Đóng tiền trọ đúng ngày'
              },
              {
                title: 'Không hút thuốc, say xỉn',
                desciption: 'Không tụ tập nhậu nhặt hát hò làm ảnh hưởng phòng xung quanh'
              },
              {
                title: 'Không chứa chấp tội phạm',
                desciption: 'Không che dấu và chứa chấp tội phạm trong phòng'
              },
              {
                title: 'Không hát karaoke, nhậu nhặt ảnh hưởng tới phòng kế bên',
                desciption: 'Không gây ồn ào, mất trật tự, nhậu nhặt, say xỉn...'
              },
              {
                title: 'Cư xử văn hóa',
                desciption:
                  'Không gây gỗ chữi thề, gây hiềm khích với mọi người, tạo văn hóa phòng trọ yên bình hòa đồng.'
              }
            ].map((rule) => (
              <Grid item xs={6} key={rule.title}>
                <FormControlLabel
                  checked={bulletinBoard.bulletinBoardRules.some((s) => s.rule.ruleName === rule.title)}
                  onChange={() => {
                    const serviceObject = { rule: { ruleName: rule.title } }
                    // Loại bỏ các mục trùng lặp dựa trên ruleName
                    const newServices = bulletinBoard.bulletinBoardRules.some((s) => s.rule.ruleName === rule.title)
                      ? bulletinBoard.bulletinBoardRules.filter((s) => s.rule.ruleName !== rule.title)
                      : [...bulletinBoard.bulletinBoardRules, serviceObject]

                    // Loại bỏ các mục trùng lặp nếu có
                    const uniqueServices = newServices.filter(
                      (value, index, self) => index === self.findIndex((t) => t.rule.ruleName === value.rule.ruleName)
                    )

                    setBulletinBoard({ ...bulletinBoard, bulletinBoardRules: uniqueServices })
                  }}
                  control={
                    <Checkbox checked={bulletinBoard.bulletinBoardRules.some((s) => s.rule.ruleName === rule.title)} />
                  }
                  label={
                    <Box>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>{rule.title}</Typography>
                      <Typography sx={{ fontSize: '12px' }}>{rule.desciption}</Typography>
                    </Box>
                  }
                />
              </Grid>
            ))}
          </Grid>
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
              }}
              value={bulletinBoard.address}
              InputLabelProps={{
                shrink: !!bulletinBoard.address
              }}
              name="address"
              required
              id="outlined-basic"
              label="Địa chỉ chi tiết"
              variant="filled"
              sx={{ width: '100%', mt: -2 }}
            />
          </Box>
          <TitleAttribute title="Tọa độ" description="Chọn vị trí trên bản đồ để lấy tọa độ của bạn" />
          <Box sx={{ my: 2 }}>
            <Box sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextField
                value={position?.lng ?? bulletinBoard.longitude}
                id="outlined-basic"
                label="Kinh độ"
                variant="filled"
                type="text"
                sx={{ width: '49%' }}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                value={position?.lat ?? bulletinBoard.latitude}
                id="outlined-basic"
                label="Vĩ độ"
                variant="filled"
                type="text"
                sx={{ width: '49%' }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Box>
            <MapComponent setPosition={setPosition} position={position} />
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
                  }}
                />
              </IconButton>
              <Box
                sx={{
                  display: selectedImages.length > 0 || bulletinBoard.bulletinBoardImages == [] ? 'none' : 'block',
                  textAlign: 'center'
                }}>
                <Typography>Chọn tối đa 5 ảnh</Typography>
                <Typography variant="body2">
                  Lưu ý ảnh sẽ được cắt theo tỉ lệ 16:9 để phù hợp với trang web, vui lòng chọn ảnh có tỉ lệ gần giống
                  để không làm mất thông tin quan trọng !
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
                      onLoad={() => URL.revokeObjectURL(image)} // Giải phóng URL sau khi tải xong
                      onError={() => console.log('Lỗi tải hình ảnh')}
                      sx={{ borderRadius: 1, boxShadow: 2 }}
                      onClick={() => handleImageRemove(i)} // Hàm này để xóa hình ảnh nếu cần
                    />
                  ))}

                {bulletinBoard.bulletinBoardImages &&
                  Array.from(bulletinBoard.bulletinBoardImages).map((image, i) => (
                    <Box
                      key={image.bulletinBoardImageId || i} // Sử dụng bulletinBoardImageId làm key
                      component="img"
                      src={image.imageLink} // Sử dụng imageLink từ API
                      alt={`Hình ảnh ${i + 1}`}
                      width={200}
                      height="auto"
                      onError={() => console.log('Lỗi tải hình ảnh')} // Log lỗi khi không tải được ảnh
                      sx={{ borderRadius: 1, boxShadow: 2 }}
                      onClick={() => handleImageRemove(i, true)} // Hàm này để xóa hình ảnh nếu cần
                    />
                  ))}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            display: 'flex',
            mt: 1,
            justifyContent: 'end',
            bgcolor: 'white',
            gap: 1,
            p: 2,
            zIndex: 9999
          }}>
          <Button variant="contained" sx={{ bgcolor: '#2f3542' }} onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="contained"
            disabled={!formik.isValid || !formik.dirty}
            sx={{ bgcolor: '#2ed573' }}
            onClick={handlePost}>
            Thêm tin đăng
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default PostModal
