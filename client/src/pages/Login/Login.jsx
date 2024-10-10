import { useEffect, useState } from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

const Login = ({ setIsAdmin }) => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    setIsAdmin(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!phone || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin.')
      return
    }

    const account = { phone, password }

    try {
      const response = await axios.post('http://localhost:8080/login', account)
      alert(response.data)

      navigate('/')
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data)
      } else {
        setErrorMessage('Có lỗi xảy ra, vui lòng thử lại.')
      }
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#f7fafc',
        background: 'url(./login-background.webp) no-repeat',
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
                  src="./LOGO-NHATRO.png"
                  alt="Logo LOZIDO - Quản lý nhà cho thuê"
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

                {/* Add error message display */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <form onSubmit={handleSubmit} className="needs-validation" id="login-form">
                  <div className="container-input">
                    <div className="form-group">
                      <input
                        style={{ borderBottom: '1px solid #ccc' }}
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Số điện thoại *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                      <div className="invalid-feedback">Vui lòng nhập số điện thoại</div>
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Mật khẩu *"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div className="invalid-feedback">Vui lòng nhập mật khẩu</div>
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" id="submit-login" className="btnSubmit">
                      Đăng nhập
                    </button>
                  </div>
                  <hr className="my-2" />
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
                    <Link className="btn btn-link" to="/register">
                      Tạo tài khoản
                    </Link>
                    <Link className="btn btn-link" to="/forgot-password">
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
                  <h6 style={{ marginTop: '10px' }}>Quét mã tải app</h6>
                  <div className="row mt-2 g-2">
                    <div
                      className="col-sm-12 col-md-6 text-center text-md-end aos-init aos-animate"
                      data-aos="fade-right"></div>
                    <div
                      className="col-sm-12 col-md-6 text-center text-md-start aos-init aos-animate"
                      data-aos="fade-left"></div>
                  </div>
                  <p style={{ marginTop: '15px', fontSize: '13px' }} className="text-center">
                    * Để đăng nhập bạn phải có tài khoản. Vui lòng đăng ký tài khoản nếu chưa có
                  </p>
                </div>
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
  )
}

export default Login
