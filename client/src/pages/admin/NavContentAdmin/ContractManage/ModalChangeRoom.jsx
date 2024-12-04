import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState, useEffect } from 'react'
import { getRoomById, getRoomByMotelIdWContract } from '~/apis/roomAPI'
import { getContractByIdRoom2, updateContractDetail } from '~/apis/contractTemplateAPI'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
function ModalChangeRoom({ toggleModal, modalOpen, roomId }) {
  const { motelId } = useParams()
  const [room, setRoom] = useState({})
  const [roomSelect, setRoomSelect] = useState(null)
  const [contract, setContract] = useState({})
  const [rooms, setRooms] = useState([])
  const [selectedRoomId, setSelectedRoomId] = useState(null)
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

  const fetchRooms = async () => {
    //neu co motelId tren URL
    if (motelId) {
      try {
        const dataRoom = await getRoomByMotelIdWContract(motelId)
        setRooms(dataRoom)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleRoomClick = async (roomId) => {
    setSelectedRoomId(roomId === selectedRoomId ? null : roomId) // Nếu phòng đã chọn thì bỏ chọn, nếu không thì chọn phòng mới
    if (roomId === selectedRoomId) {
      setRoomSelect(null)
      return
    }
    if (roomId) {
      try {
        const dataRoom = await getRoomById(roomId)
        setRoomSelect(dataRoom)
        setContract((prevContract) => ({
          ...prevContract,
          roomId: dataRoom.roomId, // Cập nhật dữ liệu phòng vào contract,
          price: dataRoom.price,
          deposit: dataRoom.price
        }))
        console.log(dataRoom)
      } catch (error) {
        console.log(error)
      }
    } else {
      // Nếu không chọn phòng nào, xóa thông tin phòng trong contract
      setRoom(null)
      setContract((prevContract) => ({
        ...prevContract,
        room: null
      }))
    }
  }

  // Hàm lấy dữ liệu phòng  từ server
  const fetchDataContract = async (roomId) => {
    if (roomId) {
      try {
        const response = await getContractByIdRoom2(roomId) // Lấy dữ liệu phòng từ API
        if (response) {
          setContract(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const handlFristData = () => {
      if (roomId && motelId) {
        fetchDataRoom(roomId)
        fetchDataContract(roomId)
        fetchRooms(motelId)
      }
    }

    handlFristData()
  }, [roomId, motelId]) // Chỉ chạy lại khi roomId hoặc motelId thay đổi

  const handleSubmit = async () => {
    if (roomId) {
      try {
        if (roomSelect && contract) {
          await updateContractDetail(contract.contractId, roomSelect.roomId, roomSelect.price, roomSelect.price, 0.0)
          Swal.fire({
            icon: 'success',
            title: 'chuyển phòng thành công!',
            text: 'bạn đã chuyển phòng thành công.',
            confirmButtonText: 'OK'
          })
          setTimeout(() => {
            window.location.reload() // Tải lại trang sau 1 giây
          }, 1000)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'chuyển phòng thất bại!',
            text: 'Vui lòng chọn phòng để chuyển.',
            confirmButtonText: 'OK'
          })
        }
      } catch (error) {
        // Nếu có lỗi, hiển thị thông báo lỗi
        Swal.fire({
          icon: 'error',
          title: 'chuyển phòng thất bại!',
          text: error.message || 'Có lỗi xảy ra khi chuyển phòng.',
          confirmButtonText: 'OK'
        })
      }
    }
  }

  return (
    <div>
      {room && contract ? (
        <Modal isOpen={modalOpen} toggle={toggleModal} className="modal-dialog modal-dialog-centered modal-xl">
          <ModalHeader toggle={toggleModal}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  marginRight: '15px',
                  outline: '0',
                  boxShadow: 'rgb(17 156 226 / 16%) 0px 0px 0px 0.25rem',
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
                  className="feather featherList">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </div>
              <div>
                <h5 className="modal-title title" style={{ fontSize: '19px' }}>
                  Danh sách phòng
                </h5>
                <i className="description des" style={{ fontSize: '19px' }}>
                  Chọn phòng để chuyển - &quot;{room ? room.name : <>ko co </>}&quot;
                </i>
              </div>
            </div>
          </ModalHeader>

          <ModalBody>
            <div className="row g-3">
              <div className="col-12">
                <div className="room-list row g-2">
                  {rooms ? (
                    rooms.map((room) => (
                      <div
                        key={room.roomId}
                        className={`col-6 room-item ${selectedRoomId === room.roomId ? 'active' : ''}`}
                        onClick={() => handleRoomClick(room.roomId)} // Chọn phòng khi click
                      >
                        <div className="d-flex room-item-inner align-items-center">
                          <div className="flex-grow-0 icon-room">
                            {selectedRoomId === room.roomId ? (
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
                                className="feather feather-check">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            ) : (
                              <img
                                width="20px"
                                src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Froom.png?alt=media&token=9f1a69c1-ce2e-4586-ba90-94db53443d49"
                                alt=""
                              />
                            )}
                          </div>
                          <div className="flex-grow-1">
                            <div>
                              <b>{room.name}</b>
                              <span
                                style={{
                                  backgroundColor: '#ED6004',
                                  display: 'table',
                                  fontSize: '12px',
                                  borderRadius: '5px',
                                  padding: '0 7px',
                                  color: '#fff'
                                }}>
                                Đang trống
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-1">
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-dollar-sign">
                                  <line x1="12" y1="1" x2="12" y2="23"></line>
                                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>{' '}
                                {room.price.toLocaleString()}₫
                              </div>
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-user">
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="12" cy="7" r="4"></circle>
                                </svg>{' '}
                                0/1 người
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>Loading........</>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Đóng
            </Button>
            <Button color="primary " onClick={() => handleSubmit()}>
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
              Xác nhận chuyển phòng
            </Button>
          </ModalFooter>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ModalChangeRoom
