import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Avatar, Box, Container, Divider, Grid, IconButton, Paper, styled, Tab, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ProfileTab from './ProfileTab'
import imageCompression from 'browser-image-compression'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { getProfile } from '~/apis/apiClient'
import BillingTab from './BillingTab'
import SecurityTab from './SecurityTab'
import NotificationTab from './NotificationTab'

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
const Profile = () => {
  const [tabIndex, setTabIndex] = useState('1')
  const [selectedImage, setSelectedImage] = useState(null)

  const [profile, setProfile] = useState({})

  const handleChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  useEffect(() => {
    getProfile('admin').then((res) => {
      setProfile(res.data.result)
    })
  }, [])

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

  return (
    <Container sx={{ my: 2 }}>
      <Box>
        <Grid container spacing={4}>
          {/* Profile Picture Section */}
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ textAlign: 'center', position: 'relative' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mt: 3 }}>
                <Avatar
                  alt="User Avatar"
                  src={
                    selectedImage ? URL.createObjectURL(selectedImage) : 'https://mui.com/static/images/avatar/2.jpg'
                  }
                  sx={{ width: 100, height: 100, margin: 'auto' }}
                />
                <IconButton
                  component="label"
                  sx={{
                    position: 'absolute',
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
                  <VisuallyHiddenInput type="file" accept="image/*" onChange={(event) => handleImageChange(event)} />
                </IconButton>
              </Box>
              <Typography variant="h6" sx={{ marginTop: '10px' }}>
                {profile.fullname ? profile.fullname : 'Trí Dũng'}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {profile.username ? profile.username : 'tridung778'}
              </Typography>
              <Divider sx={{ bgcolor: 'black', mt: 1 }} />
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                  <Typography variant="body1">Opportunities applied</Typography>
                  <Typography variant="body1" color="orange">
                    56
                  </Typography>
                </Box>
                <Divider sx={{ bgcolor: 'black' }} />
                <Box item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                  <Typography variant="body1">Opportunities won</Typography>
                  <Typography variant="body1" color="green">
                    546
                  </Typography>
                </Box>
                <Divider sx={{ bgcolor: 'black' }} />
                <Box item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                  <Typography variant="body1">Current opportunities</Typography>
                  <Typography variant="body1">5676</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper variant="outlined" sx={{ height: '100%' }}>
              <TabContext value={tabIndex}>
                <Box>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab iconPosition="start" label="Hồ sơ" value="1" />
                    <Tab iconPosition="start" label="Chi tiêu" value="2" />
                    <Tab iconPosition="start" label="Bảo mật" value="3" />
                    <Tab iconPosition="start" label="Thông báo" value="4" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <ProfileTab profile={profile} setProfile={setProfile} selectedImage={selectedImage} />
                </TabPanel>
                <TabPanel value="2">
                  <BillingTab />
                </TabPanel>
                <TabPanel value="3">
                  <SecurityTab />
                </TabPanel>
                <TabPanel value="4">
                  <NotificationTab />
                </TabPanel>
              </TabContext>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Profile
