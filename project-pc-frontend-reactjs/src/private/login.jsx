import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Sử dụng đúng cú pháp import
import { AuthContext } from "../authentication/AuthContext"; // Đường dẫn tới AuthContext
import { GoogleLogin } from '@react-oauth/google';
import logoPCGamer from "../assets/PC_Gamer_square_logo.png";
import { enqueueSnackbar } from "notistack";
import "./login.scss";
import axios from 'axios';

import { login } from "../services/accountService"; // Assuming the login function is in api-service.js

const Login = () => {
  const API_URL = 'http://127.0.0.1:8000/api';
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

  const handleLoginGoogle = async (tokenGG) => {
    setError(null);

    try {
      enqueueSnackbar("Đợi một chút!", { variant: "info" });

      // Giải mã token Google để lấy email
      const decodedToken = jwtDecode(tokenGG);
      const email = decodedToken.email;  // Lấy email từ token Google

      // Gửi email đến backend để kiểm tra và xử lý
      const response = await axios.post(`${API_URL}/loginGoogle`, { email });

      // Nhận token JWT từ backend
      const { token } = response.data;

      // Lưu token JWT vào localStorage
      localStorage.setItem("authToken", token);
      updateAuthStatus();

      // Điều hướng đến trang chủ
      navigate("/");

    } catch (err) {
      console.error("Login failed:", err.response ? err.response.data : err.message);
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <section className="section-defaut section-login">
        <div className="container container-login">
          <div className="row">
            {/* Phần bên trái: Hình ảnh */}
            <div className="col-lg-6 col-md-12 welcome-section-login d-none d-md-block">
              <div className="image-login text-center">
                <img
                  src={logoPCGamer}
                  alt="Welcome to Hotel"
                  className="img-fluid rounded"
                />
              </div>
            </div>

            {/* Phần bên phải: Đăng nhập */}
            <div className="col-lg-6 col-md-12 login-section-login">
              <h2 className="text-center font-weight-bold mb-4">Đăng nhập</h2>
              <form onSubmit={handleLogin}>
                {/* Nhập email và mật khẩu */}
                <div className="input-group-login mb-4">
                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email đăng nhập"
                    style={{ borderRadius: "8px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    style={{ borderRadius: "8px" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Nút đăng nhập */}
                <button
                  type="submit"
                  className="btn btn-warning btn-block w-100 submit-btn-login"
                >
                  Tiếp tục
                </button>
              </form>

              {/* Đăng nhập với Google */}
              <div className="col-lg-12 col-md-12 text-center mt-4">
                <p>Hoặc</p>
                <div className="d-flex justify-content-center">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      handleLoginGoogle(credentialResponse.credential)
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>
              </div>

              {/* Hiển thị lỗi */}
              {error && <p className="text-danger mt-3 text-center">{error}</p>}

              {/* Link đăng ký */}
              <p className="text-center mt-4 register-link-login">
                Bạn chưa có tài khoản?{" "}
                <Link to="/register" className="text-primary">
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
