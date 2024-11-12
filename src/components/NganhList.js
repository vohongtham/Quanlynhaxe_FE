import React, { useState, useEffect } from 'react';
import NganhService from '../services/nganh.service'; // Adjust the path as necessary
import '../assets/styles/main.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import NganhEdit from '../components/NganhEdit'; // Import the modal component for editing Nganh

const NganhList = () => {
    // State management
    const [nganhList, setNganhList] = useState([]); // Full list of Nganh records
    const [currentPage, setCurrentPage] = useState(1); // Pagination
    const [activeIndex, setActiveIndex] = useState(null); // Highlight row
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const itemsPerPage = 6; // Items per page
    const [selectedNganh, setSelectedNganh] = useState(null); // State to store selected Nganh for editing
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

    // Define the refreshData function
    const refreshData = () => {
        // Logic to refresh data, such as fetching updated student list
        console.log("Data refreshed");
    };

    // Fetch data when component mounts
    useEffect(() => {
        const fetchNganh = async () => {
            try {
                const data = await NganhService.getAll();
                setNganhList(data);
            } catch (err) {
                setError('Failed to fetch Ngành records');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNganh();
    }, []);

    // Handle Nganh deletion
    const deleteNganh = async (Ma_Nganh) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa ngành này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            try {
                await NganhService.delete(Ma_Nganh); // Perform deletion via API
                setNganhList(nganhList.filter(nganh => nganh.Ma_Nganh !== Ma_Nganh)); // Remove the deleted Nganh from the list
                toast.success('Xóa ngành thành công!'); // Success message
            } catch (err) {
                console.error("Failed to delete Nganh:", err);
                toast.error('Xóa ngành thất bại. Vui lòng thử lại.'); // Error message
            }
        }
    };

    // Function to open modal and set selected Nganh for editing
    const handleEditNganh = (nganh) => {
        setSelectedNganh(nganh);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false); // Close modal when done
        setSelectedNganh(null); // Clear selected Nganh
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

    // Filtered Nganh based on search term
    const filteredNganh = nganhList.filter((nganh) => {
        const searchValue = searchTerm.toLowerCase();

        return (
            (nganh.Ma_Nganh?.toLowerCase().includes(searchValue) || '') ||  // Search by Nganh ID
            (nganh.TenNganh?.toLowerCase().includes(searchValue) || '') ||  // Search by Nganh name
            (nganh.Ma_DV?.toLowerCase().includes(searchValue) || '')
        );
    });

    const totalPages = Math.ceil(filteredNganh.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedNganh = filteredNganh.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                            placeholder="Tìm kiếm ngành..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ marginRight: '10px', fontSize: '18px' }}
                        />
                        <button className="btn btn-secondary ml-2" onClick={onSubmitSearch}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <h4 className="text-uppercase text-center">THÔNG TIN NGÀNH</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã ngành</th>
                                <th>Tên ngành</th>
                                <th>Mã đơn vị(Trường/Khoa)</th>
                                <th>Xóa ngành</th>
                                <th>Hiệu chỉnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedNganh.length > 0 ? (
                                displayedNganh.map((nganh, index) => (
                                    <tr
                                        key={nganh.Ma_Nganh}
                                        className={index === activeIndex ? 'active' : ''}
                                        onClick={() => onUpdateActiveIndex(index)}
                                    >
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{nganh.Ma_Nganh}</td>
                                        <td>{nganh.TenNganh}</td>
                                        <td>{nganh.Ma_DV}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={(e) => { e.stopPropagation(); deleteNganh(nganh.Ma_Nganh); }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() => handleEditNganh(nganh)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        {searchTerm ? 'Không tìm thấy ngành phù hợp' : 'Không có ngành nào'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Render the NganhEdit modal */}
                    {isModalOpen && (
                        <NganhEdit
                            show={isModalOpen}
                            handleClose={closeModal}
                            nganh={selectedNganh}
                            refreshData={refreshData} 
                            // refreshData={() => { setLoading(true); fetchNganh(); }} // Refresh after editing
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

export default NganhList;
