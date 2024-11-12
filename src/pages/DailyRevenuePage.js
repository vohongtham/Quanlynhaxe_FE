import React from 'react';
import DailyRevenue from '../components/DailyRevenue';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của react-toastify nếu sử dụng
import { ToastContainer } from 'react-toastify';

const DailyRevenuePage = () => {
    return (
        <div>
            <DailyRevenue />
            <ToastContainer /> {/* Để hiển thị thông báo nếu có lỗi */}
        </div>
    );
};

export default DailyRevenuePage;
