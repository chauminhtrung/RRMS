import { Link } from 'react-router-dom'
import './NavbarAdmin.css'
// import NavWData from './NavWData'

const NavAdmin = ({ setIsAdmin }) => {
  return (
    <header>
      <div className="header-inner">
        <div className="notification text-center" style={{ padding: '10px', backgroundColor: '#ffe8c8' }}>
          RRMS đã có thêm tính năng <strong>gửi hóa đơn tự động cho khách qua ZALO và APP dành riêng khách thuê</strong>
          . Liên hệ chuyên viên để thêm thông tin qua: <b style={{ color: '#0085ef' }}>HOTLINE: 0907474629</b> hoặc chat{' '}
          <a href="#" target="_bank" style={{ color: '#0085ef' }}>
            <b>ZALO</b>
          </a>
        </div>
        <div className="header-sticky">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#lozido-main-menu"
                aria-controls="lozido-main-menu"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"> </span>
              </button>
              <nav className="collapse navbar-collapse lozido-main-menu">
                <ul className="navbar-nav main-menu-left  me-auto mb-2 mb-lg-0">
                  <li className="nav-item menu-item active">
                    <Link to="/" className="nav-link ">
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
                        className="feather feather-arrow-left"
                        onClick={() => setIsAdmin(false)}>
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                      </svg>
                      <img width="110px" height="54px" src="./bg2.png" />
                    </Link>
                  </li>
                </ul>
                <ul className="topbar-items main-menu-right navbar-nav">
                  <li className="nav-item menu-item active">
                    <Link to="/admin" className="nav-link ">
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
                      <span style={{ marginTop: '5px' }} className="text">
                        Quản lý nhà
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item menu-item ">
                    <a href="#" className="nav-link ">
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
                        className="feather feather-pie-chart">
                        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                        <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                      </svg>
                      <span style={{ marginTop: '5px' }} className="text">
                        Tổng báo cáo
                      </span>
                    </a>
                  </li>
                  <li className="nav-item menu-item ">
                    <Link to="/dang-tin" className="nav-link ">
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
                      <span style={{ marginTop: '5px' }} className="text">
                        Đăng tin
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item menu-item ">
                    <Link to="/adminBoker" className="nav-link ">
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
                        className="feather feather-users">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <span style={{ marginTop: '5px' }} className="text">
                        Môi giới
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item menu-item ">
                    <Link to="/phan-quyen" className="nav-link ">
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
                      <span style={{ marginTop: '5px' }} className="text">
                        Công ty/nhóm
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item menu-item ">
                    <Link to="/cai-dat" className="nav-link ">
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
                        className="feather feather-settings">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                      <span style={{ marginTop: '5px' }} className="text">
                        Cài đặt chung
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item btn-group menu-item ">
                    <Link to="javascript:;" className="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                      <span className="count-notification badge">0</span>
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
                      <span style={{ marginTop: '5px' }} className="text">
                        Thông báo
                      </span>
                    </Link>
                    <ul className="dropdown-menu notication-dropdown dropdown-menu-lg-end">
                      <div className="text-center" style={{ padding: '20px' }}>
                        <img
                          style={{ margin: 'auto' }}
                          src="https://quanlytro.me/images/icons/loading.gif"
                          alt="Đang tải..."
                          width="50px"
                        />
                        <div>
                          <i className="loading_text" style={{ marginTop: '-10px', fontSize: '13px' }}>
                            Đang tải thông báo...
                          </i>
                        </div>
                      </div>
                    </ul>
                  </li>
                  <li className="nav-item menu-item ">
                    <Link to="/tai-khoan" className="nav-link ">
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
                      <span style={{ marginTop: '5px' }} className="text">
                        Tài khoản
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item menu-item ">
                    <Link to="/dang-xuat" className="nav-link ">
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
                        className="feather feather-log-out">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      <span style={{ marginTop: '5px' }} className="text">
                        Đăng xuất
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </nav>
        </div>
      </div>

      {/* neu co du lieu moi co cai nay */}
      {/* <NavWData /> */}
    </header>
  )
}

export default NavAdmin
