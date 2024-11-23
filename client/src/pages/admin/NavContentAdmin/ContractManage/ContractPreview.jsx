import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getContractById } from '~/apis/contractTemplateAPI'
import { getServiceRoombyRoomId } from '~/apis/roomAPI'
import { getAllDeviceByRomId } from '~/apis/deviceAPT'
import { getTRCByusername } from '~/apis/TRCAPI'
import { getMotelById } from '~/apis/motelAPI'
import { toWords } from 'number-to-words'
const ContractPreview = ({ setIsAdmin }) => {
  const { contractId, motelId } = useParams()
  const [contract, setContract] = useState({})
  const [TRC, setTRC] = useState({})
  const [motel, setMotel] = useState({})
  const [roomService, setRoomService] = useState([])
  const [roomDevice, setRoomDevice] = useState([])

  const fetchContracts = async (id) => {
    if (id) {
      try {
        const dataContract = await getContractById(id)
        setContract(dataContract)
        console.log(dataContract)

        const roomId = dataContract.room.roomId
        const username = dataContract.username.username

        // Fetch song song
        const [dataRoomService, dataRoomDevice, dataTRC] = await Promise.all([
          getServiceRoombyRoomId(roomId ? roomId : ''),
          getAllDeviceByRomId(roomId ? roomId : ''),
          getTRCByusername(username ? username : '')
        ])
        console.log(dataRoomService)
        console.log(dataRoomDevice)
        setRoomService(dataRoomService)
        setRoomDevice(dataRoomDevice.result)
        setTRC(dataTRC.data.result[0])
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchMotel = async (id) => {
    if (id) {
      try {
        const dataMotel = await getMotelById(id)
        setMotel(dataMotel.data.result)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '...............................'

    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng bắt đầu từ 0
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const calculateDaysDifference = (startDate, endDate) => {
    const start = new Date(startDate) // Ngày bắt đầu
    const end = new Date(endDate) // Ngày kết thúc
    const difference = Math.abs(end - start) // Lấy giá trị tuyệt đối (đề phòng ngày bị đảo ngược)
    return Math.ceil(difference / (1000 * 60 * 60 * 24)) // Chuyển từ mili-giây sang ngày
  }

  const addDays = (dateString, days) => {
    const date = new Date(dateString)
    date.setDate(date.getDate() + days)
    return date
  }

  const convertToWords = (number) => {
    return toWords(number) + ' đồng' // Sẽ trả về "hai nghìn đồng"
  }

  useEffect(() => {
    setIsAdmin(true)
    fetchContracts(contractId)
    fetchMotel(motelId)
  }, [])
  return (
    <div
      style={{
        padding: '30px 0px'
      }}>
      <div
        style={{
          backgroundColor: '#eee',
          padding: '30px 0px'
        }}>
        <div
          style={{
            padding: '3px',
            position: 'fixed',
            top: 0,
            left: '0px',
            width: '100%',
            textAlign: 'center',
            color: '#FF5722',
            backgroundColor: '#feede8',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
          Vui lòng liên hệ{' '}
          <a
            style={{
              color: 'rgb(65 156 205)',
              textDecoration: 'underline'
            }}
            href="https://zalo.me/0907274629">
            chuyên viên hỗ trợ
          </a>{' '}
          nếu mẫu không phù hợp hoặc vào phần cấu hình trên máy tính để sửa mẫu.
        </div>
        <div style={{ background: 'white', display: 'block', margin: '0 auto', width: '21cm' }}>
          <div style={{ padding: ' 2cm 1.5cm 2cm 1.5cm' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '12pt' }}>
                  <b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>
                </span>
                <br />
                <b style={{ fontSize: '12pt', textDecoration: 'underline' }}>Độc lập - Tự do - Hạnh phúc</b>
              </p>
              <p></p>
            </div>
            <div style={{ textAlign: 'center', margin: '30px 0', fontSize: '12pt' }}>
              <p>
                <strong style={{ textTransform: 'uppercase' }}>HỢP ĐỒNG CHO THUÊ PHÒNG TRỌ</strong>
              </p>
            </div>
            <div style={{ textAlign: 'left', fontSize: '12pt' }}>
              <p>
                <strong>BÊN A : BÊN CHO THUÊ (PHÒNG TRỌ)</strong>
              </p>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td colSpan="2">
                      {TRC ? (
                        <p>Họ và tên: {TRC.representativename}</p>
                      ) : (
                        <p>Họ và tên: ...............................</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      {TRC ? (
                        <p>Năm sinh: {formatDate(TRC.birth)}</p>
                      ) : (
                        <p>Năm sinh: ...............................</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <p>CMND/CCCD: ...............................</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {TRC ? (
                        <p>Ngày cấp: {formatDate(TRC.dateofissue)}</p>
                      ) : (
                        <p>Ngày cấp: ...............................</p>
                      )}
                    </td>
                    <td>
                      {TRC ? <p>Nơi cấp: {TRC.placeofissue}</p> : <p>Nơi cấp: ...............................</p>}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      {TRC ? (
                        <p>Thường trú: {TRC.permanentaddress}</p>
                      ) : (
                        <p>Thường trú: ...................................................</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>
                <strong>BÊN B : BÊN THUÊ (PHÒNG TRỌ)</strong>
              </p>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td colSpan="2">
                      {contract.tenant ? (
                        <p>
                          Họ và tên: {contract.tenant.fullname ? contract.tenant.fullname : <>..................</>}
                        </p>
                      ) : (
                        <p>Họ và tên: ...............................</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      {contract.tenant ? (
                        <p>
                          Năm sinh: {contract.tenant.birthday ? contract.tenant.birthday : <>...................</>}{' '}
                        </p>
                      ) : (
                        <p>Năm sinh: ...................</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      {contract.tenant ? (
                        <p>CMND/CCCD: {contract.tenant.cccd ? contract.tenant.cccd : <>...................</>} </p>
                      ) : (
                        <p>CMND/CCCD: ...................</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {contract.tenant ? (
                        <p>
                          Ngày cấp:{' '}
                          {contract.tenant.licenseDate ? (
                            contract.tenant.licenseDate
                          ) : (
                            <>...................................................</>
                          )}{' '}
                        </p>
                      ) : (
                        <p>Ngày cấp: ...................................................</p>
                      )}
                    </td>
                    <td>
                      {contract.tenant ? (
                        <p>
                          Nơi cấp:{' '}
                          {contract.tenant.placeOfLicense ? (
                            contract.tenant.placeOfLicense
                          ) : (
                            <>...................................................</>
                          )}{' '}
                        </p>
                      ) : (
                        <p>Nơi cấp: ...................................................</p>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="2">
                      {contract.tenant ? (
                        <p>
                          Thường trú:{' '}
                          {contract.tenant.temporaryResidence === true ? (
                            contract.tenant.temporaryResidence
                          ) : (
                            <>...................................................</>
                          )}{' '}
                        </p>
                      ) : (
                        <p>Thường trú: ...................................................</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>Hai bên cùng thỏa thuận và đồng ý với nội dung sau :</p>
              <p>
                <strong>Điều 1:</strong>
              </p>
              <ul>
                <li style={{ listStyle: 'circle' }}>
                  {' '}
                  <span>
                    Bên A đồng ý cho bên B thuê một phòng trọ thuộc địa chỉ: {motel ? motel.address : <>....</>}
                  </span>
                </li>
                <li style={{ listStyle: 'circle' }}>
                  <span>Dịch vụ sử dụng</span>
                  {roomService ? (
                    <span>
                      <table
                        style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0', textAlign: 'center' }}>
                        <thead>
                          <tr>
                            <th style={{ border: '1px solid #000' }}>Tên dịch vụ</th>
                            <th style={{ border: '1px solid #000' }}>Giá Tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {roomService ? (
                            roomService.map((service, i) => (
                              <tr key={i}>
                                <td style={{ border: '1px solid #000' }}>{service.service.nameService}</td>
                                <td style={{ border: '1px solid #000' }}>
                                  {service.service.price.toLocaleString('vi-VN')}đ/{service.service.chargetype}{' '}
                                  <div style={{ fontSize: '13px' }}>(Chỉ số hiện tại: {service.quantity})</div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <></>
                          )}
                        </tbody>
                      </table>
                    </span>
                  ) : (
                    <span>.....................</span>
                  )}
                </li>
                <li style={{ listStyle: 'circle' }}>
                  <span>Tài sản phòng sử dụng</span>
                  {roomDevice ? (
                    <span>
                      <table
                        style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0', textAlign: 'center' }}>
                        <thead>
                          <tr>
                            <th style={{ border: '1px solid #000' }}>Tên tài sản</th>
                            <th style={{ border: '1px solid #000' }}>Số lượng</th>
                            <th style={{ border: '1px solid #000' }}>Giá trị</th>
                          </tr>
                        </thead>
                        <tbody>
                          {roomDevice ? (
                            roomDevice.map((device, i) => (
                              <tr key={i}>
                                <td style={{ border: '1px solid #000' }}>{device.motelDevice.deviceName}</td>
                                <td style={{ border: '1px solid #000' }}>{device.quantity}</td>
                                <td style={{ border: '1px solid #000' }}>
                                  {device.motelDevice.value.toLocaleString('vi-VN')}đ/{device.motelDevice.unit}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <></>
                          )}
                        </tbody>
                      </table>
                    </span>
                  ) : (
                    <span>.....................</span>
                  )}
                </li>
                <li style={{ listStyle: 'circle' }}>
                  <span>
                    Thời hạn thuê phòng trọ là{' '}
                    {contract && contract.closeContract && contract.moveinDate ? (
                      <>{calculateDaysDifference(contract.moveinDate, contract.closeContract)} ngày </>
                    ) : (
                      <>không xác định kể từ ngày</>
                    )}
                    kể từ ngày
                    {contract && contract.createdate ? ` ${formatDate(addDays(contract.createdate, 1))}` : <></>}
                  </span>
                </li>
              </ul>
              <p>
                <strong>Điều 2:</strong>
              </p>
              <ul>
                <li style={{ listStyle: 'circle' }}>
                  <span>
                    Giá tiền thuê phòng trọ là {contract.price ? `${contract.price.toLocaleString('vi-VN')}đ` : <></>}
                    (Bằng chữ: {contract.price ? convertToWords(contract.price) : <></>})
                  </span>
                </li>
                <li style={{ listStyle: 'circle' }}>
                  <span>
                    Tiền thuê phòng trọ bên B thanh toán cho bên A từ ngày{' '}
                    {contract.room ? `${contract.room.invoiceDate}` : <></>} dương lịch hàng tháng.
                  </span>
                </li>
                <li style={{ listStyle: 'circle' }}>
                  <span>
                    Bên B đặt tiền thế chân trước{' '}
                    {contract.deposit ? `${contract.deposit.toLocaleString('vi-VN')}đ ` : <></>} (Bằng chữ:{' '}
                    {contract.deposit ? convertToWords(contract.price) : <></>}) cho bên A. Tiền thế chân sẽ được trả
                  </span>
                </li>
                <li style={{ listStyle: 'circle' }}>
                  <span>Bên B ngưng hợp đồng trước thời hạn thì phải chịu mất tiền thế chân.</span>
                </li>
                <li style={{ listStyle: 'circle' }}>
                  <span>
                    Bên A ngưng hợp đồng (lấy lại phòng trọ) trước thời hạn thì bồi thường gấp đôi số tiền bên B đã thế
                    chân.
                  </span>
                </li>
              </ul>
              <p>
                <strong>Điều 3:</strong> Trách nhiệm bên A.
              </p>
              <ul>
                <li style={{ listStyle: 'circle' }}>
                  <span>Giao phòng trọ, trang thiết bị trong phòng trọ cho bên B đúng ngày ký hợp đồng.</span>
                </li>
                <li style={{ listStyle: 'circle' }}>
                  <span>
                    Hướng dẫn bên B chấp hành đúng các quy định của địa phương, hoàn tất mọi thủ tục giấy tờ đăng ký tạm
                    trú cho bên B.
                  </span>
                </li>
              </ul>
              <p>
                <strong>Điều 4:</strong> Trách nhiệm bên B.
              </p>
              <ul>
                <li style={{ listStyle: 'circle' }}>
                  <span>Trả tiền thuê phòng trọ hàng tháng theo hợp đồng.</span>
                </li>
                <li style={{ listStyle: 'circle' }}>
                  <span>
                    Sử dụng đúng mục đích thuê nhà, khi cần sữa chữa, cải tạo theo yêu cầu sử dụng riêng phải được sự
                    đồng ý của bên A.
                  </span>
                </li>
                <li style={{ listStyle: 'circle' }}>
                  <span>
                    Đồ đạt trang thiết bị trong phòng trọ phải có trách nhiệm bảo quản cẩn thận không làm hư hỏng mất
                    mát.
                  </span>
                </li>
                <p>
                  <strong>Điều 4:</strong> Trách nhiệm bên B.
                </p>
              </ul>
              <p>
                <strong>Điều 5:</strong> Điều khoản chung.
              </p>
              <ul>
                <li style={{ listStyle: 'circle' }}>
                  <span>Bên A và bên B thực hiện đúng các điều khoản ghi trong hợp đồng.</span>
                </li>
                <li style={{ listStyle: 'circle' }}>
                  <span>
                    Trường hợp có tranh chấp hoặc một bên vi phạm hợp đồng thì hai bên cùng nhau bàn bạc giải quyết, nếu
                    không giải quyết được thì yêu cầu
                  </span>
                </li>
                <li style={{ listStyle: 'circle' }}>
                  <span>Hợp đồng được lập thành 02 bản có giá trị ngang nhau, mỗi bên giữ 01 bản</span>
                </li>
              </ul>
            </div>
            <div style={{ fontSize: '12pt', margin: '40px 0' }}>
              <div style={{ display: 'flex', marginTop: '1.5rem' }}>
                {/* BÊN A */}
                <div
                  style={{
                    flex: '0 0 auto',
                    width: '50%',
                    float: 'left',
                    textAlign: 'center'
                  }}>
                  <strong>BÊN A</strong>
                  <br />
                  <i>Ký và ghi rõ họ tên</i>
                  <div
                    style={{
                      padding: '10px',
                      height: '150px',
                      width: '100%',
                      textAlign: 'center',
                      overflow: 'hidden'
                    }}>
                    <span></span>
                  </div>
                  <div>...............................</div>
                </div>

                {/* BÊN B */}
                <div
                  style={{
                    flex: '0 0 auto',
                    width: '50%',
                    float: 'left',
                    textAlign: 'center'
                  }}>
                  <strong>BÊN B</strong>
                  <br />
                  <i>Ký và ghi rõ họ tên</i>
                  <div
                    style={{
                      padding: '10px',
                      height: '150px',
                      width: '100%',
                      textAlign: 'center',
                      overflow: 'hidden'
                    }}>
                    <span></span>
                  </div>
                  <div>{contract.tenant ? contract.tenant.fullname : <></>}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractPreview
