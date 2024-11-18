import { useEffect,useRef  } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import { ReactTabulator } from 'react-tabulator'

const ImportFileExcel = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  const fileInputRef = useRef(null); // Tạo reference cho input file
  // Hàm xử lý click vào nút tải file  
  const handleFileInputClick = () => {  
    // Kích hoạt input file  
    fileInputRef.current.click();  
  };  

  // Hàm xử lý khi chọn file  
  const handleFileChange = (event) => {  
    const file = event.target.files[0]; // Lấy file đầu tiên  
    if (file) {  
      console.log("File được chọn:", file);  
      // Bạn có thể xử lý file tại đây (ví dụ: tải lên server, đọc file, v.v.)  
    }  
  }; 
  const columns = [
    { title: 'STT', field: 'STT', hozAlign: 'center', minWidth: 40,editor: 'input' }, // Đặt minWidth để tránh cột bị quá nhỏ
    { title: 'Tên', field: 'name', hozAlign: 'center', minWidth: 40, editor: 'input' },
    { title: 'Giá trị đầu', field: 'value', hozAlign: 'center', minWidth: 40, editor: 'input' },
  ]

  const data = [
    {
      STT: '1',
      name: 'abc',
      value: '5,000,000 VND',
    },
  ]
  const columns1 = [
    { title: 'Tên', field: 'name', hozAlign: 'center', minWidth: 40,editor: 'input' }, 
    { title: 'STT', field: 'STT', hozAlign: 'center', minWidth: 40, editor: 'input' },
  ]

  const data1 = [
    {
      name: 'Nhóm',
      STT: '0',
    },
    {
      name: 'Tên phòng',
      STT: '1',
    },
    {
      name: 'Giá phòng',
      STT: '2',
    },
    {
      name: 'Mức cọc',
      STT: '3',
    },
    {
      name: 'Số tiền cọc đã thu',
      STT: '4',
    },
    {
      name: 'Ngày hợp đồng',
      STT: '5',
    },
    {
      name: 'Ngày vào ở',
      STT: '6',
    },
    {
      name: 'Ngày kết kết thúc hợp đồng',
      STT: '7',
    },
    {
      name: 'Ngày thu tiền',
      STT: '8',
    },
    {
      name: 'Chu kỳ đóng tiền',
      STT: '9',
    },
    {
      name: 'Ưu tiên',
      STT: '10',
    },
    {
      name: 'Số lượng thành viên',
      STT: '11',
    },
    {
      name: 'Chỉ số điện mới nhất',
      STT: '12',
    },
    {
      name: 'Chỉ số nước mới nhất',
      STT: '13',
    },
    {
      name: 'Cọc giữ phòng',
      STT: '14',
    },
    {
      name: 'Ngày cọc giữ phòng',
      STT: '15',
    },
    {
      name: 'Tên khách thuê',
      STT: '16',
    },
    {
      name: 'Ngày hợp đồng',
      STT: '17',
    },
    {
      name: 'Ngày sinh khách thuê',
      STT: '18',
    },
    {
      name: 'Giới tính',
      STT: '19',
    },
    {
      name: 'Số điện thoại',
      STT: '20',
    },
    {
      name: 'Số CMND/CCCD',
      STT: '21',
    },
    {
      name: 'Địa chỉ',
      STT: '22',
    },
    {
      name: 'Biển số xe',
      STT: '23',
    },
    {
      name: 'Ghi chú',
      STT: '24',
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
    <div style={{backgroundColor:'rgb(228, 238, 245)'}}>
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
        }}>
        <div className="header-item">  
          <h4 className="title-item">  
            Nhập liệu từ file  
            <i className="des">Chuẩn bị file json, xlsx &quot;Tải file&quot; để nhập liệu</i>  
          </h4>  
          <div className="d-flex">  
            <div className="d-flex" style={{ marginLeft: '40px' }}>  
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
                Tải file  
              </button>  
              <input  
                type="file"  
                ref={fileInputRef} // Tham chiếu đến input file  
                style={{ display: 'none' }} // Ẩn input file  
                onChange={handleFileChange} // Gọi hàm khi file được chọn  
                accept=".xlsx, .xls, .csv" // Chỉ cho phép các file excel  
              />  
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
                Bắt đầu nhập  
              </button>  
            </div>  
          </div>  
        </div> 

        {/* Table */}
        <div className='row'>
          <div className='col-md-4'>
            <div style={{ position: 'relative', height: '100%' }}>
              <ReactTabulator
                className="my-custom-table rounded" // Thêm lớp tùy chỉnh nếu cần
                columns={columns1}
                data={data1}
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
          <div className='col-md-8'>
            <div style={{ position: 'relative', height: '100%' }}>
              <ReactTabulator
                className="my-custom-table rounded" // Thêm lớp tùy chỉnh nếu cần
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

export default ImportFileExcel
