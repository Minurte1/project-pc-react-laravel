// src/admin-view/router-admin.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './dashboardComponent';

const AdminRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard />
        }
      />

      {/* Thêm các route khác ở đây */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRouter;