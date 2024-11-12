import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ClassService from '../services/class.service'; // Import ClassService for API requests
import { toast } from 'react-toastify'; // Import react-toastify for notifications

function ClassEdit({ show, handleClose, lop, refreshData }) {
    // State to store form data
    const [formData, setFormData] = useState({
        Ma_Lop: '',
        TenLop: '',
        Ma_Nganh: '',
    });

    // Update form data when `lop` prop changes
    useEffect(() => {
        if (lop) {
            setFormData({
                Ma_Lop: lop.Ma_Lop || '',
                TenLop: lop.TenLop || '',
                Ma_Nganh: lop.Ma_Nganh || ''
            });
        }
    }, [lop]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const response = await ClassService.update(lop.Ma_Lop, formData);
            console.log("Update response:", response);

            toast.success("Cập nhật lớp thành công!");
            refreshData(); // Refresh the class data after the update
            handleClose(); // Close the modal
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Cập nhật lớp thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật thông tin lớp</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formMaLop">
                        <Form.Label>Mã lớp:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ma_Lop"
                            value={formData.Ma_Lop}
                            onChange={handleChange}
                            placeholder="Nhập mã lớp"
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controlId="formTenLop">
                        <Form.Label>Tên lớp:</Form.Label>
                        <Form.Control
                            type="text"
                            name="TenLop"
                            value={formData.TenLop}
                            onChange={handleChange}
                            placeholder="Nhập tên lớp"
                        />
                    </Form.Group>
                    <Form.Group controlId="formMaNganh">
                        <Form.Label>Mã Ngành:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ma_Nganh"
                            value={formData.Ma_Nganh}
                            onChange={handleChange}
                            placeholder="Nhập mã ngành"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Lưu thay đổi
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ClassEdit;
