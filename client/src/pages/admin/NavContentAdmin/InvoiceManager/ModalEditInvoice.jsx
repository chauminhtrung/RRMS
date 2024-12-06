import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
function ModalEditInvoice({ toggleModal, modalOpen, invoiceId }) {
  //mo modal edit thi chi co 1 hoa don
  const [invoice, setInvoice] = useState({})

  //ham de goi invoice khi mo modal de co du lieu cua hoa don
  //goi api
  const fetchDataInvoice = async (invoiceId) => {
    if (invoiceId) {
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
        fetchDataInvoice(invoiceId)
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
                  className="feather feather-log-out">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </div>
              {/* dung cai an di de hien thi dang chinh sua hoa don cua phong nao */}
              <h5 style={{ marginLeft: '10px' }}>Edit Invoice - Phong nao?</h5>
              {/* <h5 style={{ marginLeft: '10px' }}>Hủy báo kết thúc hợp đồng - {room ? room.name : <>ko co </>}</h5> */}
            </div>
          </ModalHeader>

          <ModalBody>{/* form o day */}</ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Đóng
            </Button>
            <Button color="primary " onClick={() => handleSubmit()}>
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
                className="feather feather-plus">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Edit
            </Button>
          </ModalFooter>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ModalEditInvoice
