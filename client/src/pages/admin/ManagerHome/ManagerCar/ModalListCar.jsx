import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState, useEffect } from 'react'
import { getRoomById } from '~/apis/roomAPI'
import ModalCreateCar from './ModalCreateCar'
import { getCarByRoomId, deleteCar } from '~/apis/carAPI'
import Swal from 'sweetalert2'
function ModalListCar({ toggleModal, modalOpen, roomId }) {
  const [room, setRoom] = useState({})
  const [carOpen, setCarOpen] = useState(false)
  const [cars, setCars] = useState([])
  const [selectedCarId, setSelectedCarId] = useState(null)
  const openCar = () => {
    setCarOpen(!carOpen)
  }
  const toggleCar = () => {
    setCarOpen(!carOpen)
  }
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

  // Hàm lấy dữ liệu phòng từ server
  const fetchCarRoom = async (roomId) => {
    if (roomId) {
      try {
        const response = await getCarByRoomId(roomId) // Lấy dữ liệu phòng từ API

        if (response.data) {
          setCars(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleDelete = async (carId) => {
    try {
      // Gửi yêu cầu xóa xe lên API
      await deleteCar(carId) // Hàm API để xóa xe, bạn cần định nghĩa nó trong `carAPI`

      Swal.fire({
        icon: 'success',
        title: 'Xóa thành công!',
        text: 'Xe đã được xóa khỏi danh sách.',
        confirmButtonText: 'Đóng'
      })
      setTimeout(() => {
        window.location.reload() // Tải lại trang sau 1 giây
      }, 1000)
    } catch (error) {
      console.error('Lỗi khi xóa xe:', error)

      Swal.fire({
        icon: 'error',
        title: 'Có lỗi xảy ra!',
        text: 'Không thể xóa xe, vui lòng thử lại sau.',
        confirmButtonText: 'Đóng'
      })
    }
  }

  useEffect(() => {
    const handlFristData = () => {
      if (roomId) {
        fetchDataRoom(roomId)
        fetchCarRoom(roomId)
      }
    }

    handlFristData()
  }, [roomId]) // Chỉ chạy lại khi roomId hoặc motelId thay đổi

  return (
    <div>
      {room ? (
        <>
          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    marginRight: '15px',
                    outline: '0',
                    boxShadow: 'rgb(48 120 158 / 15%) 0px 0px 0px 0.25rem',
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
                    className="feather feather-users">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h5 style={{ marginLeft: '10px' }}>Danh sách xe - {room ? room.name : <>ko co </>}</h5>
              </div>
            </ModalHeader>

            <ModalBody>
              {cars ? (
                cars.map((car, i) => (
                  <div key={i} className="item-feature d-flex align-items-center justify-content-between mb-2">
                    <div className="info" style={{ flex: '1' }}>
                      <h5>{car.name}</h5>
                      <div>{car.number}</div>
                    </div>
                    <div
                      className="btn-round btn-delete"
                      onClick={() => handleDelete(car.carId)} // Thay car.id bằng trường khóa chính trong dữ liệu xe của bạn
                    >
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
                        className="feather feather-trash-2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </div>
                    <div
                      className="btn-round btn-edit"
                      onClick={() => {
                        setSelectedCarId(car.carId)
                        openCar()
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
                        className="feather feather-edit">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </ModalBody>

            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>
                Đóng
              </Button>
              <Button
                color="primary "
                onClick={() => {
                  setSelectedCarId('Create')
                  openCar()
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
                  className="feather feather-plus">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Thêm thông tin xe
              </Button>
            </ModalFooter>
          </Modal>
          <ModalCreateCar onClose={toggleCar} open={carOpen} roomId={roomId} carId={selectedCarId} />
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ModalListCar
