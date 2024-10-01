import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Container, Tab } from '@mui/material'
import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShieldIcon from '@mui/icons-material/Shield'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ProfileTab from './ProfileTab'
// import BillingTab from './BillingTab'
// import SecurityTab from './SecurityTab'
// import NotificationTab from './NotificationTab'

const Profile = () => {
  const [tabIndex, setTabIndex] = useState('1')

  const handleChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  return (
    <Container>
      <Box>
        <TabContext value={tabIndex}>
          <Box>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab icon={<PersonIcon />} iconPosition="start" label="Hồ sơ" value="1" />
              <Tab icon={<AttachMoneyIcon />} iconPosition="start" label="Chi tiêu" value="2" />
              <Tab icon={<ShieldIcon />} iconPosition="start" label="Bảo mật" value="3" />
              <Tab icon={<NotificationsIcon />} iconPosition="start" label="Thông báo" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ProfileTab />
          </TabPanel>
          <TabPanel value="2">Coming Soon !{/* <BillingTab /> */}</TabPanel>
          <TabPanel value="3">Coming Soon !{/* <SecurityTab /> */}</TabPanel>
          <TabPanel value="4">Coming Soon !{/* <NotificationTab /> */}</TabPanel>
        </TabContext>
      </Box>
    </Container>
  )
}

export default Profile