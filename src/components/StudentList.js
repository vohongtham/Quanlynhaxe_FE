import React, { useState, useEffect } from 'react';
import StudentService from '../services/student.service'; // Adjust the path as necessary
import '../assets/styles/main.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import StudentEdit from '../components/StudentEdit';


const StudentTable = () => {
    // State management
    const [students, setStudents] = useState([]); // Full list of students
    const [currentPage, setCurrentPage] = useState(1); // Pagination
    const [activeIndex, setActiveIndex] = useState(null); // Highlight row
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const itemsPerPage = 5; // Items per page
    const [selectedStudent , setSelectedStudent ] = useState(null); // State to store selected user for editing
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

    // Define the refreshData function
    const refreshData = () => {
        // Logic to refresh data, such as fetching updated student list
        console.log("Data refreshed");
    };

    // Fetch data when component mounts
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await StudentService.getAll(); // Fetch data from API
                setStudents(data); // Set students state with data from API
            } catch (err) {
                setError('Không thể lấy dữ liệu sinh viên.'); // Set error message
                console.error("Failed to fetch students:", err); // Log error
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchStudents();
    }, []);

    // Handle student deletion
    const deleteStudent = async (Mssv) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa sinh viên này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            try {
                await StudentService.delete(Mssv); // Perform delete via API
                setStudents(students.filter(student => student.Mssv !== Mssv)); // Remove deleted student from list
                toast.success('Sinh viên đã được xóa thành công!'); // Success message
            } catch (err) {
                console.error("Failed to delete student:", err);
                toast.error('Xóa sinh viên thất bại. Vui lòng thử lại.'); // Error message
            }
        }
    };

    // Function to open modal and set selected user for editing
    const handleEditStudent = (student) => {
        setSelectedStudent (student);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false); // Close modal when done
        setSelectedStudent (null); // Clear selected user
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

    // Filter students based on search term
    const filteredStudents = students.filter((student) => {
        const searchValue = searchTerm.toLowerCase();
        return (
            student.Mssv.toLowerCase().includes(searchValue) ||   // Search by student ID
            student.Ten_SV.toLowerCase().includes(searchValue) ||  // Search by student name
            student.Email.toLowerCase().includes(searchValue) ||   // Search by email
            student.Ma_Lop.toLowerCase().includes(searchValue) ||   // Search by class ID
            student.GioiTinh.toLowerCase().includes(searchValue)    // Search by gender
        );
    });

    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className='container'>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loading && !error && (
                <>
                    <div className="mb-3 d-flex">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm sinh viên..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{marginRight: '10px', fontSize: '18px'}}
                        />
                        <button className="btn btn-secondary ml-2" onClick={onSubmitSearch}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <h4 className="text-uppercase text-center"> DANH SÁCH SINH VIÊN</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã sinh viên</th>
                                <th>Tên sinh viên</th>
                                <th>Email</th>
                                <th>Mã lớp</th>
                                <th>Giới tính</th>
                                <th>Ngày Sinh</th>
                                <th>SĐT</th>
                                <th>Xóa sinh viên</th>       
                                <th> Hiệu chỉnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedStudents.length > 0 ? (
                                displayedStudents.map((student, index) => (
                                    <tr
                                        key={student.Mssv}
                                        className={index === activeIndex ? 'active' : ''}
                                        onClick={() => onUpdateActiveIndex(index)}
                                    >
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{student.Mssv}</td>
                                        <td>{student.Ten_SV}</td>
                                        <td>{student.Email}</td>
                                        <td>{student.Ma_Lop}</td>
                                        <td>{student.GioiTinh}</td>
                                        <td>{student.NgaySinh}</td>
                                        <td>{student.SDT}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={(e) => { e.stopPropagation(); deleteStudent(student.Mssv); }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() => handleEditStudent (student )}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        {searchTerm ? 'Không tìm thấy sinh viên phù hợp' : 'Không có sinh viên nào'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Render the EmployeeEdit modal */}
                    {isModalOpen && (
                        <StudentEdit
                            show={isModalOpen}
                            handleClose={closeModal}
                            student={selectedStudent}
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


export default StudentTable;
