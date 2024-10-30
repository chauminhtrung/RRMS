import { useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
  Typography,
} from '@mui/material'

const AdminManagerBoard = ({ setIsAdmin }) => {
  useEffect(() => {
    setIsAdmin(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const slides = [
    { id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4n0KDfwpb5jgsT1SomMRrWKDHZBVmpFcYqA&s' },
    { id: 2, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXmnLpCRCcJ32kgsSnwYSeJfl-KiNNFY7uDw&s' },
    { id: 3, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgujPpHZhLYaCf6vJU4T0wNh6k_-kSQLxvxw&s' },
    { id: 4, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4n0KDfwpb5jgsT1SomMRrWKDHZBVmpFcYqA&s' },
    { id: 5, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXmnLpCRCcJ32kgsSnwYSeJfl-KiNNFY7uDw&s' },
    { id: 6, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgujPpHZhLYaCf6vJU4T0wNh6k_-kSQLxvxw&s' },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className="container" style={{ marginBottom: '30px' }}>
      <Typography sx={{ fontSize: '30px', textAlign: 'center' }}>Xét duyệt bảng tin</Typography>
      <hr />
      <div className="hehe">
        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-4">
              <Slider {...settings}>
                {slides.map((slide) => (
                  <div key={slide.id}>
                    <img
                      src={slide.src}
                      alt={`Slide ${slide.id}`}
                      style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="col-lg-4 text-center">
              <Typography sx={{ fontSize: '20px' }}>Phòng Duplex thoáng mát</Typography>
              <Typography sx={{ fontSize: '13px' }}>
                53 ngõ 514 Trần Cung, Cổ Nhuế 1, Bắc Từ Liêm, Thành phố Hà Nội
              </Typography>
              <div>
                Giá <b className="text-danger">3.000.000 đ</b>
              </div>
              <div className="row" style={{ textAlign: 'left' }}>
                <div className="col-6">
                  <Typography sx={{ fontSize: '13px' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-bookmark-plus"
                      viewBox="0 0 16 16">
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4" />
                    </svg>{' '}
                    Chuyên mục: Chung cư mini
                  </Typography>
                  <Typography sx={{ fontSize: '13px' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-globe"
                      viewBox="0 0 16 16">
                      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                    </svg>{' '}
                    Tình trạng: Chung cư mini
                  </Typography>
                  <Typography sx={{ fontSize: '13px' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-alarm"
                      viewBox="0 0 16 16">
                      <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
                      <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
                    </svg>{' '}
                    Giờ giấc: tự do
                  </Typography>
                </div>
                <div className="col-6">
                  <Typography sx={{ fontSize: '13px' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-calendar2-date"
                      viewBox="0 0 16 16">
                      <path d="M6.445 12.688V7.354h-.633A13 13 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                      <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z" />
                    </svg>{' '}
                    Ngày đăng: 20/10/2024
                  </Typography>
                  <Typography sx={{ fontSize: '13px' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-shield"
                      viewBox="0 0 16 16">
                      <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
                    </svg>{' '}
                    Kiểm duyệt: <b className="text-warning">chờ phê duyệt</b>{' '}
                  </Typography>
                  <Typography sx={{ fontSize: '13px' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-people-fill"
                      viewBox="0 0 16 16">
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    </svg>{' '}
                    Số lượng người ở: 3
                  </Typography>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-4 mt-2">
                    <div style={{ border: '1px grey solid', width: '120px', borderRadius: '5px' }}>
                      <Typography sx={{ fontSize: '13px' }}>Có máy nước nóng</Typography>
                    </div>
                  </div>
                  <div className="col-4 mt-2">
                    <div style={{ border: '1px grey solid', width: '120px', borderRadius: '5px' }}>
                      <Typography sx={{ fontSize: '13px' }}>Có máy nước nóng</Typography>
                    </div>
                  </div>
                  <div className="col-4 mt-2">
                    <div style={{ border: '1px grey solid', width: '120px', borderRadius: '5px' }}>
                      <Typography sx={{ fontSize: '13px' }}>Có máy nước nóng</Typography>
                    </div>
                  </div>
                  <div className="col-4 mt-2">
                    <div style={{ border: '1px grey solid', width: '120px', borderRadius: '5px' }}>
                      <Typography sx={{ fontSize: '13px' }}>Có máy nước nóng</Typography>
                    </div>
                  </div>
                  <div className="col-4 mt-2">
                    <div style={{ border: '1px grey solid', width: '120px', borderRadius: '5px' }}>
                      <Typography sx={{ fontSize: '13px' }}>Có máy nước nóng</Typography>
                    </div>
                  </div>
                  <div className="col-4 mt-2">
                    <div style={{ border: '1px grey solid', width: '120px', borderRadius: '5px' }}>
                      <Typography sx={{ fontSize: '13px' }}>Có máy nước nóng</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center mt-2">
              <img
                style={{ borderRadius: '50%', height: '100px', width: '100px', objectFit: 'cover' }}
                src="https://thanhnien.mediacdn.vn/Uploaded/ngocthanh/2016_03_23/9x01_YGEO.jpg"
                alt=""
                srcset=""
              />
              <Typography sx={{ fontSize: '13px' }}>Chủ trọ: Nguyễn Văn A</Typography>
              <button className="btn btn-success mt-2" style={{ width: '100px' }}>
                Xét duyệt
              </button>{' '}
              <br />
              <button className="btn btn-danger mt-2" style={{ width: '100px' }}>
                Hủy
              </button>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div className="hehe">
        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-4">
              <Slider {...settings}>
                {slides.map((slide) => (
                  <div key={slide.id}>
                    <img
                      src={slide.src}
                      alt={`Slide ${slide.id}`}
                      style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="col-lg-4 text-center">
              <Typography sx={{ fontSize: '20px' }}>Phòng Duplex thoáng mát</Typography>
              <Typography sx={{ fontSize: '13px' }}>
                53 ngõ 514 Trần Cung, Cổ Nhuế 1, Bắc Từ Liêm, Thành phố Hà Nội
              </Typography>
              <div>
                Giá <b className="text-danger">3.000.000 đ</b>
              </div>
              <div className="row" style={{ textAlign: 'left' }}>
                <div className="col-6">
                  <Typography sx={{ fontSize: '13px' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-bookmark-plus"
                      viewBox="0 0 16 16">
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4" />
                    </svg>{' '}
                    Chuyên mục: Chung cư mini
                  </Typography>
                  <Typography sx={{ fontSize: '13px' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-globe"
                      viewBox="0 0 16 16">
                      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                    </svg>{' '}
                    Tình trạng: Chung cư mini
                  </Typography>
                  <Typography sx={{ fontSize: '13px' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-alarm"
                      viewBox="0 0 16 16">
                      <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
                      <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
                    </svg>{' '}
                    Giờ giấc: tự do
                  </Typography>
                </div>
                <div className="col-6">
                  <Typography sx={{ fontSize: '13px' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-calendar2-date"
                      viewBox="0 0 16 16">
                      <path d="M6.445 12.688V7.354h-.633A13 13 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                      <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z" />
                    </svg>{' '}
                    Ngày đăng: 20/10/2024
                  </Typography>
                  <Typography sx={{ fontSize: '13px' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-shield"
                      viewBox="0 0 16 16">
                      <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
                    </svg>{' '}
                    Kiểm duyệt: <b className="text-warning">chờ phê duyệt</b>{' '}
                  </Typography>
                  <Typography sx={{ fontSize: '13px' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-people-fill"
                      viewBox="0 0 16 16">
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    </svg>{' '}
                    Số lượng người ở: 3
                  </Typography>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-4 mt-2">
                    <div style={{ border: '1px grey solid', width: '120px', borderRadius: '5px' }}>
                      <Typography sx={{ fontSize: '13px' }}>Có máy nước nóng</Typography>
                    </div>
                  </div>
                  <div className="col-4 mt-2">
                    <div style={{ border: '1px grey solid', width: '120px', borderRadius: '5px' }}>
                      <Typography sx={{ fontSize: '13px' }}>Có máy nước nóng</Typography>
                    </div>
                  </div>
                  <div className="col-4 mt-2">
                    <div style={{ border: '1px grey solid', width: '120px', borderRadius: '5px' }}>
                      <Typography sx={{ fontSize: '13px' }}>Có máy nước nóng</Typography>
                    </div>
                  </div>
                  <div className="col-4 mt-2">
                    <div style={{ border: '1px grey solid', width: '120px', borderRadius: '5px' }}>
                      <Typography sx={{ fontSize: '13px' }}>Có máy nước nóng</Typography>
                    </div>
                  </div>
                  <div className="col-4 mt-2">
                    <div style={{ border: '1px grey solid', width: '120px', borderRadius: '5px' }}>
                      <Typography sx={{ fontSize: '13px' }}>Có máy nước nóng</Typography>
                    </div>
                  </div>
                  <div className="col-4 mt-2">
                    <div style={{ border: '1px grey solid', width: '120px', borderRadius: '5px' }}>
                      <Typography sx={{ fontSize: '13px' }}>Có máy nước nóng</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center mt-2">
              <img
                style={{ borderRadius: '50%', height: '100px', width: '100px', objectFit: 'cover' }}
                src="https://thanhnien.mediacdn.vn/Uploaded/ngocthanh/2016_03_23/9x01_YGEO.jpg"
                alt=""
                srcset=""
              />
              <Typography sx={{ fontSize: '13px' }}>Chủ trọ: Nguyễn Văn A</Typography>
              <button className="btn btn-success mt-2" style={{ width: '100px' }}>
                Xét duyệt
              </button>{' '}
              <br />
              <button className="btn btn-danger mt-2" style={{ width: '100px' }}>
                Hủy
              </button>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  )
}
export default AdminManagerBoard
