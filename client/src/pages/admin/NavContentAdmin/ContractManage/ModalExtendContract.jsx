import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState, useEffect } from 'react'
import { getRoomById } from '~/apis/roomAPI'
import { getContractByIdRoom2, updateExtendContractStatusClose } from '~/apis/contractTemplateAPI'
import Flatpickr from 'react-flatpickr'
import Swal from 'sweetalert2'

function ModalExtendContract({ toggleModal, modalOpen, roomId }) {
  const [room, setRoom] = useState({})
  const [contract, setContract] = useState({})
  // State lưu trữ ngày kết thúc hợp đồng
  const [dateTerminate, setDateTerminate] = useState('')
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

  // Hàm xử lý khi người dùng thay đổi ngày kết thúc hợp đồng
  const handleDateChange = (date) => {
    // Flatpickr trả về mảng, ta lấy phần tử đầu tiên (là một đối tượng Date)
    const formattedDate = formatDate(date[0]) // Chuyển đối tượng Date thành chuỗi với định dạng dd-mm-yyyy
    // Kiểm tra nếu ngày chọn nhỏ hơn hoặc bằng ngày hiện tại
    if (formattedDate <= formatDate(contract.closeContract)) {
      Swal.fire({
        icon: 'error',
        title: 'Cập nhật thất bại!',
        text: 'Ngày gia hạn phải lớn hơn ngày hiện tại!',
        confirmButtonText: 'OK'
      })
      setDateTerminate('')
    } else {
      setDateTerminate(formattedDate)
    }
  }

  // Hàm lấy dữ liệu phòng từ server
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

  const formatDate = (isoDate) => {
    const date = new Date(isoDate) // Chuyển đổi chuỗi ISO thành đối tượng Date
    const day = String(date.getDate()).padStart(2, '0') // Lấy ngày, thêm số 0 nếu cần
    const month = String(date.getMonth() + 1).padStart(2, '0') // Lấy tháng (tăng thêm 1 vì tháng trong JS bắt đầu từ 0)
    const year = date.getFullYear() // Lấy năm

    return `${month}/${day}/${year}` // Trả về chuỗi theo định dạng DD/MM/YYYY
  }

  useEffect(() => {
    const handlFristData = () => {
      if (roomId) {
        fetchDataRoom(roomId)
        fetchDataContract(roomId)
      }
    }

    handlFristData()
  }, [roomId]) // Chỉ chạy lại khi roomId hoặc motelId thay đổi

  const handleSubmit = async () => {
    if (roomId && contract) {
      try {
        const selectedDate = new Date(
          dateTerminate.split('/').reverse().join('-') // Chuyển "DD/MM/YYYY" thành "MM/DD/YYYY"
        )
        const closeContractDate = new Date(formatDate(contract.closeContract).split('/').reverse().join('-'))

        // So sánh ngày
        if (selectedDate <= closeContractDate) {
          Swal.fire({
            icon: 'error',
            title: 'Cập nhật thất bại!',
            text: 'Ngày gia hạn phải lớn hơn ngày hiện tại!',
            confirmButtonText: 'OK'
          })
          return
        }

        // Gọi API cập nhật
        await updateExtendContractStatusClose(contract.contractId, dateTerminate)

        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công!',
          text: 'Trạng thái hợp đồng đã được cập nhật thành công.',
          confirmButtonText: 'OK'
        })

        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Cập nhật thất bại!',
          text: error.message || 'Có lỗi xảy ra khi cập nhật trạng thái hợp đồng.',
          confirmButtonText: 'OK'
        })
      }
    }
  }

  return (
    <div>
      {room && contract ? (
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
                  className="feather feather-log-out">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </div>
              <h5 style={{ marginLeft: '10px' }}>Gia hạn hợp đồng - {room ? room.name : <>ko co </>}</h5>
            </div>
          </ModalHeader>

          <ModalBody>
            <form method="POST" className="needs-validation" id="extend-form" noValidate>
              <input type="hidden" name="_token" value="Rnugp3YmswGzKc2B0QhX2KMwQE5DcqUCiRdKXQtJ" />
              <div className="row g-2">
                {/* Input Ngày gia hạn */}
                <div className="col-6">
                  <div className="input-group">
                    <div className="form-floating">
                      <input
                        className="form-control date-flat-picker flatpickr-input active"
                        name="date_contract"
                        id="date_contract"
                        placeholder="Gia hạn đền ngày"
                        data-format="date"
                        value={formatDate(contract.closeContract)}
                        readOnly
                        required
                      />
                      <label htmlFor="date_contract">Ngày gia hạn</label>
                    </div>
                    <label className="input-group-text" htmlFor="date_contract">
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
                        className="feather feather-calendar">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </label>
                  </div>
                  <div className="invalid-feedback">Vui lòng nhập ngày gia hạn</div>
                </div>

                {/* Input Gia hạn đến */}
                <div className="col-6">
                  <div className="input-group">
                    <div className="form-floating">
                      <Flatpickr
                        className="form-control date-flat-picker flatpickr-input"
                        name="date_terminate"
                        id="date_terminate"
                        placeholder="Gia hạn đền ngày"
                        data-format="date"
                        required
                        value={dateTerminate}
                        onChange={handleDateChange}
                        options={{
                          allowInput: true,
                          dateFormat: 'm-d-Y'
                        }}
                      />

                      <label htmlFor="date_terminate">Gia hạn đến</label>
                    </div>
                    <label className="input-group-text" htmlFor="date_terminate">
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
                        className="feather feather-calendar">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </label>
                  </div>
                  <div className="invalid-feedback">Vui lòng nhập ngày muốn gia hạn</div>
                </div>

                {/* Input Giá thuê */}
                <div className="col-12">
                  <div className="input-group">
                    <div className="form-floating">
                      <input
                        className="form-control currency"
                        name="room_amount"
                        id="room_amount"
                        data-format="numeric"
                        min="0"
                        placeholder="Nhập giá thuê"
                        required
                        readOnly
                        value={contract.price?.toLocaleString('vi-VN')}
                      />

                      <label htmlFor="room_amount">Giá thuê (đ)</label>
                      <div className="invalid-feedback">Vui lòng nhập giá thuê</div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
              Gia hạn
            </Button>
          </ModalFooter>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ModalExtendContract
