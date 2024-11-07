import { useRoutes } from "react-router-dom";
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { Navigate } from "react-router-dom";

import Home from "../views/HomePage/Home";
import ChiTietSanPham from "../views/ChiTietSanPham/ChiTietSanPham";
import MuaSanPham from "../views/MuaSanPham/MuaSanPham";
import SanPhamTatCa from "../views/SanPhamTatCa/SanPhamTatCa";
import SanPhamDesktop from "../views/SanPhamDesktop/SanPhamDesktop";
import SanPhamApple from "../views/SanPhamApple/SanPhamApple";
import SanPhamASUS from "../views/SanPhamASUS/SanPhamASUS";
import Test from "../views/Test/Test";
import ProfileCustomer from "../profileCustomer/profileCustomer";
import LoginView from "../views/page/login-view";
import Admin from "../admin-view/adminComponent";

function ProtectedRoute({ element, allowedRoles }) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/login" replace />; // Điều hướng nếu không có token
  }

  try {
    const decoded = jwt_decode(token);
    if (allowedRoles.includes(decoded.role)) {
      return element; // Hiển thị thành phần nếu vai trò hợp lệ
    } else {
      return <Navigate to="/" replace />; // Điều hướng nếu vai trò không hợp lệ
    }
  } catch (error) {
    console.error("Token decoding error:", error);
    return <Navigate to="/login" replace />; // Điều hướng nếu có lỗi
  }
}

const RouterView = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/SanPham/:id",
      element: <ChiTietSanPham />,
    },
    {
      path: "/MuaHang/:id",
      element: <MuaSanPham />,
    },
    {
      path: "/All",
      element: <SanPhamTatCa />,
    },
    {
      path: "/Desktop",
      element: <SanPhamDesktop />,
    },
    {
      path: "/login",
      element: <LoginView />,
    },
    {
      path: "/Apple",
      element: <SanPhamApple />,
    },
    {
      path: "/ASUS",
      element: <SanPhamASUS />,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/profile",
      element: <ProfileCustomer />,
    },
    {
      path: "*",
      element: <Navigate to="/contact" replace />,
    },
    {
      path: "/admin/*",
      element: <ProtectedRoute element={<Admin />} allowedRoles={[0]} />,
    },
  ]);

  return <div>{element}</div>;
};

export default RouterView;