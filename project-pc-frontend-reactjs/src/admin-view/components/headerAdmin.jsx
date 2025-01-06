import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import {
  ShoppingCart,
  AccountCircle,
  Phone,
  Storefront,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";
const HeaderAdmin = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const api = process.env.REACT_APP_URL_SERVER;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setAnchorEl(null); // Đặt lại anchorEl
    setIsOpen(false); // Đặt lại trạng thái menu
  }, []);

  // Mở menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  // Đóng menu
  const handleMenuClose = () => {
    console.log("handleMenuClose");
    setAnchorEl(null);
    setIsOpen(false);
  };
  console.log("isOpen", isOpen);
  // Xử lý đăng xuất
  const handleLogout = async () => {
    try {
      // Gọi API để clear session trên backend
      // await axios.post(`${api}/logout`);

      // Clear cookies và Redux state
      Cookies.remove("accessToken");

      // Điều hướng về trang đăng nhập
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "#04cbf0" }}>
      <Toolbar>
        {/* Left section: Logo and other items */}
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              marginRight: 2,
              color: "white",
              textDecoration: "none",
            }}
          >
            <img
              src={`https://image.cocoonvietnam.com/uploads/vegan_society_41cc2b390a.svg`}
              alt="PNJ"
              style={{ width: "40px", marginTop: "10px" }}
            />
          </Typography>
        </Box>

        {/* Middle section: Phone number */}

        {/* Right section: User and Cart */}
        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
          {isAuthenticated ? (
            <>
              <Button
                variant="text"
                sx={{ padding: 2, color: "#fff" }}
                onClick={handleMenuOpen}
              >
                {userInfo.AVATAR ? (
                  <Avatar
                    src={`${api}/images/${userInfo.AVATAR}`}
                    alt={userInfo.AVATAR}
                  />
                ) : (
                  <AccountCircle />
                )}
                <Typography variant="body2" sx={{ ml: 2, color: "white" }}>
                  {userInfo.TENNGUOIDUNG || "Người dùng"}
                </Typography>
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleMenuClose}
                sx={{ mt: 1 }}
              >
                <MenuItem component={Link} to="/profile">
                  Thông tin cá nhân
                </MenuItem>

                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {" "}
              <IconButton
                component={Link}
                to="/login"
                sx={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <AccountCircle />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  Đăng nhập
                </Typography>
              </IconButton>
            </>
          )}
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAdmin;
