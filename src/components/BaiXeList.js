import React, { useState, useEffect } from 'react';
import BaiXeService from '../services/baixe.service'; // Adjust the path as necessary
import '../assets/styles/main.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import BaiXeEdit from '../components/BaiXeEdit'; // Import the modal component for editing parking lot records

const BaiXeList = () => {
    // State management
    const [baixeList, setBaixeList] = useState([]); // Full list of parking lots
    const [currentPage, setCurrentPage] = useState(1); // Pagination
    const [activeIndex, setActiveIndex] = useState(null); // Highlight row
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const itemsPerPage = 5; // Items per page
    const [selectedBaiXe, setSelectedBaiXe] = useState(null); // State to store selected parking lot for editing
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

    // Define the refreshData function
    const refreshData = () => {
        // Logic to refresh data, such as fetching updated student list
        console.log("Data refreshed");
    };

    // Fetch data when component mounts
    useEffect(() => {
        const fetchBaiXe = async () => {
            try {
                const data = await BaiXeService.getAll();
                console.log("Fetched parking lots:", data); // Log fetched data
                setBaixeList(data);
            } catch (err) {
                setError('Failed to fetch parking lot records');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBaiXe();
    }, []);

    // Handle parking lot deletion
    const deleteBaiXe = async (Ma_BaiXe) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa bãi xe này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            try {
                await BaiXeService.delete(Ma_BaiXe); // Perform deletion via API
                setBaixeList(baixeList.filter(baiXe => baiXe.Ma_BaiXe !== Ma_BaiXe)); // Remove deleted parking lot from the list
                toast.success('Xóa bãi xe thành công!'); // Success notification
            } catch (err) {
                console.error("Failed to delete parking lot:", err);
                toast.error('Xóa bãi xe thất bại. Vui lòng thử lại.'); // Error notification
            }
        }
    };

    // Function to open modal and set selected parking lot for editing
    const handleEditBaiXe = (baiXe) => {
        setSelectedBaiXe(baiXe);  // Set the selected BaiXe when clicking the edit button
        setModalOpen(true);  // Open the modal
    };
    
    const closeModal = () => {
        setModalOpen(false); // Close modal when done
        setSelectedBaiXe(null); // Clear selected parking lot
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

    // Filtered parking lots based on search term
    const filteredBaiXeList = baixeList.filter((baiXe) => {
        const searchValue = searchTerm.toLowerCase();
        return (
            baiXe.Ma_BaiXe?.toLowerCase().includes(searchValue) || // Search by parking lot ID
            baiXe.Ten_BaiXe?.toLowerCase().includes(searchValue) || // Search by parking lot name
            baiXe.Ma_DV?.toLowerCase().includes(searchValue) // Search by location
        );
    });

    const totalPages = Math.ceil(filteredBaiXeList.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedBaiXeList = filteredBaiXeList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                            placeholder="Tìm kiếm nhà xe..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ marginRight: '10px', fontSize: '18px' }}
                        />
                        <button className="btn btn-secondary ml-2" onClick={onSubmitSearch}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <h4 className="text-uppercase text-center">THÔNG TIN NHÀ XE</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã nhà xe</th>
                                <th>Mã Đơn vị (Trường/Khoa)</th>
                                <th>Tên nhà xe</th>
                                <th>Số lượng vị trí</th>
                                <th>Vị trí đã dùng</th>
                                <th>Vị trí còn trống</th>
                                <th>Xóa</th>
                                <th>Hiệu chỉnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedBaiXeList.length > 0 ? (
                                displayedBaiXeList.map((baiXe, index) => (
                                    <tr
                                        key={baiXe.Ma_BaiXe}
                                        className={index === activeIndex ? 'active' : ''}
                                        onClick={() => onUpdateActiveIndex(index)}
                                    >
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{baiXe.Ma_BaiXe}</td>
                                        <td>{baiXe.Ma_DV }</td>
                                        <td>{baiXe.Ten_BaiXe}</td>
                                        <td>{baiXe.So_ViTriTong}</td>
                                        <td>{baiXe.So_ViTriDaDung}</td>
                                        <td>{baiXe.vi_tri_trong}</td>
                                        {/* <td>{baiXe.so_vi_tri_trong_va_tong}</td> Display the new property */}
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={(e) => { e.stopPropagation(); deleteBaiXe(baiXe.Ma_BaiXe); }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() => handleEditBaiXe(baiXe)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        {searchTerm ? 'Không tìm thấy bãi xe phù hợp' : 'Không có bãi xe nào'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Render the BaiXeEdit modal */}
                    {isModalOpen && (
                        <BaiXeEdit
                            show={isModalOpen}
                            handleClose={closeModal}
                            baiXe={selectedBaiXe}
                            refreshData={refreshData} // Ensure refreshData is passed
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

export default BaiXeList;
