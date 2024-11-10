import { useEffect } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import { Box } from '@mui/material'
import { ReactTabulator } from 'react-tabulator'
import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const AssetManager = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  const [show, setShow] = useState(false)
  const [asset, setAsset] = useState({
    name: '',
    icon: null,
    value: '',
    quantity: '',
    unit: 'Cái',
    supplier: ''
  })

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value })
  }

  const [selectedIcon, setSelectedIcon] = useState(null) //tạo bảng chọn icon

  const icons = [
    { id: 'ban', icon: <img src="\icon-ban.png" style={{ width: '24px' }} /> },
    { id: 'banan', icon: <img src="\icon-banan.png" style={{ width: '24px' }} /> },
    { id: 'bed', icon: <img src="\icon-bed.png" style={{ width: '24px' }} /> },
    { id: 'chiakhoa', icon: <img src="\icon-chiakhoa.png" style={{ width: '24px' }} /> },
    { id: 'denngu', icon: <img src="\icon-denngu.png" style={{ width: '24px' }} /> },
    { id: 'maygiat', icon: <img src="\icon-maygiat.png" style={{ width: '24px' }} /> },
    { id: 'maylanh', icon: <img src="\icon-maylanh.png" style={{ width: '24px' }} /> },
    { id: 'okhoa', icon: <img src="\icon-okhoa.png" style={{ width: '24px' }} /> },
    { id: 'sofa', icon: <img src="\icon-sofa.png" style={{ width: '24px' }} /> },
    { id: 'tuao', icon: <img src="\icon-tuao.png" style={{ width: '24px' }} /> },
    { id: 'tusach', icon: <img src="\icon-tusach.png" style={{ width: '24px' }} /> }
  ]

  const handleIconClick = (iconId) => {
    console.log(iconId)

    setSelectedIcon(iconId)
  }

  const handleSubmit = (e) => {
    console.log('cl')
    console.log(selectedIcon)

    e.preventDefault()
    // Xử lý logic lưu trữ tài sản mới
    console.log('New asset:', asset)
    setAsset({
      name: '',
      icon: null,
      value: '',
      quantity: '',
      unit: 'Cái',
      supplier: ''
    })
    // handleClose()
  }

  const columns = [
    { title: 'STT', field: 'STT', hozAlign: 'center', minWidth: 40, editor: 'input' }, // Đặt minWidth để tránh cột bị quá nhỏ
    { title: 'Tên Tài Sản', field: 'name', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Giá Trị Tài Sản', field: 'giathue', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Giá Trị Nhập Vào', field: 'mucgiathue', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Tổng Số Lượng', field: 'chukythu', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Đơn Vị', field: 'mauhopdong', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Đơn Vị Cung Cấp', field: 'ngaylap', hozAlign: 'center', minWidth: 40, editor: 'input' }
  ]

  const data = [
    {
      STT: '1',
      name: 'Máy Lạnh',
      giathue: '5,000,000 VND',
      mucgiathue: '400,000 VND',
      chukythu: '1',
      mauhopdong: 'Cái',
      ngaylap: 'Điện máy xanh'
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
            Tất Cả Tài Sản
            <i className="des">Danh sách tài sản đang có</i>
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
        </div>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="primary" onClick={handleShow}>
            Thêm tài sản
          </Button>

          <Modal show={show} onHide={handleClose} dialogClassName="custom-modal" size="lg">
            {/* size modal*/}
            <Modal.Header closeButton>
              <Modal.Title>Thêm tài sản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="assetName">
                  <Form.Label>Tên tài sản</Form.Label>
                  <Form.Control type="text" name="name" value={asset.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="assetIcon">
                  <Form.Label>Chọn icon</Form.Label>
                  <div
                    className="icon-table"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gridGap: '10px'
                    }}>
                    {icons.map((icon) => (
                      <div
                        key={icon.id}
                        className={`icon-cell ${selectedIcon === icon.id ? 'selected' : ''}`}
                        onClick={() => handleIconClick(icon.id)}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '10px',
                          border: '1px solid #ccc',
                          cursor: 'pointer',
                          backgroundColor: selectedIcon === icon.id ? '#e6f2ff' : 'transparent',
                          borderColor: selectedIcon === icon.id ? '#007bff' : '#ccc'
                        }}>
                        <span className="icon" style={{ fontSize: '24px' }}>
                          {icon.icon}
                        </span>
                      </div>
                    ))}
                  </div>
                </Form.Group>
                <div className="row">
                  <Form.Group className="mb-3 col-6" controlId="giatritaisan">
                    <Form.Label>Giá trị tài sản</Form.Label>
                    <Form.Control
                      type="number"
                      name="giatritaisan"
                      value={asset.giatritaisan}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-6" controlId="giatrinhapvao">
                    <Form.Label>Giá trị nhập vào</Form.Label>
                    <Form.Control
                      type="number"
                      name="giatrinhapvao"
                      value={asset.giatrinhapvao}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-6" controlId="tongsoluong">
                    <Form.Label>Tổng số lượng</Form.Label>
                    <Form.Control type="number" name="tongsoluong" value={asset.tongsoluong} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3 col-6" controlId="donvinhapvao">
                    <Form.Label>Đơn vị nhập vào</Form.Label>
                    <Form.Control type="text" name="donvinhapvao" value={asset.giatrinhapvao} onChange={handleChange} />
                  </Form.Group>
                </div>
                <Box display="flex" justifyContent="flex-end">
                  <Button variant="primary" type="submit">
                    Thêm tài sản
                  </Button>
                </Box>
              </Form>
            </Modal.Body>
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

export default AssetManager
