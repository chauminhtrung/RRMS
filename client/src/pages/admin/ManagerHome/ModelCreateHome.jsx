import { useState, useEffect } from 'react'
import {
  getPhuongXa,
  getQuanHuyen,
  getTinhThanh,
} from '~/apis/addressAPI'
import {
  getAllTypeRoom,
} from '~/apis/typeRoomAPI'
import {
  createMotel,
  getMotelById,
  updateMotel
} from '~/apis/motelAPI'
import {
  createSerivceMotel
} from '~/apis/motelService'
import Swal from 'sweetalert2'
const ModelCreateHome = ({ username, MotelId }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [FileName, setFileName] = useState('')
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [Typerooms, setTyperooms] = useState([])

  const [priceItemEle, setPriceItemEle] = useState('3')
  const [priceItemWater, setPriceItemWater] = useState('3')
  const [priceItemTrash, setPriceItemTrash] = useState('0')
  const [priceItemWifi, setPriceItemWifi] = useState('0')

  const [addressDetail, setaddressDetail] = useState('')
  //motel
  const [motel, setMotel] = useState({
    typeRoom: '',
    account: '',
    motelName: '',
    methodofcreation: '',
    address: '',
    area: '',
    averagePrice: '',
    maxperson: 4,
    invoicedate: '',
    paymentdeadline: ''
  })
  // lấy danh sách tỉnh/thành từ API
  useEffect(() => {
    fetchDataTypeRoom()
    getTinhThanh()
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching provinces:', error)
      })
  }, [])

  useEffect(() => {
    if (MotelId !== 'Create') {
      fetchDataWhenEdit(MotelId)
    } else {
      setMotel({
        typeRoom: '',
        account: '',
        motelName: '',
        methodofcreation: '',
        address: '',
        area: '',
        averagePrice: '',
        maxperson: 1,
        invoicedate: '',
        paymentdeadline: ''
      })
    }
  }, [MotelId]) // Thêm templatecontractRouteId vào dependency array

  //tao service
  // Tạo service
const handleCreateServices = async (id) => {
  const motelId = id; // Thay thế bằng ID của Motel thực tế

  // Tạo mảng chứa các dịch vụ chỉ khi dịch vụ không là "Miễn phí/Không sử dụng"
  const services = [
    priceItemEle !== '0' && {
      motelId: motelId,
      nameService: 'Dịch vụ điện',
      price: parseFloat(1700),
      chargetype:
        priceItemEle === '1'
          ? 'Theo người'
          : priceItemEle === '2'
          ? 'Theo tháng'
          : 'Theo đồng hồ',
    },
    priceItemWater !== '0' && {
      motelId: motelId,
      nameService: 'Dịch vụ nước',
      price: parseFloat(18000),
      chargetype:
        priceItemWater === '1'
          ? 'Theo người'
          : priceItemWater === '2'
          ? 'Theo tháng'
          : 'Theo đồng hồ',
    },
    priceItemTrash !== '0' && {
      motelId: motelId,
      nameService: 'Dịch vụ rác',
      price: parseFloat(15000),
      chargetype: priceItemTrash === '1' ? 'Theo người' : 'Theo tháng',
    },
    priceItemWifi !== '0' && {
      motelId: motelId,
      nameService: 'Dịch vụ wifi/internet',
      price: parseFloat(50000),
      chargetype: priceItemWifi === '1' ? 'Theo người' : 'Theo tháng',
    },
  ].filter(Boolean); // Lọc bỏ các dịch vụ không sử dụng (giá trị "0")

  try {
    // Gửi từng dịch vụ đến API
    for (const service of services) {
      await createSerivceMotel(service);
    }
    console.log('All services created successfully.');
    // Xử lý phản hồi từ API (như thông báo thành công)
  } catch (error) {
    console.error('Error creating services:', error);
    // Xử lý lỗi (như thông báo lỗi)
  }
};


  //nhan vao nut edit
  const fetchDataWhenEdit = async (id) => {
    if (username) {
      try {
        const response = await getMotelById(id)
        setMotel({
          typeRoom: { typeRoomId: response.data.result.typeRoom.typeRoomId },
          account: { username: response.data.result.account.username },
          motelName: response.data.result.motelName,
          methodofcreation: response.data.result.methodofcreation,
          address: response.data.result.address,
          area: response.data.result.area,
          averagePrice: response.data.result.averagePrice,
          maxperson: response.data.result.maxperson,
          invoicedate: response.data.result.invoicedate,
          paymentdeadline: response.data.result.paymentdeadline
        })
        setSelectedOption(response.data.result.methodofcreation)
        const [addressDetail, ward, district, province] = response.data.result.address.split(', ')
        setaddressDetail(addressDetail)
        setSelectedWard(Number(ward)) // Đảm bảo ward là số nếu cần
        setSelectedDistrict(Number(district))
        setSelectedProvince(Number(province))
        console.log(ward)
        console.log(fetchDistricts(province))
        console.log(fetchWards(district))
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Tìm tên của từng phần tử dựa trên `id`

  //update address
  const updateAdress = (e) => {
    setaddressDetail(e.target.value)
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

  function handleChangeFileName(event) {
    setFileName(event.target.files[0].name)
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

  //ham lay all typeroom
  const fetchDataTypeRoom = async () => {
    if (username) {
      try {
        const response = await getAllTypeRoom()
        console.log(response)

        setTyperooms(response.result)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setMotel((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Hàm thay đổi methodofcreation khi chọn radio
  const handleOptionChange = (event) => {
    setMotel((prevMotel) => ({
      ...prevMotel,
      methodofcreation: event.target.value
    }))
    setSelectedOption(event.target.value)
  }

  const onSaveMotel = (event) => {
    const form = document.getElementById('add-block-form')
    if (!form.checkValidity()) {
      event.preventDefault()
      form.classList.add('was-validated')
    } else {
      if (username) {
        const fullAddress = `${addressDetail}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`
        console.log(fullAddress)

        const motelData = {
          typeRoom: { typeRoomId: document.getElementById('category').value },
          account: { username: username },
          motelName: document.getElementById('motelName').value,
          methodofcreation: selectedOption,
          address: fullAddress ? fullAddress : null,
          area: Number(document.getElementById('area').value),
          averagePrice: parseFloat(document.getElementById('averagePrice').value),
          maxperson: Number(document.getElementById('maxperson').value),
          invoicedate: Number(document.getElementById('invoicedate').value),
          paymentdeadline: Number(document.getElementById('paymentdeadline').value)
        }

        if (MotelId === 'Create') {
          if (selectedOption === 'disable') {
            createMotel(motelData)
              .then((response) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Thông báo',
                  text: 'Motel created successfully!'
                })
                setMotel(response)
                handleCreateServices(response.data.result.motelId)

                setTimeout(() => {
                  window.location.reload()
                }, 1400)
              })
              .catch((error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Thông báo',
                  text: 'Error creating motel.'
                })
                console.error('Error creating motel:', error)
              })
          }
        } else {
          // Cập nhật nếu đã có dữ liệu
          updateMotel(MotelId, motelData)
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'Thông báo',
                text: 'Motel updated successfully!'
              })
              setMotel(response)

              setTimeout(() => {
                window.location.reload()
              }, 1400)
            })
            .catch((error) => {
              Swal.fire({
                icon: 'error',
                title: 'Thông báo',
                text: 'Error updating motel.'
              })
              console.error('Error updating template:', error)
            })
        }
      }
    }
  }

  return (
    <div
      className="modal fade"
      data-bs-backdrop="static"
      id="addBlock"
      tabIndex="-1"
      style={{ display: 'none' }}
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
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
                className="feather feather-home">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>

            <h5 className="modal-title">Thêm nhà trọ</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
              {' '}
            </button>
          </div>
          <div className="modal-body">
            <form method="POST" className="needs-validation" id="add-block-form" noValidate>
              <input type="hidden" name="_token" value="bcb6kNnw8jWXTvfpJHXORBckX39s74dhyxInWK6T" />
              <div className="row g-3">
                {/* Các thông tin nhà trọ cơ bản */}
                <div className="col-12">
                  <div className="title-item-small">
                    <b>Thông tin:</b>
                    <i className="des">Các thông tin nhà trọ cơ bản</i>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <select
                      data-format="numeric"
                      id="category"
                      name="category"
                      className="form-select form-control"
                      required="">
                      {Typerooms ? (
                        Typerooms.map((type, i) => (
                          <option key={i} value={type.typeRoomId}>
                            {type.name}
                          </option>
                        ))
                      ) : (
                        <></>
                      )}
                    </select>
                    <label htmlFor="category">
                      Loại nhà trọ <span style={{ color: 'red' }}>*</span>
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="motelName"
                      id="motelName"
                      value={motel ? motel.motelName : <></>}
                      onChange={handleInputChange}
                      required
                      placeholder="Tên nhà trọ"
                    />
                    <label htmlFor="motelName">
                      Tên nhà trọ <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="invalid-feedback">Vui lòng nhập tên nhà trọ</div>
                  </div>
                </div>
                <div className="col-6 mt-2 invisible d-none">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="room_type_room"
                      name="room_type"
                      value="room"
                    />
                    <label className="form-check-label" htmlFor="room_type_room">
                      <b>Thuê theo phòng</b>
                      <p>Tính tiền thuê theo phòng</p>
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id="room_type_bed" name="room_type" value="bed" />
                    <label className="form-check-label" htmlFor="room_type_bed">
                      <b>Thuê theo giường</b>
                      <p>Tính tiền theo giường</p>
                    </label>
                  </div>
                </div>
                {/* Chọn phương thức khởi tạo dữ liệu */}
                <div className="col-12">
                  <div className="title-item-small">
                    <b>Chọn phương thức khởi tạo dữ liệu</b>
                    <i className="des">Chọn 1 trong 3 phương thức tạo khởi tạo dữ liệu</i>
                  </div>
                </div>

                {MotelId === 'Create' ? (
                  <div className="col-12 mt-2 type-input-room hide-when-edit d-flex" style={{ textAlign: 'center' }}>
                    <div className="item">
                      <div className="form-check form-check-inline">
                        <input
                          data-format="numeric"
                          className="form-check-input"
                          type="radio"
                          name="methodofcreation"
                          id="enable"
                          value="enable"
                          onChange={handleOptionChange}
                          checked={motel.methodofcreation === 'enable'}
                          required
                        />
                        <label className="form-check-label mt-1" htmlFor="enable">
                          <b>
                            Tạo dữ liệu <span className="room_type_name"></span> tự động{' '}
                          </b>
                        </label>
                      </div>
                    </div>
                    <div className="item">
                      <div className="form-check form-check-inline">
                        <input
                          data-format="numeric"
                          className="form-check-input"
                          type="radio"
                          name="methodofcreation"
                          id="excel"
                          value="excel"
                          onChange={handleOptionChange}
                          checked={motel.methodofcreation === 'excel'}
                          required
                        />
                        <label className="form-check-label  mt-1" htmlFor="excel">
                          <b>
                            Tạo dữ liệu <span className="room_type_name"></span> từ Excel
                          </b>
                        </label>
                      </div>
                    </div>
                    <div className="item">
                      <div className="form-check form-check-inline">
                        <input
                          data-format="numeric"
                          className="form-check-input"
                          type="radio"
                          name="methodofcreation"
                          id="disable"
                          value="disable"
                          onChange={handleOptionChange}
                          checked={motel.methodofcreation === 'disable'}
                          required
                        />
                        <label className="form-check-label mt-1" htmlFor="disable">
                          <b>
                            Tạo dữ liệu <span className="room_type_name"></span> thủ công{' '}
                          </b>
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {selectedOption === 'enable' ? (
                  <div className="col-12 mt-2 info-auto-create-room-enable ">
                    <div className="loz-alert info mt-2 mb-2">
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
                          className="feather feather-info"
                          size="20">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </div>
                      <div className="des flex-1">
                        <b>Ghi chú:</b> Vui lòng chọn số tầng và nhập số <span className="room_type_name">phòng</span>{' '}
                        để hệ thống tự động tạo dữ liệu <span className="room_type_name">phòng</span> cho bạn
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {selectedOption === 'disable' ? (
                  <div className="col-12 mt-2 info-auto-create-room-disable ">
                    <div className="loz-alert warning mt-2 mb-2">
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
                          className="feather feather-info"
                          size="20">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </div>
                      <div className="des flex-1">
                        <b>Ghi chú:</b> Bạn phải thực hiện tạo dữ liệu cho từng{' '}
                        <span className="room_type_name">phòng</span> bằng thủ công.
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {/* khi nhan vao chon phuong thuc tao tu excel thi hien cai nay */}
                {selectedOption === 'excel' ? (
                  <div className="import-from-excel-layout">
                    <ul className="stepProgress">
                      <li className="stepProgress-item">Bước 1: Tải file mẫu</li>
                      <li className="stepProgress-item">Bước 2: Nhập dữ liệu của bạn vào file mẫu</li>
                      <li className="stepProgress-item">Bước 3: Upload file mẫu lên để nhập liệu</li>
                    </ul>
                    <div className="row g-2">
                      <div className="col-6 mt-2 import-excel">
                        <div className="image-upload-simple" style={{ height: '100px' }}>
                          <input
                            type="file"
                            id="file-excel"
                            accept=".xlsx"
                            style={{ display: 'none', visibility: 'none' }}
                            onChange={handleChangeFileName}
                            required
                          />
                          <div
                            className="container-upload"
                            id="import-excel-trigger"
                            style={{ border: '2px dashed #ccc' }}>
                            <label htmlFor="file-excel" style={{ width: '100%' }}>
                              <div
                                className="placeholderr __add-more-imge"
                                style={{
                                  display: 'grid',
                                  cursor: 'pointer',
                                  width: '100%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: '100%',
                                  margin: '-10px'
                                }}>
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
                                <label style={{ textDecoration: 'underline' }} id="text-import">
                                  {FileName === '' ? 'File Excel cần nhập dữ liệu' : FileName}
                                </label>
                              </div>
                            </label>
                          </div>
                          <div className="invalid-feedback"> Vui lòng chọn file Excel</div>
                        </div>
                      </div>
                      <div className="col-6 mt-2 download-template-excel">
                        <a href="./template/template_excel.xlsx" style={{ color: 'inherit' }}>
                          <div className="image-upload-simple" style={{ height: '100px' }}>
                            <div
                              className="container-upload "
                              id="download-excel-trigger"
                              style={{ border: '2px dashed #ccc' }}>
                              <div
                                className="placeholderr __add-more-imge"
                                style={{
                                  display: 'grid',
                                  cursor: 'pointer',
                                  width: '100%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: '100%',
                                  margin: '-10px'
                                }}>
                                <div className="icon-upload" style={{ margin: 'auto' }}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="main-grid-item-icon"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2">
                                    <polyline points="8 17 12 21 16 17"></polyline>
                                    <line x1="12" x2="12" y1="12" y2="21"></line>
                                    <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>
                                  </svg>
                                </div>
                                <label style={{ textDecoration: 'underline' }} id="text-download">
                                  Tải file Excel mẫu
                                </label>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {/* 2 cai nay se an di */}
                {selectedOption === 'enable' ? (
                  <div className="col-6 mt-2 count_floor ">
                    <div className="form-floating">
                      <select
                        data-format="numeric"
                        id="count_floor"
                        name="count_floor"
                        className="form-select form-control"
                        required>
                        <option value="1">Tầng trệt (không có tầng)</option>
                        <option value="2">2 tầng (Gồm 1 trệt + 1 tầng)</option>
                        <option value="3">3 tầng (Gồm 1 trệt + 2 tầng)</option>
                        <option value="4">4 tầng (Gồm 1 trệt + 3 tầng)</option>
                        <option value="5">5 tầng (Gồm 1 trệt + 4 tầng)</option>
                        <option value="6">6 tầng (Gồm 1 trệt + 5 tầng)</option>
                        <option value="7">7 tầng (Gồm 1 trệt + 6 tầng)</option>
                        <option value="8">8 tầng (Gồm 1 trệt + 7 tầng)</option>
                      </select>
                      <label htmlFor="count_floor">
                        Loại nhà trọ <span style={{ color: 'red' }}>*</span>
                      </label>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {selectedOption === 'enable' ? (
                  <div className="col-6 mt-2 total-room ">
                    <div className="form-floating">
                      <input
                        data-format="numeric"
                        type="text"
                        className="form-control"
                        name="room_total"
                        id="room_total"
                        placeholder="Nhập số phòng"
                        required
                      />
                      <label htmlFor="room_total">
                        Số{' '}
                        <span className="room_type_name">
                          phòng <span style={{ color: 'red' }}>*</span>
                        </span>
                      </label>
                      <div className="invalid-feedback">
                        Vui lòng nhập tổng số <span className="room_type_name">phòng</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {/* Địa chỉ: Giúp cho khách thuê của bạn có thể tìm thấy nhà trọ của bạn dễ dàng hơn */}
                <div className="col-12">
                  <div className="title-item-small">
                    <b>Địa chỉ:</b>
                    <i className="des">Giúp cho khách thuê của bạn có thể tìm thấy nhà trọ của bạn dễ dàng hơn</i>
                  </div>
                </div>
                {/* select API o day */}
                <div className="col-12">
                  <div id="block_address" className="address_component_container row g-2">
                    {/* chon tinh chon thanh pho */}
                    <div className="col-6 mt-2">
                      <div className="form-floating">
                        <select
                          id=""
                          data-format="numeric"
                          name="address_component[province_id]"
                          className="form-select form-control province"
                          value={selectedProvince}
                          onChange={(e) => {
                            handleProvinceChange(e)
                          }}
                          required>
                          <option value="">Chọn Tỉnh/Thành phố</option>
                          {provinces.map((province, index) => (
                            <option key={index} value={province.id}>
                              {province.full_name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="province">
                          Chọn Tỉnh/Thành phố <span style={{ color: 'red' }}>*</span>
                        </label>
                      </div>
                    </div>
                    {/* chon quan huyen */}
                    <div className="col-6 mt-2">
                      <div className="form-floating">
                        <select
                          data-format="numeric"
                          name="address_component[district_id]"
                          className="form-select form-control district"
                          value={selectedDistrict}
                          onChange={(e) => {
                            handleDistrictChange(e)
                          }}
                          required>
                          <option value="">Chọn quận/huyện</option>
                          {districts.map((district, index) => (
                            <option key={index} value={district.id}>
                              {district.full_name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="district">
                          Chọn Quận/Huyện <span style={{ color: 'red' }}>*</span>
                        </label>
                      </div>
                    </div>
                    {/* chon phuong xa*/}
                    <div className="col-12 mt-2">
                      <div className="form-floating">
                        <select
                          data-format="numeric"
                          name="address_component[ward_id]"
                          className="form-select form-control ward"
                          value={selectedWard}
                          onChange={(e) => {
                            handleWardChange(e)
                          }}
                          required>
                          <option value="">Chọn Phường/Xã</option>
                          {wards.map((ward, index) => (
                            <option key={index} value={ward.id}>
                              {ward.full_name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="ward">
                          Chọn Phường/Xã <span style={{ color: 'red' }}>*</span>
                        </label>
                      </div>
                    </div>
                    {/* dia chi cu the*/}
                    <div className="col-12 mt-2">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control address_detail"
                          name="address_detail"
                          value={addressDetail}
                          onChange={updateAdress}
                          placeholder="ví dụ: 122 - Đường Nguyễn Duy Trinh"
                          required
                        />
                        <label htmlFor="address_detail">
                          Địa chỉ chi tiết. Ví dụ: 122 - Đường Nguyễn Duy Trinh <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div className="invalid-feedback">Vui lòng nhập địa chỉ chi tiết</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* the an */}
                <div className="col-12 mt-2 text-center" style={{ display: 'none' }}>
                  <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
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
                      className="feather feather-map-pin">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <input
                      type="hidden"
                      required
                      value="10.7829132"
                      className="form-control"
                      name="address_component[position][latitude]"
                      id="address_component[position][latitude]"></input>
                    <input
                      type="hidden"
                      required
                      value="106.6961898"
                      className="form-control"
                      name="address_component[position][longitude]"
                      id="address_component[position][longitude]"></input>
                    <div className="invalid-feedback">Vui lòng thêm vị trí nhà trọ</div>
                    <b>Vị trí nhà trọ</b>
                  </div>
                </div>
                {/* Thông tin cơ bản: Thông tin diện tích, giá thuê, số lượng thành viên */}
                <div className="col-12">
                  <div className="title-item-small">
                    <b>Thông tin cơ bản:</b>
                    {MotelId === 'Create' ? (
                      <i className="des not-edit">Thông tin diện tích, giá thuê, số lượng thành viên</i>
                    ) : (
                      <i className="des note" style={{ color: 'red' }}>
                        {' '}
                        <b>
                          *Các thông tin dưới đây chỉ áp dụng cho lúc tạo nhà trọ tự động và khởi tạo đăng tin cho thuê
                        </b>
                      </i>
                    )}
                  </div>
                </div>
                <div className="col-6 hide-when-not-room">
                  <div className="form-floating">
                    <input
                      data-format="numeric"
                      type="text"
                      className="form-control"
                      name="area"
                      id="area"
                      required
                      value={motel ? motel.area : <></>}
                      onChange={handleInputChange}
                      placeholder="Nhập diện tích"
                    />
                    <label htmlFor="area">Diện tích (m2)</label>
                    <div className="invalid-feedback">Vui lòng nhập diện tích</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-floating">
                    <input
                      data-format="numeric"
                      type="text"
                      className="form-control"
                      name="averagePrice"
                      id="averagePrice"
                      placeholder="Giá thuê"
                      value={motel ? motel.averagePrice : <></>}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="averagePrice">Giá thuê trung bình (đ)</label>
                    <div className="invalid-feedback">Vui lòng nhập giá thuê</div>
                  </div>
                </div>
                <div className="col-12 hide-when-not-room">
                  <div className="form-floating">
                    <select
                      data-format="numeric"
                      id="maxperson"
                      name="maxperson"
                      value={motel ? motel.maxperson : <></>}
                      onChange={handleInputChange}
                      className="form-select form-control">
                      <option value="1">1 người ở</option>
                      <option value="2">2 người ở</option>
                      <option value="3">3 người ở</option>
                      <option value="4">4 người ở</option>
                      <option value="5">5-6 người ở</option>
                      <option value="6">7-10 người ở</option>
                      <option value="0">Không giới hạn</option>
                    </select>
                    <label htmlFor="maxperson">
                      Tối đa người ở / <span className="room_type_name">phòng</span>
                    </label>
                  </div>
                </div>

                {/* Cài đặt dịch vụ: Thiết lập các dịch vụ khi khách thuê sử dụng khi thuê */}
                {MotelId === 'Create' ? (
                  <>
                    <div className="col-12 hide-when-edit">
                      <div className="title-item-small">
                        <b>Cài đặt dịch vụ:</b>
                        <i className="des">Thiết lập các dịch vụ khi khách thuê sử dụng khi thuê</i>
                      </div>
                    </div>
                    <div className="col-6 mt-2 hide-when-edit">
                      <div className="form-floating">
                        <select
                          value={priceItemEle}
                          onChange={(e) => setPriceItemEle(e.target.value)}
                          className="form-select form-control">
                          <option value="0">Miễn phí/Không sử dụng</option>
                          <option value="1">Tính theo người</option>
                          <option value="2">Tính theo tháng</option>
                          <option value="3" selected>
                            Tính theo đồng hồ (phổ biến)
                          </option>
                        </select>
                        <label htmlFor="setting[price_item_ele]">Dịch vụ điện</label>
                      </div>
                    </div>
                    <div className="col-6 mt-2 hide-when-edit">
                      <div className="form-floating">
                        <select
                          value={priceItemWater}
                          onChange={(e) => setPriceItemWater(e.target.value)}
                          className="form-select form-control">
                          <option value="0">Miễn phí/Không sử dụng</option>
                          <option value="1">Tính theo người</option>
                          <option value="2">Tính theo tháng</option>
                          <option value="3" selected>
                            Tính theo đồng hồ (phổ biến)
                          </option>
                        </select>
                        <label htmlFor="setting[price_item_water]">Dịch vụ nước</label>
                      </div>
                    </div>
                    <div className="col-6 mt-2 hide-when-edit">
                      <div className="form-floating">
                        <select
                          value={priceItemTrash}
                          onChange={(e) => setPriceItemTrash(e.target.value)}
                          className="form-select form-control">
                          <option value="0">Miễn phí/Không sử dụng</option>
                          <option value="1">Tính theo người</option>
                          <option value="2">Tính theo tháng</option>
                        </select>
                        <label htmlFor="setting[price_item_trash]">Dịch vụ rác</label>
                      </div>
                    </div>
                    <div className="col-6 mt-2 hide-when-edit">
                      <div className="form-floating">
                        <select
                          value={priceItemWifi}
                          onChange={(e) => setPriceItemWifi(e.target.value)}
                          className="form-select form-control">
                          <option value="0">Miễn phí/Không sử dụng</option>
                          <option value="1">Tính theo người</option>
                          <option value="2">Tính theo tháng</option>
                        </select>
                        <label htmlFor="setting[price_item_wifi]">Dịch vụ wifi/internet</label>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {/* Cài đặt tính năng:Thiết lập các tính năng cho nhà trọ */}
                {MotelId === 'Create' ? (
                  <>
                    <div className="col-12 hide-when-edit">
                      <div className="title-item-small">
                        <b>Cài đặt tính năng:</b>
                        <i className="des">Thiết lập các tính năng cho nhà trọ</i>
                      </div>
                    </div>
                    <div className="col-6 mt-2 hide-when-edit">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                          id="setting[asset_function]"
                          name="setting[asset_function]"
                          checked
                        />
                        <label className="form-check-label" htmlFor="setting[asset_function]">
                          <b>Quản lý tài sản</b>
                          <p>Quản lý tài sản khách thuê sử dụng</p>
                        </label>
                      </div>
                    </div>
                    <div className="col-6 mt-2 hide-when-edit">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                          id="setting[car_function]"
                          name="setting[car_function]"
                          checked
                        />
                        <label className="form-check-label" htmlFor="setting[car_function]">
                          <b>Quản lý xe</b>
                          <p>Các thông tin xe của khách thuê</p>
                        </label>
                      </div>
                    </div>
                    <div className="col-6 mt-2">
                      <div className="form-check form-switch">
                        <input
                          data-format="numeric"
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                          id="setting[post_function]"
                          name="setting[post_function]"
                          checked
                        />
                        <label className="form-check-label" htmlFor="setting[post_function]">
                          <b>Quản lý tin đăng</b>
                          <p>Các thông tin về tin đăng</p>
                        </label>
                      </div>
                    </div>
                    <div className="col-6 mt-2">
                      <div className="form-check form-switch">
                        <input
                          data-format="numeric"
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                          id="setting[post_function]"
                          name="setting[post_function]"
                          checked
                        />
                        <label className="form-check-label" htmlFor="setting[post_function]">
                          <b>Quản lý tin đăng</b>
                          <p>Các thông tin về tin đăng</p>
                        </label>
                      </div>
                    </div>
                    <div className="col-6 mt-2 hide-when-edit">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                          id="setting[send_sms_when_create_bill]"
                          name="setting[send_sms_when_create_bill]"
                          checked
                        />
                        <label className="form-check-label" htmlFor="setting[send_sms_when_create_bill]">
                          <b>Gửi tin nhắn tự động cho khách thuê</b>
                          <p>Giửi tin nhắn SMS tự động cho khách thuê sau khi lập phiếu</p>
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {/* Cài đặt cho phiếu thu (hóa đơn): Thiết lập cho hóa đơn khi bạn lập hóa đơn tiền thuê cho khách thuê */}
                <div className="col-12">
                  <div className="title-item-small">
                    <b>Cài đặt cho phiếu thu (hóa đơn):</b>
                    <i className="des">Thiết lập cho hóa đơn khi bạn lập hóa đơn tiền thuê cho khách thuê</i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-floating">
                    <input
                      data-format="numeric"
                      type="text"
                      className="form-control"
                      id="invoicedate"
                      name="invoicedate"
                      placeholder="Ngày lập hóa đơn"
                      min="1"
                      max="31"
                      value={motel ? motel.invoicedate : <></>}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="invoicedate">Ngày lập hóa đơn và trong khoảng 1 đến 31</label>
                    <div className="invalid-feedback">Vui lòng nhập ngày lập hóa đơn</div>
                  </div>
                  <div className="loz-alert info mt-2 mb-2">
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
                        className="feather feather-info"
                        size="20">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    </div>
                    <div className="des flex-1">
                      <b>Thông tin:</b> Khi đến ngày lập hóa đơn hệ thống sẽ nhắc nhở qua thông báo
                    </div>
                  </div>
                  <p>
                    - Là ngày lập hóa đơn tiền điện, nước...
                    <br />- Nhập một ngày trong tháng. Nếu không nhập mặc định là cuối tháng.
                  </p>
                </div>
                <div className="col-6">
                  <div className="form-floating">
                    <input
                      data-format="numeric"
                      type="text"
                      className="form-control"
                      id="paymentdeadline"
                      name="paymentdeadline"
                      placeholder="Ngày lập hóa đơn"
                      value={motel ? motel.paymentdeadline : <></>}
                      min="1"
                      onChange={handleInputChange}
                      max="20"
                      required
                    />
                    <label htmlFor="paymentdeadline">Hạn đóng tiền</label>
                  </div>
                  <div className="loz-alert info mt-2 mb-2">
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
                        className="feather feather-info"
                        size="20">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    </div>
                    <div className="des flex-1">
                      <b>Thông tin:</b> Khi khách đóng tiền không đúng thời hạn hệ thống sẽ nhắc nhở
                    </div>
                  </div>
                  <p>
                    <b>Ví dụ:</b> Bạn lập phiếu ngày 01 và hạn đóng tiền thuê trọ ở đây là 5 ngày thì ngày 05 sẽ là ngày
                    hết hạn
                  </p>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer modal-footer--sticky">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Đóng
            </button>
            <button type="button" id="submit-block" className="btn btn-primary" onClick={onSaveMotel}>
              {MotelId === 'Create' ? <>Thêm nhà trọ</> : <>Chỉnh sửa Nhà trọ</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelCreateHome
