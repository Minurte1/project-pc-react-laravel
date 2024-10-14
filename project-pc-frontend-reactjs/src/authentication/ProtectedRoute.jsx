// src/components/ProtectedRoute.js

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkUserRole } from "../service/loginServices"; // Đảm bảo đường dẫn đúng
import Cookies from "js-cookie";
const ProtectedRoute = ({ element, allowedRoles }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await checkUserRole();
        if (role === allowedRoles) {
          if (allowedRoles === 1) {
            console.log("check role ", role);
            setUserRole(role);
            setLoading(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        } 
      } catch (err) {
        setError("Failed to fetch user role");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hoặc một thành phần loading khác
  }

  if (error) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
