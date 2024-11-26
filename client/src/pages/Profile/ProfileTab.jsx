/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
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
import { subYears } from 'date-fns'

const validationSchema = Yup.object({
  email: Yup.string()
    .matches(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/, 'Email không hợp lệ')
    .required('Bắt buộc nhập email'),
  gender: Yup.string().required('Bắt buộc nhập giới tính'),
  birthday: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Ngày sinh là bắt buộc.')
    .max(subYears(new Date(), 16), 'Bạn phải trên 16 tuổi.'),
  cccd: Yup.string().matches(/^\d{12}$/, 'CCCD phải bao gồm 12 chữ số.')
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
      email: profile.email,
      birthday: profile.birthday ? profile.birthday.split('T')[0] : '',
      gender: profile.gender,
      cccd: profile.cccd
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  useEffect(() => {
    console.log(formik.errors.cccd)

    if (
      profile.email !== formik.values.email ||
      profile.birthday !== formik.values.birthday ||
      profile.gender !== formik.values.gender ||
      profile.cccd !== formik.values.cccd
    ) {
      formik.setValues({
        email: profile.email,
        birthday: profile.birthday ? profile.birthday.split('T')[0] : '',
        gender: profile.gender,
        cccd: profile.cccd
      })
    }
  }, [profile]) // Thêm formik.values để tránh cảnh báo phụ thuộc

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
            <FormControl fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                id="gender-select"
                value={formik.values.gender}
                onChange={(e) => {
                  formik.handleChange(e)
                  setProfile({ ...profile, gender: e.target.value })
                }}
                onBlur={formik.handleBlur}
                label="Gender">
                <MenuItem value={'MALE'}>Male</MenuItem>
                <MenuItem value={'FEMALE'}>Female</MenuItem>
                <MenuItem value={'OTHER'}>Other</MenuItem>
              </Select>
              <FormHelperText>{formik.touched.gender && formik.errors.gender}</FormHelperText>
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
              read
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              InputLabelProps={{
                shrink: !!profile.phone
              }}
              disabled
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
              value={formik.values.birthday || ''}
              onChange={(e) => {
                formik.handleChange(e)
                setProfile({ ...profile, birthday: e.target.value })
              }}
              error={Boolean(formik.errors.birthday)}
              helperText={formik.errors.birthday}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="CCCD"
              fullWidth
              value={formik.values.cccd}
              onChange={(e) => {
                formik.handleChange(e)
                setProfile({ ...profile, cccd: e.target.value })
              }}
              InputLabelProps={{
                shrink: !!profile.cccd
              }}
              error={Boolean(formik.errors.cccd)}
              helperText={formik.errors.cccd}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ bgcolor: '#ced6e0' }} />
          </Grid>
        </Grid>
      </Grid>
      <Button
        sx={{ width: '9%', bottom: 60, position: 'absolute' }}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleUpload}
        disabled={!formik.isValid || !formik.dirty}>
        Lưu thay đổi
      </Button>
    </Box>
  )
}

export default ProfileTab
