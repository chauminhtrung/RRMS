import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import './Login.css'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <body
      style={{
        backgroundColor: '#f7fafc',
        background: ' url(./login-background.webp) no-repeat',
        backgroundSize: 'contain',
        backgroundPositionY: '60%',
        justifyContent: 'center',
      }}>
      <div className="container mb-5">
        <div className="login-container d-flex" id="login">
          <div className="login-content-container">
            <div className="col-md-12 text-center mt-5">
              <Link to="/" title="LOZIDO - Quản lý nhà cho thuê">
                <img
                  style={{
                    borderRadius: '100%',
                    border: '2px solid #4bcffa',
                    margin: '15px 0px',
                    boxShadow: ' 0 1rem 2rem 0 rgb(0 0 0 / 3%), 0 0.5rem 1rem 0 rgb(0 0 0 / 5%)',
                  }}
                  width="80px"
                  className="custom-logo img-responsive"
                  src="./LOGO-NHATRO.png"
                  alt="Logo LOZIDO - Quản lý nhà cho thuê"
                  title="LOZIDO - Quản lý nhà cho thuê"
                />
              </Link>
              <h2 className="mb-4 title">
                <span className="title-feature">PHẦN MỀM QUẢN LÝ NHÀ TRỌ</span>
                <br />
                Quản lý chuyên nghiệp!
              </h2>
            </div>

            <div className="row login-form-container">
              <div className="col-md-6 login-form-1" style={{ backgroundColor: '#fff' }}>
                <h3>Đăng nhập tài khoản</h3>

                <form method="POST" className="needs-validation" id="login-form" novalidate="">
                  <input type="hidden" name="_token" value="jkJEHM7McmP1rRwYRqXYkCRrsj0oZZEtjCSD9vlp" />{' '}
                  <div className="container-input">
                    <div className="form-group">
                      <input
                        style={{ borderBottom: ' 1px solid #ccc' }}
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Số diện thoại *"
                        required=""
                        data-format="stringNumber"
                      />
                      <div className="invalid-feedback">Vui lòng nhập số điện thoại</div>
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Nhập mật khẩu *"
                        required=""
                      />
                      <i className="fas fa-eye-slash toggle-password" id="togglePassword">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye-slash"
                          viewBox="0 0 16 16">
                          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"></path>
                          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"></path>
                          <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"></path>
                        </svg>
                      </i>
                      <div className="invalid-feedback">Vui lòng nhập mật khẩu</div>
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="button" id="submit-login" className="btnSubmit  ">
                      Đăng nhập
                    </button>
                  </div>
                  <hr className="my-2"></hr>
                  <div className="mt-2 text-center">
                    <a href="#" className="btn-social btn-social-outline btn-facebook">
                      <FacebookIcon />
                    </a>

                    <a href="#" className="btn-social btn-social-outline btn-googleplus">
                      <GoogleIcon />
                    </a>
                    <a href="#" className="btn-social btn-social-outline btn-twitter">
                      <TwitterIcon />
                    </a>
                    <a href="#" className="btn-social btn-social-outline btn-Instagram">
                      <InstagramIcon />
                    </a>
                  </div>
                  <div className="form-group d-flex justify-content-between">
                    <Link type="button" className="btn btn-link" to="/register">
                      Tạo tài khoản
                    </Link>
                    <Link type="button" className="btn btn-link" to="/forgot-password">
                      Quên mật khẩu
                    </Link>
                  </div>
                </form>
              </div>

              <div className="col-md-6 login-form-2 text-center" style={{ color: '#fff' }}>
                <div className="mt-5">
                  <img
                    width="110px"
                    style={{
                      borderRadius: '10px',
                      border: '2px solid #1d6b1b',
                    }}
                    src="./qr-code.png"
                    data-src="/images/qr-code.png"
                    className="lazy img-responsive"
                    alt="tải ứng dùng tìm phòng qua mã qr"
                  />
                  <h6
                    style={{
                      marginTop: '10px',
                    }}>
                    Quét mã tải app
                  </h6>
                  <div className="row mt-2 g-2">
                    <div
                      className="col-sm-12 col-md-6 text-center text-md-end aos-init aos-animate"
                      data-aos="fade-right">
                      <a href="https://play.google.com/store/apps/details?id=com.lozido_room_mobile" target="_blank">
                        <img
                          className="img-responsive image-dowload-app"
                          width="160px"
                          src="https://quanlytro.me/images/tai-ung-dung-tim-phong-tro-tren-android.png"
                          alt="Tải ứng dụng trên Android"
                          title="Tải ứng dụng trên Android"
                        />
                      </a>
                    </div>
                    <div
                      className="col-sm-12 col-md-6 text-center text-md-start aos-init aos-animate"
                      data-aos="fade-left">
                      <a href="https://apps.apple.com/vn/app/id1560928216" target="_blank">
                        <img
                          className="img-responsive image-dowload-app"
                          width="160px"
                          src="https://quanlytro.me/images/tai-ung-dung-tim-phong-tro-tren-ios.png"
                          alt="Tải ứng dụng trên iOS"
                          title="Tải ứng dụng trên iOS"
                        />
                      </a>
                    </div>
                    <p style={{ marginTop: '15px', fontSize: ' 13px' }} className="text-center">
                      * Để đăng nhập bạn phải có tài khoản. Vui lòng đăng ký tài khoản nếu chưa có
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5">
              <p>
                Copyright @ <strong>RRMS - Quản lý nhà cho thuê</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default Login
