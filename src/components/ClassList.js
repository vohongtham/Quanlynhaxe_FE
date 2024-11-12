import React, { useState, useEffect } from 'react';
import ClassService from '../services/class.service'; // Adjust the path as necessary
import '../assets/styles/main.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ClassEdit from '../components/ClassEdit'; // Import the modal component for editing Lop

const ClassList = () => {
    // State management
    const [lopList, setLopList] = useState([]); // Full list of Lop records
    const [currentPage, setCurrentPage] = useState(1); // Pagination
    const [activeIndex, setActiveIndex] = useState(null); // Highlight row
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const itemsPerPage = 6; // Items per page
    const [selectedLop, setSelectedLop] = useState(null); // State to store selected Lop for editing
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

    // Define the refreshData function
    const refreshData = () => {
        // Logic to refresh data, such as fetching updated student list
        console.log("Data refreshed");
    };

    // Fetch data when component mounts
    useEffect(() => {
        const fetchLop = async () => {
            try {
                const data = await ClassService.getAll();
                setLopList(data);
            } catch (err) {
                setError('Failed to fetch Lop records');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLop();
    }, []);

    // Handle Lop deletion
    const deleteLop = async (Ma_Lop) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa lớp này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            try {
                await ClassService.delete(Ma_Lop); // Perform deletion via API
                setLopList(lopList.filter(lop => lop.Ma_Lop !== Ma_Lop)); // Remove the deleted Lop from the list
                toast.success('Xóa lớp thành công!'); // Success message
            } catch (err) {
                console.error("Failed to delete Lop:", err);
                toast.error('Xóa lớp thất bại. Vui lòng thử lại.'); // Error message
            }
        }
    };

    // Function to open modal and set selected Lop for editing
    const handleEditLop = (lop) => {
        setSelectedLop(lop);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false); // Close modal when done
        setSelectedLop(null); // Clear selected Lop
    };

    // Handle page change
    const goToPage = (page) => setCurrentPage(page);
    const prevPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    const nextPage = () => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);

    // Handle row highlight
    const onUpdateActiveIndex = (index) => setActiveIndex(index);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    // Search functionality triggered by button
    const onSubmitSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset pagination when searching
    };

    // Filtered Lop based on search term
    const filteredLop = lopList.filter((lop) => {
        const searchValue = searchTerm.toLowerCase();

        return (
            (lop.Ma_Lop?.toLowerCase().includes(searchValue) || '') ||  // Search by Lop ID
            (lop.TenLop?.toLowerCase().includes(searchValue) || '') ||  // Search by Lop name
            (lop.Ma_Nganh?.toLowerCase().includes(searchValue) || '')
        );
    });

    const totalPages = Math.ceil(filteredLop.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedLop = filteredLop.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className='container'>
            {/* Show loading message */}
            {loading && <div>Loading...</div>}

            {/* Show error message if there's an error */}
            {error && <div>{error}</div>}

            {/* If no loading or error, show the table */}
            {!loading && !error && (
                <>
                    <div className="mb-3 d-flex">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm lớp..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ marginRight: '10px', fontSize: '18px' }}
                        />
                        <button className="btn btn-secondary ml-2" onClick={onSubmitSearch}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <h4 className="text-uppercase text-center">THÔNG TIN LỚP</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã lớp</th>
                                <th>Tên lớp</th>
                                <th>Mã Ngành</th>
                                <th>Xóa lớp</th>
                                <th>Hiệu chỉnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedLop.length > 0 ? (
                                displayedLop.map((lop, index) => (
                                    <tr
                                        key={lop.Ma_Lop}
                                        className={index === activeIndex ? 'active' : ''}
                                        onClick={() => onUpdateActiveIndex(index)}
                                    >
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{lop.Ma_Lop}</td>
                                        <td>{lop.TenLop}</td>
                                        <td>{lop.Ma_Nganh}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={(e) => { e.stopPropagation(); deleteLop(lop.Ma_Lop); }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() => handleEditLop(lop)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        {searchTerm ? 'Không tìm thấy lớp phù hợp' : 'Không có lớp nào'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Render the LopEdit modal */}
                    {isModalOpen && (
                        <ClassEdit
                            show={isModalOpen}
                            handleClose={closeModal}
                            lop={selectedLop}
                            refreshData={refreshData} 
                            // refreshData={() => { setLoading(true); fetchLop(); }} // Refresh after editing
                        />
                    )}

                    {/* Pagination Controls */}
                    <nav aria-label="Page navigation" className="d-flex justify-content-end">
                        <ul className="pagination pagination-sm">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={(e) => { e.preventDefault(); prevPage(); }}>
                                    Previous
                                </a>
                            </li>
                            {pages.map((page) => (
                                <li
                                    key={page}
                                    className={`page-item ${page === currentPage ? 'active' : ''}`}
                                >
                                    <a className="page-link" onClick={(e) => { e.preventDefault(); goToPage(page); }}>
                                        {page}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={(e) => { e.preventDefault(); nextPage(); }}>
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
};

export default ClassList;


// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import { toast } from 'react-toastify';
// import '../assets/styles/main.css';
// import ClassService from '../services/class.service'; // Import your service file
// import ClassEdit from '../components/ClassEdit'; // Import your ClassEdit modal component

// const ClassList = () => {
//     const [lopList, setLopList] = useState([]); // Full list of Lop records
//     const [currentPage, setCurrentPage] = useState(1); // Pagination
//     const [activeIndex, setActiveIndex] = useState(null); // Highlight row
//     const [searchTerm, setSearchTerm] = useState(''); // Search term state
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(null); // Error state
//     const itemsPerPage = 6; // Items per page
//     const [selectedLop, setSelectedLop] = useState(null); // State to store selected Lop for editing
//     const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

//     // Get MaQuyen from localStorage
//     const userRole = localStorage.getItem('MaQuyen');

//     // Define the refreshData function
//     const refreshData = () => {
//         // Logic to refresh data, such as fetching updated student list
//         console.log("Data refreshed");
//     };

//     // Fetch data when component mounts
//     useEffect(() => {
//         const fetchLop = async () => {
//             try {
//                 const data = await ClassService.getAll();
//                 setLopList(data);
//             } catch (err) {
//                 setError('Failed to fetch Lop records');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchLop();
//     }, []);

//     // Handle Lop deletion
//     const deleteLop = async (Ma_Lop) => {
//         if (userRole === 'MQNV') return; // Prevent delete for MQNV role

//         const result = await Swal.fire({
//             title: 'Xác nhận xóa',
//             text: 'Bạn có chắc chắn muốn xóa lớp này?',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Xóa',
//             cancelButtonText: 'Hủy'
//         });

//         if (result.isConfirmed) {
//             try {
//                 await ClassService.delete(Ma_Lop); // Perform deletion via API
//                 setLopList(lopList.filter(lop => lop.Ma_Lop !== Ma_Lop)); // Remove the deleted Lop from the list
//                 toast.success('Xóa lớp thành công!'); // Success message
//             } catch (err) {
//                 console.error("Failed to delete Lop:", err);
//                 toast.error('Xóa lớp thất bại. Vui lòng thử lại.'); // Error message
//             }
//         }
//     };

//     // Function to open modal and set selected Lop for editing
//     const handleEditLop = (lop) => {
//         if (userRole === 'MQNV') return; // Prevent edit for MQNV role
//         setSelectedLop(lop);
//         setModalOpen(true);
//     };

//     const closeModal = () => {
//         setModalOpen(false); // Close modal when done
//         setSelectedLop(null); // Clear selected Lop
//     };

//     // Handle page change
//     const goToPage = (page) => setCurrentPage(page);
//     const prevPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
//     const nextPage = () => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);

//     // Handle row highlight
//     const onUpdateActiveIndex = (index) => setActiveIndex(index);

//     // Handle search input change
//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//         setCurrentPage(1); // Reset to the first page when searching
//     };

//     // Search functionality triggered by button
//     const onSubmitSearch = (e) => {
//         e.preventDefault();
//         setCurrentPage(1); // Reset pagination when searching
//     };

//     // Filtered Lop based on search term
//     const filteredLop = lopList.filter((lop) => {
//         const searchValue = searchTerm.toLowerCase();

//         return (
//             (lop.Ma_Lop?.toLowerCase().includes(searchValue) || '') ||  // Search by Lop ID
//             (lop.TenLop?.toLowerCase().includes(searchValue) || '') ||  // Search by Lop name
//             (lop.Ma_Nganh?.toLowerCase().includes(searchValue) || '')
//         );
//     });

//     const totalPages = Math.ceil(filteredLop.length / itemsPerPage);
//     const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
//     const displayedLop = filteredLop.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//     return (
//         <div className='container'>
//             {/* Show loading message */}
//             {loading && <div>Loading...</div>}

//             {/* Show error message if there's an error */}
//             {error && <div>{error}</div>}

//             {/* If no loading or error, show the table */}
//             {!loading && !error && (
//                 <>
//                     <div className="mb-3 d-flex">
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Tìm kiếm lớp..."
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                             style={{ marginRight: '10px', fontSize: '18px' }}
//                         />
//                         <button className="btn btn-secondary ml-2" onClick={onSubmitSearch}>
//                             <i className="bi bi-search"></i>
//                         </button>
//                     </div>
//                     <h4 className="text-uppercase text-center">THÔNG TIN LỚP</h4>
//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>STT</th>
//                                 <th>Mã lớp</th>
//                                 <th>Tên lớp</th>
//                                 <th>Mã Ngành</th>
//                                 <th>Xóa lớp</th>
//                                 <th>Hiệu chỉnh</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {displayedLop.length > 0 ? (
//                                 displayedLop.map((lop, index) => (
//                                     <tr
//                                         key={lop.Ma_Lop}
//                                         className={index === activeIndex ? 'active' : ''}
//                                         onClick={() => onUpdateActiveIndex(index)}
//                                     >
//                                         <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                                         <td>{lop.Ma_Lop}</td>
//                                         <td>{lop.TenLop}</td>
//                                         <td>{lop.Ma_Nganh}</td>
//                                         <td className="text-center">
//                                             <button
//                                                 type="button"
//                                                 className={`btn btn-danger ${userRole === 'MQNV' ? 'disabled' : ''}`}
//                                                 onClick={(e) => { e.stopPropagation(); deleteLop(lop.Ma_Lop); }}
//                                                 disabled={userRole === 'MQNV'} // Disable the button for MQNV
//                                             >
//                                                 <i className="bi bi-trash"></i>
//                                             </button>
//                                         </td>
//                                         <td className="text-center">
//                                             <button
//                                                 type="button"
//                                                 className={`btn btn-info ${userRole === 'MQNV' ? 'disabled' : ''}`}
//                                                 onClick={() => handleEditLop(lop)}
//                                                 disabled={userRole === 'MQNV'} // Disable the button for MQNV
//                                             >
//                                                 <i className="bi bi-pencil-square"></i>
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="6" className="text-center">
//                                         {searchTerm ? 'Không tìm thấy lớp phù hợp' : 'Không có lớp nào'}
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>

//                     {/* Render the LopEdit modal */}
//                     {isModalOpen && (
//                         <ClassEdit
//                             show={isModalOpen}
//                             handleClose={closeModal}
//                             lop={selectedLop}
//                             refreshData={refreshData} 
//                         />
//                     )}

//                     {/* Pagination Controls */}
//                     <nav aria-label="Page navigation" className="d-flex justify-content-end">
//                         <ul className="pagination pagination-sm">
//                             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                                 <a className="page-link" onClick={(e) => { e.preventDefault(); prevPage(); }}>
//                                     Previous
//                                 </a>
//                             </li>
//                             {pages.map((page) => (
//                                 <li
//                                     key={page}
//                                     className={`page-item ${page === currentPage ? 'active' : ''}`}
//                                 >
//                                     <a className="page-link" onClick={(e) => { e.preventDefault(); goToPage(page); }}>
//                                         {page}
//                                     </a>
//                                 </li>
//                             ))}
//                             <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                                 <a className="page-link" onClick={(e) => { e.preventDefault(); nextPage(); }}>
//                                     Next
//                                 </a>
//                             </li>
//                         </ul>
//                     </nav>
//                 </>
//             )}
//         </div>
//     );
// };

// export default ClassList;
