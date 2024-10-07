import { Box, Switch, Typography } from '@mui/material'

const NotificationTab = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography>Nhận thông báo đến email</Typography>
      <Switch />
    </Box>
  )
}

export default NotificationTab
