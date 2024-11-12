import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service'; // Adjust the path as necessary
import '../assets/styles/main.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import EmployeeEdit from '../components/EmployeeEdit'; // Import the modal component

const EmployeeTable = () => {
    // State management
    const [users, setUsers] = useState([]); // Full list of users
    const [currentPage, setCurrentPage] = useState(1); // Pagination
    const [activeIndex, setActiveIndex] = useState(null); // Highlight row
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const itemsPerPage = 6; // Items per page
    const [selectedUser, setSelectedUser] = useState(null); // State to store selected user for editing
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility


    // Define the refreshData function
    const refreshData = () => {
        // Logic to refresh data, such as fetching updated student list
        console.log("Data refreshed");
    };

    const fetchUsers = async () => {
        try {
            const data = await UserService.getAll();
            
            // Sort users: MQAD first, then others
            const sortedData = data.sort((a, b) => {
                if (a.Ma_Quyen === 'MQAD') return -1;  // MQAD should come first
                if (b.Ma_Quyen === 'MQAD') return 1;
                return 0;  // Keep the order for other users
            });

            setUsers(sortedData);
        } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when component mounts
    useEffect(() => {
        
        fetchUsers();
    }, []);


    // Handle user deletion
    const deleteUser = async (Ma_user) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa nhân viên này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            try {
                await UserService.delete(Ma_user); // Thực hiện xóa qua API
                setUsers(users.filter(user => user.Ma_user !== Ma_user)); // Loại bỏ người dùng đã xóa khỏi danh sách
                toast.success('Xóa nhân viên thành công!'); // Thông báo thành công
            } catch (err) {
                console.error("Failed to delete user:", err);
                toast.error('Xóa nhân viên thất bại. Vui lòng thử lại.'); // Thông báo lỗi
            }
        }
    };

    // Function to open modal and set selected user for editing
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false); // Close modal when done
        setSelectedUser(null); // Clear selected user
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

    // Filtered users based on search term and user role
    const filteredUsers = users.filter((user) => {
        const searchValue = searchTerm.toLowerCase();

        return (
            // user.Ma_Quyen === 'MQNV' && // Filter only employees (MQNV)
            (
                (user.Ten_user?.toLowerCase().includes(searchValue) || '') ||  // Search by name
                (user.Ma_user?.toLowerCase().includes(searchValue) || '') ||   // Search by employee ID
                (user.Email?.toLowerCase().includes(searchValue) || '') ||     // Search by email
                (user.GioiTinh?.toLowerCase().includes(searchValue) || '') ||  // Search by gender
                (user.NgaySinh?.toLowerCase().includes(searchValue) || '') ||  // Search by birthdate
                (user.Ma_BaiXe?.toLowerCase().includes(searchValue) || '')     // Search by parking lot ID
            )
        );
    });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                            placeholder="Tìm kiếm nhân viên..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ marginRight: '10px', fontSize: '18px' }}
                        />
                        <button className="btn btn-secondary ml-2" onClick={onSubmitSearch}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <h4 className="text-uppercase text-center">THÔNG TIN NHÂN VIÊN</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã nhân viên</th>
                                <th>Tên nhân viên</th>
                                <th>Email</th>
                                <th>Giới tính</th>
                                <th>Ngày Sinh</th>
                                <th>Số điện thoại</th>
                                <th>Mã quyền</th>
                                <th>Xóa nhân viên</th>
                                <th>Hiệu chỉnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedUsers.length > 0 ? (
                                displayedUsers.map((user, index) => (
                                    <tr
                                        key={user.Ma_user}
                                        className={index === activeIndex ? 'active' : ''}
                                        onClick={() => onUpdateActiveIndex(index)}
                                    >
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{user.Ma_user}</td>
                                        <td>{user.Ten_user}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.GioiTinh}</td>
                                        <td>{user.NgaySinh}</td>
                                        <td>{user.SDT}</td>
                                        <td>{user.Ma_Quyen}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={(e) => { e.stopPropagation(); deleteUser(user.Ma_user); }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() => handleEditUser(user)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        {searchTerm ? 'Không tìm thấy nhân viên phù hợp' : 'Không có nhân viên nào'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Render the EmployeeEdit modal */}
                    {isModalOpen && (
                        <EmployeeEdit
                            show={isModalOpen}
                            handleClose={closeModal}
                            user={selectedUser}
                            refreshData={fetchUsers} // Ensure refreshData is passed
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

export default EmployeeTable;
