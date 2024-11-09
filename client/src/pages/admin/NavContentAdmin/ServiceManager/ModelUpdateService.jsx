import { useState, useEffect } from 'react';
import { env } from '~/configs/environment';
import axios from 'axios';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import 'flatpickr/dist/themes/material_blue.css'
import 'flatpickr/dist/plugins/monthSelect/style.css'
import 'react-tabulator/lib/styles.css' 
import 'react-tabulator/lib/css/tabulator.min.css' 

const ModelUpdateService = ({ serviceData, refreshServices }) => {  
  const [formData, setFormData] = useState({  
      nameService: '',  
      chargetype: '',  
      price: '',  
      subtraction: false,  
      roomCheckAll: false,  
  });  

  useEffect(() => {  
    const modalElement = document.getElementById("updateModelService");  
    if (modalElement) {  
        const modal = new Modal(modalElement, { backdrop: true });  
        if (serviceData) {  
            modal.show();  
            setFormData({  
                nameService: serviceData.nameService || '',  
                chargetype: serviceData.chargetype || '',  
                price: serviceData.price || '',  
                subtraction: serviceData.subtraction || false,  
                roomCheckAll: serviceData.roomCheckAll || false,  
            });  
        }  

        return () => {  
            modal.hide();  
        };  
    }  
}, [serviceData]); 

  const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevState) => ({
          ...prevState,
          [name]: type === 'checkbox' ? checked : value,
      }));
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;  

    try {  
        const response = await axios.put(  
            `${env.API_URL}/motel-services/update/${serviceData.motelServiceId}`,  
            {  
                nameService: formData.nameService,  
                price: formData.price,  
                chargetype: formData.chargetype,  
            },  
            {  
                headers: { Authorization: `Bearer ${token}` },  
            }  
        );  

        if (response.status === 200) {  
            await Swal.fire({  
                icon: 'success',  
                title: 'Success!',  
                text: 'Service updated successfully',  
            });  
            refreshServices();  
        } else {  
            await Swal.fire({  
                icon: 'error',  
                title: 'Error',  
                text: 'Failed to update service',  
            });  
        }  
    } catch (error) {  
        console.error('Error updating service:', error);  
        await Swal.fire({  
            icon: 'error',  
            title: 'Error',  
            text: 'An error occurred. Please try again.',  
        });  
    }  
  };

    return (
    <div>
      {/* Modal chinh sua dich vu  */}
      <div
        className="modal fade"
        data-bs-backdrop="static"
        id="updateModelService"
        tabIndex="-1"
        style={{ display: 'none' }}
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div
                style={{
                  marginRight: '15px',
                  outline: 0,
                  boxShadow: 'rgba(112, 175, 237, 0.16) 0px 0px 0px 0.25rem',
                  opacity: 1,
                  borderRadius: '100%',
                  width: '36px',
                  height: '36px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  backgroundColor: 'rgb(111, 171, 232)',
                }}>
                <i className="bi bi-inbox" style={{fontSize:'25px'}}></i>
              </div>
              <h5 className="modal-title">Chỉnh sửa dịch vụ {formData.nameService}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                {' '}
              </button>
            </div>
            <div className="modal-body">
              <form className="needs-validation" id="add-price-item-form" noValidate>
                <input type="hidden" name="_token" value="" />
                <div className="row g-2">
                  <div className="col-12">
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            name="nameService"
                            required
                            placeholder="Service Name"
                            value={formData.nameService}
                            onChange={handleChange}
                        />
                        <label htmlFor="name">Tên dịch vụ</label>
                      <div className="invalid-feedback">Vui lòng nhập tên dịch vụ</div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="title-item-small">
                      <b>Đơn vị và giá</b>
                      <i className="des">Nhập thông tin đơn vị tính và giá</i>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-floating">
                        <select name="chargetype" className="form-select" value={formData.chargetype} onChange={handleChange}>
                            <option value="kwh">kWh</option>
                            <option value="khoi">Khối</option>
                            <option value="thang">Tháng</option>
                            <option value="nguoi">Người</option>
                            <option value="chiec">Chiếc</option>
                            <option value="lan">Lần</option>
                            <option value="cai">Cái</option>
                        </select>
                      <label htmlFor="chargetype">Đơn vị</label>
                    </div>
                  </div>

                  <div className="col-6 constant_price">
                    <div className="form-floating">
                      <input  
                        type="text"  
                        className="form-control"  
                        name="price"  
                        required  
                        placeholder="Price"  
                        value={formData.price}  
                        onChange={handleChange}  
                      />
                      <label htmlFor="price">Giá dịch vụ (đ)</label>
                      <div className="invalid-feedback">Vui lòng nhập giá thuê</div>
                    </div>
                  </div>

                  <div
                    className="col-12"
                    style={{
                      border: '1px solid #84a766',
                      borderRadius: '10px',
                      backgroundColor: '#f8fff2',
                      padding: '10px',
                    }}>
                    <div className="form-check form-switch">
                      <input  
                        className="form-check-input"  
                        type="checkbox"  
                        id="subtraction"  
                        name="subtraction"  
                        checked={formData.subtraction}  
                        onChange={handleChange}  
                      />
                      <label className="form-check-label" htmlFor="subtraction">
                        <b>Tính theo kiểu đồng hồ điện, nước</b>
                        <p>Mức sử dụng của khách thuê có sự chênh lệch trước sau</p>
                      </label>
                    </div>
                  </div>

                  <div className="col-8 mt-2">
                    <div className="title-item-small">
                      <b>Chọn phòng muốn áp dụng</b>
                      <i className="des">Danh sách phòng chọn áp dụng</i>
                    </div>
                  </div>

                  <div className="col-4 mt-4" style={{ textAlign: 'center' }}>
                    <input  
                      className="form-check-input"  
                      id="room_check_all"  
                      type="checkbox"  
                      name="room_check_all"  
                      checked={formData.roomCheckAll}  
                      onChange={handleChange}  
                    /> 
                    <label htmlFor="room_check_all">
                      <b>Chọn tất cả</b>
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div
              className="modal-footer modal-footer--sticky"
              style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="row g-0" style={{ width: '100%' }}>
                <div className="col-6">{/* Có thể thêm nội dung vào đây nếu cần */}</div>
                <div className="modal-footer">  
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">  
                    Đóng  
                  </button>  
                  <button type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">  
                    Chỉnh sửa  
                  </button>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelUpdateService
