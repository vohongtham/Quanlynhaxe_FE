import React, { useState, useEffect } from 'react';
import StatisticalService from '../services/statistical.service';
import { toast } from 'react-toastify';
import BaiXeService from '../services/baixe.service';
import UserService from '../services/user.service';
// import * as XLSX from 'xlsx';  // Thêm import này
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const YearlyRevenue = () => {
    const [year, setYear] = useState(''); // State to hold the selected year
    const [revenueData, setRevenueData] = useState(null); // Store revenue data
    const [loading, setLoading] = useState(false); // Loading state
    const [displayYear, setDisplayYear] = useState(''); // State to hold formatted year for display
    const [parkingLots, setParkingLotOptions] = useState([]); // State to hold parking lot data
    const [selectedParkingLot, setSelectedParkingLot] = useState(''); // State for the selected parking lot
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // Fetch the list of parking lots when the component mounts
    useEffect(() => {
        const fetchParkingLotOptions = async () => {
            try {
                const response = await BaiXeService.getAll();
                console.log('Parking lot options:', response); // Check the structure of the data
                setParkingLotOptions(response);
            } catch (error) {
                toast.error(`Failed to fetch parking lots: ${error.message}`);
            }
        };

        fetchParkingLotOptions();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedEmail = localStorage.getItem('userEmail');
            if (!storedEmail) {
                toast.error('No email found in localStorage for the logged-in user.');
                return;
            }
    
            try {
                const userResult = await UserService.search({ Email: storedEmail });
                if (userResult && userResult.length > 0) {
                    setUserName(userResult[0].Ten_user);
                    setUserPhone(userResult[0].SDT);
                    setUserEmail(storedEmail); // Set the email directly from local storage
                } else {
                    toast.error('No user found with the provided email.');
                }
            } catch (error) {
                console.error(error);
                toast.error('Error fetching user information.');
            }
        };
    
        fetchUserData();
    }, []);

    // Function to fetch revenue by year for a specific parking lot
    const fetchYearlyRevenue = async () => {
        if (year && selectedParkingLot) {
            setLoading(true);
            try {
                const result = await StatisticalService.getByYear(year, selectedParkingLot); // Fetch revenue for the year
                setRevenueData(result); // Store the revenue data in state
                setDisplayYear(year); // Update the displayed year
            } catch (error) {
                toast.error(`Error fetching yearly revenue: ${error.message}`);
            } finally {
                setLoading(false);
            }
        } else {
            toast.warn('Chọn năm và nhà xe cần thống kê.');
        }
    };

    // Handle input change for year selection
    const handleYearChange = (e) => {
        setYear(e.target.value); // Set the year in state
    };

    // Handle parking lot selection change
    const handleParkingLotChange = (e) => {
        setSelectedParkingLot(e.target.value); // Set the selected parking lot
    };

    // Tạo hàm lưu kết quả dưới dạng Excel
    // const saveToExcel = () => {
    //     if (!revenueData) {
    //         toast.warn('No data available to save!');
    //         return;
    //     }

    //     // Tạo một worksheet từ dữ liệu
    //     const worksheet = XLSX.utils.json_to_sheet([
    //         {
    //             'Tên bãi xe': parkingLots.find(lot => lot.Ma_BaiXe === selectedParkingLot)?.Ten_BaiXe || '',
    //             'Năm thống kê': displayYear,
    //             'Số lượt xe vào bãi': revenueData.so_luot_vao,
    //             'Số lượt xe ra khỏi bãi': revenueData.so_luot_ra,
    //             'Tổng doanh thu': `${revenueData.tong_doanh_thu} VND`
    //         }
    //     ]);

    //     // Tạo một workbook mới
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Doanh thu ngày');

    //     // Xuất file Excel
    //     XLSX.writeFile(workbook, `DoanhThu_${selectedParkingLot}_${year}.xlsx`);
    //     toast.success('File đã được lưu thành công!');
    // };

    const saveToPDF = () => {
        if (!revenueData) {
            toast.warn('No data available to save as PDF!');
            return;
        }
    
        const doc = new jsPDF();

        const removeVietnameseTones = (str) => {
            return str.normalize('NFD') // Tách các ký tự có dấu
                .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
                .replace(/đ/g, 'd') // Thay thế 'đ' thành 'd'
                .replace(/Đ/g, 'D'); // Thay thế 'Đ' thành 'D'
        };
    
        // Main content
        doc.setFontSize(16);
        doc.text('BAO CAO', 105, 20, null, null, 'center');
        doc.text('THONG KE NHA XE', 105, 30, null, null, 'center');
        doc.setFontSize(12);
        doc.text('Thoi gian thuc hien: ' + revenueData.thoi_gian_thuc_hien_thong_ke, 120, 40, null, null, 'left');
    
        doc.text('Ten nha xe: ' + removeVietnameseTones(parkingLots.find(lot => lot.Ma_BaiXe === selectedParkingLot)?.Ten_BaiXe || ''), 14, 50);
        doc.text('Ma so nha xe: ' + selectedParkingLot, 14, 60);
        doc.text('Thong ke nam: ' + displayYear, 14, 70);
        doc.text('Phi gui xe: O to (5000/luot), Xe may (2000/luot)', 14, 80);
    
        // Bảng thống kê tổng doanh thu
        doc.autoTable({
            startY: 90,
            head: [['Loai xe', 'So luot vao', 'So luot ra', 'Doanh thu']],
            body: [
                ['Xe may', revenueData.so_luot_vao_xemay, revenueData.so_luot_ra_xemay, (revenueData.so_luot_ra_xemay * 2000) + ' VND'],
                ['O to', revenueData.so_luot_vao_oto, revenueData.so_luot_ra_oto, (revenueData.so_luot_ra_oto * 5000) + ' VND'],
                ['Tong cong', revenueData.so_luot_vao, revenueData.so_luot_ra, revenueData.tong_doanh_thu + ' VND']
            ]
        });
    
        // Contact information using fetched data
        const contactStartY = doc.previousAutoTable.finalY + 10;
        doc.text('Nguoi thuc hien bao cao: ' + removeVietnameseTones(userName), 14, contactStartY );
        doc.text('Email: ' + userEmail, 14, contactStartY + 10);
        doc.text('SDT: ' + userPhone, 14, contactStartY + 20);
    
        // Save PDF
        doc.save('DoanhThu_' + selectedParkingLot + '_' + displayYear + '.pdf');
        toast.success('Xuất file thống kê thành công!');
    };

    // Find the selected parking lot name
    const selectedParkingLotName = parkingLots.find(lot => lot.Ma_BaiXe === selectedParkingLot)?.Ten_BaiXe || '';

    return (
        <div>
            <h3 className="text-center">THỐNG KÊ THEO NĂM</h3>
            <div style={{ marginLeft: '180px', fontSize: '20px' }}>
                <label htmlFor="year">Nhập năm thống kê: </label>
                <input
                    type="number"
                    id="year"
                    value={year}
                    onChange={handleYearChange}
                    placeholder="YYYY"
                    style={{ margin: '25px', borderRadius: '5px', width: '80px' }}
                />
            </div>
            <div style={{ marginLeft: '180px', fontSize: '20px' }}>
                <label htmlFor="parkingLot">Chọn bãi xe: </label>
                <select
                    id="parkingLot"
                    value={selectedParkingLot}
                    onChange={handleParkingLotChange}
                    className="form-control form-control-sm custom-select" // Use form-control-sm for a smaller select
                    style={{
                        display: 'inline-block',
                        width: 'auto',
                        margin: '0 55px 0 95px',
                        fontSize: '18px',
                        padding: '5px',
                        borderRadius: '5px',
                        border: '3px solid #ccc'
                    }} // Adjust width and margin
                >
                    <option value="">Chọn nhà xe để thống kê</option>
                    {parkingLots.map((lot) => (
                        <option key={lot.Ma_BaiXe} value={lot.Ma_BaiXe}>
                            {lot.Ma_BaiXe} - {lot.Ten_BaiXe} {/* Ensure these properties exist in your parking lot data */}
                        </option>
                    ))}
                </select>

                <button className="btn btn-sm btn-primary" onClick={fetchYearlyRevenue} disabled={loading}
                    style={{ fontSize: '18px'}}
                >
                    {loading ? 'Fetching...' : 'Thống kê'}
                </button>
                {/* <button className="btn btn-sm btn-success" onClick={saveToExcel} disabled={!revenueData} 
                    style={{ fontSize: '18px', marginLeft: '10px'}}
                >
                    Lưu kết quả
                </button> */}
                <button className="btn btn-sm btn-warning" onClick={saveToPDF} disabled={!revenueData}
                    style={{ fontSize: '18px', marginLeft: '10px' }}
                >
                    Xuất file 
                </button>
            </div>
            <h4 className="text-center" style={{ color: '#002776', marginTop: '35px', fontSize: '30px' }}>Kết quả thống kê</h4>
            <div className="mt-3" style={{ fontSize: '18px', marginLeft: '50px', display: 'flex', gap: '50px' }}>
                {/* Left Column */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <p style={{ marginRight: '10px' }}><strong>Tên nhà xe:</strong></p>
                        <input
                            type="text"
                            value={selectedParkingLotName}
                            readOnly
                            style={{ width: '300px', marginLeft: '85px', borderRadius: '2px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <p style={{ marginRight: '10px' }}><strong>Năm thống kê:</strong></p>
                        <input
                            type="text"
                            value={displayYear}
                            readOnly
                            style={{ width: '300px', marginLeft: '55px', borderRadius: '2px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <p><strong>Tổng số lượt xe vào:</strong></p>
                        <input
                            type="text"
                            value={revenueData ? revenueData.so_luot_vao : ''}
                            readOnly
                            style={{ width: '300px', marginLeft: '18px', borderRadius: '2px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <p><strong>Tổng số lượt xe ra:</strong></p>
                        <input
                            type="text"
                            value={revenueData ? revenueData.so_luot_ra : ''}
                            readOnly
                            style={{ width: '300px', marginLeft: '32px', borderRadius: '2px' }}
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div>                 
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <p><strong>Số lượt vào của xe máy:</strong></p>
                        <input
                            type="text"
                            value={revenueData ? revenueData.so_luot_vao_xemay : ''}
                            readOnly
                            style={{ width: '300px', marginLeft: '27px', borderRadius: '2px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <p><strong>Số lượt ra của xe máy:</strong></p>
                        <input
                            type="text"
                            value={revenueData ? revenueData.so_luot_ra_xemay : ''}
                            readOnly
                            style={{ width: '300px', marginLeft: '40px', borderRadius: '2px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <p><strong>Số lượt vào của xe ô tô:</strong></p>
                        <input
                            type="text"
                            value={revenueData ? revenueData.so_luot_vao_oto : ''}
                            readOnly
                            style={{ width: '300px', marginLeft: '29px', borderRadius: '2px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <p><strong>Số lượt ra của xe ô tô:</strong></p>
                        <input
                            type="text"
                            value={revenueData ? revenueData.so_luot_ra_oto : ''}
                            readOnly
                            style={{ width: '300px', marginLeft: '43px', borderRadius: '2px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', fontSize: '24px' }}>
                        <p><strong style={{color: 'blue'}}>Tổng doanh thu:</strong></p>
                        <input
                            type="text"
                            value={revenueData ? `${revenueData.tong_doanh_thu} VND` : ''}
                            readOnly
                            style={{ width: '300px', marginLeft: '40px', borderRadius: '2px', color: 'red'}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YearlyRevenue;
