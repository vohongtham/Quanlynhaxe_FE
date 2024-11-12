import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NganhList from '../components/NganhList'; // Import the component for displaying the list of Nganh
import NganhService from '../services/nganh.service'; // Service to interact with Nganh API
import NganhAdd from '../components/NganhAdd'; // Modal component for adding a new Nganh
import '../assets/styles/main.css';
import Navbar from "../components/Navbar";

const Nganh = () => {
    const [nganhs, setNganhs] = useState([]); // State for list of Nganh
    const [filteredNganhs, setFilteredNganhs] = useState([]); // Filtered list of Nganh
    const [activeIndex, setActiveIndex] = useState(-1); // Active row highlighting state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [mssv, setMssv] = useState(""); // State for MSSV

    // Fetch all Nganh information
    const retrieveNganhs = async () => {
        setLoading(true);
        setError(null); // Clear any existing error state
        try {
            const response = await NganhService.getAll(); // Fetch all Nganh data
            setNganhs(response); // Set the state with the fetched Nganh data
            setFilteredNganhs(response); // Set the filtered list as well
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

    // Fetch Nganh data on component mount
    useEffect(() => {
        retrieveNganhs(); // Call the fetch function when the component mounts
    }, []);

    // Handle loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="col-md-12">
                    {filteredNganhs.length > 0 ? (
                        <NganhList
                            refreshList={retrieveNganhs} // Pass the refresh function
                            nganhs={filteredNganhs} // Pass Nganh data to the list
                            activeIndex={activeIndex} // For active row highlighting
                            setActiveIndex={setActiveIndex} // Function to set active row
                            handleShow={handleShow} // Pass handleShow function to the list
                        />
                    ) : (
                        <p>Không có ngành nào.</p> // Display when no Nganh are found
                    )}
                    <div className="row mt-2">
                        <div className="col d-flex justify-content-between align-items-center">
                            <button className="btn btn-sm btn-primary" onClick={() => handleShow(mssv)}>
                                <i className="fas fa-plus"></i> Thêm ngành
                            </button>
                            <button className="btn btn-sm btn-primary" onClick={retrieveNganhs}>
                                <i className={`fas fa-redo ${loading ? 'fa-spin' : ''}`}></i>
                                {loading ? " Đang làm mới..." : " Làm mới"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Nganh Modal */}
            <NganhAdd
                show={showModal} // Pass the modal visibility state
                handleClose={handleClose} // Pass the close handler
                refreshData={retrieveNganhs} // Pass the refresh function
                loggedInEmail={mssv} // Pass MSSV to the modal for fetching details
            />
        </div>
    );
};

export default Nganh;
