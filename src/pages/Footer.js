// src/components/Footer.js
import React from 'react';
import '../assets/styles/header.css';   // Import footer.css from the assets folder

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <p>&copy; 2024 Hệ Thống Quản Lý Nhà Xe Sinh Viên.</p>
        {/* <p>Contact: info@example.com</p> */}
      </div>
    </div>
  );
}

export default Footer;
