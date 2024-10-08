import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Forgot_Password = ({ setIsAdmin }) => {
  useEffect(() => {
    setIsAdmin(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
                <span className="title-feature">Yêu cầu quên tài khoản</span>
              </h2>
            </div>
            <div className="row justify-content-center align-items-center login-form-container">
              <div className="col-12 p-4">
                <div className="body">
                  <div className="mt-5">
                    <form method="POST" className="needs-validation otp-form" id="otp-form" noValidate="">
                      <input type="hidden" name="_token" value="5BJeOPDNyeTzDZjmxeICdcC1ZbEiQS4PdhfCFOol" />{' '}
                      <div className="row g-2">
                        <div className="col-12">
                          <div className="form-group mb-2">
                            <label htmlFor="phone" className="form-label">
                              Số điện thoại <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="phone"
                              placeholder="Nhập số điện thoại"
                              required=""
                              data-format="stringNumber"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group mb-2">
                            <label htmlFor="name" className="form-label">
                              Mật khẩu mới <span className="text-danger">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              placeholder="Nhập nhập khẩu"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group mb-2">
                            <label htmlFor="confirm_password" className="form-label">
                              Nhập lại mật khẩu <span className="text-danger">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              name="password_confirmation"
                              placeholder="Nhập lại mật khẩu"
                              required=""
                            />
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <p>
                          Chúng tôi sẽ gữi một mã xác nhận về tài khoản Zalo qua số điện thoại bạn nhập. Để xác minh
                          tính hợp lệ trước khi yêu cầu đổi mật khẩu
                        </p>
                      </div>
                      <div className="d-block mt-4">
                        <button id="submit-login" className="btnSubmit btn btn-primary" type="button">
                          Yêu cầu thay đổi mật khẩu
                        </button>
                      </div>
                      <div className="form-group mb-2 text-center">
                        <Link type="button" className="btn btn-link" to="/login">
                          Về đăng nhập tài khoản
                        </Link>
                      </div>
                    </form>
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

export default Forgot_Password
