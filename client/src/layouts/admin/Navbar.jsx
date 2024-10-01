import React from 'react'
import { Avatar, Grid, Button, AppBar, Toolbar } from '@mui/material'

const Navbar = () => {
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
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
