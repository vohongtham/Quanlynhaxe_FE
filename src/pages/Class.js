import React, { useState, useEffect } from "react";
import ClassList from '../components/ClassList'; // Component for displaying the list of classes
import ClassService from '../services/class.service'; // Service to interact with the class API
import ClassAdd from '../components/ClassAdd'; // Modal component for adding a new class
import '../assets/styles/main.css';
import Navbar from "../components/Navbar";

const Class = () => {
    const [classes, setClasses] = useState([]); // State for list of classes
    const [filteredClasses, setFilteredClasses] = useState([]); // Filtered list of classes
    const [activeIndex, setActiveIndex] = useState(-1); // Active row highlighting state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [mssv, setMssv] = useState(""); // State for MSSV

    // Fetch all class information
    const retrieveClasses = async () => {
        setLoading(true);
        setError(null); // Clear any existing error state
        try {
            const response = await ClassService.getAll(); // Fetch all class data
            setClasses(response); // Set the state with the fetched class data
            setFilteredClasses(response); // Set the filtered list as well
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

    // Fetch class data on component mount
    useEffect(() => {
        retrieveClasses(); // Call the fetch function when the component mounts
    }, []);

    // Handle loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="col-md-12">
                    {filteredClasses.length > 0 ? (
                        <ClassList
                            refreshList={retrieveClasses} // Pass the refresh function
                            classes={filteredClasses} // Pass class data to the list
                            activeIndex={activeIndex} // For active row highlighting
                            setActiveIndex={setActiveIndex} // Function to set active row
                            handleShow={handleShow} // Pass handleShow function to the list
                        />
                    ) : (
                        <p>Không có lớp nào.</p> // Display when no classes are found
                    )}
                    <div className="row mt-2">
                        <div className="col d-flex justify-content-between align-items-center">
                            <button className="btn btn-sm btn-primary" onClick={() => handleShow(mssv)}>
                                <i className="fas fa-plus"></i> Thêm lớp
                            </button>
                            <button className="btn btn-sm btn-primary" onClick={retrieveClasses}>
                                <i className={`fas fa-redo ${loading ? 'fa-spin' : ''}`}></i>
                                {loading ? " Đang làm mới..." : " Làm mới"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Class Modal */}
            <ClassAdd
                show={showModal} // Pass the modal visibility state
                handleClose={handleClose} // Pass the close handler
                refreshData={retrieveClasses} // Pass the refresh function
                loggedInEmail={mssv} // Pass MSSV to the modal for fetching details
            />
        </div>
    );
};

export default Class;
