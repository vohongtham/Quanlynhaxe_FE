import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import VehicleService from '../services/vehicle.service'; // Import VehicleService
import { toast } from 'react-toastify'; // Import react-toastify for notifications

function VehicleEdit({ show, handleClose, vehicle, refreshData }) {
    // State to store form data
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
    useEffect(() => {
        if (vehicle) {
            setFormData({
                BienSoXe: vehicle.BienSoXe || '',
                Mssv: vehicle.Mssv || '',
                SoKhungXe: vehicle.SoKhungXe || '',
                TenChuXe: vehicle.TenChuXe || '',
                LoaiXe: vehicle.LoaiXe || '',
                DungTich: vehicle.DungTich || '',
                NhanHieu: vehicle.NhanHieu || '',
                MauXe: vehicle.MauXe || ''
            });
        }
    }, [vehicle]);

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
            const response = await VehicleService.update(vehicle.BienSoXe, formData);
            console.log("Update response:", response);

            toast.success("Cập nhật thành công!");
            refreshData(); // Refresh the vehicle data after the update
            handleClose(); // Close the modal
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update vehicle. Please try again.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin xe</Modal.Title>
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
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controlId="formMssv">
                        <Form.Label>MSSV:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Mssv"
                            value={formData.Mssv}
                            onChange={handleChange}
                            placeholder="Nhập MSSV"
                            readOnly
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
                    Lưu thay đổi
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default VehicleEdit;
