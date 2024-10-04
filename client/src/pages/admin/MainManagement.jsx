import React, { useState } from 'react'
import { Box, Button, Checkbox } from '@mui/material'
import { Grid } from '@mui/material'
import Navbar from '~/layouts/admin/Navbar'
import { Tooltip, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'
import AddIcon from '@mui/icons-material/Add'

const MainManagement = ({ theme }) => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
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
        {/* <Grid item xs={12} md={12} className="mb-3">
          <Navbar />
        </Grid> */}
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                <Tooltip title="Xem">
                  <IconButton
                    sx={{
                      backgroundColor: 'red',
                      marginRight: '5px',
                      '&:hover': {
                        backgroundColor: 'darkred',
                      },
                      color: 'white',
                      padding: '12px',
                    }}>
                    <ChangeHistoryIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Thêm">
                  <IconButton
                    onClick={handleClickOpen}
                    sx={{
                      backgroundColor: 'green',
                      marginRight: '5px',
                      '&:hover': {
                        backgroundColor: 'darkgreen',
                      },
                      color: 'white',
                      padding: '12px',
                    }}>
                    <AddIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </Tooltip>

                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Thêm</DialogTitle>
                  <DialogContent>
                    <TextField autoFocus margin="dense" label="Tên môi giới" fullWidth variant="standard" />
                    <TextField margin="dense" label="Email" fullWidth variant="standard" />
                    <TextField margin="dense" label="Số điện thoại" fullWidth variant="standard" />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Hủy
                    </Button>
                    <Button onClick={handleClose} color="primary">
                      Lưu
                    </Button>
                  </DialogActions>
                </Dialog>
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
