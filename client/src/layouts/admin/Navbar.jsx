import React, { useState } from 'react'
import { Avatar, Grid, Button, AppBar, Toolbar, Tabs, Tab } from '@mui/material'
const Navbar = () => {
  const [select, setSelect] = useState(0)
  const handleTabChange = (event, newValue) => {
    setSelect(newValue)
  }
  return (
    <AppBar position="static" style={{ background: 'white' }}>
      <Toolbar>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item xs={12} sm={2} md={2}>
            <Avatar
              alt="Remy Sharp"
              sx={{
                height: '100px',
                width: '100px',
                img: {
                  objectFit: 'cover',
                  objectPosition: 'center',
                },
              }}
              src="/src/assets/imglogo.jpg"
            />
          </Grid>
          <Grid item xs={12} sm={10} md={10}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={2} md={2}>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'none',
                  }}>
                  <i className="bi bi-house-check fs-3"></i>
                  <span>Quản lí nhà</span>
                </Button>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'none',
                  }}>
                  <i className="bi bi-pie-chart fs-3"></i>
                  <span>Tổng báo cáo</span>
                </Button>
              </Grid>
              <Grid item xs={12} sm={1} md={1}>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'none',
                  }}>
                  <i className="bi bi-plus-lg fs-3"></i>
                  <span>Đăng tin</span>
                </Button>
              </Grid>
              <Grid item xs={12} sm={1} md={1}>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'none',
                  }}>
                  <i className="bi bi-people fs-3"></i>
                  <span>Môi giới</span>
                </Button>
              </Grid>
              <Grid item xs={12} sm={1} md={1}>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'none',
                  }}>
                  <i className="bi bi-box fs-3"></i>
                  <span>Công ty/nhóm</span>
                </Button>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'none',
                  }}>
                  <i className="bi bi-gear fs-3"></i>
                  <span>Cài đặt chung</span>
                </Button>
              </Grid>
              <Grid item xs={12} sm={1} md={1}>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'none',
                  }}>
                  <i className="bi bi-bell fs-3"></i>
                  <span>Thông báo</span>
                </Button>
              </Grid>
              <Grid item xs={12} sm={1} md={1}>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'none',
                  }}>
                  <i className="bi bi-person fs-3"></i>
                  <span>Tài khoản</span>
                </Button>
              </Grid>
              <Grid item xs={12} sm={1} md={1}>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'none',
                  }}>
                  <i className="bi bi-box-arrow-right fs-3"></i>
                  <span>Đăng nhập</span>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2} sm={2} xs={12} className="mt-2">
            {' '}
            <Button
              variant="contained"
              sx={{
                bgcolor: (theme) => (theme.palette.mode === 'light' ? 'white' : '#4bcffa'),
                width: '100%',
                height: '100px',
                color: 'black',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'none',
              }}>
              <i
                style={{
                  background: '#5eb7ff',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                }}
                className="bi bi-house-check fs-3"
              />
              <span style={{ textAlign: 'left' }}>
                {' '}
                Đang quản lý <br />
                <b style={{ color: '#5eb7ff' }}> Nhà trọ RRMS</b>
              </span>
            </Button>
          </Grid>
          <Grid item md={10} sm={10} xs={12} className="mt-2">
            <Tabs
              className="fs-1 text-primary"
              value={select}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile>
              <Tab
                className="me-1"
                sx={{
                  background: (theme) => (theme.palette.mode === 'light' ? '#fff' : '#abb2b9'),
                  border: '1px solid #34495e',
                  borderRadius: '15px',
                  width: '150px',
                  height: '100px',
                  color: 'black',
                  textTransform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                label={
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <i className="bi bi-journals fs-3" style={{ marginBottom: '8px' }}></i>
                    Quản lí phòng
                  </span>
                }
              />

              <Tab
                className="mx-1"
                sx={{
                  background: (theme) => (theme.palette.mode === 'light' ? '#fff' : '#abb2b9'),
                  border: '1px solid #34495e',
                  borderRadius: '15px',
                  width: '150px',
                  height: '100px',
                  color: 'black',
                  textTransform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                label={
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <i className="bi bi-journals fs-3" style={{ marginBottom: '8px' }}></i>
                    Quản lí hóa đơn
                  </span>
                }
              />
              <Tab
                className="mx-1"
                sx={{
                  background: (theme) => (theme.palette.mode === 'light' ? '#fff' : '#abb2b9'),
                  border: '1px solid #34495e',
                  borderRadius: '15px',
                  width: '150px',
                  height: '100px',
                  color: 'black',
                  textTransform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                label={
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <i className="bi bi-journal-medical fs-3" style={{ marginBottom: '8px' }}></i>
                    Quản lí dịch vụ
                  </span>
                }
              />
              <Tab
                className="mx-1"
                sx={{
                  background: (theme) => (theme.palette.mode === 'light' ? '#fff' : '#abb2b9'),
                  border: '1px solid #34495e',
                  borderRadius: '15px',
                  width: '150px',
                  height: '100px',
                  color: 'black',
                  textTransform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                label={
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <i className="bi bi-journal-medical fs-3" style={{ marginBottom: '8px' }}></i>
                    Quản lí tài sản
                  </span>
                }
              />
              <Tab
                className="mx-1"
                sx={{
                  background: (theme) => (theme.palette.mode === 'light' ? '#fff' : '#abb2b9'),
                  border: '1px solid #34495e',
                  borderRadius: '15px',
                  width: '150px',
                  height: '100px',
                  color: 'black',
                  textTransform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                label={
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <i className="bi bi-arrows-angle-contract fs-3" style={{ marginBottom: '8px' }}></i>
                    Quản lí hợp đồng
                  </span>
                }
              />
              <Tab
                className="mx-1"
                sx={{
                  background: (theme) => (theme.palette.mode === 'light' ? '#fff' : '#abb2b9'),
                  border: '1px solid #34495e',
                  borderRadius: '15px',
                  width: '160px',
                  height: '100px',
                  color: 'black',
                  textTransform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                label={
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <i className="bi bi-telephone fs-3" style={{ marginBottom: '8px' }}></i>
                    Quản lí khách thuê
                  </span>
                }
              />
              <Tab
                className="mx-1"
                sx={{
                  background: (theme) => (theme.palette.mode === 'light' ? '#fff' : '#abb2b9'),
                  border: '1px solid #34495e',
                  borderRadius: '15px',
                  width: '160px',
                  height: '100px',
                  color: 'black',
                  textTransform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                label={
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <i className="bi bi-bar-chart fs-3" style={{ marginBottom: '8px' }}></i>
                    Thu/Chi - Tổng kết
                  </span>
                }
              />
              <Tab
                className="mx-1"
                sx={{
                  background: (theme) => (theme.palette.mode === 'light' ? '#fff' : '#abb2b9'),
                  border: '1px solid #34495e',
                  borderRadius: '15px',
                  width: '150px',
                  height: '100px',
                  color: 'black',
                  textTransform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                label={
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <i className="bi bi-gear fs-3" style={{ marginBottom: '8px' }}></i>
                    Cài đặt
                  </span>
                }
              />
            </Tabs>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar