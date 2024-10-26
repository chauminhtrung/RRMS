import { useEffect } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import ModelDeposit from '../ManagerSettings/ModelDeposit'

const MotelSetting = ({ setIsAdmin, motels, setmotels }) => {
  useEffect(() => {
    setIsAdmin(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <NavAdmin setIsAdmin={setIsAdmin} setmotels={setmotels} motels={motels} />
      <div className="page-setting mb-4">
        <div className="container">
          <div className="header-item">
            <h4 className="title-item">
              Cài đặt nhà trọ
              <i style={{ fontSize: '14px', fontWeight: 'normal' }}>Các thiết lập cho nhà trọ</i>
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
                      Nhóm phòng
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
                      Tăng giá thuê
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#on_off">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-settings">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                      Bật tắt tính năng
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#invoice_setting">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-bookmark">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                      Cài đặt hóa đơn
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#account_bank_setting">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-dollar-sign">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      Cài đặt tài khoản ngân hàng
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#app_book">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-smartphone">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <line x1="12" y1="18" x2="12.01" y2="18" />
                      </svg>
                      Thiết lập cho app khách thuê
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#extension_setting">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-file-text">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      Nội quy, giờ giấc, tiện ích cho thuê
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
                          <h3>Thông tin đại diện chủ tòa nhà</h3>
                          <p>Thông tin dùng làm hợp đồng tạm trú cho khách thuê</p>
                        </div>
                        <button className="btn btn-primary" id="save-househoder-setting-info">
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
                                  id="representative_residence"
                                  name="representative_residence"
                                  className="form-select form-control"
                                  required="">
                                  <option value="0">Khách thuê lập hộ mới</option>
                                  <option value="1">Chủ nhà là đại diện chủ hộ</option>
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
                            <div className="col-4">
                              <div className="form-floating">
                                <input
                                  data-format="string"
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  id="setting_info_name"
                                  placeholder="Nhập tên chủ nhà"
                                  required=""
                                />
                                <label htmlFor="setting_info_name">Nhập tên đại diện cho các loại giấy tờ</label>
                                <div className="invalid-feedback">Vui lòng nhập tên người đại diện</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="form-floating">
                                <input
                                  data-format="stringNumber"
                                  type="text"
                                  className="form-control"
                                  name="phone"
                                  id="setting_info_phone"
                                  placeholder="Nhập số điện thoại liên hệ"
                                  required=""
                                />
                                <label htmlFor="setting_info_phone">Nhập số điện thoại liên hệ</label>
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
                                    name="birthday"
                                    id="setting_info_birthday"
                                    placeholder="Nhập ngày/tháng/năm sinh"
                                    required=""
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
                                  name="address"
                                  id="setting_info_address"
                                  placeholder="Nhập địa chỉ thường trú"
                                  required=""
                                />
                                <label htmlFor="setting_info_address">Nhập địa chỉ thường trú</label>
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
                                  required=""
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
                                  name="identity_number"
                                  id="setting_info_identity_number"
                                  placeholder="Nhập mã định danh"
                                  required=""
                                />
                                <label htmlFor="setting_info_identity_number">Nhập mã định danh</label>
                                <div className="invalid-feedback">Vui lòng nhập mã định danh</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="form-floating">
                                <input
                                  data-format="string"
                                  type="text"
                                  className="form-control"
                                  name="identity_place"
                                  id="setting_info_identity_place"
                                  placeholder="Nhập nơi cấp"
                                  required=""
                                />
                                <label htmlFor="setting_info_identity_place">Nhập nơi cấp</label>
                                <div className="invalid-feedback">Vui lòng nhập nơi cấp mã định danh</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="input-group">
                                <div className="form-floating">
                                  <Flatpickr
                                    class="form-control"
                                    id="setting_info_identity_date"
                                    name="identity_date"
                                    placeholder="Nhập ngày cấp"
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
                          <h3>Danh sách các mẫu hợp đồng đang có</h3>
                          <p>Mẫu hợp đồng được sử dụng khi in dựa trên những thông tin bạn nhập</p>
                        </div>
                        <button
                          className="add-round"
                          data-bs-toggle="modal"
                          data-bs-target="#contractTemplateModal"
                          id="setting-contract-template">
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
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div id="on_off" className="container tab-pane fade show">
                      <br />
                      <h3>Bật tắt tính năng</h3>
                      <p>Bật tắt tính năng</p>
                    </div>
                    <div id="invoice_setting" className="container tab-pane fade show">
                      <br />
                      <h3>Cài đặt hóa đơn</h3>
                      <p>Cài đặt hóa đơn</p>
                    </div>
                    <div id="account_bank_setting" className="container tab-pane fade show">
                      <br />
                      <h3>Cài đặt tài khoản ngân hàng</h3>
                      <p>Cài đặt tài khoản ngân hàng</p>
                    </div>
                    <div id="app_book" className="container tab-pane fade show">
                      <br />
                      <h3>App</h3>
                      <p>App</p>
                    </div>
                    <div id="extension_setting" className="container tab-pane fade show">
                      <br />
                      <h3>Extension</h3>
                      <p>Extension</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModelDeposit />
    </div>
  )
}

export default MotelSetting
