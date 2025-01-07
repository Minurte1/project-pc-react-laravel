import React from "react";
import { Routes, Route, Navigate, useRoutes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import NavBarAdmin from "./components/navBarAdmin";
import HeaderAdmin from "./components/headerAdmin";

const AdminRouter = () => {
  return (
    <div className="d-flex">
      <HeaderAdmin />

      <div className="flex-grow-1">
        <NavBarAdmin />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminRouter;
