import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BaiXeList from '../components/BaiXeList'; // Adjust the path as necessary
import BaiXeService from '../services/baixe.service'; // Assuming a similar service structure for parking slots
import BaiXeAdd from '../components/BaiXeAdd'; // Import the modal component for adding a new parking slot
import '../assets/styles/main.css';

const BaiXe = () => {
    const [baiXes, setBaiXes] = useState([]); // Parking slots list state
    const [filteredBaiXes, setFilteredBaiXes] = useState([]); // Filtered parking slots list
    const [activeIndex, setActiveIndex] = useState(-1); // Highlight row
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [mssv, setMssv] = useState(""); // State for MSSV

    // Fetch all parking slot information
    const retrieveBaiXes = async () => {
        setLoading(true);
        setError(null); // Clear any existing error state
        try {
            const response = await BaiXeService.getAll(); // Call the parking slot service to get all parking slots
            setBaiXes(response); // Set the state with the fetched parking slots
            setFilteredBaiXes(response); // Set the filtered list as well
        } catch (error) {
            setError(error); // Handle any errors that occur
        } finally {
            setLoading(false); // Stop the loading state
        }
    };

    // Handle the modal close
    const handleClose = () => setShowModal(false);

    // Handle the modal show and set MSSV
    const handleShow = (mssv) => {
        setMssv(mssv); // Set MSSV when the modal is shown
        setShowModal(true);
    };

    // Fetch parking slot data on component mount
    useEffect(() => {
        retrieveBaiXes(); // Call the parking slot data fetch function
    }, []);

    // Handle loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/admin/page">
                        <i className="bi bi-house-fill" style={{ marginRight: '8px' }}></i>Home
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="navbar-brand" to="/baixes/page">Quản lý thông tin nhà xe</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="navbar-brand" to="/loaixe-phi">Giá tiền theo từng loại xe</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="mt-2 col-md-12">
                    {filteredBaiXes.length > 0 ? (
                        <BaiXeList
                            refreshList={retrieveBaiXes} // Pass the refresh function
                            baiXes={filteredBaiXes} // Pass parking slot data to the list
                            activeIndex={activeIndex} // For active row highlighting
                            setActiveIndex={setActiveIndex} // Function to set active row
                            handleShow={handleShow} // Pass handleShow function to the list
                        />
                    ) : (
                        <p>Không có nhà xe nào.</p> // Display when no parking slots are found
                    )}
                    <div className="row mt-3">
                        <div className="col d-flex justify-content-between align-items-center">
                            <button className="btn btn-sm btn-primary" onClick={() => handleShow(mssv)}> {/* Replace "MSSV_EXAMPLE" with the actual MSSV to be passed */}
                                <i className="fas fa-plus"></i> Thêm nhà xe
                            </button>
                            <button className="btn btn-sm btn-primary" onClick={retrieveBaiXes}>
                                <i className={`fas fa-redo ${loading ? 'fa-spin' : ''}`}></i>
                                {loading ? " Đang làm mới..." : " Làm mới"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Parking Slot Modal */}
            <BaiXeAdd
                show={showModal} // Pass the modal visibility state
                handleClose={handleClose} // Pass the close handler
                refreshData={retrieveBaiXes} // Pass the refresh function
                loggedInEmail={mssv} // Pass MSSV to the modal for fetching details
            />
        </div>
    );
};

export default BaiXe;
