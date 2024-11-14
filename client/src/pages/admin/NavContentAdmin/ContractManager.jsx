import { useEffect } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import { Box } from '@mui/material'
import { ReactTabulator } from 'react-tabulator'
import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
const ContractManager = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  const [show, setShow] = useState(false)
  const [tenant, setTenant] = useState({
    fullname: '',
    phone: '',
    CCCD: '',
    email: '',
    birthday: null,
    gender: '', // 'MALE', 'FEMALE', hoặc 'OTHER'
    address: '',
    job: '',
    License_date: null,
    Place_of_license: '',
    front_photo: '',
    back_photo: '',
    role: false,
    temporary_residence: false,
    information_verify: false
  })

  const [contract, setContract] = useState({
    contractId: null,
    room: null,
    tenant: null,
    landlord: null,
    contract_template: null,
    broker: null,
    moveinDate: '',
    leaseTerm: '',
    closeContract: '',
    description: '',
    debt: 0.0,
    price: 0.0,
    collection_cycle: '',
    createdate: '',
    Sign_contract: '',
    language: 'Tiếng Việt',
    countTenant: 1,
    status: '' // Giá trị có thể là 'ACTIVE', 'ENDED', hoặc 'IATExpire'
  })

  const [selectedRoomId, setSelectedRoomId] = useState(null)
  const rooms = [
    { roomId: 1, roomName: 'Châu minh trung', address: 'Địa chỉ 1', price: 200000 },
    { roomId: 2, roomName: 'Châu minh trung', address: 'Địa chỉ 2', price: 200000 }
  ]

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Hàm onChange để cập nhật các trường trong tenant
  const handleTenantChange = (event) => {
    const { name, value } = event.target
    setTenant((prevTenant) => ({
      ...prevTenant,
      [name]: value
    }))
  }

  // Hàm onChange để cập nhật các trường trong contract
  const handleContractChange = (event) => {
    const { name, value } = event.target
    setContract((prevContract) => ({
      ...prevContract,
      [name]: value
    }))
  }

  const handleRoomClick = (roomId) => {
    setSelectedRoomId(roomId === selectedRoomId ? null : roomId) // Nếu phòng đã chọn thì bỏ chọn, nếu không thì chọn phòng mới
    // Hiển thị ID của phòng khi chọn
    alert(`ID phòng: ${roomId}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(contract)
  }

  const columns = [
    { title: 'STT', field: 'STT', hozAlign: 'center', minWidth: 40, editor: 'input' }, // Đặt minWidth để tránh cột bị quá nhỏ
    { title: 'Tên Phòng', field: 'name', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Giá Thuê', field: 'giathue', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Mức Giá Tiền Cọc', field: 'mucgiathue', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Chu Kỳ Thu', field: 'chukythu', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Mẫu Hợp Đồng', field: 'mauhopdong', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Ngày Lập', field: 'ngaylap', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Ngày Vào Ở', field: 'ngayvaoo', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Thời Hạn Hợp Đồng', field: 'thoihanhopdong', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Ký Hợp Đồng', field: 'kyhopdong', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Ngôn Ngữ', field: 'ngonngu', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Tình Trạng', field: 'tinhtrang', hozAlign: 'center', minWidth: 40, editor: 'input' }
  ]

  const data = [
    {
      STT: '1',
      name: 'Phòng A202',
      giathue: '5,000,000 VND',
      mucgiathue: '4,000,000 VND',
      chukythu: '1 Tháng',
      mauhopdong: 'Hợp Đồng Điện Tử',
      ngaylap: '18-01-2024',
      ngayvaoo: '01-02-2024',
      thoihanhopdong: '12 tháng',
      kyhopdong: 'Nguyễn Tấn Tài',
      ngonngu: 'Việt Nam',
      tinhtrang: 'Đã Hoàn Thành'
    }
  ]

  const options = {
    height: '500px', // Chiều cao của bảng
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

  useEffect(() => {
    setIsAdmin(true)
  }, [])
  return (
    <div>
      <NavAdmin
        setmotels={setmotels}
        motels={motels}
        setIsAdmin={setIsAdmin}
        setIsNavAdmin={setIsNavAdmin}
        isNavAdmin={isNavAdmin}
      />
      <div
        style={{
          backgroundColor: '#fff',
          padding: '15px 15px 15px 15px',
          borderRadius: '10px',
          margin: '0 10px 10px 10px'
        }}></div>

      <div style={{ marginLeft: '15px', marginRight: '10px' }}>
        <Box className="header-item">
          <h4 className="title-item">
            Tất Cả Hợp Đồng
            <i className="des">Danh sách hợp đồng được tạo khi thêm phiên bản ở mới</i>
          </h4>
          <Box display="flex" alignItems="center" style={{ width: '20%' }}></Box>
        </Box>
      </div>

      <div
        className="header-table header-item"
        style={{ padding: '10px 10px', marginLeft: '15px', marginRight: '10px' }}>
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
                Trong thời hạn hợp đồng
              </label>
              <span className="count-filter active success">0</span>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="is_empty" data-value="status" value="is_empty" />
              <label className="form-check-label" htmlFor="is_empty">
                Đang báo kết thúc
              </label>
              <span className="count-filter empty warning">0</span>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="is_empty" data-value="status" value="is_empty" />
              <label className="form-check-label" htmlFor="is_empty">
                Sắp hết hạn
              </label>
              <span className="count-filter empty error">0</span>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="is_empty" data-value="status" value="is_empty" />
              <label className="form-check-label" htmlFor="is_empty">
                Đã quá hạn
              </label>
              <span className="count-filter empty ">0</span>
            </div>
          </div>
        </div>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="primary" onClick={handleShow}>
            Thiết lập hợp đồng
          </Button>

          <Modal show={show} onHide={handleClose} dialogClassName="custom-modal" size="xl">
            {/* size modal*/}
            <Modal.Header closeButton>
              <Modal.Title>Thiết lập hợp đồng</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '500px', overflowY: 'auto', padding: '20px' }}>
              <Form>
                <div className="row">
                  <div className="col-lg-7 col-sm-12">
                    <div className="col-12 mb-2">
                      <div className="title-item-small">
                        <b>Danh sách phòng</b>
                        <i className="des">Danh sách phòng có thể lập hợp đồng</i>
                      </div>
                    </div>
                    <div style={{ position: 'sticky', top: '20px' }}>
                      <div className="room-list row g-2">
                        {rooms.map((room) => (
                          <div
                            key={room.roomId}
                            className={`col-6 room-item ${selectedRoomId === room.roomId ? 'active' : ''}`}
                            onClick={() => handleRoomClick(room.roomId)} // Chọn phòng khi click
                          >
                            <div className="d-flex room-item-inner align-items-center">
                              <div className="flex-grow-0 icon-room">
                                {selectedRoomId === room.roomId ? (
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
                                    className="feather feather-check">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                ) : (
                                  <img
                                    width="20px"
                                    src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Froom.png?alt=media&token=9f1a69c1-ce2e-4586-ba90-94db53443d49"
                                    alt=""
                                  />
                                )}
                              </div>
                              <div className="flex-grow-1">
                                <div>
                                  <b>{room.roomName}</b>
                                  <span
                                    style={{
                                      backgroundColor: '#ED6004',
                                      display: 'table',
                                      fontSize: '12px',
                                      borderRadius: '5px',
                                      padding: '0 7px',
                                      color: '#fff'
                                    }}>
                                    Đang trống
                                  </span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-1">
                                  <div>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-dollar-sign">
                                      <line x1="12" y1="1" x2="12" y2="23"></line>
                                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>{' '}
                                    {room.price.toLocaleString()}₫
                                  </div>
                                  <div>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-user">
                                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                      <circle cx="12" cy="7" r="4"></circle>
                                    </svg>{' '}
                                    0/1 người
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-sm-12">
                    <Form.Group className="mb-3" controlId="thoihanhopdong">
                      <Form.Label>
                        <div className="title-item-small">
                          <b>Thời hạn hợp đồng:</b>
                        </div>
                      </Form.Label>
                      <Form.Select name="leaseTerm" value={contract.leaseTerm} onChange={handleContractChange} required>
                        <option value="">--Thời hạn hợp đồng--</option>
                        {[
                          { value: '0', label: 'Tùy chỉnh' },
                          { value: '1', label: '1 tháng' },
                          { value: '2', label: '2 tháng' },
                          { value: '3', label: '3 tháng' },
                          { value: '4', label: '4 tháng' },
                          { value: '5', label: '5 tháng' },
                          { value: '6', label: '6 tháng' },
                          { value: '7', label: '7 tháng' },
                          { value: '8', label: '8 tháng' },
                          { value: '9', label: '9 tháng' },
                          { value: '10', label: '10 tháng' },
                          { value: '11', label: '11 tháng' },
                          { value: '12', label: '1 năm' },
                          { value: '18', label: '1 năm, 6 tháng' },
                          { value: '24', label: '2 năm' },
                          { value: '32', label: '3 năm' },
                          { value: '48', label: '4 năm' },
                          { value: '60', label: '5 năm' }
                        ].map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                      <div className="row">
                        <div className="col-6 mt-3">
                          <Form.Label>Ngày vào ở</Form.Label>
                          <Form.Control
                            type="date"
                            name="moveinDate"
                            placeholder="Ngày vào ở"
                            value={contract.moveinDate}
                            onChange={handleContractChange}
                            required
                          />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Ngày kết thúc hợp đồng</Form.Label>
                          <Form.Control
                            type="date"
                            name="closeContract"
                            placeholder="Ngày vào ở"
                            value={contract.closeContract}
                            onChange={handleContractChange}
                            required
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="thongitnkhach">
                      <Form.Label>Thông tin khách thuê</Form.Label>
                      <div className="row">
                        <div className="col-12">
                          <Form.Control
                            type="number"
                            name="soluongthanhvien"
                            placeholder="Số lượng thành viên"
                            required
                          />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Control type="text" name="tennguoio" placeholder="Tên người ở" required />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Control type="text" name="sodienthoai" placeholder="Số điện thoại" required />
                        </div>
                        <div className="col-12 mt-3">
                          <Form.Control type="text" name="cccd" placeholder="CMND/CCCD" required />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Ngày Sinh</Form.Label>
                          <Form.Control type="date" name="dateBth" required />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Giới Tính</Form.Label>
                          <Form.Select name="gioitinh" required>
                            <option value="">--Giới tính--</option>
                            <option value="nam">Nam</option>
                            <option value="nữ">Nữ</option>
                          </Form.Select>
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Select name="tinhTP" required>
                            <option value="">--Tỉnh/Thành Phố--</option>
                          </Form.Select>
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Select name="quanHuyen" required>
                            <option value="">--Quận/Huyện--</option>
                          </Form.Select>
                        </div>
                        <div className="col-12 mt-3">
                          <Form.Select name="phuongXa" required>
                            <option value="">--Phường/Xã--</option>
                          </Form.Select>
                        </div>
                        <div className="col-12 mt-3">
                          <Form.Control type="text" name="diachi" placeholder="Địa chỉ" required />
                        </div>
                        <div className="col-12 mt-3">
                          <Form.Control type="text" name="congviec" placeholder="Công việc hiện tại" required />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Ngày cấp</Form.Label>
                          <Form.Control type="date" name="ngaycapCCCD" required />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Nơi cấp</Form.Label>
                          <Form.Control type="text" name="noicapCCCD" required />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Ảnh mặt trước CCCD/CMND</Form.Label>
                          <Form.Control type="file" accept="image/*" required />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Ảnh mặt sau CCCD/CMND</Form.Label>
                          <Form.Control type="file" accept="image/*" required />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dichvusudung">
                      <Form.Label>Dịch Vụ Sử Dụng</Form.Label>
                      <div className="row">
                        <div className="col-6">
                          <Form.Control type="number" name="tiendien" placeholder="Tiền điện" required />
                        </div>
                        <div className="col-6">
                          <Form.Control type="number" name="sodienNow" placeholder="Số điện hiện tại" required />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Control type="number" name="tiennuoc" placeholder="Tiền nước" required />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Control type="number" name="sonuocNow" placeholder="Số nước hiện tại" required />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="giatrihopdong">
                      <Form.Label>Thông tin giá trị hợp đồng</Form.Label>
                      <div className="row">
                        <div className="col-6">
                          <Form.Control
                            type="number"
                            name="price"
                            placeholder="Giá thuê"
                            value={contract.price}
                            onChange={handleContractChange}
                            required
                          />
                        </div>
                        <div className="col-6">
                          <Form.Control
                            type="number"
                            name="debt"
                            placeholder="Tiền cọc"
                            value={contract.debt}
                            onChange={handleContractChange}
                            required
                          />
                        </div>
                        <div className="col-12 mt-3">
                          <Form.Select
                            name="collection_cycle"
                            value={contract.collection_cycle}
                            onChange={handleContractChange}
                            required>
                            <option value="">--Chu kỳ thu tiền--</option>
                            {[
                              { value: '0', label: 'Tùy chỉnh' },
                              { value: '1', label: '1 tháng' },
                              { value: '2', label: '2 tháng' },
                              { value: '3', label: '3 tháng' },
                              { value: '4', label: '4 tháng' },
                              { value: '5', label: '5 tháng' },
                              { value: '6', label: '6 tháng' },
                              { value: '7', label: '7 tháng' },
                              { value: '8', label: '8 tháng' },
                              { value: '9', label: '9 tháng' },
                              { value: '10', label: '10 tháng' },
                              { value: '11', label: '11 tháng' },
                              { value: '12', label: '1 năm' },
                              { value: '18', label: '1 năm, 6 tháng' },
                              { value: '24', label: '2 năm' },
                              { value: '32', label: '3 năm' },
                              { value: '48', label: '4 năm' },
                              { value: '60', label: '5 năm' }
                            ].map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="mauvanban">
                      <Form.Label>Mẫu văn bản hợp đồng</Form.Label>
                      <Form.Select name="mauhopdong" required>
                        <option value="">--Mẫu văn bản hợp đồng--</option>
                        <option value="0">Hợp đồng điện tử</option>
                        <option value="1">Hợp đồng giấy</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                      <Form.Label>Ghi chú</Form.Label>
                      <Form.Control as="textarea" rows={3} onChange={handleContractChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="moigioi">
                      <Form.Label>Môi giới</Form.Label>
                      <div className="row">
                        <div className="col-12">
                          <Form.Select name="dsmoigioi" required>
                            <option value="">--Danh sách môi giới--</option>
                          </Form.Select>
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Select name="hoahong" required>
                            <option value="">--Mức hoa hồng--</option>
                          </Form.Select>
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Control type="number" name="tienhoahong" required />
                        </div>
                        <div className="mt-3">
                          <Form.Check type="switch" id="custom-switch" label="Tạo phiếu chi" />
                        </div>
                      </div>
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Thêm hợp đồng mới
                </Button>
              </Box>
            </Modal.Footer>
          </Modal>
        </Box>
      </div>
      <div className="mt-3" style={{ marginLeft: '15px', marginRight: '10px' }}>
        <ReactTabulator
          className="my-custom-table rounded" // Thêm lớp tùy chỉnh nếu cần
          columns={columns}
          data={data}
          options={options}
          placeholder={<h1></h1>} // Sử dụng placeholder tùy chỉnh
        />
      </div>
    </div>
  )
}

export default ContractManager
