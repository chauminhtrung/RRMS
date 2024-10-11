import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InfoIcon from '@mui/icons-material/Info'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import LockResetIcon from '@mui/icons-material/LockReset'
const drawerWidth = 240

const AdminManage = (props) => {
  const { setIsAdmin } = props

  useEffect(() => {
    setIsAdmin(true)
  }, [setIsAdmin])

  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const [currentContent, setCurrentContent] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  const handleMenuClick = (index, content) => {
    setSelectedIndex(index)
    setCurrentContent(content)
    setMobileOpen(false)
  }

  const drawer = (
    <div>
      <Toolbar>
        <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} src="./logo.png" alt="" />
      </Toolbar>
      <Divider />
      <List>
        {['TỔNG QUAN VỀ HỆ THỐNG', 'QUẢN LÝ CHỦ TRỌ', 'QUẢN LÝ NGƯỜI DÙNG', 'QUẢN LÝ ĐĂNG TIN', 'QUẢN LÝ BÁO CÁO'].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => handleMenuClick(index, text)}
                sx={{
                  backgroundColor: selectedIndex === index ? '#5eb7ff' : index < 0 ? '#f0f0f0' : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedIndex === index ? '#5eb7ff' : '#5eb7ff',
                  },
                }}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </div>
  )

  const container = props.window !== undefined ? () => props.window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <Typography sx={{ color: 'black' }} variant="h6" noWrap component="div">
              Hệ thống quản lý RRMS
            </Typography>
          </Box>
          <NotificationsActiveIcon className="me-2" sx={{ color: 'red' }} />
          <LeaderboardIcon className="me-2" sx={{ color: 'yellow' }} />
          <HomeIcon className="me-2" sx={{ color: 'gray' }} />
          <div style={{ cursor: 'pointer' }}>
            <LogoutIcon sx={{ color: 'blue' }} />
            <span className="me-2 text-dark">Đăng Xuất</span>
          </div>
          <div style={{ cursor: 'pointer' }}>
            <LockResetIcon sx={{ color: 'blue' }} />
            <span className="me-2 text-dark">Đổi Mật Khẩu</span>
          </div>
          <div style={{ cursor: 'pointer' }}>
            <InfoIcon sx={{ color: 'blue' }} />
            <span className="me-2 text-dark">Trợ giúp</span>
          </div>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {currentContent || 'Chọn một mục từ menu để xem nội dung!'}
        </Typography>
      </Box>
    </Box>
  )
}

AdminManage.propTypes = {
  setIsAdmin: PropTypes.func.isRequired,
  window: PropTypes.func,
}

export default AdminManage
