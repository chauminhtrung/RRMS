import { useEffect } from 'react'
import { Typography } from '@mui/material'
import './Contact.css'
import { Link } from 'react-router-dom'
const Contact = ({ setIsAdmin }) => {
  useEffect(() => {
    setIsAdmin(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="container">
      <div className="text-center">
        <Typography sx={{ fontSize: '38px' }}>LIÊN HỆ</Typography>
        <Typography sx={{ fontSize: '20px' }}>Các kênh liên hệ với chúng tôi</Typography>
        <hr />
      </div>
      <div className="container">
        <div id="content">
          <div className="row">
            <div className="col-sm-12 col-md-3 col-lg-3 mt-2">
              <div className="iContact inner-item text-center">
                <Link rel="nofollow, noindex" to="https://www.facebook.com/profile.php?id=61562538557177">
                  <div className="iconContact">
                    <img
                      src="https://lozido.com/images/banner/fanpage.webp"
                      style={{ width: '90px' }}
                      alt="icon fanpage facebook"
                    />
                    <b style={{ color: 'black' }}>Fanpage phòng trọ</b>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-sm-12 col-md-3 col-lg-3 mt-2">
              <div className="iContact inner-item text-center">
                <Link rel="nofollow, noindex" to="https://www.facebook.com/profile.php?id=61562538557177">
                  <div className="iconContact">
                    <img
                      src="https://lozido.com/images/banner/messager.webp"
                      style={{ width: '90px' }}
                      alt="ion messager"
                    />
                    <b style={{ color: 'black' }}>Messenger</b>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-sm-12 col-md-3 col-lg-3 mt-2">
              <div className="iContact inner-item text-center">
                <Link rel="nofollow, noindex" to="tel:0373395604">
                  <div className="iconContact">
                    <img src="https://lozido.com/images/banner/phone.webp" style={{ width: '90px' }} alt="icon phone" />
                    <b style={{ color: 'black' }}>0373395604</b>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-sm-12 col-md-3 col-lg-3 mt-2">
              <div className="iContact inner-item text-center">
                <Link
                  rel="nofollow, noindex"
                  to="mailto:nguyentantai0118@gmail.com?Subject=Liên%20hệ%20RRSM.com"
                  target="_top">
                  <div className="iconContact">
                    <img src="https://lozido.com/images/banner/email.webp" style={{ width: '90px' }} alt="icon email" />
                    <b style={{ color: 'black' }}>lozido.com@gmail.com</b>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex row" style={{ marginBlock: '35px' }}>
          <div className="col-md-6 mt-2">
            <Link to="#">
              <img
                src="./banner1.png"
                className="w-full lg:rounded-md"
                alt="banner moi gioi lozido"
                width="100%"
                style={{ borderRadius: '5px' }}
              />
            </Link>
          </div>
          <div className="col-md-6 mt-2">
            <Link to="#">
              <img
                src="./banner2.png"
                className="lg:rounded-md cursor-pointer"
                alt="banner-pc"
                width="100%"
                style={{ borderRadius: '5px' }}
              />
            </Link>
          </div>
        </div>

        <div className="text-center footer-title">
          <Typography sx={{ fontSize: '28px' }}>Các bước đăng bài</Typography>
          <p className="text-center footer-description">Tiếp cận khách thuê dễ dàng với tính năng đăng tin</p>
        </div>
        <div className="container mb-4">
          <div className="row feature card-benefit">
            <div className="col-md-4 item green mt-2">
              <div className="innerRRMS">
                <div className="icon-itemRRMS">
                  <span>1</span>
                </div>
                <div className="content-item">
                  <b>Đăng nhập/Đăng ký</b>
                  <div>đăng ký sau đó đăng nhập</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 item blue mt-2">
              <div className="innerRRMS">
                <div className="icon-itemRRMS">
                  <span>2</span>
                </div>
                <div className="content-item">
                  <b>Đăng tin</b>
                  <div>Đăng tin trong tài khoản cá nhân</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 item yellow mt-2">
              <div className="innerRRMS">
                <div className="icon-itemRRMS">
                  <span>3</span>
                </div>
                <div className="content-item">
                  <b>Xét duyệt &amp; tiếp cận khách thuê</b>
                  <div>Chuyên viên sẵn sàng xét duyệt 24/7</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '50px' }}>
          <div className="text-center footer-title">
            <Typography sx={{ fontSize: '28px' }}>RRMS có gì?</Typography>
          </div>
          <p className="text-center footer-description">
            Tại sao bạn phải chọn chúng tôi
            <br /> mà không phải một dịch vụ nào khác?
          </p>
          <div className="row footer-report">
            <div className="report col-md-3 text-center mt-2">
              <div className="report-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70px"
                  height="70px"
                  fill="currentColor"
                  className="bi bi-people"
                  viewBox="0 0 16 16"
                  style={{ color: 'green' }}>
                  <path
                    d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 
                                    12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 
                                    0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11
                                    7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 
                                    1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 
                                    5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 
                                    0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                  />
                </svg>
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>4.000+</Typography>
                <Typography sx={{ fontSize: '14px' }}>Chủ nhà</Typography>
              </div>
            </div>
            <div className="report col-md-3 text-center mt-2">
              <div className="report-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70px"
                  height="70px"
                  fill="currentColor"
                  className="bi bi-people"
                  viewBox="0 0 16 16"
                  style={{ color: 'green' }}>
                  <path
                    d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 
                                    12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 
                                    0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11
                                    7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 
                                    1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 
                                    5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 
                                    0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                  />
                </svg>
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>10.000+</Typography>
                <Typography sx={{ fontSize: '14px' }}>Khách thuê</Typography>
              </div>
            </div>
            <div className="report col-md-3 text-center mt-2">
              <div className="report-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70px"
                  height="70px"
                  fill="currentColor"
                  className="bi bi-people"
                  viewBox="0 0 16 16"
                  style={{ color: 'green' }}>
                  <path
                    d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 
                                    .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 
                                    0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"
                  />
                </svg>
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>10+</Typography>
                <Typography sx={{ fontSize: '14px' }}>Môi giới</Typography>
              </div>
            </div>
            <div className="report col-md-3 text-center mt-2">
              <div className="report-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70px"
                  height="70px"
                  fill="currentColor"
                  className="bi bi-people"
                  viewBox="0 0 16 16"
                  style={{ color: 'green' }}>
                  <path
                    fillRule="evenodd"
                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5
                                    0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 
                                    0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 
                                    3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 
                                    0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 
                                    1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"
                  />
                </svg>
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>3.000+</Typography>
                <Typography sx={{ fontSize: '14px' }}>Lượt truy cập/tháng</Typography>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center footer-content mt-4">
          Chúng tôi tự hào là một trong những dịch vụ tìm kiếm phòng trọ đứng đầu Việt Nam, với phương châm tìm là có
          chúng tôi luôn cập nhật phòng nhanh nhất, chính xác nhất và ưu tiên sự tiện lợi cho người tìm trọ lên hàng
          đầu.
        </p>
      </div>
    </div>
  )
}
export default Contact
