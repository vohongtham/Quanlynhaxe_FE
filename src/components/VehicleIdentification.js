import React, { useState, useRef, useEffect } from 'react';
import VehicleIdentificationService from '../services/vehicleidentification.service'; // Import service giao tiếp với server
import '../assets/styles/main.css';
import BaiXeService from '../services/baixe.service';
import VehicleService from '../services/vehicle.service';
import StudentService from '../services/student.service';
import NganhService from '../services/nganh.service';
import DonViService from '../services/donvi.service';
import ClassService from '../services/class.service';
import ChiTietRaVaoService from '../services/chitietravao.service';
import { toast } from 'react-toastify';

const VehicleIdentification = () => {
    // Khai báo các biến state để lưu biển số xe, ảnh biển số được cắt, trạng thái đang xử lý (loading) và lỗi (nếu có)
    const [licensePlate, setLicensePlate] = useState('');
    const [croppedImage, setCroppedImage] = useState(null); // Lưu ảnh biển số đã được cắt
    const [loading, setLoading] = useState(false); // Trạng thái loading để chỉ báo việc xử lý đang diễn ra
    const [error, setError] = useState(''); // Biến state để lưu lỗi nếu gặp phải
    const [capturedImage, setCapturedImage] = useState(null); // Lưu ảnh được chụp từ video
    const videoRef = useRef(null); // Tham chiếu đến phần tử video để lấy luồng camera
    const intervalRef = useRef(null); // Tham chiếu để lưu interval cho việc chụp khung hình định kỳ
    const [parkingLots, setParkingLotOptions] = useState([]); // State to hold parking lot data
    const [selectedParkingLot, setSelectedParkingLot] = useState(''); // State for the selected parking lot
    const [viTriTrong, setViTriTrong] = useState(''); // Khai báo state cho vị trí còn trống

    // Khai báo các state cho xe
    const [mssv, setMssv] = useState('');
    const [bienSoXe, setBienSoXe] = useState('');
    const [tenChuXe, setTenChuXe] = useState('');
    const [soKhungXe, setSoKhungXe] = useState('');
    const [loaiXe, setLoaiXe] = useState('');
    const [dungTich, setDungTich] = useState('');
    const [nhanHieu, setNhanHieu] = useState('');
    const [mauXe, setMauXe] = useState('');
    // Khai báo các state cho thông tin sinh viên
    const [studentMssv, setStudentMssv] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    // const [studentPhone, setStudentPhone] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    // Khai báo các state cho thông tin lop
    const [classMaLop, setClassMaLop] = useState('');
    const [classTenLop, setClassTenLop] = useState('');
    const [classMaNganh, setClassMaNganh] = useState('');
    const [majorName, setMajorName] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [parkingFee, setParkingFee] = useState(''); // State để lưu phí giữ xe
    const [entryTime, setEntryTime] = useState(''); // State lưu thời gian vào
    const [exitTime, setExitTime] = useState(''); // State lưu thời gian ra
    // Khai bào state thông tin chitiet để đối chiếu xe ra 
    const [maCT, setmaCT] = useState(''); // ma CT search
    const [MaCT, setMaCT] = useState(''); // maCT hiển thị thông tin
    const [biensoXe, setBiensoXe] = useState('');
    const [studentmssv, setstudentMssv] = useState('');
    const [maBaiXe, setMaBaiXe] = useState('');
    const [loaixe, setLoaixe] = useState('');
    const [thoiGianXeVao, setThoiGianXeVao] = useState('');
    const [anhBienSo, setAnhBienSo] = useState(null);


    // Hàm xử lý search MaCT
    const handleSearch = async () => {
        try {
            console.log("Searching with Ma_CT:", maCT); // Log the search parameter
            const data = await ChiTietRaVaoService.search({ Ma_CT: maCT }); // Make sure Ma_CT matches the backend's expectation
    
            console.log("Search response data:", data); // Log the response data
    
            if (data && data.length > 0) {
                const chitietravaoInfo = data[0]; // Assumes data is an array with at least one result
                setMaCT(chitietravaoInfo.Ma_CT);
                setBiensoXe(chitietravaoInfo.BienSoXe);
                setstudentMssv(chitietravaoInfo.Mssv);
                setMaBaiXe(chitietravaoInfo.Ma_BaiXe);
                setLoaixe(chitietravaoInfo.LoaiXe);
                setThoiGianXeVao(chitietravaoInfo.TG_Vao);
                setAnhBienSo(chitietravaoInfo.AnhBienSo);
            } else {
                toast.error('Không tìm thấy thông tin cho mã thẻ xe này.');
            }
        } catch (error) {
            console.error("Error fetching vehicle information:", error);
            toast.error('Không tìm thấy thông tin với mã thẻ xe này.');
        }
    };
    

    // Hàm xử lý chọn bãi xe
    const handleParkingLotChange = async (event) => {
        const selectedLot = event.target.value;
        setSelectedParkingLot(selectedLot);
        console.log("Bãi xe đã chọn:", selectedLot); // Kiểm tra bãi xe đã chọn

        if (selectedLot) {
            try {
                // Tìm kiếm thông tin bãi xe đã chọn
                const result = await BaiXeService.search({ Ma_BaiXe: selectedLot });

                if (result && result.length > 0) {
                    // Giả sử `vi_tri_trong` là thuộc tính bạn cần lấy từ kết quả
                    const baiXeData = result[0];
                    setViTriTrong(baiXeData.vi_tri_trong); // Cập nhật vị trí còn trống
                } else {
                    setViTriTrong(''); // Không tìm thấy vị trí
                }
            } catch (error) {
                console.error(`Error fetching parking lot details: ${error.message}`);
                setViTriTrong(''); // Reset vị trí nếu có lỗi
            }
        } else {
            setViTriTrong(''); // Reset vị trí nếu không có bãi xe được chọn
        }
    };

    // useEffect(() => {
    //     if (selectedParkingLot && licensePlate) {
    //         console.log("Gọi saveVehicleData với:", { selectedParkingLot, licensePlate});
    //         saveVehicleData();
    //     }
    // }, [selectedParkingLot, licensePlate]);

    useEffect(() => {
        if (!selectedParkingLot) {
            toast.warn("Vui lòng chọn bãi xe.");
            return;
        }
    
        if (selectedParkingLot && licensePlate) {
            console.log("Gọi saveVehicleData với:", { selectedParkingLot, licensePlate });
            saveVehicleData();
        }
    }, [selectedParkingLot, licensePlate]);
    

    // Hàm lấy dữ liệu biển số từ server và cập nhật state
    const fetchLicensePlate = async () => {
        const response = await VehicleIdentificationService.getLicensePlate();
        setLicensePlate(response.license_plate_info[0]);
        console.log(response);

    };

    // Lấy danh sách bãi đậu xe
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

    // Hàm khởi động camera
    const startCamera = async () => {
        try {
            // Yêu cầu quyền truy cập camera từ người dùng
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // Đặt luồng camera làm nguồn cho phần tử video
            videoRef.current.srcObject = stream;
        } catch (err) {
            // Nếu có lỗi khi truy cập camera, hiển thị thông báo lỗi
            setError('Không thể truy cập vào camera.');
        }
    };

    const processVideoStream = async () => {
        // Nếu đang xử lý (loading là true), ngăn không cho gửi yêu cầu khác
        if (loading) return;

        // Tạo một phần tử canvas để chụp khung hình từ video
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const video = videoRef.current;

        // Đặt kích thước canvas dựa trên kích thước khung hình video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Vẽ khung hình hiện tại của video lên canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Chuyển nội dung của canvas thành một Blob (hình ảnh) để gửi lên server
        canvas.toBlob(async (blob) => {
            // Cập nhật ảnh đã chụp để hiển thị
            setCapturedImage(canvas.toDataURL('image/png'));

            // Đặt trạng thái loading thành true để chỉ báo rằng đang xử lý
            setLoading(true);
            // Xóa lỗi trước đó (nếu có)
            setError('');

            try {
                // Gọi API từ service để nhận diện biển số xe bằng cách gửi Blob (hình ảnh) lên server
                const detectedData = await VehicleIdentificationService.recognizeLicensePlate(blob);
                console.log(detectedData); // Ghi ra console phản hồi từ server để kiểm tra

                // Kiểm tra nếu server trả về dữ liệu biển số xe
                if (detectedData && detectedData.length > 0) {
                    // Cập nhật state với chuỗi biển số xe nhận diện được
                    const recognizedPlate = detectedData[0].text;
                    setLicensePlate(recognizedPlate);

                    // Cập nhật lại ảnh biển số mới từ server nếu có
                    if (detectedData[0].cropped_image) {
                        setCroppedImage(detectedData[0].cropped_image);
                    }

                    // Gọi hàm để lưu dữ liệu vào ChiTietRaVao
                    // await saveVehicleData(); // Lưu dữ liệu ngay sau khi nhận diện

                    // Gọi hàm lấy thông tin xe dựa trên biển số xe nhận diện được
                    await fetchVehicleInfoByLicensePlate(recognizedPlate);

                    // Cập nhật state với ảnh biển số đã được cắt
                    setCroppedImage(detectedData[0].cropped_image);

                } else {
                    // Nếu không có biển số nào được nhận diện, in lỗi
                    throw new Error('Không tìm thấy biển số xe nào');
                }
            } catch (err) {
                // Ghi lỗi ra console và cập nhật state để hiển thị thông báo lỗi
                console.error('Lỗi trong quá trình nhận diện biển số:', err);
                setError('Không tìm thấy biển số xe. Vui lòng thử lại.');
            } finally {
                // Sau khi xử lý xong, đặt trạng thái loading thành false
                setLoading(false);
            }
        }, 'image/png'); // Chuyển đổi canvas thành định dạng PNG
    };


    // Khởi tạo trạng thái ban đầu
    // const [vehicleData, setVehicleData] = useState({
    //     parkingLot: '',
    //     licensePlate: '',
    // });

    // // Hàm lưu dữ liệu vào `ChiTietRaVao`
    // const saveVehicleData = async () => {
    //     console.log("Hàm saveVehicleData đã được gọi"); // Ghi lại mỗi lần hàm được gọi

    //     const dataToSave = {
    //         Ma_BaiXe: selectedParkingLot,
    //         BienSoXe: licensePlate || '',
    //         AnhBienSo: croppedImage || null,  // Thêm ảnh biển số nếu có
    //         Ma_CT: maCT // Thêm mã thẻ xe vào đây
    //     };
    //     console.log("Dữ liệu gửi đến server:", dataToSave);

    //     try {
    //         const response = await ChiTietRaVaoService.add(dataToSave);
    
    //         // Ghi lại phản hồi từ server
    //         console.log("Response từ server:", response);
    
    //         // Kiểm tra xem có lỗi nào trong phản hồi không
    //         if (response.error) {
    //             toast.error(response.error); // Nếu có lỗi từ server
    //             return; // Kết thúc hàm ở đây nếu có lỗi
    //         }
    
    //         // Xử lý các trạng thái khác nhau của phản hồi
    //         if (response.status === "entry") {
    //             toast.success("Xe vào bãi!");
    //             const formattedEntryTime = formatDate(response.TG_Vao);
    //             setEntryTime(formattedEntryTime);
    //             setExitTime(null); // Reset thời gian ra
    //             // resetVehicleState(); // Reset trạng thái xe sau khi lưu
    //         } else if (response.status === "exit") {
    //             toast.success("Xe ra khỏi bãi!");
    //             const formattedEntryTime = formatDate(response.TG_Vao);
    //             setEntryTime(formattedEntryTime);
    //             const formattedExitTime = formatDate(response.TG_Ra);
    //             setExitTime(formattedExitTime);
    //             // Hiển thị phí gửi xe nếu có
    //             // if (response.Gia) {
    //             //     toast.info(`Phí gửi xe: ${response.Gia} VND`);
    //             // }
    //             // Hiển thị phí gửi xe nếu có và cập nhật ô input
    //             if (response.Gia) {
    //                 // toast.info(`Phí gửi xe: ${response.Gia} VND`);
    //                 setParkingFee(response.Gia); // Cập nhật phí giữ xe vào state
    //             }
    //             // resetVehicleState(); // Reset trạng thái xe sau khi lưu
    //         }
    
    //         // Cập nhật số vị trí trống nếu có
    //         if (response.So_ViTriTrong !== undefined) {
    //             setViTriTrong(response.So_ViTriTrong);
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi lưu thông tin xe:", error);
    //         toast.error("Đã xảy ra lỗi khi lưu thông tin xe."); // Thông báo lỗi cho người dùng
    //     }
    // };

    const saveVehicleData = async () => {
        console.log("Hàm saveVehicleData đã được gọi");

        // if (!selectedParkingLot) {
        //     toast.warn("Vui lòng chọn bãi xe trước khi lưu thông tin xe.");
        //     return;
        // }

        const dataToSave = {
            Ma_BaiXe: selectedParkingLot,
            BienSoXe: licensePlate || '',
            AnhBienSo: croppedImage || null,
            Ma_CT: maCT || null // Gửi Ma_CT nếu có
        };
    
        try {
            const response = await ChiTietRaVaoService.add(dataToSave);
            console.log("Response từ server:", response);

            if (response.error) {
                toast.error(response.error);
                return;
            }

            if (response.status === "need_Ma_CT") {
                toast.warn("Bạn cần cung cấp mã thẻ xe để ra khỏi bãi.");
                document.getElementById("maCTInput").focus(); // Focus vào ô input mã thẻ
                return;
            }

            // Kiểm tra trường hợp mã thẻ xe không khớp
                if (response.status === "Mã thẻ xe không khớp") {
                    toast.error("Mã thẻ xe không khớp. Vui lòng kiểm tra lại.");
                    return;
                }
    
            if (response.status === "entry") {
                toast.success("Xe vào bãi!");
                const formattedEntryTime = formatDate(response.TG_Vao);
                setEntryTime(formattedEntryTime);
                setExitTime(null);
                resetVehicleState();
            } else if (response.status === "exit") {
                toast.success("Mã thẻ xe khớp. Xe ra khỏi bãi!");
                const formattedEntryTime = formatDate(response.TG_Vao);
                setEntryTime(formattedEntryTime);
                const formattedExitTime = formatDate(response.TG_Ra);
                setExitTime(formattedExitTime);
                if (response.Gia) {
                    setParkingFee(response.Gia);
                }
            }
    
            if (response.So_ViTriTrong !== undefined) {
                setViTriTrong(response.So_ViTriTrong);
            }
        } catch (error) {
            console.error("Lỗi khi lưu thông tin xe:", error);
            toast.warn("Không thể lưu thông tin xe.");
        }
    };
    
    
    // Hàm reset trạng thái xe
    const resetVehicleState = () => {
        // setBienSoXe('');
        // setMssv('');
        // setSoKhungXe('');
        // setTenChuXe('');
        // setLoaiXe('');
        // setDungTich('');
        // setNhanHieu('');
        // setMauXe('');
        setParkingFee('');
        setmaCT('');
        setMaCT('');
        setBiensoXe('');
        setstudentMssv('');
        setMaBaiXe('');
        setLoaixe('');
        setThoiGianXeVao('');
        setAnhBienSo('');
        // Reset thêm các trạng thái khác nếu cần
    };

    // Hàm định dạng thời gian
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const utcYear = date.getUTCFullYear();
        const utcMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
        const utcDay = String(date.getUTCDate()).padStart(2, '0');
        const utcHours = String(date.getUTCHours()).padStart(2, '0');
        const utcMinutes = String(date.getUTCMinutes()).padStart(2, '0');
        const utcSeconds = String(date.getUTCSeconds()).padStart(2, '0');

        return `${utcYear}-${utcMonth}-${utcDay} ${utcHours}:${utcMinutes}:${utcSeconds}`;
    };


    // Sử dụng useEffect để khởi động camera và xử lý khung hình định kỳ mỗi 5 giây
    useEffect(() => {
        startCamera(); // Gọi hàm khởi động camera
        // Thiết lập một interval để gọi hàm processVideoStream mỗi 5 giây
        intervalRef.current = setInterval(processVideoStream, 10000);

        return () => {
            // Khi component bị hủy, xóa interval để ngăn chặn việc xử lý liên tục
            clearInterval(intervalRef.current);
        };
    }, []);


    // Hàm lấy thông tin xe và sinh viên dựa trên biển số xe
    const fetchVehicleInfoByLicensePlate = async (licensePlate) => {
        // Clear previous data immediately when a new search starts
        // Chuẩn hóa biển số xe: loại bỏ khoảng trắng ở đầu và cuối, đồng thời chuyển về dạng chữ in hoa
        const normalizedLicensePlate = licensePlate.trim().toUpperCase();

        resetFields();

        try {
            // Bước 1: Tìm thông tin xe dựa trên biển số
            // const vehicleData = await VehicleService.search({ BienSoXe: licensePlate });
            const vehicleData = await VehicleService.search({ BienSoXe: normalizedLicensePlate });
            console.log('Vehicle Data:', JSON.stringify(vehicleData, null, 2));

            if (vehicleData && vehicleData.length > 0) {
                // Cập nhật thông tin xe
                setBienSoXe(vehicleData[0].BienSoXe);
                setMssv(vehicleData[0].Mssv);
                setSoKhungXe(vehicleData[0].SoKhungXe);
                setTenChuXe(vehicleData[0].TenChuXe);
                setLoaiXe(vehicleData[0].LoaiXe);
                setDungTich(vehicleData[0].DungTich);
                setNhanHieu(vehicleData[0].NhanHieu);
                setMauXe(vehicleData[0].MauXe);
            } else {
                handleNoData("Không tìm thấy thông tin!", "xe");
                return; // Dừng nếu không tìm thấy thông tin xe
            }

            // Bước 2: Tìm thông tin sinh viên dựa trên Mssv từ thông tin xe
            const studentData = await StudentService.search({ Mssv: vehicleData[0].Mssv });
            console.log('Student Data:', JSON.stringify(studentData, null, 2));

            if (studentData && studentData.length > 0) {
                // Cập nhật thông tin sinh viên
                setStudentMssv(studentData[0].Mssv);
                setStudentName(studentData[0].Ten_SV);
                setStudentClass(studentData[0].Ma_Lop);
                // setStudentPhone(studentData[0].SDT);
                setStudentEmail(studentData[0].Email)
            } else {
                handleNoData("Không tìm thấy thông tin!", "sinh viên");
                return; // Dừng nếu không tìm thấy thông tin sinh viên
            }

            // Bước 3: Tìm thông tin lớp dựa trên Ma_Lop
            const classData = await ClassService.search({ Ma_Lop: studentData[0].Ma_Lop });
            console.log('Class Data:', JSON.stringify(classData, null, 2));

            if (classData && classData.length > 0) {
                setClassMaLop(classData[0].Ma_Lop);
                setClassTenLop(classData[0].TenLop);
                setClassMaNganh(classData[0].Ma_Nganh);
            } else {
                handleNoData("Không tìm thấy thông tin!", "lớp");
                return; // Dừng nếu không tìm thấy thông tin lớp
            }

            // Bước 4: Tìm ngành học dựa trên Ma_Nganh
            const majorData = await NganhService.search({ Ma_Nganh: classData[0].Ma_Nganh });
            console.log('Major Data:', JSON.stringify(majorData, null, 2));

            if (majorData && majorData.length > 0) {
                // Cập nhật thông tin ngành học
                setMajorName(majorData[0].TenNganh);
            } else {
                handleNoData("Không tìm thấy thông tin!", "ngành học");
                return; // Dừng nếu không tìm thấy thông tin ngành học
            }

            // Bước 5: Tìm thông tin đơn vị dựa trên Ma_DV từ ngành
            const departmentData = await DonViService.search({ Ma_DV: majorData[0].Ma_DV });
            console.log('Department Data:', JSON.stringify(departmentData, null, 2));

            if (departmentData && departmentData.length > 0) {
                // Cập nhật thông tin đơn vị
                setDepartmentName(departmentData[0].TenDV);
            } else {
                handleNoData("Không tìm thấy thông tin!", "đơn vị");
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin:", error);
            toast.warn("Không tìm thấy thông tin xe.");
        }
    };

    // Hàm để reset tất cả các biến trạng thái về giá trị mặc định
    const resetFields = () => {
        setBienSoXe('');
        setMssv('');
        setSoKhungXe('');
        setTenChuXe('');
        setLoaiXe('');
        setDungTich('');
        setNhanHieu('');
        setMauXe('');
        setStudentMssv('');
        setStudentName('');
        setStudentClass('');
        // setStudentPhone('');
        setStudentEmail('');
        setClassMaLop('');
        setClassTenLop('');
        setClassMaNganh('');
        setMajorName('');
        setDepartmentName('');
        setEntryTime('');
        setExitTime('');
    };

    // Hàm để xử lý khi không tìm thấy dữ liệu cho các loại thông tin cụ thể
    const handleNoData = (message, dataType) => {
        toast.error(`${message} cho ${dataType}`);
        setError(message);
        resetFields();
    };

    // Find the selected parking lot name
    const selectedParkingLotName = parkingLots.find(lot => lot.Ma_BaiXe === selectedParkingLot)?.Ten_BaiXe || '';

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Khung hiển thị video từ camera */}
                <div style={{ display: 'flex', marginTop: '-40px' }}>
                    <div>
                        <h4 style={{ color: '#800000' }}>Camera</h4>
                        <div style={{ marginLeft: '-10px' }}>
                            <video ref={videoRef} autoPlay width="350" height="221" />
                        </div>
                    </div>

                    <div style={{ marginLeft: '-20px' }}>
                        <h4 style={{ color: '#800000', marginLeft: '-25px' }}>Hình ảnh</h4>
                        <div className='frame-image'>
                            {capturedImage && (
                                <div>
                                    <img
                                        src={capturedImage}
                                        alt="Captured from Camera"
                                        style={{ width: '350px', height: '221px', objectFit: 'contain' }} // Ensure the image fits well in the frame
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Hiển thị biển số và ảnh biển số đã nhận diện được nếu có */}
                <div style={{ marginLeft: '10px', fontSize: '20px', marginTop: '-40px' }} >
                    <div >
                        <label style={{ marginLeft: '20px' }}>Ảnh biển số xe:</label>
                        <div className="fixed-frame">
                            {croppedImage && (
                                <img src={`data:image/jpeg;base64,${croppedImage}`} alt="Cropped License Plate" />
                            )}
                        </div>
                    </div>
                    <div>
                        <label style={{ marginLeft: '20px' }}>Biển số xe:</label>
                        <div className='frame-licenseplate'>
                            {licensePlate && (
                                <h4 style={{ margin: 0 }}>{licensePlate}</h4>
                            )}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 0 0 30px', fontSize: '16px', color: 'blue' }}>
                    {/* First Column */}
                    <div style={{ flex: 1, marginRight: '20px' }}>
                        <h4>THÔNG TIN SINH VIÊN</h4>
                        <div style={{ marginBottom: '2px' }}>
                            <label style={{ display: 'block', marginBottom: '1px' }}>Mã sinh viên:</label>
                            <input
                                type="text"
                                style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }} // Rounded corners
                                value={studentMssv} // Bind to state variable
                                readOnly
                            />
                        </div>
                        <div style={{ marginBottom: '2px' }}>
                            <label style={{ display: 'block', marginBottom: '1px' }}>Tên sinh viên:</label>
                            <input
                                type="text"
                                value={studentName}
                                readOnly
                                style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }} // Rounded corners
                            />
                        </div>
                        <div style={{ marginBottom: '2px' }}>
                            <label style={{ display: 'block', marginBottom: '1px' }}>Email:</label>
                            <input
                                type="text"
                                value={studentEmail}
                                readOnly
                                style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }} // Rounded corners
                            />
                        </div>
                        <div style={{ marginBottom: '2px' }}>
                            <label style={{ display: 'block', marginBottom: '1px' }}>Lớp:</label>
                            <input
                                type="text"
                                value={`${classMaLop} - ${classTenLop}`}
                                readOnly
                                style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }} // Rounded corners
                            />
                        </div>
                        <div style={{ marginBottom: '2px' }}>
                            <label style={{ display: 'block', marginBottom: '1px' }}>Thuộc đơn vị:</label>
                            <input
                                type="text"
                                value={departmentName}
                                readOnly
                                style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }} // Rounded corners
                            />
                        </div>
                    </div>
                    {/* Second Column */}
                    <div style={{ flex: 1 }}>
                        <h4>THÔNG TIN XE</h4>
                        <div style={{ flex: 1, marginRight: '20px' }}>
                            <div style={{ marginBottom: '2px' }}>
                                <label style={{ display: 'block', marginBottom: '1px' }}>Biển số:</label>
                                <input
                                    type="text"
                                    style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }}
                                    value={bienSoXe} // Bind to state variable
                                    // aria-label="Biển số xe"
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: '2px' }}>
                                <label style={{ display: 'block', marginBottom: '1px' }}>Số khung xe:</label>
                                <input
                                    type="text"
                                    style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }}
                                    value={soKhungXe} // Bind to state variable
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: '2px' }}>
                                <label style={{ display: 'block', marginBottom: '1px' }}>Loại xe:</label>
                                <input
                                    type="text"
                                    style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }}
                                    value={loaiXe} // Bind to state variable
                                    readOnly

                                />
                            </div>
                            <div style={{ marginBottom: '2px' }}>
                                <label style={{ display: 'block', marginBottom: '1px' }}>Nhãn hiệu:</label>
                                <input
                                    type="text"
                                    style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }}
                                    value={nhanHieu} // Bind to state variable
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: '2px' }}>
                                <label style={{ display: 'block', marginBottom: '1px' }}>Màu xe:</label>
                                <input
                                    type="text"
                                    style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }}
                                    value={mauXe} // Bind to state variable
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hiển thị thông báo đang xử lý hoặc lỗi (nếu có) */}
            <div
                style={{
                    position: 'fixed',
                    left: '20px',
                    width: '390px', // Optional: Set a fixed width
                    height: '45px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    backgroundColor: '#f9f9f9',
                    marginTop: '-30px',
                    // zIndex: 1000,
                }}
            >
                {loading && <p style={{ color: 'blue', marginLeft: '20px' }}>Đang nhận diện biển số xe...</p>}
                {error && <p style={{ color: 'red', marginLeft: '20px' }}>{error}</p>}
            </div>

            <div className="license-plate-container" style={{ display: 'flex', gap: '20px' }}>

                <div style={{ fontSize: '20px', marginTop: '50px' }}>
                    <div>
                        <label htmlFor="parkingLot" style={{ color: 'blue', marginLeft: '20px' }}>Nhà xe:</label>
                        <select
                            id="parkingLot"
                            value={selectedParkingLot}
                            onChange={handleParkingLotChange}
                            className="form-control form-control-sm custom-select" // Use form-control-sm for a smaller select
                            style={{
                                display: 'inline-block',
                                width: '250px',
                                margin: '5px 5px 5px 75px',
                                fontSize: '18px',
                                // padding: '5px',
                                borderRadius: '5px',
                                border: '1px solid black',
                                color: 'green'
                            }} // Adjust width and margin
                        >
                            <option value="">Chọn nhà xe</option>
                            {parkingLots.map((lot) => (
                                <option key={lot.Ma_BaiXe} value={lot.Ma_BaiXe}>
                                    {lot.Ma_BaiXe} - {lot.Ten_BaiXe}{/* Ensure these properties exist in your parking lot data */}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ color: 'blue', marginLeft: '20px' }}>Vị trí còn trống:</label>
                        <input
                            value={viTriTrong} // Bind giá trị vị trí còn trống vào input
                            readOnly // Làm cho ô input chỉ đọc
                            style={{ margin: '5px', marginLeft: '5px', borderRadius: '5px', width: '250px' }}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'blue', marginLeft: '20px' }}>TG xe vào:</label>
                        <input
                            value={entryTime || ''} // Hiển thị thời gian vào
                            readOnly // Chỉ đọc
                            style={{ margin: '5px', marginLeft: '53px', borderRadius: '5px', width: '250px' }}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'blue', marginLeft: '20px' }}>TG xe ra:</label>
                        <input
                            value={exitTime || ''} // Hiển thị thời gian ra
                            readOnly // Chỉ đọc
                            style={{ margin: '5px', marginLeft: '67px', borderRadius: '5px', width: '250px' }}
                        />
                    </div>
                </div>
                <div style={{ marginTop: '80px'}}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 20px 0' }}>
                        <input
                            id="maCTInput"
                            type="text"
                            placeholder="Nhập mã thẻ xe"
                            value={maCT}
                            onChange={(e) => setmaCT(e.target.value)}
                            style={{ width: '200px', padding: '5px', borderRadius: '4px', border: '1px solid black' }}
                        />
                        <button
                            onClick={handleSearch}
                            style={{
                                padding: '5px 10px',
                                borderRadius: '4px',
                                backgroundColor: 'blue',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Tìm mã thẻ xe
                        </button>
                    </div>

                    <div>
                        <button
                            style={{
                                padding: '5px 10px',
                                borderRadius: '4px',
                                backgroundColor: 'green',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                margin: '20px 0 0 210px'
                            }}
                            onClick={saveVehicleData} // Gọi hàm khi nhấn nút
                        >
                            Xác nhận xe ra 
                        </button>
                    </div>

                    <div style={{ marginTop: '30px'}}>
                        <label style={{ color: 'blue', marginLeft: '0px', fontSize: '20px' }}>Phí giữ xe:</label>
                        <input
                            type="text" // Đặt type là "number" để người dùng dễ dàng nhập số
                            value={parkingFee ? `${parkingFee} VND` : ''} // Kết nối với state
                            readOnly // Làm cho ô input chỉ đọc
                            onChange={(e) => setParkingFee(e.target.value)} // Cập nhật state khi người dùng nhập
                            style={{ color: 'red', margin: '3px', borderRadius: '2px', width: '250px', height: '40px', fontSize: '24px' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: '70px', marginTop: '20px' }}>
                    <h4 style={{ color: 'Black', textAlign: 'center' }}>THÔNG TIN ĐỐI CHIẾU KHI XE RA</h4>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}> {/* Container for two columns */}
                        <div>
                            <div style={{ marginBottom: '2px' }}>
                                <label style={{ display: 'block', marginBottom: '1px' }}>Mã thẻ xe:</label>
                                <input
                                    type="text"
                                    style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }}
                                    value={MaCT}
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: '2px' }}>
                                <label style={{ display: 'block', marginBottom: '1px' }}>Biển số:</label>
                                <input
                                    type="text"
                                    style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }}
                                    value={biensoXe}
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: '2px' }}>
                                <label style={{ display: 'block', marginBottom: '1px' }}>Mssv:</label>
                                <input
                                    type="text"
                                    value={studentmssv}
                                    readOnly
                                    style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }}
                                />
                            </div>
                            <div style={{ marginBottom: '2px' }}>
                                <label style={{ display: 'block', marginBottom: '1px' }}>Mã bãi xe:</label>
                                <input
                                    type="text"
                                    style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }}
                                    value={maBaiXe}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div>
                            <div style={{ marginBottom: '2px' }}>
                                <label style={{ display: 'block', marginBottom: '1px' }}>Loại xe:</label>
                                <input
                                    type="text"
                                    value={loaixe}
                                    readOnly
                                    style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }}
                                />
                            </div>
                            <div style={{ marginBottom: '2px' }}>
                                <label style={{ display: 'block', marginBottom: '1px' }}>Thời gian xe vào:</label>
                                <input
                                    type="text"
                                    style={{ width: '300px', borderRadius: '2px', padding: '1px', border: '1px solid black' }}
                                    value={thoiGianXeVao.replace('T', ' ')}
                                    readOnly
                                />
                            </div>
                            {/* <div >
                                <label style={{ marginLeft: '0px' }}>Ảnh biển số xe lúc vào:</label>
                                <div className="fixed-frame1">
                                    {anhBienSo && (
                                        <img src={`data:image/jpeg;base64,${anhBienSo}`} alt="Cropped License Plate" />
                                    )}
                                </div>
                            </div> */}
                            <div>
                                <label style={{ marginLeft: '0px' }}>Ảnh biển số xe lúc vào:</label>
                                <div className="fixed-frame1">
                                    {anhBienSo && (
                                        <img
                                            src={`data:image/jpeg;base64,${anhBienSo}`}
                                            alt="Cropped License Plate"
                                            className="fixed-image" // Apply the CSS class
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default VehicleIdentification;
