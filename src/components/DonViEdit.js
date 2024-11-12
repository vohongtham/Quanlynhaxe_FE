import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DonViService from '../services/donvi.service'; // Import DonViService
import { toast } from 'react-toastify'; // Import react-toastify for notifications

function DonViEdit({ show, handleClose, donVi, refreshData }) {
    // State to store form data
    const [formData, setFormData] = useState({
        Ma_DV: '',
        TenDV: ''
    });

    // Update form data when `donVi` prop changes
    useEffect(() => {
        if (donVi) {
            setFormData({
                Ma_DV: donVi.Ma_DV || '',
                TenDV: donVi.TenDV || ''
            });
        }
    }, [donVi]);

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
            const response = await DonViService.update(donVi.Ma_DV, formData);
            console.log("Update response:", response);

            toast.success("Cập nhật thành công!");
            refreshData(); // Refresh the DonVi data after the update
            handleClose(); // Close the modal
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update unit. Please try again.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật thông tin đơn vị</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formMaDV">
                        <Form.Label>Mã đơn vị:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ma_DV"
                            value={formData.Ma_DV}
                            onChange={handleChange}
                            placeholder="Nhập mã đơn vị"
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controlId="formTenDV">
                        <Form.Label>Tên đơn vị:</Form.Label>
                        <Form.Control
                            type="text"
                            name="TenDV"
                            value={formData.TenDV}
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

export default DonViEdit;
