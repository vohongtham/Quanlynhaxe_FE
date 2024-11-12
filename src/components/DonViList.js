import React, { useState, useEffect } from 'react';
import DonViService from '../services/donvi.service'; // Adjust the path as necessary
import '../assets/styles/main.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import DonViEdit from '../components/DonViEdit'; // Import the modal component for editing DonVi

const DonViList = () => {
    // State management
    const [donViList, setDonViList] = useState([]); // Full list of DonVi records
    const [currentPage, setCurrentPage] = useState(1); // Pagination
    const [activeIndex, setActiveIndex] = useState(null); // Highlight row
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const itemsPerPage = 6; // Items per page
    const [selectedDonVi, setSelectedDonVi] = useState(null); // State to store selected DonVi for editing
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

    // Define the refreshData function
    const refreshData = () => {
        // Logic to refresh data, such as fetching updated student list
        console.log("Data refreshed");
    };

    // Fetch data when component mounts
    useEffect(() => {
        const fetchDonVi = async () => {
            try {
                const data = await DonViService.getAll();
                setDonViList(data);
            } catch (err) {
                setError('Failed to fetch Don Vi records');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDonVi();
    }, []);

    // Handle Don Vi deletion
    const deleteDonVi = async (Ma_DV) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa đơn vị này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            try {
                await DonViService.delete(Ma_DV); // Perform deletion via API
                setDonViList(donViList.filter(donVi => donVi.Ma_DV !== Ma_DV)); // Remove the deleted DonVi from the list
                toast.success('Xóa đơn vị thành công!'); // Success message
            } catch (err) {
                console.error("Failed to delete DonVi:", err);
                toast.error('Xóa đơn vị thất bại. Vui lòng thử lại.'); // Error message
            }
        }
    };

    // Function to open modal and set selected DonVi for editing
    const handleEditDonVi = (donVi) => {
        setSelectedDonVi(donVi);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false); // Close modal when done
        setSelectedDonVi(null); // Clear selected DonVi
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

    // Filtered DonVi based on search term
    const filteredDonVi = donViList.filter((donVi) => {
        const searchValue = searchTerm.toLowerCase();

        return (
            (donVi.Ma_DV?.toLowerCase().includes(searchValue) || '') ||  // Search by DonVi ID
            (donVi.Ten_DV?.toLowerCase().includes(searchValue) || '')   // Search by DonVi name
        );
    });

    const totalPages = Math.ceil(filteredDonVi.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedDonVi = filteredDonVi.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                            placeholder="Tìm kiếm đơn vị..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ marginRight: '10px', fontSize: '18px' }}
                        />
                        <button className="btn btn-secondary ml-2" onClick={onSubmitSearch}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <h4 className="text-uppercase text-center">THÔNG TIN ĐƠN VỊ</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã đơn vị</th>
                                <th>Tên đơn vị</th>
                                <th>Xóa đơn vị</th>
                                <th>Hiệu chỉnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedDonVi.length > 0 ? (
                                displayedDonVi.map((donVi, index) => (
                                    <tr
                                        key={donVi.Ma_DV}
                                        className={index === activeIndex ? 'active' : ''}
                                        onClick={() => onUpdateActiveIndex(index)}
                                    >
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{donVi.Ma_DV}</td>
                                        <td>{donVi.TenDV}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={(e) => { e.stopPropagation(); deleteDonVi(donVi.Ma_DV); }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() => handleEditDonVi(donVi)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        {searchTerm ? 'Không tìm thấy đơn vị phù hợp' : 'Không có đơn vị nào'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Render the DonViEdit modal */}
                    {isModalOpen && (
                        <DonViEdit
                            show={isModalOpen}
                            handleClose={closeModal}
                            donVi={selectedDonVi}
                            refreshData={refreshData} 
                            // refreshData={() => { setLoading(true); fetchDonVi(); }} // Refresh after editing
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

export default DonViList;
