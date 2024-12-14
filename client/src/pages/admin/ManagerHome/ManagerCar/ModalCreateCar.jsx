import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState, useEffect } from 'react'
import { getRoomById } from '~/apis/roomAPI'
import Swal from 'sweetalert2'
import { createCar, getCarByCarId, updateCar } from '~/apis/carAPI'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '~/configs/firebaseConfig' // Đường dẫn đến file firebaseConfig.js

function ModalCreateCar({ open, onClose, roomId, carId }) {
  const [room, setRoom] = useState({})
  const [selectedImage, setSelectedImage] = useState(null)

  const [car, setCar] = useState({
    name: '',
    number: '',
    image: '',
    roomId: roomId
  })

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCar((prev) => ({
      ...prev,
      [name]: value // Cập nhật giá trị tương ứng với name của input
    }))
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0]

    if (file) {
      // Tạo tham chiếu đến Firebase Storage
      const storageRef = ref(storage, `cars/${file.name}`)

      try {
        // Upload file lên Firebase Storage
        const snapshot = await uploadBytes(storageRef, file)

        // Lấy URL của file vừa upload
        const downloadURL = await getDownloadURL(snapshot.ref)

        // Cập nhật URL vào state
        setSelectedImage(downloadURL)
        setCar((prev) => ({
          ...prev,
          image: downloadURL // Lưu URL ảnh vào đối tượng car
        }))

        console.log('Hình ảnh đã tải lên thành công:', downloadURL)
      } catch (error) {
        console.error('Lỗi khi tải lên hình ảnh:', error)
      }
    }
  }

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

  const fetchDataCar = async (carId) => {
    if (carId) {
      try {
        const response = await getCarByCarId(carId) // Lấy dữ liệu phòng từ API
        console.log(response)

        if (response) {
          setCar(response.data)
          setSelectedImage(response.data.image)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSubmit = async () => {
    const form = document.getElementById('add-car-form')

    if (!form.checkValidity()) {
      form.classList.add('was-validated')
    } else {
      try {
        if (roomId) {
          if (carId === 'Create') {
            setCar((prev) => ({
              ...prev,
              roomId: room.roomId
            }))

            await createCar(car)

            Swal.fire({
              icon: 'success',
              title: 'Tạo thành công!',
              text: 'Bạn đã thêm thông tin xe thành công.',
              confirmButtonText: 'Đóng'
            })

            setTimeout(() => {
              window.location.reload() // Tải lại trang sau 1 giây
            }, 1000)
          } else {
            setCar((prev) => ({
              ...prev,
              roomId: room.roomId
            }))

            await updateCar(carId, car)

            Swal.fire({
              icon: 'success',
              title: 'update thành công!',
              text: 'Bạn đã update thông tin xe thành công.',
              confirmButtonText: 'Đóng'
            })

            setTimeout(() => {
              window.location.reload() // Tải lại trang sau 1 giây
            }, 1000)
          }
        }
      } catch (error) {
        console.log(error)

        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra!',
          text: 'Không thể thêm thông tin xe, vui lòng thử lại sau.',
          confirmButtonText: 'Đóng'
        })
      }
    }
  }

  useEffect(() => {
    if (roomId) {
      fetchDataRoom(roomId)
    }
    if (carId !== 'Create') {
      fetchDataCar(carId)
    } else {
      setCar({
        name: '',
        number: '',
        image: '',
        roomId: roomId
      })
      setSelectedImage(null)
    }
    console.log(carId)
  }, [roomId, carId])

  return (
    <div>
      {room ? (
        <>
          <Modal isOpen={open} toggle={onClose}>
            <ModalHeader toggle={onClose}>
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
                <h5 style={{ marginLeft: '10px' }}>Thêm thông tin xe - {room ? room.name : <>Không có</>}</h5>
              </div>
            </ModalHeader>

            <ModalBody>
              <form method="POST" className="needs-validation" id="add-car-form" noValidate>
                <div className="row g-2">
                  <div className="col-12 mt-2">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="car_name"
                        placeholder="Nhập tên loại xe"
                        value={car.name} // Liên kết với state
                        onChange={handleInputChange} // Lắng nghe thay đổi
                        required
                      />
                      <label htmlFor="car_name">
                        Tên loại xe <span style={{ color: 'red' }}>*</span>
                      </label>
                      <div className="invalid-feedback">Vui lòng nhập tên loại xe</div>
                    </div>
                  </div>

                  <div className="col-12 mt-2">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="number"
                        id="car_number_plate"
                        placeholder="Nhập biển số xe"
                        value={car.number} // Liên kết với state
                        onChange={handleInputChange} // Lắng nghe thay đổi
                        required
                      />
                      <label htmlFor="car_number_plate">
                        Biển số xe <span style={{ color: 'red' }}>*</span>
                      </label>
                      <div className="invalid-feedback">Vui lòng nhập biển số xe</div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="title-item-small">
                      <b>Hình ảnh</b>
                      <i className="des">Hình ảnh</i>
                    </div>
                  </div>

                  <div id="car-image" className="image-upload-simple">
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      name="images"
                      id="imageInput"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <div className="container-upload" style={{ backgroundColor: '#eee' }}>
                      <div
                        className="placeholder __add-more-imge"
                        style={{
                          display: 'grid',
                          cursor: 'pointer',
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                          margin: '-10px',
                          backgroundColor: '#eee'
                        }}
                        onClick={() => document.getElementById('imageInput').click()}>
                        {selectedImage ? (
                          <img
                            src={selectedImage}
                            alt="Selected"
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'cover',
                              borderRadius: '8px'
                            }}
                          />
                        ) : (
                          <>
                            <div className="icon-upload" style={{ margin: 'auto' }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-upload-cloud">
                                <polyline points="16 16 12 12 8 16"></polyline>
                                <line x1="12" y1="12" x2="12" y2="21"></line>
                                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                <polyline points="16 16 12 12 8 16"></polyline>
                              </svg>
                            </div>
                            <label style={{ textDecoration: 'underline', color: 'black' }} htmlFor="imageInput">
                              Chọn tối đa 1 ảnh
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </ModalBody>

            <ModalFooter>
              <button onClick={handleSubmit} type="button" className="btn btn-info waves-effect text-white">
                Tạo mới
              </button>
              <button onClick={onClose} className="btn btn-danger">
                Hủy
              </button>
            </ModalFooter>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ModalCreateCar
