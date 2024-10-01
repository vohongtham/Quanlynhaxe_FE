import React, { useState, useEffect } from 'react';
import VehicleService from '../services/vehicle.service'; // Adjust the path as necessary
import '../assets/styles/main.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import StudentService from '../services/student.service';
import VehicleEdit from '../components/VehicleEdit'; // Assuming you have a component for editing vehicles

const VehicleInfoList = () => {
    // State management
    const [vehicleinfos, setVehicleInfos] = useState([]); // Full list of vehicles
    const [currentPage, setCurrentPage] = useState(1); // Pagination
    const [activeIndex, setActiveIndex] = useState(null); // Highlight row
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [loading, setLoading] = useState(true); // Loading state
    const [errorMessage, setErrorMessage] = useState(null); // Error state
    const itemsPerPage = 5; // Items per page
    const [selectedVehicle, setSelectedVehicle] = useState(null); // State to store selected vehicle for editing
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

    // Handle refreshing data after editing
    const refreshData = () => {
        fetchVehicleData();
    };

    useEffect(() => {
        fetchVehicleData();
    }, []);

    const fetchVehicleData = async () => {
        setLoading(true);
        setErrorMessage(null);

        const userEmail = localStorage.getItem('userEmail');

        if (!userEmail) {
            setErrorMessage('No email found in localStorage for the logged-in user.');
            setLoading(false);
            setVehicleInfos([]); // Clear vehicle info if email is missing
            return;
        }

        try {
            const studentResult = await StudentService.search({ Email: userEmail });

            if (studentResult && studentResult.length > 0) {
                const mssv = studentResult[0].Mssv;
                const vehicleResult = await VehicleService.search({ Mssv: mssv });

                if (vehicleResult && vehicleResult.length > 0) {
                    setVehicleInfos(vehicleResult); // Ensure vehicle info is an array
                } else {
                    setErrorMessage('No vehicle found for the provided Mssv.');
                    setVehicleInfos([]); // Reset vehicle info if no data is returned
                }
            } else {
                setErrorMessage('No student found with the provided email.');
                setVehicleInfos([]);
            }
        } catch (error) {
            setErrorMessage('Chưa có thông tin xe.');
            setVehicleInfos([]); // Reset vehicle info in case of an error
        } finally {
            setLoading(false);
        }
    };

    // Handle vehicle deletion
    const deleteVehicle = async (BienSoXe) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa phương tiện này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            try {
                await VehicleService.delete(BienSoXe); // Perform delete via API
                setVehicleInfos(vehicleinfos.filter(vehicle => vehicle.BienSoXe !== BienSoXe)); // Remove deleted vehicle from list
                toast.success('Phương tiện đã được xóa thành công!'); // Success message
            } catch (err) {
                console.error("Failed to delete vehicle:", err);
                toast.error('Xóa phương tiện thất bại. Vui lòng thử lại.'); // Error message
            }
        }
    };


    // Function to open modal and set selected vehicle for editing
    const handleEditVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false); // Close modal when done
        setSelectedVehicle(null); // Clear selected vehicle
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

    // Filter vehicles based on search term
    const filteredVehicles = vehicleinfos.filter((vehicle) => {
        const searchValue = searchTerm.toLowerCase();
        return (
            (vehicle.BienSoXe && vehicle.BienSoXe.toLowerCase().includes(searchValue)) ||
            (vehicle.LoaiXe && vehicle.LoaiXe.toLowerCase().includes(searchValue)) ||
            (vehicle.Mssv && vehicle.Mssv.toLowerCase().includes(searchValue)) ||
            (vehicle.SoKhungXe && vehicle.SoKhungXe.toLowerCase().includes(searchValue)) ||
            (vehicle.TenChuXe && vehicle.TenChuXe.toLowerCase().includes(searchValue)) ||
            (vehicle.DungTich && vehicle.DungTich.toLowerCase().includes(searchValue)) ||
            (vehicle.NhanHieu && vehicle.NhanHieu.toLowerCase().includes(searchValue)) ||
            (vehicle.MauXe && vehicle.MauXe.toLowerCase().includes(searchValue))      // Search by vehicle type
        );
    });

    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedVehicles = filteredVehicles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className='container'>
            {loading && <div>Loading...</div>}
            {errorMessage && <div>{errorMessage}</div>}
            {!loading && !errorMessage && (
                <>
                    <div className="mb-3 d-flex">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm thông tin xe..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ marginRight: '10px', fontSize: '18px' }}
                        />
                        <button className="btn btn-secondary ml-2" onClick={onSubmitSearch}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <h4 className="text-uppercase text-center">Thông Tin Xe Của Sinh Viên</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Biển số xe</th>
                                <th>Mã số sinh viên</th>
                                <th>Số khung xe</th>
                                <th>Tên chủ xe</th>
                                <th>Loại xe</th>
                                <th>Dung tích xe</th>
                                <th>Nhãn hiệu xe</th>
                                <th>Màu xe</th>
                                <th>Xóa</th>
                                <th>Hiệu chỉnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedVehicles.length > 0 ? (
                                displayedVehicles.map((vehicle, index) => (
                                    <tr
                                        key={vehicle.BienSoXe}
                                        className={index === activeIndex ? 'active' : ''}
                                        onClick={() => onUpdateActiveIndex(index)}
                                    >
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{vehicle.BienSoXe}</td>
                                        <td>{vehicle.Mssv}</td>
                                        <td>{vehicle.SoKhungXe}</td>
                                        <td>{vehicle.TenChuXe}</td>
                                        <td>{vehicle.LoaiXe}</td>
                                        <td>{vehicle.DungTich}</td>
                                        <td>{vehicle.NhanHieu}</td>
                                        <td>{vehicle.MauXe}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={(e) => { e.stopPropagation(); deleteVehicle(vehicle.BienSoXe); }}
                                            // onClick={() => deleteVehicle(vehicle.BienSoXe)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() => handleEditVehicle(vehicle)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">
                                        {searchTerm ? 'Không tìm thấy phương tiện phù hợp' : 'Không có phương tiện nào'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Render the VehicleEdit modal */}
                    {isModalOpen && (
                        <VehicleEdit
                            show={isModalOpen}
                            handleClose={closeModal}
                            vehicle={selectedVehicle}
                            refreshData={refreshData} // Pass refresh function to modal
                        />
                    )}

                    {/* Pagination Controls */}
                    {/* <nav aria-label="Page navigation" className="d-flex justify-content-end">
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
                    </nav> */}
                    <nav aria-label="Page navigation" className="d-flex justify-content-end">
                        <ul className="pagination pagination-sm">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>
                            {pages.map((page) => (
                                <li
                                    key={page}
                                    className={`page-item ${page === currentPage ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => goToPage(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>

                </>
            )}
        </div>
    );
};

export default VehicleInfoList;
