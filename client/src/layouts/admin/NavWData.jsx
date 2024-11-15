import { Link, useParams, useLocation } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { useEffect, useState, useRef } from 'react'
import ModalCreateHome from '~/pages/admin/ManagerHome/ModelCreateHome'
import { Modal as BootstrapModal } from 'bootstrap'
import Swal from 'sweetalert2'
import { deleteMotel, getMotelById } from '~/apis/motelAPI'
const NavWData = ({ motels }) => {
  const username = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).username : null
  const { motelId } = useParams() // Lấy tham số motelName từ URL
  const location = useLocation() // Nhận thông tin đường dẫn hiện tại
  const [motel, setmotel] = useState(null)
  const [selectedMotelId, setSelectedMotelId] = useState(null)
  const manageBlockModalRef = useRef(null)
  const addBlockModalRef = useRef(null)
  useEffect(() => {
    // Nếu có danh sách nhà trọ và không có tên cụ thể từ URL
    if (motels && motels.length > 0 && !motelId) {
      setmotel(motels[0]) // Cập nhật phòng trọ đầu tiên nếu tồn tại dữ liệu
    } else {
      // Nếu có tên nhà trọ từ URL, lấy dữ liệu bằng API
      if (motelId) {
        getMotelById(motelId).then((res) => {
          setmotel(res.data.result)
        })
      }
    }
  }, [motels, motelId]) // Thêm các dependencies cần thiết vào mảng dependencies

  // Theo dõi khi motel thay đổi để kiểm tra giá trị
  useEffect(() => {
    if (motelId) {
      getMotelById(motelId)
        .then((res) => setmotel(res.data.result))
        .catch((error) => console.error('Error fetching motel:', error))
    } else if (motels && motels.length > 0) {
      setmotel(motels[0]) // Cập nhật nhà trọ đầu tiên nếu không có `motelId` trong URL
    }
  }, [motels, motelId])

  useEffect(() => {
    // Khởi tạo modal khi component được mount
    const manageBlockModalElement = document.getElementById('manageBlock')
    const manageBlockModal = new BootstrapModal(manageBlockModalElement, {
      backdrop: 'static'
    })

    // Lưu vào state hoặc callback để sử dụng lại khi cần
    window.manageBlockModal = manageBlockModal

    // Khởi tạo modal khi component được mount
    const addBlockModalElement = document.getElementById('addBlock')
    const addBlockModal = new BootstrapModal(addBlockModalElement, {
      backdrop: 'static'
    })

    // Lưu vào state hoặc callback để sử dụng lại khi cần
    manageBlockModalRef.current = manageBlockModal
    addBlockModalRef.current = addBlockModal

    // Dọn dẹp khi component bị unmount
    return () => {
      manageBlockModal.dispose()
      addBlockModal.dispose()
    }
  }, [])
  // Hàm mở modal quản lý block
  const openModalManagerBlock = () => {
    if (manageBlockModalRef.current) {
      manageBlockModalRef.current.show() // Mở modal quản lý block
    }
  }

  // Hàm mở modal thêm block
  const openModalAddBlock = () => {
    if (addBlockModalRef.current) {
      addBlockModalRef.current.show() // Mở modal thêm block
    }
  }

  //nhan vao nut edit
  //ham xoa
  const handleDelete = async (motelId) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn xóa không?',
      text: 'Bạn sẽ không thể hoàn tác hành động này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa'
    })

    if (result.isConfirmed) {
      try {
        await deleteMotel(motelId)
        Swal.fire('Đã xóa!', 'motel đã được xóa.', 'success')
        // Sau khi xóa thành công, cập nhật lại danh sách template
        window.location.reload()
      } catch (error) {
        console.error('Lỗi khi xóa motel:', error)
        Swal.fire('Lỗi', 'Không thể xóa motelg.', 'error')
      }
    }
  }

  return (
    <div>
      <div>
        <div
          style={{
            minHeight: '125px',
            display: 'flex',
            padding: '0px 10px 0px 0px'
          }}>
          <div className="col-md-2 d-flex align-items-center justify-content-center" style={{ marginRight: '10px' }}>
            <div
              className="current-block d-flex align-items-center"
              style={{ position: 'relative' }}
              onClick={openModalManagerBlock}>
              <div className="d-flex align-items-center" style={{ flexDirection: 'row', flex: '1' }}>
                <div className="icon-blocks">
                  <span className="count-block">{motels.length}</span>
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
                      textOverflow: 'ellipsis'
                    }}>
                    <span>Nhà trọ {motel ? motel.motelName : 'Chưa có dữ liệu'}</span>
                  </h4>
                </div>
              </div>
            </div>
            <button
              className="shadow"
              id="add-block"
              onClick={() => {
                setSelectedMotelId('Create')
                openModalAddBlock()
              }}
              style={{
                marginLeft: '-20px',
                borderRadius: '100%',
                height: '40px',
                width: '47px',
                textAlign: 'center',
                padding: '0px',
                backgroundColor: '#20a9e7',
                color: '#fff',
                border: '1px solid #20a9e7',
                zIndex: '10'
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
          <div
            className="col-md-10"
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              display: 'flex'
            }}>
            <div
              className=" scrollable-content-container"
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
                overflow: 'hidden'
              }}>
              <button className="scroll-left hidden">←</button>
              <div
                className="scrollable-content"
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  overflowX: 'auto',
                  position: 'relative'
                }}>
                <Link
                  to={motel ? `/quanlytro/${motel.motelId}` : '/quanlytro'}
                  className={`item-menu ${
                    location.pathname === (motel ? `/quanlytro/${motel.motelId}` : '/quanlytro') ? 'active' : ''
                  }`}>
                  <div className="icon text-center">
                    <img
                      width="47px"
                      className="mb-2"
                      src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fbillicon.png?alt=media&token=3b38557e-411a-484f-ad52-436f4b86f40f"
                    />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Quản lý phòng</b>
                    </span>
                  </div>
                </Link>
                <Link
                  to={motel ? `/quanlytro/${motel.motelId}/quan-ly-hoa-don` : '#'}
                  className={`item-menu ${
                    location.pathname === (motel ? `/quanlytro/${motel.motelId}/quan-ly-hoa-don` : '#') ? 'active' : ''
                  }`}>
                  <div className="icon text-center">
                    <img
                      width="47px"
                      className="mb-2"
                      src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fbillicon.png?alt=media&token=3b38557e-411a-484f-ad52-436f4b86f40f"
                    />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Quản lý hóa đơn</b>
                    </span>
                  </div>
                </Link>
                <Link
                  to={motel ? `/quanlytro/${motel.motelId}/quan-ly-dich-vu` : '#'}
                  className={`item-menu ${
                    location.pathname === (motel ? `/quanlytro/${motel.motelId}/quan-ly-dich-vu` : '#') ? 'active' : ''
                  }`}>
                  <div className="icon text-center">
                    <img
                      width="47px"
                      className="mb-2"
                      src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fbillpen.png?alt=media&token=69d5c964-0b06-4d3e-a376-058984b882e8"
                    />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Quản lý dịch vụ</b>
                    </span>
                  </div>
                </Link>
                <Link
                  to={motel ? `/quanlytro/${motel.motelId}/quan-ly-tai-san` : '#'}
                  className={`item-menu ${
                    location.pathname === (motel ? `/quanlytro/${motel.motelId}/quan-ly-tai-san` : '#') ? 'active' : ''
                  }`}>
                  <div className="icon text-center">
                    <img
                      width="47px"
                      className="mb-2"
                      src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fbillpen.png?alt=media&token=69d5c964-0b06-4d3e-a376-058984b882e8"
                    />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Quản lý tài sản</b>
                    </span>
                  </div>
                </Link>
                <Link
                  to={motel ? `/quanlytro/${motel.motelId}/tat-ca-hop-dong` : '#'}
                  className={`item-menu ${
                    location.pathname === (motel ? `/quanlytro/${motel.motelId}/tat-ca-hop-dong` : '#') ? 'active' : ''
                  }`}>
                  <div className="icon text-center">
                    <img
                      width="47px"
                      className="mb-2"
                      src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fcontractbill.png?alt=media&token=13951a47-8b49-48bb-94e5-41bbcd7ce10f"
                    />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Quản lý hợp đồng</b>
                    </span>
                  </div>
                </Link>
                <Link
                  to={motel ? `/quanlytro/${motel.motelId}/tat-ca-khach-thue` : '#'}
                  className={`item-menu ${
                    location.pathname === (motel ? `/quanlytro/${motel.motelId}/tat-ca-khach-thue` : '#')
                      ? 'active'
                      : ''
                  }`}>
                  <div className="icon text-center">
                    <img
                      width="47px"
                      className="mb-2"
                      src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fphonebill.png?alt=media&token=93ff2462-c893-451d-a105-dff4d0582d3a"
                    />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Quản lý khách thuê</b>
                    </span>
                  </div>
                </Link>
                <Link
                  to={motel ? `/quanlytro/${motel.motelId}/thu-chi-tong-ket` : '#'}
                  className={`item-menu ${
                    location.pathname === (motel ? `/quanlytro/${motel.motelId}/thu-chi-tong-ket` : '#') ? 'active' : ''
                  }`}>
                  <div className="icon text-center">
                    <img
                      width="47px"
                      className="mb-2"
                      src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fbillpen.png?alt=media&token=69d5c964-0b06-4d3e-a376-058984b882e8"
                    />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Thu/Chi - Tổng kết</b>
                    </span>
                  </div>
                </Link>
                <Link
                  to={motel ? `/quanlytro/${motel.motelId}/cai-dat-nha-tro` : '#'}
                  className={`item-menu ${
                    location.pathname === (motel ? `/quanlytro/${motel.motelId}/cai-dat-nha-tro` : '#') ? 'active' : ''
                  }`}>
                  <div className="icon text-center">
                    <img
                      width="47px"
                      className="mb-2"
                      src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fsetting.png?alt=media&token=22b2f416-5de5-4f06-b70d-2c0c0152409d"
                    />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Cài đặt</b>
                    </span>
                  </div>
                </Link>
                <Link
                  to={motel ? `/quanlytro/${motel.motelId}/lich-su-gui-zalo` : '#'}
                  className={`item-menu ${
                    location.pathname === (motel ? `/quanlytro/${motel.motelId}/lich-su-gui-zalo` : '#') ? 'active' : ''
                  }`}>
                  <div className="icon text-center">
                    <img
                      width="47px"
                      className="mb-2"
                      src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Ficon-zalo.png?alt=media&token=536280c6-77d6-4368-afe9-e0c0c6bdbf0f"
                    />
                  </div>
                  <div className="key">
                    <span className="titleAdmin">
                      <b>Lịch sử gửi zalo</b>
                    </span>
                  </div>
                </Link>
                <Link
                  to={motel ? `/quanlytro/${motel.motelId}/import-data-from-file` : '#'}
                  className={`item-menu ${
                    location.pathname === (motel ? `/quanlytro/${motel.motelId}/import-data-from-file` : '#')
                      ? 'active'
                      : ''
                  }`}>
                  <div className="icon text-center">
                    <img
                      width="47px"
                      className="mb-2"
                      src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fsetting.png?alt=media&token=22b2f416-5de5-4f06-b70d-2c0c0152409d"
                    />
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
      {/* Modal manage block  */}
      <div className="modal fade" id="manageBlock" tabIndex="-1" aria-hidden="true" ref={manageBlockModalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header modal-header--sticky">
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
                className="feather feather-home"
                style={{ marginRight: '15px' }}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <h5 className="modal-title" id="manageBlockLabel">
                Danh sách nhà trọ của bạn
                <p style={{ fontSize: '14px', fontWeight: 'normal', fontStyle: 'italic', margin: '0' }}>
                  Tới 1 nhà trọ và quản lý
                </p>
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                {' '}
              </button>
            </div>
            <div className="modal-body">
              {/* vong lap o day */}
              {motels.length > 0 ? (
                motels.map((motelinMap, index) => (
                  <div
                    key={index}
                    className="item-feature active d-flex align-items-center justify-content-between mb-2">
                    <div className="info" style={{ flex: '1' }}>
                      <h6>Nhà trọ {motelinMap.motelName}</h6>
                      <p>{motelinMap.address}</p>
                    </div>

                    {/* nut remove */}
                    {motel && motelinMap.motelId === motel.motelId ? (
                      <div
                        className="btn-round  disabled btn-secondary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title=""
                        data-bs-original-title="Không thể xóa nhà trọ đang thao tác"
                        data-tooltip-id="my-tooltipRemove"
                        data-tooltip-content="Không thể xóa nhà trọ đang thao tác"
                        data-tooltip-place="bottom">
                        <Tooltip id="my-tooltipRemove" />
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
                          className="feather feather-trash-2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </div>
                    ) : (
                      <div
                        className="btn-round  btn-secondary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-tooltip-id="my-tooltipRemove"
                        data-tooltip-content=" xóa nhà trọ"
                        onClick={() => handleDelete(motelinMap.motelId)}
                        data-tooltip-place="top">
                        <Tooltip id="my-tooltipRemove" />
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
                          className="feather feather-trash-2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </div>
                    )}
                    {/* nut Edit */}
                    <div
                      className="btn-round btn-edit"
                      data-bs-toggle="modal"
                      data-bs-target="#addBlock"
                      onClick={() => setSelectedMotelId(motelinMap.motelId)}>
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          alignItems: 'center',
                          display: 'inherit',
                          textAlign: 'center',
                          justifyContent: 'center',
                          color: '#000'
                        }}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="Chỉnh sửa Nhà trọ"
                        data-tooltip-id="my-tooltipEdit"
                        data-tooltip-content="Chỉnh sửa Nhà trọ"
                        data-tooltip-place="top">
                        <Tooltip id="my-tooltipEdit" />
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
                          className="feather feather-edit">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </div>
                    </div>
                    {/* nut chuyen toi tro  */}
                    <a
                      className="btn-round btn-go-to"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      href={`/quanlytro/${motelinMap.motelId}`}
                      data-bs-original-title="Tới quản lý Nhà trọ"
                      data-tooltip-id="my-tooltipManagerMotel"
                      data-tooltip-content="Tới quản lý Nhà trọ"
                      data-tooltip-place="top">
                      <Tooltip id="my-tooltipManagerMotel" />
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
                        className="feather feather-arrow-right">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modal add  */}
      <ModalCreateHome username={username} MotelId={selectedMotelId} ref={addBlockModalRef} />
    </div>
  )
}

export default NavWData
