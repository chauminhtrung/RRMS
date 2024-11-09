import axios from 'axios'
import { useEffect,useState  } from 'react'
import Flatpickr from 'react-flatpickr'
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import { Vietnamese } from 'flatpickr/dist/l10n/vn' 
import { ReactTabulator } from 'react-tabulator'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import ModelCreateService from './ModelCreateService'
import ModelUpdateService from './ModelUpdateService'
import { env } from '~/configs/environment'
import { useParams } from 'react-router-dom';  
import Swal from 'sweetalert2';

import 'flatpickr/dist/themes/material_blue.css'
import 'flatpickr/dist/plugins/monthSelect/style.css'
import 'react-tabulator/lib/styles.css' 
import 'react-tabulator/lib/css/tabulator.min.css' 


const ServiceManager = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  const { motelId } = useParams(); // Lấy motelId từ URL  
  const [motelServices, setMotelServices] = useState([]);  
  const [selectedService, setSelectedService] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const columns = [
    { title: 'Tên phòng', field: 'nameRoom', hozAlign: 'center', width: 160 },
    {
      title: 'Tiền điện (KWh)',
      columns: [
        { title: 'Số cũ', field: 'numberOld', hozAlign: 'right', sorter: 'number', width: 145 },
        { title: 'Số mới', field: 'numberNew', hozAlign: 'center', width: 145 },
        { title: 'Thành tiền', field: 'total', hozAlign: 'center', width: 170 },
      ],
    },
    {
      title: 'Tiền nước (Khối)',
      columns: [
        { title: 'Số cũ', field: 'numberOld', hozAlign: 'right', sorter: 'number', width: 145 },
        { title: 'Số mới', field: 'numberNew', hozAlign: 'center', width: 145 },
        { title: 'Thành tiền', field: 'total', hozAlign: 'center', width: 170 },
      ],
    },
    {
      title: '',
      columns: [
        { title: '', field: 'numberOld', hozAlign: 'right', sorter: 'number', width: 145 },
        { title: '', field: 'numberNew', hozAlign: 'center', width: 145 },
        { title: '0 ₫', field: 'total', hozAlign: 'center', width: 170 },
      ],
    },
  ]

  const data = [
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
    columnHeaderVertAlign: 'bottom', 
  }
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;
  const fetchMotelServices = async (id) => {  
    
    try {  
      const response = await axios.get(`${env.API_URL}/motels/get-motel-id?id=${id}`, {  
        headers: {  
          Authorization: `Bearer ${token}` // Nhớ thay thế token bằng giá trị đúng  
        }  
      });  
      // Kiểm tra chính xác kết quả từ API.  
      if (response.data && response.data.code === 200 && response.data.result && response.data.result.motelServices) {  
        setMotelServices(response.data.result.motelServices);  
      } else {  
        setMotelServices([]);  
      }  
    } catch (error) {  
      console.error('Lỗi khi gọi API:', error);  
      setMotelServices([]);  
    }  
  };
  
  const deleteMotelService = async (serviceId) => {  
    // Kiểm tra xem serviceId có tồn tại không  
    if (!serviceId) {  
        Swal.fire({  
            icon: 'warning',  
            title: 'Thông báo',  
            text: 'Không có dịch vụ nào để xóa.',  
        });  
        return;  
    }  

    // Xác nhận xóa dịch vụ  
    const confirmDelete = await Swal.fire({  
        title: 'Bạn có chắc chắn muốn xóa dịch vụ này?',  
        text: "Hành động này không thể hoàn tác!",  
        icon: 'warning',  
        showCancelButton: true,  
        confirmButtonText: 'Có, xóa!',  
        cancelButtonText: 'Không',  
    });  

    // Nếu người dùng không xác nhận, thoát hàm  
    if (!confirmDelete.isConfirmed) {  
        return;  
    }  

    try {  
        // Thực hiện yêu cầu xóa dịch vụ  
        const response = await axios.delete(`${env.API_URL}/motel-services/delete/${serviceId}`, {  
            headers: {  
                Authorization: `Bearer ${token}`  
            }  
        });  

        // Kiểm tra phản hồi và hiển thị thông báo tương ứng  
        if (response.data.status) {  
            Swal.fire({  
                icon: 'success',  
                title: 'Thành công',  
                text: 'Dịch vụ đã được xóa thành công!',  
            });  
            // Cập nhật lại danh sách dịch vụ  
            fetchMotelServices(motelId); // Gọi lại hàm để cập nhật dịch vụ sau khi xóa  
        } else {  
            Swal.fire({  
                icon: 'error',  
                title: 'Thất bại',  
                text: response.data.message || 'Không thể xóa dịch vụ.',  
            });  
        }  
    } catch (error) {  
        console.error('Lỗi khi xóa dịch vụ:', error);  
        Swal.fire({  
            icon: 'error',  
            title: 'Lỗi',  
            text: 'Đã xảy ra lỗi khi xóa dịch vụ. Vui lòng thử lại sau.',  
        });  
    }  
};

  // Gọi hàm fetchMotelServices mỗi khi motelId thay đổi  
  useEffect(() => {  
    if (motelId) {  
      fetchMotelServices(motelId);  
    }  
  }, [motelId]);  // Đảm bảo không gọi nếu motelId không hợp lệ  

  const openEditModal = (service) => {
    setSelectedService(service); // Set the selected service data
    setIsUpdateModalOpen(true);  // Open the modal
  };
  
  // Close modal handler
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedService(null);
  };
  
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
        }}>
        <div className="page-price-item" id="managePriceItem">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="header-item">
                <h4 className="title-item">
                  Quản lý dịch vụ
                  <i className="des">Các dịch vụ khách thuê xài</i>
                </h4>
                <button className="add-round" data-bs-toggle="modal" data-bs-target="#addPriceItem">
                  <span>
                    <i className="bi bi-plus-lg" style={{ fontSize: '25px' }}></i>
                  </span>
                </button>
              </div>  
              <div className="list-price-item">  
                {motelServices.length > 0 ? (  // Duyệt nếu list tồn tại và có dịch vụ  
                  motelServices.map((service) => (  
                    <div key={service.motelServiceId} className="mt-2">  
                      <div className="mb-3 inner-item item-feature d-flex align-items-center justify-content-between">  
                        <div className="btn-round">  
                          <i className="bi bi-tag" style={{ fontSize: '25px' }}></i>  
                        </div>  
                        <div style={{ display: 'grid', flex: '1' }}>  
                          <b className="price-item-name">{service.nameService}</b>  
                          <span className="price-item-price">  
                            <span>{service.price}đ/{service.chargetype}</span>  
                          </span>  
                          <i className="price-item-status">  
                            <span style={{ color: '#dc3545' }}>Không áp dụng cho phòng nào</span>  
                          </i>  
                        </div>  
                        <button className="btn-round btn-edit" style={{border: 'none'}} onClick={() => openEditModal(service)}>  
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}  data-bs-toggle="modal" data-bs-target="#updateModelService">  
                            <i className="bi bi-pencil-square" style={{ fontSize: '25px' }}></i>  
                          </div>  
                        </button>  
                        <div className="btn-round btn-delete" onClick={() => deleteMotelService(service.motelServiceId)}>  
                          <i className="bi bi-trash" style={{ fontSize: '25px' }}></i>  
                        </div>    
                      </div>  
                    </div>  
                  ))  
                ) : (  
                  <p>Chưa có dịch vụ nào.</p>  
                )}  
              </div>
            </div>


            <div className="col-md-8">
              <div className="header-item">
                <h4 className="title-item">
                  Khách thuê sử dụng trong tháng
                  <i className="des">Thống kê mỗi tháng khách thuê xài</i>
                </h4>
                <div className="input-group" style={{ width: '30%', marginTop: '20px' }}>
                  <div className="form-floating">
                    <Flatpickr
                      className="form-control month-flat-picker flatpickr-input"
                      name="month"
                      id="month"
                      placeholder="Nhập tháng"
                      options={{
                        locale: Vietnamese, 
                        plugins: [
                          new monthSelectPlugin({
                            shorthand: true, 
                            dateFormat: 'm/y', 
                          }),
                        ],
                      }}
                    />

                    <label htmlFor="month">Tháng lập phiếu</label>
                  </div>
                  <label className="input-group-text" htmlFor="month">
                    <i className="bi bi-calendar" style={{ fontSize: '25px' }}></i>
                  </label>
                </div>
              </div>
              <div className="header-table header-item text-end" style={{ justifyContent: 'right' }}>
                <button id="download-excel" style={{ marginLeft: '10px' }} className="ml-2 btn btn-primary">
                  <i className="bi bi-file-earmark-text" style={{ fontSize: '25px' }}></i>
                  Xuất excel
                </button>
              </div>
              <div className="">
                <div style={{ position: 'relative', height: '100%' }}>
                  <ReactTabulator
                    className="my-custom-table"
                    columns={columns}
                    data={data.length > 0 ? data : [{ nameRoom: "No data", numberOld: "-", numberNew: "-", total: "-" }]} // Thêm giá trị mặc định cho data
                    options={{ ...options, responsiveLayout: data.length > 0 ? 'collapse' : false }} // Kiểm tra dữ liệu trước khi bật responsiveLayout
                    placeholder={<h1>Không tìm thấy dữ liệu!</h1>} 
                  />
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
      </div>
      {/* Modal them dich vu  */}
      <ModelCreateService motelId={motelId} />
      {isUpdateModalOpen && (
      <ModelUpdateService
        serviceData={selectedService}
        closeModal={closeUpdateModal}
        refreshServices={() => fetchMotelServices(motelId)}
      />
    )}
    </div>
  )
}

export default ServiceManager
