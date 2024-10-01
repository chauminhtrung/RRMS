import React, { useState } from 'react'
import { Box, Button, Checkbox } from '@mui/material'
import { Grid } from '@mui/material'
import Navbar from '~/layouts/admin/Navbar'
import { Tabs, Tab } from '@mui/material'

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
        <Grid item xs={12} md={12} className="mb-3">
          <Navbar />
        </Grid>
        <Grid item md={2} sm={2} xs={12}>
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
                display: 'flex', // Sử dụng Flexbox
                alignItems: 'center', // Căn giữa theo chiều dọc
                justifyContent: 'space-between', // Tạo khoảng cách giữa icon và text
              }}>
              <i className="bi bi-bar-chart fs-3 text-danger me-2 fw-bold"></i>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span>Tổng số tiền khách nợ</span>
                <b className="text-danger" style={{ fontSize: '30px' }}>
                  0đ
                </b>
              </div>
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
                display: 'flex', // Sử dụng Flexbox
                alignItems: 'center', // Căn giữa theo chiều dọc
                justifyContent: 'space-between', // Tạo khoảng cách giữa icon và text
              }}>
              <i className="bi bi-bar-chart fs-3 text-success me-2 fw-bold"></i>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span>Tổng số tiền cọc</span>
                <b className="text-success" style={{ fontSize: '30px' }}>
                  0đ
                </b>
              </div>
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
                display: 'flex', // Sử dụng Flexbox
                alignItems: 'center', // Căn giữa theo chiều dọc
                justifyContent: 'space-between', // Tạo khoảng cách giữa icon và text
              }}>
              <i className="bi bi-bar-chart fs-3 text-warning me-2 fw-bold"></i>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span>Tổng số tiền cọc giữ chổ phòng</span>
                <b className="text-warning" style={{ fontSize: '30px' }}>
                  0đ
                </b>
              </div>
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
                display: 'flex', // Sử dụng Flexbox
                alignItems: 'center', // Căn giữa theo chiều dọc
                justifyContent: 'space-between', // Tạo khoảng cách giữa icon và text
              }}>
              <i className="bi bi-exclamation-square fs-3 text-warning-emphasis me-2 fw-bold"></i>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span>Sự cố phòng</span>
                <b className="text-warning-emphasis" style={{ fontSize: '30px' }}>
                  0 Vấn đề
                </b>
              </div>
            </Button>
          </Grid>
          <Grid item md={12} sm={12} xs={12} className="my-3">
            <div className="d-flex justify-content-between">
              <div>
                <b style={{ fontSize: '30px' }}>
                  {' '}
                  <b style={{ color: '#5eb7ff' }}>|</b> Quản lí danh sách phòng
                </b>
                <p>
                  <em>Tất cả danh sách phòng trong Nhà trọ RRMS</em>
                </p>
              </div>
              <div>
                <Button
                  variant="contained"
                  sx={{
                    background: 'red',
                    width: '50px',
                    height: '62px',
                    borderRadius: '50%',
                  }}>
                  <i className="bi bi-caret-right-fill fs-3"></i>
                </Button>
                <Button
                  className="mx-2"
                  variant="contained"
                  sx={{
                    background: '#28a745',
                    width: '50px',
                    height: '62px',
                    borderRadius: '50%',
                  }}>
                  <i className="bi bi-plus-lg fs-3"></i>
                </Button>
                <Button className="me-2" variant="contained">
                  <i className="bi bi-journal-text fs-3 me-2"></i> Ẩn/hiện cột
                </Button>
                <Button variant="contained">
                  <i className="bi bi-journal-text fs-3 me-2"></i> Xuất Excel
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item md={12} sm={12} xs={12} sx={{ border: '1px solid gray', borderRadius: '5px' }}>
            <Grid container spacing={1}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="bi bi-funnel fs-2"></i>
                <div className="d-flex align-items-center">
                  <input className="form-check-input me-2" type="checkbox" value="" id="" />
                  <label className="form-check-label">Phòng đang ở</label>
                </div>
                <div className="d-flex align-items-center">
                  <input className="form-check-input me-2" type="checkbox" value="" id="" />
                  <label className="form-check-label">Phòng trống</label>
                </div>
                <div className="d-flex align-items-center">
                  <input className="form-check-input me-2" type="checkbox" value="" id="" />
                  <label className="form-check-label">Hợp đồng đang báo kết thúc</label>
                </div>
                <div className="d-flex align-items-center">
                  <input className="form-check-input me-2" type="checkbox" value="" id="" />
                  <label className="form-check-label">Hợp đồng sắp hết hạng</label>
                </div>
                <div className="d-flex align-items-center">
                  <input className="form-check-input me-2" type="checkbox" value="" id="" />
                  <label className="form-check-label">Hợp đồng đã quá hạn</label>
                </div>
                <div className="d-flex align-items-center">
                  <input className="form-check-input me-2" type="checkbox" value="" id="" />
                  <label className="form-check-label">Cọc giữ chổ</label>
                </div>
                <div className="d-flex align-items-center">
                  <input className="form-check-input me-2" type="checkbox" value="" id="" />
                  <label className="form-check-label">Đang nợ tiền</label>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            this is table
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainManagement
