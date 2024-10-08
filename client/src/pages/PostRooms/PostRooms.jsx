import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Container, Paper, Tab, Typography } from '@mui/material'
import { useState } from 'react'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import PersonIcon from '@mui/icons-material/Person'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import Post from './Post'
import Customer from './Customer'

const PostRooms = () => {
  const [tabIndex, setTabIndex] = useState('1')
  const handleChange = (event, newValue) => {
    setTabIndex(newValue)
  }
  return (
    <Box>
      <NavAdmin />
      <Container sx={{ my: 2 }}>
        <Box sx={{ my: 2 }}>
          <Typography variant="h5">Tin đăng & khách tiềm năng</Typography>
          <Typography variant="subtitle">Tất cả tin đăng cho thuê</Typography>
        </Box>
        <Paper variant="outlined" sx={{ height: '100%' }}>
          <TabContext value={tabIndex}>
            <Box>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab iconPosition="start" icon={<FormatListBulletedIcon />} label="Tin đăng cho thuê" value="1" />
                <Tab iconPosition="start" icon={<PersonIcon />} label="Khách hàng tiềm năng" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Post />
            </TabPanel>
            <TabPanel value="2">
              <Customer />
            </TabPanel>
          </TabContext>
        </Paper>
      </Container>
    </Box>
  )
}

export default PostRooms
