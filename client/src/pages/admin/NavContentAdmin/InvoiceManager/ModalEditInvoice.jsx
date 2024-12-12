import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Flatpickr from 'react-flatpickr'
import { Vietnamese } from 'flatpickr/dist/l10n/vn'
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import axios from 'axios'
import { env } from '~/configs/environment'
function ModalEditInvoice({ toggleModal, modalOpen, invoice,onUpdateInvoice   }) {
  const [formData, setFormData] = useState({});
  const [additionItems, setAdditionItems] = useState([])
  
  const addNewItem = () => {
    setAdditionItems((prevItems) => [
        ...prevItems,
        { id: '', addition: 1, additionValue: '', additionReason: '' },
    ]);
  };

  const removeItem = (id) => {
    setAdditionItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };


    const handleChange = (id, field, value) => {
      setAdditionItems((prevItems) =>
          prevItems.map((item) =>
              item.id === id ? { ...item, [field]: value } : item
          )
      );
  };

  const calculateTotalAddition = () => {
    return additionItems.reduce((total, item) => {
      const value = parseFloat(item.additionValue) || 0
      return total + (item.addition === 1 ? value : -value) 
    }, 0)
  }

  useEffect(() => {
    if (invoice) {
      setFormData({ ...invoice });
      if (invoice.additionItems) {
        setAdditionItems(
          invoice.additionItems.map((item) => ({
            additionalChargeId: item.additionalChargeId,
            addition: item.addition ? 1 : 0,
            additionValue: item.amount,
            additionReason: item.reason,
          }))
        );
      }
    }
  }, [invoice]);
  
const roomPrice = invoice?.roomPrice || 0; // Giá phòng
const totalAddition = calculateTotalAddition(); // Tổng cộng/trừ phát sinh

  const handleServiceCheckboxChange = (index, isChecked) => {
    const updatedServiceDetails = [...formData.serviceDetails];
    updatedServiceDetails[index].isSelected = isChecked;
    setFormData({ ...formData, serviceDetails: updatedServiceDetails });
  };
  
  // Tính số lượng dịch vụ và tổng tiền
  const calculateServiceUsage = () => {
    if (!formData?.serviceDetails) return { count: 0, total: 0 };
  
    const selectedServices = formData.serviceDetails.filter((service) => service.isSelected);
    const total = selectedServices.reduce((sum, service) => {
      const quantity = service.quantity || 1;
      return sum + service.servicePrice * quantity;
    }, 0);
  
    return { count: selectedServices.length, total };
  };
  
  const { count, total } = calculateServiceUsage();
  
  
  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem('user') 
        ? JSON.parse(sessionStorage.getItem('user')).token 
        : null;
      const payload = {
        ...formData,
        roomPrice: roomPrice,
        additionItems: additionItems.map((item) => ({
          additionalChargeId: item.additionalChargeId,
          isAddition: item.addition === 1 ? 1 : 0,
          amount: parseFloat(item.additionValue) || 0,
          reason: item.additionReason || '',
        })),
        serviceDetails: formData.serviceDetails.map(({ roomServiceId, quantity }) => ({
          roomServiceId,
          quantity,
        })),
        deviceDetails: formData.deviceDetails.map(({ roomDeviceId }) => ({
          roomDeviceId,
        })),
      };
  
      const response = await axios.put(
        `${env.API_URL}/invoices/update/${invoice.invoiceId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      Swal.fire('Thành công', 'Hóa đơn đã được cập nhật', 'success');
      
      // Call the passed update function to update the parent state
      if (onUpdateInvoice) {
        onUpdateInvoice(response.data);
      }
  
      toggleModal(); // Close the modal
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
        Swal.fire('Lỗi', `Cập nhật thất bại: ${error.response.data.message}`, 'error');
      } else {
        console.error("Error:", error);
        Swal.fire('Lỗi', 'Cập nhật hóa đơn thất bại', 'error');
      }
    }
  };
  

  
  return (
    <div>
      {invoice ? (
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  marginRight: '15px',
                  outline: '0',
                  boxShadow: 'rgb(36 107 168 / 16%) 0px 0px 0px 0.25rem',
                  opacity: '1',
                  borderRadius: '100%',
                  width: '36px',
                  height: '36px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  backgroundColor: 'rgb(32, 169, 231)'
                }}>
                <i className="bi bi-currency-dollar" style={{fontSize:'24px'}}></i>
              </div>
              <h5 style={{ marginLeft: '10px' }}>Chỉnh sửa hóa đơn cho - {invoice.roomName}</h5>
            </div>
          </ModalHeader>

          <ModalBody>
            <div className='row g-2'>
              <div className="col-12">
                <div className="header-item">
                  <div className="input-group">
                    <div className="form-floating">
                      <Flatpickr
                        className="form-control"
                        name="month"
                        id="month"
                        placeholder="Nhập tháng"
                        value={invoice.invoiceCreateMonth} 
                        options={{
                          locale: Vietnamese,
                          plugins: [
                            new monthSelectPlugin({
                              shorthand: true,
                              dateFormat: 'Y-m'
                            })
                          ]
                        }}
                      />
                      <label htmlFor="month">
                        Tháng lập phiếu <label style={{ color: 'red' }}>*</label>
                      </label>
                    </div>
                    <label className="input-group-text" htmlFor="month">
                      <i className="bi bi-calendar" style={{ fontSize: '25px' }}></i>
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="header-item">
                  <div className="input-group">
                    <div className="form-floating">
                      <Flatpickr
                        className="form-control"
                        name="invoiceCreateDate"
                        id="invoiceCreateDate"
                        placeholder="Ngày lập phiếu"
                        required
                        value={invoice.invoiceCreateDate}
                      />

                      <label htmlFor="invoiceCreateDate">
                        Ngày lập phiếu <label style={{ color: 'red' }}>*</label>
                      </label>
                    </div>
                    <label className="input-group-text" htmlFor="invoiceCreateDate">
                      <i className="bi bi-calendar" style={{ fontSize: '25px' }}></i>
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="header-item">
                  <div className="input-group">
                    <div className="form-floating">
                      <Flatpickr
                        className="form-control"
                        name="dueDate"
                        id="dueDate"
                        placeholder="Hạn đóng tiền"
                        required
                        value={invoice.dueDate}
                      />
                      <label htmlFor="dueDate">
                        Hạn đóng tiền <label style={{ color: 'red' }}>*</label>
                      </label>
                    </div>
                    <label className="input-group-text" htmlFor="dueDate">
                      <i className="bi bi-calendar" style={{ fontSize: '25px' }}></i>
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <i className="bi bi-house me-2" style={{ fontSize: '25px'}}></i>
                <div className="title-item-small">
                  <b>Thu tiền hàng tháng</b>
                  <i className="des">
                    Ngày vào: <label style={{ color: 'rgb(255, 87, 34)' }}>{invoice.moveinDate}</label>. Chu kỳ
                    thu:
                    <label style={{ color: 'rgb(255, 87, 34)' }}>
                      {' '}
                      1 tháng, thu cuối tháng
                    </label>
                  </i>
                </div>
              </div>

              <div className="col-6">
                <div className="header-item">
                  <div className="input-group">
                    <div className="form-floating">
                      <Flatpickr
                        className="form-control"
                        name="moveinDate"
                        id="moveinDate"
                        placeholder="Từ ngày"
                        required
                        value={invoice.moveinDate}
                        options={{
                          allowInput: true,
                          dateFormat: 'Y-m-d'
                        }}
                      />
                      <label htmlFor="moveinDate">
                        Từ ngày <label style={{ color: 'red' }}>*</label>
                      </label>
                    </div>
                    <label className="input-group-text" htmlFor="moveinDate">
                      <i className="bi bi-calendar" style={{ fontSize: '25px' }}></i>
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="header-item">
                  <div className="input-group" >
                    <div className="form-floating">
                      <Flatpickr
                        className="form-control"
                        name="dueDateofmoveinDate"
                        id="dueDateofmoveinDate"
                        placeholder="Đến ngày"
                        value={invoice.dueDateofmoveinDate}
                        required
                        options={{
                          allowInput: true,
                          dateFormat: 'Y-m-d'
                        }}
                      />
                      <label htmlFor="dueDateofmoveinDate">
                        Đến ngày <label style={{ color: 'red' }}>*</label>
                      </label>
                    </div>
                    <label className="input-group-text" htmlFor="dueDateofmoveinDate">
                      <i className="bi bi-calendar" style={{ fontSize: '25px' }}></i>
                    </label>
                  </div>
                </div>
              </div>

              <div
                className="col-12 mt-2"
                style={{
                  border: '1px solid #e8f8ff',
                  borderRadius: '10px',
                  backgroundColor: '#e8f8ff',
                  padding: '10px 15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                <div>
                  <label className="form-check-label" htmlFor="subtraction">
                    <b>Thu tiền hàng tháng</b>
                    <p style={{ margin: '0', color: 'orange' }}>
                      1 tháng, 0 ngày{' '}
                      <span style={{ color: 'black' }}>x {roomPrice.toLocaleString('vi-VN')} VNĐ</span>
                    </p>
                  </label>
                </div>
                <div>
                  <label className="form-check-label" htmlFor="subtraction">
                    <b>Thành tiền</b>
                    <p style={{ margin: '0' }}>{roomPrice.toLocaleString('vi-VN')} VNĐ</p>
                  </label>
                </div>
              </div>

              <div className="col-12">
                <i className="bi bi-shield me-2" style={{ marginTop: '15px', fontSize: '25px' }}></i>
                <div className="title-item-small">
                  <b>Tiền dịch vụ</b>
                  <i className="des">Tính tiền dịch vụ khách xài </i>
                </div>
              </div>

              <div className="col-12">
                <div className="price-items-checkout-layout">
                  {formData?.serviceDetails?.length > 0 ? (
                    formData.serviceDetails.map((service, index) => (
                      <div className="item" key={index}>
                        <div className="item-check-name">
                          <input className="form-check-input" type="hidden" value={service.servicePrice} />
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`check_price_item_select_${service.serviceName}`}
                            checked={!!service.isSelected} 
                            onChange={(e) => handleServiceCheckboxChange(index, e.target.checked)} 
                          />
                          <label htmlFor={`check_price_item_select_${service.serviceName}`}>
                            <b>{service.serviceName}</b>{' '}
                            <p>
                              Giá: <b>{service.servicePrice.toLocaleString('vi-VN')}&nbsp;VNĐ</b> / {service.chargetype}
                            </p>{' '}
                          </label>
                        </div>
                        <div className="item-value">
                          <div className="input-group">
                            <input
                              className="form-control"
                              min="0"
                              type="number"
                              id={`price_item_select_${service.serviceName}`}
                              placeholder="Nhập giá trị"
                              value={service.quantity || ''}
                              onChange={(e) => {
                                const updatedServiceDetails = [...formData.serviceDetails];
                                updatedServiceDetails[index].quantity = e.target.value;
                                setFormData({ ...formData, serviceDetails: updatedServiceDetails });
                              }}
                            />{' '}
                            <label className="input-group-text" htmlFor={`price_item_select_${service.serviceName}`}>
                              {service.chargetype}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Dịch vụ không tồn tại!</p>
                  )}
                </div>
              </div>

              <div
                className="col-12"
                style={{
                  border: '1px solid #e8f8ff',
                  borderRadius: '10px',
                  backgroundColor: '#e8f8ff',
                  padding: '10px 15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                <div>
                  <label className="form-check-label">
                    <b>Tính tiền dịch vụ</b>
                    <p style={{ margin: '0' }}>
                      Số lượng sử dụng: <b>{count} dịch vụ</b>
                    </p>
                    <p style={{ margin: '0', color: 'orange' }}>1 tháng, 0 ngày</p>
                  </label>
                </div>
                <div>
                  <label className="form-check-label">
                    <b>Thành tiền</b>
                    <p style={{ margin: '0' }}>{total.toLocaleString('vi-VN')}₫</p>
                  </label>
                </div>
              </div>


              <div className="col-12">
                <i className="bi bi-house" style={{ fontSize: '25px', marginRight: '8px' }}></i>
                <div className="title-item-small">
                  <b>Cộng thêm / Giảm trừ:</b>
                  <i className="des">Ví dụ giảm ngày tết, giảm trừ covid, thêm tiền phạt... </i>
                </div>
              </div>

              
              <div className="loz-alert warning" style={{ marginBottom: '10px' }}>
                <div className="icon flex-0">
                  <i className="bi bi-info-circle" style={{ fontSize: '24px' }}></i>
                </div>
                <div className="des flex-1">
                  Chú ý: Cộng thêm / giảm trừ không nên là tiền cọc. Hãy chọn lý do có tiền cọc để nếu
                  cần
                </div>
              </div>

              <div className="col-12">
                {additionItems.map((item, index) => (
                  <div key={item.id} className="row g-0 item mt-1 mb-1 border rounded">
                    <div className="col-3">
                      <div className="">
                        <div className="border-bottom p-2 pb-3 pt-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`addition_items[${index}]['addition']`}
                              id={`addition_a_bill_${item.id}`}
                              value="1"
                              checked={item.addition === 1}
                              onChange={() => handleChange(item.id, 'addition', 1)}
                            />
                            <label className="form-check-label" htmlFor={`addition_a_bill_${item.id}`}>
                              Cộng [+]
                            </label>
                          </div>
                        </div>
                        <div className="p-2 pt-3 pb-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`addition_items[${index}]['addition']`}
                              id={`addition_b_bill_${item.id}`}
                              value="0"
                              checked={item.addition === 0}
                              onChange={() => handleChange(item.id, 'addition', 0)}
                            />
                            <label className="form-check-label" htmlFor={`addition_b_bill_${item.id}`}>
                              Giảm [-]
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-8">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="border-bottom form-control"
                              name={`addition_items[${index}]['addition_value']`}
                              placeholder="Số tiền cộng thêm hoặc giảm trừ"
                              value={item.additionValue}
                              onChange={(e) => handleChange(item.id, 'additionValue', e.target.value)}
                              required
                            />
                            <label>Số tiền (đ)</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating">
                            <textarea
                              rows="10"
                              style={{ minHeight: '60px' }}
                              className="form-control"
                              name={`addition_items[${index}]['addition_reason']`}
                              placeholder="Nhập lý do"
                              value={item.additionReason}
                              onChange={(e) => handleChange(item.id, 'additionReason', e.target.value)}
                              required></textarea>
                            <label>Lý do</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-1"
                      style={{
                        borderRadius: '0 5px 5px 0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ffeee9'
                      }}>
                      <button
                        className="btn delete"
                        type="button"
                        style={{ color: 'red', height: '100%' }}
                        onClick={() => removeItem(item.id)}>
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  style={{ width: '100%' }}
                  onClick={addNewItem}>
                  <i className="bi bi-plus" style={{ fontSize: '24px', marginRight: '8px' }}></i>
                  Thêm mục cộng thêm / giảm trừ
                </button>
              </div>

              <div className="col-12">
                <div
                  style={{
                    border: '1px solid #e8f8ff',
                    borderRadius: '10px',
                    backgroundColor: '#e8f8ff',
                    padding: '10px 15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  <div>
                    <label className="form-check-label">
                      <p style={{ margin: '0' }}>Phát sinh (Cộng/Trừ)</p>
                      <p style={{ margin: '0', color: 'orange' }}>
                        {additionItems.length > 0
                          ? additionItems.map((item) => (
                              <span key={item.id}>
                                {item.addition === 1 ? 'Cộng: ' : 'Trừ: '}
                                {parseFloat(item.additionValue || 0).toLocaleString('vi-VN')} ₫ - Lý do:{' '}
                                {item.additionReason || 'Không có'}
                                <br />
                              </span>
                            ))
                          : 'Không có khoản phát sinh'}
                      </p>
                    </label>
                  </div>
                  <div>
                    <label className="form-check-label">
                      <p style={{ margin: '0' }}>Thành tiền phát sinh</p>
                      <p style={{ margin: '0' }}>{totalAddition.toLocaleString('vi-VN')} ₫</p>
                    </label>
                  </div>
                </div>
              </div>

            </div>
          </ModalBody>

          <ModalFooter>
            <div className="row">
              <div className="col-12 mb-2 text-end">
                <span>Tổng cộng hóa đơn</span>
                <div>
                  <b style={{ color: 'rgb(54 147 230)' }}>
                    {(
                      parseFloat(invoice.roomPrice || 0) +
                      parseFloat(total || 0) +
                      parseFloat(calculateTotalAddition() || 0)
                    ).toLocaleString('vi-VN')} ₫
                  </b>
                </div>
              </div>

              <div className="col-12 d-flex justify-content-end"> 
                <Button color="secondary" onClick={toggleModal} className="me-2">
                  Hủy bỏ
                </Button>
                <Button color="primary" onClick={() => handleSubmit()}>
                  <i className="bi bi-plus-lg" style={{ fontSize: "14px" }}></i> Chỉnh sửa hóa đơn
                </Button>
              </div>
            </div>
          </ModalFooter>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ModalEditInvoice
