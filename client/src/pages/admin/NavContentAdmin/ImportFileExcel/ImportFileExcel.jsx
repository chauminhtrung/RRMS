/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import { ReactTabulator } from 'react-tabulator'
import * as XLSX from 'xlsx'
import FileDownloadModal from './FileDownloadModal'
import { useEffect } from 'react'
import { createRoom, getRoomByMotelId } from '~/apis/roomAPI'
import { useParams } from 'react-router-dom'

const ImportFileExcel = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  const fileInputRef = useRef(null) // Tạo reference cho input file
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [jsonData, setJsonData] = useState()
  const { motelId } = useParams()
  const [rooms, setRooms] = useState([])
  // Hàm xử lý click vào nút tải file
  const handleFileInputClick = () => {
    // Kích hoạt input file
    fileInputRef.current.click()
  }

  const columns = [
    { title: 'STT', field: 'STT', hozAlign: 'center', minWidth: 40, editor: 'input' }, // Đặt minWidth để tránh cột bị quá nhỏ
    { title: 'Tên phòng', field: 'name', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Ưu tiên', field: 'prioritize', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Trạng thái', field: 'status', hozAlign: 'center', minWidth: 40, editor: 'input' }
  ]

  const columns1 = [
    { title: 'Tên', field: 'name', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'STT', field: 'STT', hozAlign: 'center', minWidth: 40, editor: 'input' }
  ]

  const data1 = [
    {
      name: 'Nhóm',
      STT: '1'
    },
    {
      name: 'Tên phòng',
      STT: '2'
    },
    {
      name: 'Giá phòng',
      STT: '3'
    },
    {
      name: 'Ưu tiên',
      STT: '4'
    },
    {
      name: 'Diện tích',
      STT: '5'
    },
    {
      name: 'Mức cọc',
      STT: '6'
    },
    {
      name: 'Số tiền cọc đã thu',
      STT: '7'
    },
    {
      name: 'Số lượng thành viên',
      STT: '8'
    },
    {
      name: 'Chu kỳ đóng tiền',
      STT: '9'
    },
    {
      name: 'Ngày vào ở',
      STT: '10'
    },
    {
      name: 'Ngày hợp đồng',
      STT: '11'
    },
    {
      name: 'Ngày kết thúc hợp đồng',
      STT: '12'
    },
    {
      name: 'Trạng thái',
      STT: '13'
    },
    {
      name: 'Tài chính',
      STT: '14'
    }
  ]

  const rows = [
    {
      Nhóm: '',
      'Tên phòng': '',
      'Giá phòng': '',
      'Ưu tiên': '',
      'Diện tích': '',
      'Mức cọc': '',
      'Số tiền cọc đã thu': '',
      'Số lượng thành viên': '',
      'Chu kỳ đóng tiền': '',
      'Ngày vào ở': '',
      'Ngày hợp đồng': '',
      'Ngày kết thúc hợp đồng': '',
      'Trạng thái': '',
      'Tài chính': ''
    }
  ]
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'KhachThue')
    XLSX.writeFile(workbook, 'DanhSachPhong.xlsx')
  }

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(rows)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'DanhSachPhong.json'
    link.click()
  }

  const downloadCSV = () => {
    const link = document.createElement('a')
    link.href = '/public/data/DanhSachPhong.csv'
    link.download = 'DanhSachPhong.csv'
    link.click()
  }

  const handleFileUpload = (file) => {
    if (file) {
      const reader = new FileReader()
      // Đọc file khi đã chọn
      reader.onload = (e) => {
        const binaryStr = e.target.result
        // Đọc dữ liệu từ file và chuyển sang sheet
        const wb = XLSX.read(binaryStr, { type: 'binary' })

        // Giả sử file có một sheet đầu tiên
        const ws = wb.Sheets[wb.SheetNames[0]]

        // Chuyển sheet thành JSON với header ở dòng đầu tiên
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 })

        // Xử lý dữ liệu để có định dạng như yêu cầu
        const formattedData = data.slice(1).map((row) => {
          return {
            motelId: motelId,
            group: row[0] || '', // Cột 1
            name: row[1] || '', // Cột 2
            price: row[2] || '', // Cột 3
            prioritize: row[3] || '', // Cột 4
            area: row[4] || '', // Cột 5
            deposit: row[5] || '', // Cột 6
            debt: row[6] || '', // Cột 7
            countTenant: row[7] || '', // Cột 8
            invoiceDate: row[8] || '', // Cột 9
            paymentCircle: row[9] || '', // Cột 10
            moveInDate: row[10] || '', // Cột 11
            contractDuration: row[11] || '', // Cột 12
            status: row[12] || '', // Cột 13
            finance: row[13] || '' // Cột 14
          }
        })

        setJsonData(formattedData) // Lưu dữ liệu vào state
      }

      reader.readAsBinaryString(file)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const fileName = file.name.toLowerCase()
      if (fileName.endsWith('.json')) {
        console.log('Đây là file JSON')
      } else if (fileName.endsWith('.csv')) {
        console.log('Đây là file CSV')
      } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        handleFileUpload(file)
      }

      // Reset input file sau khi chọn file
      event.target.value = null
    }
  }

  const handleFileImport = () => {
    jsonData.map((item, index) => {
      try {
        createRoom(item).then((res) => {})
      } catch (error) {
        console.log('Lỗi tại dòng', index + 2)
      }
    })
  }

  //Lắng nghe sự thay đổi của jsonData và log nó
  useEffect(() => {
    if (jsonData?.length > 0) {
      console.log('Dữ liệu JSON đã được cập nhật:', jsonData)
    }
  }, [jsonData]) // Khi jsonData thay đổi, useEffect sẽ được gọi

  useEffect(() => {
    getRoomByMotelId(motelId).then((res) => {
      const dataWithSTT = res.map((room, index) => ({
        STT: index + 1,
        ...room
      }))
      setRooms(dataWithSTT)
    })
  }, [motelId])

  const options = {
    height: '500px',
    movableColumns: true,
    resizableRows: true,
    movableRows: true,
    resizableColumns: true,
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
    <div style={{ backgroundColor: 'rgb(228, 238, 245)' }}>
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
        }}>
        <div className="header-item">
          <h4 className="title-item">
            Nhập liệu từ file
            <i className="des">Chuẩn bị file json, xlsx &quot;Tải file&quot; để nhập liệu</i>
          </h4>
          <div className="d-flex">
            <div className="d-flex" style={{ marginLeft: '40px' }}>
              <button
                onClick={handleOpen}
                id="download-excel"
                style={{ marginLeft: '10px' }}
                className="ml-2 btn btn-primary">
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
                Tải file mẫu
              </button>
              <FileDownloadModal
                handleClose={handleClose}
                open={open}
                downloadExcel={downloadExcel}
                downloadJSON={downloadJSON}
                downloadCSV={downloadCSV}
              />
              <button
                id="download-excel"
                style={{ marginLeft: '10px' }}
                className="ml-2 btn btn-primary"
                onClick={handleFileInputClick} // Khi click, mở hộp thoại tải file
              >
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
                Upload file
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".xlsx, .xls, .csv, .json"
              />
              <button
                onClick={handleFileImport}
                id="download-excel"
                style={{ marginLeft: '10px' }}
                className="ml-2 btn btn-primary">
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
                Bắt đầu nhập
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="row">
          <div className="col-md-4">
            <div style={{ position: 'relative', height: '100%' }}>
              <ReactTabulator
                className="my-custom-table rounded" // Thêm lớp tùy chỉnh nếu cần
                columns={columns1}
                data={data1}
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
            </div>
          </div>
          <div className="col-md-8">
            <div style={{ position: 'relative', height: '100%' }}>
              <ReactTabulator
                className="my-custom-table rounded" // Thêm lớp tùy chỉnh nếu cần
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImportFileExcel
