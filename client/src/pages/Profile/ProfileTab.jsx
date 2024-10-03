/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
// import Profile from './Profile'
import { useEffect, useState } from 'react'
import { getProfile, updateProfile } from '~/apis/apiClient'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '~/configs/firebaseConfig'
import { toast } from 'react-toastify'
import imageCompression from 'browser-image-compression'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const validationSchema = Yup.object({
  email: Yup.string().email('Email không hợp lệ').required('Bắt buộc nhập email'),
})

const ProfileTab = () => {
  const [profile, setProfile] = useState({})
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    getProfile('admin').then((res) => {
      setProfile(res.data.result)
    })
  }, [])
  const handleUpload = () => {
    toast.info('Đang thay đổi thông tin!')

    if (selectedImage) {
      const imageName = v4()
      const storageRef = ref(storage, `images/account-avatar/${imageName}`)
      const uploadTask = uploadBytesResumable(storageRef, selectedImage)

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.log(error)
          toast.error('Có lỗi xảy ra khi tải lên hình ảnh.')
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setProfile((prevProfile) => {
              const updatedProfile = { ...prevProfile, avatar: url }
              updateProfile(updatedProfile)
              toast.success('Thay đổi thông tin thành công!')
              return updatedProfile
            })
          })
        }
      )
    } else {
      updateProfile(profile)
      toast.success('Thay đổi thông tin thành công!')
    }
  }

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage)
      }
    }
  }, [selectedImage])

  const handleImageChange = async (event) => {
    const image = event.target.files[0]
    if (image) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        }

        const compressedImage = await imageCompression(image, options)
        setSelectedImage(compressedImage)
      } catch (error) {
        console.log('Lỗi khi nén ảnh:', error)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      email: profile.email,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  useEffect(() => {
    formik.setValues({
      email: profile.email,
    })
  }, [profile])

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={4}>
        {/* Profile Picture Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '40px', textAlign: 'center' }}>
            <Avatar
              alt="Image"
              src={selectedImage ? URL.createObjectURL(selectedImage) : profile.avatar}
              sx={{ width: 200, height: 200, margin: 'auto' }}
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              sx={{ marginTop: '20px' }}
              startIcon={<CloudUploadIcon />}>
              Tải ảnh lên
              <VisuallyHiddenInput type="file" accept="image/*" onChange={(event) => handleImageChange(event)} />
            </Button>
          </Paper>
        </Grid>

        {/* Account Details Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Thông tin chi tiết
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Tên tài khoản"
                  fullWidth
                  required
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  InputLabelProps={{
                    shrink: !!profile.username,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Họ và tên"
                  fullWidth
                  value={profile.fullname}
                  onChange={(e) => setProfile({ ...profile, fullname: e.target.value })}
                  InputLabelProps={{
                    shrink: !!profile.fullname,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={profile.gender || ''}
                    label="Gender"
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
                    <MenuItem value={'MALE'}>Male</MenuItem>
                    <MenuItem value={'FEMALE'}>Female</MenuItem>
                    <MenuItem value={'OTHER'}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  fullWidth
                  name="email"
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.handleChange(e)
                    setProfile({ ...profile, email: e.target.value })
                  }}
                  onBlur={formik.handleBlur}
                  InputLabelProps={{
                    shrink: !!profile.email,
                  }}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Số điện thoại"
                  fullWidth
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  InputLabelProps={{
                    shrink: !!profile.phone,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Ngày tháng năm sinh"
                  fullWidth
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={profile.birthday}
                  onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="CCCD"
                  fullWidth
                  value={profile.cccd}
                  onChange={(e) => setProfile({ ...profile, cccd: e.target.value })}
                  InputLabelProps={{
                    shrink: !!profile.cccd,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={handleUpload}>
                  Lưu thay đổi
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProfileTab
