import React, { useState, useEffect } from 'react';
import LoaiXeService from '../services/loaixe.service'; // Adjust the path as necessary
import '../assets/styles/main.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import LoaiXeEdit from '../components/LoaiXeEdit'; // Import the modal component for editing vehicle type records

const LoaiXeList = () => {
    // State management
    const [loaiXeList, setLoaiXeList] = useState([]); // Full list of vehicle types
    const [currentPage, setCurrentPage] = useState(1); // Pagination
    const [activeIndex, setActiveIndex] = useState(null); // Highlight row
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const itemsPerPage = 5; // Items per page
    const [selectedLoaiXe, setSelectedLoaiXe] = useState(null); // State to store selected vehicle type for editing
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

    // Fetch data when component mounts
    const fetchLoaiXe = async () => {
        try {
            const data = await LoaiXeService.getAll();
            setLoaiXeList(data);
        } catch (err) {
            setError('Failed to fetch vehicle type records');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoaiXe();
    }, []);

    // Handle vehicle type deletion
    const deleteLoaiXe = async (LoaiXe) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa loại xe này. Nếu xóa thông tin loại xe thì các dữ liệu liên quan cũng sẽ bị xóa ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            try {
                await LoaiXeService.delete(LoaiXe); // Perform deletion via API
                setLoaiXeList(loaiXeList.filter(loaiXe => loaiXe.LoaiXe !== LoaiXe)); // Remove deleted vehicle type from the list
                toast.success('Xóa loại xe thành công!'); // Success notification
            } catch (err) {
                console.error("Failed to delete vehicle type:", err);
                toast.error('Xóa loại xe thất bại. Vui lòng thử lại.'); // Error notification
            }
        }
    };

    // Function to open modal and set selected vehicle type for editing
    const handleEditLoaiXe = (loaiXe) => {
        setSelectedLoaiXe(loaiXe);  // Set the selected LoaiXe when clicking the edit button
        setModalOpen(true);  // Open the modal
    };
    
    const closeModal = () => {
        setModalOpen(false); // Close modal when done
        setSelectedLoaiXe(null); // Clear selected vehicle type
    };

    // Handle row highlight
    const onUpdateActiveIndex = (index) => setActiveIndex(index);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    // Filtered vehicle types based on search term
    const filteredLoaiXeList = loaiXeList.filter((loaiXe) => {
        const searchValue = searchTerm.toLowerCase();
        return (
            loaiXe.LoaiXe?.toLowerCase().includes(searchValue) || // Search by vehicle type ID
            loaiXe.Gia?.toLowerCase().includes(searchValue) // Search by vehicle type name
        );
    });

    const totalPages = Math.ceil(filteredLoaiXeList.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedLoaiXeList = filteredLoaiXeList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                            placeholder="Tìm kiếm loại xe..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ marginRight: '10px', fontSize: '18px' }}
                        />
                        <button className="btn btn-secondary ml-2">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <h4 className="text-uppercase text-center">THÔNG TIN PHÍ GIỮ XE</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên loại xe</th>
                                <th>Giá tiền</th>
                                <th>Xóa</th>
                                <th>Hiệu chỉnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedLoaiXeList.length > 0 ? (
                                displayedLoaiXeList.map((loaiXe, index) => (
                                    <tr
                                        key={loaiXe.LoaiXe}
                                        className={index === activeIndex ? 'active' : ''}
                                        onClick={() => onUpdateActiveIndex(index)}
                                    >
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{loaiXe.LoaiXe}</td>
                                        <td>{loaiXe.Gia}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={(e) => { e.stopPropagation(); deleteLoaiXe(loaiXe.LoaiXe); }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() => handleEditLoaiXe(loaiXe)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        {searchTerm ? 'Không tìm thấy loại xe phù hợp' : 'Không có loại xe nào'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Render the LoaiXeEdit modal */}
                    {isModalOpen && (
                        <LoaiXeEdit
                            show={isModalOpen}
                            handleClose={closeModal}
                            loaiXe={selectedLoaiXe}
                            refreshData={fetchLoaiXe}
                        />
                    )}

                    {/* Pagination Controls */}
                    <nav aria-label="Page navigation" className="d-flex justify-content-end">
                        <ul className="pagination pagination-sm">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage - 1); }}>
                                    Previous
                                </a>
                            </li>
                            {pages.map((page) => (
                                <li
                                    key={page}
                                    className={`page-item ${page === currentPage ? 'active' : ''}`}
                                >
                                    <a className="page-link" onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}>
                                        {page}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage + 1); }}>
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

export default LoaiXeList;
