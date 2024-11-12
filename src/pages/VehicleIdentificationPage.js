import React from 'react';
import VehicleIdentification from '../components/VehicleIdentification';
import { Link } from "react-router-dom";
import '../assets/styles/main.css';

const VehicleIdentificationPage = () => {
    // Get the user's role (assuming it's stored in localStorage or you have a global state)
    const maQuyen = localStorage.getItem('ma_quyen'); // Example using localStorage

    // Determine the dynamic home link based on the user's role
    const homeLink = maQuyen === "MQAD" ? "/admin/page" 
                    : maQuyen === "MQNV" ? "/employee/page" 
                    : "/"; // Fallback to home page if no matching role

    return (
        <div style={{background: '#C0D6E8', with: '800px'}}>
            <nav className="navbar navbar-expand-lg" style={{ height: '30px' }}>
                <div className="container">
                    <Link className="navbar-brand" to={homeLink}><i className="bi bi-house-fill" style={{ marginRight: '8px'}}></i>Home</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="navbar-brand" to="/vehicleindentification/page">Quản lý xe ra vào</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="navbar-brand" to="/records/page">Lịch sử xe ra vào</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <VehicleIdentification />
        </div>
    );
};

export default VehicleIdentificationPage;
