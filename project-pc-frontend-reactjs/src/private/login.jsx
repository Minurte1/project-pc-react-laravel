import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Sử dụng đúng cú pháp import
import { AuthContext } from "../authentication/AuthContext"; // Đường dẫn tới AuthContext

import logoPCGamer from "../assets/PC_Gamer_square_logo.png";
import "./login.scss";

import { login } from "../services/accountService"; // Assuming the login function is in api-service.js

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Initialize navigate for redirection
  const { updateAuthStatus } = useContext(AuthContext);

  useEffect(() => {
    // Kiểm tra token trong localStorage để xác định trạng thái đăng nhập
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Call login API
      const token = await login(email, password);

      // Giải mã token và log ra console
      // console.log("token: ", token);
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);

      // Lưu thông tin token vào localStorage
      localStorage.setItem("authToken", token);
      updateAuthStatus(); // Cập nhật AuthContext ngay sau khi lưu token
      navigate("/");
    } catch (err) {
      console.error(
        "Login failed:",
        err.response ? err.response.data : err.message
      );
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
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
                  alt="Welcome to Hotel"
                  className="img-fluid"
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12 login-section-login">
              <h2 style={{ fontWeight: "bold" }}>Đăng nhập</h2>
              <form onSubmit={handleLogin}>
                <div className="input-group-login mb-3">
                  <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email đăng nhập"
                    style={{ borderRadius: "8px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className="form-control"
                    style={{ borderRadius: "8px" }}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-warning btn-block w-100 submit-btn-login"
                >
                  Tiếp tục
                </button>
              </form>

              {error && <p className="text-danger mt-3">{error}</p>}

              <p className="text-center mt-4 register-link-login">
                Bạn chưa có tài khoản ? <Link to="/register">Đăng ký</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
