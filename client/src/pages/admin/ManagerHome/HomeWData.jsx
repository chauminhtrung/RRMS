/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip } from 'react-tooltip'
import { useEffect, useState, useRef } from 'react'
import Flatpickr from 'react-flatpickr'
import { Vietnamese } from 'flatpickr/dist/l10n/vn'
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import { Link, useParams } from 'react-router-dom'
import 'react-tabulator/lib/styles.css' // required styles
import 'react-tabulator/lib/css/tabulator.min.css' // theme
import { ReactTabulator } from 'react-tabulator'
import axios from 'axios'
import { env } from '~/configs/environment'
import Swal from 'sweetalert2'
import ExportToExcel from './ExportToExcel' // Import component ExportToExcel
import {
  getRoomByMotelId,
  createRoom,
  createRoomService,
  getServiceRoombyRoomId,
  getRoomById,
  DeleteRoomByid,
  updateSerivceRoom,
  DeleteRoomServiceByid,
  updateRoom
} from '~/apis/roomAPI'
import { deleteReserveAPlace } from '~/apis/ReserveAPlaceAPI'
import { getContractByIdRoom2, updateContractStatusClose, updateContractStatusClose2 } from '~/apis/contractTemplateAPI'
import { Modal } from 'bootstrap' // Import Bootstrap Modal API
import {
  
  deleteRoomDevice,
  getAllDeviceByRomId,
  getAllMotelDevices,
  insertRoomDevice
} from '~/apis/deviceAPT'
import RentRoomModal from '../NavContentAdmin/RentRoomModal'
import ModalCreateContract from '../NavContentAdmin/ContractManage/ModalCreateContract'
import ReserveAPlaceModal from './ReserveAPlace/ReserveAPlaceModal'
import ReserveAPlaceDetail from './ReserveAPlace/ReserveAPlaceDetail'
import ModalReportContract from '../NavContentAdmin/ContractManage/ModalReportContract'
import ModalCancelReportContract from '../NavContentAdmin/ContractManage/ModalCancelReportContract'
import ModalEndContract from '../NavContentAdmin/ContractManage/ModalEndContract'
import ModalChangeRoom from '../NavContentAdmin/ContractManage/ModalChangeRoom'
import ModalExtendContract from '../NavContentAdmin/ContractManage/ModalExtendContract'
import ModalListCar from './ManagerCar/ModalListCar'
const HomeWData = ({ Motel }) => {
  const { motelId, roomId } = useParams()
  const [rooms, setRooms] = useState([])
  // State quản lý trạng thái của checkbox
  const [motelServices, setMotelServices] = useState([])
  const [showMenu, setShowMenu] = useState(null)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const menuRef = useRef(null) // Tham chiếu đến menu
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const [additionItems, setAdditionItems] = useState([])
  const [invoiceData, setInvoiceData] = useState({
    invoiceCreateMonth: new Date().toISOString().slice(0, 7),
    invoiceCreateDate: new Date().toISOString().slice(0, 10),
    dueDate: '',
    dueDateofmoveinDate: '',
    serviceDetails: []
  })
  const [formData, setFormData] = useState({
    motelId: motelId ? motelId : Motel[0].motelId,
    deposit: null,
    debt: null,
    moveInDate: null,
    contractDuration: null,
    status: false,
    finance: 'wait',
    countTenant: 0,
    paymentCircle: null,
    name: '',
    group: 'a',
    area: '',
    price: '',
    invoiceDate: 1,
    prioritize: 'Tất cả',
    selectedServices: [] // Thêm trường này để lưu các dịch vụ đã chọn
  })

  const addNewItem = () => {
    const newItem = {
      id: Date.now(),
      addition: 1,
      additionValue: '',
      additionReason: ''
    }
    setAdditionItems([...additionItems, newItem])
  }
  const [contract, setContract] = useState({})

  const removeItem = (id) => {
    setAdditionItems(additionItems.filter((item) => item.id !== id))
  }

  const handleChange = (id, field, value) => {
    const formattedValue = field === 'additionValue' 
      ? value.replace(/\D/g, '') // Loại bỏ mọi ký tự không phải số
      : value;
  
    setAdditionItems(
      additionItems.map((item) =>
        item.id === id ? { ...item, [field]: formattedValue } : item
      )
    );
  };
   
  

  const calculateTotalAddition = () => {
    return additionItems.reduce((total, item) => {
      const rawValue = parseFloat(item.additionValue.replace(/\./g, '')) || 0;
      return total + (item.addition === 1 ? rawValue : -rawValue);
    }, 0);
  };
  
  

  const [roomSerivces, setRoomSerivces] = useState([])
  const [room, setRoom] = useState()
  const [note, setNote] = useState('') // Tạo state để lưu ghi chú
  const [device, setdevice] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpenContract, setModalOpenContract] = useState(false)
  const [modalOpenReAPlace, setModalOpenReAPlace] = useState(false)
  const [detailOpenReAPlace, setDetailOpenReAPlace] = useState(false)
  const [modalOpenReportContract, setModalOpenReportContract] = useState(false)
  const [modalOpenCancelReportContract, setModalOpenCancelReportContract] = useState(false)
  const [modalOpenEndContract, setModalOpenEndContract] = useState(false)
  const [modalOpenChangeRoom, setModalOpenChangeRoom] = useState(false)
  const [modalOpenExtendContract, setModalOpenExtendContract] = useState(false)
  const [modalOpenCar, setModalOpenCar] = useState(false)

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const toggleModalContract = () => {
    setModalOpenContract(!modalOpenContract)
  }

  const toggleModalReAPlace = () => {
    setModalOpenReAPlace(!modalOpenReAPlace)
  }
  const toggleDetailReAPlace = () => {
    setDetailOpenReAPlace(!detailOpenReAPlace)
  }

  const toggleReportContract = () => {
    setModalOpenReportContract(!modalOpenReportContract)
  }

  const toggleCancelReportContract = () => {
    setModalOpenCancelReportContract(!modalOpenCancelReportContract)
  }

  const toggleEndContract = () => {
    setModalOpenEndContract(!modalOpenEndContract)
  }

  const toggleChangeRoom = () => {
    setModalOpenChangeRoom(!modalOpenChangeRoom)
  }

  const toggleEntendContract = () => {
    setModalOpenExtendContract(!modalOpenExtendContract)
  }

  const toggleCar = () => {
    setModalOpenCar(!modalOpenCar)
  }

  // Hàm xử lý nhấn ngoài menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Kiểm tra xem nhấn ngoài menu hay không
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    fetchRooms()
    fetchDevices()
    UpdateContractStatusClose(ContractStatus.IATExpire, 10) // Gọi API update trạng thái
    UpdateContractStatusClose2(ContractStatus.ACTIVE, 10) // Gọi API update trạng thái
  }, [])

  // Hàm xử lý thay đổi trạng thái checkbox
  const handleCheckboxChange = (serviceId) => {
    setRoomSerivces((prevState) =>
      prevState.map((service) => {
        if (service.service.motelServiceId === serviceId) {
          const isSelected = !service.isSelected

          if (isSelected) {
            setInvoiceData((prev) => ({
              ...prev,
              serviceDetails: [...prev.serviceDetails, { roomServiceId: service.service.motelServiceId }]
            }))
          } else {
            setInvoiceData((prev) => ({
              ...prev,
              serviceDetails: prev.serviceDetails.filter(
                (detail) => detail.roomServiceId !== service.service.motelServiceId
              )
            }))
          }

          return { ...service, isSelected }
        }
        return service
      })
    )
  }

  //lay hop dong cua room do
  const fetchRoomContract = async (id) => {
    try {
      const response = await getContractByIdRoom2(id)

      if (response) {
        setContract(response)

        setInvoiceData((prev) => ({
          ...prev,
          moveinDate: new Date(response.moveinDate).toISOString().slice(0, 10),
          contractId: response.contractId,
          price: response.price
        }))
      } else {
        setContract({})
      }
    } catch (error) {
      console.error(error)
      setContract({})
    }
  }

  //ham lay dich vu phong
  const fetchDataServiceRooms = async (id) => {
    try {
      const response = await getServiceRoombyRoomId(id)
      console.log('Service Room Response:', response)

      // Thêm kiểm tra để đảm bảo dữ liệu hợp lệ
      if (response && Array.isArray(response)) {
        const updatedServices = response.map((service) => ({
          ...service,
          isSelected: true, // Default selected
          quantity: service.quantity || 1, // Đảm bảo quantity có giá trị hợp lệ
          totalPrice: (service.quantity || 1) * (service.service.price || 0),
          service: {
            ...service.service,
            price: service.service.price || 0 // Đảm bảo price không undefined
          }
        }))
        setRoomSerivces(updatedServices)
      } else {
        throw new Error('Invalid service room data')
      }
    } catch (error) {
      console.error('Error fetching room services:', error)
    }
  }

  //device
  // const handleChangeQuantityRoomDevice = async (roomId, motel_device_id, quantity) => {
  //   console.log(roomId, motel_device_id, quantity)

  //   // const data = {
  //   //   roomId: roomId,
  //   //   motel_device_id: motel_device_id,
  //   //   quantity: quantity
  //   // }
  //   // const response = await changeQuantityRoomDevice(data)
  //   // if (response.result == true) {
  //   //   Swal.fire({
  //   //     icon: 'success',
  //   //     title: 'Thành công',
  //   //     text: 'change quantity successfully!'
  //   //   })
  //   // } else {
  //   //   Swal.fire({
  //   //     icon: 'error',
  //   //     title: 'Thành công',
  //   //     text: 'change quantity failed!'
  //   //   })
  //   // }
  // }

  // Hàm lấy dữ liệu phòng từ server
  const fetchDataRooms = async (id) => {
    try {
      const response = await getRoomById(id) // Lấy dữ liệu phòng từ API
      setRoom((prevRoom) => ({
        ...prevRoom,
        ...response, // Cập nhật thông tin phòng từ response
        description: response.description || '' // Cập nhật description nếu có
      }))
      setNote(response.description || '') // Cập nhật note với description phòng
    } catch (error) {
      console.log(error)
      console.log(note)
    }
  }

  // Hàm lấy dữ liệu phòng từ server
  const UpdateContractStatusClose = async (StartDate, newStatus) => {
    try {
      updateContractStatusClose(StartDate, newStatus)
    } catch (error) {
      console.log(error)
    }
  }

  // Hàm lấy dữ liệu phòng từ server
  const UpdateContractStatusClose2 = async (StartDate, newStatus) => {
    try {
      updateContractStatusClose2(StartDate, newStatus)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        priceItems: {
          ...prevData.priceItems,
          [name]: checked ? value : ''
        }
      }))
    } else {
      setFormData({
        ...formData,
        [name]:
          name === 'price'
            ? parseFloat(value) // chuyển đổi 'price' thành float
            : ['area', 'invoiceDate'].includes(name)
            ? parseInt(value, 10) // chuyển đổi 'area' và 'invoiceDate' thành integer
            : value // các trường còn lại là chuỗi
      })
    }
  }
  const applyRoomDevice = async (roomParam, motel_device_idParam) => {
    const data = {
      room: roomParam,
      motelDevice: {
        motel_device_id: motel_device_idParam
      },
      quantity: 1
    }
    const response = await insertRoomDevice(data)
    if (response.code == 200) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'RoomDevice apply successfully!'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: 'Không đủ số lượng vui lòng bổ xung!'
      })
    }
  }

  const cancelRoomDevice = async (roomId, motel_device_id) => {
    const response = await deleteRoomDevice(roomId, motel_device_id)
    if (response.result == true) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'RoomDevice cancel successfully!'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: 'RoomDevice cancel failed!'
      })
    }
  }

  // Tạo phòng
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = document.getElementById('add-room-form')

    if (!form.checkValidity()) {
      form.classList.add('was-validated')
    } else {
      createRoom({ ...formData, selectedServices: formData.selectedServices })
        .then((response) => {
          const roomId = response.roomId

          // Cập nhật lại selectedServices với roomId và lưu từng dịch vụ
          const saveSelectedServices = formData.selectedServices.map((service) =>
            createRoomService({
              roomId: roomId,
              serviceId: service.serviceId,
              quantity: service.quantity
            })
          )

          // Chờ tất cả các lời gọi `createRoomService` hoàn thành
          Promise.all(saveSelectedServices)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Thông báo',
                text: 'Room created successfully!'
              })

              // Reset lại formData và trạng thái validation
              setFormData({
                name: '',
                group: '',
                area: '',
                price: '',
                invoiceDate: 1,
                prioritize: 'Tất cả',
                selectedServices: []
              })
              form.classList.remove('was-validated')

              setTimeout(() => {
                window.location.reload()
              }, 1000)
              UpdateContractStatusClose(ContractStatus.IATExpire, 10) // Gọi API update trạng thái
              // Cập nhật danh sách phòng
              fetchRooms()

              // Đóng modal bằng Bootstrap Modal API
              const modalElement = document.getElementById('addRoom')
              const modal = Modal.getInstance(modalElement)
              modal.hide()

              // Xóa tất cả các backdrop (nếu có nhiều backdrop)
              const backdropElements = document.querySelectorAll('.modal-backdrop')
              backdropElements.forEach((backdrop) => backdrop.remove())
            })
            .catch((error) => {
              Swal.fire({
                icon: 'error',
                title: 'Thông báo',
                text: 'Error saving services for the room.'
              })
              console.error('Error creating services:', error)
            })
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Thông báo',
            text: 'Error Room motel.'
          })
          console.error('Error creating motel:', error)
        })
    }
  }

  //sua dich vu phong handleSubmitServiceRoom
  //Hàm để xử lý khi người dùng nhấn nút "Áp dụng dịch vụ"
  const handleApplyServices = async () => {
    // Lọc các dịch vụ không được chọn
    const servicesToDelete = roomSerivces.filter((service) => !service.isSelected)
    const servicesToUpdate = roomSerivces.filter((service) => service.isSelected)

    // Gọi API để xóa các dịch vụ không được chọn
    for (const service of servicesToDelete) {
      console.log(service)
      DeleteRoomServiceByid(service.roomServiceId)
    }

    for (const service of servicesToUpdate) {
      let SerivceUpdate = {
        roomServiceId: service.roomServiceId,
        roomId: service.room.roomId,
        serviceId: service.service.motelServiceId,
        quantity: service.quantity
      }
      console.log(SerivceUpdate)

      updateSerivceRoom(service.roomServiceId, SerivceUpdate)
      console.log('Service can update', service)
    }

    Swal.fire({
      icon: 'success',
      title: 'Thông báo',
      text: 'All Serivce Room updated successfully!'
    })
    const modalElement = document.getElementById('priceItemSelect')
    const modal = Modal.getInstance(modalElement) // Lấy instance của modal
    modal.hide() // Đóng modal
    // Xóa toàn bộ backdrop (nếu có)
    // Xóa tất cả các backdrop (nếu có nhiều backdrop)
    const backdropElements = document.querySelectorAll('.modal-backdrop')
    backdropElements.forEach((backdrop) => backdrop.remove()) // Xóa tất cả các backdrop
    fetchDataServiceRooms(room.roomId)
  }

  // Hàm xử lý khi textarea thay đổi, cập nhật trực tiếp description của room
  const handleNoteChange = (event) => {
    setRoom((prevRoom) => ({
      ...prevRoom,
      description: event.target.value // Cập nhật trực tiếp description trong room
    }))
  }

  // Hàm xử lý khi người dùng nhấn "Lưu"
  const handleAppNote = async () => {
    try {
      // Cập nhật phòng với description đã thay đổi
      await updateRoom(room.roomId, room) // Gửi thông tin cập nhật lên server

      // Hiển thị thông báo thành công
      Swal.fire({
        icon: 'success',
        title: 'Thông báo',
        text: 'Room updated successfully!'
      })

      // Đóng modal
      const modalElement = document.getElementById('noteModal')
      const modal = Modal.getInstance(modalElement)
      modal.hide()

      // Xóa tất cả backdrop
      const backdropElements = document.querySelectorAll('.modal-backdrop')
      backdropElements.forEach((backdrop) => backdrop.remove())

      // Fetch lại danh sách phòng
      fetchRooms()
    } catch (error) {
      console.log('Error updating room:', error)
    }
  }

  //ham input khi ng dung thay doi so luong
  const handleInputChangeService = (e, serviceId) => {
    const quantity = parseFloat(e.target.value) || 0

    setRoomSerivces((prevState) =>
      prevState.map((service) => {
        if (service.service.motelServiceId === serviceId) {
          const updatedService = {
            ...service,
            quantity,
            totalPrice: quantity * service.service.price
          }

          // Cập nhật serviceDetails
          setInvoiceData((prev) => ({
            ...prev,
            serviceDetails: prev.serviceDetails.map((detail) =>
              detail.roomServiceId === serviceId
                ? {
                    ...detail,
                    quantity,
                    totalPrice: quantity * detail.servicePrice
                  }
                : detail
            )
          }))

          return updatedService
        }
        return service
      })
    )
  }

  const ContractStatus = {
    IATExpire: 'IATExpire',
    ACTIVE: 'ACTIVE'
    // Các trạng thái khác
  }
  const fetchRooms = async () => {
    try {
      let dataRoom

      // Lấy danh sách phòng dựa trên motelId
      if (motelId) {
        dataRoom = await getRoomByMotelId(motelId)
      } else {
        dataRoom = await getRoomByMotelId(Motel[0]?.motelId)
      }

      if (dataRoom) {
        // Cập nhật state
        setRooms(dataRoom)
      }
    } catch (error) {
      console.error('Failed to fetch rooms:', error)
    }
  }

  const fetchMotelServices = async (id) => {
    try {
      const response = await axios.get(`${env.API_URL}/motels/get-motel-id?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data && response.data.code === 200 && response.data.result && response.data.result.motelServices) {
        setMotelServices(response.data.result.motelServices)
      } else {
        setMotelServices([])
      }
    } catch (error) {
      console.error('Error fetching motel services:', error)
      setMotelServices([])
    }
  }
  const fetchDevices = async () => {
    try {
      const response = await getAllMotelDevices(motelId)
      setdevice(response.result)
    } catch (error) {
      console.error('Error fetching device services:', error)
      setdevice([])
    }
  }

  // Call this function when opening the "Add Room" modal
  useEffect(() => {
    if (motelId) {
      fetchMotelServices(motelId)
    }
  }, [motelId])

  // Định dạng tiền tệ Việt Nam (VND)
  const currencyFormatter = (cell) => {
    const value = cell.getValue()
    if (value !== null && value !== undefined) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(value)
    }
    if (value === null || value === undefined) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(0)
    }
    return value
  }

  // Định dạng thêm "/1 người" vào cột countTenant
  const tenantFormatter = (cell) => {
    const countTenant = cell.getValue()
    const svgiconuser = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`
    if (countTenant !== null && countTenant !== undefined) {
      return `${svgiconuser} 0 / ${countTenant} người`
    }
    if (countTenant === null || countTenant === undefined) {
      return `Không xác định`
    }

    return countTenant
  }

  // Hàm định dạng ngày
  const formatDate = (dateString) => {
    if (dateString === null || dateString === undefined) {
      return `Không xác định`
    }
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  //ham dinh dang ngay lap hoa don
  const invoicedateFormatter = (cell) => {
    const countTenant = cell.getValue()
    if (countTenant !== null && countTenant !== undefined) {
      return `Ngày ${countTenant}`
    }
    return countTenant
  }

  //ham dinh dang chu ky thu tien
  const collectionCycleOptions = [
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
  ]

  const getCollectionCycleLabel = (value) => {
    const option = collectionCycleOptions.find((opt) => opt.value === value)
    return option ? option.label : 'Không xác định'
  }

  // Formatter cho cột "finance"
  const financeFormatter = (cell) => {
    const financeValue = cell.getValue()

    // Nếu giá trị tài chính là "Đang trống", hiển thị badge với màu cam
    if (financeValue === 'wait') {
      return `<span class="badge mt-2 " style="background-color: #7dc242; white-space: break-spaces;">Chờ kỳ thu tới</span>`
    }

    // Nếu không phải "Đang trống", hiển thị giá trị tài chính
    return financeValue
  }

  // Formatter cho cột "Status"
  const StatusFormatter = (cell) => {
    const data = cell.getRow().getData() // Lấy dữ liệu dòng
    // Nếu giá trị tài chính là "Đang trống", hiển thị badge với màu cam
    // if (financeValue === 'ACTIVE') {
    //   return `<span class="badge mt-2 " style="background-color: #7dc242; white-space: break-spaces;">Đang ở</span>`
    // }
    // if (financeValue === 'ENDED' || financeValue === undefined) {
    //   return `<span class="badge mt-2 " style="background-color: #ED6004; white-space: break-spaces;">Đang trống</span>`
    // }

    // Nếu không phải "Đang trống", hiển thị giá trị tài chính
    const status = data.latestContract?.status // Kiểm tra giá trị status
    const reserveAPlaceId = data.reserveAPlace?.status // Kiểm tra giá trị reserveAPlaceId

    // Nếu status có giá trị, hiển thị status, nếu không hiển thị reserveAPlaceId
    return status === 'ACTIVE'
      ? `<span class="badge mt-2 " style="background-color: #7dc242; white-space: break-spaces;">Đang ở</span>`
      : status === 'IATExpire'
      ? `<span class="badge " style="background-color: #dc3545; white-space: break-spaces;">Sắp kết thúc hợp đồng</span>`
      : status === 'ReportEnd'
      ? `<span class="badge " style="background-color: #ED6004; white-space: break-spaces;">Đã báo kết thúc hợp đồng</span>`
      : reserveAPlaceId
      ? `<span class="badge " style="background-color: #ED6004; white-space: break-spaces;">Đang cọc giữ chỗ</span>`
      : `<span class="badge mt-2 " style="background-color: #ED6004; white-space: break-spaces;">Đang trống</span>` // Có thể thay 'Chưa xác định' bằng giá trị mặc định khác
  }

  // Định dạng tiền tệ Việt Nam (VND) va khac chua dua tien coc
  const currencyDepositFormatter = (cell) => {
    const value = cell.getValue()
    let displayValue = ''

    // Nếu giá trị tiền cọc hợp lệ
    if (value !== null && value !== undefined && value !== 0) {
      displayValue =
        new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(value) +
        '<br/> <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"><i style="font-size: 11px;color:#ff0000;">(Chưa thu tiền cọc)</i></div>'
    } else {
      // Nếu giá trị là 0 hoặc null/undefined, hiển thị "Chưa thu tiền cọc"
      displayValue = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(0)
    }

    return displayValue
  }

  const handleActionClick = (e, roomId) => {
    e.stopPropagation() // Ngừng sự kiện click để không bị bắt bởi sự kiện ngoài
    // In ra tọa độ
    // Sử dụng getBoundingClientRect để lấy vị trí chính xác của phần tử được nhấn
    const targetElement = e.currentTarget
    const rect = targetElement.getBoundingClientRect()

    // Cập nhật vị trí của menu sao cho hiển thị gần biểu tượng Action
    setMenuPosition({
      x: rect.left + window.scrollX + rect.width / 2, // Centered horizontally
      y: rect.top + window.scrollY + rect.height // Below the icon
    })
    setShowMenu(roomId) // Hiển thị menu cho hàng với roomId tương ứng
    fetchRoomContract(roomId)
    fetchDataRooms(roomId)
  }

  //delete Room
  const handleDeleteRoom = async (RoomId) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn xóa không?',
      text: 'Bạn sẽ không thể hoàn tác hành động này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa'
    })

    if (result.isConfirmed) {
      try {
        console.log(RoomId)
        // Call your API to delete the room here
        await DeleteRoomByid(RoomId) // Uncomment when API is implemented
        Swal.fire('Đã xóa!', 'Room đã được xóa.', 'success')

        // Sau khi xóa thành công, cập nhật lại danh sách template hoặc làm mới trang
        fetchRooms()
      } catch (error) {
        console.error('Lỗi khi xóa Room:', error)
        Swal.fire('Lỗi', 'Không thể xóa Room.', 'error')
      }
    }
  }

  //huy dat cong
  const handleDeleteReseAPlace = async (reserveAPlaceId) => {
    console.log(reserveAPlaceId)

    const result = await Swal.fire({
      title: 'Bạn có chắc muốn xóa không?',
      text: 'Bạn sẽ không thể hoàn tác hành động này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa'
    })

    if (result.isConfirmed) {
      try {
        await deleteReserveAPlace(reserveAPlaceId) // Uncomment when API is implemented
        Swal.fire('Đã xóa!', 'Đã hủy đặt cọc.', 'success')

        // Sau khi xóa thành công, cập nhật lại danh sách template hoặc làm mới trang
        fetchRooms()
      } catch (error) {
        console.error('Lỗi khi hủy đặt cọc:', error)
        Swal.fire('Lỗi', 'Không thể hủy đặt cọc.', 'error')
      }
    }
  }

  const handleDetailClick = (e, rowId) => {
    window.open(`/quanlytro/${motelId ? motelId : Motel[0].motelId}/Chi-tiet-phong/${rowId}`, '_blank')
  }
  const [deviceByRoom, setdeviceByRoom] = useState([])
  const fetchDeviceByRoom = async (roomId) => {
    if (!roomId) {
      console.warn('Room ID is invalid')
      setdeviceByRoom([])
      return
    }
    try {
      const response = await getAllDeviceByRomId(roomId)
      console.log(response.result)

      if (response.result.length > 0) {
        setdeviceByRoom(response.result)

        // Cập nhật deviceDetails vào invoiceData
        setInvoiceData((prev) => ({
          ...prev,
          deviceDetails: response.result.map((device) => ({
            roomDeviceId: device.motel_device_id || device.roomDeviceId,
            quantity: device.quantity || 1 // Đảm bảo có quantity
          }))
        }))
      } else {
        setdeviceByRoom([])
        setInvoiceData((prev) => ({ ...prev, deviceDetails: [] }))
      }
    } catch (error) {
      console.error('Error fetching devices by room:', error)
    }
  }

  const handlePrintContract = () => {
    const contractUrl = `/quanlytro/${motelId}/Contract-Preview/${contract.contractId}`

    // Mở cửa sổ mới để in nội dung hợp đồng
    const printWindow = window.open(contractUrl, '_blank')

    // Đợi nội dung tải xong, sau đó gọi window.print
    printWindow.onload = () => {
      printWindow.print()
    }
  }

  // Hàm xử lý khi người dùng chọn một mục trong menu
  const handleItemClick = (label) => {
    if (label === 'Đóng menu') {
      setShowMenu(null) // Đóng menu
    } else if (label === 'Chi tiết phòng') {
      window.open(`/quanlytro/${motelId}/Chi-tiet-phong/${showMenu}`, '_blank')
    } else if (label === 'Cài đặt dịch vụ') {
      fetchDataServiceRooms(showMenu)
      fetchDataRooms(showMenu)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Xóa phòng') {
      setShowMenu(null) // Đóng menu
      handleDeleteRoom(showMenu) // Gọi hàm xóa phòng
    } else if (label === 'Thiết lập tài sản') {
      setShowMenu(null) // Đóng menu
      //ham o duoi dung de xac dinh dang nhan vao phong nao
      fetchDataRooms(showMenu)
      //ham thuan fetch tai san cua phong o duoi (giong trung o cai dat dich vu)
      fetchDeviceByRoom(showMenu)
    } else if (label === 'Ghi chú') {
      setShowMenu(null) // Đóng menu
      //ham o duoi dung de xac dinh dang nhan vao phong nao
      fetchDataRooms(showMenu)
    } else if (label === 'Lập hóa đơn') {
      fetchDeviceByRoom(showMenu)
      fetchDataServiceRooms(showMenu)
      fetchDataRooms(showMenu)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Danh sách khách thuê') {
      toggleModal(!modalOpen)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Hợp đồng mới') {
      toggleModalContract(!modalOpenContract)
      fetchDataRooms(showMenu)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Xem văn bản hợp đồng') {
      fetchDataRooms(showMenu)
      window.open(`/quanlytro/${motelId}/Contract-Preview/${contract.contractId}`, '_blank')
      setShowMenu(null) // Đóng menu
    } else if (label === 'Chia sẻ văn bản hợp đồng') {
      const baseUrl = 'http://localhost:5173'
      const shareLink = `${baseUrl}/quanlytro/${motelId}/Contract-Preview/${contract.contractId}`

      // Sao chép liên kết vào clipboard
      navigator.clipboard
        .writeText(shareLink)
        .then(() => {
          Swal.fire({
            title: '<strong><u>Thông báo!</u></strong>',
            icon: 'info',
            html: `
            Đã sao chép liên kết hợp đồng! Bạn có thể chia sẻ cho bên thứ ba.<br>
            <a href="${shareLink}" target="_blank">${shareLink}</a>
          `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `Đi đến đường dẫn`,
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: `Đóng`,
            cancelButtonAriaLabel: 'Thumbs down'
          }).then((result) => {
            if (result.isConfirmed) {
              // Người dùng chọn "Đi đến đường dẫn"
              window.open(shareLink, '_blank')
            }
          })
        })
        .catch((err) => {
          console.error('Không thể sao chép liên kết:', err)
          Swal.fire({
            title: 'Lỗi',
            text: 'Không thể sao chép liên kết. Vui lòng thử lại.',
            icon: 'error'
          })
        })

      setShowMenu(null) // Đóng menu
    } else if (label === 'In văn bản hợp đồng') {
      setShowMenu(null) // Đóng menu
      // Thực hiện chức năng in hợp đồng
      handlePrintContract()
    } else if (label === 'Cọc giữ chỗ') {
      toggleModalReAPlace(!modalOpenReAPlace)
      fetchDataRooms(showMenu)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Xem cọc giữ chỗ') {
      toggleDetailReAPlace(!detailOpenReAPlace)
      fetchDataRooms(showMenu)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Hủy cọc giữ chỗ') {
      if (room.reserveAPlace.reserveAPlaceId) {
        handleDeleteReseAPlace(room.reserveAPlace.reserveAPlaceId)
      }

      setShowMenu(null) // Đóng menu
    } else if (label === 'Báo kết thúc hợp đồng phòng') {
      fetchDataRooms(showMenu)
      toggleReportContract(!modalOpenReportContract)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Hủy Báo kết thúc hợp đồng phòng') {
      fetchDataRooms(showMenu)
      toggleCancelReportContract(!modalOpenCancelReportContract)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Kết thúc hợp đồng phòng') {
      fetchDataRooms(showMenu)
      toggleEndContract(!ModalEndContract)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Chuyển phòng') {
      fetchDataRooms(showMenu)
      toggleChangeRoom(!modalOpenChangeRoom)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Gia hạn hợp đồng') {
      fetchDataRooms(showMenu)
      toggleEntendContract(!modalOpenExtendContract)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Quản lý xe') {
      fetchDataRooms(showMenu)
      toggleCar(!modalOpenCar)
      setShowMenu(null) // Đóng menu
    } else {
      alert(`Action: ${label} on room ${showMenu}`)
    }
  }

  const IATExpiremenuItems = [
    { id: 1, label: 'Lập hóa đơn', icon: 'dollar-sign' },
    { id: 2, label: 'Chi tiết phòng', icon: 'arrow-right-circle' },
    { id: 3, label: 'Danh sách khách thuê', icon: 'user' },
    { id: 4, label: 'Chuyển phòng', icon: 'refresh-ccw' },
    { id: 5, label: 'Báo kết thúc hợp đồng phòng', icon: 'bell' },
    { id: 6, label: 'Cài đặt dịch vụ', icon: 'settings' },
    { id: 7, label: 'Kết thúc hợp đồng phòng', icon: 'log-out' },
    { id: 8, label: 'Gia hạn hợp đồng', icon: 'trello', textClass: 'text-success' },
    { id: 9, label: 'Thiết lập tài sản', icon: 'trello' },
    { id: 10, label: 'Xem văn bản hợp đồng', icon: 'arrow-right-circle' },
    { id: 11, label: 'Quản lý xe', icon: 'truck' },
    { id: 12, label: 'In văn bản hợp đồng', icon: 'printer' },
    { id: 13, label: 'Ghi chú', icon: 'edit-3', textClass: 'text-success' },
    { id: 14, label: 'Chia sẻ văn bản hợp đồng', icon: 'share' },
    { id: 15, label: 'Xóa phòng', icon: 'trash-2', textClass: 'text-danger' },
    { id: 16, label: 'Chia sẻ mã kết nối', icon: 'share-2' },
    { id: 17, label: 'Đóng menu', icon: 'x-circle', textClass: 'close-menu-action' }
  ]

  const menuItems = [
    { id: 1, label: 'Lập hóa đơn', icon: 'dollar-sign' },
    { id: 2, label: 'Chi tiết phòng', icon: 'arrow-right-circle' },
    { id: 3, label: 'Danh sách khách thuê', icon: 'user' },
    { id: 4, label: 'Chuyển phòng', icon: 'refresh-ccw' },
    { id: 5, label: 'Báo kết thúc hợp đồng phòng', icon: 'bell' },
    { id: 6, label: 'Cài đặt dịch vụ', icon: 'settings' },
    { id: 7, label: 'Kết thúc hợp đồng phòng', icon: 'log-out' },
    { id: 8, label: 'Thiết lập tài sản', icon: 'trello' },
    { id: 9, label: 'Xem văn bản hợp đồng', icon: 'arrow-right-circle' },
    { id: 10, label: 'Quản lý xe', icon: 'truck' },
    { id: 11, label: 'In văn bản hợp đồng', icon: 'printer' },
    { id: 12, label: 'Ghi chú', icon: 'edit-3', textClass: 'text-success' },
    { id: 13, label: 'Chia sẻ văn bản hợp đồng', icon: 'share' },
    { id: 14, label: 'Xóa phòng', icon: 'trash-2', textClass: 'text-danger' },
    { id: 15, label: 'Chia sẻ mã kết nối', icon: 'share-2' },
    { id: 16, label: 'Đóng menu', icon: 'x-circle', textClass: 'close-menu-action' }
  ]

  const menuItemsReportContract = [
    { id: 1, label: 'Lập hóa đơn', icon: 'dollar-sign' },
    { id: 2, label: 'Chi tiết phòng', icon: 'arrow-right-circle' },
    { id: 3, label: 'Danh sách khách thuê', icon: 'user' },
    { id: 4, label: 'Chuyển phòng', icon: 'refresh-ccw' },
    { id: 5, label: 'Hủy Báo kết thúc hợp đồng phòng', icon: 'trash-2', textClass: 'text-danger' },
    { id: 6, label: 'Cài đặt dịch vụ', icon: 'settings' },
    { id: 7, label: 'Kết thúc hợp đồng phòng', icon: 'log-out' },
    { id: 8, label: 'Thiết lập tài sản', icon: 'trello' },
    { id: 9, label: 'Xem văn bản hợp đồng', icon: 'arrow-right-circle' },
    { id: 10, label: 'Quản lý xe', icon: 'truck' },
    { id: 11, label: 'In văn bản hợp đồng', icon: 'printer' },
    { id: 12, label: 'Ghi chú', icon: 'edit-3', textClass: 'text-success' },
    { id: 13, label: 'Chia sẻ văn bản hợp đồng', icon: 'share' },
    { id: 14, label: 'Xóa phòng', icon: 'trash-2', textClass: 'text-danger' },
    { id: 15, label: 'Chia sẻ mã kết nối', icon: 'share-2' },
    { id: 16, label: 'Đóng menu', icon: 'x-circle', textClass: 'close-menu-action' }
  ]

  const EmptyContractmenuItems = [
    { id: 1, label: 'Hợp đồng mới', icon: 'book', textClass: 'text-success' },
    { id: 2, label: 'Chi tiết phòng', icon: 'arrow-right-circle' },
    { id: 3, label: 'Cọc giữ chỗ', icon: 'anchor' },
    { id: 4, label: 'Xóa phòng', icon: 'trash-2', textClass: 'text-danger' },
    { id: 5, label: 'Cài đặt dịch vụ', icon: 'settings' },
    { id: 6, label: 'Thiết lập tài sản', icon: 'trello' },
    { id: 7, label: 'Đóng menu', icon: 'x-circle', textClass: 'close-menu-action' }
  ]

  const StakeContractmenuItems = [
    { id: 1, label: 'Hợp đồng mới', icon: 'book', textClass: 'text-success' },
    { id: 2, label: 'Chi tiết phòng', icon: 'arrow-right-circle' },
    { id: 3, label: 'Xem cọc giữ chỗ', icon: 'eye' },
    { id: 4, label: 'Hủy cọc giữ chỗ', icon: 'x-circle', textClass: 'text-danger' },
    { id: 5, label: 'Cài đặt dịch vụ', icon: 'settings' },
    { id: 6, label: 'Xóa phòng', icon: 'trash-2', textClass: 'text-danger' },
    { id: 7, label: 'Thiết lập tài sản', icon: 'trello' },
    { id: 8, label: 'Đóng menu', icon: 'x-circle', textClass: 'close-menu-action' }
  ]

  const columns = [
    {
      title: '',
      field: 'drag',
      hozAlign: 'center',
      minWidth: 20,
      rowHandle: true,
      formatter: () => {
        const element = document.createElement('div')
        element.style.cursor = 'move' // Đổi con trỏ thành 4 hướng khi hover
        element.innerHTML = `
          <div class="tabulator-row-handle-bar" style="width: 50%;height: 3px;margin-top: 19px;background: #666;margin-left: 19px"></div>
          <div class="tabulator-row-handle-bar" style="width: 50%;height: 3px;margin-top: 3px;background: #666;margin-left: 19px"></div>
          <div class="tabulator-row-handle-bar" style="width: 50%;height: 3px;margin-top: 3px;background: #666;margin-left: 19px"></div>
      `
        return element
      }
    },
    {
      title: '',
      field: 'detail',
      hozAlign: 'center',
      minWidth: 20,
      formatter: (cell) => {
        const rowId = cell.getRow().getData().roomId
        const element = document.createElement('div')
        element.innerHTML = `
          <div class="icon-first" style="background-color: #ED6004;">
            <img width="30px" src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Froom.png?alt=media&token=9f1a69c1-ce2e-4586-ba90-94db53443d49">
          </div>
        `
        element.addEventListener('click', (e) => handleDetailClick(e, rowId))
        return element
      }
    },
    { title: 'id', field: 'roomId', hozAlign: 'center', minWidth: 40, visible: false },
    {
      title: 'Tên phòng',
      field: 'name',
      hozAlign: 'center',
      minWidth: 60,
      editor: 'input',
      cssClass: 'bold-text'
    }, // Đặt minWidth để tránh cột bị quá nhỏ
    { title: 'Nhóm', field: 'group', hozAlign: 'center', minWidth: 40, editor: 'input' },
    {
      title: 'Giá thuê',
      field: 'price',
      hozAlign: 'center',
      minWidth: 40,
      editor: 'input',
      formatter: currencyFormatter,
      cssClass: 'bold-text'
    },
    {
      title: 'Mức giá tiền cọc',
      field: 'latestContract.deposit',
      hozAlign: 'center',
      minWidth: 150,
      editor: 'input',
      formatter: currencyDepositFormatter,
      cssClass: 'bold-text'
    },
    {
      title: 'Tiền nợ',
      field: 'debt',
      hozAlign: 'center',
      minWidth: 40,
      editor: 'input',
      formatter: currencyFormatter,
      cssClass: 'bold-text'
    },
    {
      title: 'Khách thuê',
      field: 'latestContract.countTenant',
      hozAlign: 'center',
      minWidth: 100,
      editor: 'input',
      formatter: tenantFormatter
    },
    {
      title: 'Ngày lập hóa đơn',
      field: 'invoiceDate',
      hozAlign: 'center',
      minWidth: 150,
      editor: 'input',
      formatter: invoicedateFormatter
    },
    {
      title: 'Chu kỳ thu tiền',
      field: 'latestContract.collectioncycle',
      hozAlign: 'center',
      minWidth: 150,
      editor: 'input',
      formatter: (cell) => {
        const value = cell.getValue() // Lấy giá trị của collectioncycle
        return getCollectionCycleLabel(value) // Hiển thị label tương ứng
      }
    },
    {
      title: 'Ngày vào ở',
      field: 'latestContract.moveinDate',
      hozAlign: 'center',
      minWidth: 150,
      editor: 'input',
      formatter: (cell) => formatDate(cell.getValue())
    },
    {
      title: 'Thời hạn hợp đồng',
      field: 'latestContract.closeContract',
      hozAlign: 'center',
      minWidth: 150,
      editor: 'input',
      formatter: (cell) => formatDate(cell.getValue())
    },
    {
      title: 'Tình trạng',
      field: 'latestContract.status',
      hozAlign: 'center',
      minWidth: 40,
      editor: 'input',
      formatter: StatusFormatter
    },
    {
      title: 'Tài chính',
      field: 'finance',
      hozAlign: 'center',
      minWidth: 40,
      editor: 'input',
      formatter: financeFormatter
    },
    {
      title: 'Action',
      field: 'Action',
      hozAlign: 'center',
      formatter: (cell) => {
        const rowId = cell.getRow().getData().roomId
        const element = document.createElement('div')
        element.classList.add('icon-menu-action')
        element.innerHTML = `
          <svg    xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-more-vertical">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        `

        element.addEventListener('click', (e) => handleActionClick(e, rowId))
        return element
      }
    }
  ]

  const options = {
    height: '400px', // Chiều cao của bảng
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

  // Tính tổng số tiền khách nợ
  const totalDebt = rooms.reduce((sum, room) => {
    const roomDebt = room.debt || 0 // Giá trị debt của phòng
    const contractDebt = room.latestContract?.debt || 0 // Giá trị debt từ hợp đồng
    return sum + roomDebt + contractDebt
  }, 0)

  // Tính tổng số tiền cọc từ contract
  const totalContractDeposit = rooms.reduce((sum, room) => {
    const contractDeposit = room.latestContract?.deposit || 0 // Lấy deposit từ latestContract, mặc định là 0 nếu không có
    return sum + contractDeposit
  }, 0)

  // Tính tổng số tiền cọc giua phong
  const totalReserveAPlace = rooms.reduce((sum, room) => {
    const ReserveAPlace = room.reserveAPlace?.deposit || 0 // Lấy deposit từ latestContract, mặc định là 0 nếu không có
    return sum + ReserveAPlace
  }, 0)

  // Quản lý trạng thái hiển thị cột
  const [columnsVisibility, setColumnsVisibility] = useState(
    columns.reduce((acc, col) => {
      acc[col.field] = col.visible !== false // Mặc định cột là visible nếu không có thuộc tính 'visible: false'
      return acc
    }, {})
  )

  // Lấy danh sách các cột hiện đang hiển thị
  const visibleColumns = columns.filter((col) => columnsVisibility[col.field])

  // Xử lý thay đổi khi checkbox được click
  const handleColumnVisibilityChange = (field) => {
    setColumnsVisibility((prev) => ({
      ...prev,
      [field]: !prev[field] // Đảo ngược trạng thái của cột
    }))
  }
  const [isEmpty, setIsEmpty] = useState(false) // Trạng thái checkbox "Đang trống"
  // Xử lý thay đổi trạng thái của checkbox "Đang trống"
  const handleEmptyCheckboxChange = (event) => {
    setIsEmpty(event.target.checked)
  }
  const [isActive, setIsActive] = useState(false) // Trạng thái checkbox "Đang ở"
  // Xử lý thay đổi trạng thái của checkbox "Đang ở"
  const handleActiveCheckboxChange = (event) => {
    setIsActive(event.target.checked)
  }

  const [isStake, setIsStake] = useState(false) // Trạng thái checkbox "Đang ở"
  // Xử lý thay đổi trạng thái của checkbox "Đang ở"
  const handleStakeCheckboxChange = (event) => {
    setIsStake(event.target.checked)
  }

  const [isReportEnd, setIsReportEnd] = useState(false) // Trạng thái checkbox "Đang bao ket thuc"
  // Xử lý thay đổi trạng thái của checkbox "Đang bao ke thuc"
  const handleReportEndCheckboxChange = (event) => {
    setIsReportEnd(event.target.checked)
  }

  const [isIATExpire, setIsIATExpire] = useState(false) // Trạng thái checkbox "Đang ở"
  // Xử lý thay đổi trạng thái của checkbox "Đang ở"
  const handleIATExpireCheckboxChange = (event) => {
    setIsIATExpire(event.target.checked)
  }

  // Lọc danh sách phòng theo trạng thái
  const filteredRooms = rooms.filter((room) => {
    // Nếu bất kỳ điều kiện nào trong các điều kiện trên được thỏa mãn, trả về false (không hiển thị phòng)
    if (
      (isActive && isEmpty) ||
      (isActive && isStake) ||
      (isEmpty && isStake) ||
      (isActive && isEmpty && isStake) ||
      (isActive && isReportEnd) ||
      (isEmpty && isReportEnd) ||
      (isStake && isReportEnd) ||
      (isActive && isEmpty && isStake && isReportEnd) ||
      (isActive && isIATExpire) || // Thêm điều kiện kiểm tra khi cả isActive và isIATExpire đều được chọn
      (isEmpty && isIATExpire) || // Thêm điều kiện kiểm tra khi cả isEmpty và isIATExpire đều được chọn
      (isStake && isIATExpire) || // Thêm điều kiện kiểm tra khi cả isStake và isIATExpire đều được chọn
      (isReportEnd && isIATExpire) // Thêm điều kiện kiểm tra khi cả isReportEnd và isIATExpire đều được chọn
    ) {
      return false // Không hiển thị phòng
    }
    if (isActive) {
      return room.latestContract?.status === 'ACTIVE' // Hiển thị các phòng có trạng thái "ACTIVE"
    }
    if (isEmpty) {
      return room.latestContract?.status === undefined && room.reserveAPlace === null // Hiển thị các phòng trống
    }
    if (isStake) {
      return room.latestContract?.status === undefined && room.reserveAPlace?.status === 'Stake' // Hiển thị các phòng trống
    }
    if (isReportEnd) {
      return room.latestContract?.status === 'ReportEnd' // Hiển thị các phòng có trạng thái "ACTIVE"
    }
    if (isIATExpire) {
      return room.latestContract?.status === 'IATExpire' // Hiển thị các phòng có trạng thái "ACTIVE"
    }
    return true // Hiển thị tất cả các phòng nếu không có checkbox nào được chọn
  })

  const handleQuantityChange = (serviceId, quantity) => {
    setFormData((prevData) => {
      const updatedServices = prevData.selectedServices.map((service) =>
        service.serviceId === serviceId ? { ...service, quantity } : service
      )

      return {
        ...prevData,
        selectedServices: updatedServices
      }
    })
  }
  const handleServiceSelection = (serviceId, isChecked) => {
    setFormData((prevData) => {
      let updatedServices = [...prevData.selectedServices]

      if (isChecked) {
        // Nếu checkbox được chọn, thêm dịch vụ vào mảng với quantity = 1
        updatedServices.push({ serviceId, quantity: 1 })
      } else {
        // Nếu checkbox bị bỏ chọn, xóa dịch vụ khỏi mảng
        updatedServices = updatedServices.filter((service) => service.serviceId !== serviceId)
      }

      return {
        ...prevData,
        selectedServices: updatedServices
      }
    })
  }
  //invoice
  // console.log('Dữ liệu gửi đi:', invoiceData);

  const createInvoice = async () => {
    try {
      const updatedInvoiceData = {
        ...invoiceData,
        additionItems: additionItems.map((item) => ({
          reason: item.additionReason,
          amount: parseInt(item.additionValue, 10),
          isAddition: item.addition
        }))
      }
      if (
        !updatedInvoiceData.contractId ||
        updatedInvoiceData.serviceDetails.length === 0 ||
        !updatedInvoiceData.deviceDetails
      ) {
        throw new Error('Thiếu thông tin hợp đồng, dịch vụ hoặc thiết bị.')
      }

      const response = await axios.post('http://localhost:8080/invoices/create', updatedInvoiceData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Hóa đơn được tạo!'
      })
      console.log('tạo thành công:', response.data)
    } catch (error) {
      console.error('Lỗi khi tạo hóa đơn:', error.response?.data || error.message)
      Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: 'Tạo hóa đơn không thành công!'
      })
    }
  }

  const handleInputInvoice = (field, value) => {
    if (field === 'moveinDate') {
      const selectedDate = new Date(value)
      const dueDateMoveIn = new Date(selectedDate)
      dueDateMoveIn.setDate(selectedDate.getDate() + 30) // Cộng thêm 30 ngày

      setInvoiceData((prev) => ({
        ...prev,
        [field]: value,
        dueDateofmoveinDate: dueDateMoveIn.toISOString().slice(0, 10) // Cập nhật `dueDateofmoveinDate`
      }))
    } else if (field === 'invoiceCreateDate') {
      const selectedDate = new Date(value)
      const dueDate = new Date(selectedDate)
      dueDate.setDate(selectedDate.getDate() + 7) // Cộng thêm 7 ngày

      setInvoiceData((prev) => ({
        ...prev,
        [field]: value,
        dueDate: dueDate.toISOString().slice(0, 10) // Cập nhật `dueDate`
      }))
    } else {
      setInvoiceData((prev) => ({
        ...prev,
        [field]: value
      }))
    }
  }

  useEffect(() => {
    const today = new Date()
    const formattedToday = today.toISOString().slice(0, 10)

    const dueDate = new Date(today)
    dueDate.setDate(today.getDate() + 7)
    const formattedDueDate = dueDate.toISOString().slice(0, 10)

    const moveinDate = new Date()
    const dueDateMoveIn = new Date(moveinDate)
    dueDateMoveIn.setDate(moveinDate.getDate() + 30)
    const formattedDueDateMoveIn = dueDateMoveIn.toISOString().slice(0, 10)

    setInvoiceData((prevData) => ({
      ...prevData,
      invoiceCreateDate: formattedToday,
      dueDate: formattedDueDate,
      moveinDate: formattedToday, // Gán ngày hiện tại cho moveinDate
      dueDateofmoveinDate: formattedDueDateMoveIn // Gán hạn đến ngày sau 30 ngày
    }))
  }, [])
  // Lấy contractId
  useEffect(() => {
    if (roomId) {
      fetchRoomContract(roomId) // Gọi API lấy contractId
    }
  }, [roomId])

  // Lấy danh sách dịch vụ và thiết bị
  useEffect(() => {
    if (roomId) {
      fetchDataServiceRooms(roomId) // Gọi API lấy danh sách dịch vụ
      fetchDeviceByRoom(roomId) // Gọi API lấy danh sách thiết bị
    }
  }, [roomId])

  useEffect(() => {
    setInvoiceData((prev) => ({
      ...prev,
      serviceDetails: roomSerivces
        .filter((service) => service.isSelected)
        .map((service) => ({
          roomServiceId: service.roomServiceId,
          serviceName: service.service.nameService,
          servicePrice: service.service.price,
          quantity: service.quantity || 1,
          totalPrice: (service.quantity || 1) * service.service.price
        }))
    }))
  }, [roomSerivces])
  // console.log('Q_roomSerivces:', roomSerivces);
  // console.log('Q_invoiceData:', invoiceData);
  // console.log('deviceDetails:', invoiceData.deviceDetails);

  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '15px 15px 15px 15px',
        borderRadius: '10px',
        margin: '0 10px 10px 10px'
      }}>
      <div className="page-home">
        {/* report */}

        <div>
          <div className="row g-3 row-box-home" style={{ marginTop: '0px' }}>
            <div className="col-sm-3" style={{ marginTop: '0px' }}>
              <div className="item-home " data-bs-toggle="modal" data-bs-target="#reportBillDebt">
                <Link to="#" className="create-home">
                  <span>
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
                      className="feather feather-arrow-right">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </Link>
                <Link to="#" className="box-home span-red-white">
                  <div className="d-flex align-items-center">
                    <span className="icon-home">
                      <img
                        width="36px"
                        src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Ficonadminql1.png?alt=media&token=283e596c-984a-495d-af79-ace3366b8403"
                      />
                    </span>
                    <div>
                      <span className="titleadmin">Tổng số tiền khách nợ</span>
                      <h3 className="text-danger">{totalDebt.toLocaleString()}đ</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-sm-3" style={{ marginTop: '0px' }}>
              <div className="item-home" data-bs-toggle="modal" data-bs-target="#reportContractDeposit">
                <Link to="#" className="create-home">
                  <span>
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
                      className="feather feather-arrow-right">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </Link>
                <Link to="#" className="box-home span-primary-white">
                  <div className="d-flex align-items-center">
                    <span className="icon-home">
                      <img
                        width="36px"
                        src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Ficonadminql2.png?alt=media&token=f6f1cf18-4b2d-4d0d-bf44-aadc183fb3d3"
                      />
                    </span>
                    <div>
                      <span style={{ color: '#20a9e7' }} className="titleadmin">
                        Tổng số tiền cọc
                      </span>
                      <h3 style={{ color: '#20a9e7' }}>{totalContractDeposit.toLocaleString()}đ</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-sm-3" style={{ marginTop: '0px' }}>
              <div className="item-home" data-bs-toggle="modal" data-bs-target="#reportDepositTemp">
                <Link tp="#" className="create-home">
                  <span>
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
                      className="feather feather-arrow-right">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </Link>
                <Link to="#" className="box-home span-primary-white">
                  <div className="d-flex align-items-center">
                    <span className="icon-home">
                      <img
                        width="36px"
                        src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Ficonadminql3.png?alt=media&token=254c3d4e-c118-4538-83ad-4270f1c823be"
                      />
                    </span>
                    <div>
                      <span style={{ color: '#20a9e7' }} className="titleadmin">
                        Tổng số tiền cọc giữ phòng
                      </span>
                      <h3 style={{ color: '#20a9e7' }}>{totalReserveAPlace.toLocaleString()}đ</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-sm-3" style={{ marginTop: '0px' }}>
              <div className="item-home report">
                <Link to="#" className="create-home">
                  <span>
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
                      className="feather feather-arrow-right">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </Link>
                <Link to="#" className="box-home span-red-white">
                  <div className="d-flex align-items-center">
                    <span className="icon-home">
                      <img
                        width="36px"
                        src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Ficonadminql4.png?alt=media&token=de3e82c1-407a-4b18-81f7-db64230d2f0f"
                      />
                    </span>
                    <div>
                      <span className="titleadmin">Sự cố phòng</span>
                      <h3 className="text-danger">0 Vấn đề</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Tab panes  */}
        <div className="tab-pane" id="manage" role="tabpanel" aria-labelledby="manage-tab">
          <div style={{ marginTop: '30px' }}>
            <div className="header-item">
              <h4 className="title-item">
                Quản lý danh sách phòng
                <i className="des">Tất cả danh sách phòng trong Nhà trọ Trung</i>
              </h4>
              <div className="d-flex">
                <Link
                  to="https://www.youtube.com/watch?v=AH-YrGOP-zI"
                  target="_blank"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  title=""
                  style={{
                    width: '50px',
                    height: '50px',
                    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, .15)',
                    borderRadius: '50px',
                    marginRight: '15px'
                  }}
                  data-bs-original-title="Video tổng quan phần mềm"
                  data-tooltip-id="my-tooltipTongquan"
                  data-tooltip-content="Video tổng quan phần mềm"
                  data-tooltip-place="top">
                  <Tooltip id="my-tooltipTongquan" />
                  <img
                    width="50px"
                    height="50px"
                    src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Ficonadminql5.png?alt=media&token=4f52c0c9-ed2e-478f-911b-67df29e7208f"
                  />
                </Link>
                <button className="add-round" data-bs-toggle="modal" data-bs-target="#addRoom">
                  <span
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    title=""
                    data-tooltip-id="my-tooltipThemPhong"
                    data-tooltip-content="Thêm phòng"
                    data-tooltip-place="top"
                    data-bs-original-title="Thêm phòng">
                    <Tooltip id="my-tooltipThemPhong" />
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
                  </span>
                </button>

                <div className="d-flex" style={{ marginLeft: '40px' }}>
                  <div className="dropdown">
                    <button
                      style={{ height: '100%' }}
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
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
                        className="feather feather-file-text">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      Ẩn/Hiện cột
                      <span
                        id="count_exclude_column"
                        style={{
                          position: 'absolute',
                          top: '-12px',
                          right: '-10px',
                          backgroundColor: '#dc3545',
                          fontSize: '12px',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '5px',
                          color: '#fff'
                        }}>
                        {columns.length - 3}
                      </span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="list-show-column">
                      {columns.slice(3).map((col) => (
                        <li key={col.field}>
                          <label className="dropdown-item">
                            <input
                              type="checkbox"
                              checked={columnsVisibility[col.field]} // Được checked nếu cột đang hiển thị
                              onChange={() => handleColumnVisibilityChange(col.field)} // Khi nhấn sẽ toggle trạng thái hiển thị
                            />
                            {col.title}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ExportToExcel rooms={filteredRooms} />
                </div>
              </div>
            </div>
            <div className="header-table header-item" style={{ padding: '10px 10px' }}>
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
                  <span id="filter-count">{rooms.length}</span>
                </div>
                <div className="d-flex" style={{ flexWrap: 'wrap' }}>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_empty"
                      data-value="status"
                      value="is_empty"
                      checked={isActive} // Gán giá trị của checkbox
                      onChange={handleActiveCheckboxChange} // Gọi hàm xử lý khi checkbox thay đổi
                    />
                    <label className="form-check-label" htmlFor="is_active">
                      Đang ở
                    </label>
                    <span className="count-filter active success">
                      {rooms.filter((room) => room.latestContract?.status === 'ACTIVE').length}
                    </span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_empty"
                      data-value="status"
                      value="is_empty"
                      checked={isEmpty} // Gán giá trị của checkbox
                      onChange={handleEmptyCheckboxChange} // Gọi hàm xử lý khi checkbox thay đổi
                    />
                    <label className="form-check-label" htmlFor="is_empty">
                      Đang trống
                    </label>
                    <span className="count-filter empty error">
                      {
                        rooms.filter((room) => room.latestContract?.status === undefined && room.reserveAPlace === null)
                          .length
                      }
                    </span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_terminate_contract"
                      data-value="status"
                      value="is_terminate_contract"
                      checked={isReportEnd} // Gán giá trị của checkbox
                      onChange={handleReportEndCheckboxChange} // Gọi hàm xử lý khi checkbox thay đổi
                    />
                    <label className="form-check-label" htmlFor="is_terminate_contract">
                      Đang báo kết thúc{' '}
                    </label>
                    <span className="count-filter tick-terminate warning">
                      {' '}
                      {rooms.filter((room) => room.latestContract?.status === 'ReportEnd').length}
                    </span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_will_terminate_contract"
                      data-value="status"
                      value="is_will_terminate_contract"
                      checked={isIATExpire} // Gán giá trị của checkbox
                      onChange={handleIATExpireCheckboxChange} // Gọi hàm xử lý khi checkbox thay đổi
                    />
                    <label className="form-check-label" htmlFor="is_will_terminate_contract">
                      Sắp hết hạn hợp đồng
                    </label>
                    <span className="count-filter will-terminate warning">
                      {' '}
                      {rooms.filter((room) => room.latestContract?.status === 'IATExpire').length}
                    </span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_deposit_temp"
                      data-value="status"
                      value="is_deposit_temp"
                      checked={isStake} // Gán giá trị của checkbox
                      onChange={handleStakeCheckboxChange} // Gọi hàm xử lý khi checkbox thay đổi
                    />
                    <label className="form-check-label" htmlFor="is_deposit_temp">
                      Đang cọc giữ chỗ
                    </label>
                    <span className="count-filter deposit-temp warning">
                      {
                        rooms.filter(
                          (room) => room.latestContract?.status === undefined && room.reserveAPlace?.status === 'Stake'
                        ).length
                      }
                    </span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="active_status"
                      data-value="active_status"
                      value="debt_bill,has_bill"
                    />
                    <label className="form-check-label" htmlFor="active_status">
                      Đang nợ tiền
                    </label>
                    <span className="count-filter debt error">
                      {rooms.filter((room) => room.latestContract?.debt > 0).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div id="buttom-save-container">
              <div style={{ marginRight: '10px' }}>
                Bạn có <span id="count-edit">0</span> mục thay đổi bạn có muốn lưu ?
              </div>
              <div id="clear-change" className="btn btn-danger" style={{ marginRight: '10px' }}>
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>{' '}
                Xóa tất cả thay đổi
              </div>
              <div id="save-change" className="btn btn-primary">
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
                  className="feather feather-save">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>{' '}
                Lưu thay đổi
              </div>
            </div>
            <div style={{ position: 'relative', height: '100%' }}>
              <ReactTabulator
                className="my-custom-table" // Thêm lớp tùy chỉnh nếu cần
                columns={visibleColumns} // Chỉ truyền các cột được chọn
                data={filteredRooms}
                options={options}
                placeholder={<h1></h1>} // Sử dụng placeholder tùy chỉnh
              />
              {/* Thêm div cho hình ảnh và chữ nếu không có dữ liệu */}
              {rooms.length === 0 && (
                <div className="custom-placeholder">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fempty-box-4085812-3385481.webp?alt=media&token=eaf37b59-00e3-4d16-8463-5441f54fb60e"
                    alt="Không có dữ liệu"
                    className="placeholder-image"
                  />
                  <div className="placeholder-text">Không tìm thấy dữ liệu!</div>
                </div>
              )}

              {showMenu && (
                <div
                  className="tabulator-menu tabulator-popup-container "
                  ref={menuRef} // Gán ref đúng cách cho menu
                  style={{
                    position: 'absolute',
                    top:
                      contract.status === 'ACTIVE'
                        ? menuPosition.y - 890
                        : contract.status === 'IATExpire'
                        ? menuPosition.y - 940
                        : contract.status === 'Stake'
                        ? menuPosition.y - 720
                        : menuPosition.y - 720,

                    left:
                      contract.status === 'ACTIVE'
                        ? menuPosition.x - 350
                        : contract.status === 'IATExpire'
                        ? menuPosition.x - 350
                        : contract.status === 'Stake'
                        ? menuPosition.x - 350
                        : menuPosition.x - 350,
                    transform: 'translateX(-50%)'
                  }}>
                  {(room && room.latestContract?.status === 'ACTIVE'
                    ? menuItems
                    : room && room.latestContract?.status === 'ReportEnd'
                    ? menuItemsReportContract
                    : room && room.latestContract?.status === 'IATExpire'
                    ? IATExpiremenuItems
                    : room && room.latestContract === null && room.reserveAPlace?.status === 'Stake'
                    ? StakeContractmenuItems
                    : EmptyContractmenuItems
                  ).map((item) => (
                    <div
                      key={item.id}
                      // Gắn ref vào tag này
                      className={`tabulator-menu-item ${item.textClass || ''}`}
                      onClick={() => {
                        handleItemClick(item.label)
                        if (item.icon === 'user') {
                          toggleModal()
                          setShowMenu(null)
                        }
                        if (item.icon === 'book') {
                          toggleModalContract()
                          setShowMenu(null)
                        }
                        if (item.icon === 'anchor') {
                          toggleModalReAPlace()
                          setShowMenu(null)
                        }
                        if (item.icon === 'eye') {
                          toggleDetailReAPlace()
                          setShowMenu(null)
                        }
                        if (item.icon === 'bell') {
                          toggleReportContract()
                          setShowMenu(null)
                        }
                        if (item.icon === 'trash-2' && item.label === 'Hủy Báo kết thúc hợp đồng phòng') {
                          toggleCancelReportContract()
                          setShowMenu(null)
                        }
                        if (item.icon === 'log-out') {
                          toggleEndContract()
                          setShowMenu(null)
                        }
                        if (item.icon === 'refresh-ccw') {
                          toggleChangeRoom()
                          setShowMenu(null)
                        }
                        if (item.icon === 'trello' && item.label === 'Gia hạn hợp đồng') {
                          toggleEntendContract()
                          setShowMenu(null)
                        }
                        if (item.icon === 'truck') {
                          toggleCar()
                          setShowMenu(null)
                        }
                      }}
                      {...(item.label === 'Cài đặt dịch vụ' && {
                        'data-bs-toggle': 'modal',
                        'data-bs-target': '#priceItemSelect'
                      })}
                      {...(item.label === 'Thiết lập tài sản' && {
                        'data-bs-toggle': 'modal',
                        'data-bs-target': '#assetSelect'
                      })}
                      {...(item.label === 'Ghi chú' && {
                        'data-bs-toggle': 'modal',
                        'data-bs-target': '#noteModal'
                      })}
                      {...(item.label === 'Lập hóa đơn' && {
                        'data-bs-toggle': 'modal',
                        'data-bs-target': '#invoiceModal'
                      })}>
                      {item.icon && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`feather feather-${item.icon}`}>
                          {item.icon === 'dollar-sign' && (
                            <>
                              <line x1="12" y1="1" x2="12" y2="23" />
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </>
                          )}
                          {item.icon === 'arrow-right-circle' && (
                            <>
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 16 16 12 12 8" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                            </>
                          )}
                          {item.icon === 'user' && (
                            <>
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </>
                          )}
                          {item.icon === 'refresh-ccw' && (
                            <>
                              <polyline points="1 4 1 10 7 10" />
                              <polyline points="23 20 23 14 17 14" />
                              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                            </>
                          )}
                          {item.icon === 'bell' && (
                            <>
                              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </>
                          )}
                          {item.icon === 'settings' && (
                            <>
                              <circle cx="12" cy="12" r="3" />
                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </>
                          )}
                          {item.icon === 'log-out' && (
                            <>
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                              <polyline points="16 17 21 12 16 7"></polyline>
                              <line x1="21" y1="12" x2="9" y2="12"></line>
                            </>
                          )}
                          {item.icon === 'trello' && (
                            <>
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <rect x="7" y="7" width="3" height="9"></rect>
                              <rect x="14" y="7" width="3" height="5"></rect>
                            </>
                          )}
                          {item.icon === 'printer' && (
                            <>
                              <polyline points="6 9 6 2 18 2 18 9" />
                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                              <rect x="6" y="14" width="12" height="8" />
                            </>
                          )}
                          {item.icon === 'edit-3' && (
                            <>
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </>
                          )}
                          {item.icon === 'share' && (
                            <>
                              <path d="M4 12v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
                              <polyline points="16 6 12 2 8 6" />
                              <line x1="12" y1="2" x2="12" y2="15" />
                            </>
                          )}
                          {item.icon === 'trash-2' && (
                            <>
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </>
                          )}
                          {item.icon === 'share-2' && (
                            <>
                              <circle cx="18" cy="5" r="3" />
                              <circle cx="6" cy="12" r="3" />
                              <circle cx="18" cy="19" r="3" />
                              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </>
                          )}
                          {item.icon === 'x-circle' && (
                            <>
                              <circle cx="12" cy="12" r="10" />
                              <line x1="15" y1="9" x2="9" y2="15" />
                              <line x1="9" y1="9" x2="15" y2="15" />
                            </>
                          )}
                          {item.icon === 'truck' && (
                            <>
                              <rect x="1" y="3" width="15" height="13" />
                              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                              <circle cx="5.5" cy="18.5" r="2.5" />
                              <circle cx="18.5" cy="18.5" r="2.5" />
                            </>
                          )}
                          {item.icon === 'eye' && (
                            <>
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </>
                          )}
                          {item.icon === 'book' && (
                            <>
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </>
                          )}
                          {item.icon === 'anchor' && (
                            <>
                              <circle cx="12" cy="5" r="3"></circle>
                              <line x1="12" y1="22" x2="12" y2="8"></line>
                              <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
                            </>
                          )}
                          {/* Thêm các biểu tượng khác nếu cần */}
                        </svg>
                      )}

                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* modal add rom */}
      <div
        className="modal fade"
        data-bs-backdrop="static"
        id="addRoom"
        tabIndex={-1}
        aria-labelledby="addRoomLabel"
        aria-modal="true"
        role="dialog"
        style={{ display: 'none', paddingLeft: '0px' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div
                style={{
                  marginRight: '15px',
                  outline: '0',
                  boxShadow: '0 0 0 .25rem rgb(112 175 237 / 16%)',
                  opacity: '1',
                  borderRadius: '100%',
                  width: '36px',
                  height: '36px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  backgroundColor: 'rgb(111 171 232)'
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
                  className="feather feather-box">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h5 className="modal-title" id="addRoomLabel">
                Thêm phòng
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                {' '}
              </button>
            </div>
            <div className="modal-body">
              <form className="needs-validation" id="add-room-form" noValidate>
                <input type="hidden" name="_token" value="UFyRMEJwSNwvskI0nQa8dSfJdpC5VhNUzzfW4bfW" />
                <div className="row g-2">
                  <div className="col-12">
                    <div className="title-item-small">
                      <b>Thông tin phòng</b>
                      <i className="des">Nhập các thông tin cơ bản của phòng</i>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        required
                        placeholder="Tên phòng"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="name">
                        Tên phòng <span style={{ color: 'red' }}>*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-floating">
                      <select
                        id="group"
                        name="group"
                        className="form-select form-control"
                        required
                        value={formData.group}
                        onChange={handleInputChange}>
                        <option value="a">Tầng A</option>
                        <option value="b">Tầng B</option>
                      </select>
                      <label htmlFor="group">Tầng/dãy</label>
                    </div>
                  </div>
                  <div className="col-6" style={{ display: 'block' }}>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="area"
                        id="area"
                        required
                        placeholder="Nhập diện tích"
                        value={formData.area}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="area">Diện tích (m2)</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="price"
                        id="price"
                        required
                        placeholder="Giá thuê"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="room_amount">Giá thuê (đ)</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <select
                        id="invoiceDate"
                        name="invoiceDate"
                        className="form-select form-control"
                        value={formData.invoiceDate}
                        onChange={handleInputChange}>
                        {Array.from({ length: 31 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Ngày {i + 1}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="circle_day">Ngày lập hóa đơn hàng tháng</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <select
                        id="prioritize"
                        name="prioritize"
                        className="form-select form-control"
                        value={formData.prioritize}
                        onChange={handleInputChange}>
                        <option value="Tất cả">Tất cả</option>
                        <option value="Ưu tiên nữ">Ưu tiên nữ</option>
                        <option value="Ưu tiên nam">Ưu tiên nam</option>
                        <option value="Ưu tiên gia đình">Ưu tiên gia đình</option>
                      </select>
                      <label htmlFor="prioritize">Ưu tiên người thuê</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="title-item-small">
                      <b>Dịch vụ sử dụng</b>
                      <i className="des">Thêm dịch vụ sử dụng như: điện, nước, rác, wifi...</i>
                    </div>
                  </div>

                  <div className="price-items-checkout-layout">
                    {motelServices.length > 0 ? (
                      motelServices.map((service) => (
                        <div key={service.motelServiceId} className="item mt-2">
                          <div className="item-check-name">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={formData.selectedServices.some(
                                (item) => item.serviceId === service.motelServiceId
                              )}
                              onChange={(e) => handleServiceSelection(service.motelServiceId, e.target.checked)}
                            />
                            <label htmlFor={`service_${service.motelServiceId}`}>
                              <b>{service.nameService}</b>
                              <p>
                                Giá: <b>{service.price.toLocaleString('vi-VN')}đ</b> / {service.chargetype}
                              </p>
                            </label>
                          </div>

                          <div className="item-value">
                            <div className="input-group">
                              <input
                                className="form-control"
                                min="0"
                                type="number"
                                name="quantity"
                                value={
                                  formData.selectedServices.find((item) => item.serviceId === service.motelServiceId)
                                    ?.quantity || 0
                                }
                                onChange={(e) => handleQuantityChange(service.motelServiceId, parseInt(e.target.value))}
                              />
                              <label style={{ fontSize: '12px' }} className="input-group-text">
                                {service.chargetype}
                              </label>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Chưa có dịch vụ nào.</p>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer modal-footer--sticky">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Đóng
              </button>
              <button type="button" id="submit-room" className="btn btn-primary" onClick={handleSubmit}>
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
                Thêm phòng
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal hiển thị khi showServiceModal */}
      {roomSerivces && room ? (
        <div
          className="modal fade"
          data-bs-backdrop="static"
          id="priceItemSelect"
          tabIndex={-1}
          aria-labelledby="addRoomLabel"
          aria-modal="true"
          role="dialog"
          style={{ display: 'none', paddingLeft: '0px' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div
                  style={{
                    marginRight: '15px',
                    outline: '0',
                    boxShadow: '0 0 0 .25rem rgb(112 175 237 / 16%)',
                    opacity: '1',
                    borderRadius: '100%',
                    width: '36px',
                    height: '36px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    backgroundColor: 'rgb(111 171 232)'
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
                    className="feather feather-inbox">
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  </svg>
                </div>
                <h5 className="modal-title" id="addRoomLabel">
                  Chỉnh sửa dịch vụ sử dụng
                  <span className="room-name"> &quot;{room.name}&quot;</span>
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  {' '}
                </button>
              </div>
              <div className="modal-body">
                <form method="POST" className="needs-validation" id="price-item-selec-form" noValidate>
                  <div className="list-price-item-render price-items-checkout-layout">
                    {roomSerivces.map((roomSerivce, index) => (
                      <div className="item" key={index}>
                        <div className="item-check-name">
                          <input
                            className="form-check-input"
                            type="hidden"
                            value="23660"
                            name="price_items[23660][id]"
                          />
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`check_price_item_select_${roomSerivce.service.motelServiceId}`}
                            checked={roomSerivce.isSelected}
                            onChange={() => handleCheckboxChange(roomSerivce.service.motelServiceId)} // Cập nhật trạng thái khi thay đổi checkbox
                            name={`price_items[${roomSerivce.service.id}][is_selected]`}
                          />
                          <label htmlFor="check_price_item_select_23660">
                            <b>{roomSerivce.service.nameService}</b>{' '}
                            <p>
                              Giá: <b>{roomSerivce.service.price.toLocaleString('vi-VN')}&nbsp;₫</b> /{' '}
                              {roomSerivce.service.chargetype}
                            </p>{' '}
                          </label>
                        </div>
                        <div className="item-value">
                          <div className="input-group">
                            <input
                              className="form-control"
                              min="0"
                              type="number"
                              id={`price_item_select_${roomSerivce.service.motelServiceId}`}
                              placeholder="Nhập giá trị"
                              value={roomSerivce.quantity}
                              name="price_items[23660][value][]"
                              onChange={(e) => handleInputChangeService(e, roomSerivce.service.motelServiceId)} // Xử lý thay đổi input
                            />{' '}
                            <label className="input-group-text" htmlFor="bill_price_item_23660">
                              {roomSerivce.service.chargetype}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </form>
              </div>
              <div className="modal-footer modal-footer--sticky">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Đóng
                </button>
                <button type="button" id="submit-room" className="btn btn-primary" onClick={handleApplyServices}>
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
                  Áp dụng dịch vụ
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* Modal hiển thị tai san */}
      {/* them 1 dieu kien nhu da co tai san r moi duoc mo*/}
      {room ? (
        <div
          className="modal fade"
          data-bs-backdrop="static"
          id="assetSelect"
          tabIndex={-1}
          aria-labelledby="assetSelect"
          aria-modal="true"
          role="dialog"
          style={{ display: 'none', paddingLeft: '0px' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div
                  style={{
                    marginRight: '15px',
                    outline: '0',
                    boxShadow: '0 0 0 .25rem rgb(112 175 237 / 16%)',
                    opacity: '1',
                    borderRadius: '100%',
                    width: '36px',
                    height: '36px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    backgroundColor: 'rgb(111 171 232)'
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
                    className="feather feather-inbox">
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  </svg>
                </div>
                <h5 className="modal-title" id="addRoomLabel">
                  Thông tin tài sản
                  <span className="room-name"> &quot;{room.name}&quot;</span>
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  {' '}
                </button>
              </div>
              <div className="modal-body">
                {device.length > 0 ? (
                  <div className="row mt-4">
                    {device.map((item) => (
                      <div key={item.motel_device_id} className="col-12 border p-3 d-flex align-items-center mt-1">
                        <input
                          onChange={async (e) => {
                            if (e.target.checked) {
                              await applyRoomDevice(room, item.motel_device_id)
                            } else {
                              await cancelRoomDevice(room.roomId, item.motel_device_id)
                            }
                            const updatedDevices = await fetchDeviceByRoom(room.roomId)
                            setdeviceByRoom(updatedDevices.result)
                          }}
                          type="checkbox"
                          className="mx-3"
                          checked={deviceByRoom.some((it) => it.motelDevice.motel_device_id === item.motel_device_id)}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{item.deviceName}</h6>
                          <p className="mb-0">
                            Giá: <strong>{item.value}</strong> /{' '}
                            {item.unit == 'CAI'
                              ? 'Cái'
                              : item.unit == 'CHIEC'
                              ? 'Chiếc'
                              : item.unit == 'BO'
                              ? 'Bộ'
                              : 'Cặp'}
                          </p>
                        </div>
                        <div className="d-flex align-items-center">
                          <input
                            type="number"
                            value={1}
                            // onChange={() => {
                            //   handleChangeQuantityRoomDevice(room.roomId, item.motel_device_id, 200)
                            // }}
                            className="form-control text-center"
                            style={{ width: '100px' }}
                          />
                          <span className="mx-2">Số lượng</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="text-danger mt-2">Căn trọ chưa thiết lập tài sản nào, cần thêm tài sản !</p>
                  </div>
                )}
              </div>
              <div className="modal-footer modal-footer--sticky">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Đóng
                </button>
                {/* su kien onclick khi submit form cua thuan (nho thay doi)  */}
                {/* <button type="button" id="submit-room" className="btn btn-primary" onClick={handleApplyServices}>
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
                  Áp dụng tài sản
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* Modal hiển thị ghi chu */}
      {/* them 1 dieu kien nhu da co tai san r moi duoc mo*/}
      {room ? (
        <div
          className="modal fade"
          data-bs-backdrop="static"
          id="noteModal"
          tabIndex={-1}
          aria-labelledby="noteModal"
          aria-modal="true"
          role="dialog"
          style={{ display: 'none', paddingLeft: '0px' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div
                  style={{
                    marginRight: '15px',
                    outline: '0',
                    boxShadow: '0 0 0 .25rem rgb(112 175 237 / 16%)',
                    opacity: '1',
                    borderRadius: '100%',
                    width: '36px',
                    height: '36px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    backgroundColor: 'rgb(111 171 232)'
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
                    className="feather feather-inbox">
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  </svg>
                </div>
                <h5 className="modal-title" id="addRoomLabel">
                  Ghi chú
                  <span className="room-name"> &quot;{room.name}&quot;</span>
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  {' '}
                </button>
              </div>
              <div className="modal-body">
                <form method="POST" className="needs-validation" id="note-form" noValidate>
                  <textarea
                    type="text"
                    rows="10"
                    style={{ minHeight: '100px', height: '100px' }}
                    className="form-control"
                    name="note"
                    id="input_note"
                    placeholder="Ghi chú"
                    value={room.description || ''} // Sử dụng trực tiếp room.description
                    onChange={handleNoteChange} // Cập nhật trực tiếp khi textarea thay đổi
                    spellCheck="false"></textarea>
                </form>
              </div>
              <div className="modal-footer modal-footer--sticky">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Đóng
                </button>
                <button type="button" id="submit-room" className="btn btn-primary" onClick={handleAppNote}>
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
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <> </>
      )}

      {/* Modal hiển thị hoa don*/}
      {/* them 1 dieu kien nhu da co tai san r moi duoc mo*/}
      {room ? (
        <div
          className="modal fade"
          data-bs-backdrop="static"
          id="invoiceModal"
          tabIndex={-1}
          aria-labelledby="invoiceModal"
          aria-modal="true"
          role="dialog"
          style={{ display: 'none', paddingLeft: '0px' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div
                  style={{
                    marginRight: '15px',
                    outline: '0',
                    boxShadow: '0 0 0 .25rem rgb(112 175 237 / 16%)',
                    opacity: '1',
                    borderRadius: '100%',
                    width: '36px',
                    height: '36px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    backgroundColor: 'rgb(111 171 232)'
                  }}>
                  <i className="bi bi-inbox" style={{ fontSize: '25px' }}></i>
                </div>
                <h5 className="modal-title" id="addRoomLabel">
                  Lập hóa đơn
                  <span className="room-name"> &quot;{room.name}&quot;</span>
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  {' '}
                </button>
              </div>
              <div className="modal-body">
                <div className="row g-2">
                  <div className="col-12">
                    <div className="form-floating">
                      <select
                        name="chargetype"
                        className="form-select"
                        value={invoiceData.invoiceReason}
                        onChange={(e) => {
                          const selectedReason = e.target.value
                          console.log('Selected Reason:', selectedReason)
                          setInvoiceData((prev) => ({
                            ...prev,
                            invoiceReason: selectedReason
                          }))
                        }}>
                        <option value="Thu tiền hàng tháng">Thu tiền hàng tháng</option>
                        <option value="Thu tiền tháng đầu tiên">Thu tiền tháng đầu tiên</option>
                        <option value="Thu tiền khi kết thúc hợp đồng">Thu tiền khi kết thúc hợp đồng</option>
                        <option value="Thu tiền phòng chu kỳ">Thu tiền phòng chu kỳ</option>
                        <option value="Thu tiền dịch vụ">Thu tiền dịch vụ</option>
                        <option value="Thu tiền cọc">Thu tiền cọc</option>
                        <option value="Hoàn tiền cọc">Hoàn tiền cọc</option>
                      </select>
                      <label htmlFor="chargetype">
                        Đơn vị <label style={{ color: 'red' }}>*</label>
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="header-item">
                      <div className="input-group" style={{ marginTop: '20px' }}>
                        <div className="form-floating">
                          <Flatpickr
                            className="form-control"
                            name="month"
                            id="month"
                            placeholder="Nhập tháng"
                            value={invoiceData.invoiceCreateMonth}
                            options={{
                              locale: Vietnamese,
                              plugins: [
                                new monthSelectPlugin({
                                  shorthand: true,
                                  dateFormat: 'Y-m'
                                })
                              ]
                            }}
                            onChange={(date) =>
                              handleInputInvoice('invoiceCreateMonth', date[0].toISOString().slice(0, 7))
                            }
                          />
                          <label htmlFor="month">
                            Tháng lập phiếu <label style={{ color: 'red' }}>*</label>
                          </label>
                        </div>
                        <label className="input-group-text" htmlFor="month">
                          <i className="bi bi-calendar" style={{ fontSize: '25px' }}></i>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="header-item">
                      <div className="input-group" style={{ marginTop: '20px' }}>
                        <div className="form-floating">
                          <Flatpickr
                            className="form-control"
                            name="invoiceCreateDate"
                            id="invoiceCreateDate"
                            placeholder="Ngày lập phiếu"
                            required
                            value={invoiceData.invoiceCreateDate}
                            onChange={(date) =>
                              handleInputInvoice('invoiceCreateDate', date[0].toISOString().slice(0, 10))
                            }
                          />

                          <label htmlFor="invoiceCreateDate">
                            Ngày lập phiếu <label style={{ color: 'red' }}>*</label>
                          </label>
                        </div>
                        <label className="input-group-text" htmlFor="invoiceCreateDate">
                          <i className="bi bi-calendar" style={{ fontSize: '25px' }}></i>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="header-item">
                      <div className="input-group" style={{ marginTop: '20px' }}>
                        <div className="form-floating">
                          <Flatpickr
                            className="form-control"
                            name="dueDate"
                            id="dueDate"
                            placeholder="Hạn đóng tiền"
                            required
                            value={invoiceData.dueDate}
                            readOnly // Ngăn người dùng chỉnh sửa trực tiếp
                          />
                          <label htmlFor="dueDate">
                            Hạn đóng tiền <label style={{ color: 'red' }}>*</label>
                          </label>
                        </div>
                        <label className="input-group-text" htmlFor="dueDate">
                          <i className="bi bi-calendar" style={{ fontSize: '25px' }}></i>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <i className="bi bi-house me-2" style={{ fontSize: '25px', marginTop: '15px' }}></i>
                    <div className="title-item-small">
                      <b>Thu tiền hàng tháng</b>
                      <i className="des">
                        Ngày vào: <label style={{ color: 'rgb(255, 87, 34)' }}>{invoiceData.moveinDate}</label>. Chu kỳ
                        thu:
                        <label style={{ color: 'rgb(255, 87, 34)' }}>
                          {' '}
                          {contract.collectioncycle} tháng, thu cuối tháng
                        </label>
                      </i>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="header-item">
                      <div className="input-group" style={{ marginTop: '20px' }}>
                        <div className="form-floating">
                          <Flatpickr
                            className="form-control"
                            name="moveinDate"
                            id="moveinDate"
                            placeholder="Từ ngày"
                            value={invoiceData.moveinDate}
                            onChange={(date) => {
                              const formattedDate = date.length > 0 ? date[0].toISOString().slice(0, 10) : ''
                              setInvoiceData((prev) => ({ ...prev, moveinDate: formattedDate }))
                            }}
                            required
                            options={{
                              allowInput: true,
                              dateFormat: 'Y-m-d'
                            }}
                          />
                          <label htmlFor="moveinDate">
                            Từ ngày <label style={{ color: 'red' }}>*</label>
                          </label>
                        </div>
                        <label className="input-group-text" htmlFor="moveinDate">
                          <i className="bi bi-calendar" style={{ fontSize: '25px' }}></i>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="header-item">
                      <div className="input-group" style={{ marginTop: '20px' }}>
                        <div className="form-floating">
                          <Flatpickr
                            className="form-control"
                            name="dueDateofmoveinDate"
                            id="dueDateofmoveinDate"
                            placeholder="Đến ngày"
                            value={invoiceData.dueDateofmoveinDate}
                            onChange={(date) => {
                              const formattedDate = date.length > 0 ? date[0].toISOString().slice(0, 10) : ''
                              setInvoiceData((prev) => ({ ...prev, dueDateofmoveinDate: formattedDate }))
                            }}
                            required
                            options={{
                              allowInput: true,
                              dateFormat: 'Y-m-d'
                            }}
                          />
                          <label htmlFor="dueDateofmoveinDate">
                            Đến ngày <label style={{ color: 'red' }}>*</label>
                          </label>
                        </div>
                        <label className="input-group-text" htmlFor="dueDateofmoveinDate">
                          <i className="bi bi-calendar" style={{ fontSize: '25px' }}></i>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* tien roomm */}
                  <div
                    className="col-12"
                    style={{
                      border: '1px solid #e8f8ff',
                      borderRadius: '10px',
                      backgroundColor: '#e8f8ff',
                      padding: '10px 15px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                    <div>
                      <label className="form-check-label" htmlFor="subtraction">
                        <b>Thu tiền hàng tháng</b>
                        <p style={{ margin: '0', color: 'orange' }}>
                          {contract.collectioncycle} tháng, 0 ngày{' '}
                          <span style={{ color: 'black' }}> x {contract.price?contract.price.toLocaleString('vi-VN'):"00"} ₫</span>
                        </p>
                      </label>
                    </div>
                    <div>
                      <label className="form-check-label" htmlFor="subtraction">
                        <b>Thành tiền</b>
                        <p style={{ margin: '0' }}> {contract.price?contract.price.toLocaleString('vi-VN'):"00"} ₫</p>
                      </label>
                    </div>
                  </div>
                  {/* tien roomm */}

                  <div className="col-12">
                    <i className="bi bi-shield me-2" style={{ marginTop: '15px', fontSize: '25px' }}></i>
                    <div className="title-item-small">
                      <b>Tiền dịch vụ</b>
                      <i className="des">Tính tiền dịch vụ khách xài </i>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="price-items-checkout-layout">
                      {roomSerivces.map((roomSerivce, index) => (
                        <div className="item" key={index}>
                          <div className="item-check-name">
                            <input className="form-check-input" type="hidden" value="23660" />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`check_price_item_select_${roomSerivce.service.motelServiceId}`}
                              checked={roomSerivce.isSelected}
                              onChange={() => handleCheckboxChange(roomSerivce.service.motelServiceId)}
                              name={`price_items[${roomSerivce.service.id}][is_selected]`}
                            />
                            <label htmlFor="service">
                              <b>{roomSerivce.service.nameService}</b>{' '}
                              <p>
                                Giá: <b>{roomSerivce.service.price.toLocaleString('vi-VN')}&nbsp;VNĐ</b> /{' '}
                                {roomSerivce.service.chargetype}
                              </p>{' '}
                            </label>
                          </div>
                          <div className="item-value">
                            <div className="input-group">
                              <input
                                className="form-control"
                                min="0"
                                type="number"
                                id={`price_item_select_${roomSerivce.service.motelServiceId}`}
                                placeholder="Nhập giá trị"
                                value={roomSerivce.quantity}
                                onChange={(e) => handleInputChangeService(e, roomSerivce.service.motelServiceId)}
                              />{' '}
                              <label className="input-group-text" htmlFor="service">
                                {roomSerivce.service.chargetype}
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="col-12"
                    style={{
                      border: '1px solid #e8f8ff',
                      borderRadius: '10px',
                      backgroundColor: '#e8f8ff',
                      padding: '10px 15px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                    <div>
                      <label className="form-check-label" htmlFor="subtraction">
                        <b>Tính tiền dịch vụ</b>
                        <p style={{ margin: '0' }}>
                          Số lượng sử dụng: <b>{roomSerivces.filter((service) => service.isSelected).length} dịch vụ</b>
                        </p>
                        <p style={{ margin: '0', color: 'orange' }}>{contract.collectioncycle} tháng, 0 ngày</p>
                      </label>
                    </div>
                    <div>
                      <label className="form-check-label" htmlFor="subtraction">
                        <b>Thành tiền</b>
                        <p style={{ margin: '0' }}>
                          {roomSerivces
                            .filter((service) => service.isSelected)
                            .reduce((total, service) => total + (service.totalPrice || 0), 0)
                            .toLocaleString('vi-VN')}{' '}
                          ₫
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <i className="bi bi-house" style={{ fontSize: '25px', marginRight: '8px' }}></i>
                    <div className="title-item-small">
                      <b>Cộng thêm / Giảm trừ:</b>
                      <i className="des">Ví dụ giảm ngày tết, giảm trừ covid, thêm tiền phạt... </i>
                    </div>
                  </div>

                  <div className="loz-alert warning" style={{ marginBottom: '10px', marginTop: '10px' }}>
                    <div className="icon flex-0">
                      <i className="bi bi-info-circle" style={{ fontSize: '24px' }}></i>
                    </div>
                    <div className="des flex-1">
                      Chú ý: Cộng thêm / giảm trừ không nên là tiền cọc. Hãy chọn lý do có tiền cọc để nếu cần
                    </div>
                  </div>

                  <div className="col-12">
                    {additionItems.map((item, index) => (
                      <div key={item.id} className="row g-0 item mt-1 mb-1 border rounded">
                        <div className="col-3">
                          <div className="">
                            <div className="border-bottom p-2 pb-3 pt-3">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`addition_items[${index}]['addition']`}
                                  id={`addition_a_bill_${item.id}`}
                                  value="1"
                                  checked={item.addition === 1}
                                  onChange={() => handleChange(item.id, 'addition', 1)}
                                />
                                <label className="form-check-label" htmlFor={`addition_a_bill_${item.id}`}>
                                  Cộng [+]
                                </label>
                              </div>
                            </div>
                            <div className="p-2 pt-3 pb-3">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`addition_items[${index}]['addition']`}
                                  id={`addition_b_bill_${item.id}`}
                                  value="0"
                                  checked={item.addition === 0}
                                  onChange={() => handleChange(item.id, 'addition', 0)}
                                />
                                <label className="form-check-label" htmlFor={`addition_b_bill_${item.id}`}>
                                  Giảm [-]
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-8">
                          <div className="row">
                            <div className="col-12">
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="border-bottom form-control"
                                  name={`addition_items[${index}]['addition_value']`}
                                  placeholder="Số tiền cộng thêm hoặc giảm trừ"
                                  value={item.additionValue}
                                  onChange={(e) => handleChange(item.id, 'additionValue', e.target.value)}
                                  required
                                />
                                <label>Số tiền (đ)</label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-floating">
                                <textarea
                                  rows="10"
                                  style={{ minHeight: '60px' }}
                                  className="form-control"
                                  name={`addition_items[${index}]['addition_reason']`}
                                  placeholder="Nhập lý do"
                                  value={item.additionReason}
                                  onChange={(e) => handleChange(item.id, 'additionReason', e.target.value)}
                                  required></textarea>
                                <label>Lý do</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-1"
                          style={{
                            borderRadius: '0 5px 5px 0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#ffeee9'
                          }}>
                          <button
                            className="btn delete"
                            type="button"
                            style={{ color: 'red', height: '100%' }}
                            onClick={() => removeItem(item.id)}>
                            Xóa
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-secondary mt-2"
                      style={{ width: '100%' }}
                      onClick={addNewItem}>
                      <i className="bi bi-plus" style={{ fontSize: '24px', marginRight: '8px' }}></i>
                      Thêm mục cộng thêm / giảm trừ
                    </button>
                  </div>

                  <div className="col-12">
                    <div
                      style={{
                        border: '1px solid #e8f8ff',
                        borderRadius: '10px',
                        backgroundColor: '#e8f8ff',
                        padding: '10px 15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                      <div>
                        <label className="form-check-label">
                          <p style={{ margin: '0' }}>Phát sinh (Cộng/Trừ)</p>
                          <p style={{ margin: '0', color: 'orange' }}>
                            {additionItems.length > 0
                              ? additionItems.map((item) => (
                                  <span key={item.id}>
                                    {item.addition === 1 ? 'Cộng: ' : 'Trừ: '}
                                    {parseFloat(item.additionValue || 0).toLocaleString('vi-VN')} ₫ - Lý do:{' '}
                                    {item.additionReason || 'Không có'}
                                    <br />
                                  </span>
                                ))
                              : 'Không có khoản phát sinh'}
                          </p>
                        </label>
                      </div>
                      <div>
                        <label className="form-check-label">
                          <p style={{ margin: '0' }}>Thành tiền phát sinh</p>
                          <p style={{ margin: '0' }}>{calculateTotalAddition().toLocaleString('vi-VN')} ₫</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer modal-footer--sticky" style={{ backgroundColor: 'white' }}>
                <div className="row">
                  <div className="col-8">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="send_to_zalo"
                        id="send_to_zalo"
                        value="1"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="send_to_zalo">
                        <b style={{ color: '#2196F3' }}>Gửi ZALO & APP khách thuê</b>
                        <div>Hệ thống sẽ tự động gửi hóa đơn tới ZALO và APP khách</div>
                        <div>
                          <strong style={{ color: 'orangered' }}>
                            *Lưu ý: Chỉ có thể gửi zalo cho khách thuê từ 6.00 đến 22.00 giờ
                          </strong>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div>
                      <span>Tổng cộng hóa đơn</span>
                    </div>
                    <b className="show-total total-price bill-total" style={{ color: 'rgb(54 147 230)' }}>
                      {(
                        (parseFloat(contract.price?contract.price.toString().replace(/\./g, '').replace(/ ₫/, '') :"0") || 0) + // Giá hợp đồng
                        roomSerivces
                          .filter((service) => service.isSelected)
                          .reduce((total, service) => {
                            const rawServicePrice = parseFloat(service.totalPrice?.toString().replace(/\./g, '').replace(/ ₫/, '')) || 0;
                            return total + rawServicePrice;
                          }, 0) + // Tổng giá các dịch vụ đã chọn
                        calculateTotalAddition() // Tổng giá phát sinh
                      ).toLocaleString('vi-VN')}{' '}
                      ₫
                    </b>
                  </div>
                  
                </div>

                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  <i className="bi bi-x"></i>
                  Đóng
                </button>
                <button type="button" id="submit-room" className="btn btn-primary" onClick={createInvoice}>
                  <i className="bi bi-plus"></i>
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <> </>
      )}
      <RentRoomModal modalOpen={modalOpen} toggleModal={toggleModal} motelId={motelId} />
      <ModalEndContract
        modalOpen={modalOpenEndContract}
        toggleModal={toggleEndContract}
        roomId={room ? room.roomId : <></>}
      />

      <ModalChangeRoom
        modalOpen={modalOpenChangeRoom}
        toggleModal={toggleChangeRoom}
        roomId={room ? room.roomId : <></>}
      />

      <ModalExtendContract
        modalOpen={modalOpenExtendContract}
        toggleModal={toggleEntendContract}
        roomId={room ? room.roomId : <></>}
      />

      <ReserveAPlaceModal
        modalOpen={modalOpenReAPlace}
        toggleModal={toggleModalReAPlace}
        roomId={room ? room.roomId : <></>}
      />
      <ReserveAPlaceDetail
        modalOpen={detailOpenReAPlace}
        toggleModal={toggleDetailReAPlace}
        roomId={room ? room.roomId : <></>}
      />
      <ModalCreateContract
        modalOpen={modalOpenContract}
        toggleModal={toggleModalContract}
        motelId={motelId ? motelId : <></>}
        roomId={room ? room.roomId : <></>}
      />
      <ModalReportContract
        modalOpen={modalOpenReportContract}
        toggleModal={toggleReportContract}
        roomId={room ? room.roomId : <></>}
      />
      <ModalCancelReportContract
        modalOpen={modalOpenCancelReportContract}
        toggleModal={toggleCancelReportContract}
        roomId={room ? room.roomId : <></>}
      />

      <ModalListCar modalOpen={modalOpenCar} toggleModal={toggleCar} roomId={room ? room.roomId : <></>} />
    </div>
  )
}

export default HomeWData
