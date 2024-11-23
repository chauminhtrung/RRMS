/* eslint-disable no-unused-vars */
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Avatar,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  Divider,
  styled,
  IconButton,
  CardContent,
  CircularProgress
} from '@mui/material'
import { useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AddIcon from '@mui/icons-material/Add'
import axios from 'axios'
import Swal from 'sweetalert2'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '~/configs/firebaseConfig'
import { v4 } from 'uuid'
import { toast } from 'react-toastify'
import { getByIdTenant, updateTenant } from '~/apis/tenantAPI'
import { env } from '~/configs/environment'
import { getRoomById } from '~/apis/apiClient'
import { getRoomByMotelIdWContract, getRoomByMotelIdYContract } from '~/apis/roomAPI'
import { useParams } from 'react-router-dom'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})
const AddTenantModal = ({ open, onClose, reloadData, avatar, editId, toggleTenant, tenantOpen }) => {
  const [provinces, setProvinces] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [wards, setWards] = useState([])
  const [addressDetail, setAddressDetail] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [checkedStates, setCheckedStates] = useState([false, false, false])
  const [avatarImage, setAvatarImage] = useState(null)
  const [frontImage, setFrontImage] = useState(null) // Ảnh mặt trước
  const [backImage, setBackImage] = useState(null) // Ảnh mặt sau
  const [frontUrl, setFrontUrl] = useState('') // URL mặt trước
  const [backUrl, setBackUrl] = useState('') // URL mặt sau
  const [frontProgress, setFrontProgress] = useState(0) // Tiến trình ảnh mặt trước
  const [backProgress, setBackProgress] = useState(0) // Tiến trình ảnh mặt sau
  const [phoneError, setPhoneError] = useState('')
  const [cccdError, setCccdError] = useState('')

  const [rooms, setRooms] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [loading, setLoading] = useState(false)

  const { motelId } = useParams()

  useEffect(() => {
    const fetchRooms = async () => {
      if (!motelId) return // Đảm bảo có motelId trước khi thực hiện gọi API
      setLoading(true)
      console.log('aa')

      try {
        const dataRoom = await getRoomByMotelIdYContract(motelId)
        setRooms(dataRoom || [])
        console.log(dataRoom)
      } catch (error) {
        console.error('Error fetching rooms:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [motelId, getRoomByMotelIdYContract])

  const handleRoomClick = async (roomId) => {
    if (!roomId) {
      setSelectedRoom(null) // Không có ID phòng thì bỏ chọn
      return
    }

    setLoading(true)
    try {
      const dataRoom = await getRoomById(roomId)

      setSelectedRoom(dataRoom || null) // Lưu trữ thông tin phòng đã chọn
      console.log('Room selected:', roomId) // Hiển thị ID của phòng đã chọn
    } catch (error) {
      console.error('Error fetching room details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChangeFront = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      setFrontImage(image) // Lưu ảnh mặt trước vào state

      // Tiến hành upload ảnh mặt trước và lấy URL
      const imageName = v4() // Tạo tên ngẫu nhiên cho ảnh
      const storageRef = ref(storage, `images/tenant/${imageName}`)
      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          setFrontProgress(progressValue)
        },
        (error) => {
          console.error('Upload error:', error) // Xử lý lỗi nếu có
        },
        () => {
          // Lấy URL của ảnh mặt trước sau khi tải lên thành công
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setFrontUrl(url) // Cập nhật URL ảnh mặt trước vào state
            console.log(url)
            setTenant((prevTenant) => ({
              ...prevTenant,
              frontPhoto: url // Cập nhật URL ảnh mặt trước vào tenant
            }))
          })
        }
      )
    }
  }

  const handleChangeBack = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      setBackImage(image) // Lưu ảnh mặt sau vào state

      // Tiến hành upload ảnh mặt sau và lấy URL
      const imageName = v4() // Tạo tên ngẫu nhiên cho ảnh
      const storageRef = ref(storage, `images/tenant/${imageName}`)
      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          setBackProgress(progressValue) // Cập nhật tiến trình tải lên
        },
        (error) => {
          console.error('Upload error:', error) // Xử lý lỗi nếu có
        },
        () => {
          // Lấy URL của ảnh mặt sau sau khi tải lên thành công
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setBackUrl(url) // Cập nhật URL ảnh mặt sau vào state
            console.log(url)
            // Cập nhật tenant với URL ảnh mặt sau
            setTenant((prevTenant) => ({
              ...prevTenant,
              backPhoto: url // Cập nhật ảnh mặt sau vào tenant
            }))
          })
        }
      )
    }
  }

  // Hàm xử lý khi người dùng chọn ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0] // Lấy tệp đầu tiên từ danh sách files
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarImage(reader.result) // Cập nhật state với ảnh đã chọn dưới dạng base64
      }
      reader.readAsDataURL(file) // Đọc ảnh dưới dạng base64
    }
  }

  // Hàm xử lý thay đổi trạng thái checkbox
  const handleCheckboxChange = (index) => (event) => {
    const newCheckedStates = [...checkedStates]
    newCheckedStates[index] = event.target.checked
    setCheckedStates(newCheckedStates)
  }

  const fetchProvinces = async () => {
    try {
      const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
      const data = await response.json()
      setProvinces(data.data)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách tỉnh/thành:', error)
    }
  }

  // Hàm để lấy danh sách quận/huyện theo tỉnh/thành từ API
  const fetchDistricts = async (provinceId) => {
    try {
      const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`)
      const data = await response.json()
      setDistricts(data.data)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách quận/huyện:', error)
    }
  }
  // Lấy danh sách phường/xã dựa trên quận/huyện đã chọn
  const fetchWards = async (districtId) => {
    try {
      const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`)
      const data = await response.json()
      setWards(data.data)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phường/xã:', error)
    }
  }

  // Lấy danh sách tỉnh/thành khi component được render lần đầu
  useEffect(() => {
    fetchProvinces()
  }, [])

  // Hàm xử lý khi chọn tỉnh/thành
  const handleProvinceChange = (event) => {
    const provinceId = event.target.value
    setSelectedProvince(provinceId)
    setDistricts([]) // Xóa dữ liệu quận/huyện khi chọn tỉnh mới
    setWards([]) // Xóa dữ liệu phường/xã khi chọn tỉnh mới
    fetchDistricts(provinceId)
  }

  // Hàm xử lý khi chọn quận/huyện
  const handleDistrictChange = (event) => {
    const districtId = event.target.value
    setSelectedDistrict(districtId)
    setWards([]) // Xóa dữ liệu phường/xã khi chọn quận mới
    fetchWards(districtId)
  }

  // Hàm xử lý khi chọn phường/xã
  const handleWardChange = (event) => {
    setSelectedWard(event.target.value)
  }

  const [tenant, setTenant] = useState({
    fullname: '',
    phone: '',
    idType: '',
    cccd: '',
    zalo: '',
    gender: '',
    birthday: '',
    job: '',
    licenseDate: '',
    placeOfLicense: '',
    frontPhoto: '',
    backPhoto: '',
    avatar: null,
    province: '',
    district: '',
    ward: '',
    address: '',
    type_of_tenant: false,
    temporaryResidence: false,
    informationVerify: false
  })
  const handleChange = (e) => {
    setTenant({
      ...tenant,
      phone: e.target.value
    })
  }
  const handleIdTypeChange = (e) => {
    setTenant({
      ...tenant,
      idType: e.target.value
    })
  }
  const handleGenderChange = (e) => {
    setTenant({
      ...tenant,
      gender: e.target.value
    })
  }

  const handleAddressDetailChange = (event) => {
    setAddressDetail(event.target.value)
    updateAddress(selectedProvince, selectedDistrict, selectedWard, event.target.value)
  }

  const updateAddress = (provinceId, districtId, wardId, addressDetailValue) => {
    const provinceName = provinces.find((p) => p.id === provinceId)?.full_name || ''
    const districtName = districts.find((d) => d.id === districtId)?.full_name || ''
    const wardName = wards.find((w) => w.id === wardId)?.full_name || ''
    const fullAddress = `${addressDetailValue}, ${wardName}, ${districtName}, ${provinceName}`.replace(
      /(^, )|( ,$)/g,
      ''
    )
    setTenant({ ...tenant, address: fullAddress })
  }

  const saveTenant = async (e) => {
    e.preventDefault()

    const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
    if (!token) {
      onClose()
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Token is missing, please login again.'
      })
      return
    }

    if (!tenant || !tenant.fullname?.trim() || !tenant.phone?.trim() || !tenant.address?.trim()) {
      console.log('dd')
      onClose()
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Please fill in all required fields.'
      })
      return
    }

    tenant.gender = tenant.gender?.trim() || 'MALE'

    try {
      const response = await axios.post(`${env.API_URL}/tenant/insert`, tenant, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420'
        }
      })

      console.log('Tenant saved successfully:', response.data)
      Swal.fire({ icon: 'success', title: 'Thành công', text: 'Thêm dịch vụ thành công!' })
      reloadData()
      onClose()
    } catch (error) {
      console.error('Error saving tenant:', error)

      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Please fill in all required fields.'
      })
      onClose()
    }
  }

  useEffect(() => {
    console.log(editId)
    setTenant({
      fullname: '',
      phone: '',
      idType: '',
      cccd: '',
      zalo: '',
      gender: '',
      birthday: '',
      job: '',
      licenseDate: '',
      placeOfLicense: '',
      frontPhoto: '',
      backPhoto: '',
      avatar: null,
      province: '',
      district: '',
      ward: '',
      address: '',
      type_of_tenant: false,
      temporaryResidence: false,
      informationVerify: false
    })
    if (editId) {
      getByIdTenant(editId).then((res) => {
        console.log(res.result)
        setTenant(res.result)
      })
    }
  }, [editId])

  const handleUpdateClick = () => {
    console.log('Tenant data:', tenant) // Kiểm tra dữ liệu trước khi gửi
    if (!tenant || !editId) {
      Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: 'Vui lòng cung cấp đầy đủ thông tin khách hàng!'
      })
      onClose()

      return
    }

    updateTenant(editId, tenant)
      .then((res) => {
        setTenant(res.result)
        Swal.fire({ icon: 'success', title: 'Thành công', text: 'Cập nhật khách hàng thành công!' })
        onClose()
        reloadData()
      })
      .catch((error) => {
        console.error('Failed to update tenant:', error)
        Swal.fire({ icon: 'error', title: 'Thất bại', text: 'Cập nhật khách hàng thất bại!' })
        onClose()
      })
  }

  return (
    <Modal open={open} onClose={onClose} openAddTenantModal={toggleTenant} tenantOpen={tenantOpen}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1220,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
          maxHeight: '80vh',
          overflowY: 'scroll'
        }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          <IconButton
            sx={{
              backgroundColor: '#1e90ff',
              color: 'white',
              borderRadius: '50%',
              '&:hover': { backgroundColor: '#43a047' }
            }}>
            <AddIcon />
          </IconButton>
          Thêm thông tin khách thuê cho phòng
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <form className="needs-validation" noValidate id="add-contract-form">
              <div className="row">
                <div>
                  <div>
                    <div className="title-item-small">
                      <b>Danh sách phòng</b>
                      <i className="des">Danh sách phòng để thêm khách thuê</i>
                    </div>
                  </div>
                  <div>
                    <div className="room-list mt-3">
                      {rooms ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {/* Lặp qua các phòng và nhóm chúng thành từng cặp */}
                          {rooms.map((room, index) => {
                            // Mỗi nhóm sẽ có 2 phòng, chúng ta chia danh sách phòng thành các cặp
                            if (index % 2 === 0) {
                              return (
                                <Grid container spacing={2} key={index}>
                                  <Grid item xs={12} sm={6}>
                                    <div
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        width: '280px',
                                        height: '130px',
                                        padding: '10px',
                                        cursor: 'pointer'
                                      }}
                                      onClick={() => handleRoomClick(room.roomId)} // Click vào phòng
                                    >
                                      <div
                                        className="d-flex room-item-inner align-items-center"
                                        style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="flex-grow-0 icon-room" style={{ paddingRight: '10px' }}>
                                          {selectedRoom && selectedRoom.roomId === room.roomId ? (
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              stroke="#00BFFF"
                                              fill="none"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="feather feather-check">
                                              <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                          ) : (
                                            <img
                                              width="30px"
                                              src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Froom.png?alt=media&token=9f1a69c1-ce2e-4586-ba90-94db53443d49"
                                              alt=""
                                            />
                                          )}
                                        </div>
                                        <div
                                          className="flex-grow-1 room-item-details"
                                          style={{ display: 'flex', flexDirection: 'column' }}>
                                          <div className="room-name" style={{ marginBottom: '8px' }}>
                                            <b>{room.name || 'Không có'}</b>
                                            <br />
                                            <span
                                              style={{
                                                backgroundColor: '#ED6004',
                                                display: 'inline-block',
                                                fontSize: '12px',
                                                borderRadius: '5px',
                                                padding: '0 7px',
                                                color: '#fff',
                                                marginLeft: '8px'
                                              }}>
                                              Đang trống
                                            </span>
                                          </div>
                                          <div
                                            className="d-flex justify-content-between align-items-center mt-1"
                                            style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div
                                              className="d-flex align-items-center"
                                              style={{ display: 'flex', alignItems: 'center' }}>
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
                                            <div
                                              className="d-flex align-items-center"
                                              style={{ display: 'flex', alignItems: 'center' }}>
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
                                  </Grid>
                                  {/* Kiểm tra phòng tiếp theo nếu có */}
                                  {rooms[index + 1] && (
                                    <Grid item xs={12} sm={6}>
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          border: '1px solid #ddd',
                                          borderRadius: '8px',
                                          width: '280px',
                                          height: '130px',
                                          padding: '10px',
                                          cursor: 'pointer'
                                        }}
                                        onClick={() => handleRoomClick(rooms[index + 1].roomId)} // Click vào phòng
                                      >
                                        {/* Tương tự như phòng trước */}
                                        <div
                                          className="d-flex room-item-inner align-items-center"
                                          style={{ display: 'flex', alignItems: 'center' }}>
                                          <div className="flex-grow-0 icon-room" style={{ paddingRight: '10px' }}>
                                            {selectedRoom && selectedRoom.roomId === rooms[index + 1].roomId ? (
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="34"
                                                height="34"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#00BFFF"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-check">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                              </svg>
                                            ) : (
                                              <img
                                                width="30px"
                                                src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Froom.png?alt=media&token=9f1a69c1-ce2e-4586-ba90-94db53443d49"
                                                alt=""
                                              />
                                            )}
                                          </div>
                                          <div
                                            className="flex-grow-1 room-item-details"
                                            style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div className="room-name" style={{ marginBottom: '8px' }}>
                                              <b>{rooms[index + 1].name || 'Không có'}</b>
                                              <br />
                                              <span
                                                style={{
                                                  backgroundColor: '#ED6004',
                                                  display: 'inline-block',
                                                  fontSize: '12px',
                                                  borderRadius: '5px',
                                                  padding: '0 7px',
                                                  color: '#fff',
                                                  marginLeft: '8px'
                                                }}>
                                                Đang trống
                                              </span>
                                            </div>
                                            <div
                                              className="d-flex justify-content-between align-items-center mt-1"
                                              style={{ display: 'flex', justifyContent: 'space-between' }}>
                                              <div
                                                className="d-flex align-items-center"
                                                style={{ display: 'flex', alignItems: 'center' }}>
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
                                                {rooms[index + 1].price.toLocaleString()}₫
                                              </div>
                                              <div
                                                className="d-flex align-items-center"
                                                style={{ display: 'flex', alignItems: 'center' }}>
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
                                    </Grid>
                                  )}
                                </Grid>
                              )
                            }
                            return null
                          })}
                        </div>
                      ) : (
                        <div>Không có phòng nào</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  width: '5px',
                  height: '40px',
                  bgcolor: 'primary.main',
                  border: '1px solid #0056b3',
                  marginRight: 1,
                  mt: 0.5
                }}
              />
              <Box>
                <Typography variant="h6">Thông tin cá nhân của khách thuê:</Typography>
                <Typography variant="body2">Các thông tin về khách thuê và tiền cọc</Typography>
              </Box>
            </Box>

            {avatar ? (
              <Box
                sx={{
                  textAlign: 'center',
                  border: '2px solid #1e90ff',
                  borderRadius: 2,
                  padding: 2,
                  width: 130,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#fafafa',
                  margin: 'auto',
                  mt: 1
                }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 70,
                    bgcolor: '#e0e0e0',
                    color: '#9e9e9e',
                    cursor: 'pointer',
                    margin: 'auto'
                  }}
                  src={avatarImage} // Hiển thị ảnh nếu có
                >
                  <IconButton
                    component="label"
                    sx={{
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      border: '2px solid #f0f0f0',
                      width: 30,
                      height: 30,
                      padding: 0,
                      '&:hover': { backgroundColor: '#f0f0f0' }
                    }}>
                    <CloudUploadIcon fontSize="medium" />
                    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageChange} />
                  </IconButton>
                </Avatar>
                <Typography variant="body2" sx={{ mt: 1, color: '#9e9e9e' }}>
                  Hình đại diện
                </Typography>
              </Box>
            ) : (
              <></>
            )}

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tên khách thuê"
                  value={tenant.fullname || ''}
                  onChange={(e) => setTenant({ ...tenant, fullname: e.target.value })}
                  name="fullname"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Số điện thoại khách thuê"
                  value={tenant.phone || ''}
                  onChange={(e) => {
                    const newPhone = e.target.value

                    // Cập nhật giá trị mới vào tenant
                    setTenant({ ...tenant, phone: newPhone })

                    // Kiểm tra định dạng số điện thoại Việt Nam khi đủ 10 số
                    const phoneRegex = /^(03|05|07|08|09)\d{8}$/
                    if (newPhone === '' || (newPhone.length === 10 && phoneRegex.test(newPhone))) {
                      setPhoneError('') // Không có lỗi
                    } else if (newPhone.length >= 10) {
                      setPhoneError('Số điện thoại không hợp lệ') // Hiển thị lỗi khi không hợp lệ
                    }
                  }}
                  InputProps={{
                    readOnly: !avatar
                  }}
                  error={!!phoneError} // Hiển thị trạng thái lỗi nếu có
                  helperText={phoneError} // Hiển thị thông báo lỗi nếu có
                  fullWidth
                />
              </Grid>
            </Grid>

            {avatar ? (
              <Grid item xs={12}>
                <RadioGroup row value={tenant.idType} onChange={handleIdTypeChange}>
                  <FormControlLabel value="CCCD" control={<Radio />} label="Định dạng CCCD" />
                  <FormControlLabel value="Passport" control={<Radio />} label="Định dạng Passport/Visa" />
                </RadioGroup>
              </Grid>
            ) : (
              <></>
            )}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                label="CMND/CCCD"
                value={tenant.cccd || ''}
                onChange={(e) => {
                  const newCccd = e.target.value
                  const numericValue = newCccd.replace(/\D/g, '') // Loại bỏ tất cả ký tự không phải số
                  // Cập nhật giá trị mới vào tenant chỉ với các ký tự là số
                  setTenant({ ...tenant, cccd: numericValue })
                  const cccdRegex = /^(?:\d{9}|\d{12})$/
                  // Kiểm tra định dạng CMND/CCCD khi đủ 9 hoặc 12 chữ số
                  if (numericValue === '' || cccdRegex.test(numericValue)) {
                    setCccdError('') // Không có lỗi nếu hợp lệ
                  } else {
                    setCccdError('CMND phải có 9 chữ số hoặc CCCD có 12 chữ số')
                  }
                }}
                error={!!cccdError}
                helperText={cccdError}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                label="Zalo của khách"
                value={tenant.zalo || ''}
                onChange={(e) => setTenant({ ...tenant, zalo: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Ngày sinh"
                  value={tenant.birthday || ''}
                  onChange={(e) => setTenant({ ...tenant, birthday: e.target.value })}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Giới tính</InputLabel>
                  <Select
                    value={tenant.gender} // Dùng tenant.gender để lấy giá trị
                    onChange={handleGenderChange} // Gọi hàm handleGenderChange khi thay đổi
                    label="Giới tính">
                    <MenuItem value="MALE">Nam</MenuItem>
                    <MenuItem value="FEMALE">Nữ</MenuItem>
                    <MenuItem value="OTHER">Khác</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {avatar ? (
              <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="province-label">Chọn Tỉnh/Thành phố</InputLabel>
                    <Select
                      labelId="province-label"
                      id="province"
                      fullWidth
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                      label="Chọn Tỉnh/Thành phố">
                      <MenuItem value=""></MenuItem>
                      {provinces.map((province) => (
                        <MenuItem key={province.id} value={province.id}>
                          {province.full_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="province-label">Chọn Quận/Huyện</InputLabel>
                    <Select
                      labelId="district-label"
                      id="quan"
                      fullWidth
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      label="Chọn Quận/Huyện">
                      <MenuItem value=""></MenuItem>
                      {districts.map((district) => (
                        <MenuItem key={district.id} value={district.id}>
                          {district.full_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            {avatar ? (
              <Grid item xs={12} sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Chọn Phường/Xã</InputLabel>
                  <Select
                    value={selectedWard}
                    onChange={handleWardChange}
                    labelId="address-label"
                    id="phuong"
                    label="Chọn Phường/Xã"
                    fullWidth>
                    {wards.map((ward) => (
                      <MenuItem key={ward.id} value={ward.id}>
                        {ward.full_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              <></>
            )}
            {avatar ? (
              <Grid item xs={12} sx={{ mt: 1 }}>
                <TextField
                  label="Địa chỉ chi tiết. Ví dụ: 122 - Đường Phan Chu Trinh"
                  value={addressDetail || ''} // Hiển thị địa chỉ chi tiết mà người dùng nhập
                  onChange={handleAddressDetailChange} // Cập nhật địa chỉ chi tiết riêng biệt
                  fullWidth
                />
              </Grid>
            ) : (
              <></>
            )}

            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                label="Địa chỉ đầy đủ"
                value={tenant.address}
                onChange={(e) => setTenant({ ...tenant, address: e.target.value })}
                fullWidth
                InputProps={{
                  readOnly: editId === null
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                label="Nhập công việc"
                value={tenant.job || ''}
                onChange={(e) => setTenant({ ...tenant, job: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Ngày cấp CMND/CCCD"
                  value={tenant.licenseDate || ''}
                  onChange={(e) => setTenant({ ...tenant, licenseDate: e.target.value })}
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nơi cấp CMND/CCCD"
                  value={tenant.placeOfLicense || ''}
                  onChange={(e) => setTenant({ ...tenant, placeOfLicense: e.target.value })}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {/* Mặt trước */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    textAlign: 'center',
                    border: '2px solid #1e90ff',
                    borderRadius: 2,
                    padding: 2,
                    width: 220,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fafafa',
                    margin: 'auto',
                    mt: 1
                  }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 70,
                      bgcolor: '#e0e0e0',
                      color: '#9e9e9e',
                      cursor: 'pointer',
                      margin: 'auto'
                    }}
                    src={tenant.frontPhoto ?? frontUrl} // Hiển thị ảnh mặt trước nếu có
                  >
                    <progress value={frontProgress} max="100" />
                    <IconButton
                      component="label"
                      sx={{
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        border: '2px solid #f0f0f0',
                        width: 30,
                        height: 30,
                        padding: 0,
                        '&:hover': { backgroundColor: '#f0f0f0' }
                      }}>
                      <CloudUploadIcon fontSize="medium" />
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={handleChangeFront} // Gọi trực tiếp hàm handleChangeFront khi chọn ảnh
                      />
                    </IconButton>
                  </Avatar>
                  <Typography variant="body2" sx={{ mt: 1, color: '#9e9e9e' }}>
                    Ảnh mặt trước CMND/CCCD
                  </Typography>
                </Box>
              </Grid>

              {/* Mặt sau */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    textAlign: 'center',
                    border: '2px solid #1e90ff',
                    borderRadius: 2,
                    padding: 2,
                    width: 220,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fafafa',
                    margin: 'auto',
                    mt: 1
                  }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 70,
                      bgcolor: '#e0e0e0',
                      color: '#9e9e9e',
                      cursor: 'pointer',
                      margin: 'auto'
                    }}
                    src={tenant.backPhoto ?? backUrl} // Hiển thị ảnh mặt sau nếu có
                  >
                    <progress value={backProgress} max="100" />
                    <IconButton
                      component="label"
                      sx={{
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        border: '2px solid #f0f0f0',
                        width: 30,
                        height: 30,
                        padding: 0,
                        '&:hover': { backgroundColor: '#f0f0f0' }
                      }}>
                      <CloudUploadIcon fontSize="medium" />
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={handleChangeBack} // Gọi trực tiếp hàm handleChangeBack khi chọn ảnh
                      />
                    </IconButton>
                  </Avatar>
                  <Typography variant="body2" sx={{ mt: 1, color: '#9e9e9e' }}>
                    Ảnh mặt sau CMND/CCCD
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', mt: 2 }}>
              <Box
                sx={{
                  width: '5px',
                  height: '40px',
                  bgcolor: 'primary.main',
                  border: '1px solid #0056b3',
                  marginRight: 1,
                  mt: 0.5
                }}
              />
              <Box>
                <Typography variant="h6" component="div">
                  Thông tin quản lý
                </Typography>
                <Typography variant="body2">Các thông tin về khách thuê và tiền cọc</Typography>
              </Box>
            </Grid>
            {avatar ? (
              <></>
            ) : (
              <Grid item xs={12} sx={{ mt: 1 }}>
                <TextField
                  label="Quan hệ"
                  value={tenant.relationship || 'Chưa ghi nhận'}
                  onChange={(e) => setTenant({ ...tenant, relationship: e.target.value })}
                  fullWidth
                />
              </Grid>
            )}
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={checkedStates[0] && tenant.type_of_tenant === true}
                    onChange={(e) => {
                      const isChecked = event.target.checked
                      handleCheckboxChange(0)(e) // Gọi hàm handleCheckboxChange nếu cần
                      setTenant({
                        ...tenant,
                        type_of_tenant: isChecked
                      })
                    }}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" component="div" sx={{ mt: 1 }}>
                      <b>Là người liên hệ của phòng</b>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      Là người chịu trách nhiệm nhận hóa đơn, báo cáo các vấn đề của phòng
                    </Typography>
                  </Box>
                }
              />

              <Divider />
              <FormControlLabel
                control={
                  <Switch
                    checked={tenant.temporaryResidence === true}
                    onChange={(e) => {
                      const isChecked = event.target.checked
                      handleCheckboxChange(1)(e) // Gọi hàm handleCheckboxChange nếu cần
                      setTenant({
                        ...tenant,
                        temporaryResidence: isChecked
                      })
                    }}
                    value={tenant.temporaryResidence}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" component="div" sx={{ mt: 1 }}>
                      <b>Đã đăng ký tạm trú</b>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      Tình trạng đăng ký tạm trú của khách thuê
                    </Typography>
                  </Box>
                }
              />
              <Divider />
              <FormControlLabel
                control={
                  <Switch
                    checked={tenant.informationVerify === true}
                    onChange={(e) => {
                      const isChecked = event.target.checked
                      handleCheckboxChange(2)(e) // Gọi hàm handleCheckboxChange nếu cần
                      setTenant({
                        ...tenant,
                        informationVerify: isChecked
                      })
                    }}
                    value={tenant.informationVerify}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" component="div" sx={{ mt: 1 }}>
                      <b>Thông tin đã được xác minh</b>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      Tình trạng cung cấp thông tin hoặc giấy tờ để chuẩn bị làm tạm trú
                    </Typography>
                  </Box>
                }
              />
            </Box>

            <Box
              sx={{
                position: 'sticky',
                bottom: -20,
                left: 0,
                width: '100%',
                bgcolor: 'white',
                p: 2,
                px: 3, // Padding hai bên để nội dung đẹp hơn
                borderTop: '1px solid',
                borderColor: 'divider', // Đường viền ngăn cách với nội dung trên
                boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)', // Đổ bóng nhẹ ở trên
                zIndex: 1, // Giữ nó nằm trên nội dung khi cuộn
                mt: 3
              }}>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={onClose}
                  color="inherit"
                  sx={{
                    mr: 2,
                    bgcolor: 'grey.300',
                    '&:hover': { bgcolor: 'grey.400' }, // Màu khi hover
                    color: 'text.primary'
                  }}>
                  Đóng
                </Button>
                {avatar ? (
                  <Button
                    variant="contained"
                    color="success"
                    sx={{
                      backgroundColor: '#1e90ff',
                      boxShadow: '0px 4px 10px rgba(76, 175, 80, 0.3)', // Đổ bóng nhẹ cho nút Thêm
                      '&:hover': { boxShadow: '0px 6px 12px rgba(76, 175, 80, 0.5)' } // Đổ bóng khi hover
                    }}
                    onClick={saveTenant}>
                    Thêm thông tin khách thuê
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: '#4caf50',
                      boxShadow: '0px 4px 10px rgba(76, 175, 80, 0.3)', // Đổ bóng nhẹ cho nút Lưu
                      '&:hover': { boxShadow: '0px 6px 12px rgba(76, 175, 80, 0.5)' } // Đổ bóng khi hover
                    }}
                    onClick={handleUpdateClick}>
                    Lưu
                  </Button>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default AddTenantModal
