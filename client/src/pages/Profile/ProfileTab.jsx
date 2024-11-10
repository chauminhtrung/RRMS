/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useEffect } from 'react'

import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '~/configs/firebaseConfig'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateProfile } from '~/apis/profileAPI'

const validationSchema = Yup.object({
  email: Yup.string().email('Email không hợp lệ').required('Bắt buộc nhập email')
})

const ProfileTab = ({ profile, setProfile, selectedImage }) => {
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

  const formik = useFormik({
    initialValues: {
      email: profile.email
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  useEffect(() => {
    formik.setValues({
      email: profile.email
    })
  }, [profile])

  return (
    <Box>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Thông tin chi tiết
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Tên tài khoản"
              fullWidth
              disabled
              value={profile.username}
              InputLabelProps={{
                shrink: !!profile.username
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
                shrink: !!profile.fullname
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
                shrink: !!profile.email
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
                shrink: !!profile.phone
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Ngày tháng năm sinh"
              fullWidth
              type="date"
              InputLabelProps={{
                shrink: true
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
                shrink: !!profile.cccd
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ bgcolor: '#ced6e0' }} />
          </Grid>
        </Grid>
      </Grid>
      <Button
        sx={{ width: '9%', bottom: 5, position: 'absolute' }}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleUpload}>
        Lưu thay đổi
      </Button>
    </Box>
  )
}

export default ProfileTab
