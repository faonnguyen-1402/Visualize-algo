import React, { useState, useEffect, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute: React.FC = () => {
  // Lấy token trực tiếp tại đây mỗi khi component được render bởi Router
  const token = localStorage.getItem('accessToken');
  
  // Kiểm tra điều kiện hợp lệ
  const isAuthenticated = token && token !== 'undefined' && token !== 'null' && token !== '';

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warn("Please login or register to access the Practice section!", {
        toastId: "barrier-practice"
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;