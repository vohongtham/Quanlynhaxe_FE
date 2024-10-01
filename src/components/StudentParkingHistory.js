// import React, { useState, useEffect } from 'react';
// import ChiTietRaVaoService from '../services/chitietravao.service'; // Adjust the path
// import StudentService from '../services/student.service'; // Service for fetching student info
// import '../assets/styles/main.css';

// const ChiTietRaVaoList = () => {
//     const [chiTietRaVaoList, setChiTietRaVaoList] = useState([]); // Vehicle entry-exit list
//     const [currentPage, setCurrentPage] = useState(1); // Pagination
//     const [searchTerm, setSearchTerm] = useState(''); // Search term
//     const [loading, setLoading] = useState(true); // Loading state
//     const [errorMessage, setErrorMessage] = useState(null); // Error state
//     const itemsPerPage = 9; // Items per page for pagination

    // useEffect(() => {
    //     fetchChiTietRaVaoList();
    // }, []);


    // const fetchChiTietRaVaoList = async () => {
    //     setLoading(true);
    //     setErrorMessage('');
    
    //     const userEmail = localStorage.getItem('userEmail');
    
    //     if (!userEmail) {
    //         setErrorMessage('No email found in localStorage for the logged-in user.');
    //         setLoading(false);
    //         return;
    //     }
    
    //     try {
    //         const studentResult = await StudentService.search({ Email: userEmail });
    
    //         if (studentResult && studentResult.length > 0) {
    //             const mssv = studentResult[0].Mssv; // Get the Mssv from the student data
    
    //             const chiTietRaVaoResult = await ChiTietRaVaoService.search({ Mssv: mssv });
    
    //             if (chiTietRaVaoResult && chiTietRaVaoResult.length > 0) {
    //                 // Sort the records by entry time (TG_Vao) in descending order
    //                 const sortedRecords = chiTietRaVaoResult.sort((a, b) => new Date(b.TG_Vao) - new Date(a.TG_Vao));
    //                 setChiTietRaVaoList(sortedRecords); // Set the fetched data
    //             } else {
    //                 setErrorMessage('No entry-exit history found for the student.');
    //             }
    //         } else {
    //             setErrorMessage('No student found with the provided email.');
    //         }
    //     } catch (error) {
    //         setErrorMessage('Chưa có lịch sử gửi xe.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    

//     // Handle search input change
//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//         setCurrentPage(1); // Reset to the first page when searching
//     };

//     // Filtered records based on search term
//     const filteredRecords = chiTietRaVaoList.filter((record) => {
//         const searchValue = searchTerm.toLowerCase();
//         return (
//             record.BienSoXe.toLowerCase().includes(searchValue) ||   // Search by license plate
//             record.Mssv.toLowerCase().includes(searchValue) ||
//             record.TG_Vao.includes(searchValue) ||  // Search by entry time
//             record.TG_Ra.includes(searchValue) ||   // Search by exit time
//             record.Ma_BaiXe.toLowerCase().includes(searchValue)    // Search by parking lot ID
//         );
//     });

//     const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
//     const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
//     const displayedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//     return (
//         <div className='container' style={{ width: '90%' }}>
//             {loading && <div>Loading...</div>}
//             {errorMessage && <div>{errorMessage}</div>}
//             {!loading && !errorMessage && (
//                 <>
//                     <div className="mb-3 d-flex">
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Tìm kiếm lịch sử..."
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                             style={{ marginRight: '10px', fontSize: '18px' }}
//                         />
//                         <button className="btn btn-secondary ml-2">
//                             <i className="bi bi-search"></i>
//                         </button>
//                     </div>
//                     <h3 className="text-uppercase text-center">LỊCH SỬ GỬI XE</h3>
//                     <table className="table table-bordered" style={{ width: '100%' }}>
//                         <thead>
//                             <tr>
//                                 {/* <th>STT</th> */}
//                                 <th>Mã lịch sử</th>
//                                 <th>Biển số xe</th>
//                                 {/* <th>Mã số sinh viên</th> */}
//                                 <th>Thời gian vào</th>
//                                 <th>Thời gian ra</th>
//                                 <th>Mã bãi xe</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {displayedRecords.length > 0 ? (
//                                 displayedRecords.map((record, index) => (
//                                     <tr key={record.Ma_CT}>
//                                         <td>{record.Ma_CT}</td>
//                                         <td>{record.BienSoXe}</td>
//                                         <td>{record.TG_Vao.replace('T', ' ')}</td>
//                                         <td>{record.TG_Ra ? record.TG_Ra.replace('T', ' ') : 'null'}</td>
//                                         <td>{record.Ma_BaiXe}</td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="7" className="text-center">
//                                         {searchTerm ? 'Không tìm thấy chi tiết phù hợp' : 'Không có dữ liệu'}
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                     {/* Pagination Controls */}
//                     <nav aria-label="Page navigation" className="d-flex justify-content-center">
//                         <ul className="pagination pagination-sm">
//                             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                                 <a className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>&lt;</a>
//                             </li>
//                             {pages.map((page) => (
//                                 <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
//                                     <a className="page-link" onClick={() => setCurrentPage(page)}>
//                                         {page}
//                                     </a>
//                                 </li>
//                             ))}
//                             <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                                 <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>&gt;</a>
//                             </li>
//                         </ul>
//                     </nav>

//                     <div className="row mt-3">
//                         <div className="col d-flex justify-content-end align-items-center">
//                             <button className="btn btn-sm btn-primary" onClick={fetchChiTietRaVaoList} disabled={loading}>
//                                 <i className={`fas fa-redo ${loading ? 'fa-spin' : ''}`}></i> {loading ? "Đang làm mới..." : "Làm mới"}
//                             </button>

//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>

//     );
// };

// export default ChiTietRaVaoList;



import React, { useState, useEffect } from 'react';
import ChiTietRaVaoService from '../services/chitietravao.service'; // Adjust the path to your service
import '../assets/styles/main.css';
import StudentService from '../services/student.service';
// import { toast } from 'react-toastify';
// import Swal from 'sweetalert2';

const ChiTietRaVaoList = () => {
    // State management
    const [chiTietRaVaoList, setChiTietRaVaoList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [loading, setLoading] = useState(true); // Loading state
    const [errorMessage, setErrorMessage] = useState(null); // Error state
    const itemsPerPage = 5; // Number of items to show per page


    useEffect(() => {
        fetchChiTietRaVaoList();
    }, []);

    const fetchChiTietRaVaoList = async () => {
        setLoading(true);
        setErrorMessage('');
    
        const userEmail = localStorage.getItem('userEmail');
    
        if (!userEmail) {
            setErrorMessage('No email found in localStorage for the logged-in user.');
            setLoading(false);
            return;
        }
    
        try {
            const studentResult = await StudentService.search({ Email: userEmail });
    
            if (studentResult && studentResult.length > 0) {
                const mssv = studentResult[0].Mssv; // Get the Mssv from the student data
    
                const chiTietRaVaoResult = await ChiTietRaVaoService.search({ Mssv: mssv });
    
                if (chiTietRaVaoResult && chiTietRaVaoResult.length > 0) {
                    // Sort the records by entry time (TG_Vao) in descending order
                    const sortedRecords = chiTietRaVaoResult.sort((a, b) => new Date(b.TG_Vao) - new Date(a.TG_Vao));
                    setChiTietRaVaoList(sortedRecords); // Set the fetched data
                } else {
                    setErrorMessage('No entry-exit history found for the student.');
                }
            } else {
                setErrorMessage('No student found with the provided email.');
            }
        } catch (error) {
            setErrorMessage('Chưa có lịch sử gửi xe.');
        } finally {
            setLoading(false);
        }
    };

    // Handle page change
    const goToPage = (page) => setCurrentPage(page);
    const prevPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    const nextPage = () => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);

    const onUpdateActiveIndex = (index) => setActiveIndex(index);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    const onSubmitSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    // Filter records based on search term
    const filteredRecords = chiTietRaVaoList.filter((record) => {
        const searchValue = searchTerm.toLowerCase();
        return (
            record.Ma_CT.toLowerCase().includes(searchValue) ||
            record.BienSoXe.toLowerCase().includes(searchValue) ||  // Search by license plate
            record.Mssv.toLowerCase().includes(searchValue) ||      // Search by student ID
            record.TG_Ra.toLowerCase().includes(searchValue) ||// Search by exit time
            record.TG_Vao.toLowerCase().includes(searchValue) ||  // Search by entry time
            record.Ma_BaiXe.toLowerCase().includes(searchValue)
        );
    });

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ marginRight: '10px', fontSize: '18px' }}
                        />
                        <button className="btn btn-secondary ml-2" onSubmit={onSubmitSearch}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <h3 className="text-uppercase text-center">LỊCH SỬ GỬI XE</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã lịch sử</th>
                                <th>Biển số xe</th>
                                <th>Mã sinh viên</th>
                                <th>Thời gian vào</th>
                                <th>Thời gian ra</th>
                                <th>Mã bãi xe</th>
                                {/* <th>Xóa bản ghi</th> */}
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
                                        <td>{record.Mssv}</td>
                                        <td>{record.TG_Vao.replace('T', ' ')}</td>
                                        <td>{record.TG_Ra ? record.TG_Ra.replace('T', ' ') : 'null'}</td>
                                        <td>{record.Ma_BaiXe}</td>
                                        {/* <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => deleteRecord(record.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        {searchTerm ? 'Không tìm thấy lịch sử gửi xe' : 'Không có lịch sử gửi xe nào'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <nav aria-label="Page navigation" className="d-flex justify-content-end">
                        <ul className="pagination pagination-sm">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={(e) => { e.preventDefault(); prevPage(); }}>
                                    Previous
                                </a>
                            </li>
                            {pages.map((page) => (
                                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
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

