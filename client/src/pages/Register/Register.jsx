import React from "react";

const Register = () => {
  return (
    <body
      style={{
        backgroundColor: "#f7fafc",
        background: " url(./login-background.webp) no-repeat",
        backgroundSize: "contain",
        backgroundPositionY: "60%",
        justifyContent: "center",
      }}
    >
      <div className="container mb-5">
        <div className="login-container d-flex" id="login">
          <div className="login-content-container">
            <div className="col-md-12 text-center mt-5">
              <a href="/" title="LOZIDO - Quản lý nhà cho thuê">
                <img
                  style={{
                    borderRadius: "100%",
                    border: "2px solid #4bcffa",
                    margin: "15px 0px",
                    boxShadow:
                      " 0 1rem 2rem 0 rgb(0 0 0 / 3%), 0 0.5rem 1rem 0 rgb(0 0 0 / 5%)",
                  }}
                  width="80px"
                  class="custom-logo img-responsive"
                  src="./LOGO-NHATRO.png"
                  alt="Logo LOZIDO - Quản lý nhà cho thuê"
                  title="LOZIDO - Quản lý nhà cho thuê"
                />
              </a>
              <h2 className="mb-4 title">
                <span className="title-feature">ĐĂNG KÝ TÀI KHOẢN</span>
              </h2>
              <h3 className="mb-4 title">
                <span className="title-feature" style={{ color: "" }}>
                  PHẦN MỀM QUẢN LÝ NHÀ TRỌ
                </span>
                <br />
                Quản lý chuyên nghiệp!
              </h3>
            </div>

            <div className="row login-form-container">
              <div
                className="col-12 login-form-1"
                style={{ backgroundColor: "#fff" }}
              >
                <form
                  method="POST"
                  className="needs-validation"
                  id="login-form"
                  novalidate=""
                >
                  <input
                    type="hidden"
                    name="_token"
                    value="5BJeOPDNyeTzDZjmxeICdcC1ZbEiQS4PdhfCFOol"
                  />{" "}
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <label for="name" className="form-label">
                          Tên người dùng <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Nhập tên người dùng"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <label for="phone" className="form-label">
                          Số điện thoại <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          placeholder="Nhập số điện thoại"
                          required=""
                          data-format="stringNumber"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <label for="name" className="form-label">
                          Mật khẩu <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Nhập nhập khẩu"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <label for="confirm_password" className="form-label">
                          Nhập lại mật khẩu{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="password_confirmation"
                          placeholder="Nhập lại mật khẩu"
                          required=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-2">
                    <button
                      type="button"
                      id="submit-login"
                      className="btnSubmit btn btn-primary"
                    >
                      Đăng ký
                    </button>
                  </div>
                  <div className="form-group mb-2 text-center">
                    <a type="button" className="btn btn-link" href="/login">
                      Bạn đã có tài khoản, Đăng nhập?
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <div className="text-center mt-5">
              <p>
                Copyright @ <strong>RRMS - Quản lý nhà cho thuê</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Register;
