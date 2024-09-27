import React from 'react'
import { Avatar, Grid, Button, AppBar, Toolbar } from '@mui/material'

const Navbar = () => {
  return (
    <AppBar position="static" style={{ background: 'white' }}>
      <Toolbar>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item xs={12} sm={3} md={3}>
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
          <Grid item xs={12} sm={9} md={9}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={1} md={1}>
                <Button variant="contained" sx={{ width: '100%', height: '100%' }}>
                  Quản lí nhà
                </Button>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Button variant="contained" sx={{ width: '100%', height: '100%' }}>
                  Tổng báo cáo
                </Button>
              </Grid>
              <Grid item xs={12} sm={1} md={1}>
                <Button variant="contained" sx={{ width: '100%', height: '100%' }}>
                  Đăng tin
                </Button>
              </Grid>
              <Grid item xs={12} sm={1} md={1}>
                <Button variant="contained" sx={{ width: '100%', height: '100%' }}>
                  Môi giới
                </Button>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Button variant="contained" sx={{ width: '100%', height: '100%' }}>
                  Công ty/nhóm
                </Button>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Button variant="contained" sx={{ width: '100%', height: '100%' }}>
                  Cài đặt chung
                </Button>
              </Grid>
              <Grid item xs={12} sm={1} md={1}>
                <Button variant="contained" sx={{ width: '100%', height: '100%' }}>
                  Thông báo
                </Button>
              </Grid>
              <Grid item xs={12} sm={1} md={1}>
                <Button variant="contained" sx={{ width: '100%', height: '100%' }}>
                  Tài khoản
                </Button>
              </Grid>
              <Grid item xs={12} sm={1} md={1}>
                <Button variant="contained" sx={{ width: '100%', height: '100%' }}>
                  Đăng nhập
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
