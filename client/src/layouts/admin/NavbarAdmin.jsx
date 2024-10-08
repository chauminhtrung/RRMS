import { Link } from 'react-router-dom'
import './NavbarAdmin.css'
import { Tooltip } from 'react-tooltip'
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
                        className="feather feather-home">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      <span style={{ marginTop: '5px' }} className="text">
                        Quản lý nhà
                      </span>
                    </a>
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
                    <a href="/mo-gioi" className="nav-link ">
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
                    </a>
                  </li>
                  <li className="nav-item menu-item ">
                    <a href="/phan-quyen" className="nav-link ">
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
                    </a>
                  </li>
                  <li className="nav-item menu-item ">
                    <a href="/cai-dat" className="nav-link ">
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
                    </a>
                  </li>
                  <li className="nav-item btn-group menu-item ">
                    <a href="javascript:;" className="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
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
                    </a>
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
                    <a href="/tai-khoan" className="nav-link ">
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
                    </a>
                  </li>
                  <li className="nav-item menu-item ">
                    <a href="/dang-xuat" className="nav-link ">
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
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </nav>
        </div>
      </div>
      <div>
        <div>
          <div
            style={{
              minHeight: '125px',
              display: 'flex',
              padding: '0px 10px 0px 0px',
            }}>
            <div className="col-md-2 d-flex align-items-center justify-content-center" style={{ marginRight: '10px' }}>
              <div
                className="current-block d-flex align-items-center"
                style={{ position: 'relative' }}
                data-bs-toggle="modal"
                data-bs-target="#manageBlock">
                <div className="d-flex align-items-center" style={{ flexDirection: 'row', flex: '1' }}>
                  <div className="icon-blocks">
                    <span className="count-block">1</span>
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
                      className="feather feather-home feather-size-18">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>

                  <div style={{ padding: '20px 0px 20px 5px', flex: '1' }}>
                    <span style={{ fontSize: '17px' }}>Đang quản lý</span>
                    <h4
                      style={{
                        fontSize: '18px',
                        color: '#20a9e7',
                        padding: '0px',
                        margin: '0px',
                        whiteSpace: 'nowrap',
                        maxWidth: '150px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                      <span>Nhà trọ Trung</span>
                    </h4>
                  </div>
                </div>

                <button
                  className="shadow"
                  id="add-block"
                  style={{
                    position: 'absolute',
                    right: '-10px',
                    top: '34px',
                    borderRadius: '100%',
                    height: '35px',
                    width: '35px',
                    textAlign: 'center',
                    padding: '0px',
                    backgroundColor: '#20a9e7',
                    color: '#fff',
                    border: '1px solid #20a9e7',
                    zIndex: '10',
                  }}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Thêm mới nhà cho thuê"
                  data-tooltip-place="top">
                  <Tooltip id="my-tooltip" />

                  <span
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Thêm mới nhà cho thuê">
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
            </div>
            <div
              className="col-md-10"
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
              }}>
              <div
                className=" scrollable-content-container"
                style={{
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  display: 'flex',
                  overflow: 'hidden',
                }}>
                <button className="scroll-left hidden">←</button>
                <div
                  className="scrollable-content"
                  style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    position: 'relative',
                  }}>
                  <a href="/quan-ly" className="item-menu active">
                    <div className="icon text-center">
                      <img width="47px" className="mb-2" src="./billicon.png" />
                    </div>
                    <div className="key">
                      <span className="titleAdmin">
                        <b>Quản lý phòng</b>
                      </span>
                    </div>
                  </a>
                  <a href="/quan-ly/6891/lap-phieu-thu" className="item-menu">
                    <div className="icon text-center">
                      <img width="47px" className="mb-2" src="./billicon.png" />
                    </div>
                    <div className="key">
                      <span className="titleAdmin">
                        <b>Quản lý hóa đơn</b>
                      </span>
                    </div>
                  </a>
                  <a href="/quan-ly/6891/quan-ly-dich-vu" className="item-menu">
                    <div className="icon text-center">
                      <img width="47px" className="mb-2" src="./billpen.png" />
                    </div>
                    <div className="key">
                      <span className="titleAdmin">
                        <b>Quản lý dịch vụ</b>
                      </span>
                    </div>
                  </a>
                  <a href="/quan-ly/6891/quan-ly-tai-san" className="item-menu">
                    <div className="icon text-center">
                      <img width="47px" className="mb-2" src="./billpen.png" />
                    </div>
                    <div className="key">
                      <span className="titleAdmin">
                        <b>Quản lý tài sản</b>
                      </span>
                    </div>
                  </a>
                  <a href="/quan-ly/6891/tat-ca-hop-dong" className="item-menu">
                    <div className="icon text-center">
                      <img width="47px" className="mb-2" src="./contractbill.png" />
                    </div>
                    <div className="key">
                      <span className="titleAdmin">
                        <b>Quản lý hợp đồng</b>
                      </span>
                    </div>
                  </a>
                  <a href="/quan-ly/6891/tat-ca-khach-thue" className="item-menu">
                    <div className="icon text-center">
                      <img width="47px" className="mb-2" src="./phonebill.png" />
                    </div>
                    <div className="key">
                      <span className="titleAdmin">
                        <b>Quản lý khách thuê</b>
                      </span>
                    </div>
                  </a>
                  <a href="/quan-ly/6891/thu-chi-tong-ket" className="item-menu">
                    <div className="icon text-center">
                      <img width="47px" className="mb-2" src="./billicon.png" />
                    </div>
                    <div className="key">
                      <span className="titleAdmin">
                        <b>Thu/Chi - Tổng kết</b>
                      </span>
                    </div>
                  </a>
                  <a href="/quan-ly/6891/cai-dat-nha-tro" className="item-menu">
                    <div className="icon text-center">
                      <img width="47px" className="mb-2" src="./setting.png" />
                    </div>
                    <div className="key">
                      <span className="titleAdmin">
                        <b>Cài đặt</b>
                      </span>
                    </div>
                  </a>
                  <a href="/quan-ly/6891/lich-su-gui-zalo" className="item-menu">
                    <div className="icon text-center">
                      <img width="47px" className="mb-2" src="./icon-zalo.png" />
                    </div>
                    <div className="key">
                      <span className="titleAdmin">
                        <b>Lịch sử gửi zalo</b>
                      </span>
                    </div>
                  </a>
                  <a href="/quan-ly/6891/import-data-from-file" className="item-menu">
                    <div className="icon text-center">
                      <img width="47px" className="mb-2" src="./setting.png" />
                    </div>
                    <div className="key">
                      <span className="titleAdmin">
                        <b>Nhập liệu từ file</b>
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavAdmin
