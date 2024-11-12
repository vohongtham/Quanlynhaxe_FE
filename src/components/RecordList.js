import React, { useState, useEffect } from 'react';
import ChiTietRaVaoService from '../services/chitietravao.service'; // Adjust path as necessary
import '../assets/styles/main.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ChiTietRaVaoList = () => {
    const [records, setRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchRecords = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const data = await ChiTietRaVaoService.getAll();
    
                if (Array.isArray(data) && data.length > 0) {
                    const sortedData = data.sort((a, b) => new Date(b.TG_Vao) - new Date(a.TG_Vao));
                    setRecords(sortedData);
                } else {
                    setRecords([]);
                    setError('No records found');
                }
            } catch (err) {
                setError('Failed to fetch records');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchRecords();
    }, []);
    
    const deleteRecord = async (Ma_CT) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa lịch sử ra vào này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            try {
                await ChiTietRaVaoService.delete(Ma_CT);
                setRecords(records.filter(record => record.Ma_CT !== Ma_CT));
                toast.success('Xóa thành công!');
            } catch (err) {
                console.error("Failed to delete record:", err);
                toast.error('Xóa thất bại. Vui lòng thử lại.');
            }
        }
    };

    const goToPage = (page) => setCurrentPage(page);
    const prevPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    const nextPage = () => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);
    const onUpdateActiveIndex = (index) => setActiveIndex(index);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const onSubmitSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            // Gọi API tìm kiếm dựa trên từ khóa
            const searchResult = await ChiTietRaVaoService.search({ searchTerm });
    
            if (searchResult && searchResult.length > 0) {
                // Sắp xếp các bản ghi theo TG_Vao giảm dần
                const sortedRecords = searchResult.sort((a, b) => new Date(b.TG_Vao) - new Date(a.TG_Vao));
                setRecords(sortedRecords);
            } else {
                setError('Không tìm thấy lịch sử gửi xe.');
                setRecords([]);
            }
        } catch (error) {
            setError('Lỗi khi tìm kiếm lịch sử gửi xe.');
        } finally {
            setLoading(false);
            setCurrentPage(1); // Đặt lại trang hiện tại là 1
        }
    };
    

    // const filteredRecords = records.filter((record) => {
    //     const searchValue = searchTerm.toLowerCase();
    //     return (
    //         record.BienSoXe?.toLowerCase().includes(searchValue) ||
    //         record.Mssv?.toLowerCase().includes(searchValue) ||
    //         record.Ma_BaiXe?.toLowerCase().includes(searchValue) ||
    //         record.TG_Vao?.toLowerCase().includes(searchValue) ||
    //         record.TG_Ra?.toLowerCase().includes(searchValue) ||
    //         record.Ma_CT?.toLowerCase().includes(searchValue) ||
    //         record.LoaiXe?.toLowerCase().includes(searchValue)
    //     );
    // });

    // Hàm định dạng ngày giờ theo "YYYY-MM-DD HH:mm:ss"
    const formatDateTime = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const seconds = String(d.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // Lọc các bản ghi dựa trên từ khóa tìm kiếm
    const filteredRecords = records.filter((record) => {
        const searchValue = searchTerm.toLowerCase();

        // Chuẩn hóa TG_Ra và TG_Vao
        const tgRaString = formatDateTime(record.TG_Ra).toLowerCase();
        const tgVaoString = formatDateTime(record.TG_Vao).toLowerCase();

        return (
            String(record.Ma_CT || "").toLowerCase().includes(searchValue) ||
            String(record.BienSoXe || "").toLowerCase().includes(searchValue) || // Tìm theo biển số xe
            String(record.Mssv || "").toLowerCase().includes(searchValue) ||     // Tìm theo Mssv
            tgRaString.includes(searchValue) ||                                  // Tìm theo TG_Ra (ngày và giờ)
            tgVaoString.includes(searchValue) ||                                 // Tìm theo TG_Vao (ngày và giờ)
            String(record.Ma_BaiXe || "").toLowerCase().includes(searchValue)    // Tìm theo mã bãi xe
        );
    });

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                            placeholder="Tìm kiếm lịch sử..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ marginRight: '10px', fontSize: '18px' }}
                        />
                        {/* <button className="btn btn-secondary ml-2" onClick={onSubmitSearch}>
                            <i className="bi bi-search"></i>
                        </button> */}
                        <button className="btn btn-secondary ml-2" onClick={onSubmitSearch}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <h4 className="text-uppercase text-center">LỊCH SỬ RA VÀO BÃI XE</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã thẻ xe</th>
                                <th>Biển số xe</th>
                                <th>Ảnh biển số</th>
                                <th>Mã số sinh viên</th>
                                <th>Mã bãi xe</th>
                                <th>Loại xe</th>
                                <th>Thời gian vào</th>
                                <th>Thời gian ra</th>
                                <th>Giá tiền</th>
                                <th>Xóa bản lịch sử</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedRecords.length > 0 ? (
                                displayedRecords.map((record, index) => (
                                    <tr
                                        key={record.Ma_CT}
                                        className={index === activeIndex ? 'active' : ''}
                                        onClick={() => onUpdateActiveIndex(index)}
                                    >
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{record.Ma_CT}</td>
                                        <td>{record.BienSoXe}</td>
                                        {/* <td>
                                            {record.imagePath ? (
                                                <img
                                                    src={record.imagePath}
                                                    alt="Ảnh biển số"
                                                    style={{ width: '60px', height: 'auto' }}
                                                />
                                            ) : (
                                                'No image'
                                            )}
                                        </td> */}
                                        <td>
                                            {record.AnhBienSo && (
                                                <img
                                                    src={`data:image/jpeg;base64,${record.AnhBienSo}`}
                                                    alt="Ảnh biển số"
                                                    style={{ width: '70px', height: '60' }}
                                                />
                                            )}
                                        </td>
                                        <td>{record.Mssv}</td>
                                        <td>{record.Ma_BaiXe}</td>
                                        <td>{record.LoaiXe}</td>
                                        <td>{record.TG_Vao.replace('T', ' ')}</td>
                                        <td>{record.TG_Ra ? record.TG_Ra.replace('T', ' ') : 'null'}</td>
                                        <td>{record.Gia}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={(e) => { e.stopPropagation(); deleteRecord(record.Ma_CT); }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11" className="text-center">
                                        {searchTerm ? 'Không tìm thấy bản ghi phù hợp' : 'Không có bản ghi nào'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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

export default ChiTietRaVaoList;

