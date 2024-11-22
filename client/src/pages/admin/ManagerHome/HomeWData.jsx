/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip } from 'react-tooltip'
import { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import 'react-tabulator/lib/styles.css' // required styles
import 'react-tabulator/lib/css/tabulator.min.css' // theme
import { ReactTabulator } from 'react-tabulator'
import axios from 'axios'
import { env } from '~/configs/environment'
import Swal from 'sweetalert2'
import {
  getRoomByMotelId,
  createRoom,
  createRoomService,
  getServiceRoombyRoomId,
  getRoomById,
  DeleteRoomByid,
  updateRoom
} from '~/apis/roomAPI'
import { Modal } from 'bootstrap' // Import Bootstrap Modal API
import {
  changeQuantityRoomDevice,
  deleteRoomDevice,
  getAllDeviceByRomId,
  getAllMotelDevices,
  insertRoomDevice
} from '~/apis/deviceAPT'
import RentRoomModal from '../NavContentAdmin/RentRoomModal'
const HomeWData = ({ Motel }) => {
  const { motelId } = useParams()
  const [rooms, setRooms] = useState([])
  const [motelServices, setMotelServices] = useState([])
  const [showMenu, setShowMenu] = useState(null) // Trạng thái của menu hiện tại
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const menuRef = useRef(null) // Tham chiếu đến menu
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
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
      id: Date.now(), // Unique ID
      addition: 1, // Default value for "Cộng [+]"
      additionValue: '',
      additionReason: ''
    }
    setAdditionItems([...additionItems, newItem])
  }

  const removeItem = (id) => {
    setAdditionItems(additionItems.filter((item) => item.id !== id))
  }

  const handleChange = (id, field, value) => {
    setAdditionItems(additionItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const [roomSerivces, setRoomSerivces] = useState([])
  const [room, setRoom] = useState()
  const [note, setNote] = useState('') // Tạo state để lưu ghi chú
  const [device, setdevice] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }
  // Hàm xử lý nhấn ngoài menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Kiểm tra xem nhấn ngoài menu hay không
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(null)
      }
    }

    if (motelId) {
      getMotelById(motelId).then((res) => {
        setMotelName(res.data.result.motelName)
      })
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [location])

  useEffect(() => {
    fetchRooms()
    fetchDevices()
  }, [location])

  // Hàm xử lý thay đổi trạng thái checkbox
  const handleCheckboxChange = (serviceId) => {
    // Cập nhật lại trạng thái của `isSelected` cho dịch vụ với `serviceId`
    setRoomSerivces((prevState) =>
      prevState.map((service) =>
        service.service.motelServiceId === serviceId
          ? { ...service, isSelected: !service.isSelected } // Đảo ngược trạng thái
          : service
      )
    )
  }

  //ham lay dich vu phong
  const fetchDataServiceRooms = async (id) => {
    try {
      const response = await getServiceRoombyRoomId(id)
      // Thêm trường `isSelected` vào từng dịch vụ
      const updatedServices = response.map((service) => ({
        ...service,
        isSelected: true // Mặc định là chọn (checked)
      }))
      console.log(updatedServices)

      // Cập nhật lại trạng thái với danh sách dịch vụ đã có trường `isSelected`
      setRoomSerivces(updatedServices)
    } catch (error) {
      console.log(error)
    }
  }
  const handleChangeQuantityRoomDevice = async (roomId, motel_device_id, quantity) => {
    const data = {
      roomId: roomId,
      motel_device_id: motel_device_id,
      quantity: quantity
    }
    const response = await changeQuantityRoomDevice(data)
    if (response.result == true) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'change quantity successfully!'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Thành công',
        text: 'change quantity failed!'
      })
    }
  }

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
    if ((response.code = 200)) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'RoomDevice apply successfully!'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: 'RoomDevice apply failed!'
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
  // Hàm để xử lý khi người dùng nhấn nút "Áp dụng dịch vụ"
  // const handleApplyServices = async () => {
  //   // Lọc các dịch vụ không được chọn
  //   const servicesToDelete = roomSerivces.filter((service) => !service.isSelected)
  //   const servicesToUpdate = roomSerivces.filter((service) => service.isSelected)

  //   // Gọi API để xóa các dịch vụ không được chọn
  //   for (const service of servicesToDelete) {
  //     console.log(service)
  //     DeleteRoomServiceByid(service.roomServiceId)
  //   }

  //   for (const service of servicesToUpdate) {
  //     let SerivceUpdate = {
  //       roomServiceId: service.roomServiceId,
  //       roomId: service.room.roomId,
  //       serviceId: service.service.motelServiceId,
  //       quantity: service.quantity
  //     }
  //     console.log(SerivceUpdate)

  //     updateSerivceRoom(service.roomServiceId, SerivceUpdate)
  //     console.log('Service can update', service)
  //   }

  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Thông báo',
  //     text: 'All Serivce Room updated successfully!'
  //   })
  //   const modalElement = document.getElementById('priceItemSelect')
  //   const modal = Modal.getInstance(modalElement) // Lấy instance của modal
  //   modal.hide() // Đóng modal
  //   // Xóa toàn bộ backdrop (nếu có)
  //   // Xóa tất cả các backdrop (nếu có nhiều backdrop)
  //   const backdropElements = document.querySelectorAll('.modal-backdrop')
  //   backdropElements.forEach((backdrop) => backdrop.remove()) // Xóa tất cả các backdrop
  //   fetchDataServiceRooms(room.roomId)
  // }

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
  const handleInputChangeService = (e, motelServiceId) => {
    const newQuantity = e.target.value // Lấy giá trị mới từ input
    // Cập nhật lại trạng thái của roomSerivces
    const updatedRoomServices = roomSerivces.map((roomService) => {
      if (roomService.service.motelServiceId === motelServiceId) {
        return {
          ...roomService,
          quantity: newQuantity // Cập nhật số lượng
        }
      }
      return roomService
    })

    // Cập nhật lại state hoặc dữ liệu của bạn
    setRoomSerivces(updatedRoomServices) // Giả sử setRoomServices là hàm setState của bạn
  }

  const fetchRooms = async () => {
    //neu co motelId tren URL
    if (motelId) {
      try {
        const dataRoom = await getRoomByMotelId(motelId)
        console.log(dataRoom)

        setRooms(dataRoom)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const dataRoom = await getRoomByMotelId(Motel[0].motelId)
        setRooms(dataRoom)
      } catch (error) {
        console.log(error)
      }
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
    const financeValue = cell.getValue()
    // Nếu giá trị tài chính là "Đang trống", hiển thị badge với màu cam
    if (financeValue === 'ACTIVE') {
      return `<span class="badge mt-2 " style="background-color: #7dc242; white-space: break-spaces;">Đang ở</span>`
    }
    if (financeValue === 'ENDED' || financeValue === undefined) {
      return `<span class="badge mt-2 " style="background-color: #ED6004; white-space: break-spaces;">Đang trống</span>`
    }

    // Nếu không phải "Đang trống", hiển thị giá trị tài chính
    return financeValue
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
    const response = await getAllDeviceByRomId(roomId)
    console.log(response.result)

    if (response.result.length > 0) {
      setdeviceByRoom(response.result)
    } else {
      setdeviceByRoom([])
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
      setShowMenu(null) // Đóng menu
    } else if (label === 'Danh sách khách thuê') {
      toggleModal(!modalOpen)
      setShowMenu(null) // Đóng menu
    } else {
      alert(`Action: ${label} on room ${showMenu}`)
    }
  }

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
    { title: 'Tên phòng', field: 'name', hozAlign: 'center', minWidth: 60, editor: 'input', cssClass: 'bold-text' }, // Đặt minWidth để tránh cột bị quá nhỏ
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
                      <h3 className="text-danger">0đ</h3>
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
                      <h3 style={{ color: '#20a9e7' }}>0đ</h3>
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
                      <h3 style={{ color: '#20a9e7' }}>0đ</h3>
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
                <i className="des">Tất cả danh sách phòng trong Nhà trọ {motelName ? motelName : ''}</i>
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
                        12
                      </span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="list-show-column">
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="form-check-input"
                            name="group_id"
                            value="group_id"
                          />{' '}
                          Nhóm
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="form-check-input"
                            name="deposit_contract_amount"
                            value="deposit_contract_amount"
                          />{' '}
                          Mức tiền cọc
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="form-check-input"
                            name="debt_amount"
                            value="debt_amount"
                          />{' '}
                          Tiền nợ
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="form-check-input"
                            name="customers"
                            value="customers"
                          />{' '}
                          Khách thuê
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="form-check-input"
                            name="circle_day"
                            value="circle_day/"
                          />{' '}
                          Ngày lập hóa đơn
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="form-check-input"
                            name="circle_month"
                            value="circle_month"
                          />{' '}
                          Chu kỳ thu tiền
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="form-check-input"
                            name="date_join"
                            value="date_join"
                          />{' '}
                          Ngày vào ở
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="form-check-input"
                            name="date_terminate"
                            value="date_terminate"
                          />{' '}
                          Thời hạn hợp đồng
                        </label>
                      </li>
                    </ul>
                  </div>
                  <button id="download-excel" style={{ marginLeft: '10px' }} className="ml-2 btn btn-primary">
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
                    Xuất excel
                  </button>
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
                      Đang ở
                    </label>
                    <span className="count-filter active success">0</span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_empty"
                      data-value="status"
                      value="is_empty"
                    />
                    <label className="form-check-label" htmlFor="is_empty">
                      Đang trống
                    </label>
                    <span className="count-filter empty error">0</span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_terminate_contract"
                      data-value="status"
                      value="is_terminate_contract"
                    />
                    <label className="form-check-label" htmlFor="is_terminate_contract">
                      Đang báo kết thúc{' '}
                    </label>
                    <span className="count-filter tick-terminate warning">0</span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_will_terminate_contract"
                      data-value="status"
                      value="is_will_terminate_contract"
                    />
                    <label className="form-check-label" htmlFor="is_will_terminate_contract">
                      Sắp hết hạn hợp đồng
                    </label>
                    <span className="count-filter will-terminate warning">0</span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_expire"
                      data-value="status"
                      value="is_expire"
                    />
                    <label className="form-check-label" htmlFor="is_expire">
                      Đã quá hạn hợp đồng
                    </label>
                    <span className="count-filter expire disable">0</span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_deposit_temp"
                      data-value="status"
                      value="is_deposit_temp"
                    />
                    <label className="form-check-label" htmlFor="is_deposit_temp">
                      Đang cọc giữ chỗ
                    </label>
                    <span className="count-filter deposit-temp warning">0</span>
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
                    <span className="count-filter debt error">0</span>
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
                columns={columns}
                data={rooms}
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
                    top: menuPosition.y - 910,
                    left: menuPosition.x - 350,
                    transform: 'translateX(-50%)'
                  }}>
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      // Gắn ref vào tag này
                      className={`tabulator-menu-item ${item.textClass || ''}`}
                      onClick={() => {
                        if (item.icon === 'user') {
                          toggleModal()
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
                  Áp dụng dịch vụ
                </button> */}
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
                    {device.map((item, i) => (
                      <div key={i} className="col-12 border p-3 d-flex align-items-center mt-1">
                        <input type="checkbox" className="mx-3" />
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
                            onChange={(e) => {
                              handleChangeQuantityRoomDevice(room.roomId, item.motel_device_id, 200)
                            }}
                            className="form-control text-center"
                            value={
                              deviceByRoom.some((it) => it.motelDevice.motel_device_id === item.motel_device_id)
                                ? deviceByRoom.find((it) => it.motelDevice.motel_device_id === item.motel_device_id)
                                    .quantity
                                : 1
                            }
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
                  Lập hóa đơn
                  <span className="room-name"> &quot;{room.name}&quot;</span>
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  {' '}
                </button>
              </div>
              <div className="modal-body"></div>
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
      <RentRoomModal modalOpen={modalOpen} toggleModal={toggleModal} />
    </div>
  )
}

export default HomeWData
