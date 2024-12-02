import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState, useEffect } from 'react'
import { getRoomById } from '~/apis/roomAPI'
import { getContractByIdRoom2 } from '~/apis/contractTemplateAPI'
import { deleteContractByRoomId } from '~/apis/contractTemplateAPI'
import { deleteTenant } from '~/apis/tenantAPI'
import Flatpickr from 'react-flatpickr'
import Swal from 'sweetalert2'

function ModalEndContract({ toggleModal, modalOpen, roomId }) {
  const [room, setRoom] = useState({})
  const [contract, setContract] = useState({})
  const [dateTerminate, setDateTerminate] = useState('')

  // Danh sách công việc mặc định
  const defaultTasks = [
    {
      id: 1,
      title: 'Lập hóa đơn tháng cuối',
      description:
        'Hệ thống phát hiện bạn chưa tạo hóa đơn tháng cuối. Vui lòng tạo và thu hóa đơn tháng cuối trước khi kết thúc hợp đồng',
      completed: false
    },
    {
      id: 2,
      title: 'Kiểm tra tài sản',
      description: 'Kiểm tra lại tài sản, thiết bị trong trước khi kết thúc hợp đồng',
      completed: false
    }
  ]

  const [tasks, setTasks] = useState([...defaultTasks])

  // Hàm đánh dấu công việc đã hoàn thành
  const handleTaskComplete = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed: true } : task)))
  }

  const completedTasks = tasks.filter((task) => task.completed).length

  // Reset danh sách công việc mỗi khi mở modal
  useEffect(() => {
    if (modalOpen) {
      setTasks([...defaultTasks])
    }
  }, [modalOpen])

  // Hàm lấy dữ liệu phòng từ server
  const fetchDataRoom = async (roomId) => {
    if (roomId) {
      try {
        const response = await getRoomById(roomId)
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
    const formattedDate = formatDate(date[0])
    setDateTerminate(formattedDate)
  }

  // Hàm lấy dữ liệu hợp đồng từ server
  const fetchDataContract = async (roomId) => {
    if (roomId) {
      try {
        const response = await getContractByIdRoom2(roomId)
        if (response) {
          setContract(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    const handlFristData = () => {
      if (roomId) {
        fetchDataRoom(roomId)
        fetchDataContract(roomId)
      }
    }

    handlFristData()
  }, [roomId])

  useEffect(() => {
    const today = new Date()
    const formattedDate = formatDate(today)
    setDateTerminate(formattedDate)
  }, [])

  const handleSubmit = async () => {
    // Kiểm tra nếu còn công việc chưa hoàn thành
    const allTasksCompleted = tasks.every((task) => task.completed)
    if (!allTasksCompleted) {
      Swal.fire({
        icon: 'warning',
        title: 'Công việc chưa hoàn thành!',
        text: 'Vui lòng hoàn thành tất cả các công việc trước khi kết thúc hợp đồng.',
        confirmButtonText: 'OK'
      })
      return // Ngăn hành động tiếp theo
    }

    if (roomId) {
      try {
        // Gọi hàm deleteContractByRoomId và deleteTenant
        await deleteContractByRoomId(roomId) // Xóa hợp đồng

        await deleteTenant(roomId) // Xóa người thuê

        // Hiển thị thông báo thành công nếu cả hai hành động xóa thành công
        Swal.fire({
          icon: 'success',
          title: 'Kết thúc thành công!',
          text: 'Hợp đồng đã được kết thúc thành công.',
          confirmButtonText: 'OK'
        })

        setTimeout(() => {
          window.location.reload() // Tải lại trang sau 1 giây
        }, 1000)
      } catch (error) {
        // Hiển thị thông báo lỗi nếu có bất kỳ lỗi nào trong quá trình xóa
        Swal.fire({
          icon: 'error',
          title: 'Kết thúc thất bại!',
          text: error.message || 'Có lỗi xảy ra khi kết thúc hợp đồng.',
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
            <h5>Kết thúc hợp đồng - {room ? room.name : <>Không có thông tin</>}</h5>
          </ModalHeader>
          <ModalBody>
            <form method="POST" className="needs-validation" id="extend-form" noValidate>
              <input type="hidden" name="_token" value="Rnugp3YmswGzKc2B0QhX2KMwQE5DcqUCiRdKXQtJ" />
              <div className="row g-2">
                {/* Input Ngày gia hạn */}
                <div className="col-12">
                  <div className="input-group">
                    <div className="form-floating">
                      <Flatpickr
                        className="form-control date-flat-picker flatpickr-input active"
                        name="date_contract"
                        id="date_contract"
                        placeholder="Gia hạn đền ngày"
                        data-format="date"
                        required
                        value={dateTerminate}
                        onChange={handleDateChange}
                        options={{
                          allowInput: true,
                          dateFormat: 'd-m-Y'
                        }}
                      />
                      <label htmlFor="date_contract">Ngày kết thúc hợp đồng</label>
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
                  <div className="invalid-feedback">Vui lòng nhập ngày kết thúc hợp đồng</div>
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
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    </div>
                    <div className="des flex-1">
                      <b>Thông tin:</b>
                      <p>
                        - Kết thúc hợp đồng là hành động kết thúc khi khách muốn chuyển đi. Sau khi kết thúc bạn có thể
                        &quot;Lập hợp đồng&quot;cho khách mới
                      </p>
                      <p>
                        - Các thông tin như <b>Khách thuê, hợp đồng cũ</b> sẽ xóa bỏ để sẳn sàng cho hợp đồng mới.
                      </p>
                    </div>
                  </div>
                </div>
                <div id="task-container" className="col-12 mt-4">
                  <h5 className="title text-center mt-3" style={{ fontSize: '22px' }}>
                    Công việc cần làm trước khi kết thúc hợp đồng
                    <p>
                      ({completedTasks}/{tasks.length})
                    </p>
                  </h5>
                  {tasks.map((task) => (
                    <div key={task.id} className="task-item d-flex">
                      <div className="flex-shrink-1">
                        <div className={`icon ${task.completed ? 'done' : 'doing'}`}>
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
                            className="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </div>
                      </div>
                      <div className="item flex-shrink-1" style={{ flex: 1 }}>
                        <h6 className="label">{task.title}</h6>
                        <p className="des">{task.description}</p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ marginTop: '10px', width: '100%' }}
                          disabled={task.completed}
                          onClick={() => handleTaskComplete(task.id)}>
                          {task.completed ? 'Đã hoàn thành' : 'Hoàn thành công việc'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Đóng
            </Button>
            <Button color="primary" onClick={handleSubmit}>
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
              Kết thúc
            </Button>
          </ModalFooter>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ModalEndContract
