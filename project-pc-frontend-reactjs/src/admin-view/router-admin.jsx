import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import DonHang from "./pages/DonHang";
import SanPham from "./pages/SanPham";
import TheLoai from "./pages/TheLoai";
import Settings from "./pages/Settings";
import NavBarAdmin from "./components/navBarAdmin";
import HeaderAdmin from "./components/headerAdmin";

const AdminRouter = () => {
  const routes = [
    { path: "/", element: <Dashboard /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/nguoi-dung", element: <Users /> },
    { path: "/don-hang", element: <DonHang /> },
    { path: "/san-pham", element: <SanPham /> },
    { path: "/the-loai", element: <TheLoai /> },
    { path: "/*", element: <Navigate to="/" replace /> },
  ];

  const element = useRoutes(routes);

  return (
    <div>
      <HeaderAdmin />

      <div className="row">
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