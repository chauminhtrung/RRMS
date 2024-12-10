import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState,useEffect } from 'react'
import Swal from 'sweetalert2'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import axios from 'axios'

function ModalCollectMoneyInvoice({ toggleModal, modalOpen, invoice  }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [paidAmount, setPaidAmount] = useState(invoice ? invoice.totalAmount : 0); // Đảm bảo khởi tạo với giá trị đúng từ invoice
  const [paymentMethod, setPaymentMethod] = useState('cash'); 
  const [note, setNote] = useState('');
  const token = sessionStorage.getItem('user') 
        ? JSON.parse(sessionStorage.getItem('user')).token 
        : null;


  const handleSubmit = async () => {
  // Kiểm tra số tiền thanh toán có hợp lệ
  if (paidAmount <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: 'Số tiền thanh toán phải lớn hơn 0!',
      confirmButtonText: 'OK',
    });
    return;
  }

  // Cấu trúc request gửi đến API
  const requestData = {
    paymentName: `Thanh toán tiền phòng ${invoice.roomName}`,
    description: `Thanh toán đầy đủ hóa đơn tháng ${new Date().getMonth() + 1}`,
    paymentDate: currentDate.toISOString(), // Chuyển đổi ngày sang định dạng ISO
    totalAmount: paidAmount, // Số tiền thanh toán
  };

  try {
    // Gửi request đến backend API
    await axios.patch(
      `http://localhost:8080/invoices/${invoice.invoiceId}/collect-payment`,
      requestData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Kiểm tra nếu thành công, hiển thị thông báo
    Swal.fire({
      icon: 'success',
      title: 'Cập nhật thành công!',
      text: 'Trạng thái Invoice đã được cập nhật thành công.',
      confirmButtonText: 'OK',
    });

    // Đóng modal sau khi gửi thành công
    toggleModal();

  } catch (error) {
    // In thông tin lỗi chi tiết ra console
    console.error('Error details:', error.response ? error.response.data : error.message);
    
    // Hiển thị thông báo lỗi nếu gặp sự cố khi gọi API
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: error.response ? error.response.data.message || 'Có lỗi xảy ra trong quá trình thanh toán!' : 'Không thể kết nối với server!',
      confirmButtonText: 'OK',
    });
  }
};

  useEffect(() => {
    if (invoice) {
      setPaidAmount(invoice.totalAmount);
    }
  }, [invoice]);
  

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
              <h5 style={{ marginLeft: '10px' }}>Thu tiền phòng - {invoice.roomName}</h5>
            </div>
          </ModalHeader>

          <ModalBody>
            <form method="POST" className="needs-validation" id="bill-pay-form" noValidate>
            <div className="col-12 mt-2">
                <div className="form-floating">
                  <input
                    type="hidden"
                    className="form-control"
                    name="type"
                    value="bill_collect"
                    required
                  />
                  <input
                    type="text"
                    style={{ fontWeight: 'bold', fontSize: '18px', color: '#3c9e46' }}
                    className="form-control"
                    name="paid_amount"
                    id="input_paid_amount"
                    value={paidAmount}
                    placeholder="Nhập số tiền khách thanh toán (đ)"
                    required
                    onChange={(e) => setPaidAmount(e.target.value)}
                  />
                  <label htmlFor="input_paid_amount">Nhập số tiền khách thanh toán (đ) <label style={{ color: 'red' }}>*</label></label>
                </div>
              </div>

              <div className="col-12 mt-2">
                <div className="form-floating">
                  <select
                    id="input_payment_method"
                    name="payment_method"
                    className="form-select form-control"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="cash">Trả tiền mặt</option>
                    <option value="transfer_by_bank">Chuyển khoản</option>
                  </select>
                  <label htmlFor="input_payment_method">Phương thức thanh toán</label>
                </div>
              </div>

              <div className="col-12 mt-2">
                <div className="form-floating">
                  <textarea
                    rows="10"
                    style={{ minHeight: '70px' }}
                    className="form-control"
                    name="note"
                    id="pay_bill_note"
                    placeholder="Nhập lý do"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}></textarea>
                  <label htmlFor="pay_bill_note">Ghi chú</label>
                </div>
              </div>

              <div className="col-12 mt-2">
                <div className="header-item">
                  <div className="input-group">
                    <div className="form-floating">
                      <Flatpickr
                        className="form-control"
                        name="invoiceCreateDate"
                        id="invoiceCreateDate"
                        placeholder="Ngày lập phiếu"
                        required
                        value={currentDate}
                        onChange={(selectedDates) => setCurrentDate(selectedDates[0])}
                      />
                      <label htmlFor="invoiceCreateDate">
                        Ngày thu nhận thu chi <label style={{ color: 'red' }}>*</label>
                      </label>
                    </div>
                    <label className="input-group-text" htmlFor="invoiceCreateDate">
                      <i className="bi bi-calendar" style={{ fontSize: '25px' }}></i>
                    </label>
                  </div>
                </div>
              </div>

             <div className="loz-alert warning" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <div className="icon flex-0">
                    <i className="bi bi-info-circle" style={{ fontSize: '24px' }}></i>
                </div>
                <div className="des flex-1">
                    <b>Chú thích: Ngày ghi nhận thu chi</b> giúp chuyển thời gian phiếu thu tới ngày bạn mong muốn.
                </div>
             </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Đóng
            </Button>
            <Button color="primary " onClick={() => handleSubmit()}>
              Thu tiền
            </Button>
          </ModalFooter>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ModalCollectMoneyInvoice
