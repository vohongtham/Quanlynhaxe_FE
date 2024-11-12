
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Logout({ onLogout }) {
  const navigate = useNavigate();
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  const handleLogout = useCallback(() => {
    // Xóa dữ liệu người dùng từ local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('ma_quyen');
    localStorage.removeItem('userRole');

    // Gửi sự kiện để thông báo thay đổi localStorage
    window.dispatchEvent(new Event('storageChange'));

    // Thông báo cho component cha về việc đăng xuất
    if (onLogout) {
      onLogout();
    }

    // Hiển thị thông báo đăng xuất thành công
    toast.success('Đăng xuất thành công.');
    console.log("Thông báo đăng xuất đã hiển thị");

    // Điều hướng về trang chủ
    navigate('/');
  }, [navigate, onLogout]);

  useEffect(() => {
    if (!hasLoggedOut) {
      handleLogout();
      setHasLoggedOut(true); // Đặt biến hasLoggedOut để tránh gọi lại
    }
  }, [hasLoggedOut, handleLogout]);

  return null; // Component này không cần render gì cả
}

export default Logout;
