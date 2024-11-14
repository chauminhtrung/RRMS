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
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;  
  const [formData, setFormData] = useState({  
      nameService: '',  
      chargetype: '',  
      price: '',  
      subtraction: false,  
      selectedRooms: {},  
      rooms: [],  
      allRoomsSelected: false, 
  });  


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${env.API_URL}/room/motel/${serviceData.motelId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const roomsData = response.data;
  
        // Xác định phòng nào đã có `serviceId` khớp với `serviceData.motelServiceId`
        const selectedRooms = {};
        roomsData.forEach(room => {
          room.services.forEach(service => {
            if (service.serviceId === serviceData.motelServiceId) {
              selectedRooms[room.roomId] = true;
            }
          });
        });
  
        setFormData((prevState) => ({
          ...prevState,
          rooms: roomsData,
          selectedRooms: selectedRooms
        }));
      } catch (error) {
        console.error('Error fetching rooms:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể tải danh sách phòng!',
        });
      }
    };
  
    if (serviceData) {
      const modalElement = document.getElementById("updateModelService");
      const modal = new Modal(modalElement, { backdrop: true });
      modal.show();
      fetchRooms();
  
      setFormData((prevState) => ({
        ...prevState,
        nameService: serviceData.nameService || '',
        chargetype: serviceData.chargetype || '',
        price: serviceData.price || '',
        subtraction: serviceData.subtraction || false,
        selectedRooms: {},  // Thiết lập lại phòng được chọn khi mở lại modal
      }));
  
      return () => {
        modal.hide();
      };
    }
  }, [serviceData, token]);
  


  const handleChange = (e) => {  
    const { name, value, type, checked } = e.target;  
    setFormData((prevState) => ({  
      ...prevState,  
      [name]: type === 'checkbox' ? checked : value,  
    }));  
  };  

  const handleRoomSelect = (roomId, checked) => {  
    setFormData((prevState) => {  
      const updatedSelectedRooms = {  
        ...prevState.selectedRooms,  
        [roomId]: checked,  
      };  
      const allRoomsAreSelected = Object.keys(updatedSelectedRooms).every(id => updatedSelectedRooms[id]);  
      return {  
        ...prevState,  
        selectedRooms: updatedSelectedRooms,  
        allRoomsSelected: allRoomsAreSelected,
      };  
    });  
  }; 

  const handleSelectAllRooms = () => {  
    const allSelected = !formData.allRoomsSelected; 
    setFormData((prevState) => {  
      const updatedSelectedRooms = prevState.rooms.reduce((acc, room) => {  
        acc[room.roomId] = allSelected; 
        return acc;  
      }, {});  
      return {  
        ...prevState,  
        selectedRooms: updatedSelectedRooms,  
        allRoomsSelected: allSelected, 
      };  
    });  
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedRoomIds = Object.keys(formData.selectedRooms).filter(roomId => formData.selectedRooms[roomId]);
      const response = await axios.put(
        `${env.API_URL}/motel-services/update/${serviceData.motelServiceId}`,
        {
          nameService: formData.nameService,
          price: formData.price,
          chargetype: formData.chargetype,
          selectedRooms: selectedRoomIds
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
                      type="checkbox"
                      checked={formData.allRoomsSelected}
                      onChange={handleSelectAllRooms}
                    /> 
                    <label htmlFor="room_check_all">
                      <b>Chọn tất cả</b>
                    </label>
                  </div>

                  <div className='row mt-2' style={{ marginLeft: '1px' }}>
                    {Array.isArray(formData.rooms) && formData.rooms.length > 0 ? (
                      formData.rooms.map(room => (
                        <div key={room.roomId} className="col-6 mb-2">
                          <div className="border pt-2 rounded d-flex align-items-center justify-content-between" style={{ paddingLeft: '10px', paddingBottom: '7px' }}>
                            <div className="form-check" style={{ width: '100%' }}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`room_${room.roomId}`}
                                checked={formData.selectedRooms[room.roomId] || false}
                                onChange={(e) => handleRoomSelect(room.roomId, e.target.checked)}
                              />
                              <label className="form-check-label" htmlFor={`room_${room.roomId}`}>
                                {room.name}
                              </label>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12">Không có phòng nào để hiển thị.</div>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div
              className="modal-footer modal-footer--sticky"
              style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="row g-0" style={{ width: '100%' }}>
                <div className="col-6"></div>
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
