import { useEffect, useState } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import { getRoomById } from '~/apis/roomAPI'
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
        setRoom(response)
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

      {room ? (
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
                      <b>{room.name}</b>
                    </span>
                  </div>
                  <div className="item d-flex justify-content-between">
                    <span>Nhóm phòng</span>
                    <span>
                      <b>{room.group}</b>
                    </span>
                  </div>

                  <div className="item d-flex justify-content-between">
                    <span>Giá thuê</span>
                    <span>
                      <b>{room.price}</b>
                    </span>
                  </div>
                  <div className="item d-flex justify-content-between">
                    <span>Diện tích</span>
                    <span>
                      <b>{room.area} m2</b>
                    </span>
                  </div>
                  <div className="item d-flex justify-content-between">
                    <span>Ưu tiên</span>
                    <span>
                      <b>{room.prioritize}</b>
                    </span>
                  </div>
                  <div className="item d-flex justify-content-between">
                    <span>Ngày lập hóa đơn</span>
                    <span>
                      <b>Ngày {room.invoiceDate}</b>
                    </span>
                  </div>
                  <div className="item d-flex justify-content-between">
                    <span>Ngày vào ở</span>
                    <span>{room.moveInDate ? <b> {room.moveInDate}</b> : <>Không xác định</>}</span>
                  </div>
                  <div className="item d-flex justify-content-between">
                    <span>Thời hạn hợp đồng</span>
                    <span>
                      <span>{room.contractDuration ? <b> {room.contractDuration}</b> : <>Không xác định</>}</span>
                    </span>
                  </div>
                  <div className="item d-flex justify-content-between">
                    <span>Trạng thái</span>
                    {room.status === true ? (
                      <span className="badge mt-2 " style={{ backgroundColor: '#7dc242', whiteSpace: 'break-spaces' }}>
                        Đang ở
                      </span>
                    ) : (
                      <span className="badge mt-2 " style={{ backgroundColor: '#ED6004', whiteSpace: 'break-spaces' }}>
                        Đang trống
                      </span>
                    )}
                  </div>

                  <div className="item d-flex justify-content-between">
                    <span>Trạng thái tài chính</span>
                    {room.finance === 'wait' ? (
                      <span className="badge" style={{ backgroundColor: '#7dc242' }}>
                        <b>Chờ kỳ thu tới</b>
                      </span>
                    ) : (
                      <>Không xác định</>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <h4 className="title-item">
                Dịch vụ sử dụng
                <i className="des">Danh sách dịch vụ sử dụng</i>
              </h4>
              <div className="card-feature" style={{ padding: '10px' }}>
                <div className="row" style={{ padding: '10px' }}>
                  <table className="table table-bordered text-center">
                    <tbody>
                      <tr>
                        <td>
                          <b>Tên dịch vụ</b>
                        </td>
                        <td>
                          <b>Chỉ số dịch vụ</b>
                        </td>
                        <td>
                          <b>Loại</b>
                        </td>
                        <td>
                          <b>Đơn giá</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <h4 className="title-item">
                Danh sách khách thuê
                <i className="des">Thông tin khách thuê của phòng</i>
              </h4>
              {/* neu co tk nao do thue trong phong do  */}
              <div className="card-feature" style={{ padding: '10px' }} id="list-customers">
                <div className="row g-2">
                  <div
                    style={{ cursor: 'pointer' }}
                    data-bs-toggle="modal"
                    data-bs-target="#addCustomer"
                    data-room-id="103299"
                    className="col-12 customer">
                    <div className="col-6 item-feature d-flex align-items-center justify-content-between mb-2">
                      <div className="info" style={{ flex: 1 }}>
                        <h6>Qq</h6>
                        <p>0907274629</p>
                      </div>

                      <div className="badge" style={{ backgroundColor: '#15A05C', marginRight: '10px' }}>
                        Người liên hệ
                      </div>

                      <div className="badge" style={{ backgroundColor: '#7dc242' }}>
                        Đại diện hợp đồng
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="title-item">
                Lịch sử hóa đơn
                <i className="des">Lịch sử thu tiền của phòng</i>
              </h4>

              <div className="card-feature" style={{ padding: '10px' }}>
                <table className="table table-bordered text-center">
                  <tbody>
                    <tr>
                      <td>
                        <b>Thông tin khách</b>
                      </td>
                      <td>
                        <b>Tháng lập phiếu</b>
                      </td>
                      <td>
                        <b>Tiền phòng</b>
                      </td>
                      <td>
                        <b>Thu/Trả tiền cọc</b>
                      </td>
                      <td>
                        <b>Tiền dịch vụ</b>
                      </td>
                      <td>
                        <b>Cộng thêm - giảm trừ</b>
                      </td>
                      <td>
                        <b>Tổng tiền</b>
                      </td>
                      <td>
                        <b>Tổng đã trả</b>
                      </td>
                      <td>
                        <b>Ngày tạo &amp; Trạng thái</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="title-item">
                Lịch sử thuê của phòng
                <i className="des">Ghi nhận lại các phiên khách ở qua thời kỳ của phòng</i>
              </h4>

              <div className="card-feature" style={{ padding: '10px' }}>
                <div className="row" style={{ padding: '10px' }}>
                  <table className="table table-bordered text-center" id="room-history">
                    <tbody>
                      <tr>
                        <td>
                          <b>Chủ hợp đồng</b>
                        </td>
                        <td>
                          <b>Số điện thoại</b>
                        </td>
                        <td>
                          <b>Giá phòng - Giá cọc</b>
                        </td>
                        <td>
                          <b>Ngày ký hợp đồng</b>
                        </td>
                        <td>
                          <b>Ngày kết thúc hợp đồng</b>
                        </td>
                        <td>
                          <b>Trạng thái</b>
                        </td>
                        <td>
                          <b>Hành động</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default DetailRoom
