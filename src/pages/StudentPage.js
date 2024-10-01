import React from 'react';
import SidebarStudent from '../components/SidebarStudent';
import { Outlet } from 'react-router-dom';  // Import Outlet to render child routes
import '../assets/styles/studentpage.css';  // CSS for StudentPage

const StudentPage = () => {
  return (
    <div className="student-page">
      <SidebarStudent />
      <div className="content">
        {/* <h1>Student Page</h1> */}
        {/* Renders the child routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default StudentPage;
