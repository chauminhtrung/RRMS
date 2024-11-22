import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

function RentRoomModal({ toggleModal, modalOpen }) {
  return (
    <div>
      <Button color="primary" onClick={toggleModal}>
        Danh sách khách thuê - Phòng 2
      </Button>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: '#5cb85c',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontSize: '16px'
              }}>
              <i className="fa fa-user"></i>
            </div>
            <h5 style={{ marginLeft: '10px' }}>Danh sách khách thuê - Phòng 2</h5>
          </div>
        </ModalHeader>

        <ModalBody>
          <div>
            <h6>Trí Cao Vũ</h6>
            <p>0337-461-190</p>
            <div>
              <Button color="success" size="sm" style={{ marginRight: '10px' }}>
                Người liên hệ
              </Button>
              <Button color="primary" size="sm">
                Đại diện hợp đồng
              </Button>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Đóng
          </Button>
          <Button color="success">
            <i className="fa fa-plus"></i> Thêm thông tin khách thuê
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default RentRoomModal
