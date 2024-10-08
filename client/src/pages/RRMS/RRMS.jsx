import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Rooms } from '~/utils/Rooms'
import { Pkeyw } from '~/utils/PoKey'
import FilterSearch from '../search/FilterSearch'
import { data } from '~/utils/slider'
import { sliderSettings } from '~/utils/common.js'
import { wards_list } from '~/utils/wards_list'
import { useEffect } from 'react'

const RRMS = ({ setIsAdmin }) => {
  useEffect(() => {
    setIsAdmin(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const renderList = (card, start, end) => {
    const listItems = []
    for (let i = start; i < end; i++) {
      listItems.push(
        <div className="col-md-3 mb-2">
          <a
            className="item-district small"
            style={{
              backgroundImage: `url(${card[i].image})`,
              backgroundSize: 'cover',
            }}
            href="#">
            <div className="info">
              <span>{card[i].name}</span>
              <span>
                <strong style={{ paddingLeft: '7px' }}>{card[i].district}</strong>
              </span>
              <div
                style={{
                  fontSize: '13px',
                }}>
                {card[i].detail}
              </div>
            </div>
          </a>
        </div>
      )
    }
    return listItems
  }

  return (
    <div>
      <section className="header-home">
        <div className="container">
          <figure id="logo">
            <h1>
              Kênh tìm phòng trọ, căn hộ, ký túc xá cho thuê{' '}
              <span className="feature" style={{ color: '#FFC107', borderBottom: '3px solid #FFC107' }}>
                TOP
              </span>{' '}
              Việt Nam
              <br />
              <span
                className="typewrite"
                data-period="5000"
                data-type='["An toàn - Hỗ trợ tìm phòng - Kết nối chủ nhà.", "Chất lượng - Giá tốt - Nhanh chóng.", "Tìm trọ - căn hộ - nhà ở hãy nghĩ đến RRMS!"]'>
                <span className="wrap">An toàn - Hỗ trợ tìm phòng - Kết nối chủ nhà.</span>
              </span>
            </h1>
          </figure>
          <section id="search-home">
            <FilterSearch />
            <div id="sugget-special">
              <div className="inner-sugget">
                <p className="text-left">
                  Tìm phòng <span>gần</span>khu vực Quận 1, Hồ Chí Minh
                </p>
                <div className="list-special-home">
                  <ul className="clearfix">
                    <li>
                      <a
                        title="phòng trọ gần Trường Cao đẳng Đại Việt Sài Gòn"
                        href="/thue-phong-tro-gan-truong-cao-dang-dai-viet-sai-gon-id-1569"
                        className="arena">
                        #Trường Cao đẳng Đại Việt Sài Gòn
                      </a>
                    </li>
                    <li>
                      <a
                        title="phòng trọ gần Trường Cao đẳng Du lịch Sài Gòn"
                        href="/thue-phong-tro-gan-truong-cao-dang-du-lich-sai-gon-id-1568"
                        className="arena">
                        #Trường Cao đẳng Du lịch Sài Gòn
                      </a>
                    </li>
                    <li>
                      <a
                        title="phòng trọ gần Trường Cao đẳng Công thương TP.HCM"
                        href="/thue-phong-tro-gan-truong-cao-dang-cong-thuong-tphcm-id-1567"
                        className="arena">
                        #Trường Cao đẳng Công thương TP.HCM
                      </a>
                    </li>
                    <li>
                      <a
                        title="phòng trọ gần Trường Cao đẳng Công nghệ Sài Gòn"
                        href="/thue-phong-tro-gan-truong-cao-dang-cong-nghe-sai-gon-id-1546"
                        className="arena">
                        #Trường Cao đẳng Công nghệ Sài Gòn
                      </a>
                    </li>
                    <li>
                      <a
                        title="phòng trọ gần Trường Cao đẳng Bình Minh Sài Gòn"
                        href="/thue-phong-tro-gan-truong-cao-dang-binh-minh-sai-gon-id-1527"
                        className="arena">
                        #Trường Cao đẳng Bình Minh Sài Gòn
                      </a>
                    </li>
                    <li>
                      <a
                        title="phòng trọ gần Trường Cao đẳng Bách khoa Nam Sài Gòn"
                        href="/thue-phong-tro-gan-truong-cao-dang-bach-khoa-nam-sai-gon-id-1487"
                        className="arena">
                        #Trường Cao đẳng Bách khoa Nam Sài Gòn
                      </a>
                    </li>
                    <li>
                      <a
                        title="phòng trọ gần Trường Cao đẳng bán công Công nghệ và Quản trị doanh nghiệp"
                        href="/thue-phong-tro-gan-truong-cao-dang-ban-cong-cong-nghe-va-quan-tri-doanh-nghiep-id-1484"
                        className="arena">
                        #Trường Cao đẳng bán công Công nghệ và Quản trị doanh nghiệp
                      </a>
                    </li>
                    <li>
                      <a
                        title="phòng trọ gần Trường Đại học Greenwich Việt Nam"
                        href="/thue-phong-tro-gan-truong-dai-hoc-greenwich-viet-nam-id-1482"
                        className="arena">
                        #Trường Đại học Greenwich Việt Nam
                      </a>
                    </li>
                    <li>
                      <a
                        title="phòng trọ gần Trường Kinh doanh Sài Gòn"
                        href="/thue-phong-tro-gan-truong-kinh-doanh-sai-gon-id-1355"
                        className="arena">
                        #Trường Kinh doanh Sài Gòn
                      </a>
                    </li>
                    <li>
                      <a
                        title="phòng trọ gần Trường Đại học Hoa Sen (HSU)"
                        href="/thue-phong-tro-gan-truong-dai-hoc-hoa-sen-hsu-id-1311"
                        className="arena">
                        #Trường Đại học Hoa Sen (HSU)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section id="menu-home">
        <div className="contaienr">
          <div className="container-menu-home ">
            <div className="row">
              <div className="col">
                <a href="javascript:;" onClick="getLocation()" className="item">
                  <picture className="webpimg-container">
                    <img src="./pin2.png" width="85%" alt="Tìm phòng gần tôi" />
                  </picture>
                  <strong>Tìm trọ gần tôi</strong>
                  <div>Tìm gần vị trí hiện tại của bạn</div>
                </a>
              </div>
              <div className="col">
                <a href="/ho-tro-tim-phong.html" className="item">
                  <picture className="webpimg-container">
                    <img src="./hot.png" width="100%" alt="Hỗ trợ tìm kiếm phòng" />
                  </picture>
                  <strong>Hỗ trợ tìm phòng</strong>
                  <div>RRMS hỗ trợ bạn tìm phòng</div>
                </a>
              </div>
              <div className="col">
                <a href="/tra-cuu-hoa-don.html" className="item">
                  <picture className="webpimg-container">
                    <img src="./bill.png" width="85%" alt="Tra cứu hóa đơn" />
                  </picture>
                  <strong>Tra cứu hóa đơn</strong>
                  <div>Xem hóa đơn nhà đang ở</div>
                </a>
              </div>
              <div className="col">
                <a href="/doi-gas-uu-dai.html" className="item">
                  <picture className="webpimg-container">
                    <img src="./icons8-gas-100.png" width="100%" alt="Đổi gas nhận ưu đãi" />
                  </picture>
                  <strong>Đổi gas ưu đãi</strong>
                  <div>Đổi gas tại RRMS nhận ưu đãi</div>
                </a>
              </div>
              <div className="col">
                <a href="/tro-thanh-moi-gioi-RRMS.html" className="item">
                  <picture className="webpimg-container ">
                    <img src="./sale-house.png" width="100%" alt="Trở thành môi giới RRMS" />
                    <span
                      style={{
                        animationName: 'pulse_zalo',
                        animationDuration: '1s',
                        animationFillMode: 'both',
                        animationIterationCount: 'infinite',
                        backgroundColor: 'red',
                        borderRadius: '5px',
                        color: '#fff',
                        position: 'absolute',
                        top: '-5px',
                        right: '-20px',
                        fontSize: '12px',
                        padding: '0px 5px',
                      }}>
                      HOT
                    </span>
                  </picture>
                  <strong>Tuyển môi giới</strong>
                  <div>Tuyển, đào tạo môi giới tại RRMS</div>
                </a>
              </div>
              <div className="col">
                <a href="https://quanlytro.me/ung-dung-quan-ly-phong-tro.html" target="_bank" className="item col-sx-3">
                  <picture className="webpimg-container">
                    <img src="./owner.png" width="85%" alt="Chủ nhà cho thuê phòng" />
                    <span
                      style={{
                        animationName: 'pulse_zalo',
                        animationDuration: '1s',
                        animationFillMode: 'both',
                        animationIterationCount: 'infinite',
                        backgroundColor: 'red',
                        borderRadius: '5px',
                        color: '#fff',
                        position: 'absolute',
                        top: '-5px',
                        right: '-20px',
                        fontSize: '12px',
                        padding: '0px 5px',
                      }}>
                      PRO
                    </span>
                  </picture>
                  <strong>Tôi là chủ nhà</strong>
                  <div>Phần mềm quản lý, đăng tin</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="promotion-section">
        <div className="container">
          <div className="header-item">
            <h2 className="title-section">
              Chương trình - <strong style={{ color: '#4bcffa' }}>RRMS</strong>
            </h2>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="item-promotion" target="_blank" href="/" rel="noopener" tabIndex="-1">
                <img
                  width="100%"
                  src="https://lozido.com/images/promotion/banner-1-desktop.webp"
                  alt="   Hỗ trợ tân sinh viên tìm nhà. Hòa nhập môi trường mới"
                />
                <div className="title-promotion cut-text-2">Hỗ trợ tân sinh viên tìm nhà. Hòa nhập môi trường mới</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="item-promotion" target="_blank" href="/" rel="noopener" tabIndex="-1">
                <img
                  width="100%"
                  src="https://lozido.com/images/promotion/banner-1-desktop.webp"
                  alt="   Hỗ trợ tân sinh viên tìm nhà. Hòa nhập môi trường mới"
                />
                <div className="title-promotion cut-text-2">Hỗ trợ tân sinh viên tìm nhà. Hòa nhập môi trường mới</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="item-promotion" target="_blank" href="/" rel="noopener" tabIndex="-1">
                <img
                  width="100%"
                  src="https://lozido.com/images/promotion/banner-1-desktop.webp"
                  alt="   Hỗ trợ tân sinh viên tìm nhà. Hòa nhập môi trường mới"
                />
                <div className="title-promotion cut-text-2">Hỗ trợ tân sinh viên tìm nhà. Hòa nhập môi trường mới</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="item-promotion" target="_blank" href="/" rel="noopener" tabIndex="-1">
                <img
                  width="100%"
                  src="https://lozido.com/images/promotion/banner-1-desktop.webp"
                  alt="   Hỗ trợ tân sinh viên tìm nhà. Hòa nhập môi trường mới"
                />
                <div className="title-promotion cut-text-2">Hỗ trợ tân sinh viên tìm nhà. Hòa nhập môi trường mới</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="province-search">
        <div className="container">
          <div className="header-item">
            <h2 className="title-section">
              Tìm phòng trọ theo <strong style={{ color: '#4bcffa' }}>tỉnh / thành phố</strong>
            </h2>
          </div>
          <div className="province-link row">
            <div className="col-md-2 mb-2">
              <a href="#">
                <div className="item-province ho-chi-minh" style={{ background: 'url(./tphcm.jpg)' }}>
                  <div className="info">
                    <span style={{ fontSize: '13px' }}>Phòng trọ</span> <strong>Hồ Chí Minh</strong>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-2 mb-2">
              <a href="#">
                <div className="item-province ho-chi-minh" style={{ background: 'url(./ha-noi.jpg)' }}>
                  <div className="info">
                    <span style={{ fontSize: '13px' }}>Phòng trọ</span> <strong>Hà Nội</strong>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-2 mb-2">
              <a href="#">
                <div className="item-province ho-chi-minh" style={{ background: 'url(./bd.jpg)' }}>
                  <div className="info">
                    <span style={{ fontSize: '13px' }}>Phòng trọ</span> <strong>Bình Dương</strong>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-2 mb-2">
              <a href="#">
                <div className="item-province ho-chi-minh" style={{ background: 'url(./caudibo-cantho.jpg)' }}>
                  <div className="info">
                    <span style={{ fontSize: '13px' }}>Phòng trọ</span> <strong>Cần Thơ</strong>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-2 mb-2">
              <a href="#">
                <div className="item-province ho-chi-minh" style={{ background: 'url(./da-nang.jpg)' }}>
                  <div className="info">
                    <span style={{ fontSize: '13px' }}>Phòng trọ</span> <strong>Đà Nẵng</strong>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-2 mb-2">
              <a href="#">
                <div className="item-province ho-chi-minh" style={{ background: 'url(./dong-nai.jpg)' }}>
                  <div className="info">
                    <span style={{ fontSize: '13px' }}>Phòng trọ</span> <strong>Đồng Nai</strong>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container available-posts">
          <div
            style={{
              borderRadius: '10px',
              background: 'linear-gradient(#eef7ff 40%, rgb(238 247 255 / 35%) 50%)',
              padding: '5px 14px 0px 14px',
            }}>
            <div className="header-item">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '0px',
                }}>
                <div
                  style={{
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ffebd5',
                    borderRadius: '100%',
                    marginRight: '10px',
                  }}>
                  <img src="./feature_icon.webp" alt="icon lịch" style={{ width: '30px', height: '30px' }} />
                </div>
                <h2 className="title-section">
                  🏡🏡🏡 Phòng dọn vào ở ngay - <strong style={{ color: 'rgb(75, 207, 250)' }}>NOW ️️️️</strong>
                  <div className="description">Bạn có thể thuê &amp; vào ở ngay hôm nay</div>
                </h2>
              </div>
            </div>
            <div className="grid">
              <div className="row">
                <article className="i-column col-md-3" style={{ marginBottom: '14px' }}>
                  <a
                    target="_blank"
                    title="Cho thuê phòng trọ full nội thất, giá sinh viên Tam Đảo, Quận 10"
                    href="#"
                    className="inner-item"
                    style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="img" style={{ position: 'relative' }}>
                      <img
                        alt="Cho thuê phòng trọ full nội thất, giá sinh viên Tam Đảo, Quận 10"
                        src="https://cdn.lozido.com/image/post_temp/thumb/64ec08bef22c5-1693190334-tmp-glvx5dspng.jpg"
                        data-src="https://cdn.lozido.com/image/post_temp/thumb/64ec08bef22c5-1693190334-tmp-glvx5dspng.jpg"
                        className="lazy"
                      />
                      <div className="images-count">4</div>
                      <div className="bookmark-item bookmark" data-post="712" id="post_712">
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
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="read">
                      <div className="title cut-text-2">
                        <span className="lable-now">NOW</span> Cho thuê phòng trọ full nội thất, giá sinh viên Tam Đảo,
                        Quận 10
                      </div>
                      <div className="address cut-text">
                        <span className="icon-user-small">
                          <svg
                            viewBox="0 0 24 24"
                            width="12"
                            height="12"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="css-i6dzq1">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </span>
                        <strong
                          style={{
                            textTransform: 'capitalize',
                            paddingLeft: '5px',
                          }}>
                          Cẩm Tú{' '}
                        </strong>
                        <span className="zone" style={{ fontSize: '11px' }}>
                          {' '}
                          - Quận 10 . Hồ Chí Minh
                        </span>
                      </div>
                    </div>
                    <div
                      className="info"
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        display: 'flex',
                        padding: '5px',
                      }}>
                      <b className="text-danger">8.000.000đ/tháng</b>
                      <div
                        className="i area"
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                        }}>
                        <b>38</b> m2
                      </div>
                    </div>
                  </a>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="district-search" style={{ position: 'relative' }}>
        <div className="container">
          <div className="header-item">
            <h2 className="title-section">
              Tìm phòng trọ theo <strong style={{ color: 'rgb(75, 207, 250)' }}>quận / huyện</strong>
            </h2>
            <div className="text-right" style={{ flex: '1', textAlign: 'right' }}></div>
          </div>
          <div className="district-link">
            <Swiper {...sliderSettings} style={{ position: 'unset' }}>
              <SliderButtons />
              {data.map((distric, i) => (
                <SwiperSlide key={i}>
                  <div className="item" style={{ marginRight: '10px' }}>
                    <div className="row">
                      <div className="col-md-3 mb-2">
                        {distric.cards.map((card, f) => (
                          <div key={f}>
                            {f == 0 ? (
                              <a
                                className="item-district large"
                                style={{
                                  backgroundImage: `url(${card.image})`,
                                  backgroundSize: 'cover',
                                }}
                                title="Tìm phòng trọ Quận 1"
                                href="/thue-phong-tro-quan-1-id-760/ho-chi-minh-id-79">
                                <div className="info">
                                  <span>{card.name}</span>
                                  <span>
                                    <strong style={{ paddingLeft: '7px' }}>{card.district}</strong>
                                  </span>
                                  <div
                                    style={{
                                      fontSize: '13px',
                                    }}>
                                    {card.detail}
                                  </div>
                                </div>
                              </a>
                            ) : (
                              ''
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="col-md-8">
                        <div className="row" style={{ marginTop: '0px' }}>
                          {renderList(distric.cards, 1, 4)}
                        </div>
                        <div className="row" style={{ marginTop: '14px' }}>
                          {renderList(distric.cards, 4, 7)}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <section className="ward-section">
        <div className="container">
          <div className="header-item">
            <h2 className="title-section">
              Tìm phòng trọ theo <strong style={{ color: 'rgb(75, 207, 250)' }}>phường / xã</strong>
            </h2>
            <div className="text-right" style={{ flex: '1', textAlign: 'right' }}>
              <button
                className="view-all"
                href="#get-filter-data-user"
                data-toggle="modal"
                data-target="#get-filter-data-user">
                <span>Xem tất cả</span>
              </button>
            </div>
          </div>
          <div className="wards-list">
            {wards_list.map((ward, i) => (
              <a href="#" key={i} className="wards-item">
                {ward.name}
              </a>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container section-posts">
          <div className="header-item">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '-5px',
                }}>
                <div
                  style={{
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ffebd5',
                    borderRadius: '100%',
                    marginRight: '10px',
                  }}>
                  <img src="./feature_icon.webp" alt="icon lịch" style={{ width: '30px', height: '30px' }} />
                </div>
                <h2 className="title-section">
                  Phòng trọ - <strong style={{ color: 'rgb(75, 207, 250)' }}>mới nhất</strong>
                  <div className="description">Phòng vừa được phê duyệt</div>
                </h2>
              </div>
              <div className="text-right" style={{ flex: '1', textAlign: 'right' }}>
                <a href="/thue-phong-tro-quan-1-id-760/ho-chi-minh-id-79">
                  <span>
                    Xem thêm phòng trọ tại <b>Quận 1</b>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="list-6 row">
            {Rooms.map((room, i) => (
              <article className="item col-xs-12 col-md-12 col-lg-6 " key={i}>
                <div className="inner-item flex">
                  <section className="list-img" style={{ width: '36%' }}>
                    <div style={{ position: 'relative', height: '100%' }}>
                      <a
                        style={{
                          display: 'block',
                          width: '100%',
                          maxHeight: '205px',
                          overflow: 'hidden',
                          height: '100%',
                        }}
                        target="_blank"
                        title={room.name}
                        href="#"
                        className="is-adss">
                        <img alt={room.name} src={room.img} className="lazy" />
                      </a>

                      <div className="images-count">3</div>
                      <div className="bookmark-item bookmark" data-post="290" id="post_290">
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
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                    </div>
                  </section>
                  <section className="list-info" style={{ width: '64%' }}>
                    <div>
                      <div className="title">
                        <a
                          title={room.name}
                          target="_blank"
                          href="#"
                          className="cut-text-2"
                          style={{ textDecoration: 'none', color: 'black' }}>
                          <span>{room.name}</span>
                        </a>
                      </div>
                      <div className="adress cut-text">
                        <svg
                          viewBox="0 0 24 24"
                          width="12"
                          height="12"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="css-i6dzq1">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {room.address}
                      </div>
                      <div className="mf">
                        <div className="i price">
                          <b className="text-danger">{room.price}</b>
                        </div>
                        <div className="i are">
                          <i className="fa fa-area-chart hidden" aria-hidden="true">
                            {' '}
                          </i>
                          <b>{room.area}</b>
                        </div>
                      </div>
                    </div>
                    <div className="author">
                      <div className="i info-author">
                        <img width="30px" src="./default-user.webp" alt="icon user" />
                        <div style={{ color: '#666', fontSize: '12px' }}>
                          <strong className="author-name" style={{ textTransform: 'capitalize' }}>
                            {room.user}
                          </strong>
                          <div style={{ fontSize: '11px' }} data-time="1 ngày trước">
                            1 ngày trước
                          </div>
                        </div>
                      </div>
                      <div className="i info-author">
                        <a
                          rel="nofollow, noindex"
                          target="_blank"
                          href="#"
                          className="btn-quick-zalo"
                          style={{ textDecoration: 'none' }}>
                          Zalo
                        </a>
                        <span className="btn-quick-call">
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="css-i6dzq1">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                          <span className="show-phone-item-290">Xem SĐT</span>
                          <span className="phone-item-290" style={{ display: 'none' }}>
                            0937072468
                          </span>
                        </span>
                      </div>
                    </div>
                  </section>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="container bot">
        <div className="flex row" style={{ marginBlock: '15px' }}>
          <div className="col-md-6">
            <a href="#">
              <img
                src="./banner1.png"
                className="w-full lg:rounded-md"
                alt="banner moi gioi lozido"
                width="100%"
                style={{ borderRadius: '5px' }}
              />
            </a>
          </div>
          <div className="col-md-6">
            <a href="#">
              <img
                src="./banner2.png"
                className="lg:rounded-md cursor-pointer"
                alt="banner-pc"
                width="100%"
                style={{ borderRadius: '5px' }}
              />
            </a>
          </div>
        </div>
        <h3 className="title-section">Các từ khóa phổ biến trên RRMS</h3>
        <div
          className="header-footer"
          style={{
            marginBottom: '50px',
            border: '0.5px solid #dbdbdb',
            backgroundColor: '#fff',
            borderRadius: '5px',
            padding: '15px',
          }}>
          <ul
            className="list-link"
            style={{
              listStyleType: 'none',
              padding: '0px',
              margin: '0px',
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
            }}>
            {Pkeyw.map((key, i) => (
              <li key={i}>
                <a
                  href="#"
                  target="_blank"
                  style={{
                    textDecoration: 'none',
                    color: '#3d3d3d',
                  }}>
                  {key.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center HTPost">
        <h3>Các bước đăng tin bài RRMS</h3>
        <p className="text-center description">Tiếp cận khách thuê dễ dàng với tính năng đăng tin</p>
      </div>
      <div className="container mb-4">
        <div className="row feature card-benefit">
          <div className="col-md-4 item green">
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
          <div className="col-md-4 item blue">
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
          <div className="col-md-4 item yellow">
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
    </div>
  )
}

export default RRMS

const SliderButtons = () => {
  const swiper = useSwiper()

  return (
    <div className="r-buttons" style={{ position: 'absolute', top: '16px', right: '205px' }}>
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  )
}
