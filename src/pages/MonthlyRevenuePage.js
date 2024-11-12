import React from 'react';
import MonthlyRevenue from '../components/MonthlyRevenue';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của react-toastify nếu sử dụng
import { ToastContainer } from 'react-toastify';

const MonthlyRevenuePage = () => {
    return (
        <div>
            <MonthlyRevenue />
            <ToastContainer /> {/* Để hiển thị thông báo nếu có lỗi */}
        </div>
    );
};

export default MonthlyRevenuePage;
