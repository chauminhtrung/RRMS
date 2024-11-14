import { useEffect } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import { Box } from '@mui/material'
import { ReactTabulator } from 'react-tabulator'
import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { getAllMotelDevices, insertMotelDevice } from '~/apis/deviceAPT'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const AssetManager = ({ setIsAdmin, setIsNavAdmin, motels, setmotels }) => {
  const [show, setShow] = useState(false)
  const [device, setDevice] = useState([])
  const { motelId } = useParams('motelId')
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [selectedIcon, setSelectedIcon] = useState('') //tạo bảng chọn icon
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
  const handleSubmit = async (e) => {
    e.preventDefault()
    const datarequest = {
      motel: {
        motelId: motelId
      },
      deviceName: deviceName,
      value: value,
      icon: 'ban',
      valueInput: valueInput,
      totalQuantity: quantity,
      supplier: supplier,
      unit: 'cai'
    }
    console.log(datarequest)

    const statusInsert = await insertMotelDevice(datarequest)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Thêm thành công',
          text: 'Đã thêm thành công!'
        })
        getAllMotelDevice()
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Thêm thất bại',
          text: 'Thử lại sau!'
        })
      })

    handleClose()
  }
  const [deviceName, setdeviceName] = useState('')
  const [value, setvalue] = useState('')
  const [quantity, setquantity] = useState('')
  const [valueInput, setvalueInput] = useState('')
  const [supplier, setsupplier] = useState('')
  const columns = [
    {
      title: '',
      field: 'icon',
      hozAlign: 'center',
      width: 40,
      formatter: function () {
        return 'a'
      }
    },
    ,
    { title: 'STT', field: 'STT', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Tên Tài Sản', field: 'deviceName', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Giá Trị Tài Sản', field: 'value', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Giá Trị Nhập Vào', field: 'valueInput', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Tổng Số Lượng', field: 'totalQuantity', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Đơn Vị', field: 'unitDescription', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Đơn Vị Cung Cấp', field: 'supplier', hozAlign: 'center', minWidth: 40, editor: 'input' },
    {
      title: '',
      field: 'delete',
      hozAlign: 'center',
      width: 40,
      editor: 'button'
    }
  ]
  const remove = (data) => {
    console.log(data)
  }
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
  const getAllMotelDevice = async () => {
    const response = await getAllMotelDevices(motelId)
    const customdata = response.result.map((item, index) => ({
      ...item,
      STT: index + 1,
      unitDescription: item.unit == 'CAI' ? 'Cái' : item.unit == 'CHIEC' ? 'Chiếc' : item.unit == 'BO' ? 'Bộ' : 'Cặp',
      delete: 'Xóa'
    }))
    setDevice(customdata)
  }
  useEffect(() => {
    setIsAdmin(true)
    getAllMotelDevice()
  }, [])
  return (
    <div>
      <NavAdmin
        setmotels={setmotels}
        motels={motels}
        setIsAdmin={setIsAdmin}
        setIsNavAdmin={setIsNavAdmin}
        isNavAdmin={true}
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
            <span id="filter-count">{device.length}</span>
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
                  <Form.Control
                    type="text"
                    name="name"
                    value={deviceName}
                    onChange={(e) => setdeviceName(e.target.value)}
                  />
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
                      value={value}
                      onChange={(e) => setvalue(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-6" controlId="giatrinhapvao">
                    <Form.Label>Giá trị nhập vào</Form.Label>
                    <Form.Control
                      type="number"
                      name="giatrinhapvao"
                      value={valueInput}
                      onChange={(e) => setvalueInput(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-6" controlId="tongsoluong">
                    <Form.Label>Tổng số lượng</Form.Label>
                    <Form.Control
                      type="number"
                      name="tongsoluong"
                      value={quantity}
                      onChange={(e) => setquantity(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-6" controlId="donvinhapvao">
                    <Form.Label>Đơn vị nhập vào</Form.Label>
                    <Form.Control type="text" name="donvinhapvao" />
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
          className="my-custom-table rounded"
          columns={columns}
          data={device}
          options={options}
          placeholder={<h1></h1>}
        />
      </div>
    </div>
  )
}

export default AssetManager
