import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import DonHang from "./pages/DonHang";
import ChiTietDonHang from "./pages/ChiTietDonHang"; // Import trang chi tiết đơn hàng

import SanPham from "./pages/SanPham";
import TheLoai from "./pages/TheLoai";
import Settings from "./pages/Settings";
import NavBarAdmin from "./components/navBarAdmin";
import HeaderAdmin from "./components/headerAdmin";
import Nav2 from "../share-view/Nav2";
import { useSelector } from "react-redux";

const AdminRouter = () => {
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  const routes = [
    { path: "/", element: <Dashboard /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/nguoi-dung", element: <Users /> },
    { path: "/don-hang", element: <DonHang /> },
    { path: "/chi-tiet-don-hang/:mahd", element: <ChiTietDonHang /> },
    { path: "/san-pham", element: <SanPham /> },
    { path: "/the-loai", element: <TheLoai /> },
    { path: "/*", element: <Navigate to="/" replace /> },
  ];

  const element = useRoutes(routes);

  // Điều kiện kiểm tra quyền truy cập
  if (!isAuthenticated || userInfo.TEN_PHAN_QUYEN !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Nav2 />

      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col-3">
          <NavBarAdmin />
        </div>
        <div className="col-9">
          <div>{element}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminRouter;
