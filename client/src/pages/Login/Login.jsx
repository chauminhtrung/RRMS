import { useState } from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Login.css'
import { env } from '~/configs/environment'
import ValidCaptcha from '~/components/ValidCaptcha'
import { toast } from 'react-toastify'

//test
const Login = ({ setUsername, setAvatar }) => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [validCaptcha, setValidCaptcha] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validCaptcha) {
      toast.error('Captcha xác thực không thành công!')
      return
    }

    event.preventDefault()
    if (!phone || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Vui lòng nhập đầy đủ thông tin.',
      })
      return
    }

    const account = { phone, password }
    try {
      const response = await axios.post(`${env.API_URL}/authen/login`, account)
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          text: 'Chào mừng bạn quay trở lại!',
        })

        const usernameFromResponse = response.data.data.username
        const avtFromResponse = response.data.data.avatar

        if (!usernameFromResponse) {
          throw new Error('Username không tồn tại trong phản hồi từ server')
        }

        const userData = {
          phone: phone,
          avatar: avtFromResponse,
          username: usernameFromResponse,
        }
        sessionStorage.setItem('user', JSON.stringify(userData))

        // Cập nhật trạng thái trong App
        setUsername(usernameFromResponse)
        setAvatar(avtFromResponse)

        navigate('/') // Điều hướng về trang chính
      }
    } catch (error) {
      if (error.response) {
        console.log('Error response status:', error.response.status)
        if (error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Sai mật khẩu',
            text: 'Vui lòng kiểm tra lại mật khẩu của bạn.',
          })
        } else if (error.response.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Tài khoản không tồn tại',
            text: 'Vui lòng kiểm tra lại số điện thoại của bạn.',
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi 1',
            text: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
          })
        }
      } else {
        console.log('No response from server:', error)
        Swal.fire({
          icon: 'error',
          title: 'Lỗi 2',
          text: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
        })
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
                      />
                      <div className="invalid-feedback">Vui lòng nhập mật khẩu</div>
                    </div>
                  </div>
                  <ValidCaptcha setValidCaptcha={setValidCaptcha} />
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
