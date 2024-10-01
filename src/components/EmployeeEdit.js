import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import UserService from '../services/user.service'; // Import UserService
import { toast } from 'react-toastify'; // Import react-toastify for notifications

function EmployeeEdit({ show, handleClose, user, refreshData  }) {
    // State để lưu trữ thông tin form
    const [formData, setFormData] = useState({
        Ten_user: '',
        Email: '',
        GioiTinh: '',
        NgaySinh: '',
        Ma_BaiXe: '',
        Ma_Quyen: ''
    });

    // Cập nhật form data khi prop `user` thay đổi
    useEffect(() => {
        if (user) {
            setFormData({
                Ten_user: user.Ten_user || '',
                Email: user.Email || '',
                GioiTinh: user.GioiTinh || '',
                NgaySinh: user.NgaySinh || '',
                Ma_BaiXe: user.Ma_BaiXe || '',
                Ma_Quyen: user.Ma_Quyen || ''
            });
        }
    }, [user]);

    // Hàm xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submit
    // const handleSubmit = async () => {
    //     try {
    //         const response = await UserService.update(user.Ma_user, formData);
    //         console.log("Update response:", response);  // Check the response
            
    //         toast.success("User updated successfully!");
    //         refreshData();
    //         handleClose();
    //     } catch (error) {
    //         console.error("Update failed:", error);  // Log the error
    //         toast.error("Failed to update user. Please try again.");
    //     }
    // };

    const handleSubmit = async () => {
        try {
            const response = await UserService.update(user.Ma_user, formData);
            console.log("Update response:", response);  // Check the response
            
            toast.success("User updated successfully!");
            handleClose();
            refreshData();  // Call the refresh function after successful update
        } catch (error) {
            console.error("Update failed:", error);  // Log the error
            toast.error("Failed to update user. Please try again.");
        }
    };
    
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTenUser">
                        <Form.Label>Tên nhân viên:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ten_user"
                            value={formData.Ten_user}
                            onChange={handleChange}
                            placeholder="Nhập tên nhân viên"
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            placeholder="Nhập email"
                        />
                    </Form.Group>
                    <Form.Group controlId="formGioiTinh">
                        <Form.Label>Giới tính:</Form.Label>
                        <Form.Control
                            type="text"
                            name="GioiTinh"
                            value={formData.GioiTinh}
                            onChange={handleChange}
                            placeholder="Nhập giới tính"
                        />
                    </Form.Group>
                    <Form.Group controlId="formNgaySinh">
                        <Form.Label>Ngày sinh:</Form.Label>
                        <Form.Control
                            type="date"
                            name="NgaySinh"
                            value={formData.NgaySinh}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMaBaiXe">
                        <Form.Label>Mã bãi xe:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ma_BaiXe"
                            value={formData.Ma_BaiXe}
                            onChange={handleChange}
                            placeholder="Nhập mã bãi xe"
                        />
                    </Form.Group>
                    <Form.Group controlId="formMaBaiXe">
                        <Form.Label>Mã quyền:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ma_BaiXe"
                            value={formData.Ma_Quyen}
                            onChange={handleChange}
                            placeholder="Nhập mã bãi xe"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Lưu thay đổi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EmployeeEdit;
