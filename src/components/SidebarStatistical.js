import React from 'react';
import '../assets/styles/sidebar.css';
import { Link } from 'react-router-dom'; // CSS cho sidebar của trang StudentPage

const SidebarStatistical = () => {
  return (
    <div className="sidebar-student">
      <h3>Thống Kê</h3>
      <ul>
        <li><Link to="#">Thống kê theo tháng</Link></li>
        <li><a href="#">Thống kê theo ngày</a></li>
      </ul>
    </div>
  );
};


export default SidebarStatistical;
