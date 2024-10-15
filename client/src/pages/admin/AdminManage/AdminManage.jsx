import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminManage.css';
import { Link } from 'react-router-dom';

const AdminManage = ({ setIsAdmin }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setIsAdmin(true);
  }, [setIsAdmin]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="wrapper">
      <aside id="sidebar" className={isCollapsed ? 'collapsed' : ''}>
        <div className="h-100">
          <div className="sidebar-logo">
            <img className='imglogo' src="./logo.png" alt="" />
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link to="" className="sidebar-link">
                <i class="bi bi-house-door-fill"></i> Trang Chủ
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                to=""
                className="sidebar-link collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#manageLandlords"
                aria-expanded="false"
                aria-controls="manageLandlords"
              >
                <i class="bi bi-kanban"></i> Quản Lý Chủ Trọ
              </Link>
              <ul id="manageLandlords" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <Link to="" className="sidebar-link"><i class="bi bi-plus-circle"></i> Thêm Chủ Trọ</Link>
                </li>
                <li className="sidebar-item">
                  <Link to="" className="sidebar-link"><i className="bi bi-list-check fw-bold"></i> Danh Sách Chủ Trọ</Link>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <Link
                to=""
                className="sidebar-link collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#manageUsers"
                aria-expanded="false"
                aria-controls="manageUsers"
              >
                <i class="bi bi-kanban"></i> Quản Lý Người Dùng
              </Link>
              <ul id="manageUsers" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <Link to="" className="sidebar-link"><i class="bi bi-plus-circle"></i>  Thêm Người Dùng</Link>
                </li>
                <li className="sidebar-item">
                  <Link to="" className="sidebar-link"><i className="bi bi-list-check fw-bold"></i> Danh Sách Người Dùng</Link>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <Link
                to=""
                className="sidebar-link collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#managePosts"
                aria-expanded="false"
                aria-controls="managePosts"
              >
                <i class="bi bi-kanban"></i> Quản Lý Đăng Tin
              </Link>
              <ul id="managePosts" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <Link to="" className="sidebar-link"><i class="bi bi-plus-circle"></i>  Thêm Đăng Tin</Link>
                </li>
                <li className="sidebar-item">
                  <Link to="" className="sidebar-link"><i className="bi bi-list-check fw-bold"></i> Danh Sách Đăng Tin</Link>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <Link
                to=""
                className="sidebar-link collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#manageReports"
                aria-expanded="false"
                aria-controls="manageReports"
              >
                <i class="bi bi-kanban"></i> Quản Lý Báo Cáo
              </Link>
              <ul id="manageReports" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <Link to="" className="sidebar-link"><i class="bi bi-plus-circle"></i>  Thêm Báo Cáo</Link>
                </li>
                <li className="sidebar-item">
                  <Link to="" className="sidebar-link"><i className="bi bi-list-check fw-bold"></i> Danh Sách Báo Cáo</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
      <div className="main">
        <nav className="navbar navbar-expand px-3 border-bottom d-flex justify-content-between">
          <button className="btn" type="button" onClick={toggleSidebar}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="ms-auto d-flex">
            <div className="mx-2"><i class="bi bi-bell"></i> Thông báo</div>
            <div className="mx-2"><i class="bi bi-box-arrow-right"></i> Đăng xuất</div>
            <div className="mx-2"><i class="bi bi-person-lock"></i> Đổi Mật Khẩu</div>
            <div className="mx-2"><i class="bi bi-info-circle"></i> Trợ giúp</div>
          </div>
        </nav>


        <main className="content px-3 py-2" >
          <div className="container-fluid">
            <div className="mb-3" >
              <h3 className='text-danger'>thuan</h3>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminManage;
