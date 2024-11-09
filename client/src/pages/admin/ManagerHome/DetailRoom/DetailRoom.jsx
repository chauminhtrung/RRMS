import { useEffect, useState } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import { getRoomById } from '~/apis/apiClient'
import { useParams } from 'react-router-dom'

const DetailRoom = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  const { roomId } = useParams()
  const [room, setRoom] = useState({})

  useEffect(() => {
    fetchDataRoom()
    setIsAdmin(true)
  }, [])

  //ham lay all typeroom
  const fetchDataRoom = async () => {
    if (roomId) {
      try {
        const response = await getRoomById(roomId)
        console.log('du lieu phong o day', response)
        setRoom(response.result)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div
      style={{
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        margin: '0 10px 10px 10px'
      }}>
      <NavAdmin
        setmotels={setmotels}
        motels={motels}
        setIsAdmin={setIsAdmin}
        setIsNavAdmin={setIsNavAdmin}
        isNavAdmin={isNavAdmin}
      />
      <div className="page-room">
        <div className="row">
          <div className="col-md-4">
            <div className="content-room-info" style={{ position: 'sticky', top: '0px' }}>
              <h4 className="title-item">
                Thông tin phòng
                <i className="des">Thông tin chi tiết của phòng</i>
              </h4>
              <div className="card-feature" style={{ padding: '10px' }}>
                <div className="item d-flex justify-content-between">
                  <span>Tên phòng</span>
                  <span>
                    <b>Phòng 2</b>
                  </span>
                </div>
                <div className="item d-flex justify-content-between">
                  <span>Nhóm phòng</span>
                  <span>
                    <b>Tầng trệt</b>
                  </span>
                </div>

                <div className="item d-flex justify-content-between">
                  <span>Giá thuê</span>
                  <span>
                    <b>200.000đ</b>
                  </span>
                </div>
                <div className="item d-flex justify-content-between">
                  <span>Diện tích</span>
                  <span>
                    <b>15 m2</b>
                  </span>
                </div>
                <div className="item d-flex justify-content-between">
                  <span>Ưu tiên</span>
                  <span>
                    <b>Tất cả</b>
                  </span>
                </div>
                <div className="item d-flex justify-content-between">
                  <span>Ngày lập hóa đơn</span>
                  <span>
                    <b>Ngày 10</b>
                  </span>
                </div>
                <div className="item d-flex justify-content-between">
                  <span>Ngày vào ở</span>
                  <span>
                    <b>07/11/2024</b>
                  </span>
                </div>
                <div className="item d-flex justify-content-between">
                  <span>Thời hạn hợp đồng</span>
                  <span>
                    <b>07/12/2024</b>
                  </span>
                </div>
                <div className="item d-flex justify-content-between">
                  <span>Trạng thái</span>
                  <span className="badge" style={{ backgroundColor: '#dc3545' }}>
                    <b>Sắp kết thúc hợp đồng</b>
                  </span>
                </div>

                <div className="item d-flex justify-content-between">
                  <span>Trạng thái tài chính</span>
                  <span className="badge" style={{ backgroundColor: '#7dc242' }}>
                    <b>Chờ kỳ thu tới</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailRoom
