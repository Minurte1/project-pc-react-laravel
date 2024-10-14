import React, { createContext, useContext, useState } from "react";

// Tạo context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

  const loginIs = () => {
    setIsLoggedIn(true); // Đặt trạng thái đăng nhập thành true
  };

  const logoutIs = () => {
    setIsLoggedIn(false); // Đặt trạng thái đăng nhập thành false
  };
  console.log(isLoggedIn);
  return (
    <AuthContext.Provider value={{ isLoggedIn, loginIs, logoutIs }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng context
export const useAuth = () => {
  return useContext(AuthContext);
};
