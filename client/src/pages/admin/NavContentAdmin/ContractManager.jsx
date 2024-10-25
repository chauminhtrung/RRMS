import { useEffect } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { ReactTabulator } from 'react-tabulator';
import React, { useState } from 'react';
import DatePicker from 'react-flatpickr';
import { Modal, Button, Form } from 'react-bootstrap';
const ContractManager = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {

  const [show, setShow] = useState(false);
  const [asset, setAsset] = useState({
    name: '',
    icon: null,
    value: '',
    quantity: '',
    unit: 'Cái',
    supplier: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleIconSelect = (icon) => {
    setAsset({ ...asset, icon });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('New asset:', asset);
    setAsset({
      //setluu
    });
    handleClose();
  };

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
    { title: 'Tình Trạng', field: 'tinhtrang', hozAlign: 'center', minWidth: 40, editor: 'input' },
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
      tinhtrang: 'Đã Hoàn Thành',
    },
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
      headerSort: false,
    },
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
          margin: '0 10px 10px 10px',
        }}></div>

      <div style={{ marginLeft: '15px', marginRight: '10px' }}>
        <Box className="header-item">
          <h4 className="title-item">
            Tất Cả Hợp Đồng
            <i className="des">Danh sách hợp đồng được tạo khi thêm phiên bản ở mới</i>
          </h4>
          <Box display="flex" alignItems="center" style={{ width: '20%' }}>

          </Box>
        </Box>
      </div>

      <div className="header-table header-item" style={{ padding: '10px 10px', marginLeft: '15px', marginRight: '10px' }}>
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
              <input
                className="form-check-input"
                type="checkbox"
                id="is_empty"
                data-value="status"
                value="is_empty"
              />
              <label className="form-check-label" htmlFor="is_empty">
                Đang báo kết thúc
              </label>
              <span className="count-filter empty warning">0</span>
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
                Sắp hết hạn
              </label>
              <span className="count-filter empty error">0</span>
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

          <Modal show={show} onHide={handleClose} dialogClassName="custom-modal"
            size="xl">
            {/* size modal*/}
            <Modal.Header closeButton>
              <Modal.Title>Thiết lập hợp đồng</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '500px', overflowY: 'auto', padding: '20px' }}>
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6 col-sm-12">
                    {/* chỗ này thêm bảng */}
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <Form.Group className="mb-3" controlId="thoihanhopdong">
                      <Form.Label>Thời hạn hợp đồng</Form.Label>
                      <Form.Select
                        name="thoihanhopdong"
                        value={asset.thoihanhopdong}
                        onChange={handleChange}
                        required
                      >
                        <option value="">--Thời hạn hợp đồng--</option>
                        <option value="three-month">3 tháng</option>
                        <option value="six-month">6 tháng</option>
                        <option value="one-year">1 năm</option>
                        <option value="three-year">3 năm</option>
                      </Form.Select>
                      <div className="row">
                        <div className="col-6 mt-3">
                          <Form.Label>Ngày vào ở</Form.Label>
                          <Form.Control

                            type="date"
                            name="dateIn"
                            value={asset.dateIn}
                            placeholder='Ngày vào ở'
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Ngày kết thúc hợp đồng</Form.Label>
                          <Form.Control

                            type="date"
                            name="dateOut"
                            value={asset.dateOut}
                            placeholder='Ngày vào ở'
                            onChange={handleChange}
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
                            value={asset.soluongthanhvien}
                            placeholder='Số lượng thành viên'
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Control
                            type="text"
                            name="tennguoio"
                            value={asset.tennguoio}
                            placeholder='Tên người ở'
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Control
                            type="text"
                            name="sodienthoai"
                            value={asset.sodienthoai}
                            placeholder='Số điện thoại'
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-12 mt-3">
                          <Form.Control
                            type="text"
                            name="cccd"
                            value={asset.cccd}
                            placeholder='CMND/CCCD'
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Ngày Sinh</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateBth"
                            value={asset.dateBth}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Giới Tính</Form.Label>
                          <Form.Select
                            name="gioitinh"
                            value={asset.gioitinh}
                            onChange={handleChange}
                            required
                          >
                            <option value="">--Giới tính--</option>
                            <option value="nam">Nam</option>
                            <option value="nữ">Nữ</option>

                          </Form.Select>
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Select
                            name="tinhTP"
                            value={asset.tinhTP}
                            onChange={handleChange}
                            required
                          >
                            <option value="">--Tỉnh/Thành Phố--</option>
                          </Form.Select>
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Select
                            name="quanHuyen"
                            value={asset.quanHuyen}
                            onChange={handleChange}
                            required
                          >
                            <option value="">--Quận/Huyện--</option>
                          </Form.Select>
                        </div>
                        <div className="col-12 mt-3">
                          <Form.Select
                            name="phuongXa"
                            value={asset.phuongXa}
                            onChange={handleChange}
                            required
                          >
                            <option value="">--Phường/Xã--</option>
                          </Form.Select>
                        </div>
                        <div className="col-12 mt-3">
                          <Form.Control
                            type="text"
                            name="diachi"
                            value={asset.diachi}
                            placeholder='Địa chỉ'
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-12 mt-3">
                          <Form.Control
                            type="text"
                            name="congviec"
                            value={asset.congviec}
                            placeholder='Công việc hiện tại'
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Ngày cấp</Form.Label>
                          <Form.Control
                            type="date"
                            name="ngaycapCCCD"
                            value={asset.ngaycapCCCD}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Nơi cấp</Form.Label>
                          <Form.Control
                            type="text"
                            name="noicapCCCD"
                            value={asset.noicapCCCD}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Ảnh mặt trước CCCD/CMND</Form.Label>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            required
                          />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Label>Ảnh mặt sau CCCD/CMND</Form.Label>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            required
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dichvusudung">
                      <Form.Label>Dịch Vụ Sử Dụng</Form.Label>
                      <div className="row">
                        <div className="col-6">
                          <Form.Control
                            type="number"
                            name="tiendien"
                            placeholder='Tiền điện'
                            value={asset.tiendien}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-6">
                          <Form.Control
                            type="number"
                            name="sodienNow"
                            placeholder='Số điện hiện tại'
                            value={asset.sodienNow}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Control
                            type="number"
                            name="tiennuoc"
                            placeholder='Tiền nước'
                            value={asset.tiennuoc}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Control
                            type="number"
                            name="sonuocNow"
                            placeholder='Số nước hiện tại'
                            value={asset.sonuocNow}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="giatrihopdong">
                      <Form.Label>Thông tin giá trị hợp đồng</Form.Label>
                      <div className="row">
                        <div className="col-6">
                          <Form.Control
                            type="number"
                            name="giathue"
                            placeholder='Giá thuê'
                            value={asset.giathue}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-6">
                          <Form.Control
                            type="number"
                            name="tiencoc"
                            placeholder='Tiền cọc'
                            value={asset.tiencoc}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-12 mt-3">
                          <Form.Select
                            name="chukithutien"
                            value={asset.chukithutien}
                            onChange={handleChange}
                            required
                          >
                            <option value="">--Chu kì thu tiên--</option>
                            <option value="0">1 tháng</option>
                            <option value="1">1 năm</option>
                          </Form.Select>
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="mauvanban">
                      <Form.Label>Mẫu văn bản hợp đồng</Form.Label>
                      <Form.Select
                        name="mauhopdong"
                        value={asset.mauhopdong}
                        onChange={handleChange}
                        required
                      >
                        <option value="">--Mẫu văn bản hợp đồng--</option>
                        <option value="0">Hợp đồng điện tử</option>
                        <option value="1">Hợp đồng giấy</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ghichu">
                      <Form.Label>Ghi chú</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="moigioi">
                      <Form.Label>Môi giới</Form.Label>
                      <div className="row">
                        <div className="col-12">
                          <Form.Select
                            name="dsmoigioi"
                            value={asset.dsmuagioi}
                            onChange={handleChange}
                            required
                          >
                            <option value="">--Danh sách môi giới--</option>
                          </Form.Select>
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Select
                            name="hoahong"
                            value={asset.hoahong}
                            onChange={handleChange}
                            required
                          >
                            <option value="">--Mức hoa hồng--</option>
                          </Form.Select>
                        </div>
                        <div className="col-6 mt-3">
                          <Form.Control
                            type="number"
                            name="tienhoahong"
                            placeholder='Tiền hoa hồng nhận được'
                            value={asset.tienhoahong}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="mt-3">
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Tạo phiếu chi"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </Form.Group>
                  </div>
                </div>

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="primary" type="submit">
                  Thêm hợp đồng mới
                </Button>
              </Box>
            </Modal.Footer>
          </Modal>
        </Box>

      </div>
      <div className='mt-3' style={{ marginLeft: '15px', marginRight: '10px' }}>
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
