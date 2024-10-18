import { Link, useParams } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { useEffect, useState } from 'react'
import ModalCreateHome from '~/pages/admin/ManagerHome/ModelCreateHome'
import { getMotelByname } from '~/apis/apiClient'
const NavWData = ({ motels, setmotels }) => {
  const { motelName } = useParams() // Lấy tham số motelName từ URL
  const [motel, setmotel] = useState(null)

  useEffect(() => {
    // Nếu có danh sách nhà trọ và không có tên cụ thể từ URL
    if (motels && motels.length > 0 && !motelName) {
      setmotel(motels[0]) // Cập nhật phòng trọ đầu tiên nếu tồn tại dữ liệu
    } else {
      // Nếu có tên nhà trọ từ URL, lấy dữ liệu bằng API
      getMotelByname(motelName).then((res) => {
        setmotel(res.data.result[0])
      })
    }
  }, [motels, motelName, getMotelByname]) // Thêm các dependencies cần thiết vào mảng dependencies

  // Theo dõi khi motel thay đổi để kiểm tra giá trị
  useEffect(() => {
    if (motel) {
      console.log('Motel đã được cập nhật:')
      console.log(motel)
    }
  }, [motel]) // Chỉ chạy khi motel thay đổi

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
                      textOverflow: 'ellipsis',
                    }}>
                    <span>Nhà trọ {motel ? motel.motelName : 'Chưa có dữ liệu'}</span>
                  </h4>
                </div>
              </div>

              <button
                className="shadow"
                id="add-block"
                data-bs-toggle="modal"
                data-bs-target="#addBlock"
                data-mode="add"
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
                <Link to="/quan-ly/6891/lap-phieu-thu" className="item-menu">
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
                <Link to="/quan-ly/6891/quan-ly-dich-vu" className="item-menu">
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
                <Link to="/quan-ly/6891/quan-ly-tai-san" className="item-menu">
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
                <Link to="/quan-ly/6891/tat-ca-hop-dong" className="item-menu">
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
                <Link to="/quan-ly/6891/tat-ca-khach-thue" className="item-menu">
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
                <Link to="/quan-ly/6891/thu-chi-tong-ket" className="item-menu">
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
                <Link to="/quan-ly/6891/cai-dat-nha-tro" className="item-menu">
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
                <Link to="/quan-ly/6891/lich-su-gui-zalo" className="item-menu">
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
                <Link to="/quan-ly/6891/import-data-from-file" className="item-menu">
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
      <div
        className="modal fade"
        id="manageBlock"
        tabIndex="-1"
        aria-labelledby="manageBlockLabel"
        aria-hidden="true"
        style={{ display: 'none' }}>
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
                    {motel && motelinMap.motelName === motel.motelName ? (
                      <div
                        className="btn-round  disabled btn-secondary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="Không thể xóa nhà trọ đang thao tác"
                        data-tooltip-id="my-tooltipRemove"
                        data-tooltip-content="Không thể xóa nhà trọ đang thao tác"
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
                    ) : (
                      <div
                        className="btn-round  btn-secondary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-tooltip-id="my-tooltipRemove"
                        data-tooltip-content=" xóa nhà trọ"
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
                      data-block='{"id":6891,"name":"Trung","name_full":"Nh\u00e0 tr\u1ecd Trung","user_id":7661,"category":0,"category_name":"Nh\u00e0 tr\u1ecd","category_name_short":"Nh\u00e0 tr\u1ecd","room_type":"room","room_type_name":"ph\u00f2ng","type":"floor","room_total":0,"count_floor":1,"area":15,"room_amount":2000000,"ele_amount":0,"water_amount":0,"price_items_cache":[{"id":22728,"name":"Ti\u1ec1n \u0111i\u1ec7n","type":"constant","unit":"kwh","price":1700,"rooms":[],"value":null,"frames":[],"status":"is_active","history":null,"user_id":7661,"block_id":6891,"category":"ele","type_text":"Theo gi\u00e1 tr\u1ecb c\u1ed1 \u0111\u1ecbnh","unit_text":"KWh","is_default":1,"status_text":"\u0110ang s\u1eed d\u1ee5ng","subtraction":1},{"id":22729,"name":"Ti\u1ec1n n\u01b0\u1edbc","type":"constant","unit":"khoi","price":18000,"rooms":[],"value":null,"frames":[],"status":"is_active","history":null,"user_id":7661,"block_id":6891,"category":"water","type_text":"Theo gi\u00e1 tr\u1ecb c\u1ed1 \u0111\u1ecbnh","unit_text":"Kh\u1ed1i","is_default":1,"status_text":"\u0110ang s\u1eed d\u1ee5ng","subtraction":1}],"circle_order":1,"deadline_bill":1,"bill_setting":{"note":{"content":null},"enable_qr":1,"payment_default":"cash","show_circle_day":0,"single_send_zalo":0,"template_bill_zalo":1,"enable_rounding_money":1,"extract_receipt_expense":0},"app_renter_setting":{"allow_update_car":1,"default_password":123456789,"allow_close_clock":0,"auto_create_account":0,"allow_ticket_contract":1,"allow_update_customer":1},"room_group":[],"max_member":0,"open_door":null,"close_door":null,"rule":null,"extension":null,"data_log":null,"setting":{"car_function":1,"post_function":1,"agent_function":1,"asset_function":1,"price_item_ele":3,"price_item_wifi":0,"price_item_trash":0,"price_item_water":3,"task_job_function":1,"send_sms_when_create_bill":1,"contract_document_function":0},"province_id":79,"district_id":771,"ward_id":27199,"address_component":{"address":"b\u00ecnh d\u01b0\u01a1ng, Ph\u01b0\u1eddng 05, Qu\u1eadn 10, Th\u00e0nh ph\u1ed1 H\u1ed3 Ch\u00ed Minh","ward_id":"27199","position":{"latitude":"10.7829132","longitude":"106.6961898"},"district_id":"771","province_id":"79","address_detail":"b\u00ecnh d\u01b0\u01a1ng"},"address":"b\u00ecnh d\u01b0\u01a1ng, Ph\u01b0\u1eddng 05, Qu\u1eadn 10, Th\u00e0nh ph\u1ed1 H\u1ed3 Ch\u00ed Minh","latitude":10.7829132,"longitude":106.6961898,"auto_create_room":0,"post_ids":[]}'>
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          alignItems: 'center',
                          display: 'inherit',
                          textAlign: 'center',
                          justifyContent: 'center',
                          color: '#000',
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
                      href={`/quanlytro/${motelinMap.motelName}`}
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
      <ModalCreateHome />
    </div>
  )
}

export default NavWData
