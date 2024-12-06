import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Flatpickr from 'react-flatpickr'

function ModalCollectMoneyInvoice({ toggleModal, modalOpen, InvoiceId }) {
  //mo modal edit thi chi co 1 hoa don
  const [invoice, setInvoice] = useState({})

  //ham de goi invoice khi mo modal de co du lieu cua hoa don
  //goi api
  const fetchDataInvoice = async (InvoiceId) => {
    if (InvoiceId) {
      try {
        setInvoice({})
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const handlFristData = () => {
      if (invoice) {
        fetchDataInvoice(InvoiceId)
      }
    }

    handlFristData()
  }, [invoice]) // Chỉ chạy lại khi roomId hoặc motelId thay đổi

  const handleSubmit = async () => {
    Swal.fire({
      icon: 'success',
      title: 'Cập nhật thành công!',
      text: 'Trạng thái Invoice đã được cập nhật thành công.',
      confirmButtonText: 'OK'
    })
  }

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
              <h5 style={{ marginLeft: '10px' }}>Thu tien</h5>
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
                    data-format="numeric"
                    type="text"
                    style={{ fontWeight: 'bold', fontSize: '18px', color: '#3c9e46' }}
                    className="form-control"
                    name="paid_amount"
                    id="input_paid_amount"
                    placeholder="Nhập số tiền khách thanh toán (đ)"
                    required
                  />
                  <label htmlFor="input_paid_amount">Nhập số tiền khách thanh toán (đ) <label style={{ color: 'red' }}>*</label></label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="col-12 mt-2">
                <div className="form-floating">
                  <select
                    id="input_payment_method"
                    name="payment_method"
                    className="form-select form-control">
                    <option value="cash">Trả tiền mặt</option>
                    <option value="transfer_by_bank">Chuyển khoản</option>
                  </select>
                  <label htmlFor="input_payment_method">Phương thức thanh toán</label>
                </div>
              </div>

              {/* Note */}
              <div className="col-12 mt-2">
                <div className="form-floating">
                  <textarea
                    type="text"
                    rows="10"
                    style={{ minHeight: '70px' }}
                    className="form-control"
                    name="note"
                    id="pay_bill_note"
                    placeholder="Nhập lý do"></textarea>
                  <label htmlFor="pay_bill_note">Ghi chú</label>
                </div>
              </div>

              {/* Receipt Date */}

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
