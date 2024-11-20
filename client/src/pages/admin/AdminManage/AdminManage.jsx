import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminManage.css';
import AddUsers from './Dashboard/AddUsers';
import AddPosts from './Dashboard/AddPosts';
import AddReports from './Dashboard/AddReports';
import ListUsers from './Dashboard/ListUsers';
import ListReports from './Dashboard/ListReports';
import ListPosts from './Dashboard/ListPosts';
import DashboardHome from './Dashboard/DashboardHome';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications,
  ExpandLess,
  ExpandMore,
  Home,
  People,
  Report,
  PostAdd,
  ListAlt
} from '@mui/icons-material';


const AdminManage = ({ setIsAdmin }) => {
  const [openLandlords, setOpenLandlords] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openPosts, setOpenPosts] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const handleToggle = (menu) => {
    switch (menu) {
      case 'landlords':
        setOpenLandlords(!openLandlords);
        break;
      case 'users':
        setOpenUsers(!openUsers);
        break;
      case 'posts':
        setOpenPosts(!openPosts);
        break;
      case 'reports':
        setOpenReports(!openReports);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setIsAdmin(true);
  }, [setIsAdmin]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="wrapper">
      <aside id="sidebar" className={isCollapsed ? 'collapsed' : ''}>
        <Box sx={{ padding: 2 }}>
          <Box display="flex" justifyContent="center" marginBottom={2}>
            <img src="../logo.png" alt="Logo" className="imglogo" style={{ width: '80%' }} />
          </Box>

          <Typography variant="subtitle2" color="textSecondary" sx={{ marginBottom: 1 }}>
            Navigation
          </Typography>

          <List component="nav">
            <ListItemButton component={Link} to="/adminManage">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Trang Chủ" />
            </ListItemButton>
            {/* Users Management */}
            <ListItemButton onClick={() => handleToggle('users')}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Quản Lý Người Dùng" />
              {openUsers ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openUsers} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton component={Link} to="/adminManage/manage-users/add" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PostAdd />
                  </ListItemIcon>
                  <ListItemText primary="Thêm Người Dùng" />
                </ListItemButton>
                <ListItemButton component={Link} to="/adminManage/manage-users/list" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ListAlt />
                  </ListItemIcon>
                  <ListItemText primary="Danh Sách Người Dùng" />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Posts Management */}
            <ListItemButton onClick={() => handleToggle('posts')}>
              <ListItemIcon>
                <PostAdd />
              </ListItemIcon>
              <ListItemText primary="Quản Lý Đăng Tin" />
              {openPosts ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openPosts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton component={Link} to="/adminManage/manage-posts/add" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PostAdd />
                  </ListItemIcon>
                  <ListItemText primary="Thêm Đăng Tin" />
                </ListItemButton>
                <ListItemButton component={Link} to="/adminManage/manage-posts/list" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ListAlt />
                  </ListItemIcon>
                  <ListItemText primary="Danh Sách Đăng Tin" />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Reports Management */}
            <ListItemButton onClick={() => handleToggle('reports')}>
              <ListItemIcon>
                <Report />
              </ListItemIcon>
              <ListItemText primary="Quản Lý Báo Cáo" />
              {openReports ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openReports} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton component={Link} to="/adminManage/manage-reports/add" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PostAdd />
                  </ListItemIcon>
                  <ListItemText primary="Thêm Báo Cáo" />
                </ListItemButton>
                <ListItemButton component={Link} to="/adminManage/manage-reports/list" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ListAlt />
                  </ListItemIcon>
                  <ListItemText primary="Danh Sách Báo Cáo" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </aside>
      <div className="main">
        <nav className="navbar navbar-expand px-3 border-bottom d-flex justify-content-between align-items-center">
          {/* Sidebar Toggle Button */}
          <button className="btn" type="button" onClick={toggleSidebar}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', maxWidth: 400, mx: 2, px: 2, py: 0.5, bgcolor: 'background.paper', borderRadius: 1 }}>
            <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <InputBase placeholder="Tìm kiếm..." fullWidth />
          </Box>

          {/* Right Actions */}
          <div className="d-flex align-items-center ms-auto">
            {/* Notification Icon */}
            <Badge style={{marginRight:'20px'}} badgeContent={4} color="primary">
              <Notifications color="action" />
            </Badge>

            {/* Profile Avatar with Dropdown Menu */}
            <Box className="mx-2 d-flex align-items-center" onClick={handleProfileMenuOpen} aria-label="open profile" sx={{ cursor: 'pointer' }}>
              <Avatar
                src="/free/assets/avatar-1-B0hIH1z9.png"
                alt="profile user"
                sx={{
                  width: 36,
                  height: 36,
                  border: '2px solid #3f51b5',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Typography variant="subtitle1" sx={{ ml: 1 }}>John Doe</Typography>
              <ExpandMore />
            </Box>
          </div>

          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
            <i className="bi bi-person" style={{ marginRight: '8px' }}></i> Profile
            </MenuItem>
            
            <Divider />
            <MenuItem onClick={handleMenuClose}>  
              <i className="bi bi-gear" style={{ marginRight: '8px' }}></i> Cài đặt  
            </MenuItem>  
            <MenuItem onClick={handleMenuClose}>  
              <i className="bi bi-clock-history" style={{ marginRight: '8px' }}></i> Lịch sử  
            </MenuItem>  
            <MenuItem onClick={handleMenuClose}>  
              <i className="bi bi-question-circle" style={{ marginRight: '8px' }}></i> Trợ giúp  
            </MenuItem>  
            <MenuItem onClick={handleMenuClose}>  
              <i className="bi bi-lock" style={{ marginRight: '8px' }}></i> Đổi Mật Khẩu  
            </MenuItem>  
            <MenuItem onClick={handleMenuClose}>  
              <i className="bi bi-box-arrow-right" style={{ marginRight: '8px' }}></i> Đăng xuất  
            </MenuItem>
          </Menu>
        </nav>

        <main className="content px-2 py-2" style={{backgroundColor:'rgb(228, 238, 245)'}}>
          <div className="container-fluid">
            <Routes>
              <Route index element={<DashboardHome />} />
              <Route path="manage-users/add" element={<AddUsers/>} />
              <Route path="manage-users/list" element={<ListUsers />} />
              <Route path="manage-posts/add" element={<AddPosts />} />
              <Route path="manage-posts/list" element={<ListPosts />} />
              <Route path="manage-reports/add" element={<AddReports />} />
              <Route path="manage-reports/list" element={<ListReports />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminManage
