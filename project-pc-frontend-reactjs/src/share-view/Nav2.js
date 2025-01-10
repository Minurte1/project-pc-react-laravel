import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Chỉ import một lần
import {
  faUser,
  faSignOutAlt,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";

import { AuthContext } from "../authentication/AuthContext"; // Đường dẫn tới AuthContext
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import logo from "./img/ICON.ico";
import desktop from "./img/DESKTOP.ico";
import apple from "./img/APPLE.ico";
import asus from "./img/ASUS.ico";
import "./css/Nav2.scss";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
const Nav2 = () => {
  const { isLoggedIn, setIsLoggedIn, userData, updateAuthStatus } =
    useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra token trong localStorage để xác định trạng thái đăng nhập
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        // console.log("userData: ", userData)
      } catch (error) {
        console.error("Token không hợp lệ:", error);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn, updateAuthStatus]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear(); // Xóa toàn bộ dữ liệu trong localStorage
    setIsLoggedIn(false); // Cập nhật trạng thái đăng xuất trong Context
    dispatch(logout()); // Gọi action logout từ Redux
    navigate("/login");
  };

  return (
    <div className="navbar_Nav2" id="navbar">
      <div className="nav_Nav2">
        <div className="isOpen_Nav2">
          <a className="image-navbar_Nav2" onClick={() => navigate("/")}>
            <div className="image_Nav2">
              <img src={logo} alt="ShopPC Logo" />
              <span>ShopPC</span>
            </div>
          </a>
          <div className="ml-auto_Nav2">
            <a onClick={() => navigate("/Desktop")} className="nav-item_Nav2">
              <img src={desktop} alt="Desktop logo" />
              <span>Desktop</span>
            </a>
            <a onClick={() => navigate("/Apple")} className="nav-item_Nav2">
              <img src={apple} alt="Apple logo" />
              <span>Apple</span>
            </a>
            <a onClick={() => navigate("/ASUS")} className="nav-item_Nav2">
              <img src={asus} alt="ASUS logo" />
              <span>ASUS</span>
            </a>
            <a onClick={() => navigate("/All")} className="nav-item_Nav2">
              Tất Cả
            </a>
          </div>

          <div className="cart-div_Nav2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/cart"
                  className=""
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    width: "130px",
                    color: "inherit",
                  }}
                >
                  <ShoppingCartIcon style={{ marginRight: "8px" }} />
                  Giỏ hàng
                </Link>
                <div className="cart-div_Nav2" onClick={handleMenuOpen}>
                  <IconButton>
                    <Avatar
                      alt={userData?.TEN_KHACH_HANG || "User"}
                      src={userData?.avatar}
                    />
                  </IconButton>
                  <span>{userData?.TEN_KHACH_HANG || "Khách"}</span>
                </div>
              </>
            ) : (
              <button
                className="btn btn-login"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </button>
            )}

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  borderRadius: "10px",
                  padding: "8px 0",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  minWidth: "150px",
                },
              }}
            >
              {userData &&
              userData.TEN_PHAN_QUYEN &&
              userData.TEN_PHAN_QUYEN === "Admin" ? (
                <MenuItem
                  onClick={() => navigate("/admin")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <FontAwesomeIcon
                    icon={faScrewdriverWrench}
                    style={{ marginRight: "10px", color: "#555" }}
                  />
                  <Typography variant="body1" textAlign="center">
                    Trang Admin
                  </Typography>
                </MenuItem>
              ) : (
                ""
              )}

              <MenuItem
                onClick={() => navigate("/profile")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ marginRight: "10px", color: "#555" }}
                />
                <Typography variant="body1" textAlign="center">
                  Hồ sơ
                </Typography>
              </MenuItem>

              <MenuItem
                onClick={() => handleLogout()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={{ marginRight: "10px", color: "#555" }}
                />
                <Typography variant="body1" textAlign="center">
                  Đăng xuất
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav2;
