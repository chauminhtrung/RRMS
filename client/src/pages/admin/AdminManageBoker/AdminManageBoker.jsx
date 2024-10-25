import React, { useEffect, useState } from 'react'
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import NavAdmin from '~/layouts/admin/NavbarAdmin'

const AdminManageBoker = ({ setIsAdmin, motels, setmotels }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setIsAdmin(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <NavAdmin setmotels={setmotels} motels={motels} />
      <div style={{ backgroundColor: '#c2c5aa' }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-sm-8 col-xs-12 mt-3">
            <div>
              <b style={{ fontSize: '30px' }}>
                <b style={{ color: '#5eb7ff' }}>|</b> Môi giới
              </b>
              <p>
                <em>Các thiết lập cho người môi giới</em>
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 col-sm-8 col-xs-12">
            <div className="row bg-light mb-5" style={{ borderRadius: '15px' }}>
              <div className="col-md-3 col-sm-3 col-xs-12">
                <div className="row" style={{ backgroundColor: '#4bcffa', borderTopLeftRadius: '15px' }}>
                  <b className="my-3">Danh sách người môi giới</b>
                </div>
              </div>
              <div className="col-md-9 col-sm-9 col-xs-12">
                <div className="row">
                  <div className="d-flex justify-content-between my-3">
                    <div>
                      <b style={{ fontSize: '20px' }}>
                        <b style={{ color: '#5eb7ff' }}>|</b> Danh sách người môi giới
                      </b>
                    </div>
                    <div>
                      <Tooltip title="Thêm môi giới">
                        <IconButton
                          onClick={handleClickOpen}
                          sx={{
                            backgroundColor: 'green',
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
                        <DialogTitle>Thêm Môi Giới</DialogTitle>
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
                    </div>
                  </div>
                </div>
                <table className="table align-middle mb-0 bg-white">
                  <thead className="bg-light">
                    <tr>
                      <th>Name</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Position</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                            alt=""
                            style={{ width: '45px', height: '45px' }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">John Doe</p>
                            <p className="text-muted mb-0">john.doe@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">Software engineer</p>
                        <p className="text-muted mb-0">IT department</p>
                      </td>
                      <td>
                        <span className="badge badge-success rounded-pill d-inline">Active</span>
                      </td>
                      <td>Senior</td>
                      <td>
                        <button type="button" className="btn btn-link btn-sm btn-rounded">
                          Edit
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                            className="rounded-circle"
                            alt=""
                            style={{ width: '45px', height: '45px' }}
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">Alex Ray</p>
                            <p className="text-muted mb-0">alex.ray@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">Consultant</p>
                        <p className="text-muted mb-0">Finance</p>
                      </td>
                      <td>
                        <span className="badge badge-primary rounded-pill d-inline">Onboarding</span>
                      </td>
                      <td>Junior</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-link btn-rounded btn-sm fw-bold"
                          data-mdb-ripple-color="dark">
                          Edit
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                            className="rounded-circle"
                            alt=""
                            style={{ width: '45px', height: '45px' }}
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">Kate Hunington</p>
                            <p className="text-muted mb-0">kate.hunington@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">Designer</p>
                        <p className="text-muted mb-0">UI/UX</p>
                      </td>
                      <td>
                        <span className="badge badge-warning rounded-pill d-inline">Awaiting</span>
                      </td>
                      <td>Senior</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-link btn-rounded btn-sm fw-bold"
                          data-mdb-ripple-color="dark">
                          Edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AdminManageBoker
