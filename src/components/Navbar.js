import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const maQuyen = localStorage.getItem('ma_quyen'); // Retrieve Ma_Quyen from local storage

    // Determine the home link based on Ma_Quyen
    const homeLink = maQuyen === 'MQAD' ? '/admin/page' : maQuyen === 'MQNV' ? '/employee/page' : '/';

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                {/* Dynamic Home Link */}
                <Link className="navbar-brand" to={homeLink}><i className="bi bi-house-fill" style={{ marginRight: '8px'}}></i>Home</Link>
                {/* Navbar toggler button for mobile view */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Navbar links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/students">Thông tin Sinh Viên</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/vehicles">Thông Tin Xe Sinh Viên</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

