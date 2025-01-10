import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const GuardRoute = ({ children, requiredRole }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);

  const updateAuthStatus = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwtDecode(token);
      // console.log("decodeeeeee: ", decoded)
      setUserData(decoded);
      setIsLoggedIn(true);
      if (decoded.TEN_PHAN_QUYEN === "Admin") {
        setIsAdmin(true)
      }
    } else {
      setUserData(null);
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    updateAuthStatus();
    if (!userData) {
      // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
      return <Navigate to="/Desktop" replace />;
    }

    if (!isAdmin) {
      return <Navigate to="/" replace />;
    }
  }, []);

  return children;
};

export default GuardRoute;