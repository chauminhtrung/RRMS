import { useState, useEffect } from 'react';
import { env } from '~/configs/environment';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'flatpickr/dist/themes/material_blue.css'
import 'flatpickr/dist/plugins/monthSelect/style.css'
import 'react-tabulator/lib/styles.css' 
import 'react-tabulator/lib/css/tabulator.min.css' 

const ModelCreateService = ({motelId, refreshServices  }) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;  
  const [formData, setFormData] = useState({  
    nameService: 'Dịch vụ 1',  
    chargetype: 'kwh',  
    price: '10000',  
    subtraction: false,  
    selectedRooms: {}, 
    rooms: []  
  });  

  useEffect(() => {  
    const fetchRooms = async () => {  
      try {  
        const response = await axios.get(`${env.API_URL}/room/motel/${motelId}`, {  
          headers: { Authorization: `Bearer ${token}` }  
        });  
        setFormData((prevState) => ({  
          ...prevState,  
          rooms: response.data   
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
  
    if (motelId) fetchRooms();  
  }, [motelId, token]);  

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
  
      const allSelected = Object.values(updatedSelectedRooms).length === prevState.rooms.length &&
                          Object.values(updatedSelectedRooms).every(Boolean);
  
      return {
        ...prevState,
        selectedRooms: updatedSelectedRooms,
        allRoomsSelected: allSelected, 
      };
    });
  };
  
  const handleSelectAllRooms = () => {
    setFormData((prevState) => {
      const allSelected = !Object.values(prevState.selectedRooms).every(Boolean); 
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
    if (!motelId) {  
      Swal.fire({  
        icon: 'error',  
        title: 'Lỗi',  
        text: 'ID nhà trọ không hợp lệ!',  
      });  
      return;  
    }  

    try {  
      const selectedRoomIds = Object.keys(formData.selectedRooms).filter(roomId => formData.selectedRooms[roomId]);  

      const response = await axios.post(`${env.API_URL}/motel-services/create`, {  
        motelId: motelId,  
        nameService: formData.nameService,  
        price: Number(formData.price),  
        chargetype: formData.chargetype,  
        selectedRooms: selectedRoomIds 
      }, {  
        headers: { Authorization: `Bearer ${token}` },  
      });   

      if (response.status === 200) {  
        Swal.fire({  
          icon: 'success',  
          title: 'Thành công',  
          text: 'Thêm dịch vụ thành công!',  
        });  
        refreshServices();  
        setFormData({  
          nameService: '',  
          chargetype: 'kwh',  
          price: '10000',  
          subtraction: false,  
          selectedRooms: {}, // Reset selection  
          rooms: [] // Reset room list  
        });  
      }  
    } catch (error) {  
      console.error('Error creating service:', error);  
      Swal.fire({  
        icon: 'error',  
        title: 'Lỗi',  
        text: 'Có lỗi xảy ra, vui lòng thử lại!',  
      });  
    }  
  };  

  return (
    <div>
      <div
        className="modal fade"
        data-bs-backdrop="static"
        id="addPriceItem"
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
                  className="feather feather-inbox">
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                </svg>
              </div>
              <h5 className="modal-title">Thêm dịch vụ mới</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                {' '}
              </button>
            </div>
            <div className="modal-body">
              <form className="needs-validation" id="add-price-item-form" noValidate>
                <input type="hidden" name="_token" value="6TLA6XWyRIRQ4oxKHkrPBi0WcZIByCmbDJ8a1MEM" />
                <div className="row g-2">
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="nameService"
                        id="nameService"
                        required
                        placeholder="Tên dịch vụ"
                        value={formData.nameService}
                        onChange={handleChange}
                      />
                      <label htmlFor="nameService">Tên dịch vụ</label>
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
                        min="0"
                        name="price"
                        id="price"
                        placeholder="Giá thuê"
                        required
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
                      checked={formData.allRoomsSelected}
                      onChange={handleSelectAllRooms}
                    />
                    <label htmlFor="room_check_all"><b>Chọn tất cả</b></label>
                  </div>

                  <div className='row mt-2' style={{marginLeft:'1px'}}>  
                    {formData.rooms.map(room => (  
                      <div key={room.roomId} className="col-6 mb-2">  
                        <div className="border pt-2 rounded d-flex align-items-center justify-content-between" style={{paddingLeft:'10px',paddingBottom:'7px'}}>  
                          <div className="form-check" style={{width:'100%'}}>  
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
                    ))}  
                  </div>

                </div>
              </form>
            </div>
            <div
              className="modal-footer modal-footer--sticky"
              style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="row g-0" style={{ width: '100%' }}>
                <div className="col-6"></div>
                <div className="col-6 text-end">
                  <button type="button" className="btn btn-secondary m-1" data-bs-dismiss="modal">
                    Đóng
                  </button>
                  <button type="button" id="submit-add-price-item" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">
                    Thêm mới
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

export default ModelCreateService
