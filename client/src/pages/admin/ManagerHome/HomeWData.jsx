/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip } from 'react-tooltip'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import 'react-tabulator/lib/styles.css' // required styles
import 'react-tabulator/lib/css/tabulator.min.css' // theme
import { ReactTabulator } from 'react-tabulator'
import { getRoomByMotelId } from '~/apis/roomAPI'

const HomeWData = ({ Motel }) => {
  const { motelId } = useParams()
  const [rooms, setRooms] = useState([])
  const [showMenu, setShowMenu] = useState(null) // Trạng thái của menu hiện tại
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const menuRef = useRef(null) // Tham chiếu đến menu
  // Hàm xử lý nhấn ngoài menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Kiểm tra xem nhấn ngoài menu hay không
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(null)
        console.log('ngoai menu')
      } else {
        console.log('set null ')
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    //neu co motelId tren URL
    if (motelId) {
      try {
        const dataRoom = await getRoomByMotelId(motelId)
        setRooms(dataRoom)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const dataRoom = await getRoomByMotelId(Motel[0].motelId)
        setRooms(dataRoom)
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Định dạng tiền tệ Việt Nam (VND)
  const currencyFormatter = (cell) => {
    const value = cell.getValue()
    if (value !== null && value !== undefined) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(value)
    }
    return value
  }

  // Định dạng thêm "/1 người" vào cột countTenant
  const tenantFormatter = (cell) => {
    const countTenant = cell.getValue()
    const svgiconuser = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`
    if (countTenant !== null && countTenant !== undefined) {
      return `${svgiconuser} ${countTenant} / 4 người`
    }
    return countTenant
  }

  // Hàm định dạng ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  //ham dinh dang ngay lap hoa don
  const invoicedateFormatter = (cell) => {
    const countTenant = cell.getValue()
    if (countTenant !== null && countTenant !== undefined) {
      return `Ngày ${countTenant}`
    }
    return countTenant
  }

  //ham dinh dang chu ky thu tien
  const paymentCircleFormatter = (cell) => {
    const countTenant = cell.getValue()
    if (countTenant !== null && countTenant !== undefined) {
      return `${countTenant} tháng`
    }
    return countTenant
  }

  // Formatter cho cột "finance"
  const financeFormatter = (cell) => {
    const financeValue = cell.getValue()

    // Nếu giá trị tài chính là "Đang trống", hiển thị badge với màu cam
    if (financeValue === 'wait') {
      return `<span class="badge mt-2 " style="background-color: #7dc242; white-space: break-spaces;">Chờ kỳ thu tới</span>`
    }

    // Nếu không phải "Đang trống", hiển thị giá trị tài chính
    return financeValue
  }

  // Formatter cho cột "Status"
  const StatusFormatter = (cell) => {
    const financeValue = cell.getValue()
    // Nếu giá trị tài chính là "Đang trống", hiển thị badge với màu cam
    if (financeValue === true) {
      return `<span class="badge mt-2 " style="background-color: #7dc242; white-space: break-spaces;">Đang ở</span>`
    }
    if (financeValue === false) {
      return `<span class="badge mt-2 " style="background-color: #ED6004; white-space: break-spaces;">Đang trống</span>`
    }

    // Nếu không phải "Đang trống", hiển thị giá trị tài chính
    return financeValue
  }

  const handleActionClick = (e, roomId) => {
    const { clientX, clientY } = e
    e.stopPropagation() // Ngừng sự kiện click để không bị bắt bởi sự kiện ngoài
    // In ra tọa độ
    console.log('Tọa độ click:', { clientX, clientY })

    // Sử dụng getBoundingClientRect để lấy vị trí chính xác của phần tử được nhấn
    const targetElement = e.currentTarget
    const rect = targetElement.getBoundingClientRect()

    // Cập nhật vị trí của menu sao cho hiển thị gần biểu tượng Action
    setMenuPosition({
      x: rect.left + window.scrollX + rect.width / 2, // Centered horizontally
      y: rect.top + window.scrollY + rect.height // Below the icon
    })
    setShowMenu(roomId) // Hiển thị menu cho hàng với roomId tương ứng
  }

  // Hàm xử lý khi người dùng chọn một mục trong menu
  const handleItemClick = (label) => {
    if (label === 'Đóng menu') {
      setShowMenu(null) // Đóng menu
    } else {
      alert(`Action: ${label} on room ${showMenu}`)
    }
  }

  const menuItems = [
    { id: 1, label: 'Lập hóa đơn', icon: 'dollar-sign' },
    { id: 2, label: 'Chi tiết phòng', icon: 'arrow-right-circle' },
    { id: 3, label: 'Danh sách khách thuê', icon: 'user' },
    { id: 4, label: 'Chuyển phòng', icon: 'refresh-ccw' },
    { id: 5, label: 'Báo kết thúc hợp đồng phòng', icon: 'bell' },
    { id: 6, label: 'Cài đặt dịch vụ', icon: 'settings' },
    { id: 7, label: 'Kết thúc hợp đồng phòng', icon: 'log-out' },
    { id: 8, label: 'Thiết lập tài sản', icon: 'trello' },
    { id: 9, label: 'Xem văn bản hợp đồng', icon: 'arrow-right-circle' },
    { id: 10, label: 'Quản lý xe', icon: 'truck' },
    { id: 11, label: 'In văn bản hợp đồng', icon: 'printer' },
    { id: 12, label: 'Ghi chú', icon: 'edit-3', textClass: 'text-success' },
    { id: 13, label: 'Chia sẻ văn bản hợp đồng', icon: 'share' },
    { id: 14, label: 'Xóa phòng', icon: 'trash-2', textClass: 'text-danger' },
    { id: 15, label: 'Chia sẻ mã kết nối', icon: 'share-2' },
    { id: 16, label: 'Đóng menu', icon: 'x-circle', textClass: 'close-menu-action' }
  ]
  const columns = [
    { title: 'id', field: 'roomId', hozAlign: 'center', minWidth: 40, visible: false },
    { title: 'Tên phòng', field: 'name', hozAlign: 'center', minWidth: 40, editor: 'input' }, // Đặt minWidth để tránh cột bị quá nhỏ
    { title: 'Nhóm', field: 'group', hozAlign: 'center', minWidth: 40, editor: 'input' },
    {
      title: 'Giá thuê',
      field: 'price',
      hozAlign: 'center',
      minWidth: 40,
      editor: 'input',
      formatter: currencyFormatter,
      cssClass: 'bold-text'
    },
    {
      title: 'Mức giá tiền cọc',
      field: 'deposit',
      hozAlign: 'center',
      minWidth: 150,
      editor: 'input',
      formatter: currencyFormatter,
      cssClass: 'bold-text'
    },
    {
      title: 'Tiền nợ',
      field: 'debt',
      hozAlign: 'center',
      minWidth: 40,
      editor: 'input',
      formatter: currencyFormatter,
      cssClass: 'bold-text'
    },
    {
      title: 'Khách thuê',
      field: 'countTenant',
      hozAlign: 'center',
      minWidth: 150,
      editor: 'input',
      formatter: tenantFormatter
    },
    {
      title: 'Ngày lập hóa đơn',
      field: 'invoiceDate',
      hozAlign: 'center',
      minWidth: 150,
      editor: 'input',
      formatter: invoicedateFormatter
    },
    {
      title: 'Chu kỳ thu tiền',
      field: 'paymentCircle',
      hozAlign: 'center',
      minWidth: 150,
      editor: 'input',
      formatter: paymentCircleFormatter
    },
    {
      title: 'Ngày vào ở',
      field: 'moveInDate',
      hozAlign: 'center',
      minWidth: 150,
      editor: 'input',
      formatter: (cell) => formatDate(cell.getValue())
    },
    {
      title: 'Thời hạn hợp đồng',
      field: 'contractDuration',
      hozAlign: 'center',
      minWidth: 150,
      editor: 'input',
      formatter: (cell) => formatDate(cell.getValue())
    },
    {
      title: 'Tình trạng',
      field: 'status',
      hozAlign: 'center',
      minWidth: 40,
      editor: 'input',
      formatter: StatusFormatter
    },
    {
      title: 'Tài chính',
      field: 'finance',
      hozAlign: 'center',
      minWidth: 40,
      editor: 'input',
      formatter: financeFormatter
    },
    {
      title: 'Action',
      field: 'Action',
      hozAlign: 'center',
      formatter: (cell) => {
        const rowId = cell.getRow().getData().roomId
        const element = document.createElement('div')
        element.classList.add('icon-menu-action')
        element.innerHTML = `
          <svg    xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-more-vertical">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        `

        element.addEventListener('click', (e) => handleActionClick(e, rowId))
        return element
      }
    }
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
      headerSort: false
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '15px 15px 15px 15px',
        borderRadius: '10px',
        margin: '0 10px 10px 10px'
      }}>
      <div className="page-home">
        {/* report */}

        <div>
          <div className="row g-3 row-box-home" style={{ marginTop: '0px' }}>
            <div className="col-sm-3" style={{ marginTop: '0px' }}>
              <div className="item-home " data-bs-toggle="modal" data-bs-target="#reportBillDebt">
                <a href="#" className="create-home">
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
                <a href="#" className="box-home span-red-white">
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
                <a href="#" className="create-home">
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
                <a href="#" className="box-home span-primary-white">
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
                <a href="#" className="create-home">
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
                <a href="#" className="box-home span-primary-white">
                  <div className="d-flex align-items-center">
                    <span className="icon-home">
                      <img
                        width="36px"
                        src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Ficonadminql3.png?alt=media&token=254c3d4e-c118-4538-83ad-4270f1c823be"
                      />
                    </span>
                    <div>
                      <span style={{ color: '#20a9e7' }} className="titleadmin">
                        Tổng số tiền cọc giữ phòng
                      </span>
                      <h3 style={{ color: '#20a9e7' }}>0đ</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-3" style={{ marginTop: '0px' }}>
              <div className="item-home report">
                <a href="#" className="create-home">
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
                <a href="#" className="box-home span-red-white">
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
                    marginRight: '15px'
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
                          color: '#fff'
                        }}>
                        12
                      </span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="list-show-column">
                      <li>
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            defaultChecked
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
                            defaultChecked
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
                            defaultChecked
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
                            defaultChecked
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
                            defaultChecked
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
                            defaultChecked
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
                            defaultChecked
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
                            defaultChecked
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
                data={rooms}
                options={options}
                placeholder={<h1></h1>} // Sử dụng placeholder tùy chỉnh
              />
              {/* Thêm div cho hình ảnh và chữ nếu không có dữ liệu */}
              {rooms.length === 0 && (
                <div className="custom-placeholder">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Fempty-box-4085812-3385481.webp?alt=media&token=eaf37b59-00e3-4d16-8463-5441f54fb60e"
                    alt="Không có dữ liệu"
                    className="placeholder-image"
                  />
                  <div className="placeholder-text">Không tìm thấy dữ liệu!</div>
                </div>
              )}

              {showMenu && (
                <div
                  className="tabulator-menu tabulator-popup-container "
                  ref={menuRef} // Gán ref đúng cách cho menu
                  style={{
                    position: 'absolute',
                    top: menuPosition.y - 910,
                    left: menuPosition.x - 350,
                    transform: 'translateX(-50%)'
                  }}>
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className={`tabulator-menu-item ${item.textClass || ''}`}
                      onClick={() => handleItemClick(item.label)} // Đóng menu khi chọn item
                    >
                      {item.icon && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`feather feather-${item.icon}`}>
                          {item.icon === 'dollar-sign' && (
                            <>
                              <line x1="12" y1="1" x2="12" y2="23" />
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </>
                          )}
                          {item.icon === 'arrow-right-circle' && (
                            <>
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 16 16 12 12 8" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                            </>
                          )}
                          {item.icon === 'user' && (
                            <>
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </>
                          )}
                          {item.icon === 'refresh-ccw' && (
                            <>
                              <polyline points="1 4 1 10 7 10" />
                              <polyline points="23 20 23 14 17 14" />
                              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                            </>
                          )}
                          {item.icon === 'bell' && (
                            <>
                              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </>
                          )}
                          {item.icon === 'settings' && (
                            <>
                              <circle cx="12" cy="12" r="3" />
                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </>
                          )}
                          {item.icon === 'log-out' && (
                            <>
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                              <polyline points="16 17 21 12 16 7"></polyline>
                              <line x1="21" y1="12" x2="9" y2="12"></line>
                            </>
                          )}
                          {item.icon === 'trello' && (
                            <>
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <rect x="7" y="7" width="3" height="9"></rect>
                              <rect x="14" y="7" width="3" height="5"></rect>
                            </>
                          )}
                          {item.icon === 'printer' && (
                            <>
                              <polyline points="6 9 6 2 18 2 18 9" />
                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                              <rect x="6" y="14" width="12" height="8" />
                            </>
                          )}
                          {item.icon === 'edit-3' && (
                            <>
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </>
                          )}
                          {item.icon === 'share' && (
                            <>
                              <path d="M4 12v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
                              <polyline points="16 6 12 2 8 6" />
                              <line x1="12" y1="2" x2="12" y2="15" />
                            </>
                          )}
                          {item.icon === 'trash-2' && (
                            <>
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </>
                          )}
                          {item.icon === 'share-2' && (
                            <>
                              <circle cx="18" cy="5" r="3" />
                              <circle cx="6" cy="12" r="3" />
                              <circle cx="18" cy="19" r="3" />
                              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </>
                          )}
                          {item.icon === 'x-circle' && (
                            <>
                              <circle cx="12" cy="12" r="10" />
                              <line x1="15" y1="9" x2="9" y2="15" />
                              <line x1="9" y1="9" x2="15" y2="15" />
                            </>
                          )}
                          {item.icon === 'truck' && (
                            <>
                              <rect x="1" y="3" width="15" height="13" />
                              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                              <circle cx="5.5" cy="18.5" r="2.5" />
                              <circle cx="18.5" cy="18.5" r="2.5" />
                            </>
                          )}
                          {/* Thêm các biểu tượng khác nếu cần */}
                        </svg>
                      )}

                      {item.label}
                    </div>
                  ))}
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
