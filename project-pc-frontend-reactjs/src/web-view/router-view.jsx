import { useRoutes } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { Navigate } from "react-router-dom";

import Home from "../views/HomePage/Home";
import ChiTietSanPham from "../views/ChiTietSanPham/ChiTietSanPham";
import MuaSanPham from "../views/MuaSanPham/MuaSanPham";
import SanPhamTatCa from "../views/SanPhamTatCa/SanPhamTatCa";
import SanPhamDesktop from "../views/SanPhamDesktop/SanPhamDesktop";
import SanPhamApple from "../views/SanPhamApple/SanPhamApple";
import SanPhamASUS from "../views/SanPhamASUS/SanPhamASUS";
import Test from "../views/Test/Test";

import LoginView from "../private/login";
import Register from "../private/register";
import Dashboard from "../admin-view/pages/Dashboard";
import Cart from "./view-page/cart";
import CartThanhToan from "./view-page/thanhToanCart";

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
      path: "/login",
      element: <LoginView />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/cart-thanh-toan",
      element: <CartThanhToan />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <div>{element}</div>;
};

export default RouterView;
