import React from 'react';
import SidebarStatistical from '../components/SidebarStatistical';
import '../assets/styles/studentpage.css'; // CSS cho StudentPage
import { Outlet } from 'react-router-dom';  // Import Outlet to render child routes
import Background from '../assets/imgs/background.png'

const StatisticalPage = () => {
    return (
        <section className='vh-90'>
            <div className="student-page">
                <SidebarStatistical />
                <div className="content"
                    // style={{
                    //     backgroundImage: `url(${Background})`,
                    //     backgroundSize: 'cover',
                    //     backgroundPosition: 'center',
                    //     minHeight: '80vh',
                    //     marginTop: '-5px',
                    //   }}
                    >
                    {/* Renders the child routes */}
                    <Outlet />
                </div>
            </div>
        </section>
    );
};

export default StatisticalPage;