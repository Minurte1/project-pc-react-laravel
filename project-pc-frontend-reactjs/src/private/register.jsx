import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import logoPCGamer from "../assets/PC_Gamer_square_logo.png";
import "./login.scss";

import { createAccount } from "../services/accountService";

const Register = () => {
  const [formRegister, setFormRegister] = useState({
    TEN_KHACH_HANG: "",
    DIA_CHI: "",
    GHI_CHU_KH: "",
    TEN_DANG_NHAP: "",
    MAT_KHAU: "",
    NHAP_LAI_MAT_KHAU: "",
    MA_PHAN_QUYEN: 2,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (formRegister.MAT_KHAU !== formRegister.NHAP_LAI_MAT_KHAU) {
      setError("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
      return;
    }

    try {
      const data = await createAccount(formRegister);
      console.log("Account created:", data);
      navigate("/login");
    } catch (err) {
      console.error(
        "Registration failed:",
        err.response ? err.response.data : err.message
      );
      setError("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <>
      <section className="section-defaut section-login">
        <div className="container container-login">
          <div className="row">
            <div className="col-lg-6 col-md-12 welcome-section-login d-none d-md-block">
              <div className="image-login">
                <img
                  src={logoPCGamer}
                  alt="PC Gamer logo"
                  className="img-fluid"
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12 login-section-login my-auto">
              <h2 style={{ fontWeight: "bold" }}>Đăng ký</h2>
              <form onSubmit={handleRegister}>
                <div className="input-group-login mb-3">
                  <input
                    type="text"
                    name="TEN_KHACH_HANG"
                    className="form-control mb-2"
                    style={{ borderRadius: "8px" }}
                    placeholder="Họ tên"
                    value={formRegister.TEN_KHACH_HANG}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="DIA_CHI"
                    className="form-control mb-2"
                    style={{ borderRadius: "8px" }}
                    placeholder="Địa chỉ"
                    value={formRegister.DIA_CHI}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="TEN_DANG_NHAP"
                    className="form-control mb-2"
                    style={{ borderRadius: "8px" }}
                    placeholder="Email của bạn"
                    value={formRegister.TEN_DANG_NHAP}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="MAT_KHAU"
                    className="form-control mb-2"
                    style={{ borderRadius: "8px" }}
                    placeholder="Mật khẩu"
                    value={formRegister.MAT_KHAU}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="NHAP_LAI_MAT_KHAU"
                    className="form-control mb-2"
                    style={{ borderRadius: "8px" }}
                    placeholder="Nhập lại mật khẩu"
                    value={formRegister.NHAP_LAI_MAT_KHAU}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <p className=" mb-2">
                  Đăng ký thành viên ngay để trải nghiệm dịch vụ mua hàng dễ
                  dàng cùng nhiều ưu đãi hấp dẫn!
                </p>
                <button
                  type="submit"
                  className="btn btn-warning btn-block w-100 submit-btn-login"
                >
                  Đăng ký
                </button>
                <p className=" mt-3">
                  Bằng việc nhấn nút tiếp tục, bạn đã đồng ý với{" "}
                  <Link
                    to="/terms"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link
                    to="/privacy-policy"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Chính sách bảo mật
                  </Link>{" "}
                  của chúng tôi.
                </p>
              </form>

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}

              <p className="text-center mt-4 register-link-login">
                Bạn đã có tài khoản?
                <Link to="/login">Đăng nhập</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
