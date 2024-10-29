import React, { useEffect, useState } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import 'flatpickr/dist/themes/material_blue.css'
import ModelDeposit from '../ManagerSettings/ModelDeposit'
import AddIcon from '@mui/icons-material/Add'
import './CSS/MotelSetting.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
const initialItems = [
  { id: '1', name: 'Tầng trệt 1' },
  { id: '2', name: 'Tầng trệt 2' },
  { id: '3', name: 'Tầng trệt 3' },
  { id: '4  ', name: 'Tầng trệt 4' }
]
const MotelSetting = ({ setIsAdmin, motels, setmotels }) => {
  useEffect(() => {
    setIsAdmin(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [items, setItems] = useState(initialItems)

  const handleDragEnd = (result) => {
    const { source, destination } = result

    // If the item was dropped outside the list
    if (!destination) {
      return
    }

    // If the item was dropped in the same position
    if (source.index === destination.index) {
      return
    }

    // Reorder the items
    const reorderedItems = Array.from(items)
    const [movedItem] = reorderedItems.splice(source.index, 1)
    reorderedItems.splice(destination.index, 0, movedItem)

    setItems(reorderedItems)
  }

  const addItem = () => {
    const newItem = {
      id: (items.length + 1).toString(),
      name: `Nhóm mới ${items.length + 1}`
    }
    setItems([...items, newItem])
  }
  return (
    <div>
      <NavAdmin setIsAdmin={setIsAdmin} setmotels={setmotels} motels={motels} />
      <div className="page-setting mb-4">
        <div className="container">
          <div className="header-item">
            <h4 className="title-item">
              Cài đặt nhà trọ
              <i style={{ fontSize: '14px', fontWeight: 'normal' }}>Các thiết lập cho nhà trọ</i>
            </h4>
          </div>
          <div className="card-feature2 overflow-hidden">
            <div className="d-flex">
              <div className="col-md-3" style={{ borderRight: '1px solid #eee', padding: '0' }}>
                {/* Nav tabs  */}
                <ul className="nav setting-tabs" role="tablist" style={{ display: 'unset' }}>
                  <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="tab" href="#info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-box">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                      Nhóm phòng
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#contract_template">
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
                        className="feather feather-clipboard">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                      Tăng giá thuê
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#on_off">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-settings">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                      Bật tắt tính năng
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#invoice_setting">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-bookmark">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                      Cài đặt hóa đơn
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#account_bank_setting">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-dollar-sign">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      Cài đặt tài khoản ngân hàng
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#app_book">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-smartphone">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <line x1="12" y1="18" x2="12.01" y2="18" />
                      </svg>
                      Thiết lập cho app khách thuê
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#extension_setting">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-file-text">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      Nội quy, giờ giấc, tiện ích cho thuê
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-9">
                <div style={{ padding: '15px' }}>
                  {/* tab panes */}
                  <div className="tab-content">
                    <div className="container tab-pane fade show active" id="info">
                      <br />
                      <div className="header-item">
                        <div className="header-item">
                          <h4 className="title-item">
                            Gom nhóm phòng để dễ quản lý
                            <i style={{ fontSize: '14px', fontWeight: 'normal' }}>
                              Bạn có thể nhóm danh sách phòng theo nhóm để phân biệt Khu/Tầng/Dãy
                              <br />
                              <i className="text-danger">* Nhấp và kéo để xếp vị trí của nhóm</i>
                            </i>
                          </h4>
                        </div>
                        <div>
                          <AddIcon onClick={() => addItem()} className="iconadd" />
                        </div>
                      </div>
                      <div>
                        <DragDropContext onDragEnd={handleDragEnd}>
                          <Droppable droppableId="droppable">
                            {(provided) => (
                              <table
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead className="text-center">
                                  <tr>
                                    <th style={{ width: '50px' }}></th>
                                    <th>Tên nhóm</th>
                                    <th style={{ width: '50px' }}></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                      {(provided) => (
                                        <tr
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            ...provided.draggableProps.style,
                                            borderBottom: '1px solid #ddd'
                                          }}>
                                          <td style={{ textAlign: 'center' }}>☰</td>
                                          <td>{item.name}</td>
                                          <td style={{ textAlign: 'center' }}>
                                            <button
                                              style={{
                                                backgroundColor: 'red',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '50%',
                                                cursor: 'pointer',
                                                padding: '5px'
                                              }}
                                              onClick={() => setItems(items.filter((i) => i.id !== item.id))}>
                                              🗑️
                                            </button>
                                          </td>
                                        </tr>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </tbody>
                              </table>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </div>
                    </div>
                    <div id="contract_template" className="container tab-pane fade show">
                      <div className="header-item">
                        <div className="container tab-pane">
                          <div className="header-item">
                            <h4 className="title-item">
                              Tăng giá thuê
                              <i style={{ fontSize: '14px', fontWeight: 'normal' }}>
                                Tăng giá thuê cho tất cả các phòng hoặc chỉ 1 số phòng
                                <br />
                              </i>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div id="contract-template" className="row" style={{ padding: '10PX' }}>
                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              data-format="string"
                              type="text"
                              className="form-control"
                              name="job"
                              value="2.222.222"
                              id="setting_info_job"
                              placeholder="Giá thuê mới"
                              required=""
                            />
                            <label htmlFor="setting_info_job">
                              Giá thuê mới <span className="text-danger">*</span>
                            </label>
                            <div className="invalid-feedback">Vui lòng nhập công việc của bạn</div>
                          </div>
                        </div>
                        <hr className="my-2" />
                        <div className="col-12">
                          <div className="header-item">
                            <div className="header-item">
                              <p className="title-item fw-bold">
                                Chọn phòng muốn áp dụng
                                <i style={{ fontSize: '14px', fontWeight: 'normal' }}>Danh sách phòng chọn áp dụng</i>
                              </p>
                            </div>
                            <div>
                              Chọn tất cả
                              <input class="form-check-input ms-2" type="checkbox" value="" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="row border pt-2 pb-3 m-1">
                              <div className="col-md-3 col-sm-3 col-xs-12">
                                <input class="form-check-input" type="checkbox" />
                              </div>
                              <div className="col-md-9 col-sm-9 col-xs-12">
                                Phòng 1
                                <br />
                                <span className="fw-bold">2.222.222đ</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="row border pt-2 pb-3 m-1">
                              <div className="col-md-3 col-sm-3 col-xs-12">
                                <input class="form-check-input" type="checkbox" />
                              </div>
                              <div className="col-md-9 col-sm-9 col-xs-12">
                                Phòng 1
                                <br />
                                <span className="fw-bold">2.222.222đ</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="row border pt-2 pb-3 m-1">
                              <div className="col-md-3 col-sm-3 col-xs-12">
                                <input class="form-check-input" type="checkbox" />
                              </div>
                              <div className="col-md-9 col-sm-9 col-xs-12">
                                Phòng 1
                                <br />
                                <span className="fw-bold">2.222.222đ</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="row border pt-2 pb-3 m-1">
                              <div className="col-md-3 col-sm-3 col-xs-12">
                                <input class="form-check-input" type="checkbox" />
                              </div>
                              <div className="col-md-9 col-sm-9 col-xs-12">
                                Phòng 1
                                <br />
                                <span className="fw-bold">2.222.222đ</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="row border pt-2 pb-3 m-1">
                              <div className="col-md-3 col-sm-3 col-xs-12">
                                <input class="form-check-input" type="checkbox" />
                              </div>
                              <div className="col-md-9 col-sm-9 col-xs-12">
                                Phòng 1
                                <br />
                                <span className="fw-bold">2.222.222đ</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="row border pt-2 pb-3 m-1">
                              <div className="col-md-3 col-sm-3 col-xs-12">
                                <input class="form-check-input" type="checkbox" />
                              </div>
                              <div className="col-md-9 col-sm-9 col-xs-12">
                                Phòng 1
                                <br />
                                <span className="fw-bold">2.222.222đ</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="row border pt-2 pb-3 m-1">
                              <div className="col-md-3 col-sm-3 col-xs-12">
                                <input class="form-check-input" type="checkbox" />
                              </div>
                              <div className="col-md-9 col-sm-9 col-xs-12">
                                Phòng 1
                                <br />
                                <span className="fw-bold">2.222.222đ</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="row border pt-2 pb-3 m-1">
                              <div className="col-md-3 col-sm-3 col-xs-12">
                                <input class="form-check-input" type="checkbox" />
                              </div>
                              <div className="col-md-9 col-sm-9 col-xs-12">
                                Phòng 1
                                <br />
                                <span className="fw-bold">2.222.222đ</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="row border pt-2 pb-3 m-1">
                              <div className="col-md-3 col-sm-3 col-xs-12">
                                <input class="form-check-input" type="checkbox" />
                              </div>
                              <div className="col-md-9 col-sm-9 col-xs-12">
                                Phòng 1
                                <br />
                                <span className="fw-bold">2.222.222đ</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="row border pt-2 pb-3 m-1">
                              <div className="col-md-3 col-sm-3 col-xs-12">
                                <input class="form-check-input" type="checkbox" />
                              </div>
                              <div className="col-md-9 col-sm-9 col-xs-12">
                                Phòng 1
                                <br />
                                <span className="fw-bold">2.222.222đ</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="row border pt-2 pb-3 m-1">
                              <div className="col-md-3 col-sm-3 col-xs-12">
                                <input class="form-check-input" type="checkbox" />
                              </div>
                              <div className="col-md-9 col-sm-9 col-xs-12">
                                Phòng 1
                                <br />
                                <span className="fw-bold">2.222.222đ</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="row border pt-2 pb-3 m-1">
                              <div className="col-md-3 col-sm-3 col-xs-12">
                                <input class="form-check-input" type="checkbox" />
                              </div>
                              <div className="col-md-9 col-sm-9 col-xs-12">
                                Phòng 1
                                <br />
                                <span className="fw-bold">2.222.222đ</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="on_off" className="container tab-pane fade show">
                      <br />
                      <h3>Bật tắt tính năng</h3>
                      <p>Bật tắt tính năng</p>
                    </div>
                    <div id="invoice_setting" className="container tab-pane fade show">
                      <br />
                      <h3>Cài đặt hóa đơn</h3>
                      <p>Cài đặt hóa đơn</p>
                    </div>
                    <div id="account_bank_setting" className="container tab-pane fade show">
                      <br />
                      <h3>Cài đặt tài khoản ngân hàng</h3>
                      <p>Cài đặt tài khoản ngân hàng</p>
                    </div>
                    <div id="app_book" className="container tab-pane fade show">
                      <br />
                      <h3>App</h3>
                      <p>App</p>
                    </div>
                    <div id="extension_setting" className="container tab-pane fade show">
                      <br />
                      <h3>Extension</h3>
                      <p>Extension</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModelDeposit />
    </div>
  )
}

export default MotelSetting
