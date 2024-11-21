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
import * as Papa from 'papaparse'
import { toast } from 'react-toastify'

const ImportFileExcel = ({ setIsAdmin, setIsNavAdmin, motels, setmotels }) => {
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

  const StatusFormatter = (cell) => {
    const financeValue = cell.getValue()
    // Nếu giá trị tài chính là "Đang trống", hiển thị badge với màu cam
    if (financeValue) {
      return `<span class="badge mt-2 " style="background-color: #7dc242; white-space: break-spaces;">Đang ở</span>`
    }
    if (!financeValue) {
      return `<span class="badge mt-2 " style="background-color: #ED6004; white-space: break-spaces;">Đang trống</span>`
    }

    // Nếu không phải "Đang trống", hiển thị giá trị tài chính
    return financeValue
  }

  const columns = [
    { title: 'STT', field: 'STT', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Tên phòng', field: 'name', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Ưu tiên', field: 'prioritize', hozAlign: 'center', minWidth: 40, editor: 'input' },
    {
      title: 'Trạng thái',
      field: 'status',
      hozAlign: 'center',
      minWidth: 40,
      editor: 'input',
      formatter: StatusFormatter
    }
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
      Tên: '',
      'Giá thuê': '',
      'Ưu tiên': '',
      'Diện tích': '',
      'Mức giá tiền cọc': '',
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
    worksheet['!cols'] = [
      { wch: 10 },
      { wch: 20 },
      { wch: 15 },
      { wch: 10 },
      { wch: 12 },
      { wch: 18 },
      { wch: 18 },
      { wch: 20 },
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
      { wch: 20 },
      { wch: 12 },
      { wch: 12 }
    ]

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

  const handleFileExcelUpload = (file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const binaryStr = e.target.result
        const wb = XLSX.read(binaryStr, { type: 'binary' })

        const ws = wb.Sheets[wb.SheetNames[0]]

        const data = XLSX.utils.sheet_to_json(ws, { header: 1 })

        const formattedData = data.slice(1).map((row) => {
          return {
            motelId: motelId,
            group: row[0] || '',
            name: row[1] || '',
            price: row[2] || '',
            prioritize: row[3] || '',
            area: row[4] || '',
            deposit: row[5] || '',
            debt: row[6] || '',
            countTenant: row[7] || '',
            invoiceDate: row[8] || '',
            paymentCircle: row[9] || '',
            moveInDate: row[10] || '',
            contractDuration: row[11] || '',
            status: row[12] || '',
            finance: row[13] || ''
          }
        })

        setJsonData(formattedData)
      }

      reader.readAsBinaryString(file)
    }
  }

  const handleFileJsonUpload = (file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result)
          const formattedData = jsonData.map((item) => ({
            ...item,
            motelId: motelId
          }))
          setJsonData(formattedData)
        } catch (error) {
          console.error('Error parsing JSON file:', error)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleFileCsvUpload = (file) => {
    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        const csvData = event.target.result
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log(results.data)

            try {
              const data = results.data
              const formattedData = data.map((item) => ({
                ...item,
                motelId: motelId
              }))
              setJsonData(formattedData)
            } catch (error) {
              console.error('Error processing CSV file:', error)
            }
          },
          error: (error) => {
            console.error('Error parsing CSV file:', error)
          }
        })
      }

      // Đọc file
      reader.readAsText(file)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const fileName = file.name.toLowerCase()
      if (fileName.endsWith('.json')) {
        handleFileJsonUpload(file)
      } else if (fileName.endsWith('.csv')) {
        handleFileCsvUpload(file)
      } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        handleFileExcelUpload(file)
      }
      toast.success('Đã upload thành công!')
      event.target.value = null
    }
  }

  const handleFileImport = async () => {
    try {
      const promises = jsonData.map((item) => createRoom(item))
      await Promise.all(promises)
      toast.success('Đã nhập thành công!')
      refrestRooms()
    } catch (error) {
      console.log('Có lỗi xảy ra:', error)
    }
  }

  const refrestRooms = () => {
    getRoomByMotelId(motelId).then((res) => {
      const dataWithSTT = res.map((room, index) => ({
        STT: index + 1,
        ...room
      }))
      setRooms(dataWithSTT)
    })
  }

  useEffect(() => {
    if (jsonData?.length > 0) {
      console.log('Dữ liệu JSON đã được cập nhật:', jsonData)
    }
  }, [jsonData])

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

  return (
    <div style={{ backgroundColor: 'rgb(228, 238, 245)' }}>
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
        }}>
        <div className="header-item">
          <h4 className="title-item">
            Nhập liệu từ file
            <i className="des">Chuẩn bị file json, xlsx hoặc csv &quot;Tải file&quot; để nhập liệu</i>
          </h4>
          <div className="d-flex">
            <div className="d-flex" style={{ marginLeft: '40px' }}>
              <button
                onClick={handleOpen}
                id="download-excel"
                style={{ marginLeft: '10px' }}
                className="ml-2 btn btn-success">
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
                className="ml-2 btn btn-warning"
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
              {rooms?.length === 0 && (
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
              {rooms?.length === 0 && (
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
