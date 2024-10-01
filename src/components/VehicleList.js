import React, { useState, useEffect } from 'react';
import VehicleService from '../services/vehicle.service';
import '../assets/styles/main.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import VehicleEdit from '../components/VehicleEdit';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const itemsPerPage = 5;

    const fetchVehicles = async () => {
        try {
            const data = await VehicleService.getAll();
            setVehicles(data);
        } catch (err) {
            setError('Failed to fetch vehicles');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const deleteVehicle = async (BienSoXe) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa phương tiện này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });

        if (result.isConfirmed) {
            try {
                await VehicleService.delete(BienSoXe);
                setVehicles(vehicles.filter(vehicle => vehicle.BienSoXe !== BienSoXe));
                toast.success('Thông tin xe đã được xóa!');
            } catch (err) {
                toast.error('Xóa thông tin xe thất bại. Vui lòng thử lại.');
            }
        }
    };

    const handleEditVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedVehicle(null);
    };

    const goToPage = (page) => setCurrentPage(page);
    const prevPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    const nextPage = () => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);

    const onUpdateActiveIndex = (index) => setActiveIndex(index);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const onSubmitSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    // Filter vehicles based on search term
    const filteredVehicles = vehicles.filter((vehicle) => {
        const searchValue = searchTerm.toLowerCase();

        return (
            (vehicle.BienSoXe && vehicle.BienSoXe.toLowerCase().includes(searchValue)) ||
            (vehicle.LoaiXe && vehicle.LoaiXe.toLowerCase().includes(searchValue)) ||
            (vehicle.Mssv && vehicle.Mssv.toLowerCase().includes(searchValue)) ||
            (vehicle.SoKhungXe && vehicle.SoKhungXe.toLowerCase().includes(searchValue)) ||
            (vehicle.TenChuXe && vehicle.TenChuXe.toLowerCase().includes(searchValue)) ||
            (vehicle.DungTich && vehicle.DungTich.toLowerCase().includes(searchValue)) ||
            (vehicle.NhanHieu && vehicle.NhanHieu.toLowerCase().includes(searchValue)) ||
            (vehicle.MauXe && vehicle.MauXe.toLowerCase().includes(searchValue))
        );
    });

    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedVehicles = filteredVehicles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loading && !error && (
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
                        <button type="submit" className="btn btn-secondary ml-2" onSubmit={onSubmitSearch}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>

                    <h4 className="text-uppercase text-center">Danh Sách Phương Tiện</h4>

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
                                    <td colSpan="11" className="text-center">
                                        {searchTerm ? 'Không tìm thấy phương tiện phù hợp' : 'Không có phương tiện nào'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {isModalOpen && (
                        <VehicleEdit
                            show={isModalOpen}
                            handleClose={closeModal}
                            vehicle={selectedVehicle}
                            refreshData={fetchVehicles}
                        />
                    )}

                    <nav aria-label="Page navigation" className="d-flex justify-content-end">
                        <ul className="pagination pagination-sm">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={prevPage}>
                                    Previous
                                </a>
                            </li>
                            {pages.map((page) => (
                                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => goToPage(page)}>
                                        {page}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={nextPage}>
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

export default VehicleList;
