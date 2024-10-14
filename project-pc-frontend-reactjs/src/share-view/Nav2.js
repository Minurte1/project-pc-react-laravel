import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import logo from "./img/ICON.ico";
import desktop from "./img/DESKTOP.ico";
import apple from "./img/APPLE.ico";
import asus from "./img/ASUS.ico";

import "./css/Nav2.scss";

const Nav2 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/khachhang", {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Yêu cầu không thành công");
      }

      const jsonResponse = await response.json();

      setData(jsonResponse.data);
      setLoading(false);
      console.log(jsonResponse);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewHomePage = () => {
    navigate("/");
  };

  const handleViewDesktop = () => {
    navigate("/Desktop");
  };

  const handleViewApple = () => {
    navigate("/Apple");
  };

  const handleViewASUS = () => {
    navigate("/ASUS");
  };

  const handleViewAll = () => {
    navigate("/All");
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    navigate("/profile");
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Xử lý logout ở đây
    console.log("Logged out");
    handleMenuClose();
  };
  return (
    <div className="navbar_Nav2" id="navbar">
      <div className="nav_Nav2">
        <div className="isOpen_Nav2">
          <a className="image-navbar_Nav2" onClick={handleViewHomePage}>
            <div className="image_Nav2">
              <img src={logo} alt="ShopPC Logo" />
              <span>ShopPC</span>
            </div>
          </a>
          <div className="ml-auto_Nav2">
            <a
              onClick={handleViewDesktop}
              className="nav-item_Nav2 nav-item1_Nav2"
            >
              <img src={desktop} alt="Desktop logo" />
              <span>Desktop</span>
            </a>
            <a
              onClick={handleViewApple}
              className="nav-item_Nav2 nav-item2_Nav2"
            >
              <img src={apple} alt="Desktop logo" />
              <span>Apple</span>
            </a>
            <a onClick={handleViewASUS} className="nav-item_Nav2">
              <img src={asus} alt="Desktop logo" />
              <span>ASUS</span>
            </a>
            <a onClick={handleViewAll} className="nav-item_Nav2 nav-item4_Nav2">
              Tất Cả
            </a>
          </div>
          <div className="cart-div_Nav2">
            {}
            <div className="cart-div_Nav2" onClick={handleMenuOpen}>
              {" "}
              <IconButton>
                <Avatar
                  alt={data && data.length > 0 ? data[0].TenLienHe : "User"}
                />{" "}
              </IconButton>
              <span>
                {" "}
                {data && data.length > 0 ? data[0].TenLienHe : "Khách"}
              </span>
            </div>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <Typography textAlign="center">Hồ sơ</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Đăng xuất</Typography>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav2;
