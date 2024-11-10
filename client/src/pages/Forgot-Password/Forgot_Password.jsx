import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { acceptChangePassword, email_valid, sendOTP } from '~/apis/accountAPI'
import OTPInput from './PageOTP'
import './ForgotCss.css'
import { Button } from '@mui/material'
import LoadingPage from '~/components/LoadingPage/LoadingPage'
import Swal from 'sweetalert2'
const Forgot_Password = ({ setIsAdmin }) => {
  useEffect(() => {
    setIsAdmin(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passold, setPassold] = useState('')
  const [passoldErr, setPassoldErr] = useState('')
  const [passnew, setPassnew] = useState('')
  const [passnewErr, setPassnewErr] = useState('')
  const [passIdenticalErr, setPassIdenticalErr] = useState('')
  const [pageOTP, setPageOTP] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const valid = () => {
    let valid = true
    if (email == '' || email == undefined) {
      setEmailErr('Vui lòng điền gmail')
      valid = false
    } else {
      setEmailErr('')
      valid = true
    }
    if (passold == '' || passold == undefined) {
      setPassoldErr('Vui lòng điền mật khẩu')
      valid = false
    } else {
      setPassoldErr('')
      valid = true
    }
    if (passnew == '' || passnew == undefined) {
      setPassnewErr('Vui lòng điền mật khẩu')
      valid = false
    } else {
      setPassnewErr('')
      valid = true
    }
    if (passold != '' && passnew != '' && passold != passnew) {
      setPassIdenticalErr('Mật khẩu không khớp nhau')
      valid = false
    } else {
      setPassIdenticalErr('')
      valid = true
    }
    return valid
  }

  const requestChangePassword = async () => {
    let validate = await valid()
    if (validate) {
      const response = await email_valid(email)
      if (response.result == true) {
        setPageOTP(true)
        await handleSendOtp()
        setEmailErr('')
      } else {
        setEmailErr('Email không hợp lệ')
        return
      }
    }
  }
  const [otp, setOtp] = useState('')

  const handleOtpChange = (value) => {
    setOtp(value)
  }
  const handleSendOtp = async () => {
    setLoading(true)
    const data = { email, newPassword: passold, code: otp }
    const response = await sendOTP(data)
    if (response.result == true) {
      setTimeout(() => {
        setLoading(false)
        Swal.fire({
          icon: 'success',
          title: 'Gửi mã thành công',
          text: 'Kiểm tra Email của bạn!'
        })
      }, 1000)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gửi mã thất bại',
        text: 'Vui lòng thử lại sau!'
      })
    }
  }
  const handleAcceptChangePass = async () => {
    setLoading(true)
    const data = { email, newPassword: passold, code: otp }
    const response = await acceptChangePassword(data)
    if (response.result == true) {
      setTimeout(() => {
        setLoading(false)
        Swal.fire({
          icon: 'success',
          title: 'Thay đổi thành công',
          text: 'Thay đổi mật khẩu thành công!'
        })
        navigate('/login')
      }, 1000)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Thay đổi thất bại',
        text: 'Vui lòng thử lại sau!'
      })
      setLoading(false)
      setPageOTP(false)
      navigate('/forgot-password')
    }
  }

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <body
          style={{
            backgroundColor: '#f7fafc',
            background: ' url(./login-background.webp) no-repeat',
            backgroundSize: 'contain',
            backgroundPositionY: '60%',
            justifyContent: 'center'
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
                        boxShadow: ' 0 1rem 2rem 0 rgb(0 0 0 / 3%), 0 0.5rem 1rem 0 rgb(0 0 0 / 5%)'
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
                {!pageOTP ? (
                  <div className="row justify-content-center align-items-center login-form-container">
                    <div className="col-12 p-4">
                      <div className="body">
                        <div className="mt-5">
                          <form method="POST" className="needs-validation otp-form" id="otp-form" noValidate="">
                            <input type="hidden" name="_token" value="5BJeOPDNyeTzDZjmxeICdcC1ZbEiQS4PdhfCFOol" />{' '}
                            <div className="row g-2">
                              <div className="col-12">
                                <div className="form-group mb-2">
                                  <label htmlFor="gmail" className="form-label">
                                    Nhập gmail gắn với tài khoản <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="gmail"
                                    placeholder="Nhập số điện thoại"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <p style={{ fontSize: '14px' }} className="text-danger ms-1">
                                    {emailErr !== '' ? emailErr : ''}
                                  </p>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-group mb-2">
                                  <label htmlFor="name" className="form-label">
                                    Nhập mật khẩu mới <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Nhập nhập khẩu"
                                    value={passold}
                                    onChange={(e) => setPassold(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <p style={{ fontSize: '14px' }} className="text-danger ms-1">
                                    {passoldErr !== '' ? passoldErr : ''}
                                  </p>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-group mb-2">
                                  <label htmlFor="confirm_password" className="form-label">
                                    Nhập lại mật khẩu mới <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    name="password_confirmation"
                                    placeholder="Nhập lại mật khẩu"
                                    value={passnew}
                                    onChange={(e) => setPassnew(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <p style={{ fontSize: '14px' }} className="text-danger ms-1">
                                    {passnewErr !== '' ? passnewErr : ''}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p style={{ fontSize: '14px' }} className="text-danger text-center ms-1">
                                  {passIdenticalErr !== '' ? passIdenticalErr : ''}
                                </p>
                              </div>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                              <p>
                                Chúng tôi sẽ gữi một mã xác nhận về Gmail qua Gmail bạn nhập. Để xác minh tính hợp lệ
                                trước khi yêu cầu đổi mật khẩu
                              </p>
                            </div>
                            <div className="d-block mt-4">
                              <button
                                onClick={requestChangePassword}
                                id="submit-login"
                                className="btnSubmit btn btn-primary"
                                type="button">
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
                ) : (
                  <>
                    <div className="container">
                      <div className="row text-center">
                        <h2>Enter OTP</h2>
                      </div>
                      <div className="my-3 row justify-content-center">
                        <div style={{ width: '300px' }}>
                          <OTPInput length={5} onChange={handleOtpChange} />
                        </div>
                      </div>
                      <div>
                        <p>
                          Chúng tôi đã gửi 1 mã xác nhận về Email: <b>{email}</b> của bạn. Vui lòng nhập mã OTP từ Email
                          để tiếp tục.
                        </p>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-6 col-sm-6 col-xs-12 text-center">
                          <div>
                            <Button
                              onClick={handleSendOtp}
                              sx={{ padding: '15px', marginRight: '10px' }}
                              variant="outlined">
                              Gửi lại mã
                            </Button>
                            <Button onClick={handleAcceptChangePass} sx={{ padding: '15px' }} variant="contained">
                              Xác nhận mã
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="text-center mt-5">
                  <p>
                    Copyright @ <strong>RRMS - Quản lý nhà cho thuê</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </body>
      )}
    </>
  )
}

export default Forgot_Password
