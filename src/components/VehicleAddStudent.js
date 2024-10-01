// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import VehicleService from '../services/vehicle.service'; // Import VehicleService
// import { toast } from 'react-toastify'; // Import react-toastify for notifications

// function VehicleAddStudent({ show, handleClose, vehicle, refreshData }) {
//     // State to store form data for a new vehicle
//     const [formData, setFormData] = useState({
//         BienSoXe: '',
//         Mssv: '',
//         SoKhungXe: '',
//         TenChuXe: '',
//         LoaiXe: '',
//         DungTich: '',
//         NhanHieu: '',
//         MauXe: ''
//     });

//     // Update form data when `vehicle` prop changes
//     useEffect(() => {
//         if (vehicle) {
//             setFormData({
//                 Mssv: vehicle.Mssv || ''
//             });
//         }
//     }, [vehicle]);

//     // Handle input change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     // Handle form submission for adding a new vehicle
//     const handleSubmit = async () => {
//         try {
//             const response = await VehicleService.add(formData); // Call VehicleService to add a new vehicle
//             console.log("Add response:", response);

//             toast.success("Phương tiện đã được thêm thành công!");
//             refreshData(); // Refresh the vehicle list after adding
//             handleClose(); // Close the modal after submission
//         } catch (error) {
//             console.error("Failed to add vehicle:", error);
//             toast.error("Không thể thêm phương tiện. Vui lòng thử lại.");
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Thêm phương tiện mới</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group controlId="formBienSoXe">
//                         <Form.Label>Biển số xe:</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="BienSoXe"
//                             value={formData.BienSoXe}
//                             onChange={handleChange}
//                             placeholder="Nhập biển số xe"
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formMssv">
//                         <Form.Label>MSSV:</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="Mssv"
//                             value={formData.Mssv}
//                             onChange={handleChange}
//                             placeholder="Nhập MSSV"
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formSoKhungXe">
//                         <Form.Label>Số khung xe:</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="SoKhungXe"
//                             value={formData.SoKhungXe}
//                             onChange={handleChange}
//                             placeholder="Nhập số khung xe"
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formTenChuXe">
//                         <Form.Label>Tên chủ xe:</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="TenChuXe"
//                             value={formData.TenChuXe}
//                             onChange={handleChange}
//                             placeholder="Nhập tên chủ xe"
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formLoaiXe">
//                         <Form.Label>Loại xe:</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="LoaiXe"
//                             value={formData.LoaiXe}
//                             onChange={handleChange}
//                             placeholder="Nhập loại xe"
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formDungTich">
//                         <Form.Label>Dung tích:</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="DungTich"
//                             value={formData.DungTich}
//                             onChange={handleChange}
//                             placeholder="Nhập dung tích"
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formNhanHieu">
//                         <Form.Label>Nhãn hiệu:</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="NhanHieu"
//                             value={formData.NhanHieu}
//                             onChange={handleChange}
//                             placeholder="Nhập nhãn hiệu"
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formMauXe">
//                         <Form.Label>Màu xe:</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="MauXe"
//                             value={formData.MauXe}
//                             onChange={handleChange}
//                             placeholder="Nhập màu xe"
//                         />
//                     </Form.Group>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="primary" onClick={handleSubmit}>
//                     Thêm phương tiện
//                 </Button>
//                 <Button variant="secondary" onClick={handleClose}>
//                     Đóng
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }

// export default VehicleAddStudent;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import VehicleService from '../services/vehicle.service'; // Import VehicleService
import { toast } from 'react-toastify'; // Import react-toastify for notifications
import SinhVienService from '../services/student.service';

function VehicleAddStudent({ show, handleClose, vehicle, refreshData }) {
    // State to store form data for a new vehicle
    const [Mssv, setMssv] = useState(null); // State để lưu Mssv
    const [formData, setFormData] = useState({
        BienSoXe: '',
        Mssv: '',
        SoKhungXe: '',
        TenChuXe: '',
        LoaiXe: '',
        DungTich: '',
        NhanHieu: '',
        MauXe: ''
    });

    // Update form data when `vehicle` prop changes
    // useEffect(() => {
    //     if (vehicle) {
    //         setFormData({
    //             Mssv: vehicle.Mssv || ''
    //         });
    //     }
    // }, [vehicle]);

    useEffect(() => {
        const fetchMssvFromEmail = async () => {
            const userEmail = localStorage.getItem('userEmail'); // Lấy email từ local storage
            if (!userEmail) {
                toast.error('No email found in localStorage for the logged-in user.');
                return;
            }

            try {
                const studentResult = await SinhVienService.search({ Email: userEmail }); // Gọi API để tìm sinh viên
                if (studentResult && studentResult.length > 0) {
                    setMssv(studentResult[0].Mssv); // Lưu Mssv vào state
                } else {
                    toast.error('No student found with the provided email.');
                }
            } catch (error) {
                console.error(error);
                toast.error('Error fetching student information.');
            }
        };

        fetchMssvFromEmail(); // Gọi hàm xác định Mssv
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission for adding a new vehicle
    // const handleSubmit = async () => {
    //     try {
    //         const response = await VehicleService.add(formData); // Call VehicleService to add a new vehicle
    //         console.log("Add response:", response);

    //         toast.success("Phương tiện đã được thêm thành công!");
    //         refreshData(); // Refresh the vehicle list after adding
    //         handleClose(); // Close the modal after submission
    //     } catch (error) {
    //         console.error("Failed to add vehicle:", error);
    //         toast.error("Không thể thêm phương tiện. Vui lòng thử lại.");
    //     }
    // };

    const handleSubmit = async () => {
        try {
            const vehicleData = { ...formData, Mssv }; // Bao gồm MSSV trong dữ liệu xe
            await VehicleService.add(vehicleData); // Gọi API để thêm phương tiện

            toast.success('Xe đã được thêm thành công!!');
            refreshData(); // Cập nhật dữ liệu
            handleClose(); // Đóng modal
        } catch (error) {
            console.error(error);
            toast.error('Error adding vehicle.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm phương tiện mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBienSoXe">
                        <Form.Label>Biển số xe:</Form.Label>
                        <Form.Control
                            type="text"
                            name="BienSoXe"
                            value={formData.BienSoXe}
                            onChange={handleChange}
                            placeholder="Nhập biển số xe"
                        />
                    </Form.Group>
                    <Form.Group controlId="formMssv">
                        <Form.Label>MSSV:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Mssv"
                            value={Mssv || ''} // Hiển thị MSSV, nếu không có thì hiển thị chuỗi rỗng
                            readOnly // Làm cho trường này không thể chỉnh sửa
                        />
                    </Form.Group>
                    <Form.Group controlId="formSoKhungXe">
                        <Form.Label>Số khung xe:</Form.Label>
                        <Form.Control
                            type="text"
                            name="SoKhungXe"
                            value={formData.SoKhungXe}
                            onChange={handleChange}
                            placeholder="Nhập số khung xe"
                        />
                    </Form.Group>
                    <Form.Group controlId="formTenChuXe">
                        <Form.Label>Tên chủ xe:</Form.Label>
                        <Form.Control
                            type="text"
                            name="TenChuXe"
                            value={formData.TenChuXe}
                            onChange={handleChange}
                            placeholder="Nhập tên chủ xe"
                        />
                    </Form.Group>
                    <Form.Group controlId="formLoaiXe">
                        <Form.Label>Loại xe:</Form.Label>
                        <Form.Control
                            type="text"
                            name="LoaiXe"
                            value={formData.LoaiXe}
                            onChange={handleChange}
                            placeholder="Nhập loại xe"
                        />
                    </Form.Group>
                    <Form.Group controlId="formDungTich">
                        <Form.Label>Dung tích:</Form.Label>
                        <Form.Control
                            type="text"
                            name="DungTich"
                            value={formData.DungTich}
                            onChange={handleChange}
                            placeholder="Nhập dung tích"
                        />
                    </Form.Group>
                    <Form.Group controlId="formNhanHieu">
                        <Form.Label>Nhãn hiệu:</Form.Label>
                        <Form.Control
                            type="text"
                            name="NhanHieu"
                            value={formData.NhanHieu}
                            onChange={handleChange}
                            placeholder="Nhập nhãn hiệu"
                        />
                    </Form.Group>
                    <Form.Group controlId="formMauXe">
                        <Form.Label>Màu xe:</Form.Label>
                        <Form.Control
                            type="text"
                            name="MauXe"
                            value={formData.MauXe}
                            onChange={handleChange}
                            placeholder="Nhập màu xe"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Thêm phương tiện
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default VehicleAddStudent;