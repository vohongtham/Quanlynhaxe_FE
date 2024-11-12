import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import NganhService from '../services/nganh.service'; // Import NganhService
import { toast } from 'react-toastify'; // Import react-toastify for notifications

function NganhEdit({ show, handleClose, nganh, refreshData }) {
    // State to store form data
    const [formData, setFormData] = useState({
        Ma_Nganh: '',
        TenNganh: '',
        Ma_DV: '',
    });

    // Update form data when `nganh` prop changes
    useEffect(() => {
        if (nganh) {
            setFormData({
                Ma_Nganh: nganh.Ma_Nganh || '',
                TenNganh: nganh.TenNganh || '',
                Ma_DV: nganh.Ma_DV || ''
            });
        }
    }, [nganh]);

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
            const response = await NganhService.update(nganh.Ma_Nganh, formData);
            console.log("Update response:", response);

            toast.success("Cập nhật ngành thành công!");
            refreshData(); // Refresh the Nganh data after the update
            handleClose(); // Close the modal
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Cập nhật ngành thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật thông tin ngành</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formMaNganh">
                        <Form.Label>Mã ngành:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ma_Nganh"
                            value={formData.Ma_Nganh}
                            onChange={handleChange}
                            placeholder="Nhập mã ngành"
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controlId="formTenNganh">
                        <Form.Label>Tên ngành:</Form.Label>
                        <Form.Control
                            type="text"
                            name="TenNganh"
                            value={formData.TenNganh}
                            onChange={handleChange}
                            placeholder="Nhập tên ngành"
                        />
                    </Form.Group>
                    <Form.Group controlId="formMaDV">
                        <Form.Label>Tên đơn vị (Trường/Khoa):</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ma_DV"
                            value={formData.Ma_DV}
                            onChange={handleChange}
                            placeholder="Nhập tên đơn vị"
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

export default NganhEdit;
