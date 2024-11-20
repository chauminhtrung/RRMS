import { Typography } from '@mui/material'
import '../Contact/Contact.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Introduce = ({ setIsAdmin }) => {
  useEffect(() => {
    setIsAdmin(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="container">
      <div className="text-center">
        <Typography sx={{ fontSize: '28px' }}>Giới thiệu RRMS - Tìm trọ, căn hộ, quản lý trọ.</Typography>
        <Typography sx={{ fontSize: '20px' }}>Kên thông tin tìm nhà trọ, phòng trọ miễn phí</Typography>
        <hr />
      </div>
      <div className="container">
        <div id="content" style={{ marginTop: '30px' }}>
          <section>
            <h2 className="underline-yellow">Câu chuyện chúng tôi</h2>
            <div className="row mt-3">
              <div className="col-md-8">
                <p style={{ marginTop: '0px' }}>
                  Tìm nhà trọ có lẽ không còn là câu chuyện xa lạ đối với những người học tập và làm việc xa nhà. Đã
                  từng trải qua những khó khăn trong quá trình đi <b>tìm phòng trọ</b>, chúng tôi thấu hiểu phần nào nỗi
                  phiền muộn ấy, như phải chạy xe giữa cái nắng của thành phố để tìm được căn trọ như ý hay thậm chí là
                  ở trong những căn trọ ẩm thấp, kém chất lượng… Hiểu được nỗi lo ấy,
                  <b> RRMS - Tìm trọ, căn hộ, việc làm</b> đã ứng dụng công nghệ vào thực tiễn, giúp mọi người dễ dàng
                  hơn trong việc đi <b>tìm phòng trọ</b>, đồng thời giúp người cho thuê phòng trọ tìm kiếm được “khách
                  hàng” của mình.
                </p>
                <p>
                  <b>RRMS - Tìm trọ, căn hộ, việc làm</b> cung cấp ứng dụng đáp ứng nhu cầu tìm nhà trọ dễ dàng, nhanh
                  chóng với nhiều danh mục đa dạng, gần gũi như: <b>tìm phòng trọ</b> giá rẻ, phòng trọ gần khu công
                  nghiệp, trường học, công ty...
                </p>
              </div>
              <figure className="col-md-4 text-center image-right" style={{ margin: '0px' }}>
                <img
                  style={{ borderRadius: '10px' }}
                  src="https://bandon.vn/resize/1000x700/a-c/zc-1/f/uploads/posts/cach-tim-phong-tro-sinh-vien-1.jpg"
                  width="90%"
                  alt="Sinh viên tìm phòng trọ"
                />
                <div>
                  Tìm trọ với ứng dụng <b>RRMS - Tìm trọ, căn hộ, việc làm</b>
                </div>
              </figure>
            </div>
          </section>
          <section className="text-center" style={{ marginTop: '50px' }}>
            <h2 className="underline-yellow">Sứ mệnh - Tầm nhìn của chúng tôi</h2>
            <div className="wrap-gallery-container" style={{ margin: '0px 70px' }}>
              <div className="wrap-gallery-infor row">
                <div className="row mt-4">
                  <div
                    className="col-md-6 col-md-push-6 col-sm-12 col-sm-push-6 col-xs-12"
                    style={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '20px' }}>Sứ mệnh</Typography>
                    <p className="mt-3">
                      Cung cấp giải pháp thông minh tạo tiền đề cải thiện chất lượng cuộc sống trọ cho sinh viên xa nhà
                      hay những người tha phương lập nghiệp
                    </p>
                    <p>
                      Tạo một môi trường thuê và cho thuê nhà trọ minh bạch, rõ ràng, đem lại niềm tin và cái nhìn lạc
                      quan hơn trong cuộc sống trọ.
                    </p>

                    <Typography sx={{ fontSize: '20px' }}>Tầm nhìn</Typography>
                    <p className="mt-3">
                      Ngay từ khi thành lập, <b>RRMS</b> đã xác định mình trở thành công ty công nghệ hàng đầu Việt Nam
                      trong cổng thông tin <b>tìm phòng trọ</b>, thiết kế và cải thiện không gian sống và các giải pháp
                      thông minh cho bất động sản cho thuê &amp; phát triển bền vững
                    </p>
                  </div>
                  <div className="col-md-6 col-md-pull-6 col-sm-12 col-sm-pull-6 col-xs-12 colmn-left">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 214.12">
                      <g>
                        <g>
                          <path
                            className="mcbetter-1"
                            d="M37.48,34.8h10.9L60.29,66.32h.5L72.7,34.8h11V79.67h-8.4V57.55l.5-7.46h-.5L63.86,79.67H57.28L45.81,50.09h-.5l.5,7.46V79.67H37.48Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M95.48,78.51a15.12,15.12,0,0,1-5.58-6.05,19.87,19.87,0,0,1,0-17.54,15.19,15.19,0,0,1,5.58-6.05,14.81,14.81,0,0,1,7.87-2.16,11.54,11.54,0,0,1,5.76,1.41,10.51,10.51,0,0,1,3.82,3.47h.51V47.71h7.64v32h-7.64V75.85h-.51a9.68,9.68,0,0,1-3.79,3.45,12,12,0,0,1-5.79,1.37A14.81,14.81,0,0,1,95.48,78.51Zm13.57-6.61a8.73,8.73,0,0,0,3.2-3.32,10.64,10.64,0,0,0,0-9.78,8.54,8.54,0,0,0-7.53-4.45,8.51,8.51,0,0,0-7.45,4.45,10.64,10.64,0,0,0,0,9.78,8.71,8.71,0,0,0,3.19,3.32,8.26,8.26,0,0,0,4.26,1.19A8.38,8.38,0,0,0,109.05,71.9Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M125.84,34.8h8.22V59.24h.43L146,47.71h10.09v.5L144,60.06l12.66,19.11v.5H146.9l-8.71-14-4.13,4.07v9.9h-8.22Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M163.2,78.48a15.69,15.69,0,0,1-6-6,18.25,18.25,0,0,1,0-17.17A16.51,16.51,0,0,1,163.07,49a15.74,15.74,0,0,1,8.4-2.31A16.33,16.33,0,0,1,180,48.84a13.88,13.88,0,0,1,5.43,5.83,18.11,18.11,0,0,1,1.84,8.21,20.17,20.17,0,0,1-.18,2.75h-24a9.07,9.07,0,0,0,3,5.8,8.84,8.84,0,0,0,5.8,2,9.23,9.23,0,0,0,4.86-1.22A9,9,0,0,0,180,68.89l6.65,3.26q-4.89,8.52-14.86,8.52A17,17,0,0,1,163.2,78.48ZM179.37,59.8a6.37,6.37,0,0,0-1.1-3,7.79,7.79,0,0,0-2.69-2.45,8.2,8.2,0,0,0-4.05-1,7.69,7.69,0,0,0-5,1.73,9.57,9.57,0,0,0-3,4.66Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M46.81,139.47A22.82,22.82,0,0,1,38.32,131a24.29,24.29,0,0,1,0-23.75,22.68,22.68,0,0,1,8.49-8.46,23.47,23.47,0,0,1,11.91-3.11A21.69,21.69,0,0,1,75.52,103l-6,5.76a13.59,13.59,0,0,0-10.77-5.08,15.46,15.46,0,0,0-7.65,1.92,13.72,13.72,0,0,0-5.42,5.42,17.5,17.5,0,0,0,0,16.17,13.78,13.78,0,0,0,5.42,5.42,15.56,15.56,0,0,0,7.65,1.91,14.65,14.65,0,0,0,11.84-5.89l6,5.7a22.23,22.23,0,0,1-7.87,6.11,24.75,24.75,0,0,1-22-1Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M85.42,140.35a15.92,15.92,0,0,1-6-6.08,18.46,18.46,0,0,1,0-17.33,15.79,15.79,0,0,1,6-6.11,18.5,18.5,0,0,1,17.61,0,15.72,15.72,0,0,1,6,6.11,18.46,18.46,0,0,1,0,17.33,15.85,15.85,0,0,1-6,6.08,18.57,18.57,0,0,1-17.61,0Zm13.23-6.49a8.27,8.27,0,0,0,3.19-3.26,10,10,0,0,0,1.19-5,9.91,9.91,0,0,0-1.19-5,8.27,8.27,0,0,0-3.19-3.26,9.09,9.09,0,0,0-8.78,0,8.5,8.5,0,0,0-3.23,3.26,9.82,9.82,0,0,0-1.22,5,10,10,0,0,0,1.22,5,8.45,8.45,0,0,0,3.23,3.29,9.09,9.09,0,0,0,8.78,0Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M113.75,109.61h7.71v4h.5a10.68,10.68,0,0,1,4-3.67,11.94,11.94,0,0,1,5.68-1.35,10.8,10.8,0,0,1,5.89,1.6,9.08,9.08,0,0,1,3.57,4,12,12,0,0,1,4.29-4.07,12.74,12.74,0,0,1,6.43-1.57q5.44,0,8.3,3.36T163,121v20.56h-8.15v-19a6.88,6.88,0,0,0-1.41-4.64,4.88,4.88,0,0,0-3.91-1.63,6.08,6.08,0,0,0-5.11,2.54,10.75,10.75,0,0,0-1.91,6.67v16.11h-8.21v-19a6.65,6.65,0,0,0-1.48-4.64,5.31,5.31,0,0,0-4.16-1.63,5.74,5.74,0,0,0-4.86,2.54,11.07,11.07,0,0,0-1.85,6.67v16.11h-8.21Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M167.71,109.61h7.71v4h.5a10.68,10.68,0,0,1,4-3.67,11.94,11.94,0,0,1,5.68-1.35,10.78,10.78,0,0,1,5.89,1.6,9.08,9.08,0,0,1,3.57,4,12.08,12.08,0,0,1,4.29-4.07,12.74,12.74,0,0,1,6.43-1.57q5.44,0,8.3,3.36T217,121v20.56h-8.14v-19a6.88,6.88,0,0,0-1.41-4.64,4.9,4.9,0,0,0-3.92-1.63,6.08,6.08,0,0,0-5.11,2.54,10.82,10.82,0,0,0-1.91,6.67v16.11h-8.21v-19a6.69,6.69,0,0,0-1.47-4.64,5.34,5.34,0,0,0-4.17-1.63,5.74,5.74,0,0,0-4.86,2.54,11.07,11.07,0,0,0-1.85,6.67v16.11h-8.21Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M228.07,140.38a15.69,15.69,0,0,1-6-6,18.25,18.25,0,0,1,0-17.17,16.43,16.43,0,0,1,5.89-6.24,15.75,15.75,0,0,1,8.4-2.32,16.33,16.33,0,0,1,8.52,2.13,14,14,0,0,1,5.42,5.83,18,18,0,0,1,1.85,8.21,18.89,18.89,0,0,1-.19,2.76h-24a9.07,9.07,0,0,0,3,5.8,8.9,8.9,0,0,0,5.8,2,9.23,9.23,0,0,0,4.86-1.22,9,9,0,0,0,3.22-3.29l6.65,3.26q-4.89,8.52-14.86,8.52A16.93,16.93,0,0,1,228.07,140.38Zm16.17-18.68a6.37,6.37,0,0,0-1.1-3,7.64,7.64,0,0,0-2.7-2.45,8.05,8.05,0,0,0-4-1,7.68,7.68,0,0,0-5,1.72,9.64,9.64,0,0,0-3,4.67Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M255.33,109.61H263v4.26h.5a9.4,9.4,0,0,1,3.7-3.73,10.7,10.7,0,0,1,5.51-1.47,11.21,11.21,0,0,1,4,.69v8.21a26.24,26.24,0,0,0-2.85-.91,10.32,10.32,0,0,0-2.47-.29,7,7,0,0,0-5.77,2.64,10.21,10.21,0,0,0-2.13,6.64v15.92h-8.21Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M283.47,140.41a15.42,15.42,0,0,1-6-6,17.73,17.73,0,0,1-2.16-8.77,17.53,17.53,0,0,1,2.16-8.74,15.69,15.69,0,0,1,6-6,17,17,0,0,1,8.65-2.2,17.55,17.55,0,0,1,9.15,2.29,13,13,0,0,1,5.51,6.49l-7.52,3.13q-2-4.26-7.14-4.26a8.12,8.12,0,0,0-6.18,2.57,10.8,10.8,0,0,0,0,13.6,8.12,8.12,0,0,0,6.18,2.57,7.86,7.86,0,0,0,7.52-4.51l7.46,3.26a15.34,15.34,0,0,1-5.9,6.51,18.67,18.67,0,0,1-17.73.16Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M315.93,140.38a15.66,15.66,0,0,1-6-6,18.25,18.25,0,0,1,0-17.17,16.43,16.43,0,0,1,5.89-6.24,15.73,15.73,0,0,1,8.4-2.32,16.33,16.33,0,0,1,8.52,2.13,14,14,0,0,1,5.42,5.83,18.17,18.17,0,0,1,1.85,8.21,18.89,18.89,0,0,1-.19,2.76h-24a9.07,9.07,0,0,0,3,5.8,8.9,8.9,0,0,0,5.8,2,9.2,9.2,0,0,0,4.85-1.22,8.94,8.94,0,0,0,3.23-3.29l6.64,3.26q-4.89,8.52-14.85,8.52A17,17,0,0,1,315.93,140.38ZM332.1,121.7a6.35,6.35,0,0,0-1.09-3,7.64,7.64,0,0,0-2.7-2.45,8.08,8.08,0,0,0-4-1,7.69,7.69,0,0,0-5,1.72,9.71,9.71,0,0,0-3,4.67Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M37.48,158.59H55A15.47,15.47,0,0,1,62,160.16a12.69,12.69,0,0,1,5,4.26,10.34,10.34,0,0,1,1.82,5.89,10.24,10.24,0,0,1-1.66,5.86A10.88,10.88,0,0,1,62.73,180v.51a11.73,11.73,0,0,1,5.58,4A10.5,10.5,0,0,1,70.38,191a11.3,11.3,0,0,1-2,6.55,12.85,12.85,0,0,1-5.33,4.38,17.55,17.55,0,0,1-7.43,1.54H37.48Zm16.92,18.3a6.27,6.27,0,0,0,4.42-1.53,5.3,5.3,0,0,0,.06-7.65,5.88,5.88,0,0,0-4.23-1.53H45.94v10.71Zm.94,18.87a6.76,6.76,0,0,0,4.79-1.6A5.41,5.41,0,0,0,61.86,190a5.49,5.49,0,0,0-1.76-4.2,7.12,7.12,0,0,0-5-1.63H45.94v11.6Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M80.16,202.28a15.75,15.75,0,0,1-6-6.05,18.25,18.25,0,0,1,0-17.17A16.43,16.43,0,0,1,80,172.82a15.66,15.66,0,0,1,8.4-2.32A16.33,16.33,0,0,1,97,172.63a13.91,13.91,0,0,1,5.42,5.83,18,18,0,0,1,1.85,8.21,18.89,18.89,0,0,1-.19,2.76H80a9.07,9.07,0,0,0,3,5.8,8.9,8.9,0,0,0,5.8,2A9.33,9.33,0,0,0,93.73,196,9.07,9.07,0,0,0,97,192.69L103.6,196q-4.89,8.52-14.86,8.52A16.93,16.93,0,0,1,80.16,202.28ZM96.33,183.6a6.45,6.45,0,0,0-1.1-3,7.71,7.71,0,0,0-2.7-2.44,8.05,8.05,0,0,0-4-1,7.68,7.68,0,0,0-5,1.72,9.64,9.64,0,0,0-3,4.67Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M116,203.25a8.59,8.59,0,0,1-3.25-2q-3-2.82-3-8V178.52h-5.58v-7h5.58v-9H118v9h12.1v-9h8.21v9h7.83v7h-7.83v13.23a5,5,0,0,0,1.06,3.51,4.17,4.17,0,0,0,3.07,1,5.13,5.13,0,0,0,1.91-.31,14.82,14.82,0,0,0,2-1.07v8a15.4,15.4,0,0,1-5.7,1.07,12.66,12.66,0,0,1-4.36-.72,9.36,9.36,0,0,1-3.29-2,10.83,10.83,0,0,1-2.94-8V178.52H118v13.23a4.79,4.79,0,0,0,1.07,3.51,3.63,3.63,0,0,0,2.88,1,4.35,4.35,0,0,0,1.53-.22,16.29,16.29,0,0,0,1.66-.78v7.89a12.73,12.73,0,0,1-4.76.82A12.92,12.92,0,0,1,116,203.25Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M155.11,202.28a15.73,15.73,0,0,1-6-6.05,18.25,18.25,0,0,1,0-17.17,16.43,16.43,0,0,1,5.89-6.24,15.61,15.61,0,0,1,8.4-2.32,16.33,16.33,0,0,1,8.52,2.13,13.91,13.91,0,0,1,5.42,5.83,18.14,18.14,0,0,1,1.85,8.21,18.89,18.89,0,0,1-.19,2.76H155a9,9,0,0,0,3,5.8,8.89,8.89,0,0,0,5.79,2,9.33,9.33,0,0,0,4.86-1.22,9,9,0,0,0,3.23-3.29l6.64,3.26q-4.89,8.52-14.85,8.52A17,17,0,0,1,155.11,202.28Zm16.17-18.68a6.43,6.43,0,0,0-1.09-3,7.71,7.71,0,0,0-2.7-2.44,8.08,8.08,0,0,0-4-1,7.69,7.69,0,0,0-5,1.72,9.71,9.71,0,0,0-3,4.67Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M182.38,171.5h7.7v4.27h.51a9.37,9.37,0,0,1,3.69-3.73,10.72,10.72,0,0,1,5.52-1.48,11.21,11.21,0,0,1,4,.69v8.21a29.52,29.52,0,0,0-2.85-.91,11,11,0,0,0-2.48-.28,7,7,0,0,0-5.76,2.64,10.19,10.19,0,0,0-2.13,6.64v15.92h-8.21Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M0,16.86A8.43,8.43,0,1,0,8.6,8.44a11.75,11.75,0,0,1,8.26-3.38V0A16.86,16.86,0,0,0,0,16.86ZM34.94,0A16.86,16.86,0,0,0,18.08,16.86a8.43,8.43,0,1,0,8.6-8.42,11.75,11.75,0,0,1,8.26-3.38Z"></path>
                          <path
                            className="mcbetter-1"
                            d="M17.47,214.12a1.31,1.31,0,0,1-1.31-1.31V29.46a1.31,1.31,0,1,1,2.62,0V212.81A1.31,1.31,0,0,1,17.47,214.12Z"></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="text-center" style={{ marginTop: '50px' }}>
            <h2 className="underline-yellow">Giá trị cốt lõi</h2>
            <p></p>
            <div className="row mt-4">
              <figure className="col-lg-6 col-md-12 col-sm-12 col-xs-12 text-center" style={{ margin: '0px' }}>
                <img
                  style={{ margin: 'auto' }}
                  className="lazy img-responsive"
                  src="https://lozido.com/images/pages/about/gia-tri-cot-loi.webp"
                  alt="giá trị cốt lõi của LOZIDO - Tìm trọ, căn hộ, việc làm"
                  loading="lazy"
                />
              </figure>
              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 " style={{ textAlign: 'left' }}>
                <p>
                  <img src="https://lozido.com/images/icons/check.svg" alt="checking" /> Đột phá - Sáng tạo
                </p>
                <p>
                  <img src="https://lozido.com/images/icons/check.svg" /> Mang lại giá trị thật cho cộng đồng
                </p>
                <p>
                  <img src="https://lozido.com/images/icons/check.svg" /> Hoàn thành trọn vẹn &amp; mang lại giá trị
                </p>
                <p>
                  <img src="https://lozido.com/images/icons/check.svg" /> Luôn hướng đến sự minh bạch - rõ ràng - trung
                  thực
                </p>
                <p>
                  <img src="https://lozido.com/images/icons/check.svg" /> Với tinh thần thép luôn luôn học hỏi và lắng
                  nghe, sản phẩm được cải tiến - nâng cấp không ngừng để đáp ứng hầu hết các nhu cầu của thị trường.
                </p>
                <p>
                  <img src="https://lozido.com/images/icons/check.svg" /> Với thế mạnh về công nghệ, đội ngũ LOZIDO đã
                  ứng dụng vào thực tiễn giúp cho việc kết nối giữa người cho thuê và khách thuê dễ dàng. Tiết kiệm thời
                  gian, chi phí.
                </p>
              </div>
            </div>
          </section>
          <section className="row" style={{ marginTop: '50px' }}>
            <section className="col-md-12">
              <h2 className="underline-yellow">Đội ngũ - Năng lực</h2>
              <div className="item-container aos-init mt-2" data-aos="fade-right">
                <div className="item-content d-flex flex-row mt-2" style={{ display: 'flex' }}>
                  <div className="item-icon flex-shrink-0">
                    <img src="https://lozido.com/images/icons/check.svg" alt="checking" />
                  </div>
                  <div className="item-ft-text flex-grow-1">
                    Kinh nghiệm: 10+ năm trong phát triển phần mềm, Website và ứng dụng
                  </div>
                </div>
              </div>
              <div className="item-container aos-init" data-aos="fade-right">
                <div className="item-content d-flex flex-row mt-2" style={{ display: 'flex' }}>
                  <div className="item-icon flex-shrink-0">
                    <img src="https://lozido.com/images/icons/check.svg" alt="checking" />
                  </div>
                  <div className="item-ft-text flex-grow-1">
                    Đã từng thực hiện và trải nghiệm các dự án về: proptech, ecommerce, logistics...
                  </div>
                </div>
              </div>
              <div className="item-container aos-init" data-aos="fade-right">
                <div className="item-content d-flex flex-row mt-2" style={{ display: 'flex' }}>
                  <div className="item-icon flex-shrink-0">
                    <img src="https://lozido.com/images/icons/check.svg" alt="checking" />
                  </div>
                  <div className="item-ft-text flex-grow-1">Quy trình làm việc chặt chẽ và được chuẩn hóa.</div>
                </div>
              </div>

              <div className="item-container aos-init" data-aos="fade-right">
                <div className="item-content d-flex flex-row mt-2">
                  <div className="item-icon flex-shrink-0">
                    <img src="https://lozido.com/images/icons/check.svg" alt="checking" />
                  </div>
                  <div className="item-ft-text flex-grow-1">
                    Với đội ngũ trẻ trung - tận tâm - nhiệt huyết luôn hướng đến giá trị thật cho khách hàng.
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
      <div className="container">
        <div className="flex row" style={{ marginBlock: '35px' }}>
          <div className="col-md-6 mt-2">
            <Link to="#">
              <img
                src="/banner1.png"
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
                src="/banner2.png"
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
export default Introduce
