import { useEffect } from 'react'
import './Support.css'
import { Link } from 'react-router-dom'
const Support = ({ setIsAdmin }) => {
  useEffect(() => {
    setIsAdmin(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <body className="BodySupport">
      <div className="text-center" style={{ marginTop: '10px' }}>
        <h1
          style={{
            marginBottom: '0',
            fontSize: '33px',
            color: '#444',
            fontWeight: '600',
            fontFamily: 'harmonia, Helvetica, Arial, sans-serif',
            lineHeight: '125%'
          }}>
          Dịch vụ hỗ trợ tìm phòng trọ tại RRMS
        </h1>
        <p style={{ marginTop: '0', marginBottom: '30' }}>
          Miễn phí - An toàn - An tâm - Phù hợp - Nhanh chóng có phòng
        </p>
      </div>
      <aside className="support-room">
        <div className="container">
          <div className="inner-container">
            <div className="d-flex" style={{ alignItems: 'center', width: '100%' }}>
              <div className="icon-left">
                <img src="/ideal-request-post.svg" style={{ width: '30px' }} />
              </div>
              <div className="content">
                <strong>BẠN CHƯA TÌM ĐƯỢC PHÒNG?</strong>
                <div className="description">
                  Để lại thông tin <strong>chuyên viên RRMS</strong> sẽ hỗ trợ bạn tìm phòng nhanh chóng!
                </div>
              </div>
            </div>
            <form
              className="needs-validation"
              action=""
              id="request-post-form"
              noValidate
              style={{ position: 'relative' }}>
              <input data-format="int" type="hidden" className="form-control" name="province_id" value="79"></input>
              <input data-format="int" type="hidden" className="form-control" name="district_id" value="771"></input>
              <input data-format="int" type="hidden" className="form-control" name="category_id" value="1"></input>
              <div className="row" style={{ marginTop: '10px' }}>
                {/* title form */}
                <div className="col-md-12" style={{ marginBottom: '10px' }}>
                  <div className="tag clearfix">
                    <span
                      style={{ fontWeight: '500', border: '0px!important', textDecoration: 'underline' }}
                      className="arena">
                      Tìm kiếm Phòng trọ, nhà trọ tại Khu vực <b className="address-text"> Quận 3, Hồ Chí Minh </b>
                    </span>
                  </div>
                </div>
                {/* content form */}
                <div className="col-md-3">
                  <div>
                    <label htmlFor="name">Tên:</label>
                    <input
                      data-format="text"
                      type="text"
                      className="form-control"
                      name="name"
                      id="post-name"
                      required
                      placeholder="Tên"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div>
                    <label htmlFor="phone">SĐT liên hệ</label>
                    <input
                      data-format="stringNumber"
                      type="text"
                      className="form-control"
                      name="phone"
                      id="post-phone"
                      required=""
                      placeholder="Số điện thoại liên hệ"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div>
                    <label htmlFor="available_date">Ngày vào ở</label>
                    <input
                      type="date"
                      data-format="date"
                      className="form-control flatpickr-input"
                      name="available_date"
                      id="post-date"
                      required=""
                      placeholder="Ngày vào ở"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div>
                    <label htmlFor="date">Khoản giá</label>

                    <select data-format="int" name="price_range" className="form-select">
                      <option value="-1">Khung giá</option>
                      <option data-slug="1" value="1">
                        Dưới 1 triệu
                      </option>
                      <option data-slug="2" value="2">
                        1 - 2 triệu
                      </option>
                      <option data-slug="3" value="3">
                        2 - 3 triệu
                      </option>
                      <option data-slug="4" value="4">
                        3 - 4 triệu
                      </option>
                      <option data-slug="5" value="5">
                        4 - 5 triệu
                      </option>
                      <option data-slug="6" value="6">
                        Trên 5 triệu
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  className="col-md-12"
                  style={{
                    width: '100%',
                    marginTop: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#5f5f5f'
                  }}>
                  <div
                    style={{ flex: '1', display: 'flex', alignItems: 'center', fontSize: '11px', marginRight: '5px' }}>
                    <div style={{ marginRight: '5px' }}>
                      <div
                        style={{
                          width: '35px',
                          height: '35px',
                          borderRadius: '30px',
                          backgroundColor: '#fff4e3',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                        <svg
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="css-i6dzq1">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                          <line x1="12" y1="9" x2="12" y2="13"></line>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', marginTop: '20px' }}>
                        <b>
                          Với việc cung cấp thông tin là bạn đã chấp nhận chính sách giới thiệu thông tin của bạn tới
                          chủ nhà và chuyên viên hỗ trợ của RRMS <b>(</b>
                          <Link rel="nofollow, noindex" to="#">
                            {' '}
                            Chính sách bảo mật
                          </Link>
                          )
                        </b>
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div id="btn-support-room" className="btn-support-room pull-right" style={{ cursor: 'pointer' }}>
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="css-i6dzq1">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                      <span style={{ marginLeft: '5px', fontSize: '13px' }}>Yêu cầu hỗ trợ</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </aside>
    </body>
  )
}

export default Support
