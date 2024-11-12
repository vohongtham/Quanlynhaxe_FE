import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChiTietRaVaoList from '../components/RecordList'; // Assuming you have this component for listing records
import ChiTietRaVaoService from '../services/chitietravao.service'; // Service for fetching details
import '../assets/styles/main.css';

const ChiTietRaVaoPage = () => {
    const [records, setRecords] = useState([]); // Original data for records
    const [filteredRecords, setFilteredRecords] = useState([]); // Filtered records
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get the user's role (assuming it's stored in localStorage or you have a global state)
    const maQuyen = localStorage.getItem('ma_quyen'); // Example using localStorage

    // Determine the dynamic home link based on the user's role
    const homeLink = maQuyen === "MQAD" ? "/admin/page" 
                    : maQuyen === "MQNV" ? "/employee/page" 
                    : "/"; // Fallback to home page if no matching role

    // Function to retrieve all records
    const retrieveRecords = async () => {
        setLoading(true); // Show loading state
        setError(null); // Clear any previous errors
        try {
            const response = await ChiTietRaVaoService.getAll(); // Fetch all records
            setRecords(response);
            setFilteredRecords(response); // Reset filtered list
        } catch (error) {
            setError(error); // Capture any errors
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    useEffect(() => {
        retrieveRecords(); // Fetch records on component mount
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    {/* <Link className="navbar-brand" onClick={handleHomeClick}>
                        <i className="bi bi-house-fill" style={{ marginRight: '8px' }}></i>Home
                    </Link> */}
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

            <div className="justify-content-center">
                <div className="container">
                    <div className="col-md-12">
                        {filteredRecords.length > 0 ? (
                            <ChiTietRaVaoList
                                refreshList={retrieveRecords}
                                records={filteredRecords}
                            />
                        ) : (
                            <p>Không có bản ghi nào.</p>
                        )}
                        <div className="row" style={{marginTop: '-10px'}}>
                            <div className="col d-flex justify-content-start align-items-center">
                                <button className="btn btn-sm btn-primary" onClick={retrieveRecords} disabled={loading}>
                                    <i className={`fas fa-redo ${loading ? 'fa-spin' : ''}`}></i> {loading ? "Đang làm mới..." : "Làm mới"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChiTietRaVaoPage;
