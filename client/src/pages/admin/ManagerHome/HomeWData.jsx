import { Tooltip } from 'react-tooltip'
import 'react-tabulator/lib/styles.css' // required styles
import 'react-tabulator/lib/css/tabulator.min.css' // theme
import { ReactTabulator } from 'react-tabulator'

const HomeWData = () => {
  const columns = [
    { title: 'Tên phòng', field: 'nameroom', hozAlign: 'center', minWidth: 40, editor: 'input' }, // Đặt minWidth để tránh cột bị quá nhỏ
    { title: 'Nhóm', field: 'group', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Giá thuê', field: 'rent', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Mức giá tiền cọc', field: 'depositprice', hozAlign: 'center', minWidth: 150, editor: 'input' },
    { title: 'Tiền nợ', field: 'moneyowed', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Khách thuê', field: 'tenants', hozAlign: 'center', minWidth: 150, editor: 'input' },
    { title: 'Ngày lập hóa đơn', field: 'invoicedate', hozAlign: 'center', minWidth: 150, editor: 'input' },
    { title: 'Chu kỳ thu tiền', field: 'collectioncycle', hozAlign: 'center', minWidth: 150, editor: 'input' },
    { title: 'Ngày vào ở', field: 'dateofmovingin', hozAlign: 'center', minWidth: 150, editor: 'input' },
    { title: 'Thời hạn hợp đồng', field: 'contractterm', hozAlign: 'center', minWidth: 150, editor: 'input' },
    { title: 'Tình trạng', field: 'status', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Tài chính', field: 'finance', hozAlign: 'center', minWidth: 40, editor: 'input' },
  ]

  const data = [
    {
      nameroom: 'Phòng A101',
      group: 'Nhóm 1',
      rent: '5,000,000 VND',
      depositprice: '2,000,000 VND',
      moneyowed: 'Không',
      tenants: 'Nguyễn Văn A',
      invoicedate: '01/10/2023',
      collectioncycle: 'Hàng tháng',
      dateofmovingin: '01/09/2023',
      contractterm: '12 tháng',
      status: 'Đang thuê',
      finance: 'Ổn định',
    },
  ]

  const options = {
    height: '400px', // Chiều cao của bảng
    movableColumns: true, // Cho phép di chuyển cột
    resizableRows: true, // Cho phép thay đổi kích thước hàng
    movableRows: true,
    resizableColumns: true, // Cho phép thay đổi kích thước cột
    resizableColumnFit: true,
    layout: 'fitColumns',
    responsiveLayout: 'collapse',
    rowHeader: {
      formatter: 'responsiveCollapse',
      width: 30,
      minWidth: 30,
      hozAlign: 'center',
      resizable: false,
      headerSort: false,
    },
  }

  // Tùy chọn để hiển thị thông báo không có dữ liệu với hình ảnh
  // Tùy chọn để hiển thị thông báo không có dữ liệu với hình ảnh

  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '15px 15px 15px 15px',
        borderRadius: '10px',
        margin: '0 10px 10px 10px',
      }}>
      <div className="page-home">
        {/* report */}
        <div>
          <div className="row g-3 row-box-home" style={{ marginTop: '0px' }}>
            <div className="col-sm-3" style={{ marginTop: '0px' }}>
              <div className="item-home" data-bs-toggle="modal" data-bs-target="#reportBillDebt">
                <a href="javascript:," className="create-home">
                  <span>
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
                  </span>
                </a>
                <a href="javascript:," className="box-home span-red-white">
                  <div className="d-flex align-items-center">
                    <span className="icon-home">
                      <img
                        width="36px"
                        src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Ficonadminql1.png?alt=media&token=283e596c-984a-495d-af79-ace3366b8403"
                      />
                    </span>
                    <div>
                      <span className="titleadmin">Tổng số tiền khách nợ</span>
                      <h3 className="text-danger">0đ</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-3" style={{ marginTop: '0px' }}>
              <div className="item-home" data-bs-toggle="modal" data-bs-target="#reportContractDeposit">
                <a href="javascript:;" className="create-home">
                  <span>
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
                  </span>
                </a>
                <a href="javascript:;" className="box-home span-primary-white">
                  <div className="d-flex align-items-center">
                    <span className="icon-home">
                      <img
                        width="36px"
                        src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Ficonadminql2.png?alt=media&token=f6f1cf18-4b2d-4d0d-bf44-aadc183fb3d3"
                      />
                    </span>
                    <div>
                      <span style={{ color: '#20a9e7' }} className="titleadmin">
                        Tổng số tiền cọc
                      </span>
                      <h3 style={{ color: '#20a9e7' }}>0đ</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-3" style={{ marginTop: '0px' }}>
              <div className="item-home" data-bs-toggle="modal" data-bs-target="#reportDepositTemp">
                <a href="javascript:;" className="create-home">
                  <span>
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
                  </span>
                </a>
                <a href="javascript:;" className="box-home span-primary-white">
                  <div className="d-flex align-items-center">
                    <span className="icon-home">
                      <img
                        width="36px"
                        src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Ficonadminql3.png?alt=media&token=254c3d4e-c118-4538-83ad-4270f1c823be"
                      />
                    </span>
                    <div>
                      <span style={{ color: '#20a9e7' }} className="titleadmin">
                        Tổng số tiền cọc giữ chỗ phòng
                      </span>
                      <h3 style={{ color: '#20a9e7' }}>0đ</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-3" style={{ marginTop: '0px' }}>
              <div className="item-home report">
                <a href="javascript:;" className="create-home">
                  <span>
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
                  </span>
                </a>
                <a href="javascript:;" className="box-home span-red-white">
                  <div className="d-flex align-items-center">
                    <span className="icon-home">
                      <img
                        width="36px"
                        src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Ficonadminql4.png?alt=media&token=de3e82c1-407a-4b18-81f7-db64230d2f0f"
                      />
                    </span>
                    <div>
                      <span className="titleadmin">Sự cố phòng</span>
                      <h3 className="text-danger">0 Vấn đề</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Tab panes  */}
        <div className="tab-pane" id="manage" role="tabpanel" aria-labelledby="manage-tab">
          <div style={{ marginTop: '30px' }}>
            <div className="header-item">
              <h4 className="title-item">
                Quản lý danh sách phòng
                <i className="des">Tất cả danh sách phòng trong Nhà trọ Trung</i>
              </h4>
              <div className="d-flex">
                <a
                  href="https://www.youtube.com/watch?v=AH-YrGOP-zI"
                  target="_blank"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  title=""
                  style={{
                    width: '50px',
                    height: '50px',
                    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, .15)',
                    borderRadius: '50px',
                    marginRight: '15px',
                  }}
                  data-bs-original-title="Video tổng quan phần mềm"
                  data-tooltip-id="my-tooltipTongquan"
                  data-tooltip-content="Video tổng quan phần mềm"
                  data-tooltip-place="top">
                  <Tooltip id="my-tooltipTongquan" />
                  <img
                    width="50px"
                    height="50px"
                    src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Ficonadminql5.png?alt=media&token=4f52c0c9-ed2e-478f-911b-67df29e7208f"
                  />
                </a>
                <button className="add-round" data-bs-toggle="modal" data-bs-target="#addRoom">
                  <span
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    title=""
                    data-tooltip-id="my-tooltipThemPhong"
                    data-tooltip-content="Thêm phòng"
                    data-tooltip-place="top"
                    data-bs-original-title="Thêm phòng">
                    <Tooltip id="my-tooltipThemPhong" />
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
                <div className="d-flex" style={{ marginLeft: '40px' }}>
                  <div className="dropdown">
                    <button
                      style={{ height: '100%' }}
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
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
                        className="feather feather-file-text">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      Ẩn/Hiện cột
                      <span
                        id="count_exclude_column"
                        style={{
                          position: 'absolute',
                          top: '-12px',
                          right: '-10px',
                          backgroundColor: '#dc3545',
                          fontSize: '12px',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '5px',
                          color: '#fff',
                        }}>
                        12
                      </span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="list-show-column">
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            checked
                            className="form-check-input"
                            name="group_id"
                            value="group_id"
                          />{' '}
                          Nhóm
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            checked
                            className="form-check-input"
                            name="deposit_contract_amount"
                            value="deposit_contract_amount"
                          />{' '}
                          Mức tiền cọc
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            checked
                            className="form-check-input"
                            name="debt_amount"
                            value="debt_amount"
                          />{' '}
                          Tiền nợ
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            checked
                            className="form-check-input"
                            name="customers"
                            value="customers"
                          />{' '}
                          Khách thuê
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            checked
                            className="form-check-input"
                            name="circle_day"
                            value="circle_day/"
                          />{' '}
                          Ngày lập hóa đơn
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            checked
                            className="form-check-input"
                            name="circle_month"
                            value="circle_month"
                          />{' '}
                          Chu kỳ thu tiền
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            checked
                            className="form-check-input"
                            name="date_join"
                            value="date_join"
                          />{' '}
                          Ngày vào ở
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            checked
                            className="form-check-input"
                            name="date_terminate"
                            value="date_terminate"
                          />{' '}
                          Thời hạn hợp đồng
                        </label>
                      </li>
                    </ul>
                  </div>
                  <button id="download-excel" style={{ marginLeft: '10px' }} className="ml-2 btn btn-primary">
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
                      className="feather feather-file-text">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Xuất excel
                  </button>
                </div>
              </div>
            </div>
            <div className="header-table header-item" style={{ padding: '10px 10px' }}>
              <div className="d-flex">
                <div className="icon">
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
                    className="feather feather-filter">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span id="filter-count">0</span>
                </div>
                <div className="d-flex" style={{ flexWrap: 'wrap' }}>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_active"
                      data-value="status"
                      value="is_active"
                    />
                    <label className="form-check-label" htmlFor="is_active">
                      Đang ở
                    </label>
                    <span className="count-filter active success">0</span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_empty"
                      data-value="status"
                      value="is_empty"
                    />
                    <label className="form-check-label" htmlFor="is_empty">
                      Đang trống
                    </label>
                    <span className="count-filter empty error">0</span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_terminate_contract"
                      data-value="status"
                      value="is_terminate_contract"
                    />
                    <label className="form-check-label" htmlFor="is_terminate_contract">
                      Đang báo kết thúc{' '}
                    </label>
                    <span className="count-filter tick-terminate warning">0</span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_will_terminate_contract"
                      data-value="status"
                      value="is_will_terminate_contract"
                    />
                    <label className="form-check-label" htmlFor="is_will_terminate_contract">
                      Sắp hết hạn hợp đồng
                    </label>
                    <span className="count-filter will-terminate warning">0</span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_expire"
                      data-value="status"
                      value="is_expire"
                    />
                    <label className="form-check-label" htmlFor="is_expire">
                      Đã quá hạn hợp đồng
                    </label>
                    <span className="count-filter expire disable">0</span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_deposit_temp"
                      data-value="status"
                      value="is_deposit_temp"
                    />
                    <label className="form-check-label" htmlFor="is_deposit_temp">
                      Đang cọc giữ chỗ
                    </label>
                    <span className="count-filter deposit-temp warning">0</span>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="active_status"
                      data-value="active_status"
                      value="debt_bill,has_bill"
                    />
                    <label className="form-check-label" htmlFor="active_status">
                      Đang nợ tiền
                    </label>
                    <span className="count-filter debt error">0</span>
                  </div>
                </div>
              </div>
            </div>
            <div id="buttom-save-container">
              <div style={{ marginRight: '10px' }}>
                Bạn có <span id="count-edit">0</span> mục thay đổi bạn có muốn lưu ?
              </div>
              <div id="clear-change" className="btn btn-danger" style={{ marginRight: '10px' }}>
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
                  className="feather feather-x">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>{' '}
                Xóa tất cả thay đổi
              </div>
              <div id="save-change" className="btn btn-primary">
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
                  className="feather feather-save">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>{' '}
                Lưu thay đổi
              </div>
            </div>
            <div style={{ position: 'relative', height: '100%' }}>
              <ReactTabulator
                className="my-custom-table" // Thêm lớp tùy chỉnh nếu cần
                columns={columns}
                data={data}
                options={options}
                placeholder={<h1></h1>} // Sử dụng placeholder tùy chỉnh
              />
              {/* Thêm div cho hình ảnh và chữ nếu không có dữ liệu */}
              {data.length === 0 && (
                <div className="custom-placeholder">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fempty-box-4085812-3385481.webp?alt=media&token=eaf37b59-00e3-4d16-8463-5441f54fb60e"
                    alt="Không có dữ liệu"
                    className="placeholder-image"
                  />
                  <div className="placeholder-text">Không tìm thấy dữ liệu!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeWData
