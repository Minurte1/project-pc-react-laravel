import React from 'react';
import { Routes, Route, Navigate, useRoutes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';

const AdminRouter = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Nội dung chính */}
      <div className="flex-grow-1">
        <Navbar />
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
