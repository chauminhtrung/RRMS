/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Tooltip, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import BrokerModal from './BrokerModal'
import { useParams } from 'react-router-dom'
import { getBrokers } from '~/apis/apiClient'

const AdminManageBoker = ({ setIsAdmin, motels, setmotels }) => {
  const [open, setOpen] = useState(false)
  const [brokers, setBrokers] = useState([])
  const { motelId } = useParams()

  useEffect(() => {
    setIsAdmin(true)
  }, [])
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const refreshBrokers = () => {
    getBrokers(motelId).then((res) => {
      setBrokers(res.data.result)
    })
  }
  useEffect(() => {
    getBrokers(motelId).then((res) => {
      setBrokers(res.data.result)
    })
  }, [motelId])

  return (
    <>
      <NavAdmin setmotels={setmotels} motels={motels} />
      <div style={{ backgroundColor: '#c2c5aa' }}>
        <div className="row justify-content-center">
          <div className="col-md-10 col-sm-10 col-xs-12 mt-3">
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
          <div className="col-md-10 col-sm-10 col-xs-12">
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
                              backgroundColor: 'darkgreen'
                            },
                            color: 'white',
                            padding: '12px'
                          }}>
                          <AddIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                      </Tooltip>
                      <BrokerModal handleClose={handleClose} open={open} refreshBrokers={refreshBrokers} />
                    </div>
                  </div>
                </div>
                <table className="table align-middle mb-0 bg-white">
                  <thead className="bg-light">
                    <tr>
                      <th>Tên</th>
                      <th>SDT</th>
                      <th>Tình trạng tài khoản</th>
                      <th>Phần trăm hoa hồng</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brokers.map((broker) => (
                      <tr key={broker.brokerId}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="ms-3">
                              <p className="fw-bold mb-1">{broker.name}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="fw-normal mb-1">{broker.phone}</p>
                        </td>
                        <td>
                          <p className="fw-normal mb-1">Đang hoạt động</p>
                        </td>
                        <td>
                          <p className="fw-normal mb-1">{broker.commissionRate} %</p>
                        </td>
                        <td>
                          <EditIcon sx={{ fontSize: 30 }} />
                          <DeleteIcon sx={{ fontSize: 30 }} />
                        </td>
                      </tr>
                    ))}
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
