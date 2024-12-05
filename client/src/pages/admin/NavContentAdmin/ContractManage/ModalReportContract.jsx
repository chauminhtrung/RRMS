import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState, useEffect } from 'react'
import { getRoomById, updateContractStatus } from '~/apis/roomAPI'
import Flatpickr from 'react-flatpickr'
import Swal from 'sweetalert2'
function ModalReportContract({ toggleModal, modalOpen, roomId }) {
  const [room, setRoom] = useState({})
  // State lưu trữ ngày kết thúc hợp đồng
  const [dateTerminate, setDateTerminate] = useState('')

  // Hàm xử lý khi người dùng thay đổi ngày kết thúc hợp đồng
  const handleDateChange = (date) => {
    // Flatpickr trả về mảng, ta lấy phần tử đầu tiên (là một đối tượng Date)
    const formattedDate = formatDate(date[0]) // Chuyển đối tượng Date thành chuỗi với định dạng dd-mm-yyyy
    setDateTerminate(formattedDate)
  }

  // Hàm format ngày theo định dạng dd-mm-yyyy
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  // Sử dụng useEffect để đặt giá trị mặc định là ngày hiện tại khi component được load
  useEffect(() => {
    const today = new Date()
    const formattedDate = formatDate(today)
    setDateTerminate(formattedDate)
  }, [])
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

  useEffect(() => {
    const handlFristData = () => {
      if (roomId) {
        fetchDataRoom(roomId)
      }
    }

    handlFristData()
  }, [roomId]) // Chỉ chạy lại khi roomId hoặc motelId thay đổi

  const ContractStatus = {
    REPORTEND: 'ReportEnd'
    // Các trạng thái khác
  }
  const handleSubmit = async () => {
    const form = document.getElementById('terminate-ticket-form')

    if (!form.checkValidity()) {
      form.classList.add('was-validated')
    } else {
      if (roomId) {
        try {
          console.log(roomId)

          // Gọi hàm updateContractStatus và truyền roomId, "ReportEnd" và dateTerminate
          await updateContractStatus(roomId, ContractStatus.REPORTEND, dateTerminate)

          // Hiển thị thông báo thành công
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
          // Nếu có lỗi, hiển thị thông báo lỗi
          Swal.fire({
            icon: 'error',
            title: 'Cập nhật thất bại!',
            text: error.message || 'Có lỗi xảy ra khi cập nhật trạng thái hợp đồng.',
            confirmButtonText: 'OK'
          })
        }
      }
    }
  }

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
                  className="feather feather-log-out">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </div>
              <h5 style={{ marginLeft: '10px' }}>Báo kết thúc hợp đồng - {room ? room.name : <>ko co </>}</h5>
            </div>
          </ModalHeader>

          <ModalBody>
            <form method="POST" className="needs-validation" id="terminate-ticket-form" noValidate>
              <input type="hidden" name="_token" value="jPw8W4SBjnpqB7GYUEyt0mxgm24JRPzqWpJpAa9h" />
              <div className="row g-2">
                <div className="terminate-setting">
                  <div className="col-12">
                    <div className="input-group">
                      <div className="form-floating">
                        <Flatpickr
                          className="form-control date-flat-picker flatpickr-input active"
                          name="date_tick_terminate"
                          id="date_tick_terminate_form"
                          placeholder="Ngày kết thúc hợp đồng"
                          data-format="date"
                          required
                          value={dateTerminate}
                          onChange={handleDateChange}
                          options={{
                            allowInput: true,
                            dateFormat: 'd-m-Y'
                          }}
                        />
                        <label htmlFor="date_tick_terminate_form">Ngày báo kết thúc hợp đồng</label>
                      </div>
                      <label className="input-group-text" htmlFor="date_tick_terminate_form">
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
                    <div className="invalid-feedback">Vui lòng nhập ngày báo kết thúc hợp đồng</div>
                  </div>
                  <div className="col-12 mt-2">
                    <div className="loz-alert info">
                      <div className="icon flex-0">
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
                          className="feather feather-info">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="16" x2="12" y2="12" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                      </div>
                      <div className="des flex-1">
                        <b>Thông tin:</b>
                        <p>
                          - Khi khách muốn chuyển đi khách sẽ báo trước ngày chuyển đi. Bạn sẽ ghi nhận ngày để chuẩn bị
                          tìm khách mới.
                        </p>
                        <p>
                          - Khi phòng/căn hộ/giường ở trạng thái &quot;Đang báo kết thúc&quot; hợp đồng sau hành động
                          này. Khách mới có thể cọc giữ chỗ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="task-container"></div>
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
                className="feather feather-bell">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              Báo kết thúc hợp đồng
            </Button>
          </ModalFooter>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ModalReportContract
