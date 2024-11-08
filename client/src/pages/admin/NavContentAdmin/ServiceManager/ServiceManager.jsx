import { useEffect } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import 'flatpickr/dist/plugins/monthSelect/style.css' // Thêm CSS của plugin monthSelect
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import { Vietnamese } from 'flatpickr/dist/l10n/vn' // Import ngôn ngữ tiếng Việt
import 'react-tabulator/lib/styles.css' // required styles
import 'react-tabulator/lib/css/tabulator.min.css' // theme
import { ReactTabulator } from 'react-tabulator'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import ModelCreateService from './ModelCreateService'
const ServiceManager = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  const columns = [
    { title: 'Tên phòng', field: 'nameRoom', hozAlign: 'center', width: 160 },
    {
      title: 'Tiền điện (KWh)',
      columns: [
        { title: 'Số cũ', field: 'numberOld', hozAlign: 'right', sorter: 'number', width: 145 },
        { title: 'Số mới', field: 'numberNew', hozAlign: 'center', width: 145 },
        { title: 'Thành tiền', field: 'total', hozAlign: 'center', width: 170 },
      ],
    },
    {
      title: 'Tiền nước (Khối)',
      columns: [
        { title: 'Số cũ', field: 'numberOld', hozAlign: 'right', sorter: 'number', width: 145 },
        { title: 'Số mới', field: 'numberNew', hozAlign: 'center', width: 145 },
        { title: 'Thành tiền', field: 'total', hozAlign: 'center', width: 170 },
      ],
    },
    {
      title: '',
      columns: [
        { title: '', field: 'numberOld', hozAlign: 'right', sorter: 'number', width: 145 },
        { title: '', field: 'numberNew', hozAlign: 'center', width: 145 },
        { title: '0 ₫', field: 'total', hozAlign: 'center', width: 170 },
      ],
    },
  ]

  const data = [
    // thêm dữ liệu mẫu
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
      headerSort: false,
    },
    columnHeaderVertAlign: 'bottom', // align header contents to bottom of cell
  }

  useEffect(() => {
    setIsAdmin(true)
  }, [])
  return (
    <div>
      <NavAdmin
        setmotels={setmotels}
        motels={motels}
        setIsAdmin={setIsAdmin}
        setIsNavAdmin={setIsNavAdmin}
        isNavAdmin={isNavAdmin}
      />
      <div
        style={{
          backgroundColor: '#fff',
          padding: '15px 15px 15px 15px',
          borderRadius: '10px',
          margin: '0 10px 10px 10px',
        }}>
        <div className="page-price-item" id="managePriceItem">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="header-item">
                <h4 className="title-item">
                  Quản lý dịch vụ
                  <i className="des">Các dịch vụ khách thuê xài</i>
                </h4>
                <button className="add-round" data-bs-toggle="modal" data-bs-target="#addPriceItem">
                  <span
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    title=""
                    data-bs-original-title="Thêm dịch vụ">
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
              <div className="list-price-item">
                <div className="mt-2">
                  <div
                    className="mb-3 inner-item item-feature d-flex align-items-center justify-content-between"
                    id="price-item-22728">
                    <div className="btn-round">
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
                        className="feather feather-tag">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                      </svg>
                    </div>
                    <div style={{ display: 'grid', flex: '1' }}>
                      <b className="price-item-name">Tiền điện</b>
                      <span className="price-item-price">
                        <span>1.700đ/ KWh</span>
                      </span>
                      <i className="price-item-status">
                        <span style={{ color: '#dc3545' }}>Không áp dụng cho phòng nào</span>
                      </i>
                    </div>
                    <div
                      className="btn-round btn-edit"
                      data-bs-toggle="modal"
                      data-bs-target="#addPriceItem"
                      data-price-item='{"id":22728,"block_id":6891,"user_id":7661,"name":"Ti\u1ec1n \u0111i\u1ec7n","frames":[],"price":1700,"subtraction":1,"status":"is_active","status_text":"\u0110ang s\u1eed d\u1ee5ng","type":"constant","type_text":"Theo gi\u00e1 tr\u1ecb c\u1ed1 \u0111\u1ecbnh","unit":"kwh","unit_text":"KWh","is_default":1,"category":"ele","rooms":{"payload":[]},"value":null,"history":null}'>
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          alignItems: 'center',
                          display: 'inherit',
                          textAlign: 'center',
                          justifyContent: 'center',
                          color: '#000',
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
                    <div style={{ marginRight: '10px' }} className="btn-round btn-delete" data-id="22728">
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
                  </div>
                  <div
                    className="mb-3 inner-item item-feature d-flex align-items-center justify-content-between"
                    id="price-item-22729">
                    <div className="btn-round">
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
                        className="feather feather-tag">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                      </svg>
                    </div>
                    <div style={{ display: 'grid', flex: '1' }}>
                      <b className="price-item-name">Tiền nước</b>
                      <span className="price-item-price">
                        <span>18.000đ/ Khối</span>
                      </span>
                      <i className="price-item-status">
                        <span style={{ color: '#dc3545' }}>Không áp dụng cho phòng nào</span>
                      </i>
                    </div>
                    <div
                      className="btn-round btn-edit"
                      data-bs-toggle="modal"
                      data-bs-target="#addPriceItem"
                      data-price-item='{"id":22729,"block_id":6891,"user_id":7661,"name":"Ti\u1ec1n n\u01b0\u1edbc","frames":[],"price":18000,"subtraction":1,"status":"is_active","status_text":"\u0110ang s\u1eed d\u1ee5ng","type":"constant","type_text":"Theo gi\u00e1 tr\u1ecb c\u1ed1 \u0111\u1ecbnh","unit":"khoi","unit_text":"Kh\u1ed1i","is_default":1,"category":"water","rooms":{"payload":[]},"value":null,"history":null}'>
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          alignItems: 'center',
                          display: 'inherit',
                          textAlign: 'center',
                          justifyContent: 'center',
                          color: '#000',
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
                    <div style={{ marginRight: '10px' }} className="btn-round btn-delete" data-id="22729">
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="header-item">
                <h4 className="title-item">
                  Khách thuê sử dụng trong tháng
                  <i className="des">Thống kê mỗi tháng khách thuê xài</i>
                </h4>
                <div className="input-group" style={{ width: '30%', marginTop: '20px' }}>
                  <div className="form-floating">
                    <Flatpickr
                      className="form-control month-flat-picker flatpickr-input"
                      name="month"
                      id="month"
                      placeholder="Nhập tháng"
                      options={{
                        locale: Vietnamese, // Cấu hình ngôn ngữ tiếng Việt
                        plugins: [
                          new monthSelectPlugin({
                            shorthand: true, //defaults to false
                            dateFormat: 'm/y', //defaults to "F Y"
                          }),
                        ],
                      }}
                    />

                    <label htmlFor="month">Tháng lập phiếu</label>
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
              <div className="header-table header-item text-end" style={{ justifyContent: 'right' }}>
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
              <div className="">
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
            </div>
          </div>
        </div>
      </div>
      {/* Modal them dich vu  */}
      <ModelCreateService />
    </div>
  )
}

export default ServiceManager
