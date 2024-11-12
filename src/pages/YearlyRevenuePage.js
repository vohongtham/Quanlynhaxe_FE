import React from 'react';
import YearlyRevenue from '../components/YearlyRevenue';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const YearlyRevenuePage = () => {
    return (
        <div>
            <YearlyRevenue />
            <ToastContainer /> {/* Để hiển thị thông báo nếu có lỗi */}
        </div>
    );
};

export default YearlyRevenuePage;
