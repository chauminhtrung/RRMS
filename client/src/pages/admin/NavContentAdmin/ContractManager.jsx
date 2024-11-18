import { useEffect } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'

import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ReactTabulator } from 'react-tabulator'
import { useState } from 'react'

import { Modal, Button, Form } from 'react-bootstrap'
import { getPhuongXa, getQuanHuyen, getTinhThanh } from '~/apis/addressAPI'
import { getRoomByMotelId, getRoomById } from '~/apis/roomAPI'
import { getMotelById } from '~/apis/motelAPI'
import { getAllMotelDevices } from '~/apis/deviceAPT'
import { getContractTemplatesByMotelId, createTenant, createContract } from '~/apis/contractTemplateAPI'
import Swal from 'sweetalert2'
const ContractManager = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  const username = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).username : null
  const { motelId } = useParams()
  const [show, setShow] = useState(false)
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [rooms, setRooms] = useState([])
  const [room, setRoom] = useState(null)
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
    collection_cycle: '',
    createdate: new Date().toISOString().slice(0, 10),
    Sign_contract: 'Khách chưa ký',
    language: 'Tiếng Việt',
    countTenant: 0,
    status: 'ACTIVE' // Giá trị có thể là 'ACTIVE', 'ENDED', hoặc 'IATExpire'
  })
  const [motelServices, setMotelServices] = useState([])
  const [motelDevices, setMotelSDevices] = useState([])
  const [motel, setMotel] = useState({})
  const [selectedRoomId, setSelectedRoomId] = useState(null)
  const [contractTemplates, setcontractTemplates] = useState([])
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    if (motelId) {
      fetchMotelServices(motelId)
      fetchMotelDevices(motelId)
      fetchMotelContractTemplate(motelId)
      setIsAdmin(true)
      fetchCity()
      fetchRooms()
    }
  }

  // Hàm onChange để cập nhật các trường trong tenant
  const handleTenantChange = (event) => {
    const { name, value } = event.target
    setTenant((prevTenant) => ({
      ...prevTenant,
      [name]: value
    }))
  }


  const InsertTenant = async (tenant) => {
    try {
      const response = await createTenant(tenant)
      setTenant(response.result) // Lưu tenant vào state nếu cần

      // Cập nhật tenantUsername trong contract
      setContract((prevContract) => ({
        ...prevContract,
        tenantId: response.result.tenantId // Gán giá trị tenantUsername từ kết quả trả về
      }))

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

  const fetchRooms = async () => {
    //neu co motelId tren URL
    if (motelId) {
      try {
        const dataRoom = await getRoomByMotelId(motelId)
        setRooms(dataRoom)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const dataRoom = await getRoomByMotelId(motel[0].motelId)
        setRooms(dataRoom)
      } catch (error) {
        console.log(error)
      }
    }
  }

  //lay dich vu cua motel va lay motel
  const fetchMotelServices = async (id) => {
    try {
      const response = await getMotelById(id)
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
  const fetchMotelDevices = async (id) => {
    try {
      const response = await getAllMotelDevices(id)
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
  const fetchMotelContractTemplate = async (id) => {
    try {
      const response = await getContractTemplatesByMotelId(id)
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

  const handleRoomClick = async (roomId) => {
    setSelectedRoomId(roomId === selectedRoomId ? null : roomId) // Nếu phòng đã chọn thì bỏ chọn, nếu không thì chọn phòng mới
    if (roomId === selectedRoomId) {
      setRoom(null)
      return
    }
    if (roomId) {
      try {
        const dataRoom = await getRoomById(roomId)
        console.log(dataRoom)

        setRoom(dataRoom)
        setContract((prevContract) => ({
          ...prevContract,
          roomId: dataRoom.roomId, // Cập nhật dữ liệu phòng vào contract,
          price: dataRoom.price,
          deposit: dataRoom.price
        }))
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

          // Thêm tenant và cập nhật tenantUsername vào contract
          const tenantResponse = await InsertTenant(tenant)
          console.log(tenantResponse)

          // Cập nhật tenantUsername v  ào contract
          setContract((prev) => ({
            ...prev,
            tenantId: tenantResponse.tenantId // Giả sử API trả về `username`
          }))

          // Tạo hợp đồng sau khi tenant được thêm thành công

          //const contractResponse = await InsertContract(contract)
          console.log(contract)

          // Thông báo thành công
          Swal.fire({
            icon: 'success',
            title: 'Thông báo',
            text: 'Tạo hợp đồng thành công!'
          })

          // Đóng modal
          handleClose()
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

  const columns = [
    { title: 'STT', field: 'STT', hozAlign: 'center', minWidth: 40, editor: 'input' }, // Đặt minWidth để tránh cột bị quá nhỏ
    { title: 'Tên Phòng', field: 'name', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Giá Thuê', field: 'giathue', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Mức Giá Tiền Cọc', field: 'mucgiathue', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Chu Kỳ Thu', field: 'chukythu', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Mẫu Hợp Đồng', field: 'mauhopdong', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Ngày Lập', field: 'ngaylap', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Ngày Vào Ở', field: 'ngayvaoo', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Thời Hạn Hợp Đồng', field: 'thoihanhopdong', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Ký Hợp Đồng', field: 'kyhopdong', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Ngôn Ngữ', field: 'ngonngu', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Tình Trạng', field: 'tinhtrang', hozAlign: 'center', minWidth: 40, editor: 'input' }
  ]

  const data = [
    {
      STT: '1',
      name: 'Phòng A202',
      giathue: '5,000,000 VND',
      mucgiathue: '4,000,000 VND',
      chukythu: '1 Tháng',
      mauhopdong: 'Hợp Đồng Điện Tử',
      ngaylap: '18-01-2024',
      ngayvaoo: '01-02-2024',
      thoihanhopdong: '12 tháng',
      kyhopdong: 'Nguyễn Tấn Tài',
      ngonngu: 'Việt Nam',
      tinhtrang: 'Đã Hoàn Thành'
    }
  ]

  const options = {
    height: '500px', // Chiều cao của bảng
    movableColumns: true, // Cho phép di chuyển cột
    resizableRows: true, // Cho phép thay đổi kích thước hàng
    movableRows: true,
    resizableColumns: true, // Cho phép thay đổi kích thước cột
    resizableColumnFit: true,
    layout: 'fitColumns',
    responsiveLayout: 'collapse',
    rowHeader: {
      formatter: 'responsiveCollapse',
      width: 30,
      minWidth: 30,
      hozAlign: 'center',
      resizable: false,
      headerSort: false
    }
  }

  useEffect(() => {
    setIsAdmin(true)
    console.log(isNavAdmin)
  }, [])
  return (
    <div>
      <NavAdmin
        setmotels={setmotels}
        motels={motels}
        setIsAdmin={setIsAdmin}
        setIsNavAdmin={setIsNavAdmin}
        isNavAdmin={true}
      />
      <div
        style={{
          backgroundColor: '#fff',
          padding: '15px 15px 15px 15px',
          borderRadius: '10px',
          margin: '0 10px 10px 10px'
        }}></div>

      <div style={{ marginLeft: '15px', marginRight: '10px' }}>
        <Box className="header-item">
          <h4 className="title-item">
            Tất Cả Hợp Đồng
            <i className="des">Danh sách hợp đồng được tạo khi thêm phiên bản ở mới</i>
          </h4>
          <Box display="flex" alignItems="center" style={{ width: '20%' }}></Box>
        </Box>
      </div>

      <div
        className="header-table header-item"
        style={{ padding: '10px 10px', marginLeft: '15px', marginRight: '10px' }}>
        <div className="d-flex">
          <div className="icon">
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
              className="feather feather-filter">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span id="filter-count">0</span>
          </div>
          <div className="d-flex" style={{ flexWrap: 'wrap' }}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="is_active"
                data-value="status"
                value="is_active"
              />
              <label className="form-check-label" htmlFor="is_active">
                Trong thời hạn hợp đồng
              </label>
              <span className="count-filter active success">0</span>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="is_empty" data-value="status" value="is_empty" />
              <label className="form-check-label" htmlFor="is_empty">
                Đang báo kết thúc
              </label>
              <span className="count-filter empty warning">0</span>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="is_empty" data-value="status" value="is_empty" />
              <label className="form-check-label" htmlFor="is_empty">
                Sắp hết hạn
              </label>
              <span className="count-filter empty error">0</span>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="is_empty" data-value="status" value="is_empty" />
              <label className="form-check-label" htmlFor="is_empty">
                Đã quá hạn
              </label>
              <span className="count-filter empty ">0</span>
            </div>
          </div>
        </div>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="primary" onClick={handleShow}>
            Thiết lập hợp đồng
          </Button>

          <Modal show={show} onHide={handleClose} dialogClassName="custom-modal" size="xl">
            {/* size modal*/}
            <Modal.Header closeButton>
              <Modal.Title>Thiết lập hợp đồng</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '500px', overflowY: 'auto', padding: '20px' }}>
              <form className="needs-validation" noValidate id="add-contract-form">
                <div className="row">
                  <div className="col-lg-7 col-sm-12">
                    <div className="col-12 mb-2">
                      <div className="title-item-small">
                        <b>Danh sách phòng</b>
                        <i className="des">Danh sách phòng có thể lập hợp đồng</i>
                      </div>
                    </div>
                    <div style={{ position: 'sticky', top: '20px' }}>
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
                  <div className="col-lg-5 col-sm-12">
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
                            min={0}
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
                          motelServices.map((motelService, index) => (
                            <div className="item" key={index}>
                              <div className="item-check-name">
                                <input
                                  className="form-check-input"
                                  id="room_check_price_item_23660"
                                  type="checkbox"
                                  value="1"
                                  name="price_items[23660][is_selected]"
                                />

                                <label htmlFor="room_check_price_item_23660">
                                  <b>{motelService.nameService}</b>
                                  <p>
                                    Giá: <b>{motelService.price.toLocaleString('vi-VN')}đ</b> /{' '}
                                    {motelService.chargetype === 'Theo người' ? 'người' : motelService.chargetype}
                                  </p>
                                </label>
                              </div>

                              <div className="item-value">
                                <div className="input-group">
                                  <input
                                    className="form-control"
                                    id="new_contract_room_price_item_23660"
                                    min="0"
                                    type="number"
                                    placeholder="Nhập giá trị"
                                    value="0"
                                    name="price_items[23660][value][]"
                                  />
                                  <label
                                    style={{ fontSize: '12px' }}
                                    className="input-group-text"
                                    htmlFor="new_contract_room_price_item_23660">
                                    {motelService.chargetype === 'Theo người' ? 'người' : motelService.chargetype}
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
                            name="collection_cycle"
                            value={contract.collection_cycle}
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
                                  id="room_check_asset_344"
                                  type="checkbox"
                                  value="1"
                                  name="assets[344][is_selected]"
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
                                    id="room_asset_344"
                                    min="0"
                                    type="number"
                                    placeholder="Nhập số lương"
                                    value="1"
                                    name="assets[344][quantity]"
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
            </Modal.Body>
            <Modal.Footer>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="primary" type="submit" onClick={() => handleSubmit()}>
                  Thêm hợp đồng mới
                </Button>
              </Box>
            </Modal.Footer>
          </Modal>
        </Box>
      </div>
      <div className="mt-3" style={{ marginLeft: '15px', marginRight: '10px' }}>
        <ReactTabulator
          className="my-custom-table rounded" // Thêm lớp tùy chỉnh nếu cần
          columns={columns}
          data={data}
          options={options}
          placeholder={<h1></h1>} // Sử dụng placeholder tùy chỉnh
        />
      </div>
    </div>
  )
}

export default ContractManager
