import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import AddIcon from '@mui/icons-material/Add'
import AddTenantModal from './ModalTenant'
import { useEffect, useState } from 'react'
import { getContractByIdMotel } from '~/apis/contractTemplateAPI'
import axios from 'axios'
import { env } from '~/configs/environment'
import Swal from 'sweetalert2'

function RentRoomModal({ toggleModal, modalOpen, motelId }) {
  const [tenantOpen, setTenantOpen] = useState(false)
  const [contract, setContracts] = useState({})
  const [dataTenant, setDataTenant] = useState([])
  const [avatar, setAvatar] = useState(true)
  const [editId, setEditId] = useState()
  const [roomId, setRoomId] = useState()
  const openTenant = () => {
    setTenantOpen(!tenantOpen)
    setAvatar(true)
  }
  const toggleTenant = (tenantId) => {
    setTenantOpen(!tenantOpen)
    setEditId(tenantId)
    setAvatar(!avatar)
  }

  const loadDataTenantRoomId = async () => {
    try {
      const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null

      if (!token) {
        console.error('No token found')
        return
      }

      const response = await axios.get(`${env.API_URL}/tenant/roomId/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '69420'
        }
      })

      if (response.status === 200) {
        const fetchedData = response.data?.result
        setDataTenant(fetchedData)
      }
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message || error)
    }
  }

  const fetchMotelContract = async (id) => {
    console.log(id)

    try {
      const response = await getContractByIdMotel(id)

      if (response) {
        setContracts(response)
        loadDataTenantRoomId(response[0].room.roomId)
        setRoomId(response[0].room.roomId)
        console.log(roomId)
      } else {
        setContracts([])
      }
    } catch (error) {
      console.error('Error fetching motel services:', error)
      setContracts([])
    }
  }
  const deleteTenant = async (id, e) => {
    e.preventDefault()

    const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Token is missing, please login again.'
      })
      return
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.delete(`${env.API_URL}/tenant/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420'
        }
      })
      loadDataTenantRoomId(roomId)
      Swal.fire({ icon: 'success', title: 'Thành công', text: 'Xóa tenant thành công!' })
    } catch (error) {
      console.error('Error deleting tenant:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Xóa tenant không thành công!'
      })
    }
  }

  useEffect(() => {
    if (motelId) {
      fetchMotelContract(motelId)
    }
  }, [roomId])

  return (
    <div>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: '#5cb85c',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontSize: '16px'
              }}>
              <i className="fa fa-user" />
            </div>
            <h5 style={{ marginLeft: '10px' }}>Danh sách khách thuê - Phòng 2</h5>
          </div>
        </ModalHeader>

        <ModalBody>
          {contract && contract[0]?.tenant ? (
            <div
              className="row"
              style={{
                border: '1px solid #ddd',
                padding: '10px',
                borderRadius: '10px'
              }}>
              <div style={{ flex: '1' }}>
                <h6 style={{ marginBottom: '5px' }}>
                  <p>Họ và tên: {contract[0]?.tenant?.fullname || 'Chưa có tên'}</p>
                </h6>
                <h6 style={{ marginBottom: '5px' }}>
                  <p style={{ marginBottom: '0' }}>Số điện thoại: {contract[0]?.tenant?.phone || 'Chưa có số'}</p>
                </h6>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginLeft: '10px',
                  marginTop: '-45px'
                }}>
                <button
                  style={{
                    marginRight: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    padding: '5px'
                  }}
                  onClick={() => {
                    toggleTenant()
                    setEditId(contract[0]?.tenant?.tenantId) // Cập nhật tenantId
                    setAvatar(false) // Đặt avatar nếu cần
                    console.log('aa', contract[0].tenant.tenantId) // Kiểm tra console
                  }}
                  className="btn btn-outline-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-edit">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>

                <button
                  className="btn btn-outline-danger"
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    padding: '5px'
                  }}
                  onClick={() => {
                    setEditId(contract[0].tenant.tenantId) // Cập nhật tenantId
                    setAvatar(false) // Đặt avatar nếu cần
                    console.log('setEditId called with tenantId:', contract[0].tenant.tenantId) // Kiểm tra console
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="feather feather-trash-2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>

              <div style={{ marginTop: '10px' }}>
                <Button
                  color="primary"
                  size="sm"
                  style={{
                    marginRight: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                  disabled>
                  Người liên hệ
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                  disabled>
                  Đại diện hợp đồng
                </Button>
              </div>
            </div>
          ) : (
            <p>Không có thông tin hợp đồng hoặc khách thuê</p>
          )}
          {dataTenant?.length > 0 ? (
            <>
              {dataTenant.map((item, index) => (
                <div
                  key={index}
                  className="row"
                  style={{
                    border: '1px solid #ddd',
                    padding: '10px',
                    borderRadius: '10px'
                  }}>
                  <div style={{ flex: '1' }}>
                    <h6 style={{ marginBottom: '5px' }}>Họ và tên: {item.fullname || 'Chưa có tên'}</h6>
                    <h6 style={{ marginBottom: '5px' }}>Số điện thoại: {item.phone || 'Chưa có số'}</h6>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      marginLeft: '10px',
                      marginTop: '-45px'
                    }}>
                    <button
                      style={{
                        marginRight: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        padding: '5px'
                      }}
                      onClick={() => {
                        if (item?.tenantId) {
                          toggleTenant()
                          setEditId(item.tenantId) // Cập nhật tenantId
                          setAvatar(false) // Đặt avatar nếu cần
                          console.log('setEditId called with tenantId:', item.tenantId)
                        } else {
                          console.error('Invalid tenantId:', item)
                        }
                      }}
                      className="btn btn-outline-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-edit">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      style={{
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        padding: '5px'
                      }}
                      onClick={(e) => {
                        deleteTenant(item.tenantId, e) // Xóa tenant với tenantId
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="feather feather-trash-2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <h1>Không có dữ liệu</h1>
          )}
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Đóng
          </Button>
          <Button color="primary" onClick={openTenant}>
            <AddIcon /> Thêm thông tin khách thuê
          </Button>
        </ModalFooter>
      </Modal>
      <AddTenantModal onClose={toggleTenant} open={tenantOpen} editId={editId} avatar={avatar} />
    </div>
  )
}

export default RentRoomModal
