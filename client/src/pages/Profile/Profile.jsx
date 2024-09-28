import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Container, Tab } from '@mui/material'
import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShieldIcon from '@mui/icons-material/Shield'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ProfileTab from './ProfileTab'
import BillingTab from './BillingTab'
import SecurityTab from './SecurityTab'
import NotificationTab from './NotificationTab'

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
              <Tab icon={<PersonIcon />} iconPosition="start" label="Profile" value="1" />
              <Tab icon={<AttachMoneyIcon />} iconPosition="start" label="Billing" value="2" />
              <Tab icon={<ShieldIcon />} iconPosition="start" label="Security" value="3" />
              <Tab icon={<NotificationsIcon />} iconPosition="start" label="Notifications" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ProfileTab />
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
      </Box>
    </Container>
  )
}

export default Profile
