import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState, useEffect } from 'react'
import { getRoomById, updateContractStatus } from '~/apis/roomAPI'
import { getContractByIdRoom2 } from '~/apis/contractTemplateAPI'
import Swal from 'sweetalert2'
function ModalCancelReportContract({ toggleModal, modalOpen, roomId }) {
  const [room, setRoom] = useState({})
  const [contract, setContract] = useState({})

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
  const fetchDataContract = async (roomId) => {
    if (roomId) {
      try {
        const response = await getContractByIdRoom2(roomId) // Lấy dữ liệu phòng từ API
        if (response) {
          setContract(response)
          console.log(response)
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
        fetchDataContract(roomId)
      }
    }

    handlFristData()
  }, [roomId]) // Chỉ chạy lại khi roomId hoặc motelId thay đổi

  const ContractStatus = {
    REPORTEND: 'ReportEnd',
    ACTIVE: 'ACTIVE'
    // Các trạng thái khác
  }
  const handleSubmit = async () => {
    if (roomId) {
      try {
        // Gọi hàm updateContractStatus và truyền roomId, "ReportEnd" và dateTerminate
        await updateContractStatus(roomId, ContractStatus.ACTIVE, null)

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
              <h5 style={{ marginLeft: '10px' }}>Hủy báo kết thúc hợp đồng - {room ? room.name : <>ko co </>}</h5>
            </div>
          </ModalHeader>

          <ModalBody>
            <div
              className="info-cancel-terminate d-flex"
              style={{
                backgroundColor: '#ff572247',
                border: '1px solid #ff5722',
                borderRadius: '5px',
                padding: '10px'
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
                className="feather feather-alert-triangle">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div style={{ marginLeft: '20px' }}>
                <h6>
                  Khách thuê đã báo kết thúc hợp đồng vào{' '}
                  <span className="date-tick-terminate">
                    {contract ? formatDate(contract.reportcloseContract) : <>ko co </>}
                  </span>{' '}
                  trước đó
                </h6>
                <p>Hiện khách thuê vẫn muốn tiếp tục thuê nên bạn muốn hủy báo kết thúc hợp đồng ?</p>
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
              Hủy báo kết thúc hợp đồng
            </Button>
          </ModalFooter>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ModalCancelReportContract
