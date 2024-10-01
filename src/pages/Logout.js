import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('ma_quyen');
    localStorage.removeItem('userRole');

    // Notify parent component about logout
    if (onLogout) onLogout();

    // Show a success message
    toast.success('Đăng xuất thành công.');

    // Redirect to home page
    navigate('/');

  }, [navigate, onLogout]);

  return null;  // This component doesn't need to render anything
}

export default Logout;




