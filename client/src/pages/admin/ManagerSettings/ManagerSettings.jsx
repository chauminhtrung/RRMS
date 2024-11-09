import { useEffect, useState } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import { useParams } from 'react-router-dom'
import ModelDeposit from './ModelDeposit'

import Swal from 'sweetalert2'
import { CreateTRC, getTRCByusername, updateTRCById } from '~/apis/TRCAPI'
import { deleteContractTemplate, getContractTemplatesByMotelId } from '~/apis/contractTemplateAPI'
import { getMotelById } from '~/apis/motelAPI'

const ManagerSettings = ({ setIsAdmin, motels, setmotels }) => {
  // Khởi tạo một đối tượng trạng thái cho tất cả các trường
  const { motelId } = useParams()
  const username = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).username : null
  const [isExistingData, setIsExistingData] = useState(false) // Biến để kiểm tra dữ liệu đã tồn tại
  const [TRCID, setTRCID] = useState('') // Biến để kiểm tra dữ liệu đã tồn tại
  const [templatecontracts, setTemplatecontracts] = useState([])
  const [motel, setmotel] = useState()
  const [selectedTemplateId, setSelectedTemplateId] = useState(null)
  const [formData, setFormData] = useState({
    householdhead: 'ktlhp',
    representativename: '',
    phone: '',
    birth: '', // Dùng null cho ngày
    permanentaddress: '',
    job: '',
    identifier: '',
    placeofissue: '',
    dateofissue: '', // Dùng null cho ngày
    motelId: motelId ? String(motelId) : '', // Bạn có thể thay đổi kiểu dữ liệu nếu cần
    tenantUsername: username // Bạn có thể thay đổi kiểu dữ liệu nếu cần
  })

  useEffect(() => {
    fetchDataTrc()
    fetchDataTemlateContract()
    fetchDataMotel()
    setIsAdmin(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchDataTrc = async () => {
    if (username) {
      try {
        const response = await getTRCByusername(username)
        console.log(response.data.result.length)

        if (response && response.data.result.length > 0) {
          // Cập nhật formData với dữ liệu từ API
          setFormData((prevData) => ({
            ...prevData,
            householdhead: response.data.result[0].householdhead || prevData.householdhead,
            representativename: response.data.result[0].representativename || prevData.representativename,
            phone: response.data.result[0].phone || prevData.phone,
            birth: response.data.result[0].birth || prevData.birth,
            permanentaddress: response.data.result[0].permanentaddress || prevData.permanentaddress,
            job: response.data.result[0].job || prevData.job,
            identifier: response.data.result[0].identifier || prevData.identifier,
            placeofissue: response.data.result[0].placeofissue || prevData.placeofissue,
            dateofissue: response.data.result[0].dateofissue || prevData.dateofissue
          }))
          setTRCID(response.data.result[0].temporaryrcontractId)
          setIsExistingData(true) // Đánh dấu là dữ liệu đã tồn tại
        }
      } catch (error) {
        console.error('Lỗi khi gọi API getTRCByusername:', error)
      }
    }
  }

  const fetchDataTemlateContract = async () => {
    if (username && motelId) {
      try {
        const dataContactTemplate = await getContractTemplatesByMotelId(motelId)
        setTemplatecontracts(dataContactTemplate)
        console.log(dataContactTemplate)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchDataMotel = async () => {
    if (username && motelId) {
      try {
        const dataMotel = await getMotelById(motelId)
        setmotel(dataMotel.data.result[0])
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSave = async (event) => {
    const form = document.getElementById('househoder-setting-info')

    if (!form.checkValidity()) {
      event.preventDefault()
      form.classList.add('was-validated')
    } else {
      try {
        let response
        if (isExistingData && TRCID) {
          response = await updateTRCById(TRCID, formData) // Cập nhật nếu dữ liệu đã tồn tại
        } else {
          response = await CreateTRC(formData) // Tạo mới nếu dữ liệu chưa có
        }

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Thông báo',
            text: isExistingData ? 'Cập nhật thông tin thành công.' : 'Lưu thông tin thành công.'
          })
          window.location.reload()
        } else {
          console.error('Lỗi khi lưu thông tin:', response.message)
        }
      } catch (error) {
        console.error('Lỗi khi gọi API CreateTRC hoặc UpdateTRC:', error)
      }
    }
  }

  // Hàm cập nhật formData
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  // Hàm xử lý khi chọn ngày trong Flatpickr
  const handleDateChange = (name, date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: date[0]
    }))
  }

  //ham xoa template Contract
  const handleDelete = async (templateId) => {
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
        await deleteContractTemplate(templateId)
        Swal.fire('Đã xóa!', 'Mẫu hợp đồng đã được xóa.', 'success')
        // Sau khi xóa thành công, cập nhật lại danh sách template
        fetchDataTemlateContract()
      } catch (error) {
        console.error('Lỗi khi xóa mẫu hợp đồng:', error)
        Swal.fire('Lỗi', 'Không thể xóa mẫu hợp đồng.', 'error')
      }
    }
  }

  return (
    <div>
      <NavAdmin setIsAdmin={setIsAdmin} setmotels={setmotels} motels={motels} />
      <div className="page-setting mb-4">
        <div className="container">
          <div className="header-item">
            <h4 className="title-item">
              Cài đặt
              <i style={{ fontSize: '14px', fontWeight: 'normal' }}>Các thiết lập các cài đặt cho tài khoản</i>
            </h4>
          </div>
          <div className="card-feature2 overflow-hidden">
            <div className="d-flex">
              <div className="col-md-3" style={{ borderRight: '1px solid #eee', padding: '0' }}>
                {/* Nav tabs  */}
                <ul className="nav setting-tabs" role="tablist" style={{ display: 'unset' }}>
                  <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="tab" href="#info">
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
                        className="feather feather-user">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      Thông tin đại điện cho hợp đồng
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#contract_template">
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
                        className="feather feather-clipboard">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                      Cài đặt mẫu văn bản hợp đồng
                    </a>
                  </li>

                  <li className="nav-item d-none">
                    <a className="nav-link" data-bs-toggle="tab" href="#printer">
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
                        className="feather feather-printer">
                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                        <rect x="6" y="14" width="12" height="8"></rect>
                      </svg>
                      Cài đặt máy in
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#notification_setting">
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
                      Cài đặt thông báo
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-9">
                <div style={{ padding: '15px' }}>
                  {/* tab panes */}
                  <div className="tab-content">
                    <div className="container tab-pane fade show active" id="info">
                      <br />
                      <div className="header-item">
                        <div>
                          <h2 className="text-dark">Thông tin đại diện chủ tòa nhà</h2>
                          <p>Thông tin dùng làm hợp đồng tạm trú cho khách thuê</p>
                        </div>
                        <button className="btn btn-primary" id="save-househoder-setting-info" onClick={handleSave}>
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
                          </svg>
                          Lưu thông tin
                        </button>
                      </div>
                      <div>
                        <form method="POST" className="needs-validation" id="househoder-setting-info" noValidate>
                          <div className="row g-2">
                            <div className="col-12">
                              <div className="title-item-small">
                                <b>Thông tin chủ hộ:</b>
                                <i className="des">Thông tin chủ hộ được điền vào tờ khai tạm trú</i>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-floating">
                                <select
                                  data-format="numeric"
                                  id="householdhead"
                                  name="householdhead"
                                  className="form-select form-control"
                                  value={formData.householdhead}
                                  onChange={handleInputChange}
                                  required>
                                  <option value="ktlhp">Khách thuê lập hộ mới</option>
                                  <option value="cnlđch">Chủ nhà là đại diện chủ hộ</option>
                                </select>
                                <label htmlFor="owner">Chủ hộ</label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="title-item-small">
                                <b>Thông tin cơ bản:</b>
                                <i className="des">Các thông tin cơ bản dùng để hiển thị các thông tin đại diện</i>
                              </div>
                            </div>
                            {/* Tên */}
                            <div className="col-4">
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="representativename"
                                  placeholder="Nhập tên đại diện"
                                  required
                                  value={formData.representativename}
                                  onChange={handleInputChange}
                                />
                                <label>Nhập tên đại diện cho các loại giấy tờ</label>
                                <div className="invalid-feedback">Vui lòng nhập tên người đại diện</div>
                              </div>
                            </div>

                            {/* Số điện thoại */}
                            <div className="col-4">
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="phone"
                                  placeholder="Nhập số điện thoại"
                                  required
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                />
                                <label>Nhập số điện thoại liên hệ</label>
                                <div className="invalid-feedback">Vui lòng nhập số điện thoại</div>
                              </div>
                            </div>

                            <div className="col-4">
                              <div className="input-group">
                                <div className="form-floating">
                                  <Flatpickr
                                    data-format="date"
                                    type="text"
                                    className="form-control flatpickr-input"
                                    name="birth"
                                    id="birth"
                                    placeholder="Nhập ngày/tháng/năm sinh"
                                    required
                                    options={{
                                      allowInput: true,
                                      dateFormat: 'd/m/Y'
                                    }}
                                    value={formData.birth}
                                    onChange={(date) => handleDateChange('birth', date)}
                                  />
                                  <label htmlFor="setting_info_birthday">Nhập ngày/tháng/năm sinh</label>
                                </div>
                                <label className="input-group-text" htmlFor="setting_info_birthday">
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
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                  </svg>
                                </label>
                              </div>
                              <div className="invalid-feedback">Vui lòng nhập ngày sinh</div>
                            </div>

                            <div className="title-item-small">
                              <b>Địa chỉ &amp; nghề nghiệp:</b>
                              <i className="des">Thông tin này dùng để hiển thị trong hợp đồng</i>
                            </div>
                            <div className="col-6">
                              <div className="form-floating">
                                <input
                                  data-format="string"
                                  type="text"
                                  className="form-control"
                                  name="permanentaddress"
                                  id="permanentaddress"
                                  placeholder="Nhập địa chỉ thường trú"
                                  required
                                  value={formData.permanentaddress}
                                  onChange={handleInputChange}
                                />
                                <label htmlFor="permanentaddress">Nhập địa chỉ thường trú</label>
                                <div className="invalid-feedback">Vui lòng nhập địa chỉ thường trú</div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="form-floating">
                                <input
                                  data-format="string"
                                  type="text"
                                  className="form-control"
                                  name="job"
                                  id="setting_info_job"
                                  placeholder="Nhập công việc"
                                  required
                                  value={formData.job}
                                  onChange={handleInputChange}
                                />
                                <label htmlFor="setting_info_job">Nhập công việc</label>
                                <div className="invalid-feedback">Vui lòng nhập công việc của bạn</div>
                              </div>
                            </div>

                            <div className="title-item-small">
                              <b>Thông tin định danh:</b>
                              <i className="des">Thông tin này dùng để hiển thị trong hợp đồng và cả tạm trú</i>
                            </div>

                            <div className="col-4">
                              <div className="form-floating">
                                <input
                                  data-format="string"
                                  type="text"
                                  className="form-control"
                                  name="identifier"
                                  id="identifier"
                                  placeholder="Nhập mã định danh"
                                  required
                                  value={formData.identifier}
                                  onChange={handleInputChange}
                                />
                                <label htmlFor="identifier">Nhập mã định danh</label>
                                <div className="invalid-feedback">Vui lòng nhập mã định danh</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="form-floating">
                                <input
                                  data-format="string"
                                  type="text"
                                  className="form-control"
                                  name="placeofissue"
                                  id="placeofissue"
                                  placeholder="Nhập nơi cấp"
                                  required
                                  value={formData.placeofissue}
                                  onChange={handleInputChange}
                                />
                                <label htmlFor="placeOfIssue">Nhập nơi cấp</label>
                                <div className="invalid-feedback">Vui lòng nhập nơi cấp mã định danh</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="input-group">
                                <div className="form-floating">
                                  <Flatpickr
                                    className="form-control"
                                    id="setting_info_identity_date"
                                    name="dateofissue"
                                    placeholder="Nhập ngày cấp"
                                    required
                                    options={{
                                      allowInput: true,
                                      dateFormat: 'd/m/Y'
                                    }}
                                    value={formData.dateofissue}
                                    onChange={(date) => handleDateChange('dateofissue', date)}
                                  />
                                  <label htmlFor="setting_info_identity_date">Nhập ngày cấp</label>
                                </div>
                                <label className="input-group-text" htmlFor="setting_info_identity_date">
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
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                  </svg>
                                </label>
                              </div>
                              <div className="invalid-feedback">Vui lòng nhập ngày cấp mã định danh</div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div id="contract_template" className="container tab-pane fade show">
                      <br />
                      <div className="header-item">
                        <div className="container tab-pane">
                          <br />
                          <h2 className="text-dark ">Danh sách các mẫu hợp đồng đang có</h2>
                          <p>Mẫu hợp đồng được sử dụng khi in dựa trên những thông tin bạn nhập</p>
                        </div>
                        <button
                          className="add-round"
                          data-bs-toggle="modal"
                          data-bs-target="#contractTemplateModal"
                          id="setting-contract-template"
                          onClick={() => setSelectedTemplateId('Create')}>
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="left"
                            title=""
                            data-bs-original-title=" Tạo mẫu hợp đồng">
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
                      </div>
                      <div id="list-contract-template" className="row" style={{ padding: '10PX' }}>
                        <table className="table" id="table-contract-template">
                          <tbody>
                            <tr>
                              <td>
                                <b>Tên mẫu hợp đồng</b>
                              </td>
                              <td>
                                <b>Nhà đang áp dụng</b>
                              </td>
                              <td>
                                <b>Thứ tự sắp xếp</b>
                              </td>
                              <td>
                                <b>Chỉnh sửa</b>
                              </td>
                              <td>
                                <b>Xóa</b>
                              </td>
                            </tr>
                            {templatecontracts && motel ? (
                              templatecontracts.map((tc, i) => (
                                <tr id="template-338" key={i}>
                                  <td>{tc.templatename}</td>
                                  <td>{motel.motelName}</td>
                                  <td>{tc.sortOrder}</td>
                                  <td>
                                    <div
                                      className="btn-round btn-edit"
                                      data-bs-toggle="modal"
                                      data-bs-target="#contractTemplateModal"
                                      onClick={() => setSelectedTemplateId(tc.contractTemplateId)}>
                                      <div
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          alignItems: 'center',
                                          display: 'inherit',
                                          textAlign: 'center',
                                          justifyContent: 'center',
                                          color: '#000'
                                        }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title=""
                                        data-bs-original-title="Chỉnh sửa">
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
                                          className="feather feather-edit">
                                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div
                                      className="btn-round btn-delete"
                                      onClick={() => handleDelete(tc.contractTemplateId)} //ham xoa o day
                                      data-id="338"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title=""
                                      data-bs-original-title="Xóa">
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
                                        className="feather feather-trash-2">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                      </svg>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <></>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div id="notification_setting" className="container tab-pane fade show">
                      <br />
                      <h3>Cài đặt thông báo</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedTemplateId && (
        <ModelDeposit
          motel={motel}
          username={username}
          templatecontractRouteId={selectedTemplateId}
          fetchDataTemlateContract={fetchDataTemlateContract}
        />
      )}
    </div>
  )
}

export default ManagerSettings
