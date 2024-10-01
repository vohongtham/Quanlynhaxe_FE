
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import VehicleInfoList from '../components/VehicleInfoList'; // Adjust the path as necessary
// import VehicleService from '../services/vehicle.service'; // Assuming a similar service structure for vehicles
// import { toast } from 'react-toastify'; // Import react-toastify for notifications
// import VehicleAddStudent from '../components/VehicleAddStudent'; // Import the modal component
// import '../assets/styles/main.css';

// const VehicleInfo = () => {
//     const [vehicles, setVehicles] = useState([]); // Vehicle list state
//     const [filteredVehicles, setFilteredVehicles] = useState([]); // Filtered vehicle list
//     const [activeIndex, setActiveIndex] = useState(-1); // Highlight row
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(null); // Error state
//     const [showModal, setShowModal] = useState(false); // Modal visibility state

//     // const navigate = useNavigate(); // For navigation

//     // Fetch all vehicle information
//     const retrieveVehicles = async () => {
//         setLoading(true);
//         setError(null); // Clear any existing error state
//         try {
//             const response = await VehicleService.getAll(); // Call the vehicle service to get all vehicles
//             setVehicles(response); // Set the state with the fetched vehicles
//             setFilteredVehicles(response); // Set the filtered list as well
//         } catch (error) {
//             setError(error); // Handle any errors that occur
//         } finally {
//             setLoading(false); // Stop the loading state
//         }
//     };

//     // Handle the modal close
//     const handleClose = () => setShowModal(false);

//     // Handle the modal show
//     const handleShow = () => setShowModal(true);

//     // Fetch vehicle data on component mount
//     useEffect(() => {
//         retrieveVehicles(); // Call the vehicle data fetch function
//     }, []);

//     // Handle loading and error states
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;

//     return (
//         <div>
//             <div className="container">
//                 <div className="mt-2 col-md-12">
//                     {filteredVehicles.length > 0 ? (
//                         <VehicleInfoList
//                             refreshList={retrieveVehicles} // Pass the refresh function
//                             vehicles={filteredVehicles} // Pass vehicle data to the list
//                             activeIndex={activeIndex} // For active row highlighting
//                             setActiveIndex={setActiveIndex} // Function to set active row
//                         />
//                     ) : (
//                         <p>Không có phương tiện nào.</p> // Display when no vehicles are found
//                     )}
//                     <div className="row mt-3">
//                         <div className="col d-flex justify-content-between align-items-center">
//                             <button className="btn btn-sm btn-primary" onClick={handleShow}>
//                                 <i className="bi bi-car-front-fill"></i> Thêm phương tiện
//                             </button>
//                             <button className="btn btn-sm btn-primary" onClick={retrieveVehicles}>
//                                 <i className={`fas fa-redo ${loading ? 'fa-spin' : ''}`}></i>
//                                 {loading ? " Đang làm mới..." : " Làm mới"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Add Vehicle Modal */}
//             <VehicleAddStudent
//                 show={showModal} // Pass the modal visibility state
//                 handleClose={handleClose} // Pass the close handler
//                 refreshData={retrieveVehicles} // Pass the refresh function
//             />
//         </div>
//     );
// };

// export default VehicleInfo;




import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import VehicleInfoList from '../components/VehicleInfoList'; // Adjust the path as necessary
import VehicleService from '../services/vehicle.service'; // Assuming a similar service structure for vehicles
// import { toast } from 'react-toastify'; // Import react-toastify for notifications
import VehicleAddStudent from '../components/VehicleAddStudent'; // Import the modal component
import '../assets/styles/main.css';

const VehicleInfo = () => {
    const [vehicles, setVehicles] = useState([]); // Vehicle list state
    const [filteredVehicles, setFilteredVehicles] = useState([]); // Filtered vehicle list
    const [activeIndex, setActiveIndex] = useState(-1); // Highlight row
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [mssv, setMssv] = useState(""); // State for MSSV

    // Fetch all vehicle information
    const retrieveVehicles = async () => {
        setLoading(true);
        setError(null); // Clear any existing error state
        try {
            const response = await VehicleService.getAll(); // Call the vehicle service to get all vehicles
            setVehicles(response); // Set the state with the fetched vehicles
            setFilteredVehicles(response); // Set the filtered list as well
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

    // Fetch vehicle data on component mount
    useEffect(() => {
        retrieveVehicles(); // Call the vehicle data fetch function
    }, []);

    // Handle loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <div className="container">
                <div className="mt-2 col-md-12">
                    {filteredVehicles.length > 0 ? (
                        <VehicleInfoList
                            refreshList={retrieveVehicles} // Pass the refresh function
                            vehicles={filteredVehicles} // Pass vehicle data to the list
                            activeIndex={activeIndex} // For active row highlighting
                            setActiveIndex={setActiveIndex} // Function to set active row
                            handleShow={handleShow} // Pass handleShow function to the list
                        />
                    ) : (
                        <p>Không có phương tiện nào.</p> // Display when no vehicles are found
                    )}
                    <div className="row mt-3">
                        <div className="col d-flex justify-content-between align-items-center">
                            <button className="btn btn-sm btn-primary" onClick={() => handleShow(mssv)}> {/* Replace "MSSV_EXAMPLE" with the actual MSSV to be passed */}
                                <i className="bi bi-car-front-fill"></i> Thêm phương tiện
                            </button>
                            <button className="btn btn-sm btn-primary" onClick={retrieveVehicles}>
                                <i className={`fas fa-redo ${loading ? 'fa-spin' : ''}`}></i>
                                {loading ? " Đang làm mới..." : " Làm mới"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Vehicle Modal */}
            <VehicleAddStudent
                show={showModal} // Pass the modal visibility state
                handleClose={handleClose} // Pass the close handler
                refreshData={retrieveVehicles} // Pass the refresh function
                loggedInEmail={mssv} // Pass MSSV to the modal for fetching details
            />
        </div>
    );
};

export default VehicleInfo;
