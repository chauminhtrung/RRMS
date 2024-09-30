import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import { Grid } from '@mui/material'
import Navbar from '~/layouts/admin/Navbar'
import { Tabs, Tab } from '@mui/material'
import { fontGrid } from '@mui/material/styles/cssUtils'
const MainManagement = ({ theme }) => {
  const [select, setSelect] = useState(0)
  const handleTabChange = (event, newValue) => {
    setSelect(newValue)
  }
  return (
    <Box
      sx={{
        border: (theme) => (theme.palette.mode === 'light' ? '1px solid #747d8c' : '1px solid #a4b0be'),
        padding: (theme) => theme.spacing(2),
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'sticky',
        top: 20,
      }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={12}>
          <Navbar />
        </Grid>
        <Grid item xs={2} md={2}>
          md=8 ok
        </Grid>
        <Grid item xs={10} md={10}>
          {/* <Button
            variant="contained"
            sx={{
              bgcolor: (theme) => (theme.palette.mode === 'light' ? '#ff4757' : '#ff6b81'),
              width: '100%',
            }}>
            Báo cáo tin
          </Button> */}
          {/* <Grid container>
            <Grid item xs={6}>
              <Paper elevation={3}>
                <p>Paper 3 with elevation 3</p>
              </Paper>
            </Grid>
          </Grid> */}
        </Grid>
        <Grid item md={2} sm={2} xs={12}>
          {' '}
          <Button
            variant="contained"
            sx={{
              bgcolor: (theme) => (theme.palette.mode === 'light' ? 'white' : '#4bcffa'),
              width: '100%',
              height: '100px',
              textTransform: 'none',
              color: 'black',
            }}>
            Đang quản lý <br />
            Nhà trọ RRMS
          </Button>
        </Grid>
        <Grid item md={10} sm={10} xs={12}>
          {' '}
          <Tabs
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
              }}
              label="Quản lí phòng"
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
              }}
              label="Quản lí hóa đơn"
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
              }}
              label="Quản lí dịch vụ"
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
              }}
              label="Quản lí tài sản"
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
              }}
              label="Quản lí hợp đồng"
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
              }}
              label="Quản lí khách thuê"
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
              }}
              label="Thu/Chi - Tổng kết"
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
              }}
              label="Cài đặt"
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
              }}
              label="Quản lí phòng"
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
              }}
              label="Quản lí phòng"
            />
          </Tabs>
        </Grid>
        <Grid container spacing={1} className="mt-3">
          <Grid item md={3} sm={3} xs={12}>
            <Button
              variant="contained"
              sx={{
                bgcolor: (theme) => (theme.palette.mode === 'light' ? 'white' : '#4bcffa'),
                width: '100%',
                height: '80px',
                textTransform: 'none',
                color: 'black',
              }}>
              Tổng số tiền khách nợ
            </Button>
          </Grid>
          <Grid item md={3} sm={3} xs={12}>
            <Button
              variant="contained"
              sx={{
                bgcolor: (theme) => (theme.palette.mode === 'light' ? 'white' : '#4bcffa'),
                width: '100%',
                height: '80px',
                textTransform: 'none',
                color: 'black',
              }}>
              Tổng số tiền cọc
            </Button>
          </Grid>
          <Grid item md={3} sm={3} xs={12}>
            <Button
              variant="contained"
              sx={{
                bgcolor: (theme) => (theme.palette.mode === 'light' ? 'white' : '#4bcffa'),
                width: '100%',
                height: '80px',
                textTransform: 'none',
                color: 'black',
              }}>
              Tổng số tiền cọc giữ chổ phòng
            </Button>
          </Grid>
          <Grid item md={3} sm={3} xs={12}>
            <Button
              variant="contained"
              sx={{
                bgcolor: (theme) => (theme.palette.mode === 'light' ? 'white' : '#4bcffa'),
                width: '100%',
                height: '80px',
                textTransform: 'none',
                color: 'black',
              }}>
              Sự cố phòng
            </Button>
          </Grid>
          <Grid item md={12} sm={12} xs={12} className="my-3">
            <div className="d-flex justify-content-between">
              <div>
                <p>Quản lí danh sách phòng</p>
                <p>Tất cả danh sách phòng trong Nhà trọ RRMS</p>
              </div>
              <div>
                <Button
                  variant="contained"
                  sx={{
                    width: '50px',
                    height: '62px',
                    borderRadius: '50%',
                  }}>
                  a
                </Button>
                <Button
                  className="mx-2"
                  variant="contained"
                  sx={{
                    width: '50px',
                    height: '62px',
                    borderRadius: '50%',
                  }}>
                  b
                </Button>
                <Button className="me-2" variant="contained">
                  Ẩn/hiện cột
                </Button>
                <Button variant="contained">Xuất Excel</Button>
              </div>
            </div>
          </Grid>
          <Grid item md={12} sm={12} xs={12}></Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainManagement
