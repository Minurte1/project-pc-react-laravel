import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const updateAuthStatus = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwtDecode(token);
      setUserData(decoded);
      setIsLoggedIn(true);
    } else {
      setUserData(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    updateAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, updateAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};