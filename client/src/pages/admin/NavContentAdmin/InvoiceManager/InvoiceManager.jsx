/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import YearMonthFilter from '../YearMonthFilter'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import 'flatpickr/dist/plugins/monthSelect/style.css' // Thêm CSS của plugin monthSelect
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import { Vietnamese } from 'flatpickr/dist/l10n/vn' // Import ngôn ngữ tiếng Việt
import AdditionItem from './AdditionItem'
import 'react-tabulator/lib/styles.css' // required styles
import 'react-tabulator/lib/css/tabulator.min.css' // theme
import { ReactTabulator } from 'react-tabulator'
import { Link } from 'react-router-dom'

const InvoiceManager = ({ setIsAdmin, setIsNavAdmin, motels, setmotels }) => {
  const columns = []

  const data = []

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

  //2 thang nay la cho chon tu ngay --> den ngay (tu tinh den 1 thang sau)
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  //them cai muc cong tru vi li do
  const [items, setItems] = useState([{}]) // Khởi tạo một mục
  // chuyen doi cac buoc
  const [step, setStep] = useState(1) // Bước mặc định là bước 1

  //xoa muc
  const handleRemove = (index) => {
    setItems(items.filter((_, i) => i !== index)) // Xóa mục theo chỉ số
  }

  //them
  const handleAddItem = () => {
    setItems([...items, {}]) // Thêm một mục mới
  }

  const handleFromDateChange = (selectedDates) => {
    const selectedDate = selectedDates[0]
    setFromDate(selectedDate)

    // Tính ngày "Đến ngày" là 1 tháng sau
    const nextMonthDate = new Date(selectedDate)
    nextMonthDate.setMonth(selectedDate.getMonth() + 1)

    // Chuyển thành chuỗi định dạng YYYY-MM-DD cho input
    const formattedDate = nextMonthDate.toISOString().split('T')[0]
    setToDate(formattedDate)
  }

  const handleNextStep = () => {
    setStep(step + 1) // Chuyển sang bước tiếp theo
  }

  const handlePreviousStep = () => {
    setStep(step - 1) // Quay lại bước trước
  }

  const handleSubmit = () => {
    // Thực hiện hành động lập hóa đơn ở đây
    alert('Hóa đơn đã được lập thành công!')
  }

  useEffect(() => {
    setIsAdmin(true)
  }, [])

  return (
    <div className="page-bills">
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
        }}>
        <YearMonthFilter />
        <div className="header-item">
          <h4 className="title-item">
            Tất cả hóa đơn - 10/2024
            <i style={{ fontSize: '14px', fontWeight: 'normal' }}>Tất cả hóa đơn thu tiền nhà xuất hiện ở đây</i>
          </h4>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div data-bs-toggle="modal" data-bs-target="#billSeries">
              <div
                className="add-round"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title=""
                data-bs-original-title="Tạo hóa đơn mới">
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
              </div>
            </div>
            <Link
              to="/quan-ly/6891/cai-dat-nha-tro#bill_setting"
              className="btn btn-primary"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title=""
              style={{
                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, .15) !important',
                marginLeft: '25px',
                padding: '11px 20px'
              }}
              data-bs-original-title="Cài đặt hiển thị hóa đơn. Xuất, gửi hóa đơn tự động...">
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
                className="feather feather-settings m-1">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <span>Cài đặt hóa đơn</span>
            </Link>
            <div className="d-flex">
              <div style={{ width: '2px', borderLeft: '2px solid #ccc', margin: '3px 0px', marginLeft: '10px' }}></div>
              <button
                style={{ marginLeft: '10px', marginRight: '10px', padding: '13px 20px' }}
                id="print"
                className="btn btn-primary">
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
                In h.đơn
              </button>
              <button
                style={{ marginRight: '10px', padding: '13px 20px' }}
                id="download-excel-template-2"
                className="btn btn-primary">
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
                Xuất excel(Rút gọn)
              </button>
              <button id="download-excel-template-1" style={{ padding: '13px 20px' }} className="btn btn-primary">
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
                Xuất excel(Đầy đủ)
              </button>
            </div>
          </div>
        </div>
        <div className="header-table header-item">
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
            <div className="d-flex">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="filter_done" data-value="status" value="done" />
                <label className="form-check-label" htmlFor="filter_done">
                  Hóa đơn đã thu
                </label>
                <span className="count-filter done success">0</span>
              </div>

              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="filter_new" data-value="status" value="new" />
                <label className="form-check-label" htmlFor="filter_new">
                  Hóa đơn chưa thu
                </label>
                <span className="count-filter new warning">0</span>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="filter_customer_debt"
                  data-value="status"
                  value="customer_debt"
                />
                <label className="form-check-label" htmlFor="filter_customer_debt">
                  Hóa đơn đang nợ
                </label>
                <span className="count-filter debt error">0</span>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="filter_cancel"
                  data-value="status"
                  value="cancel"
                />
                <label className="form-check-label" htmlFor="filter_cancel">
                  Hóa đơn đã hủy
                </label>
                <span className="count-filter cancel disable">0</span>
              </div>
            </div>
          </div>
          <div className="d-flex" style={{ alignItems: 'center' }}>
            <select className="sort-bill" style={{ height: '35px', borderRadius: '7px', marginRight: '10px' }}>
              <option value="room-asc">Thứ tự phòng tăng dần</option>
              <option value="room-desc">Thứ tự phòng giảm dần</option>

              <option value="date-desc">Sắp xếp theo ngày giảm dần</option>
              <option value="date-asc">Sắp xếp theo ngày tăng dần</option>
            </select>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="css-i6dzq1">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
          </div>
        </div>
        <div style={{ position: 'relative', height: '100%' }}>
          <ReactTabulator
            className="my-custom-table" // Thêm lớp tùy chỉnh nếu cần
            columns={columns}
            data={data}
            options={options}
            placeholder={<h1></h1>} // Sử dụng placeholder tùy chỉnh
          />
          {/* Thêm div cho hình ảnh và chữ nếu không có dữ liệu */}
          {data.length === 0 && (
            <div className="custom-placeholder">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fempty-box-4085812-3385481.webp?alt=media&token=eaf37b59-00e3-4d16-8463-5441f54fb60e"
                alt="Không có dữ liệu"
                className="placeholder-image"
              />
              <div className="placeholder-text">Không tìm thấy dữ liệu!</div>
            </div>
          )}
        </div>
      </div>
      {/* Modal add block  */}
      <div
        className="modal fade"
        data-bs-backdrop="static"
        id="billSeries"
        tabIndex="-1"
        style={{ display: 'none' }}
        aria-modal="true"
        role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg ">
          <form method="POST" className="needs-validation" id="bill-series-form" noValidate>
            <div className="modal-content">
              <div className="modal-header--sticky">
                <div className="modal-header">
                  <div
                    style={{
                      marginRight: '15px',
                      outline: 0,
                      boxShadow: 'rgba(112, 175, 237, 0.16) 0px 0px 0px 0.25rem;',
                      opacity: 1,
                      borderRadius: '100%',
                      width: '36px',
                      height: '36px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      backgroundColor: 'rgb(111, 171, 232)'
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
                      className="feather feather-dollar-sign">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <h5 className="modal-title">
                    Lập hóa đơn nhiều phòng (Lập hóa đơn nhanh)
                    <p style={{ fontSize: '14px', fontWeight: 'normal', fontStyle: 'italic', margin: '0' }}>
                      Chốt dịch vụ &amp; lập hóa đớn cho phòng
                    </p>
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="tab" id="bill-series-tab" style={{ display: 'flex', justifyContent: 'center' }}>
                  <ul className="nav nav-tabs progressbar" role="tablist">
                    <li className="nav-item">
                      <Link
                        className={`nav-link-item ${step === 1 ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        to="#list-room"
                        id="tab-list-room"
                        aria-disabled>
                        Bước 1: Chốt dịch vụ
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link-item ${step === 2 ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        to="#create-bill"
                        id="tab-create-bill">
                        Bước 2: Lập hóa đơn
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="modal-body">
                <div className="step-content">
                  {step === 1 && (
                    <div>
                      {' '}
                      <div id="list-room" className="">
                        <div className="row g-3">
                          <div className=" col-7">
                            <div className="room-list row g-2">Không có phòng nào để lập hóa đơn</div>
                          </div>
                          <div className="price-items-layout-container col-5">
                            <h5 className="text-center room-name-lock-price-item" style={{ display: 'none' }}></h5>
                            <div
                              className="price-item-content"
                              style={{
                                backgroundColor: '#e8f8ff',
                                border: '1px solid #e8f8ff',
                                padding: '0 10px',
                                borderradius: '10px'
                              }}>
                              <div className="text-center" style={{ margin: '20px 0' }}>
                                <svg
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="css-i6dzq1">
                                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                                </svg>
                                <h6>Thực hiện chốt dịch vụ</h6>
                                Vui lòng chọn một Chốt dịch vụ từ danh sách phòng để thực hiện chốt dịch vụ
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="container" id="create-bill">
                      <div className="row">
                        <div
                          className="col-5 text-center"
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#f2fffe',
                            border: '1px solid #dff8e0',
                            borderRadius: '10px'
                          }}>
                          <div>
                            <div style={{ color: 'rgb(78, 188, 237)' }}>
                              <svg
                                viewBox="0 0 24 24"
                                width="32"
                                height="32"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="css-i6dzq1">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <div style={{ color: 'rgb(78, 188, 237)', fontWeight: '700', fontSize: '18px' }}>
                              Đã chốt <span className="count-deal-price-item">0</span> phòng
                            </div>
                            <div>Nhập các thông tin bên phải để thực hiện tạo hóa đơn!</div>
                          </div>
                        </div>
                        <div className="col-7">
                          <div className="row g-2">
                            <div className="col-6">
                              <div className="input-group">
                                <div className="form-floating">
                                  <Flatpickr
                                    className="form-control "
                                    name="date"
                                    data-format="date"
                                    id="date-add-bill"
                                    placeholder="Ngày lập hóa đơn"
                                    pattern="\d{1,2}\/\d{1,2}\/\d{4}"
                                    options={{
                                      locale: Vietnamese, // Cấu hình ngôn ngữ tiếng Việt
                                      plugins: [
                                        new monthSelectPlugin({
                                          shorthand: true, //defaults to false
                                          dateFormat: 'm.y' //defaults to "F Y"
                                        })
                                      ]
                                    }}
                                  />
                                  <label htmlFor="month-series">Tháng lập phiếu</label>
                                </div>
                                <label className="input-group-text" htmlFor="month">
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
                            </div>
                            <div className="col-6">
                              <div className="form-floating">
                                <select
                                  id="reason_id"
                                  name="reason_id"
                                  className="form-select form-control"
                                  data-format="numeric"
                                  aria-readonly
                                  required>
                                  <option value="1">Thu tiền hàng tháng </option>
                                </select>

                                <label htmlFor="reason_id">Lý do thu tiền</label>
                              </div>
                            </div>
                          </div>
                          <div className="row g-2 mt-2">
                            <div className="col-6">
                              <div className="input-group">
                                <div className="form-floating">
                                  <Flatpickr
                                    className="form-control date-flat-picker flatpickr-input active"
                                    name="date"
                                    data-format="date"
                                    id="date-add-bill"
                                    placeholder="Ngày lập hóa đơn"
                                    pattern="\d{1,2}\/\d{1,2}\/\d{4}"
                                    options={{ locale: Vietnamese }}
                                  />
                                  <label htmlFor="date-add-bill">Ngày lập hóa đơn</label>
                                </div>
                                <label className="input-group-text" htmlFor="date-add-bill">
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
                              <div className="invalid-feedback">Vui lòng nhập Ngày lập hóa đơn</div>
                            </div>

                            <div className="col-6">
                              <div className="input-group">
                                <div className="form-floating">
                                  <Flatpickr
                                    className="form-control date-flat-picker flatpickr-input"
                                    name="deadline_bill_date"
                                    id="deadline_bill_date"
                                    data-format="date"
                                    placeholder="Nhập hạn đóng tiền cho hóa đơn"
                                    pattern="\d{1,2}\/\d{1,2}\/\d{4}"
                                    options={{ locale: Vietnamese }}
                                  />

                                  <label htmlFor="deadline_bill_date">Hạn đóng tiền</label>
                                </div>
                                <label className="input-group-text" htmlFor="deadline_bill_date">
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
                              <div className="invalid-feedback">Vui lòng nhập hạn đóng tiền hóa đơn</div>
                            </div>
                          </div>
                          <div className="col-12 calculate-spent-time-layout">
                            <div className="col-12 mb-2">
                              <div className="title-item-small">
                                <b>Thông tin ngày ở</b>
                                <i className="des">Nhập thông tin từ ngày đến ngày</i>
                              </div>
                            </div>

                            {/* Số tháng, ngày  layout  */}
                            <div className="row g-2 month-amount-layout" style={{ marginTop: '5px', display: 'none' }}>
                              <div className="col-6 mt-2">
                                <div className="form-floating">
                                  <Flatpickr
                                    data-format="numeric"
                                    type="text"
                                    min="0"
                                    className="form-control"
                                    value="1"
                                    name="month_amount"
                                    id="month_amount"
                                    placeholder="Nhập số tháng"
                                  />
                                  <label htmlFor="month_amount">Số tháng</label>
                                  <div className="invalid-feedback">Vui lòng nhập số tháng tính tiền</div>
                                </div>
                              </div>

                              <div className="col-6 mt-2">
                                <div className="form-floating">
                                  <input
                                    data-format="numeric"
                                    type="text"
                                    min="0"
                                    className="form-control"
                                    value="0"
                                    name="day_amount"
                                    id="day_amount"
                                    placeholder="Nhập số tháng"
                                  />
                                  <label htmlFor="day_amount">Số ngày lẻ</label>
                                  <div className="invalid-feedback">Vui lòng nhập số ngày lẻ</div>
                                </div>
                              </div>
                            </div>

                            {/* Từ ngày, đến ngày  layout  */}
                            <div className="row g-2 circle-month-layout" style={{ marginTop: '5px' }}>
                              <div className="col-6 mt-2">
                                <div className="form-floating">
                                  <Flatpickr
                                    value={fromDate}
                                    onChange={handleFromDateChange}
                                    options={{ locale: Vietnamese, dateFormat: 'd/m/Y' }}
                                    className="form-control date-flat-picker flatpickr-input"
                                    name="date_from"
                                    id="date_from"
                                    data-format="date"
                                    placeholder="Từ ngày"
                                    pattern="\d{1,2}\/\d{1,2}\/\d{4}"
                                  />
                                  <label htmlFor="date_from">Từ ngày</label>
                                </div>
                              </div>

                              <div className="col-6 mt-2">
                                <div className="form-floating">
                                  <input
                                    type="date"
                                    className="form-control date-flat-picker"
                                    name="date_to"
                                    id="date_to"
                                    value={toDate} // Gán giá trị từ ngày "Từ ngày" + 1 tháng
                                    readOnly // Chỉ cho phép đọc
                                  />
                                  <label htmlFor="date_to">Đến ngày</label>
                                </div>
                              </div>
                            </div>
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
                              <b>Thông tin:</b> Các phòng/giường lập hóa đơn mặc định tính <strong>tròn 1 tháng</strong>
                            </div>
                          </div>

                          <div className="addition-layount">
                            <div className="col-12 mt-2 mb-2">
                              <div className="title-item-small">
                                <b>Cộng thêm / Giảm trừ:</b>
                                <i className="des">Ví dụ cộng thêm ngày tết, giảm trừ covid...</i>
                              </div>
                            </div>
                            <div className="addition-item" id="addition-item">
                              <div className="loz-alert warning" style={{ marginBottom: '10px', marginTop: '10px' }}>
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
                                  Chú ý: Cộng thêm / giảm trừ không nên là tiền cọc. Hãy chọn lý do có tiền cọc để nếu
                                  cần
                                </div>
                              </div>
                              {items.map((_, index) => (
                                <AdditionItem key={index} index={index} onRemove={handleRemove} />
                              ))}
                            </div>
                            <div className="col-12">
                              <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', textAlign: 'end' }}>
                                <button
                                  type="button"
                                  id="addition-add"
                                  className="btn btn-secondary"
                                  onClick={handleAddItem}
                                  style={{ width: '100%' }}>
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
                                  Thêm mục cộng thêm / giảm trừ
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer--sticky mt-3">
                <div className="modal-footer">
                  <div className="row g-0" style={{ width: '100%' }}>
                    <div className="col-12">
                      <div className="loz-alert warning" style={{ marginBottom: '10px', marginTop: '0px' }}>
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
                          Để gửi hóa đơn tự đơn qua Zalo cho khách bạn phải tạo từng hóa đơn một. Việc gửi tự động cho
                          khách khi lập hóa đơn nhanh chỉ áp dụng khi khách thuê đang dùng app RRMS
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div>
                        <span style={{ fontSize: '16px', color: '#4ebced' }}>
                          <b className="count-deal-price-item badge " style={{ backgroundColor: '#4ebced' }}>
                            0
                          </b>{' '}
                          phòng đã được chốt dịch vụ và sẵn sàng lập hóa đơn
                        </span>
                      </div>
                    </div>
                    <div className="col-6 text-end">
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
                      {step === 2 && (
                        <button type="button" className="btn btn-primary m-1" onClick={handlePreviousStep}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2">
                            <polyline points="11 17 6 12 11 7"></polyline>
                            <polyline points="18 17 13 12 18 7"></polyline>
                          </svg>
                          Bước 1: Chốt dịch vụ
                        </button>
                      )}
                      {/* Nút chuyển đến bước tiếp theo hoặc nút lập hóa đơn (tùy theo bước hiện tại) */}
                      {step === 1 ? (
                        <button type="button" className="btn btn-primary m-1" onClick={handleNextStep}>
                          Bước 2: Lập hóa đơn
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2">
                            <polyline points="13 17 18 12 13 7"></polyline>
                            <polyline points="6 17 11 12 6 7"></polyline>
                          </svg>
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary m-1" onClick={handleSubmit}>
                          Lập hóa đơn
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InvoiceManager
