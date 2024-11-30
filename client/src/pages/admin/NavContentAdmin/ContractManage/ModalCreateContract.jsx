import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Form } from 'react-bootstrap'
import AddIcon from '@mui/icons-material/Add'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import {
  getRoomById,
  getServiceRoombyRoomId,
  updateSerivceRoom,
  DeleteRoomServiceByid,
  createRoomService
} from '~/apis/roomAPI'
import { getPhuongXa, getQuanHuyen, getTinhThanh } from '~/apis/addressAPI'
import { getMotelById } from '~/apis/motelAPI'
import { getAllMotelDevices, getAllDeviceByRomId, deleteRoomDevice, insertRoomDevice } from '~/apis/deviceAPT'
import { getContractTemplatesByMotelId, createTenant, createContract } from '~/apis/contractTemplateAPI'
function ModalCreateContract({ toggleModal, modalOpen, roomId, motelId }) {
  const username = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).username : null
  const [room, setRoom] = useState({})
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [motelServices, setMotelServices] = useState([])
  const [motelDevices, setMotelSDevices] = useState([])
  const [motel, setMotel] = useState({})
  const [roomServices, setRoomServices] = useState([])
  const [roomDevices, setRoomDevices] = useState([])
  const [contractTemplates, setcontractTemplates] = useState([])
  const [tenant, setTenant] = useState({
    fullname: '',
    phone: '',
    CCCD: '',
    email: '',
    birthday: null,
    gender: 'OTHER', // 'MALE', 'FEMALE', hoặc 'OTHER'
    address: '',
    job: '',
    licenseDate: null,
    placeOfLicense: '',
    frontPhoto: '',
    backPhoto: '',
    role: true,
    temporaryResidence: false,
    informationVerify: false
  })

  const [contract, setContract] = useState({
    roomId: null,
    tenantId: null,
    username: username,
    contracttemplateId: null,
    brokerId: null,
    moveinDate: new Date().toISOString().slice(0, 10),
    leaseTerm: '',
    closeContract: '',
    description: '',
    debt: 0.0,
    price: 0.0,
    deposit: 0.0,
    collectioncycle: '1',
    createdate: new Date().toISOString().slice(0, 10),
    signcontract: 'Khách chưa ký',
    language: 'Tiếng Việt',
    countTenant: 1,
    status: 'ACTIVE' // Giá trị có thể là 'ACTIVE', 'ENDED', hoặc 'IATExpire'
  })

  // Hàm lấy dữ liệu phòng từ server
  const fetchDataRoom = async (roomId) => {
    if (roomId) {
      try {
        const response = await getRoomById(roomId) // Lấy dữ liệu phòng từ API
        if (response) {
          setRoom(response)
          fetchDataServiceRooms(roomId)
          fetchDataDeviceRooms(roomId)
          setContract((prevContract) => ({
            ...prevContract,
            roomId: response.roomId, // Cập nhật dữ liệu phòng vào contract,
            price: response.price,
            deposit: response.price
          }))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  //ham lay dich vu phong
  const fetchDataServiceRooms = async (roomId) => {
    try {
      const roomServicesResponse = await getServiceRoombyRoomId(roomId) // Lấy danh sách dịch vụ mà phòng đang sử dụng

      const updatedServices = motelServices.map((service) => {
        // Tìm dịch vụ tương ứng trong roomServicesResponse
        const roomService = roomServicesResponse.find(
          (roomService) => roomService.service.motelServiceId === service.motelServiceId
        )
        return {
          ...service,
          isSelected: !!roomService, // Đánh dấu checked nếu dịch vụ có trong roomServicesResponse
          quantity: roomService ? roomService.quantity : 0,
          roomId: roomId,
          roomServiceId: roomService ? roomService.roomServiceId : null
          // Gắn quantity nếu tồn tại, nếu không thì mặc định là 0
        }
      })

      setRoomServices(updatedServices) // Cập nhật danh sách dịch vụ
    } catch (error) {
      console.log(error)
    }
  }

  //ham lay tai san phong
  const fetchDataDeviceRooms = async (roomId) => {
    try {
      const roomDevicesResponse = await getAllDeviceByRomId(roomId) // Lấy danh sách dịch vụ mà phòng đang sử dụng
      const updatedDevices = motelDevices.map((device) => {
        // Tìm dịch vụ tương ứng trong roomServicesResponse
        const roomDevice = roomDevicesResponse.result.find(
          (roomDevice) => roomDevice.motelDevice.motel_device_id === device.motel_device_id
        )
        return {
          ...device,
          isSelected: !!roomDevice, // Đánh dấu checked nếu dịch vụ có trong roomServicesResponse
          quantity: roomDevice ? roomDevice.quantity : 0,
          roomId: roomId,
          roomDeviceId: roomDevice ? roomDevice.roomDeviceId : null
        }
      })
      setRoomDevices(updatedDevices)
    } catch (error) {
      console.log(error)
    }
  }

  // Hàm onChange để cập nhật các trường trong contract
  const handleContractChange = (e) => {
    const { name, value } = e.target

    setContract((prev) => {
      const newContract = { ...prev }

      if (name === 'price') {
        // Loại bỏ các ký tự không phải số và cập nhật giá trị thô
        const numericValue = value.replace(/[^0-9]/g, '') // Chỉ giữ lại số
        newContract.price = numericValue // Lưu giá trị thô vào state
      } else if (name === 'deposit') {
        // Loại bỏ các ký tự không phải số và cập nhật giá trị thô
        const numericValue = value.replace(/[^0-9]/g, '') // Chỉ giữ lại số
        newContract.deposit = numericValue // Lưu giá trị thô vào state
      } else if (name === 'leaseTerm' && prev.moveinDate) {
        // Nếu thay đổi leaseTerm, tính toán closeContract
        const monthsToAdd = parseInt(value, 10)
        if (!isNaN(monthsToAdd)) {
          const moveinDate = new Date(prev.moveinDate)
          moveinDate.setMonth(moveinDate.getMonth() + monthsToAdd)
          newContract.closeContract = moveinDate.toISOString().slice(0, 10)
        }
        newContract.leaseTerm = value // Cập nhật giá trị leaseTerm
      } else {
        newContract[name] = value // Cập nhật các trường khác
      }

      return newContract
    })
  }

  // Hàm onChange để cập nhật các trường trong tenant
  const handleTenantChange = (event) => {
    const { name, value } = event.target
    setTenant((prevTenant) => ({
      ...prevTenant,
      [name]: value
    }))
  }

  //lay tinh thanh
  const fetchCity = async () => {
    getTinhThanh()
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching provinces:', error)
      })
  }

  // Hàm để lấy danh sách quận/huyện theo tỉnh/thành từ API
  const fetchDistricts = async (provinceId) => {
    getQuanHuyen(provinceId)
      .then((response) => {
        if (response.data.error === 0) {
          setDistricts(response.data.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching wards:', error)
      })
  }
  // Hàm để lấy danh sách xa/phuong theo quận/huyện từ API
  const fetchWards = async (districId) => {
    getPhuongXa(districId)
      .then((response) => {
        if (response.data.error === 0) {
          setWards(response.data.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching wards:', error)
      })
  }

  // Hàm xử lý khi chọn tỉnh/thành
  const handleProvinceChange = (event) => {
    const provinceId = Number(event.target.value)
    setSelectedProvince(provinceId)
    fetchDistricts(provinceId)
  }

  // Hàm xử lý khi chọn quận/huyện
  const handleDistrictChange = (event) => {
    const districtId = Number(event.target.value)
    setSelectedDistrict(districtId)
    console.log(districtId)
    fetchWards(districtId)
  }

  // Hàm xử lý khi chọn xa/phuong
  const handleWardChange = (event) => {
    setSelectedWard(Number(event.target.value))
  }

  //lay dich vu cua motel va lay motel
  const fetchMotelServices = async (motelId) => {
    try {
      const response = await getMotelById(motelId)
      if (response.data && response.data.code === 200 && response.data.result && response.data.result.motelServices) {
        setMotelServices(response.data.result.motelServices)
        setMotel(response.data.result)
      } else {
        setMotelServices([])
      }
    } catch (error) {
      console.error('Error fetching motel services:', error)
      setMotelServices([])
    }
  }

  //lay tai san cua motel
  const fetchMotelDevices = async (motelId) => {
    try {
      const response = await getAllMotelDevices(motelId)
      if (response.code === 200) {
        setMotelSDevices(response.result)
      } else {
        setMotelSDevices([])
      }
    } catch (error) {
      console.error('Error fetching motel services:', error)
      setMotelServices([])
    }
  }

  //lay tempalte contract cua motel
  const fetchMotelContractTemplate = async (motelId) => {
    try {
      const response = await getContractTemplatesByMotelId(motelId)
      if (response) {
        setcontractTemplates(response)
      } else {
        setcontractTemplates([])
      }
    } catch (error) {
      console.error('Error fetching motel services:', error)
      setMotelServices([])
    }
  }

  // Hàm để xử lý khi người dùng nhấn nút "Áp dụng dịch vụ"
  const handleApplyServices = async () => {
    try {
      // Lọc các dịch vụ không được chọn (để xóa) và các dịch vụ được chọn (để thêm/cập nhật)
      const servicesToDelete = roomServices.filter((service) => !service.isSelected && service.roomServiceId)
      const servicesToUpdateOrAdd = roomServices.filter((service) => service.isSelected)
      console.log(servicesToDelete)

      // Xử lý xóa các dịch vụ không được chọn
      const deletePromises = servicesToDelete.map((service) => DeleteRoomServiceByid(service.roomServiceId))

      // Xử lý thêm hoặc cập nhật các dịch vụ được chọn
      const updateOrAddPromises = servicesToUpdateOrAdd.map((service) => {
        const serviceUpdateData = {
          roomServiceId: service.roomServiceId || null,
          roomId: room.roomId, // ID của phòng hiện tại
          serviceId: service.motelServiceId, // ID của dịch vụ
          quantity: service.quantity || 1 // Giá trị mặc định là 1 nếu quantity chưa có
        }

        return service.roomServiceId
          ? updateSerivceRoom(service.roomServiceId, serviceUpdateData) // Cập nhật nếu đã tồn tại
          : createRoomService(serviceUpdateData) // Thêm mới nếu chưa tồn tại
      })

      // Chờ tất cả các yêu cầu API hoàn tất
      await Promise.all([...deletePromises, ...updateOrAddPromises])

      // Hiển thị thông báo thành công
      Swal.fire({
        icon: 'success',
        title: 'Thông báo',
        text: 'Tất cả dịch vụ phòng đã được cập nhật thành công!'
      })

      // Cập nhật danh sách dịch vụ trong phòng
      fetchDataServiceRooms(room.roomId)
    } catch (error) {
      console.error('Lỗi khi cập nhật dịch vụ phòng:', error)
    }
  }

  // Hàm để xử lý khi người dùng nhấn nút "Áp dụng device"
  const handleApplyDevice = async () => {
    try {
      const DevicesToDelete = roomDevices.filter((device) => !device.isSelected && device.roomDeviceId)
      const DevicesToUpdateOrAdd = roomDevices.filter((device) => device.isSelected)
      // Xử lý xóa các dịch vụ không được chọn
      const deletePromises = DevicesToDelete.map((device) => deleteRoomDevice(device.roomId, device.motel_device_id))
      console.log(DevicesToDelete)
      console.log(DevicesToUpdateOrAdd)
      // Xử lý thêm hoặc cập nhật các dịch vụ được chọn
      const updateOrAddPromises = DevicesToUpdateOrAdd.map((device) => {
        const DeviceUpdateData = {
          roomDeviceId: device.roomDeviceId || null,
          room: {
            roomId: device.roomId
          }, // phòng hiện tại
          motelDevice: {
            motel_device_id: device.motel_device_id
          },
          quantity: device.quantity || 1 // Giá trị mặc định là 1 nếu quantity chưa có
        }
        console.log(DeviceUpdateData)

        return device.roomDeviceId ? console.log() : insertRoomDevice(DeviceUpdateData) // Thêm mới nếu chưa tồn tại
      })

      // Chờ tất cả các yêu cầu API hoàn tất
      await Promise.all([...deletePromises, ...updateOrAddPromises])

      // Hiển thị thông báo thành công
      Swal.fire({
        icon: 'success',
        title: 'Thông báo',
        text: 'Tất cả Device phòng đã được cập nhật thành công!'
      })

      // Cập nhật danh sách Device trong phòng
      fetchDataServiceRooms(room.roomId)
    } catch (error) {
      console.error('Lỗi khi cập nhật Device phòng:', error)
    }
  }

  const InsertTenant = async (roomId, tenant) => {
    try {
      const response = await createTenant(roomId, tenant)
      setTenant(response.result) // Lưu tenant vào state nếu cần
      return response.result // Trả về thông tin tenant
    } catch (error) {
      console.error('Error saving tenant:', error)
      throw error // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi
    }
  }

  const InsertContract = async (contract) => {
    try {
      const response = await createContract(contract)
      return response // Trả về kết quả từ tạo hợp đồng
    } catch (error) {
      console.error('Error saving contract:', error)
      throw error // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi
    }
  }

  // Hàm xử lý submit
  const handleSubmit = async () => {
    const form = document.getElementById('add-contract-form')

    if (!form.checkValidity()) {
      form.classList.add('was-validated')
    } else {
      if (!room) {
        Swal.fire({
          icon: 'error',
          title: 'Thông báo',
          text: 'Chưa chọn phòng nào!'
        })
      } else {
        try {
          // Hiển thị thông báo tạo hợp đồng
          Swal.fire({
            icon: 'info',
            title: 'Thông báo',
            text: 'Đang xử lý...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading()
            }
          })

          handleApplyServices()
          handleApplyDevice()
          //Thêm tenant và lấy tenantResponse
          const tenantResponse = await InsertTenant(room.roomId ? room.roomId : '', tenant)

          //Cập nhật contract với tenantId
          const updatedContract = {
            ...contract,
            tenantId: tenantResponse.tenantId
          }

          // Gửi yêu cầu tạo hợp đồng với dữ liệu đã cập nhật
          const contractResponse = await InsertContract(updatedContract)
          console.log(contractResponse)
          // Thông báo thành công
          Swal.fire({
            icon: 'success',
            title: 'Thông báo',
            text: 'Tạo hợp đồng thành công!'
          })
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        } catch (error) {
          // Thông báo lỗi
          Swal.fire({
            icon: 'error',
            title: 'Thông báo',
            text: 'Có lỗi xảy ra trong quá trình xử lý!'
          })
          console.error(error)
        }
      }
    }
  }

  useEffect(() => {
    const handlFristData = () => {
      console.log(roomId)

      if (roomId && motelId) {
        fetchDataRoom(roomId)
        fetchMotelServices(motelId)
        fetchMotelDevices(motelId)
        fetchMotelContractTemplate(motelId)
        fetchCity()
      }
    }

    handlFristData()
  }, [roomId, motelId]) // Chỉ chạy lại khi roomId hoặc motelId thay đổi

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
                  boxShadow: '0 0 0 .25rem rgb(76 175 80 / 16%)',
                  opacity: 1,
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
                  className="feather feather-book" // class đổi thành className
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <h5 style={{ marginLeft: '10px', marginTop: '10px' }}>
                Thêm hợp đồng mới - `{room ? room.name : <>ko co </>}`
              </h5>
            </div>
          </ModalHeader>

          <ModalBody style={{ maxHeight: '500px', overflowY: 'auto', padding: '20px' }}>
            <form className="needs-validation" noValidate id="add-contract-form">
              <div className="row">
                <div className="col-lg-12 col-sm-12">
                  <Form.Group className="mb-3" controlId="thoihanhopdong">
                    <Form.Label>
                      <div className="title-item-small">
                        <b>Thời hạn hợp đồng:</b>
                      </div>
                    </Form.Label>
                    <Form.Select name="leaseTerm" value={contract.leaseTerm} onChange={handleContractChange} required>
                      <option value="">--Thời hạn hợp đồng--</option>
                      {[
                        { value: '1', label: '1 tháng' },
                        { value: '2', label: '2 tháng' },
                        { value: '3', label: '3 tháng' },
                        { value: '4', label: '4 tháng' },
                        { value: '5', label: '5 tháng' },
                        { value: '6', label: '6 tháng' },
                        { value: '7', label: '7 tháng' },
                        { value: '8', label: '8 tháng' },
                        { value: '9', label: '9 tháng' },
                        { value: '10', label: '10 tháng' },
                        { value: '11', label: '11 tháng' },
                        { value: '12', label: '1 năm' },
                        { value: '18', label: '1 năm, 6 tháng' },
                        { value: '24', label: '2 năm' },
                        { value: '32', label: '3 năm' },
                        { value: '48', label: '4 năm' },
                        { value: '60', label: '5 năm' }
                      ].map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                    <div className="row">
                      <div className="col-6 mt-3">
                        <Form.Label>Ngày vào ở</Form.Label>
                        <Form.Control
                          type="date"
                          name="moveinDate"
                          placeholder="Ngày vào ở"
                          value={contract.moveinDate}
                          onChange={handleContractChange}
                          required
                        />
                      </div>
                      <div className="col-6 mt-3">
                        <Form.Label>Ngày kết thúc hợp đồng</Form.Label>
                        <Form.Control
                          type="date"
                          name="closeContract"
                          placeholder="Ngày vào ở"
                          value={contract.closeContract}
                          onChange={handleContractChange}
                          required
                        />
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="thongitnkhach">
                    <div className="title-item-small mb-2">
                      <b>Thông tin khách thuê:</b>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <Form.Control
                          type="number"
                          name="countTenant"
                          min={1}
                          placeholder="Số lượng thành viên"
                          value={contract.countTenant}
                          onChange={handleContractChange}
                          required
                        />
                      </div>
                      <div className="col-6 mt-3">
                        <Form.Control
                          type="text"
                          name="fullname"
                          value={tenant.fullname}
                          onChange={handleTenantChange}
                          placeholder="Tên người ở"
                          required
                        />
                      </div>
                      <div className="col-6 mt-3">
                        <Form.Control
                          type="text"
                          name="phone"
                          value={tenant.phone}
                          onChange={handleTenantChange}
                          placeholder="Số điện thoại"
                          required
                        />
                      </div>
                      <div className="col-12 mt-3">
                        <Form.Control type="text" name="cccd" placeholder="CMND/CCCD" />
                      </div>
                      <div className="col-6 mt-3">
                        <Form.Label>Ngày Sinh</Form.Label>
                        <Form.Control type="date" name="dateBth" />
                      </div>
                      <div className="col-6 mt-3">
                        <Form.Label>Giới Tính</Form.Label>
                        <Form.Select name="gioitinh">
                          <option value="">--Giới tính--</option>
                          <option value="nam">Nam</option>
                          <option value="nữ">Nữ</option>
                        </Form.Select>
                      </div>
                      <div className="col-6 mt-3">
                        <Form.Select
                          name="tinhTP"
                          value={selectedProvince}
                          onChange={(e) => {
                            handleProvinceChange(e)
                          }}>
                          <option value="">Chọn Tỉnh/Thành phố</option>
                          {provinces.map((province, index) => (
                            <option key={index} value={province.id}>
                              {province.full_name}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className="col-6 mt-3">
                        <Form.Select
                          name="quanHuyen"
                          value={selectedDistrict}
                          onChange={(e) => {
                            handleDistrictChange(e)
                          }}>
                          <option value="">Chọn quận/huyện</option>
                          {districts.map((district, index) => (
                            <option key={index} value={district.id}>
                              {district.full_name}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className="col-12 mt-3">
                        <Form.Select
                          name="phuongXa"
                          value={selectedWard}
                          onChange={(e) => {
                            handleWardChange(e)
                          }}>
                          <option value="">Chọn Phường/Xã</option>
                          {wards.map((ward, index) => (
                            <option key={index} value={ward.id}>
                              {ward.full_name}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className="col-12 mt-3">
                        <Form.Control type="text" name="diachi" placeholder="Địa chỉ" />
                      </div>
                      <div className="col-12 mt-3">
                        <Form.Control type="text" name="congviec" placeholder="Công việc hiện tại" />
                      </div>
                      <div className="col-6 mt-3">
                        <Form.Label>Ngày cấp</Form.Label>
                        <Form.Control type="date" name="ngaycapCCCD" />
                      </div>
                      <div className="col-6 mt-3">
                        <Form.Label>Nơi cấp</Form.Label>
                        <Form.Control type="text" name="noicapCCCD" />
                      </div>
                      <div className="col-6 mt-3">
                        <Form.Label>Ảnh mặt trước CCCD/CMND</Form.Label>
                        <Form.Control type="file" accept="image/*" />
                      </div>
                      <div className="col-6 mt-3">
                        <Form.Label>Ảnh mặt sau CCCD/CMND</Form.Label>
                        <Form.Control type="file" accept="image/*" />
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="dichvusudung">
                    <div className="title-item-small">
                      <b>Dịch vụ sử dụng</b>
                      <i className="des">Thêm dịch vụ sử dụng như: điện, nước, rác, wifi...</i>
                    </div>
                    <div className="price-items-checkout-layout">
                      {motelServices ? (
                        motelServices.map((service, index) => (
                          <div className="item" key={index}>
                            {/* Checkbox để chọn dịch vụ */}
                            <div className="item-check-name">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={roomServices.some(
                                  (s) => s.motelServiceId === service.motelServiceId && s.isSelected
                                )} // Kiểm tra nếu dịch vụ đã tồn tại và isSelected = true
                                onChange={(e) => {
                                  const isChecked = e.target.checked
                                  setRoomServices((prevServices) => {
                                    const existingService = prevServices.find(
                                      (s) => s.motelServiceId === service.motelServiceId
                                    )

                                    if (isChecked) {
                                      // Nếu checked, thêm/cập nhật dịch vụ với `isSelected = true`
                                      if (existingService) {
                                        // Dịch vụ đã tồn tại => cập nhật `isSelected = true`
                                        return prevServices.map((s) =>
                                          s.motelServiceId === service.motelServiceId
                                            ? { ...s, isSelected: true, quantity: s.quantity || 1 }
                                            : s
                                        )
                                      } else {
                                        // Thêm dịch vụ mới
                                        return [
                                          ...prevServices,
                                          { ...service, isSelected: true, quantity: 1 } // Mặc định quantity = 1
                                        ]
                                      }
                                    } else {
                                      // Nếu unchecked, chỉ cập nhật `isSelected = false` (không loại bỏ dịch vụ)
                                      if (existingService) {
                                        return prevServices.map((s) =>
                                          s.motelServiceId === service.motelServiceId ? { ...s, isSelected: false } : s
                                        )
                                      }
                                      return prevServices // Không làm gì nếu dịch vụ chưa tồn tại
                                    }
                                  })
                                }}
                              />
                              <label>
                                <b>{service.nameService}</b>
                                <p>
                                  Giá: <b>{service.price.toLocaleString('vi-VN')}đ</b> /{' '}
                                  {service.chargetype === 'Theo người' ? 'người' : service.chargetype}
                                </p>
                              </label>
                            </div>

                            {/* Nhập số lượng dịch vụ */}
                            <div className="item-value">
                              <div className="input-group">
                                <input
                                  className="form-control"
                                  readOnly
                                  min="0"
                                  type="number"
                                  placeholder="Nhập giá trị"
                                  value={
                                    roomServices.find((s) => s.motelServiceId === service.motelServiceId)?.quantity || 0
                                  } // Lấy quantity từ roomServices nếu dịch vụ tồn tại
                                  disabled={
                                    !roomServices.some(
                                      (s) => s.motelServiceId === service.motelServiceId && s.isSelected
                                    )
                                  } // Vô hiệu hóa nếu dịch vụ chưa được chọn
                                  onChange={(e) => {
                                    const newQuantity = parseInt(e.target.value, 10) || 0
                                    setRoomServices((prevServices) =>
                                      prevServices.map((s) =>
                                        s.motelServiceId === service.motelServiceId
                                          ? { ...s, quantity: newQuantity }
                                          : s
                                      )
                                    )
                                  }}
                                />
                                <label style={{ fontSize: '12px' }} className="input-group-text">
                                  {service.chargetype === 'Theo người' ? 'người' : service.chargetype}
                                </label>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="giatrihopdong">
                    <div className="title-item-small mb-2">
                      <b>Thông tin giá trị hợp đồng:</b>
                      <i className="des">Giá tiền phòng và tiền cọc</i>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <Form.Control
                          type="text"
                          name="price"
                          placeholder="Giá thuê"
                          value={contract.price ? Number(contract.price).toLocaleString('vi-VN') : ''}
                          onChange={handleContractChange}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <Form.Control
                          type="text"
                          name="deposit"
                          placeholder="Tiền cọc"
                          value={contract.deposit ? Number(contract.deposit).toLocaleString('vi-VN') : ''}
                          onChange={handleContractChange}
                          required
                        />
                      </div>
                      <div className="col-12 mt-3">
                        <Form.Select
                          name="collectioncycle"
                          value={contract.collectioncycle}
                          onChange={handleContractChange}
                          required>
                          <option value="">--Chu kỳ thu tiền--</option>
                          {[
                            { value: '0', label: 'Tùy chỉnh' },
                            { value: '1', label: '1 tháng' },
                            { value: '2', label: '2 tháng' },
                            { value: '3', label: '3 tháng' },
                            { value: '4', label: '4 tháng' },
                            { value: '5', label: '5 tháng' },
                            { value: '6', label: '6 tháng' },
                            { value: '7', label: '7 tháng' },
                            { value: '8', label: '8 tháng' },
                            { value: '9', label: '9 tháng' },
                            { value: '10', label: '10 tháng' },
                            { value: '11', label: '11 tháng' },
                            { value: '12', label: '1 năm' },
                            { value: '18', label: '1 năm, 6 tháng' },
                            { value: '24', label: '2 năm' },
                            { value: '32', label: '3 năm' },
                            { value: '48', label: '4 năm' },
                            { value: '60', label: '5 năm' }
                          ].map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="mauvanban">
                    <div className="title-item-small  mb-2">
                      <b>Chọn mẫu văn bản hợp đồng</b>
                      <i className="des">Mẫu văn bản hợp đồng dùng khi in</i>
                    </div>
                    <Form.Select
                      name="mauhopdong"
                      required
                      onChange={(e) => {
                        const selectedTemplateId = e.target.value
                        console.log(selectedTemplateId)

                        setContract((prevContract) => ({
                          ...prevContract,
                          contracttemplateId: selectedTemplateId || null // Cập nhật giá trị hoặc để null nếu không chọn
                        }))
                      }}>
                      <option value="">--Mẫu văn bản hợp đồng--</option>
                      {contractTemplates ? (
                        contractTemplates.map((contractTemplate, index) => (
                          <option key={index} value={contractTemplate.contractTemplateId}>
                            {contractTemplate.templatename}
                          </option>
                        ))
                      ) : (
                        <></>
                      )}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="description">
                    <div className="title-item-small  mb-2">
                      <b>Ghi chú</b>
                      <i className="des">Những ghi chú lưu ý cho hợp đồng này</i>
                    </div>
                    <Form.Control as="textarea" rows={3} onChange={handleContractChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="device">
                    <div className="title-has-icon">
                      <div className="icon">
                        <svg
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="css-i6dzq1">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                          <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                      </div>
                      <div className="title-item-small">
                        <b>Tài sản của phòng</b>
                        <i className="des">Các tài sản trong quá trình thuê phòng</i>
                      </div>
                    </div>
                    <div className="asset-checkout-layout">
                      {motelDevices ? (
                        motelDevices.map((motelDevice, index) => (
                          <div className="item" key={index}>
                            <div className="item-check-name">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={roomDevices.some(
                                  (d) => d.motel_device_id === motelDevice.motel_device_id && d.isSelected
                                )} // Kiểm tra nếu dịch vụ đã tồn tại và isSelected = true
                                onChange={(e) => {
                                  const isChecked = e.target.checked
                                  setRoomDevices((prevDevices) => {
                                    const existingService = prevDevices.find(
                                      (d) => d.motel_device_id === motelDevice.motel_device_id
                                    )

                                    if (isChecked) {
                                      // Nếu checked, thêm/cập nhật dịch vụ với `isSelected = true`
                                      if (existingService) {
                                        // Dịch vụ đã tồn tại => cập nhật `isSelected = true`
                                        return prevDevices.map((d) =>
                                          d.motel_device_id === motelDevice.motel_device_id
                                            ? { ...d, isSelected: true, quantity: d.quantity || 1 }
                                            : d
                                        )
                                      } else {
                                        // Thêm dịch vụ mới
                                        return [
                                          ...prevDevices,
                                          { ...motelDevice, isSelected: true, quantity: 1 } // Mặc định quantity = 1
                                        ]
                                      }
                                    } else {
                                      // Nếu unchecked, chỉ cập nhật `isSelected = false` (không loại bỏ dịch vụ)
                                      if (existingService) {
                                        return prevDevices.map((d) =>
                                          d.motel_device_id === motelDevice.motel_device_id
                                            ? { ...d, isSelected: false }
                                            : d
                                        )
                                      }
                                      return prevDevices // Không làm gì nếu dịch vụ chưa tồn tại
                                    }
                                  })
                                }}
                              />
                              <label htmlFor="room_check_asset_344">
                                <b>{motelDevice.deviceName}</b>
                                <p>
                                  Giá trị: <b>{motelDevice.value.toLocaleString('vi-VN')}đ</b> / {motelDevice.unit}
                                </p>
                              </label>
                            </div>
                            <div className="item-value">
                              <div className="input-group">
                                <input
                                  className="form-control"
                                  min="0"
                                  type="number"
                                  readOnly
                                  value={
                                    roomDevices.find((s) => s.motel_device_id === motelDevice.motel_device_id)
                                      ?.quantity || 0
                                  } // Lấy quantity từ roomDevices nếu dịch vụ tồn tại
                                  disabled={
                                    !roomDevices.some(
                                      (d) => d.motel_device_id === motelDevice.motel_device_id && d.isSelected
                                    )
                                  } // Vô hiệu hóa nếu dịch vụ chưa được chọn
                                  onChange={(e) => {
                                    const newQuantity = parseInt(e.target.value, 10) || 0
                                    setRoomDevices((prevServices) =>
                                      prevServices.map((d) =>
                                        d.motel_device_id === motelDevice.motel_device_id
                                          ? { ...d, quantity: newQuantity }
                                          : d
                                      )
                                    )
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="moigioi">
                    <div className="title-item-small mb-2">
                      <b>Môi giới</b>
                      <i className="des">Chọn người giới thiệu hợp đồng và phí môi giới</i>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <Form.Select name="dsmoigioi">
                          <option value="">--Danh sách môi giới--</option>
                        </Form.Select>
                      </div>
                      <div className="col-6 mt-3">
                        <Form.Select name="hoahong">
                          <option value="">--Mức hoa hồng--</option>
                        </Form.Select>
                      </div>
                      <div className="col-6 mt-3">
                        <Form.Control type="number" name="tienhoahong" />
                      </div>
                      <div className="mt-3">
                        <Form.Check type="switch" id="custom-switch" label="Tạo phiếu chi" />
                      </div>
                    </div>
                  </Form.Group>
                </div>
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Đóng
            </Button>
            <Button color="primary" onClick={() => handleSubmit()}>
              <AddIcon /> Thêm hợp đồng mới
            </Button>
          </ModalFooter>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ModalCreateContract
