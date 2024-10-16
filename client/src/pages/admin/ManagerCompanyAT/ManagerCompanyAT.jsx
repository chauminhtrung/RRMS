import { useEffect } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
const ManagerCompanyAT = ({ setIsAdmin }) => {
  useEffect(() => {
    setIsAdmin(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <NavAdmin setIsAdmin={setIsAdmin} />
      <div className="page-permission mb-4" id="permission">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 className="title-item">
              Tính năng công ty - nhóm
              <i style={{ fontSize: '14px', fontWeight: 'normal' }}>
                Tạo tài khoản cho nhân viên, chia quyền quản lý...
              </i>
            </h4>
          </div>
          <div className="card-feature2 overflow-hidden">
            <div className="d-flex">
              <div className="col-md-3" style={{ borderRight: '1px solid #eee', padding: '0' }}>
                {/* Nav tabs  */}
                <ul className="nav setting-tabs permission-tabs" role="tablist" style={{ display: 'unset' }}>
                  <li className="nav-item active">
                    <a className="nav-link active " data-bs-toggle="tab" href="#company">
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
                        className="feather feather-briefcase">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                      Công ty / nhóm
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-9">
                <div style={{ padding: '15px' }}>
                  {/* tab panes */}
                  <div className="tab-content">
                    <div className="container tab-pane active" id="company">
                      <div
                        className="text-center"
                        style={{ backgroundColor: '#cbf6fb', borderRadius: '15px', overflow: 'hidden' }}>
                        <img src="./groups_baner.png" height="200px" style={{ maxWidth: '100%' }} />
                        <div className="mt-5">
                          <h3>Thiết lập công ty hoặc nhóm của bạn</h3>
                          <p>
                            Phần mềm sẽ giúp bạn tạo ra một công ty hoặc một đội nhóm và được chia quyền hạn để quản lý
                            phần mềm!
                          </p>
                          <p>
                            Bạn chưa có nhóm/công ty. Hãy tạo 1 nhóm/công ty để cấp quyền cho nhân viên quản lý của bạn
                          </p>
                          <div className="loz-alert warning" style={{ margin: '15px' }}>
                            <div className="icon flex-0">
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
                                className="feather feather-info"
                                size="20">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                              </svg>
                            </div>
                            <div className="des flex-1">
                              <b>Để sử dụng tính năng này bạn phải nâng cấp gói có phí để tiếp tục sử dụng!</b>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagerCompanyAT
