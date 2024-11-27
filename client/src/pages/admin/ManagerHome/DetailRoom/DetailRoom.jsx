import { useEffect, useState } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import { getRoomById, getServiceRoombyRoomId } from '~/apis/roomAPI'
import { useParams } from 'react-router-dom'
import { getContractByIdRoom } from '~/apis/contractTemplateAPI'
const DetailRoom = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  const { roomId } = useParams()
  const [room, setRoom] = useState({})
  const [contract, setContract] = useState({})
  const [roomSerivces, setRoomSerivces] = useState([])
  useEffect(() => {
    fetchDataRoom(roomId)
    fetchDataRoomServices(roomId)
    fetchContractRoom(roomId)
    setIsAdmin(true)
  }, [])

  //ham lay all typeroom
  const fetchDataRoom = async (Id) => {
    if (Id) {
      try {
        const response = await getRoomById(Id)
        setRoom(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchContractRoom = async (Id) => {
    if (Id) {
      try {
        const response = await getContractByIdRoom(Id)
        console.log('contract ben detail ', response)

        setContract(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchDataRoomServices = async (Id) => {
    if (Id) {
      try {
        const response = await getServiceRoombyRoomId(Id)
        console.log(response)

        setRoomSerivces(response)
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

      {room && contract ? (
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
                      <b>{room.price ? room.price.toLocaleString('vi-VN') : <></>}đ</b>
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
                    <span>
                      {contract.moveinDate ? (
                        <b>
                          {new Intl.DateTimeFormat('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }).format(new Date(contract.moveinDate))}
                        </b>
                      ) : (
                        <>Không xác định</>
                      )}
                    </span>
                  </div>
                  <div className="item d-flex justify-content-between">
                    <span>Thời hạn hợp đồng</span>
                    <span>
                      <span>
                        {contract.closeContract ? (
                          <b>
                            {new Intl.DateTimeFormat('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            }).format(new Date(contract.closeContract))}
                          </b>
                        ) : (
                          <>Không xác định</>
                        )}
                      </span>
                    </span>
                  </div>
                  <div className="item d-flex justify-content-between">
                    <span>Trạng thái</span>
                    {contract.status === 'ACTIVE' ? (
                      <span className="badge mt-2 " style={{ backgroundColor: '#7dc242', whiteSpace: 'break-spaces' }}>
                        Đang ở
                      </span>
                    ) : contract.status === 'IATExpire' ? (
                      <span className="badge mt-2 " style={{ backgroundColor: '#FFC107', whiteSpace: 'break-spaces' }}>
                        Sắp hết hạn
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
                      {roomSerivces ? (
                        roomSerivces.map((roomservice, key) => (
                          <tr key={key}>
                            <td>
                              <b>{roomservice.service.nameService}</b>
                            </td>
                            <td>
                              <b>
                                {roomservice.quantity}{' '}
                                {roomservice.service.chargetype === 'Theo người'
                                  ? 'người'
                                  : roomservice.service.chargetype}{' '}
                              </b>
                            </td>
                            <td>Cố định</td>

                            <td>
                              <b>
                                {roomservice.service.price.toLocaleString('vi-VN')}đ/
                                {roomservice.service.chargetype === 'Theo người'
                                  ? 'người'
                                  : roomservice.service.chargetype}
                              </b>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
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
                  {contract.tenant ? (
                    <div
                      style={{ cursor: 'pointer' }}
                      data-bs-toggle="modal"
                      data-bs-target="#addCustomer"
                      data-room-id="103299"
                      className="col-6 customer">
                      <div className="col-12 item-feature d-flex align-items-center justify-content-between mb-2">
                        <div className="info" style={{ flex: 1 }}>
                          <h6>{contract.tenant.fullname}</h6>
                          <p>{contract.tenant.phone}</p>
                        </div>

                        <div className="badge" style={{ backgroundColor: '#15A05C', marginRight: '10px' }}>
                          Người liên hệ
                        </div>

                        <div className="badge" style={{ backgroundColor: '#7dc242' }}>
                          Đại diện hợp đồng
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
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
                      {contract.tenant ? (
                        <tr style={{ cursor: 'pointer' }} className="row-history">
                          <td>
                            <b>{contract.tenant.fullname}</b>
                          </td>
                          <td>{contract.tenant.phone}</td>
                          <td>
                            <strong>{contract.price.toLocaleString('vi-VN')}đ</strong>
                            <div>{contract.deposit.toLocaleString('vi-VN')}đ</div>
                          </td>
                          <td>{contract.createdate}</td>
                          <td>
                            {' '}
                            {new Intl.DateTimeFormat('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            }).format(new Date(contract.closeContract))}
                          </td>
                          <td>
                            {contract.status === 'ACTIVE' ? (
                              <span style={{ color: 'rgb(32, 169, 231)' }}>Trong thời hạn hợp đồng</span>
                            ) : contract.status === 'IATExpire' ? (
                              <span
                                className="badge mt-2 "
                                style={{ backgroundColor: '#FFC107', whiteSpace: 'break-spaces' }}>
                                Sắp hết hạn
                              </span>
                            ) : (
                              <span
                                className="badge mt-2 "
                                style={{ backgroundColor: '#ED6004', whiteSpace: 'break-spaces' }}>
                                Đang trống
                              </span>
                            )}
                          </td>
                          <td>
                            <span style={{ color: 'rgb(32, 169, 231)', textDecoration: 'underline' }}>
                              Xem chi tiết
                            </span>
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
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
