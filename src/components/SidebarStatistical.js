import React from 'react';
import '../assets/styles/sidebar.css';
import { Link } from 'react-router-dom'; // CSS cho sidebar của trang StudentPage

const SidebarStatistical = () => {
  const maQuyen = localStorage.getItem('ma_quyen'); // Retrieve Ma_Quyen from local storage

  // Determine the home link based on Ma_Quyen
  const homeLink = maQuyen === 'MQAD' ? '/admin/page' : maQuyen === 'MQNV' ? '/employee/page' : '/';

  return (
    <div className="sidebar-student">
      <h3>Thống Kê</h3>
      <ul>
        <li><Link className="navbar-brand" to={homeLink}><i className="bi bi-house-fill" style={{ marginRight: '8px'}}></i>Home</Link></li>
        <li><Link to="daily-revenue"><i className="bi bi-reception-4" style={{ marginRight: '5px' }}></i>Thống kê theo ngày</Link></li>
        <li><Link to="monthly-revenue"><i className="bi bi-reception-4" style={{ marginRight: '5px' }}></i>Thống kê theo tháng</Link></li>
        <li><Link to="yearly-revenue"><i className="bi bi-reception-4" style={{ marginRight: '5px' }}></i>Thống kê theo năm</Link></li>
      </ul>
    </div>
  );
};


export default SidebarStatistical;
