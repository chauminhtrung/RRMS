/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { getAccountByUsername } from '~/apis/accountAPI'

import NavAdmin from '~/layouts/admin/NavbarAdmin'

const ManagerMyAccount = ({ setIsAdmin, TaiKhoan }) => {
  const [account, setAccount] = useState([])

  useEffect(() => {
    setIsAdmin(true)

    fetchAccountByUsername(TaiKhoan)
  }, [TaiKhoan]) // Thêm dependency array cho TaiKhoan

  const fetchAccountByUsername = async (username) => {
    try {
      const res = await getAccountByUsername(username)
      setAccount(res.data)
    } catch (error) {
      console.error('Error fetching account:', error)
    }
  }

  return (
    <div>
      <NavAdmin setIsAdmin={setIsAdmin} />

      <div className="page-setting mb-4">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 className="title-item">
              Tài khoản
              <i style={{ fontSize: '14px', fontWeight: 'normal' }}>Các thiết lập tài khoản</i>
            </h4>
          </div>
          <div className="card-feature2 overflow-hidden">
            <div className="d-flex">
              <div className="col-md-3" style={{ borderRight: '1px solid #eee', padding: '0' }}>
                {/* Nav tabs  */}
                <ul className="nav setting-tabs" role="tablist" style={{ display: 'unset' }}>
                  <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="tab" href="#home">
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
                      Thông tin tài khoản
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#devices">
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
                        className="feather feather-monitor">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                      Thiết bị đăng nhập
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-9">
                <div style={{ padding: '15px' }}>
                  {/* tab panes */}
                  <div className="tab-content">
                    <div id="home" className="container tab-pane active">
                      <br />
                      <div className="text-center">
                        <div
                          style={{
                            height: '100%',
                            backgroundColor: '#eee',
                            borderRadius: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            position: 'relative',
                            cursor: 'pointer!important',
                            width: '100px',

                            margin: 'auto'
                          }}>
                          <img src="https://quanlytro.me/./images/avatar.png" width="100%" alt="avatar" />
                        </div>
                        <div className="text-center">
                          <h3 className="mt-0 text-black">
                            <span>
                              <b>{account.username}</b>
                            </span>
                          </h3>
                          <div>
                            <span style={{ color: '#20a9e7' }}>
                              <i>Tài khoản Đã xác minh</i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="account-payment">
                        <div className="item" style={{ boderRight: '1px solid #b8ebba' }}>
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
                              className="feather feather-dollar-sign">
                              <line x1="12" y1="1" x2="12" y2="23"></line>
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                          </div>
                          <div>
                            <i>Xu gốc</i>
                            <div>
                              <strong>0đ xu</strong>
                            </div>
                          </div>
                        </div>
                        <div className="item" style={{ boderRight: '1px solid #b8ebba' }}>
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
                              className="feather feather-gift">
                              <polyline points="20 12 20 22 4 22 4 12"></polyline>
                              <rect x="2" y="7" width="20" height="5"></rect>
                              <line x1="12" y1="22" x2="12" y2="7"></line>
                              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                            </svg>
                          </div>
                          <div>
                            <i>Xu khuyến mãi</i>
                            <div>
                              <strong>0đ xu</strong>
                            </div>
                          </div>
                        </div>
                        <div className="item" style={{ boderRight: '1px solid #b8ebba' }}>
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
                              className="feather feather-repeat">
                              <polyline points="17 1 21 5 17 9"></polyline>
                              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                              <polyline points="7 23 3 19 7 15"></polyline>
                              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                            </svg>
                          </div>
                          <div>
                            <i>Chú ý cách quy đổi</i>
                            <div>
                              <strong>1đ &lt;-&gt; 1xu</strong>
                            </div>
                          </div>
                        </div>
                        <div className="item" style={{ justifyContent: 'center' }}>
                          <div className="btn btn-primary">Nạp thêm tiền xu</div>
                        </div>
                      </div>
                      <div className="info-account" style={{ padding: '10px' }}>
                        <div className="item d-flex justify-content-between">
                          <span>Mã tài khoản</span>
                          <span>
                            <b>#202OW00007661</b>
                          </span>
                        </div>
                        <div className="item no-border d-flex justify-content-between">
                          <span>Tình trạng</span>
                          <span style={{ color: '#68c3ed' }}>
                            <b>Đã xác minh</b>
                          </span>
                        </div>
                        <div className="item d-flex justify-content-between">
                          <span>Loại tài khoản</span>
                          <span>
                            <b>Trải nghiệm &amp; Miễn phí</b>
                          </span>
                        </div>

                        <div className="item d-flex justify-content-between">
                          <span>Số điện thoại</span>
                          <span>
                            <b>{account.phone}</b>
                          </span>
                        </div>
                        <div className="item d-flex justify-content-between">
                          <span>Ngày tạo tài khoản</span>
                          <span>
                            <b>08/08/2024</b>
                          </span>
                        </div>
                        <div className="item d-flex justify-content-between">
                          <span>Ngày đăng nhập lần đầu</span>
                          <span>
                            <b></b>
                          </span>
                        </div>
                        <div className="item d-flex justify-content-between">
                          <span>Tổng số ngày sử dụng</span>
                          <span>
                            <b>67</b>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div id="devices" className="container tab-pane fade show ">
                      <br />
                      <h3>Danh sách thiết bị đăng nhập</h3>
                      <div className="row" style={{ padding: '10px' }}>
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>
                                <b>Thiết bị</b>
                              </td>
                              <td>
                                <b>Hệ điều hành</b>
                              </td>
                              <td>
                                <b>Tên thiết bị</b>
                              </td>
                              <td>
                                <b>Mẫu thiết bị</b>
                              </td>
                              <td>
                                <b>Model</b>
                              </td>
                              <td>
                                <b>Phiên bản</b>
                              </td>
                              <td>
                                <b>Ngày đăng nhập</b>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagerMyAccount
