// src/components/ProtectedRoute.tsx
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute: React.FC = () => {
  // Tạo một state để quản lý token, giúp component tự re-render khi token thay đổi
  const [token, setToken] = useState(localStorage.getItem('accessToken') || localStorage.getItem('token'));

  useEffect(() => {
    // Hàm cập nhật lại token từ localStorage khi có sự kiện thay đổi auth
    const handleAuthChange = () => {
      const currentToken = localStorage.getItem('accessToken') || localStorage.getItem('token');
      setToken(currentToken);
    };

    // Lắng nghe sự kiện 'authChange' mà file Login phát ra
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // Kiểm tra điều kiện bảo vệ (loại trừ cả chuỗi "undefined")
  if (!token || token === 'undefined' || token === '') {
    toast.warn("Please login or register to access the Practice section!", {
      toastId: "barrier-practice"
    });
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;