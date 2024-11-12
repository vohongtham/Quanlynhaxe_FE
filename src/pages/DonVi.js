import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DonViList from '../components/DonViList'; // Import the component for displaying the list of Don Vi
import DonViService from '../services/donvi.service'; // Service to interact with Don Vi API
import DonViAdd from '../components/DonViAdd'; // Modal component for adding a new Don Vi
import '../assets/styles/main.css';
import Navbar from "../components/Navbar";

const DonVi = () => {
    const [donVis, setDonVis] = useState([]); // State for list of Don Vi
    const [filteredDonVis, setFilteredDonVis] = useState([]); // Filtered list of Don Vi
    const [activeIndex, setActiveIndex] = useState(-1); // Active row highlighting state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [mssv, setMssv] = useState(""); // State for MSSV

    // Fetch all Don Vi information
    const retrieveDonVis = async () => {
        setLoading(true);
        setError(null); // Clear any existing error state
        try {
            const response = await DonViService.getAll(); // Fetch all Don Vi data
            setDonVis(response); // Set the state with the fetched Don Vi data
            setFilteredDonVis(response); // Set the filtered list as well
        } catch (error) {
            setError(error); // Set error state if any error occurs
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    // Handle the modal close
    const handleClose = () => setShowModal(false);

    // Handle the modal show and set MSSV
    const handleShow = (mssv) => {
        setMssv(mssv); // Set MSSV when the modal is shown
        setShowModal(true);
    };

    // Fetch Don Vi data on component mount
    useEffect(() => {
        retrieveDonVis(); // Call the fetch function when the component mounts
    }, []);

    // Handle loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="col-md-12">
                    {filteredDonVis.length > 0 ? (
                        <DonViList
                            refreshList={retrieveDonVis} // Pass the refresh function
                            donVis={filteredDonVis} // Pass Don Vi data to the list
                            activeIndex={activeIndex} // For active row highlighting
                            setActiveIndex={setActiveIndex} // Function to set active row
                            handleShow={handleShow} // Pass handleShow function to the list
                        />
                    ) : (
                        <p>Không có đơn vị nào.</p> // Display when no Don Vi are found
                    )}
                    <div className="row mt-2">
                        <div className="col d-flex justify-content-between align-items-center">
                            <button className="btn btn-sm btn-primary" onClick={() => handleShow(mssv)}>
                                <i className="fas fa-plus"></i> Thêm đơn vị
                            </button>
                            <button className="btn btn-sm btn-primary" onClick={retrieveDonVis}>
                                <i className={`fas fa-redo ${loading ? 'fa-spin' : ''}`}></i>
                                {loading ? " Đang làm mới..." : " Làm mới"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Don Vi Modal */}
            <DonViAdd
                show={showModal} // Pass the modal visibility state
                handleClose={handleClose} // Pass the close handler
                refreshData={retrieveDonVis} // Pass the refresh function
                loggedInEmail={mssv} // Pass MSSV to the modal for fetching details
            />
        </div>
    );
};

export default DonVi;
