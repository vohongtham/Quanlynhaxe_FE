import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import LoaiXeService from '../services/loaixe.service'; // Import LoaiXeService for handling API calls
import { toast } from 'react-toastify'; // Import react-toastify for notifications

function LoaiXeEdit({ show, handleClose, loaiXe, refreshData }) {
    // State to store form data
    const [formData, setFormData] = useState({
        LoaiXe: '', // Initialize with an empty string
        Gia: ''     // Initialize with an empty string
    });

    // Update form data when `loaiXe` prop changes
    useEffect(() => {
        if (loaiXe) {
            setFormData({
                LoaiXe: loaiXe.LoaiXe || '', // Ensure it defaults to an empty string
                Gia: loaiXe.Gia || ''         // Ensure it defaults to an empty string
            });
        }
    }, [loaiXe]);

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
            const response = await LoaiXeService.update(loaiXe.LoaiXe, formData);
            console.log("Update response:", response);

            // Check if the response indicates success
            if (response && response.message) {
                toast.success("Cập nhật loại xe thành công!");
                refreshData(); // Refresh the LoaiXe data after the update
                handleClose(); // Close the modal
            } else {
                throw new Error("Cập nhật không thành công. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Cập nhật không thành công. Vui lòng thử lại!");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin loại xe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formLoaiXe">
                        <Form.Label>Tên loại xe:</Form.Label>
                        <Form.Control
                            type="text"
                            name="LoaiXe"
                            value={formData.LoaiXe}
                            onChange={handleChange}
                            placeholder="Nhập tên loại xe"
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controlId="formGia">
                        <Form.Label>Giá tiền:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Gia"
                            value={formData.Gia}
                            onChange={handleChange}
                            placeholder="Nhập giá tiền"
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

export default LoaiXeEdit;
