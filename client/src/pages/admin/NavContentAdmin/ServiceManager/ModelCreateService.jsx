import { useState } from 'react'

import 'flatpickr/dist/themes/material_blue.css'
import 'flatpickr/dist/plugins/monthSelect/style.css' // Thêm CSS của plugin monthSelect
import 'react-tabulator/lib/styles.css' // required styles
import 'react-tabulator/lib/css/tabulator.min.css' // theme

const ModelCreateService = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'constant',
    unit: 'kwh',
    price: '',
    subtraction: false,
    roomCheckAll: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Kiểm tra tính hợp lệ của dữ liệu
    if (!formData.name || !formData.price) {
      alert('Vui lòng điền đầy đủ thông tin!')
      return
    }

    // Xử lý dữ liệu (ví dụ: gửi đến server)
    console.log('Dữ liệu biểu mẫu:', formData)

    // Xóa form sau khi gửi (nếu cần)
    setFormData({
      name: '',
      unit: 'kwh',
      price: '',
      subtraction: false,
      roomCheckAll: false,
    })

    // Nếu bạn sử dụng Bootstrap Modal, có thể đóng modal ở đây
    // Ví dụ:
    // const modal = document.getElementById('yourModalId');
    // const modalInstance = bootstrap.Modal.getInstance(modal);
    // modalInstance.hide();
  }

  return (
    <div>
      {/* Modal them dich vu  */}
      <div
        className="modal fade"
        data-bs-backdrop="static"
        id="addPriceItem"
        tabIndex="-1"
        style={{ display: 'none' }}
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div
                style={{
                  marginRight: '15px',
                  outline: 0,
                  boxShadow: 'rgba(112, 175, 237, 0.16) 0px 0px 0px 0.25rem',
                  opacity: 1,
                  borderRadius: '100%',
                  width: '36px',
                  height: '36px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  backgroundColor: 'rgb(111, 171, 232)',
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
              <h5 className="modal-title">Thêm dịch vụ mới</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                {' '}
              </button>
            </div>
            <div className="modal-body">
              <form className="needs-validation" id="add-price-item-form" noValidate>
                <input type="hidden" name="_token" value="6TLA6XWyRIRQ4oxKHkrPBi0WcZIByCmbDJ8a1MEM" />
                <div className="row g-2">
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        required
                        placeholder="Tên dịch vụ"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <label htmlFor="name">Tên dịch vụ</label>
                      <div className="invalid-feedback">Vui lòng nhập tên dịch vụ</div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="title-item-small">
                      <b>Đơn vị và giá</b>
                      <i className="des">Nhập thông tin đơn vị tính và giá</i>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-floating">
                      <select
                        id="unit"
                        name="unit"
                        className="form-select form-control"
                        value={formData.unit}
                        onChange={handleChange}>
                        <option value="kwh">kWh</option>
                        <option value="khoi">Khối</option>
                        <option value="thang">Tháng</option>
                        <option value="nguoi">Người</option>
                        <option value="chiec">Chiếc</option>
                        <option value="lan">Lần</option>
                        <option value="cai">Cái</option>
                      </select>
                      <label htmlFor="unit">Đơn vị</label>
                    </div>
                  </div>

                  <div className="col-6 constant_price">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        min="0"
                        name="price"
                        id="price"
                        placeholder="Giá thuê"
                        required
                        value={formData.price}
                        onChange={handleChange}
                      />
                      <label htmlFor="price">Giá dịch vụ (đ)</label>
                      <div className="invalid-feedback">Vui lòng nhập giá thuê</div>
                    </div>
                  </div>

                  <div
                    className="col-12"
                    style={{
                      border: '1px solid #84a766',
                      borderRadius: '10px',
                      backgroundColor: '#f8fff2',
                      padding: '10px',
                    }}>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="subtraction"
                        name="subtraction"
                        checked={formData.subtraction}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="subtraction">
                        <b>Tính theo kiểu đồng hồ điện, nước</b>
                        <p>Mức sử dụng của khách thuê có sự chênh lệch trước sau</p>
                      </label>
                    </div>
                  </div>

                  <div className="col-8 mt-2">
                    <div className="title-item-small">
                      <b>Chọn phòng muốn áp dụng</b>
                      <i className="des">Danh sách phòng chọn áp dụng</i>
                    </div>
                  </div>

                  <div className="col-4 mt-4" style={{ textAlign: 'center' }}>
                    <input
                      style={{ float: 'right' }}
                      className="form-check-input"
                      id="room_check_all"
                      type="checkbox"
                      name="room_check_all"
                      checked={formData.roomCheckAll}
                      onChange={handleChange}
                    />
                    <label htmlFor="room_check_all">
                      <b>Chọn tất cả</b>
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div
              className="modal-footer modal-footer--sticky"
              style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="row g-0" style={{ width: '100%' }}>
                <div className="col-6">{/* Có thể thêm nội dung vào đây nếu cần */}</div>
                <div className="col-6 text-end">
                  <button type="button" className="btn btn-secondary m-1" data-bs-dismiss="modal">
                    Đóng
                  </button>
                  <button type="button" id="submit-add-price-item" className="btn btn-primary" onClick={handleSubmit}>
                    Thêm mới
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelCreateService
