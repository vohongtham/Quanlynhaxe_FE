import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import StudentService from '../services/student.service'; // Import StudentService
import { toast } from 'react-toastify'; // Import react-toastify for notifications

function StudentEdit({ show, handleClose, student, refreshData }) {
    // State to store form data
    const [formData, setFormData] = useState({
        Mssv: '',
        Ten_SV: '',
        Email: '',
        Ma_Lop: '',
        NgaySinh: '',
        GioiTinh: '',
        SDT: ''
    });

    // Update form data when `student` prop changes
    useEffect(() => {
        if (student) {
            setFormData({
                Mssv: student.Mssv || '',
                Ten_SV: student.Ten_SV || '',
                Email: student.Email || '',
                Ma_Lop: student.Ma_Lop || '',
                NgaySinh: student.NgaySinh || '',
                GioiTinh: student.GioiTinh || '',
                SDT: student.SDT || ''
            });
        }
    }, [student]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // console.log("refreshData:", refreshData);
    // Handle form submit
    const handleSubmit = async () => {
        try {
            const response = await StudentService.update(student.Mssv, formData);
    
            if (response?.message === "Update success!") {
                toast.success("Student updated successfully!");
                refreshData?.(); // Call refreshData if it exists
                handleClose();
            } else {
                toast.error("Failed to update student. Please check the details and try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        }
    };
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật thông tin sinh viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formMssv">
                        <Form.Label>Mã số sinh viên:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Mssv"
                            value={formData.Mssv}
                            onChange={handleChange}
                            placeholder="Enter Mssv"
                        />
                    </Form.Group>
                    <Form.Group controlId="formTenSV">
                        <Form.Label>Tên sinh viên:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ten_SV"
                            value={formData.Ten_SV}
                            onChange={handleChange}
                            placeholder="Enter student name"
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            placeholder="Enter email"
                        />
                    </Form.Group>
                    <Form.Group controlId="formMaLop">
                        <Form.Label>Mã lớp:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ma_Lop"
                            value={formData.Ma_Lop}
                            onChange={handleChange}
                            placeholder="Enter class code"
                        />
                    </Form.Group>
                    <Form.Group controlId="formGioiTinh">
                        <Form.Label>Giới tính:</Form.Label>
                        <Form.Control
                            type="text"
                            name="GioiTinh"
                            value={formData.GioiTinh}
                            onChange={handleChange}
                            placeholder="Enter gender"
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
                    <Form.Group controlId="formSDT">
                        <Form.Label>SDT:</Form.Label>
                        <Form.Control
                            type="text"
                            name="SDT"
                            value={formData.SDT}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Lưu
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StudentEdit;
