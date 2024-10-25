import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = ({ setIsAdmin }) => {
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setIsAdmin(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRegister = async (event) => {
    event.preventDefault() // Ngăn chặn hành vi mặc định của form

    // Kiểm tra xem tất cả các trường đều được điền
    if (!username || !phone || !password || !passwordConfirmation) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin.')
      return
    }

    if (password !== passwordConfirmation) {
      setErrorMessage('Mật khẩu và xác nhận mật khẩu không khớp.')
      return
    }

    const account = {
      username,
      phone,
      password,
      // Thêm các trường khác nếu cần
    }

    try {
      const response = await axios.post('http://localhost:8080/authen/register', account)
      alert(response.data) // Thông báo thành công
      // Chuyển hướng người dùng đến trang đăng nhập hoặc trang khác nếu cần
    } catch (error) {
      // Xử lý lỗi và hiển thị thông báo lỗi
      if (error.response) {
        setErrorMessage(error.response.data) // Nhận thông báo lỗi từ backend
      } else {
        setErrorMessage('Có lỗi xảy ra, vui lòng thử lại.')
      }
    }
  }

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
                    boxShadow: '0 1rem 2rem 0 rgb(0 0 0 / 3%), 0 0.5rem 1rem 0 rgb(0 0 0 / 5%)',
                  }}
                  width="80px"
                  className="custom-logo img-responsive"
                  src="./LOGO-NHATRO.png"
                  alt="Logo LOZIDO - Quản lý nhà cho thuê"
                  title="LOZIDO - Quản lý nhà cho thuê"
                />
              </Link>
              <h2 className="mb-4 title">
                <span className="title-feature">ĐĂNG KÝ TÀI KHOẢN</span>
              </h2>
              <h3 className="mb-4 title">
                <span className="title-feature" style={{ color: '' }}>
                  PHẦN MỀM QUẢN LÝ NHÀ TRỌ
                </span>
                <br />
                Quản lý chuyên nghiệp!
              </h3>
            </div>

            <div className="row login-form-container">
              <div className="col-12 login-form-1" style={{ backgroundColor: '#fff' }}>
                <form onSubmit={handleRegister} method="POST" className="needs-validation" id="login-form" noValidate>
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <label htmlFor="username" className="form-label">
                          Tên người dùng <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          placeholder="Nhập tên người dùng"
                          required
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <label htmlFor="phone" className="form-label">
                          Số điện thoại <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          placeholder="Nhập số điện thoại"
                          required
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <label htmlFor="password" className="form-label">
                          Mật khẩu <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Nhập mật khẩu"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <label htmlFor="password_confirmation" className="form-label">
                          Nhập lại mật khẩu <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="password_confirmation"
                          placeholder="Nhập lại mật khẩu"
                          required
                          onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                  <div className="form-group mb-2">
                    <button type="submit" className="btnSubmit btn btn-primary">
                      Đăng ký
                    </button>
                  </div>
                  <div className="form-group mb-2 text-center">
                    <Link type="button" className="btn btn-link" to="/login">
                      Bạn đã có tài khoản, Đăng nhập?
                    </Link>
                  </div>
                </form>
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

export default Register
