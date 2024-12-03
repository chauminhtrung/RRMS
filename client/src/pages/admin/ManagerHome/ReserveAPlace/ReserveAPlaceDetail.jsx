import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import AddIcon from '@mui/icons-material/Add'
import { useState, useEffect } from 'react'
import { getRoomById } from '~/apis/roomAPI'
function ReserveAPlaceDetail({ toggleModal, modalOpen, roomId }) {
  const [room, setRoom] = useState({})

  // Hàm lấy dữ liệu phòng từ server
  const fetchDataRoom = async (roomId) => {
    if (roomId) {
      try {
        const response = await getRoomById(roomId) // Lấy dữ liệu phòng từ API
        if (response) {
          setRoom(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate) // Chuyển đổi chuỗi ISO thành đối tượng Date
    const day = String(date.getDate()).padStart(2, '0') // Lấy ngày, thêm số 0 nếu cần
    const month = String(date.getMonth() + 1).padStart(2, '0') // Lấy tháng (tăng thêm 1 vì tháng trong JS bắt đầu từ 0)
    const year = date.getFullYear() // Lấy năm

    return `${day}/${month}/${year}` // Trả về chuỗi theo định dạng DD/MM/YYYY
  }

  useEffect(() => {
    const handlFristData = () => {
      if (roomId) {
        fetchDataRoom(roomId)
      }
    }

    handlFristData()
  }, [roomId]) // Chỉ chạy lại khi roomId hoặc motelId thay đổi0

  return (
    <div>
      {room ? (
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  marginRight: '15px',
                  outline: '0',
                  boxShadow: '0 0 0 .25rem rgba(76, 175, 80, 0.16)',
                  opacity: '1',
                  borderRadius: '100%',
                  width: '36px',
                  height: '36px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  backgroundColor: 'rgb(32, 169, 231)'
                }}>
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
                  className="feather feather-anchor">
                  <circle cx="12" cy="5" r="3"></circle>
                  <line x1="12" y1="22" x2="12" y2="8"></line>
                  <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
                </svg>
              </div>
              <h5 style={{ marginLeft: '10px' }}>Thông tin cọc giữ chỗ - {room ? room.name : <>ko co </>}</h5>
            </div>
          </ModalHeader>

          <ModalBody>
            <div className="deposit-temp-info">
              <div>
                <div className="item d-flex justify-content-between">
                  <span>Tên người đặt cọc</span>
                  <span>
                    <b>{room.reserveAPlace?.nameTenant ? room.reserveAPlace.nameTenant : <>ko co</>}</b>
                  </span>
                </div>
                <div className="item d-flex justify-content-between">
                  <span>Số điện thoại</span>
                  <span>
                    <b>{room.reserveAPlace?.phoneTenant ? room.reserveAPlace.phoneTenant : <>ko co</>}</b>
                  </span>
                </div>
                <div className="item d-flex justify-content-between">
                  <span>Số tiền cọc giữ chỗ</span>
                  <span>
                    <b>
                      {room.reserveAPlace?.deposit ? room.reserveAPlace.deposit.toLocaleString('vi-VN') : <>ko co</>}₫
                    </b>
                  </span>
                </div>
                <div className="item d-flex justify-content-between">
                  <span>Ngày thu tiền cọc</span>
                  <span>
                    <b>{room.reserveAPlace?.createDate ? formatDate(room.reserveAPlace.createDate) : <>ko co</>}</b>
                  </span>
                </div>
                <div className="item d-flex justify-content-between">
                  <span>Ngày dự định vào ở</span>
                  <span>
                    <b>{room.reserveAPlace?.moveInDate ? formatDate(room.reserveAPlace.moveInDate) : <>ko co</>}</b>
                  </span>
                </div>
                <div className="item d-flex justify-content-between">
                  <span>Ghi chú</span>
                  <span>
                    <b>{room.reserveAPlace?.note ? room.reserveAPlace.note : <>ko co</>}</b>
                  </span>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Đóng
            </Button>
          </ModalFooter>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ReserveAPlaceDetail
