import { Typography, Button, Box, Grid, Container, Paper } from '@mui/material'
import './Home.css'
// test
export default function HomePage() {
  return (
    <div>
      <section className="banner">
        <Container>
          <div className="inner-banner">
            <Grid container spacing={2}>
              <Grid item xl={7} md={12} className="d-flex align-content-center text-center">
                <div className="inner-slider align-self-center align-baseline">
                  <Typography variant="h3" className="title" fontWeight="bold">
                    Phần mềm quản lý nhà cho thuê
                  </Typography>
                  <Typography variant="h3" className="title" fontWeight="bold">
                    <span className="text-gradient">Điện thoại - iPad - Máy tính</span> 🎉
                  </Typography>
                  <article>
                    <Typography variant="h4" className="title-descrip">
                      <span className="wrap">Quản lý nhẹ nhàng như chiếc smartphone trong tay của bạn!</span>
                    </Typography>
                    <Typography variant="body1" className="title-descrip">
                      Chúng tôi mang đến một ứng dụng tuyệt vời giúp bạn có thể dễ dàng{' '}
                      <b>
                        quản lý nhà trọ, nhà cho thuê, chung cư mini, chuỗi căn hộ, ký túc xá, văn phòng cho thuê...
                      </b>{' '}
                      Dù quy mô nhỏ hay lớn với công nghệ 4.0 không còn thời quản lý phòng cho thuê bằng excel, RRMS sẽ
                      hỗ trợ bạn giải quyết các vấn đề như lưu trữ thông tin, hợp đồng, khách hàng, hóa đơn tiền thuê
                      nhà tự động... Giúp ban quản trị quản lý một cách nhanh chóng, dễ dàng, hiệu quả chỉ với chiếc
                      điện thoại thông minh.
                    </Typography>
                  </article>
                  <div className="d-flex justify-content-center mt-3 button1">
                    <div className="text-end mt-2">
                      <Button
                        variant="contained"
                        className="btn-media shadow"
                        data-toggle="modal"
                        data-target="#modalVideoIntroduce">
                        <span className="icon-btn-media me-3">
                          <img
                            src="https://quanlytro.me/images/icons/button_media.svg?version=244342"
                            alt="play video"
                          />
                        </span>
                        Giới thiệu phần mềm
                      </Button>
                    </div>
                    <div className="text-start mt-2 ms-5">
                      <Button
                        variant="contained"
                        className="btn-registry shadow"
                        data-toggle="modal"
                        data-target="#registerModal">
                        <span className="icon-btn-media me-3">
                          <img
                            src="https://quanlytro.me/images/icons/button_media.svg?version=244342"
                            alt="play video"
                          />
                        </span>
                        Tư vấn về dịch vụ
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid>
              {/* <Grid item xl={5} md={12} className="image-slider text-center">  
                            <img  
                                className="custom-logo home-logo2"  
                                style={{ width: '100%', height: 'auto', maxWidth: '526px' }}  
                                src="https://quanlytro.me/images/quan-ly-tro-smart-7-2022.png?version=244342"  
                                alt="Phần mềm quản lý nhà trọ trên điện thoại - RRMS"  
                                title="Phần mềm quản lý nhà trọ điện thoại"  
                            />  
                        </Grid>   */}
            </Grid>
          </div>
        </Container>
      </section>

      {/* Highlights */}
      <section className="feature-home">
        <div className="container1">
          <div className="text-center">
            <Typography className="header-title" sx={{ fontSize: '40px', fontWeight: 'bold' }}>
              Điểm nổi bật
            </Typography>
            <Typography variant="body1">
              Một số điểm nổi bật của phần mềm bạn có thể tham khảo ngoài ra còn có nhiều tính năng đang chờ bạn khám
              phá!
            </Typography>
          </div>

          <Grid container spacing={2} mt={4}>
            {features.map((feature, index) => (
              <Grid item xs={6} sm={6} md={4} lg={2} key={index}>
                {' '}
                {/* Chỉnh sửa cột cho lg = 2 để có 6 cột  */}
                <Box textAlign="center">
                  <img src={feature.img} alt={feature.title} className="img-fluid" />
                  <Typography variant="subtitle1" mt={1} className="subtitle-strong">
                    <strong>{feature.title}</strong>
                  </Typography>
                </Box>
              </Grid>
            ))}
            <Grid item xs={6} sm={6} md={4} lg={2}>
              <Box className="custom-box">
                <Box display="flex" alignItems="center">
                  <Typography component="a" href="#all-function" className="link">
                    Xem thêm
                  </Typography>
                  <svg
                    className="svg-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: '8px' }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 16 16 12 12 8"></polyline>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </Box>
              </Box>
              <Typography variant="subtitle1" mt={1} className="subtitle-strong">
                <strong>Nhiều tính năng khác đang chờ khám phá</strong>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </section>

      <section className="platform-app has-bg-white">
        <Container>
          <div className="item-inner inner-platform-app">
            <div className="text-center">
              <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>Quản lý trên đa nền tảng</Typography>
              <Typography color="#5eb7ff" sx={{ fontSize: '40px', fontWeight: 'bold' }}>
                Điện thoại - iPad - Máy tính - Website
              </Typography>
              <Typography variant="body1">
                Với sự đa dạng về nền tảng sẽ giúp bạn quản lý nhà trọ linh động hơn, thay vì mẫu excel phức tạp hay sổ
                sách rờm rà. Thật tuyệt vời khi nay bạn đã có thể quản lý nhà trọ của mình trên mọi thiết bị bạn có.
              </Typography>
            </div>

            <Grid container spacing={2} mt={4}>
              {features1.map((feature, index) => (
                <Grid item xs={12} md={4} key={index} data-aos-disable="zoom-in-up">
                  <Box className="inner">
                    <Box className="image">
                      <img
                        src={feature.img}
                        width="383"
                        height="282"
                        className="img-fluid"
                        title={feature.title}
                        alt={feature.title}
                      />
                    </Box>
                    <Box textAlign="center" mt={3} mb={2}>
                      <Button
                        variant="contained"
                        className={`btn btn-platform ${index === 0 ? 'mobile' : index === 1 ? 'ipad' : 'desktop'}`}
                        href={feature.link}>
                        {feature.buttonLabel}
                      </Button>
                    </Box>
                    <Box className="des text-align-justify">
                      <Typography variant="body1">{feature.description}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      </section>

      {/*  */}

      {/* <section className="function" id="all-function">  
            <Container>  
                <header className="function-header text-center">  
                    <Typography marginBottom={3} sx={{ fontSize: '40px', fontWeight: 'bold' }}>  
                        Với những tính năng tuyệt vời phần mềm quản lý sẽ hỗ trợ bạn.  
                    </Typography>  
                    <Typography marginBottom={2}>  
                        Nhiều tính năng căn bản và mở rộng sẽ giúp công việc <b>quản lý phòng trọ</b> của bạn dễ dàng hơn bao giờ hết. Hãy tham khảo một vài chức năng cơ bản mà chúng tôi đang hỗ trợ.  
                    </Typography>  
                </header>  

                <a href="#" target="_blank" rel="noopener noreferrer">  
                    <img src="https://quanlytro.me/images/gui-hoa-don-tu-dong-zalo.png" alt="Gửi hóa đơn thu tiền nhà trọ tự động qua ZALO" style={{ borderRadius: '10px', width: '100%' }} />  
                </a>  

                <div className="function-main mt-4">  
                    <Grid container spacing={3}>  
                        {features2.map((feature, index) => (  
                            <Grid item xs={12} md={6} lg={6} key={index}>  
                                <Paper className="item mb-3">  
                                    <Box className="item-wrap">  
                                        <Box className="item-image-wrap item-function p-2 text-center">  
                                            <img className="item-image" src={feature.icon} alt={`icon ${feature.title}`} />  
                                        </Box>  
                                        <Box className="item-content-wrap p-2">  
                                            <Typography className="item-wraptext" sx={{ fontSize: '25px', fontWeight: 'bold'  }}>{feature.title}</Typography>  
                                            <Typography className="item-content-des">{feature.description}</Typography>  
                                        </Box>  
                                    </Box>  
                                </Paper>  
                            </Grid>  
                        ))}  
                    </Grid>  
                </div>  
            </Container>  
        </section>  */}

      {/*  */}

      <section className="testimonial has-bg-white">
        <Container>
          <div className="item-inner inner-testimonial">
            <article className="text-center">
              <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>Lý do chủ nhà chọn chúng tôi</Typography>
              <Typography color="#5eb7ff" sx={{ fontSize: '40px', fontWeight: 'bold' }}>
                Cảm nhận từ khách hàng
              </Typography>
              <Typography className="section-description">
                Sự hài lòng của khách hàng là động lực giúp chúng tôi hoàn thiện ứng dụng, đồng thời mở ra cơ hội có
                thêm nhiều khách hàng mới trong tương lai.
                <br />
                Chúng tôi chân thành cảm ơn khách hàng đã tin dùng cũng như đóng góp giúp phần mềm ngày càng hoàn thiện
                hơn!
              </Typography>
            </article>

            <div className="testimonial-wrapper testimonial-1 text-center">
              <Grid container spacing={3}>
                {testimonials.map((testimonial, index) => (
                  <Grid item xs={12} md={6} lg={3} key={index}>
                    <Paper className="testimonial-inner rounded">
                      <div className="testimonial-abs-part">
                        <div className="testimonial-thumb">
                          <img src={testimonial.image} className="rounded-circle" alt={testimonial.name} />
                        </div>
                      </div>
                      <article className="testimonial-info-wrap">
                        <p>{testimonial.feedback}</p>
                        <div className="testimonial-title">{testimonial.name}</div>
                        <b>{testimonial.rooms}</b>
                        <p>{testimonial.role}</p>
                      </article>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="item-inner">
            <div className="text-center">
              <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>Đồng hành cùng chúng tôi</Typography>
              <Typography>
                Cùng hướng đến sự phát triển bền vững, mang lại giá trị thực cho cộng đồng.
                <br className="d-none d-md-block" />
                Chúng tôi đã kết nối với nhiều đối tác và khách hàng.
              </Typography>
            </div>

            <Grid container spacing={3} mt={5}>
              {stats.map((stat, index) => (
                <Grid item md={3} sm={6} xs={12} key={index}>
                  <Paper className="col-inner">
                    <div className="d-flex align-items-center">
                      <div className="img-inner">
                        <img src={stat.imgSrc} alt={stat.text} />
                      </div>
                      <div className="col-inner">
                        <Typography className="conut-num">
                          <span className="count-up active">{stat.count}</span>
                          <sup>+</sup>
                        </Typography>
                        <Typography className="count-txt">{stat.text}</Typography>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <div className="logo-customer mt-5">
              <Grid container spacing={2}>
                {logos.map((logo, index) => (
                  <Grid item md={2} xs={6} key={index} className="item-logo">
                    <div className="inner-item">
                      <img loading="lazy" src={logo} width="100%" alt={`logo ${index + 1}`} />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>

            <section className="about-us mt-3">
              <Grid container spacing={3}>
                <Grid item sm={12} md={6}>
                  <article className="card-feature">
                    <Typography className="item-wraptext" sx={{ fontSize: '40px', fontWeight: 'bold' }}>
                      Sự ra đời của RRMS - Quản lý nhà cho thuê
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                      Với số lượng phòng trọ ngày càng tăng theo nhu cầu, các chủ nhà sẽ gặp khó khăn trong việc quản lý
                      theo cách truyền thống. Sử dụng các cuốn sổ dày cộm rồi ghi chép tất cả các thông tin hay các file
                      excel phức tạp, đến các khoản tiền dịch vụ khách sử dụng, đến phiếu thu tiền, hóa đơn, thống kê
                      các khoản chi thu. Nhận thấy được vấn đề đó, đội ngũ <b>RRMS - Quản lý trọ</b> chúng tôi được ra
                      đời nhằm chia sẻ phần
                      <b> RRMS - Quản lý trọ</b> chúng tôi được ra đời nhằm chia sẻ phần nào những khó khăn của các chủ
                      nhà trọ đang gặp phải.
                    </Typography>
                  </article>
                </Grid>
                <Grid item sm={12} md={6}>
                  <article className="card-feature">
                    <Typography className="item-wraptext" sx={{ fontSize: '40px', fontWeight: 'bold' }}>
                      Giá trị cốt lõi của RRMS - Quản lý nhà cho thuê
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                      Hiểu được nỗi khó khăn trong việc quản lý nhà cho thuê, mục tiêu của đội ngủ RRMS là phải mang sản
                      phẩm chất lượng, tiện ích tới khách hàng. Phần mềm phải được cập nhật, gia cố thường xuyên để đáp
                      ứng kịp thời nghiệp vụ quản lý trong hoạt động kinh doanh nhà trọ sớm và tốt nhất có thể. Chúng
                      tôi luôn coi sự hài lòng của khách hàng là thành công và đặt lợi ích khách hàng lên hàng đầu. Phục
                      vụ tận tình, chu đáo.
                    </Typography>
                  </article>
                </Grid>
              </Grid>
            </section>
          </div>
        </Container>
      </section>
    </div>
  )
}

const features = [
  {
    img: 'https://quanlytro.me/images/home_feature/feature-1-app-danh-rieng-cho-khac-thue-doc.jpg',
    title: 'App dành riêng cho khách thuê',
  },
  {
    img: 'https://quanlytro.me/images/home_feature/feature-2-gui-hoa-don-tu-dong-doc.jpg',
    title: 'Gửi hóa đơn tự động tới khách thuê ZALO/APP',
  },
  {
    img: 'https://quanlytro.me/images/home_feature/feature-3-thanh-toan-online-doc.jpg',
    title: 'Thanh toán hóa đơn online, gạch nợ tự động',
  },
  {
    img: 'https://quanlytro.me/images/home_feature/feature-4-giao-dien-de-su-dung-doc.jpg',
    title: 'Giao diện cực kỳ dễ sử dụng',
  },
  {
    img: 'https://quanlytro.me/images/home_feature/feature-5-lap-day-phong-trong-doc.jpg',
    title: 'Lấp phòng trống nhanh chóng',
  },
]

const features1 = [
  {
    img: 'https://quanlytro.me/images/banner_mobile_flatform.webp',
    title: 'Quản lý nhà tọ trên điện thoại',
    buttonLabel: 'Quản lý trên điện thoại',
    description:
      'Quản lý ngay trên chiếc điện thoại. Nhẹ nhàng, thuận tiện, linh hoạt với đầy đủ tính năng và được đồng bộ với các nền tảng khác.',
  },
  {
    img: 'https://quanlytro.me/images/banner_ipad_flatform.webp',
    title: 'Quản lý nhà tọ trên iPad',
    buttonLabel: 'Quản lý trên máy tính bảng',
    description:
      'Nếu bạn đang có chiếc máy tính bảng là một lợi thế. Bạn có thể kết hợp được sự linh hoạt giữa điện thoại và máy tính.',
  },
  {
    img: 'https://quanlytro.me/images/banner_desktop_flatform.webp',
    title: 'Quản lý nhà tọ trên máy tính',
    buttonLabel: 'Quản lý trên máy tính',
    description:
      'Quản lý ngay trên website mà không cần cài đặt app. Tất cả các tính năng sẽ rất chi tiết, sẽ giúp bạn quản lý thuận tiện đầy đủ.',
  },
]

const testimonials = [
  {
    name: 'Bà Lê Thanh Nhàn',
    rooms: '40 phòng',
    role: 'Chủ nhà',
    feedback: 'Ứng dụng dễ dàng sử dụng và miễn phí, đầy đủ chức năng giúp tôi có thể quản lý cùng lúc nhiều nhà trọ.',
    image: 'https://quanlytro.me/images/owner_avatars/chu-tro-01-80x80.webp?version=29842',
  },
  {
    name: 'Chị Lê Thị Huyên',
    rooms: '8 phòng',
    role: 'Chủ nhà',
    feedback:
      'Tôi rất thích ứng dụng vì rất tiện lợi, phòng của tôi không nhiều nhưng trước khi biết đến ứng dụng tôi phải quản lý sổ sách rất cực. Giờ thì khoẻ hơn nhiều. Cảm ơn LOZIDO!',
    image: 'https://quanlytro.me/images/owner_avatars/chu-tro-02-80x80.webp?version=29842',
  },
  {
    name: 'Anh Lê Văn Tân',
    rooms: '30 phòng',
    role: 'Chủ nhà',
    feedback:
      'Phòng trọ của mình tương đối nhiều. Trước đây mình thường rất mất nhiều thời gian trong công việc quản lý. Mình tốn thời gian ghi nhớ, tính toán sổ sách hàng tháng. Từ khi được bạn giới thiệu ứng dụng mọi việc tốt hơn.',
    image: 'https://quanlytro.me/images/owner_avatars/chu-tro-03-80x80.webp?version=29842',
  },
  {
    name: 'Chị Đoàn Thị Hòa',
    rooms: '20 phòng',
    role: 'Chủ nhà',
    feedback:
      'Tôi có nhiều thời gian cho bản thân hơn từ khi biết đến ứng dụng quản lý nhà trọ của LOZIDO. Thật sự cảm ơn các bạn đã giới thiệu và hỗ trợ tôi!',
    image: 'https://quanlytro.me/images/owner_avatars/chu-tro-04-80x80.webp?version=29842',
  },
]

const stats = [
  { imgSrc: 'https://quanlytro.me/images/icons/users-icon.svg', count: '8,038', text: 'Chủ nhà cho thuê' },
  { imgSrc: 'https://quanlytro.me/images/icons/compain-icon.png', count: '100', text: 'Chiến dịch' },
  { imgSrc: 'https://quanlytro.me/images/icons/customer-icon.png', count: '12,000', text: 'Khách thuê phòng' },
  { imgSrc: 'https://quanlytro.me/images/icons/love-icon.png', count: '240', text: 'Đối tác tiêu biểu' },
]

const logos = [
  'https://quanlytro.me/images/logo-customer/logo-1.png',
  'https://quanlytro.me/images/logo-customer/logo-4.png',
  'https://quanlytro.me/images/logo-customer/logo-2.png',
  'https://quanlytro.me/images/logo-customer/logo-3.png',
  'https://quanlytro.me/images/logo-customer/logo-5.png',
  'https://quanlytro.me/images/logo-customer/logo-6.png',
  'https://quanlytro.me/images/logo-customer/logo-7.png',
  'https://quanlytro.me/images/logo-customer/logo-8.png',
  'https://quanlytro.me/images/logo-customer/logo-9.png',
  'https://quanlytro.me/images/logo-customer/logo-10.png',
  'https://quanlytro.me/images/logo-customer/logo-11.png',
  'https://quanlytro.me/images/logo-customer/logo-12.png',
]
