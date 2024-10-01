import React from 'react';
import SidebarStatistical from '../components/SidebarStatistical';
import '../assets/styles/studentpage.css'; // CSS cho StudentPage

const StatisticalPage = () => {
    return (
        <section className='vh-90'>
            <div className="student-page">
                <SidebarStatistical />
                <div className="content">
                    {/* <h1>Student Page</h1>
                   <p>Welcome to the student page.</p> */}
                    {/* Thêm nội dung khác của trang ở đây */}
                </div>
            </div>
        </section>
    );
};

export default StatisticalPage;