import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import BaiXeService from '../services/baixe.service'; // Import BaiXeService
import { toast } from 'react-toastify'; // Import react-toastify for notifications

function BaiXeEdit({ show, handleClose, baiXe, refreshData }) {
    // State to store form data
    const [formData, setFormData] = useState({
        Ma_BaiXe: '',
        Ten_BaiXe: '',
        Ma_DV: '',
        So_ViTriTong: '',
        So_ViTriDaDung: ''
    });

    // Update form data when `baiXe` prop changes
    useEffect(() => {
        if (baiXe) {
            setFormData({
                Ma_BaiXe: baiXe.Ma_BaiXe || '',
                Ten_BaiXe: baiXe.Ten_BaiXe || '',
                Ma_DV: baiXe.Ma_DV || '',
                So_ViTriTong: baiXe.So_ViTriTong || '',
                So_ViTriDaDung: baiXe.So_ViTriDaDung || ''
            });
        }
    }, [baiXe]);

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
            const response = await BaiXeService.update(baiXe.Ma_BaiXe, formData);
            console.log("Update response:", response);

            toast.success("Cập nhật thành công!");
            refreshData(); // Refresh the BaiXe data after the update
            handleClose(); // Close the modal
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update parking lot. Please try again.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin bãi xe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formMaBaiXe">
                        <Form.Label>Mã bãi xe:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ma_BaiXe"
                            value={formData.Ma_BaiXe}
                            onChange={handleChange}
                            placeholder="Nhập mã bãi xe"
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controlId="formMaDV">
                        <Form.Label>Mã đơn vị:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ma_DV"
                            value={formData.Ma_DV}
                            onChange={handleChange}
                            placeholder="Nhập mã đơn vị"
                        />
                    </Form.Group>
                    <Form.Group controlId="formTenBaiXe">
                        <Form.Label>Tên bãi xe:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ten_BaiXe"
                            value={formData.Ten_BaiXe}
                            onChange={handleChange}
                            placeholder="Nhập tên bãi xe"
                        />
                    </Form.Group>
                    <Form.Group controlId="formSoViTriTong">
                        <Form.Label>Số lượng vị trí:</Form.Label>
                        <Form.Control
                            type="number"
                            name="So_ViTriTong"
                            value={formData.So_ViTriTong}
                            onChange={handleChange}
                            placeholder="Nhập số lượng vị trí"
                        />
                    </Form.Group>
                    <Form.Group controlId="formSoViTriDaDung">
                        <Form.Label>Số vị trí đã dùng:</Form.Label>
                        <Form.Control
                            type="number"
                            name="So_ViTriDaDung"
                            value={formData.So_ViTriDaDung}
                            onChange={handleChange}
                            placeholder="Nhập số vị trí đã dùng"
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

export default BaiXeEdit;
