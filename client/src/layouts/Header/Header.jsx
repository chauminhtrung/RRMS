import { Link } from 'react-router-dom'
import './Header.css'
import { useState } from 'react'
const Header = ({username,avatar  }) => {
  const [IsDanhmuc, setIsDanhmuc] = useState(false)
  const [IsMuaban, setIsMuaban] = useState(false)
  const [IsTaikhoan, setIsTaikhoan] = useState(false)
  const [IsThongbao, setIsThongbao] = useState(false)
  const [IsMobileTaikhoan, setIsMobileTaikhoan] = useState(false)

  return (
    <body>
      <div className="ct-appwrapper aw__sa4yob3" style={{ '--sa4yob3-0': '#fff', '--sa4yob3-1': 'inherit' }}>
        <div className="aw__s10g0md5" style={{ '--s10g0md5-0': '#22222' }}>
          <span className="aw__l3mdvjv">
            <span>
              <a href="https://www.chotot.com" className="aw__i9tio1c">
                Chợ Tốt
              </a>
              <span className="aw__v1t61y1y"></span>
            </span>
            <span>
              <a href="https://nhatot.com" className="aw__i9tio1c">
                Nhà Tốt
              </a>
              <span className="aw__v1t61y1y"></span>
            </span>
            <span>
              <a href="https://xe.chotot.com" className="aw__i9tio1c">
                Chợ Tốt Xe
              </a>
              <span className="aw__v1t61y1y"></span>
            </span>
            <span>
              <a href="https://www.vieclamtot.com" className="aw__i9tio1c">
                Việc Làm Tốt
              </a>
            </span>
          </span>
          <span className="aw__r1pijacb">
            <a
              className="aw__i9tio1c"
              href="https://docs.google.com/forms/d/e/1FAIpQLSc5begvG3B5NE29iy3JnXya_6zY_DyHdIIfb3TnnQTNqr5ZVQ/viewform?vc=0&amp;c=0&amp;w=1&amp;flr=0"
              rel="nofollow"
              profile="[object Object]"
              target="_blank">
              <span className="aw__nx3kzrx show-desktop aw__szp9uz0" color="#8C8C8C">
                Đóng góp ý kiến
              </span>
            </a>
            <a className="aw__naoniqq" href="/" rel="nofollow">
              <span className="aw__nez25v5 show-desktop aw__szp9uz0" color="#8C8C8C">
                Tải ứng dụng
              </span>
            </a>
            <a className="aw__i9tio1c" target="_blank">
              <span className="aw__n1rd4x1j show-desktop aw__szp9uz0" color="#8C8C8C">
                Trợ giúp
              </span>
            </a>
          </span>
        </div>

        <div
          className="aw__fe17nfm"
          href="https://www.nhatot.com/kenh-moi-gioi"
          color="#222222"
          style={{
            '--fe17nfm-1': '190px',
            '--fe17nfm-3': '#E8E8E8',
            '--fe17nfm-4': '#222222',
          }}>
          <span className="aw__muulhme">
            <img
              src="https://storage.googleapis.com/static-chotot-com/storage/APP_WRAPPER/icons/icon-suitcase.png"
              alt=""
            />
          </span>
          <span>Dành cho môi giới</span>
        </div>
      </div>

      <header
        className="ct-appwrapper aw__h5101fz"
        style={{
          '--h5101fz-0': '#fff',
          '--h5101fz-2': 'calc(40px + var(--app-wrapper-extra-height,   0px))',
          '--h5101fz-5': '100',
        }}>
        <div className="aw__co22znp">
          <div className="leftWrapperContainerCss aw__l8p27ky" style={{ '--l8p27ky-0': '20%', '--l8p27ky-2': 'unset' }}>
            <div className="aw__l152mft9">
              <a className="aw__l1l4rfje leftWrapperCss" href="/RRMS" style={{ justifyContent: 'unset' }}>
                <picture>
                  <img height="35" width="188" className="aw__ldrazpr" src="./logo.png" alt="Nhà trọ" />
                </picture>
              </a>
            </div>

            <div
              className="aw__cexsh2j"
              onClick={() => {
                !IsDanhmuc ? setIsDanhmuc(true) : setIsDanhmuc(false)
              }}
              style={{
                '--cexsh2j-0': 'flex',
                '--cexsh2j-3': 'undefined',
                '--cexsh2j-4': '24px 12px',
                '--cexsh2j-5': 'undefined',
              }}>
              {/* danh muc nam trong day */}
              <div className="aw__i8z877t" style={{ '--i8z877t-0': '#8C8C8C', '--i8z877t-6': '#222222' }}>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  data-toggle="dropdown"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="">
                  <g clipPath="url(#clip0_5847_24383)">
                    <path
                      d="M4 18.5H20C20.55 18.5 21 18.05 21 17.5C21 16.95 20.55 16.5 20 16.5H4C3.45 16.5 3 16.95 3 17.5C3 18.05 3.45 18.5 4 18.5ZM4 13.5H20C20.55 13.5 21 13.05 21 12.5C21 11.95 20.55 11.5 20 11.5H4C3.45 11.5 3 11.95 3 12.5C3 13.05 3.45 13.5 4 13.5ZM3 7.5C3 8.05 3.45 8.5 4 8.5H20C20.55 8.5 21 8.05 21 7.5C21 6.95 20.55 6.5 20 6.5H4C3.45 6.5 3 6.95 3 7.5Z"
                      fill="#222222"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_5847_24383">
                      <rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect>
                    </clipPath>
                  </defs>
                </svg>
                <span className="aw__i1utyhlb">
                  <span
                    className="aw__c19wws31 show-desktop aw__szp9uz0"
                    color="#8C8C8C"
                    style={{
                      '--szp9uz0-1': 'inherit',
                      '--szp9uz0-9': '#8C8C8C',
                    }}>
                    Danh mục
                  </span>

                  <svg
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="aw__dtt35j3">
                    <path
                      d="M4.67154 5.99959C4.9323 5.74067 5.35336 5.74141 5.6132 6.00125L8.19653 8.58458L10.7863 6.00048C11.0461 5.74125 11.4668 5.74148 11.7263 6.00099C11.986 6.26071 11.986 6.68179 11.7263 6.94151L8.90364 9.76414C8.51312 10.1547 7.87995 10.1547 7.48943 9.76414L4.66987 6.94459C4.40872 6.68344 4.40947 6.25981 4.67154 5.99959Z"
                      fill="currentColor"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="aw__c1fkdta0">
            <div className="aw__s1wdsl35">
              <div>
                <div className="aw__slq94yq" style={{ '--slq94yq-4': '#f4f4f4' }}>
                  <div
                    className="drop-down aw__d1x4wh9a"
                    style={{ '--d1x4wh9a-0': '#f4f4f4' }}
                    onClick={() => {
                      !IsMuaban ? setIsMuaban(true) : setIsMuaban(false)
                    }}>
                    <div className="drop-down--text">Mua bán</div>
                    <span className="drop-down--icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16">
                        <g fill="none" fillRule="evenodd">
                          <path
                            fill="#000"
                            d="M6 6L11 11.5 1 11.5z"
                            opacity=".8"
                            transform="matrix(1 0 0 -1 0 17.5)"></path>
                          <path stroke="#FFF" strokeWidth=".1" d="M0 0H12V16H0z" opacity=".01"></path>
                        </g>
                      </svg>
                    </span>
                    <span className="aw__d1ohzzqu"></span>
                    {/* cai dropdown mua ban */}
                    {IsMuaban ? (
                      <div>
                        <div className="aw__d66o4xd" style={{ '--d66o4xd-0': 'flex' }}>
                          <div className="aw__d1es5zbd">
                            Mua bán{' '}
                            <svg
                              data-type="monochrome"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 12"
                              width="1em"
                              height="1em"
                              fill="none">
                              <path
                                fill="currentColor"
                                d="M6.096 12L0 6.154l2.104-2.04 3.935 3.773L13.839 0 16 1.986z"></path>
                            </svg>
                          </div>
                          <div className="aw__d1es5zbd">Cho thuê </div>
                          <div className="aw__d1es5zbd">Dự án </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div id="autoComplete">
                    <div className="aw__d1g2y39b">
                      <div className="aw__s7k33ul">
                        <div
                          value=""
                          className="aw__ah4jb82"
                          style={{
                            '--ah4jb82-2': 'undefined',
                            '--ah4jb82-6': '35px',
                          }}>
                          <button aria-label="Search Button Desktop" className="aw__p1vnrcrb aw__cm4yjvg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              data-type="monochrome"
                              viewBox="0 0 16 16"
                              width="1em"
                              height="1em"
                              fill="none"
                              className="mb-1">
                              <path
                                fill="currentColor"
                                d="M6.4 0a6.369 6.369 0 00-4.525 1.873A6.425 6.425 0 00.502 3.906v.002A6.383 6.383 0 000 6.398a6.372 6.372 0 001.875 4.524 6.385 6.385 0 008.428.537l-.006.006 4.295 4.293a.827.827 0 001.166-1.166l-4.295-4.295a6.368 6.368 0 00-.537-8.424A6.372 6.372 0 006.4 0zm0 1.615a4.75 4.75 0 013.383 1.4c.44.44.785.95 1.028 1.522h-.002c.249.59.377 1.214.377 1.861 0 .648-.128 1.27-.377 1.862h.002a4.783 4.783 0 01-2.55 2.545c-.59.25-1.213.377-1.86.377a4.761 4.761 0 01-1.864-.377A4.749 4.749 0 013.016 9.78c-.44-.44-.783-.95-1.024-1.521a4.735 4.735 0 01-.377-1.862c0-.647.127-1.272.377-1.863a4.75 4.75 0 011.024-1.52 4.754 4.754 0 013.384-1.4z"></path>
                            </svg>
                          </button>
                        </div>
                        <input
                          autoComplete="off"
                          placeholder="Bất động sản"
                          id="__inputItemProps"
                          type="text"
                          className="aw__t16o28i7"
                          style={{
                            '--t16o28i7-3': '36px',
                            '--t16o28i7-5': '#f4f4f4',
                            '--t16o28i7-6': '35px',
                            '--t16o28i7-8': '35px',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="aw__rygw70q">
            <div className="aw__r1apw2dm aw__nx4lax3">
              <div className="aw__njogxfr">
                <div className="hover aw__naus9sk">
                  <div className="aw__m14bta8d">
                    <div
                      color="#222222"
                      id="btnundefined"
                      className="aw__i8z877t"
                      style={{
                        '--i8z877t-0': '#222222',
                        '--i8z877t-6': '#222222',
                      }}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="aw__ie1ow2r">
                        <g clipPath="url(#clip0_5790_635)">
                          <g clipPath="url(#clip1_5790_635)">
                            <path
                              d="M19.4045 18.7012H4.58447C4.33116 18.6997 4.08267 18.6319 3.86373 18.5044C3.64479 18.377 3.46306 18.1945 3.33662 17.975C3.21018 17.7555 3.14344 17.5067 3.14307 17.2534C3.14269 17.0001 3.20868 16.7511 3.33447 16.5312C4.25656 14.6713 4.68036 12.6039 4.56447 10.5312V9.75119C4.56208 8.76941 4.75587 7.79705 5.13447 6.89119C5.50399 5.9826 6.05527 5.15909 6.75447 4.47119C7.44834 3.77705 8.27473 3.22952 9.18447 2.86119C10.0896 2.48125 11.0629 2.29067 12.0445 2.30119C14.0179 2.33276 15.8994 3.14096 17.2809 4.55055C18.6624 5.96015 19.4326 7.8575 19.4245 9.83119V10.5012C19.3053 12.5742 19.7293 14.6423 20.6545 16.5012C20.7789 16.7226 20.8442 16.9723 20.8442 17.2262C20.8442 17.4801 20.7789 17.7298 20.6545 17.9512C20.5307 18.1738 20.3494 18.359 20.1295 18.4874C19.9096 18.6159 19.6591 18.6828 19.4045 18.6812V18.7012ZM11.9945 3.70119C11.2051 3.70057 10.4234 3.85571 9.69411 4.15773C8.96481 4.45974 8.30228 4.90269 7.74447 5.46119C7.17636 6.03386 6.72767 6.71369 6.42447 7.46119C6.13287 8.1891 5.98679 8.9671 5.99447 9.75119V9.75119V10.5012C6.11944 12.8302 5.62973 15.1512 4.57447 17.2312L19.4345 17.3012C18.4083 15.1855 17.914 12.8513 17.9945 10.5012V9.83119C18 8.22614 17.3737 6.68338 16.251 5.53633C15.1283 4.38928 13.5993 3.73008 11.9945 3.70119V3.70119Z"
                              fill="currentColor"></path>
                            <path
                              d="M11.9945 22.4508C11.5081 22.4529 11.0261 22.3585 10.5764 22.1731C10.1267 21.9877 9.71819 21.715 9.37453 21.3708C8.68295 20.6741 8.29475 19.7324 8.29453 18.7508V18.0008C8.29453 17.8151 8.36827 17.6371 8.49955 17.5058C8.63083 17.3745 8.80887 17.3008 8.99452 17.3008C9.18018 17.3008 9.35822 17.3745 9.4895 17.5058C9.62078 17.6371 9.69452 17.8151 9.69452 18.0008V18.7508C9.69584 19.3609 9.9364 19.9461 10.3645 20.3808C10.8081 20.7912 11.3902 21.0192 11.9945 21.0192C12.5989 21.0192 13.181 20.7912 13.6245 20.3808C14.0526 19.9461 14.2932 19.3609 14.2945 18.7508V18.0008C14.2945 17.8151 14.3683 17.6371 14.4995 17.5058C14.6308 17.3745 14.8089 17.3008 14.9945 17.3008C15.1802 17.3008 15.3582 17.3745 15.4895 17.5058C15.6208 17.6371 15.6945 17.8151 15.6945 18.0008V18.7508C15.6958 19.237 15.601 19.7188 15.4156 20.1683C15.2301 20.6178 14.9576 21.0262 14.6138 21.37C14.2699 21.7139 13.8615 21.9863 13.412 22.1718C12.9625 22.3573 12.4808 22.4521 11.9945 22.4508Z"
                              fill="currentColor"></path>
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_5790_635">
                            <rect width="24" height="24" fill="white"></rect>
                          </clipPath>
                          <clipPath id="clip1_5790_635">
                            <rect
                              width="17.71"
                              height="20.15"
                              fill="white"
                              transform="translate(3.14453 2.30078)"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>

              <div className="aw__njogxfr">
                <a className="aw__n1u3b0ub" href="https://chat.chotot.com/chat" rel="nofollow" aria-label="chat">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="aw__ih32wb2">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.7499 4.34844C3.71012 4.34844 3.67197 4.36424 3.64384 4.39237C3.61571 4.4205 3.5999 4.45866 3.5999 4.49844V15.2422L6.33529 13.0318C6.44205 12.9455 6.57515 12.8984 6.7124 12.8984H15.7499C15.7897 12.8984 15.8278 12.8826 15.856 12.8545C15.8841 12.8264 15.8999 12.7882 15.8999 12.7484V4.49844C15.8999 4.45865 15.8841 4.4205 15.856 4.39237C15.8278 4.36424 15.7897 4.34844 15.7499 4.34844H3.7499ZM2.79531 3.54384C3.04848 3.29067 3.39186 3.14844 3.7499 3.14844H15.7499C16.1079 3.14844 16.4513 3.29067 16.7045 3.54384C16.9577 3.79702 17.0999 4.1404 17.0999 4.49844V12.7484C17.0999 13.1065 16.9577 13.4499 16.7045 13.703C16.4513 13.9562 16.1079 14.0984 15.7499 14.0984H6.92453L3.37701 16.9651C3.19721 17.1104 2.94992 17.1395 2.74132 17.0399C2.53271 16.9402 2.3999 16.7296 2.3999 16.4984V4.49844C2.3999 4.14039 2.54213 3.79702 2.79531 3.54384Z"
                      fill="#222222"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.8999 8.24844C15.8999 7.91707 16.1685 7.64844 16.4999 7.64844H20.2499C20.6079 7.64844 20.9513 7.79067 21.2045 8.04384C21.4577 8.29702 21.5999 8.6404 21.5999 8.99844V20.9984C21.5999 21.2296 21.4671 21.4402 21.2585 21.5399C21.0499 21.6395 20.8026 21.6104 20.6228 21.4651L17.0753 18.5984H8.2499C7.89186 18.5984 7.54848 18.4562 7.29531 18.203C7.04213 17.9499 6.8999 17.6065 6.8999 17.2484V13.4984C6.8999 13.1671 7.16853 12.8984 7.4999 12.8984C7.83127 12.8984 8.0999 13.1671 8.0999 13.4984V17.2484C8.0999 17.2882 8.11571 17.3264 8.14384 17.3545C8.17197 17.3826 8.21012 17.3984 8.2499 17.3984H17.2874C17.4247 17.3984 17.5578 17.4455 17.6645 17.5318L20.3999 19.7422V8.99844C20.3999 8.95865 20.3841 8.9205 20.356 8.89237C20.3278 8.86424 20.2897 8.84844 20.2499 8.84844H16.4999C16.1685 8.84844 15.8999 8.57981 15.8999 8.24844Z"
                      fill="#222222"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.7998 7.23047C6.7998 6.95433 6.99168 6.73047 7.22838 6.73047H12.3712C12.6079 6.73047 12.7998 6.95433 12.7998 7.23047C12.7998 7.50661 12.6079 7.73047 12.3712 7.73047H7.22838C6.99168 7.73047 6.7998 7.50661 6.7998 7.23047Z"
                      fill="#222222"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.7998 10.2305C6.7998 9.95433 6.99168 9.73047 7.22838 9.73047H12.3712C12.6079 9.73047 12.7998 9.95433 12.7998 10.2305C12.7998 10.5066 12.6079 10.7305 12.3712 10.7305H7.22838C6.99168 10.7305 6.7998 10.5066 6.7998 10.2305Z"
                      fill="#222222"></path>
                  </svg>
                  <div className="aw__bhbktvj">
                    <span className="aw__bxyv27i" id="chat-unread-count" style={{ display: 'none' }}>
                      0
                    </span>
                  </div>
                </a>
              </div>

              <div className="aw__njogxfr">
                <a
                  href="https://id.chotot.com/login"
                  color="#222222"
                  rel="nofollow"
                  className="aw__iwanj6m"
                  style={{ '--iwanj6m-0': '#222222', '--iwanj6m-7': '#222222' }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="aw__irp38gy">
                    <path
                      d="M6.28571 2C5.14907 2 4.05898 2.45153 3.25526 3.25526C2.45153 4.05898 2 5.14907 2 6.28571V17.7143C2 18.8509 2.45153 19.941 3.25526 20.7447C4.05898 21.5485 5.14907 22 6.28571 22H17.7143C18.8509 22 19.941 21.5485 20.7447 20.7447C21.5485 19.941 22 18.8509 22 17.7143V6.28571C22 5.14907 21.5485 4.05898 20.7447 3.25526C19.941 2.45153 18.8509 2 17.7143 2H6.28571ZM3.42857 6.28571C3.42857 5.52795 3.72959 4.80123 4.26541 4.26541C4.80123 3.72959 5.52795 3.42857 6.28571 3.42857H17.7143C18.472 3.42857 19.1988 3.72959 19.7346 4.26541C20.2704 4.80123 20.5714 5.52795 20.5714 6.28571V17.7143C20.5714 18.472 20.2704 19.1988 19.7346 19.7346C19.1988 20.2704 18.472 20.5714 17.7143 20.5714H6.28571C5.52795 20.5714 4.80123 20.2704 4.26541 19.7346C3.72959 19.1988 3.42857 18.472 3.42857 17.7143V6.28571Z"
                      fill="currentColor"></path>
                    <rect x="6" y="7" width="3" height="3" rx="1.5" fill="currentColor"></rect>
                    <path
                      d="M12 8.5C12 8.08579 12.3358 7.75 12.75 7.75H17.25C17.6642 7.75 18 8.08579 18 8.5C18 8.91421 17.6642 9.25 17.25 9.25H12.75C12.3358 9.25 12 8.91421 12 8.5Z"
                      fill="currentColor"></path>
                    <rect x="6" y="14" width="3" height="3" rx="1.5" fill="currentColor"></rect>
                    <path
                      d="M12 15.5C12 15.0858 12.3358 14.75 12.75 14.75H17.25C17.6642 14.75 18 15.0858 18 15.5C18 15.9142 17.6642 16.25 17.25 16.25H12.75C12.3358 16.25 12 15.9142 12 15.5Z"
                      fill="currentColor"></path>
                  </svg>
                </a>
              </div>

              <div className="aw__njogxfr">
                <div className="aw__wghp0cg">
                  <div className="aw__neg216p">
                    <div className="aw__mpdl6d2">
                      <div
                        id="btnundefinedundefined"
                        className="aw__i8z877t"
                        onClick={() => {  
                          !IsTaikhoan ? setIsTaikhoan(true) : setIsTaikhoan(false)  
                        }}
                        style={{
                          '--i8z877t-0': '#8C8C8C',
                          '--i8z877t-6': '#222222',
                        }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="aw__m17fph8v aw__i62c49q">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.9998 4.20078C7.41584 4.20078 3.6998 7.91682 3.6998 12.5008C3.6998 17.0847 7.41584 20.8008 11.9998 20.8008C16.5838 20.8008 20.2998 17.0847 20.2998 12.5008C20.2998 7.91682 16.5838 4.20078 11.9998 4.20078ZM2.2998 12.5008C2.2998 7.14362 6.64264 2.80078 11.9998 2.80078C17.357 2.80078 21.6998 7.14362 21.6998 12.5008C21.6998 17.8579 17.357 22.2008 11.9998 22.2008C6.64264 22.2008 2.2998 17.8579 2.2998 12.5008Z"
                            fill="curentColor"></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.9998 8.70078C10.3153 8.70078 8.9498 10.0663 8.9498 11.7508C8.9498 13.4352 10.3153 14.8008 11.9998 14.8008C13.6843 14.8008 15.0498 13.4352 15.0498 11.7508C15.0498 10.0663 13.6843 8.70078 11.9998 8.70078ZM7.5498 11.7508C7.5498 9.29311 9.54214 7.30078 11.9998 7.30078C14.4575 7.30078 16.4498 9.29311 16.4498 11.7508C16.4498 14.2084 14.4575 16.2008 11.9998 16.2008C9.54214 16.2008 7.5498 14.2084 7.5498 11.7508Z"
                            fill="curentColor"></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.0001 16.2008C10.8829 16.2008 9.78747 16.5102 8.83528 17.0946C7.88309 17.6791 7.11134 18.5158 6.60557 19.512C6.43056 19.8567 6.00923 19.9943 5.66452 19.8193C5.3198 19.6443 5.18222 19.2229 5.35723 18.8782C5.98004 17.6515 6.93038 16.6211 8.10291 15.9014C9.27544 15.1817 10.6244 14.8008 12.0001 14.8008C13.3759 14.8008 14.7249 15.1817 15.8974 15.9014C17.0699 16.6211 18.0203 17.6515 18.6431 18.8782C18.8181 19.2229 18.6805 19.6443 18.3358 19.8193C17.9911 19.9943 17.5697 19.8567 17.3947 19.512C16.889 18.5158 16.1172 17.6791 15.165 17.0946C14.2128 16.5102 13.1174 16.2008 12.0001 16.2008Z"
                            fill="curentColor"></path>
                        </svg>
                        <span className="show-desktop aw__szp9uz0">  
                          {username || 'Tài khoản'}   
                        </span>
                        <svg
                          width="1rem"
                          height="1rem"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="aw__dvoj89e">
                          <path
                            d="M4.67154 5.99959C4.9323 5.74067 5.35336 5.74141 5.6132 6.00125L8.19653 8.58458L10.7863 6.00048C11.0461 5.74125 11.4668 5.74148 11.7263 6.00099C11.986 6.26071 11.986 6.68179 11.7263 6.94151L8.90364 9.76414C8.51312 10.1547 7.87995 10.1547 7.48943 9.76414L4.66987 6.94459C4.40872 6.68344 4.40947 6.25981 4.67154 5.99959Z"
                            fill="currentColor"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  {IsTaikhoan ? (
                    <div>
                      <div className="aw__m1n72bce">
                        <div className="aw__ntc1674" style={{ '--ntc1674-2': '124px' }}>
                          <Link to="/profile" rel="nofollow">
                          <span   
                          className="aw__nrouw61"   
                          style={{   
                            '--nrouw61-3': '48px',  
                            backgroundImage: `url(${avatar || './default_user.png'})`,  // Sử dụng avatar hoặc ảnh mặc định  
                          }}   
                          ></span>
                            <span className="aw__n171wcvy" style={{ '--n171wcvy-0': '8px', '--n171wcvy-1': '14px' }}>
                            {username || 'Đăng nhập / Đăng ký'}
                            </span>
                          </Link>
                          <div className="aw__v14qmieq">
                            <div className="vaBanner" role="button">
                              <div>
                                <img
                                  src="./virtual-account-banner-icon.png"
                                  alt="va_banner_icon"
                                  className="vaBannerIcon"
                                />
                                <span>Nạp Đồng Tốt giá trị linh hoạt</span>
                              </div>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g fill="#fff">
                                  <path d="M5.37301 3.12235C5.58129 2.91407 5.91893 2.91407 6.12721 3.12235L10.6273 7.62235C10.8356 7.83063 10.8356 8.16827 10.6273 8.37655L6.12721 12.8766C5.91893 13.0849 5.58129 13.0849 5.37301 12.8766C5.16473 12.6683 5.16473 12.3307 5.37301 12.1224L9.49588 7.99951L5.37301 3.87664C5.16473 3.66836 5.16473 3.33072 5.37301 3.0183Z"></path>
                                </g>
                              </svg>
                            </div>
                          </div>
                          <div className="aw__c180s9yn"></div>
                        </div>
                        {/* quan ly don hang */}
                        <div
                          label="Quản lí đơn hàng"
                          className="aw__d15qd39x"
                          style={{
                            '--d15qd39x-0': '38px',
                            '--d15qd39x-1': ' #f5f5f5',
                            '--d15qd39x-2': '10px 0 10px 12px',
                            '--d15qd39x-3': '0',
                          }}>
                          <span>Quản lí đơn hàng</span>
                        </div>
                        <div className="aw__l1txzw95">
                          <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                            <div className="aw__l1uq3g0v">
                              <img className="aw__i1x7vrum" src="./escrow_buy_orders.svg" alt="Đơn bán" />
                            </div>
                            <div className="aw__r1o9ejq6">Đơn mua</div>
                            <div className="clearfix"></div>
                          </a>
                        </div>
                        <div className="aw__l1txzw95">
                          <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                            <div className="aw__l1uq3g0v">
                              <img className="aw__i1x7vrum" src="./escrow-orders.svg" alt="Đơn bán" />
                            </div>
                            <div className="aw__r1o9ejq6">Đơn bán</div>
                            <div className="clearfix"></div>
                          </a>
                        </div>
                        <div className="aw__l1txzw95">
                          <a className="aw__iys36jq aw__ibqb3a4" href="#" target="_self" rel="noreferrer">
                            <div className="aw__l1uq3g0v">
                              <img className="aw__i1x7vrum" src="./escrow.svg" alt="Ví bán hàng" />
                            </div>
                            <div className="aw__r1o9ejq6">Ví bán hàng</div>
                            <div className="aw__r13p2z3b">
                              <b>Liên kết ngay &nbsp;</b>
                              <img src="./chervon_right_orange.svg" alt="chervon" />
                            </div>
                            <div className="clearfix"></div>
                          </a>
                        </div>
                        {/* tien ich */}
                        <div
                          label="Quản lí tiện ích"
                          className="aw__d15qd39x"
                          style={{
                            '--d15qd39x-0': '38px',
                            '--d15qd39x-1': ' #f5f5f5',
                            '--d15qd39x-2': '10px 0 10px 12px',
                            '--d15qd39x-3': '0',
                          }}>
                          <span>Tiện ích</span>
                        </div>
                        <div className="aw__l1txzw95">
                          <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                            <div className="aw__l1uq3g0v">
                              <img className="aw__i1x7vrum" src="./menu-saved-ad.svg" alt="Đơn bán" />
                            </div>
                            <div className="aw__r1o9ejq6">Tin đăng đã lưu</div>
                            <div className="clearfix"></div>
                          </a>
                        </div>
                        <div className="aw__l1txzw95">
                          <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                            <div className="aw__l1uq3g0v">
                              <img className="aw__i1x7vrum" src="./menu-saved-search.svg" alt="Đơn bán" />
                            </div>
                            <div className="aw__r1o9ejq6">Tìm kiếm đã lưu</div>
                            <div className="clearfix"></div>
                          </a>
                        </div>
                        <div className="aw__l1txzw95">
                          <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                            <div className="aw__l1uq3g0v">
                              <img className="aw__i1x7vrum" src="./menu-rating-management.svg" alt="Đơn bán" />
                            </div>
                            <div className="aw__r1o9ejq6">Đánh giá từ tôi</div>
                            <div className="clearfix"></div>
                          </a>
                        </div>
                        {/* dich vu tra phi */}
                        <div
                          label="Quản lí tiện ích"
                          className="aw__d15qd39x"
                          style={{
                            '--d15qd39x-0': '38px',
                            '--d15qd39x-1': ' #f5f5f5',
                            '--d15qd39x-2': '10px 0 10px 12px',
                            '--d15qd39x-3': '0',
                          }}>
                          <span>Dịch vụ trả phí</span>
                        </div>
                        <div className="aw__l1txzw95">
                          <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                            <div className="aw__l1uq3g0v">
                              <img className="aw__i1x7vrum" src="./sub-pro.svg" alt="Đơn bán" />
                            </div>
                            <div className="aw__r1o9ejq6">Gói PRO</div>
                            <div className="clearfix"></div>
                          </a>
                        </div>
                        <div className="aw__l1txzw95">
                          <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                            <div className="aw__l1uq3g0v">
                              <img className="aw__i1x7vrum" src="./circle-list.svg" alt="Đơn bán" />
                            </div>
                            <div className="aw__r1o9ejq6">Lịch sử giao dịch</div>
                            <div className="clearfix"></div>
                          </a>
                        </div>
                        <div className="aw__l1txzw95">
                          <a className="aw__iys36jq aw__ibqb3a4" href="#" target="_self" rel="noreferrer">
                            <div className="aw__l1uq3g0v">
                              <img className="aw__i1x7vrum" src="./shop-more.svg" alt="Ví bán hàng" />
                            </div>
                            <div className="aw__r1o9ejq6">Cửa hàng</div>
                            <div className="aw__r13p2z3b">
                              <b>Tạo ngay &nbsp;</b>
                              <img src="./chervon_right_orange.svg" alt="chervon" />
                            </div>
                            <div className="clearfix"></div>
                          </a>
                        </div>
                        {/* Uu dai khuyen mai */}
                        <div
                          label="Quản lí tiện ích"
                          className="aw__d15qd39x"
                          style={{
                            '--d15qd39x-0': '38px',
                            '--d15qd39x-1': ' #f5f5f5',
                            '--d15qd39x-2': '10px 0 10px 12px',
                            '--d15qd39x-3': '0',
                          }}>
                          <span>Ưu đãi, khuyến mãi</span>
                        </div>
                        <div className="aw__l1txzw95">
                          <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                            <div className="aw__l1uq3g0v">
                              <img className="aw__i1x7vrum" src="./reward-icon.svg" alt="Đơn bán" />
                            </div>
                            <div className="aw__r1o9ejq6">RRMS ưu đãi</div>
                            <div className="clearfix"></div>
                          </a>
                        </div>
                        <div className="aw__l1txzw95">
                          <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                            <div className="aw__l1uq3g0v">
                              <img className="aw__i1x7vrum" src="./voucher-icon.svg" alt="Đơn bán" />
                            </div>
                            <div className="aw__r1o9ejq6">Ưu đãi của tôi</div>
                            <div className="clearfix"></div>
                          </a>
                        </div>
                        {/* khac */}
                        <div
                          label="Quản lí tiện ích"
                          className="aw__d15qd39x"
                          style={{
                            '--d15qd39x-0': '38px',
                            '--d15qd39x-1': ' #f5f5f5',
                            '--d15qd39x-2': '10px 0 10px 12px',
                            '--d15qd39x-3': '0',
                          }}>
                          <span>Khác</span>
                        </div>
                        <div className="aw__l1txzw95">
                          <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                            <div className="aw__l1uq3g0v">
                              <img className="aw__i1x7vrum" src="./setting.svg" alt="Đơn bán" />
                            </div>
                            <div className="aw__r1o9ejq6">Cài đặt tài khoản</div>
                            <div className="clearfix"></div>
                          </a>
                        </div>
                        <div className="aw__l1txzw95">
                          <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                            <div className="aw__l1uq3g0v">
                              <img className="aw__i1x7vrum" src="./setting.svg" alt="Đơn bán" />
                            </div>
                            <div className="aw__r1o9ejq6">Trợ giúp</div>
                            <div className="clearfix"></div>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* con them 1 icon o day  */}
            </div>
            <a
              className="aw__b1358qut primary r-normal medium w-bold i-left aw__h1gb9yk aw__p1hqie6d"
              href="/quanlytro"
              rel="nofollow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-type="monochrome"
                viewBox="0 0 23.228 23.227"
                width="1em"
                height="1em"
                fill="none">
                <path
                  d="M13.288 0a.759.759 0 110 1.518H3.396a1.88 1.88 0 00-1.877 1.877v16.438a1.88 1.88 0 001.877 1.877h16.437a1.88 1.88 0 001.877-1.877V9.488a.76.76 0 011.518 0v10.344a3.399 3.399 0 01-3.395 3.395H3.396A3.4 3.4 0 010 19.832V3.395A3.4 3.4 0 013.396 0zm6.022.21c.273-.1.564-.078.835-.038.276.042.57.205.83.461l.54.54 1.117 1.117c.24.24.394.497.46.766a1.68 1.68 0 01-.4 1.545l-.058.062c-.344.352-.7.707-1.048 1.05l-.631.63-6.33 6.328-.488.493-.038.04c-.307.31-.621.628-.939.932-.153.148-.339.219-.619.236l-3.014.184h-.03a.719.719 0 01-.484-.218c-.158-.156-.249-.358-.24-.543l.135-3.097c.016-.253.095-.443.248-.598l.157-.16.003-.002.082-.081 5.416-5.415a719.16 719.16 0 011.747-1.745l1.68-1.682c.144-.146.27-.275.397-.396a1.8 1.8 0 01.672-.408zm.493 1.428l-.221.219c-.153.151-.306.305-.457.456l-.536.537-8.151 8.152-.086 1.957 1.906-.115.312-.312.226-.224.05-.049.385-.38 8.401-8.403-1.211-1.209a8.233 8.233 0 01-.172-.175l-.027-.029c-.065-.068-.13-.137-.2-.206l-.22-.219z"
                  fill="currentColor"></path>
              </svg>
              ĐĂNG TIN
            </a>
          </div>
        </div>
        <div className="init aw__s1bb4p92">
          <ul className="aw__m3xdfsg">
            <li id="btn-home-app-wrapper" className="aw__m15ofxwr">
              <div className="hover aw__n1d92bwe hideIP5">
                <span>
                  <a
                    className="aw__n1wd6yn1 aw__iwanj6m"
                    href="#"
                    rel="nofollow"
                    color="#8C8C8C"
                    style={{
                      '--iwanj6m-0': '#8C8C8C',
                      '--iwanj6m-7': '#8C8C8C',
                    }}>
                    <svg
                      width="29"
                      height="28"
                      viewBox="0 0 29 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="aw__ilmcmff aw__ilmcmff--active"
                      color="#4bcffa">
                      <path
                        d="M14.7343 2.5C14.9171 2.5 15.0938 2.56527 15.2327 2.68405L25.966 11.884C26.1359 12.0297 26.2343 12.2429 26.2343 12.4667V23.2C26.2343 23.81 25.992 24.395 25.5607 24.8263C25.1293 25.2577 24.5443 25.5 23.9343 25.5H17.801C17.5977 25.5 17.4027 25.4192 17.2589 25.2754C17.1151 25.1317 17.0343 24.9367 17.0343 24.7333V20.1333C17.0343 19.5233 16.792 18.9383 16.3607 18.507C15.9294 18.0757 15.3443 17.8333 14.7343 17.8333C14.1244 17.8333 13.5393 18.0757 13.108 18.507C12.6767 18.9383 12.4344 19.5233 12.4344 20.1333V24.7333C12.4344 24.9367 12.3536 25.1317 12.2098 25.2754C12.066 25.4192 11.871 25.5 11.6677 25.5H5.53437C4.92437 25.5 4.33936 25.2577 3.90803 24.8263C3.4767 24.395 3.23438 23.81 3.23438 23.2V12.4667C3.23438 12.2429 3.33276 12.0297 3.50271 11.884L14.236 2.68405C14.3749 2.56527 14.5516 2.5 14.7343 2.5Z"
                        fill="#4bcffa"></path>
                    </svg>
                    <span
                      className="aw__c62n85z show-mobile aw__szp9uz0"
                      color="#4bcffa"
                      style={{
                        '--szp9uz0-1': 'inherit',
                        '--szp9uz0-9': '#4bcffa',
                      }}>
                      Trang chủ
                    </span>
                  </a>
                </span>
              </div>
            </li>
            <li className="aw__m15ofxwr">
              <div className="aw__n1d92bwe">
                <a
                  href="#"
                  color="#8C8C8C"
                  rel="nofollow"
                  className="aw__iwanj6m"
                  style={{
                    '--iwanj6m-0': '#8C8C8C',
                    '--iwanj6m-7': '#8C8C8C',
                  }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="aw__irp38gy">
                    <path
                      d="M6.28571 2C5.14907 2 4.05898 2.45153 3.25526 3.25526C2.45153 4.05898 2 5.14907 2 6.28571V17.7143C2 18.8509 2.45153 19.941 3.25526 20.7447C4.05898 21.5485 5.14907 22 6.28571 22H17.7143C18.8509 22 19.941 21.5485 20.7447 20.7447C21.5485 19.941 22 18.8509 22 17.7143V6.28571C22 5.14907 21.5485 4.05898 20.7447 3.25526C19.941 2.45153 18.8509 2 17.7143 2H6.28571ZM3.42857 6.28571C3.42857 5.52795 3.72959 4.80123 4.26541 4.26541C4.80123 3.72959 5.52795 3.42857 6.28571 3.42857H17.7143C18.472 3.42857 19.1988 3.72959 19.7346 4.26541C20.2704 4.80123 20.5714 5.52795 20.5714 6.28571V17.7143C20.5714 18.472 20.2704 19.1988 19.7346 19.7346C19.1988 20.2704 18.472 20.5714 17.7143 20.5714H6.28571C5.52795 20.5714 4.80123 20.2704 4.26541 19.7346C3.72959 19.1988 3.42857 18.472 3.42857 17.7143V6.28571Z"
                      fill="currentColor"></path>
                    <rect x="6" y="7" width="3" height="3" rx="1.5" fill="currentColor"></rect>
                    <path
                      d="M12 8.5C12 8.08579 12.3358 7.75 12.75 7.75H17.25C17.6642 7.75 18 8.08579 18 8.5C18 8.91421 17.6642 9.25 17.25 9.25H12.75C12.3358 9.25 12 8.91421 12 8.5Z"
                      fill="currentColor"></path>
                    <rect x="6" y="14" width="3" height="3" rx="1.5" fill="currentColor"></rect>
                    <path
                      d="M12 15.5C12 15.0858 12.3358 14.75 12.75 14.75H17.25C17.6642 14.75 18 15.0858 18 15.5C18 15.9142 17.6642 16.25 17.25 16.25H12.75C12.3358 16.25 12 15.9142 12 15.5Z"
                      fill="currentColor"></path>
                  </svg>
                  <span
                    className="aw__c1rviyfj show-mobile aw__szp9uz0"
                    color="#8c8c8c"
                    style={{
                      '--szp9uz0-1': 'inherit',
                      '--szp9uz0-9': '#8c8c8c',
                    }}>
                    Quản lý tin
                  </span>
                </a>
              </div>
            </li>
            <li className="aw__m15ofxwr">
              <div className="aw__ctbygyd">
                <picture>
                  <source type="image/svg+xml" srcSet="./combined-shape.svg" />
                  <img height="19" width="70" className="" src="./combined-shape.svg" alt="Đăng tin" />
                </picture>
              </div>
              <div className="aw__p1pzfxaa"></div>
              <div className="aw__n1d92bwe">
                <a className="aw__irwb6u7" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-type="monochrome"
                    viewBox="0 0 23.228 23.227"
                    width="1em"
                    height="1em"
                    fill="none"
                    className="aw__ibq207s aw__ibq207s--primary2">
                    <path
                      d="M13.288 0a.759.759 0 110 1.518H3.396a1.88 1.88 0 00-1.877 1.877v16.438a1.88 1.88 0 001.877 1.877h16.437a1.88 1.88 0 001.877-1.877V9.488a.76.76 0 011.518 0v10.344a3.399 3.399 0 01-3.395 3.395H3.396A3.4 3.4 0 010 19.832V3.395A3.4 3.4 0 013.396 0zm6.022.21c.273-.1.564-.078.835-.038.276.042.57.205.83.461l.54.54 1.117 1.117c.24.24.394.497.46.766a1.68 1.68 0 01-.4 1.545l-.058.062c-.344.352-.7.707-1.048 1.05l-.631.63-6.33 6.328-.488.493-.038.04c-.307.31-.621.628-.939.932-.153.148-.339.219-.619.236l-3.014.184h-.03a.719.719 0 01-.484-.218c-.158-.156-.249-.358-.24-.543l.135-3.097c.016-.253.095-.443.248-.598l.157-.16.003-.002.082-.081 5.416-5.415a719.16 719.16 0 011.747-1.745l1.68-1.682c.144-.146.27-.275.397-.396a1.8 1.8 0 01.672-.408zm.493 1.428l-.221.219c-.153.151-.306.305-.457.456l-.536.537-8.151 8.152-.086 1.957 1.906-.115.312-.312.226-.224.05-.049.385-.38 8.401-8.403-1.211-1.209a8.233 8.233 0 01-.172-.175l-.027-.029c-.065-.068-.13-.137-.2-.206l-.22-.219z"
                      fill="currentColor"></path>
                  </svg>
                  <span
                    className="show-mobile aw__szp9uz0"
                    style={{
                      '--szp9uz0-1': 'inherit',
                      '--szp9uz0-9': '#000',
                      color: '#fff',
                    }}>
                    Đăng tin
                  </span>
                </a>
              </div>
            </li>
            <li className="aw__m15ofxwr">
              <div className="hover aw__naus9sk">
                <div className="aw__m14bta8d">
                  <div
                    color="#8C8C8C"
                    id="btnundefined"
                    className="aw__i8z877t"
                    onClick={() => {
                      !IsThongbao ? setIsThongbao(true) : setIsThongbao(false)
                    }}
                    style={{
                      '--iwanj6m-0': '#8C8C8C',
                      '--iwanj6m-7': '#8C8C8C',
                    }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="aw__ie1ow2r">
                      <g clipPath="url(#clip0_5790_635)">
                        <g clipPath="url(#clip1_5790_635)">
                          <path
                            d="M19.4045 18.7012H4.58447C4.33116 18.6997 4.08267 18.6319 3.86373 18.5044C3.64479 18.377 3.46306 18.1945 3.33662 17.975C3.21018 17.7555 3.14344 17.5067 3.14307 17.2534C3.14269 17.0001 3.20868 16.7511 3.33447 16.5312C4.25656 14.6713 4.68036 12.6039 4.56447 10.5312V9.75119C4.56208 8.76941 4.75587 7.79705 5.13447 6.89119C5.50399 5.9826 6.05527 5.15909 6.75447 4.47119C7.44834 3.77705 8.27473 3.22952 9.18447 2.86119C10.0896 2.48125 11.0629 2.29067 12.0445 2.30119C14.0179 2.33276 15.8994 3.14096 17.2809 4.55055C18.6624 5.96015 19.4326 7.8575 19.4245 9.83119V10.5012C19.3053 12.5742 19.7293 14.6423 20.6545 16.5012C20.7789 16.7226 20.8442 16.9723 20.8442 17.2262C20.8442 17.4801 20.7789 17.7298 20.6545 17.9512C20.5307 18.1738 20.3494 18.359 20.1295 18.4874C19.9096 18.6159 19.6591 18.6828 19.4045 18.6812V18.7012ZM11.9945 3.70119C11.2051 3.70057 10.4234 3.85571 9.69411 4.15773C8.96481 4.45974 8.30228 4.90269 7.74447 5.46119C7.17636 6.03386 6.72767 6.71369 6.42447 7.46119C6.13287 8.1891 5.98679 8.9671 5.99447 9.75119V9.75119V10.5012C6.11944 12.8302 5.62973 15.1512 4.57447 17.2312L19.4345 17.3012C18.4083 15.1855 17.914 12.8513 17.9945 10.5012V9.83119C18 8.22614 17.3737 6.68338 16.251 5.53633C15.1283 4.38928 13.5993 3.73008 11.9945 3.70119V3.70119Z"
                            fill="currentColor"></path>
                          <path
                            d="M11.9945 22.4508C11.5081 22.4529 11.0261 22.3585 10.5764 22.1731C10.1267 21.9877 9.71819 21.715 9.37453 21.3708C8.68295 20.6741 8.29475 19.7324 8.29453 18.7508V18.0008C8.29453 17.8151 8.36827 17.6371 8.49955 17.5058C8.63083 17.3745 8.80887 17.3008 8.99452 17.3008C9.18018 17.3008 9.35822 17.3745 9.4895 17.5058C9.62078 17.6371 9.69452 17.8151 9.69452 18.0008V18.7508C9.69584 19.3609 9.9364 19.9461 10.3645 20.3808C10.8081 20.7912 11.3902 21.0192 11.9945 21.0192C12.5989 21.0192 13.181 20.7912 13.6245 20.3808C14.0526 19.9461 14.2932 19.3609 14.2945 18.7508V18.0008C14.2945 17.8151 14.3683 17.6371 14.4995 17.5058C14.6308 17.3745 14.8089 17.3008 14.9945 17.3008C15.1802 17.3008 15.3582 17.3745 15.4895 17.5058C15.6208 17.6371 15.6945 17.8151 15.6945 18.0008V18.7508C15.6958 19.237 15.601 19.7188 15.4156 20.1683C15.2301 20.6178 14.9576 21.0262 14.6138 21.37C14.2699 21.7139 13.8615 21.9863 13.412 22.1718C12.9625 22.3573 12.4808 22.4521 11.9945 22.4508Z"
                            fill="currentColor"></path>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_5790_635">
                          <rect width="24" height="24" fill="white"></rect>
                        </clipPath>
                        <clipPath id="clip1_5790_635">
                          <rect width="17.71" height="20.15" fill="white" transform="translate(3.14453 2.30078)"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    <span
                      className="aw__c18bn5vq show-mobile aw__szp9uz0"
                      color="#8c8c8c"
                      style={{
                        '--szp9uz0-1': 'inherit',
                        '--szp9uz0-9': '#8c8c8c',
                      }}>
                      Thông báo
                    </span>
                  </div>
                  <div></div>
                </div>
              </div>
            </li>
            <li className="aw__m15ofxwr">
              <div className="aw__wghp0cg">
                <div className="aw__neg216p">
                  <div className="aw__mpdl6d2">
                    <div
                      id="btnundefinedundefined"
                      className="aw__i8z877t"
                      onClick={() => {
                        !IsMobileTaikhoan ? setIsMobileTaikhoan(true) : setIsMobileTaikhoan(false)
                      }}
                      style={{
                        '--iwanj6m-0': '#8C8C8C',
                        '--iwanj6m-7': '#8C8C8C',
                      }}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="aw__m17fph8v aw__i62c49q">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.9998 4.20078C7.41584 4.20078 3.6998 7.91682 3.6998 12.5008C3.6998 17.0847 7.41584 20.8008 11.9998 20.8008C16.5838 20.8008 20.2998 17.0847 20.2998 12.5008C20.2998 7.91682 16.5838 4.20078 11.9998 4.20078ZM2.2998 12.5008C2.2998 7.14362 6.64264 2.80078 11.9998 2.80078C17.357 2.80078 21.6998 7.14362 21.6998 12.5008C21.6998 17.8579 17.357 22.2008 11.9998 22.2008C6.64264 22.2008 2.2998 17.8579 2.2998 12.5008Z"
                          fill="curentColor"></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.9998 8.70078C10.3153 8.70078 8.9498 10.0663 8.9498 11.7508C8.9498 13.4352 10.3153 14.8008 11.9998 14.8008C13.6843 14.8008 15.0498 13.4352 15.0498 11.7508C15.0498 10.0663 13.6843 8.70078 11.9998 8.70078ZM7.5498 11.7508C7.5498 9.29311 9.54214 7.30078 11.9998 7.30078C14.4575 7.30078 16.4498 9.29311 16.4498 11.7508C16.4498 14.2084 14.4575 16.2008 11.9998 16.2008C9.54214 16.2008 7.5498 14.2084 7.5498 11.7508Z"
                          fill="curentColor"></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.0001 16.2008C10.8829 16.2008 9.78747 16.5102 8.83528 17.0946C7.88309 17.6791 7.11134 18.5158 6.60557 19.512C6.43056 19.8567 6.00923 19.9943 5.66452 19.8193C5.3198 19.6443 5.18222 19.2229 5.35723 18.8782C5.98004 17.6515 6.93038 16.6211 8.10291 15.9014C9.27544 15.1817 10.6244 14.8008 12.0001 14.8008C13.3759 14.8008 14.7249 15.1817 15.8974 15.9014C17.0699 16.6211 18.0203 17.6515 18.6431 18.8782C18.8181 19.2229 18.6805 19.6443 18.3358 19.8193C17.9911 19.9943 17.5697 19.8567 17.3947 19.512C16.889 18.5158 16.1172 17.6791 15.165 17.0946C14.2128 16.5102 13.1174 16.2008 12.0001 16.2008Z"
                          fill="curentColor"></path>
                      </svg>
                      <span
                        className="show-mobile aw__szp9uz0"
                        color="#8C8C8C"
                        style={{
                          '--szp9uz0-1': 'inherit',
                          '--szp9uz0-9': '#8c8c8c',
                        }}></span>
                    </div>
                  </div>
                </div>
              </div>
              <span
                className="show-mobile aw__szp9uz0"
                color="#8c8c8c"
                style={{
                  '--szp9uz0-1': 'inherit',
                  '--szp9uz0-9': '#8c8c8c',
                }}>
                Tài khoản
              </span>
            </li>
          </ul>
        </div>

        {/* cua thong bao */}
        {IsThongbao ? (
          <div className="aw__n1dpqln2" style={{ '--n1dpqln2-5': '52px', '--n1dpqln2-10': '0px' }}>
            <div className="aw__c1k14z0n" style={{ '--c1k14z0n-0': 'block' }}>
              <div className="aw__c4xob3k">
                <div className="nav-tabs" role="tablist">
                  <ul className="aw__tx9tvdd" aria-label="notification" role="tablist">
                    <li className="aw__t1if84jm active">
                      <span className="aw__ix37719" tabIndex="-1" data-bs-toggle="tab" href="#hoatdong">
                        HOẠT ĐỘNG
                      </span>
                    </li>
                    <li className="aw__t1if84jm">
                      <span className="aw__ix37719" tabIndex="-1" data-bs-toggle="tab" href="#tinmoi">
                        TIN MỚI
                      </span>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane" id="hoatdong">
                      <div className="aw__t1ockekz">
                        <div>Vui lòng đăng nhập để xem danh sách hoạt động.</div>
                        <Link
                          className="aw__b1lvk31j button r-normal medium w-bold"
                          to="/login"
                          target=""
                          color="accent"
                          rel="nofollow">
                          Đăng ký / Đăng nhập
                        </Link>
                      </div>
                    </div>
                    <div className="tab-pane" id="tinmoi">
                      <div className="aw__t1ockekz">
                        <div id="nonenews" className="aw__t8lgh8j">
                          Chúng tôi không có cập nhật nào. Vui lòng kiểm tra lại sau
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* cua tai khoan mobile*/}
        {IsMobileTaikhoan ? (
          <div
            className="aw__mos124i"
            style={{ '--mos124i-6': 'calc(100px + var(--app-wrapper-extra-height,   0px))' }}>
            <div className="more-content">
              <div className="aw__ntc1674" style={{ '--ntc1674-2': '140px' }}>
                <Link to="/login" rel="nofollow">
                  <span className="aw__nrouw61" style={{ '--nrouw61-3': '64px' }}></span>
                  <span className="aw__n171wcvy" style={{ '--n171wcvy-0': '12px', '--n171wcvy-1': '24px' }}>
                    Đăng nhập / Đăng ký
                  </span>
                </Link>
                <div className="aw__v14qmieq">
                  <div className="vaBanner" role="button">
                    <div>
                      <img src="./virtual-account-banner-icon.png" alt="va_banner_icon" className="vaBannerIcon" />
                      <span>Nạp Đồng Tốt giá trị linh hoạt</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g fill="#fff">
                        <path d="M5.37301 3.12235C5.58129 2.91407 5.91893 2.91407 6.12721 3.12235L10.6273 7.62235C10.8356 7.83063 10.8356 8.16827 10.6273 8.37655L6.12721 12.8766C5.91893 13.0849 5.58129 13.0849 5.37301 12.8766C5.16473 12.6683 5.16473 12.3307 5.37301 12.1224L9.49588 7.99951L5.37301 3.87664C5.16473 3.66836 5.16473 3.33072 5.37301 3.0183Z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              {/* quan ly don hang */}
              <div
                label="Quản lí đơn hàng"
                className="aw__d15qd39x"
                style={{
                  '--d15qd39x-0': '42px',
                  '--d15qd39x-1': ' #f5f5f5',
                  '--d15qd39x-2': '10px 0 10px 12px',
                  '--d15qd39x-3': '0',
                }}>
                <span>Quản lí đơn hàng</span>
              </div>
              <div className="aw__ma2dsz4">
                <a
                  className="aw__iys36jq mobile"
                  href="https://www.chotot.com/escrow/my-orders/identity/buyer?site=referrer&amp;continue=https%3A%2F%2Fwww.nhatot.com%2F%3Futm_medium%3Dpaid_search%26utm_source%3Dgoogle_search%26utm_campaign%3Dbrand_impr_pty_dsa_search%26utm_content%3Dnh%25C3%25A0%2520t%25E1%25BB%2591t%26gad_source%3D1%26%25243p%3Da_google_adwords%26%2524always_deeplink%3Dfalse%26gclid%3DCj0KCQjwr9m3BhDHARIsANut04ZOeCbP4ZubiLEHkdmEfbVDFzuioB_RLFElVlGG__Tyak-Ikg8YiisaAhAFEALw_wcB%26~branch_ad_format%3DCross-platform%2520Search%26~feature%3Dpaid%2520advertising%26~channel%3Dgoogle_search%26~campaign%3Dbrand_impr_pty_dsa_search%26~campaign_id%3D21605990100%26~ad_set_id%3D161563057130%26~keyword%3Dnh%25C3%25A0%2520t%25E1%25BB%2591t%26~placement%26%2524deeplink_path%3Dhttps%253A%252F%252Fwww.nhatot.com%252F%253Futm_medium%253Dpaid_search%2526utm_source%253Dgoogle_search%2526utm_campaign%253Dbrand_impr_pty_dsa_search%2526utm_content%253Dnh%2525C3%2525A0%252520t%2525E1%2525BB%252591t%2526gad_source%253D1%26_branch_match_id%3D1293117567127414303"
                  target="_self"
                  rel="noreferrer">
                  <div className="aw__l1uq3g0v">
                    <img className="aw__i1x7vrum" src="./escrow_buy_orders.svg" alt="Đơn mua" />
                  </div>
                  <div className="aw__r1o9ejq6">Đơn mua</div>
                  <div className="clearfix"></div>
                </a>
              </div>
              <div className="aw__ma2dsz4">
                <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                  <div className="aw__l1uq3g0v">
                    <img className="aw__i1x7vrum" src="./escrow-orders.svg" alt="Đơn bán" />
                  </div>
                  <div className="aw__r1o9ejq6">Đơn bán</div>
                  <div className="clearfix"></div>
                </a>
              </div>
              <div className="aw__ma2dsz4">
                <a className="aw__iys36jq aw__ibqb3a4" href="#" target="_self" rel="noreferrer">
                  <div className="aw__l1uq3g0v">
                    <img className="aw__i1x7vrum" src="./escrow.svg" alt="Ví bán hàng" />
                  </div>
                  <div className="aw__r1o9ejq6">Ví bán hàng</div>
                  <div className="aw__r13p2z3b">
                    <b>Liên kết ngay &nbsp;</b>
                    <img src="./chervon_right_orange.svg" alt="chervon" />
                  </div>
                  <div className="clearfix"></div>
                </a>
              </div>
              {/* tien ich */}
              <div
                label="Quản lí tiện ích"
                className="aw__d15qd39x"
                style={{
                  '--d15qd39x-0': '42px',
                  '--d15qd39x-1': ' #f5f5f5',
                  '--d15qd39x-2': '10px 0 10px 12px',
                  '--d15qd39x-3': '0',
                }}>
                <span>Tiện ích</span>
              </div>
              <div className="aw__ma2dsz4">
                <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                  <div className="aw__l1uq3g0v">
                    <img className="aw__i1x7vrum" src="./menu-saved-ad.svg" alt="Đơn bán" />
                  </div>
                  <div className="aw__r1o9ejq6">Tin đăng đã lưu</div>
                  <div className="clearfix"></div>
                </a>
              </div>
              <div className="aw__ma2dsz4">
                <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                  <div className="aw__l1uq3g0v">
                    <img className="aw__i1x7vrum" src="./menu-saved-search.svg" alt="Đơn bán" />
                  </div>
                  <div className="aw__r1o9ejq6">Tìm kiếm đã lưu</div>
                  <div className="clearfix"></div>
                </a>
              </div>
              <div className="aw__ma2dsz4">
                <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                  <div className="aw__l1uq3g0v">
                    <img className="aw__i1x7vrum" src="./menu-rating-management.svg" alt="Đơn bán" />
                  </div>
                  <div className="aw__r1o9ejq6">Đánh giá từ tôi</div>
                  <div className="clearfix"></div>
                </a>
              </div>
              {/* dich vu tra phi */}
              <div
                label="Quản lí tiện ích"
                className="aw__d15qd39x"
                style={{
                  '--d15qd39x-0': '38px',
                  '--d15qd39x-1': ' #f5f5f5',
                  '--d15qd39x-2': '10px 0 10px 12px',
                  '--d15qd39x-3': '0',
                }}>
                <span>Dịch vụ trả phí</span>
              </div>
              <div className="aw__ma2dsz4">
                <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                  <div className="aw__l1uq3g0v">
                    <img className="aw__i1x7vrum" src="./sub-pro.svg" alt="Đơn bán" />
                  </div>
                  <div className="aw__r1o9ejq6">Gói PRO</div>
                  <div className="clearfix"></div>
                </a>
              </div>
              <div className="aw__ma2dsz4">
                <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                  <div className="aw__l1uq3g0v">
                    <img className="aw__i1x7vrum" src="./circle-list.svg" alt="Đơn bán" />
                  </div>
                  <div className="aw__r1o9ejq6">Lịch sử giao dịch</div>
                  <div className="clearfix"></div>
                </a>
              </div>
              <div className="aw__ma2dsz4">
                <a className="aw__iys36jq aw__ibqb3a4" href="#" target="_self" rel="noreferrer">
                  <div className="aw__l1uq3g0v">
                    <img className="aw__i1x7vrum" src="./shop-more.svg" alt="Ví bán hàng" />
                  </div>
                  <div className="aw__r1o9ejq6">Cửa hàng</div>
                  <div className="aw__r13p2z3b">
                    <b>Tạo ngay &nbsp;</b>
                    <img src="./chervon_right_orange.svg" alt="chervon" />
                  </div>
                  <div className="clearfix"></div>
                </a>
              </div>

              {/* Uu dai khuyen mai */}
              <div
                label="Quản lí tiện ích"
                className="aw__d15qd39x"
                style={{
                  '--d15qd39x-0': '42px',
                  '--d15qd39x-1': ' #f5f5f5',
                  '--d15qd39x-2': '10px 0 10px 12px',
                  '--d15qd39x-3': '0',
                }}>
                <span>Ưu đãi, khuyến mãi</span>
              </div>
              <div className="aw__ma2dsz4">
                <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                  <div className="aw__l1uq3g0v">
                    <img className="aw__i1x7vrum" src="./reward-icon.svg" alt="Đơn bán" />
                  </div>
                  <div className="aw__r1o9ejq6">RRMS ưu đãi</div>
                  <div className="clearfix"></div>
                </a>
              </div>
              <div className="aw__ma2dsz4">
                <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                  <div className="aw__l1uq3g0v">
                    <img className="aw__i1x7vrum" src="./voucher-icon.svg" alt="Đơn bán" />
                  </div>
                  <div className="aw__r1o9ejq6">Ưu đãi của tôi</div>
                  <div className="clearfix"></div>
                </a>
              </div>
              {/* khac */}
              <div
                label="Quản lí tiện ích"
                className="aw__d15qd39x"
                style={{
                  '--d15qd39x-0': '38px',
                  '--d15qd39x-1': ' #f5f5f5',
                  '--d15qd39x-2': '10px 0 10px 12px',
                  '--d15qd39x-3': '0',
                }}>
                <span>Khác</span>
              </div>
              <div className="aw__ma2dsz4">
                <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                  <div className="aw__l1uq3g0v">
                    <img className="aw__i1x7vrum" src="./setting.svg" alt="Đơn bán" />
                  </div>
                  <div className="aw__r1o9ejq6">Cài đặt tài khoản</div>
                  <div className="clearfix"></div>
                </a>
              </div>
              <div className="aw__ma2dsz4">
                <a className="aw__iys36jq" href="#" target="_self" rel="noreferrer">
                  <div className="aw__l1uq3g0v">
                    <img className="aw__i1x7vrum" src="./setting.svg" alt="Đơn bán" />
                  </div>
                  <div className="aw__r1o9ejq6">Trợ giúp</div>
                  <div className="clearfix"></div>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </header>

      {/* header  Respone                    */}
      <div className="aw__s575q7c" style={{ '--s575q7c-0': '#fff', '--s575q7c-1': '52px' }}>
        <div className="aw__lx9c9yk">
          <div className="aw__sylyxqn">
            <div className="aw__sm0onfn">
              <div className="aw__s1wdsl35">
                <div>
                  <div className="aw__slq94yq" style={{ '--slq94yq-4': '#f4f4f4', '--s575q7c-1': '52px' }}>
                    <div id="autoComplete">
                      <div className="aw__d1g2y39b">
                        <div className="aw__s7k33ul">
                          {/* dropdown voi cai icon o duoi */}
                          <div aria-label="Search Button" role="button" className="aw__s1idqica">
                            {/* dong mua ban o day ne */}
                            <div
                              className="drop-down aw__d1x4wh9a"
                              style={{ '--d1x4wh9a-0': '#f4f4f4' }}
                              onClick={() => {
                                !IsMuaban ? setIsMuaban(true) : setIsMuaban(false)
                              }}>
                              <div className="drop-down--text">Mua bán</div>
                              <span className="drop-down--icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16">
                                  <g fill="none" fillRule="evenodd">
                                    <path
                                      fill="#000"
                                      d="M6 6L11 11.5 1 11.5z"
                                      opacity=".8"
                                      transform="matrix(1 0 0 -1 0 17.5)"></path>
                                    <path stroke="#FFF" strokeWidth=".1" d="M0 0H12V16H0z" opacity=".01"></path>
                                  </g>
                                </svg>
                              </span>
                              <span className="aw__d1ohzzqu"></span>
                              {IsMuaban ? (
                                <div>
                                  <div className="aw__d66o4xd" style={{ '--d66o4xd-0': 'flex' }}>
                                    <div className="aw__d1es5zbd">
                                      Mua bán{' '}
                                      <svg
                                        data-type="monochrome"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 12"
                                        width="1em"
                                        height="1em"
                                        fill="none">
                                        <path
                                          fill="currentColor"
                                          d="M6.096 12L0 6.154l2.104-2.04 3.935 3.773L13.839 0 16 1.986z"></path>
                                      </svg>
                                    </div>
                                    <div className="aw__d1es5zbd">Cho thuê </div>
                                    <div className="aw__d1es5zbd">Dự án </div>
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                            {/* cai icon search o day */}
                            <div className="btn-search-icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                data-type="monochrome"
                                viewBox="0 0 16 16"
                                width="1em"
                                height="1em"
                                fill="none">
                                <path
                                  fill="currentColor"
                                  d="M6.4 0a6.369 6.369 0 00-4.525 1.873A6.425 6.425 0 00.502 3.906v.002A6.383 6.383 0 000 6.398a6.372 6.372 0 001.875 4.524 6.385 6.385 0 008.428.537l-.006.006 4.295 4.293a.827.827 0 001.166-1.166l-4.295-4.295a6.368 6.368 0 00-.537-8.424A6.372 6.372 0 006.4 0zm0 1.615a4.75 4.75 0 013.383 1.4c.44.44.785.95 1.028 1.522h-.002c.249.59.377 1.214.377 1.861 0 .648-.128 1.27-.377 1.862h.002a4.783 4.783 0 01-2.55 2.545c-.59.25-1.213.377-1.86.377a4.761 4.761 0 01-1.864-.377A4.749 4.749 0 013.016 9.78c-.44-.44-.783-.95-1.024-1.521a4.735 4.735 0 01-.377-1.862c0-.647.127-1.272.377-1.863a4.75 4.75 0 011.024-1.52 4.754 4.754 0 013.384-1.4z"></path>
                              </svg>
                            </div>
                          </div>
                          {/* cai the input o duoi day */}
                          <div
                            value=""
                            className="aw__ah4jb82"
                            style={{
                              '--ah4jb82-2': 'undefined',
                              '--ah4jb82-6': '35px',
                            }}></div>
                          <input
                            type="text"
                            autoComplete="off"
                            placeholder="Bất động sản"
                            id="__inputItemProps"
                            className="aw__t16o28i7"
                            style={{
                              '--t16o28i7-3': '36px',
                              '--t16o28i7-5': '#f4f4f4',
                              '--t16o28i7-6': '124px',
                              '--t16o28i7-8': '144px',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* icon chat và app o doi day */}
              <a className="aw__n1u3b0ub" href="#" rel="nofollow" aria-label="chat">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="aw__ih32wb2">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.7499 4.34844C3.71012 4.34844 3.67197 4.36424 3.64384 4.39237C3.61571 4.4205 3.5999 4.45866 3.5999 4.49844V15.2422L6.33529 13.0318C6.44205 12.9455 6.57515 12.8984 6.7124 12.8984H15.7499C15.7897 12.8984 15.8278 12.8826 15.856 12.8545C15.8841 12.8264 15.8999 12.7882 15.8999 12.7484V4.49844C15.8999 4.45865 15.8841 4.4205 15.856 4.39237C15.8278 4.36424 15.7897 4.34844 15.7499 4.34844H3.7499ZM2.79531 3.54384C3.04848 3.29067 3.39186 3.14844 3.7499 3.14844H15.7499C16.1079 3.14844 16.4513 3.29067 16.7045 3.54384C16.9577 3.79702 17.0999 4.1404 17.0999 4.49844V12.7484C17.0999 13.1065 16.9577 13.4499 16.7045 13.703C16.4513 13.9562 16.1079 14.0984 15.7499 14.0984H6.92453L3.37701 16.9651C3.19721 17.1104 2.94992 17.1395 2.74132 17.0399C2.53271 16.9402 2.3999 16.7296 2.3999 16.4984V4.49844C2.3999 4.14039 2.54213 3.79702 2.79531 3.54384Z"
                    fill="#222222"></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.8999 8.24844C15.8999 7.91707 16.1685 7.64844 16.4999 7.64844H20.2499C20.6079 7.64844 20.9513 7.79067 21.2045 8.04384C21.4577 8.29702 21.5999 8.6404 21.5999 8.99844V20.9984C21.5999 21.2296 21.4671 21.4402 21.2585 21.5399C21.0499 21.6395 20.8026 21.6104 20.6228 21.4651L17.0753 18.5984H8.2499C7.89186 18.5984 7.54848 18.4562 7.29531 18.203C7.04213 17.9499 6.8999 17.6065 6.8999 17.2484V13.4984C6.8999 13.1671 7.16853 12.8984 7.4999 12.8984C7.83127 12.8984 8.0999 13.1671 8.0999 13.4984V17.2484C8.0999 17.2882 8.11571 17.3264 8.14384 17.3545C8.17197 17.3826 8.21012 17.3984 8.2499 17.3984H17.2874C17.4247 17.3984 17.5578 17.4455 17.6645 17.5318L20.3999 19.7422V8.99844C20.3999 8.95865 20.3841 8.9205 20.356 8.89237C20.3278 8.86424 20.2897 8.84844 20.2499 8.84844H16.4999C16.1685 8.84844 15.8999 8.57981 15.8999 8.24844Z"
                    fill="#222222"></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.7998 7.23047C6.7998 6.95433 6.99168 6.73047 7.22838 6.73047H12.3712C12.6079 6.73047 12.7998 6.95433 12.7998 7.23047C12.7998 7.50661 12.6079 7.73047 12.3712 7.73047H7.22838C6.99168 7.73047 6.7998 7.50661 6.7998 7.23047Z"
                    fill="#222222"></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.7998 10.2305C6.7998 9.95433 6.99168 9.73047 7.22838 9.73047H12.3712C12.6079 9.73047 12.7998 9.95433 12.7998 10.2305C12.7998 10.5066 12.6079 10.7305 12.3712 10.7305H7.22838C6.99168 10.7305 6.7998 10.5066 6.7998 10.2305Z"
                    fill="#222222"></path>
                </svg>
                <div className="aw__bhbktvj">
                  <span className="aw__bxyv27i" id="chat-unread-count" style={{ display: 'none' }}>
                    0
                  </span>
                </div>
              </a>
              <span>
                <a
                  className="aw__n9c3wjq"
                  href="#"
                  aria-label="Discover Chotot Verticals"
                  rel="nofollow"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#ButtonApp">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="aw__ieb68nh">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.5 4H4V11.5H11.5V4ZM4 2.75C3.30964 2.75 2.75 3.30964 2.75 4V11.5C2.75 12.1904 3.30964 12.75 4 12.75H11.5C12.1904 12.75 12.75 12.1904 12.75 11.5V4C12.75 3.30964 12.1904 2.75 11.5 2.75H4Z"
                      fill="currentColor"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.5 15.5H4V23H11.5V15.5ZM4 14.25C3.30964 14.25 2.75 14.8096 2.75 15.5V23C2.75 23.6904 3.30964 24.25 4 24.25H11.5C12.1904 24.25 12.75 23.6904 12.75 23V15.5C12.75 14.8096 12.1904 14.25 11.5 14.25H4Z"
                      fill="currentColor"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23 4H15.5V11.5H23V4ZM15.5 2.75C14.8096 2.75 14.25 3.30964 14.25 4V11.5C14.25 12.1904 14.8096 12.75 15.5 12.75H23C23.6904 12.75 24.25 12.1904 24.25 11.5V4C24.25 3.30964 23.6904 2.75 23 2.75H15.5Z"
                      fill="currentColor"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23 15.5H15.5V23H23V15.5ZM15.5 14.25C14.8096 14.25 14.25 14.8096 14.25 15.5V23C14.25 23.6904 14.8096 24.25 15.5 24.25H23C23.6904 24.25 24.25 23.6904 24.25 23V15.5C24.25 14.8096 23.6904 14.25 23 14.25H15.5Z"
                      fill="currentColor"></path>
                  </svg>
                </a>
              </span>

              <div className="offcanvas offcanvas-bottom" id="ButtonApp">
                <div className="offcanvas-header">
                  <h1 className="offcanvas-title">Heading</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>
                <div className="offcanvas-body">
                  <p>Some text lorem ipsum.</p>
                  <button className="btn btn-secondary" type="button">
                    A Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* layout dropdown*/}
      {IsDanhmuc ? (
        <div id="layers" style={{ position: 'absolute', left: '0px', right: '0px' }}>
          <svg width="723px" height="710px">
            <polygon
              id="magic-triangle"
              points="256,127 406.5374984741211,92 406.5374984741211,284"
              style={{ fill: 'transparent', stroke: 'transparent', strokeWidth: '0' }}></polygon>
          </svg>
          <span
            className="show aw__mxjwfwa"
            style={{ willChange: 'top, left, width, height', position: 'fixed', top: '92px', left: '170px' }}>
            <a href="#" className="menuItem active">
              <span className="aw__ngv58n8">
                <span className="aw__lza0u1">
                  <img src="./PTY_lv1_cat_muban.png" alt="" />
                </span>
                <span>Mua bán</span>
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.1949 11.525C5.93598 11.2642 5.93672 10.8432 6.19657 10.5833L8.7799 8L6.19579 5.41026C5.93656 5.15046 5.93679 4.72977 6.19631 4.47026C6.45602 4.21054 6.8771 4.21054 7.13682 4.47026L9.95946 7.29289C10.35 7.68342 10.35 8.31658 9.95946 8.70711L7.1399 11.5267C6.87875 11.7878 6.45512 11.7871 6.1949 11.525Z"
                  fill="#222222"></path>
              </svg>
            </a>
            <a href="#" className="menuItem">
              <span className="aw__ngv58n8">
                <span className="aw__lza0u1">
                  <img src="./PTY_lv1_cat_chothue.png" alt="" />
                </span>
                <span>Cho thuê</span>
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.1949 11.525C5.93598 11.2642 5.93672 10.8432 6.19657 10.5833L8.7799 8L6.19579 5.41026C5.93656 5.15046 5.93679 4.72977 6.19631 4.47026C6.45602 4.21054 6.8771 4.21054 7.13682 4.47026L9.95946 7.29289C10.35 7.68342 10.35 8.31658 9.95946 8.70711L7.1399 11.5267C6.87875 11.7878 6.45512 11.7871 6.1949 11.525Z"
                  fill="#222222"></path>
              </svg>
            </a>
            <a href="#" className="menuItem">
              <span className="aw__ngv58n8">
                <span className="aw__lza0u1">
                  <img src="./PTY_lv1_cat_duan.png" alt="" />
                </span>
                <span>Dự án</span>
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.1949 11.525C5.93598 11.2642 5.93672 10.8432 6.19657 10.5833L8.7799 8L6.19579 5.41026C5.93656 5.15046 5.93679 4.72977 6.19631 4.47026C6.45602 4.21054 6.8771 4.21054 7.13682 4.47026L9.95946 7.29289C10.35 7.68342 10.35 8.31658 9.95946 8.70711L7.1399 11.5267C6.87875 11.7878 6.45512 11.7871 6.1949 11.525Z"
                  fill="#222222"></path>
              </svg>
            </a>
            <a href="#" className="menuItem">
              <span className="aw__ngv58n8">
                <span className="aw__lza0u1">
                  <img src="./PTY_lv1_cat_timmoigioi.png" alt="" />
                </span>
                <span>Tìm môi giới</span>
              </span>
            </a>
            <a href="/chart" className="menuItem">
              <span className="aw__ngv58n8">
                <span className="aw__lza0u1">
                  <img src="./PTY_lv1_cat_bieudogia.png" alt="" />
                </span>
                <span>Biểu đồ biến động giá</span>
              </span>
            </a>
            <a href="#" className="menuItem">
              <span className="aw__ngv58n8">
                <span className="aw__lza0u1">
                  <img src="./PTY_lv1_cat_vaymuanha.png" alt="" />
                </span>
                <span>Vay mua nhà</span>
              </span>
            </a>
          </span>
        </div>
      ) : (
        <></>
      )}
    </body>
  )
}

export default Header