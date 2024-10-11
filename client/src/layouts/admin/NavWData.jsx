import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
const NavWData = () => {
  return (
    <div>
      <div>
        <div
          style={{
            minHeight: '125px',
            display: 'flex',
            padding: '0px 10px 0px 0px',
          }}>
          <div className="col-md-2 d-flex align-items-center justify-content-center" style={{ marginRight: '10px' }}>
            <div
              className="current-block d-flex align-items-center"
              style={{ position: 'relative' }}
              data-bs-toggle="modal"
              data-bs-target="#manageBlock">
              <div className="d-flex align-items-center" style={{ flexDirection: 'row', flex: '1' }}>
                <div className="icon-blocks">
                  <span className="count-block">1</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-home feather-size-18">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>

                <div style={{ padding: '20px 0px 20px 5px', flex: '1' }}>
                  <span style={{ fontSize: '17px' }}>Đang quản lý</span>
                  <h4
                    style={{
                      fontSize: '18px',
                      color: '#20a9e7',
                      padding: '0px',
                      margin: '0px',
                      whiteSpace: 'nowrap',
                      maxWidth: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                    <span>Nhà trọ Trung</span>
                  </h4>
                </div>
              </div>

              <button
                className="shadow"
                id="add-block"
                style={{
                  position: 'absolute',
                  right: '-10px',
                  top: '34px',
                  borderRadius: '100%',
                  height: '35px',
                  width: '35px',
                  textAlign: 'center',
                  padding: '0px',
                  backgroundColor: '#20a9e7',
                  color: '#fff',
                  border: '1px solid #20a9e7',
                  zIndex: '10',
                }}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Thêm mới nhà cho thuê"
                data-tooltip-place="top">
                <Tooltip id="my-tooltip" />

                <span
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title=""
                  data-bs-original-title="Thêm mới nhà cho thuê">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-plus">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <div
            className="col-md-10"
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              display: 'flex',
            }}>
            <div
              className=" scrollable-content-container"
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
                overflow: 'hidden',
              }}>
              <button className="scroll-left hidden">←</button>
              <div
                className="scrollable-content"
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  overflowX: 'auto',
                  position: 'relative',
                }}>
                <Link to="/quan-ly" className="item-menu active">
                  <div className="icon text-center">
                    <img width="47px" className="mb-2" src="./billicon.png" />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Quản lý phòng</b>
                    </span>
                  </div>
                </Link>
                <Link to="/quan-ly/6891/lap-phieu-thu" className="item-menu">
                  <div className="icon text-center">
                    <img width="47px" className="mb-2" src="./billicon.png" />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Quản lý hóa đơn</b>
                    </span>
                  </div>
                </Link>
                <Link to="/quan-ly/6891/quan-ly-dich-vu" className="item-menu">
                  <div className="icon text-center">
                    <img width="47px" className="mb-2" src="./billpen.png" />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Quản lý dịch vụ</b>
                    </span>
                  </div>
                </Link>
                <Link to="/quan-ly/6891/quan-ly-tai-san" className="item-menu">
                  <div className="icon text-center">
                    <img width="47px" className="mb-2" src="./billpen.png" />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Quản lý tài sản</b>
                    </span>
                  </div>
                </Link>
                <Link to="/quan-ly/6891/tat-ca-hop-dong" className="item-menu">
                  <div className="icon text-center">
                    <img width="47px" className="mb-2" src="./contractbill.png" />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Quản lý hợp đồng</b>
                    </span>
                  </div>
                </Link>
                <Link to="/quan-ly/6891/tat-ca-khach-thue" className="item-menu">
                  <div className="icon text-center">
                    <img width="47px" className="mb-2" src="./phonebill.png" />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Quản lý khách thuê</b>
                    </span>
                  </div>
                </Link>
                <Link to="/quan-ly/6891/thu-chi-tong-ket" className="item-menu">
                  <div className="icon text-center">
                    <img width="47px" className="mb-2" src="./billicon.png" />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Thu/Chi - Tổng kết</b>
                    </span>
                  </div>
                </Link>
                <Link to="/quan-ly/6891/cai-dat-nha-tro" className="item-menu">
                  <div className="icon text-center">
                    <img width="47px" className="mb-2" src="./setting.png" />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Cài đặt</b>
                    </span>
                  </div>
                </Link>
                <Link to="/quan-ly/6891/lich-su-gui-zalo" className="item-menu">
                  <div className="icon text-center">
                    <img width="47px" className="mb-2" src="./icon-zalo.png" />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Lịch sử gửi zalo</b>
                    </span>
                  </div>
                </Link>
                <Link to="/quan-ly/6891/import-data-from-file" className="item-menu">
                  <div className="icon text-center">
                    <img width="47px" className="mb-2" src="./setting.png" />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Nhập liệu từ file</b>
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavWData
