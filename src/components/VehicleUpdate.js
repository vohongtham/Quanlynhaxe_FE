import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import VehicleService from '../services/vehicle.service';
import { toast } from 'react-toastify';

const VehicleUpdate = ({ vehicleInfo, onClose, fetchVehicleData }) => {
    const [formData, setFormData] = useState({
        BienSoXe: '',
        Mssv: '',
        SoKhungXe: '',
        TenChuXe: '',
        LoaiXe: '',
        DungTich: '',
        NhanHieu: '',
        MauXe: '',
    });
    const [loading, setLoading] = useState(false);

    // Cập nhật formData khi vehicleInfo thay đổi
    useEffect(() => {
        if (vehicleInfo) {
            setFormData(vehicleInfo);
        }
    }, [vehicleInfo]);

    // Xử lý thay đổi trên các trường input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Xử lý sự kiện submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await VehicleService.update(formData.BienSoXe, formData);
            toast.success('Cập nhật thông tin xe thành công!');
            fetchVehicleData(); // Lấy lại thông tin phương tiện
            onClose(); // Đóng modal
        } catch (error) {
            console.error(error);
            toast.error('Cập nhật không thành công, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="BienSoXe">
                <Form.Label className="form-label-bold">Biển Số Xe</Form.Label>
                <Form.Control
                    type="text"
                    name="BienSoXe"
                    value={formData.BienSoXe}
                    onChange={handleChange}
                    required
                    placeholder="Nhập biển số xe"
                />
            </Form.Group>
            <Form.Group controlId="Mssv">
                <Form.Label className="form-label-bold">MSSV</Form.Label>
                <Form.Control
                    type="text"
                    name="Mssv"
                    value={formData.Mssv}
                    onChange={handleChange}
                    required
                    placeholder="Nhập MSSV"
                />
            </Form.Group>
            <Form.Group controlId="SoKhungXe">
                <Form.Label className="form-label-bold">Số Khung Xe</Form.Label>
                <Form.Control
                    type="text"
                    name="SoKhungXe"
                    value={formData.SoKhungXe}
                    onChange={handleChange}
                    required
                    placeholder="Nhập số khung xe"
                />
            </Form.Group>
            <Form.Group controlId="TenChuXe">
                <Form.Label className="form-label-bold">Tên Chủ Xe</Form.Label>
                <Form.Control
                    type="text"
                    name="TenChuXe"
                    value={formData.TenChuXe}
                    onChange={handleChange}
                    required
                    placeholder="Nhập tên chủ xe"
                />
            </Form.Group>
            <Form.Group controlId="LoaiXe">
                <Form.Label className="form-label-bold">Loại Xe</Form.Label>
                <Form.Control
                    type="text"
                    name="LoaiXe"
                    value={formData.LoaiXe}
                    onChange={handleChange}
                    required
                    placeholder="Nhập loại xe"
                />
            </Form.Group>
            <Form.Group controlId="DungTich">
                <Form.Label className="form-label-bold">Dung Tích</Form.Label>
                <Form.Control
                    type="text"
                    name="DungTich"
                    value={formData.DungTich}
                    onChange={handleChange}
                    required
                    placeholder="Nhập dung tích"
                />
            </Form.Group>
            <Form.Group controlId="NhanHieu">
                <Form.Label className="form-label-bold">Nhà Sản Xuất</Form.Label>
                <Form.Control
                    type="text"
                    name="NhanHieu"
                    value={formData.NhanHieu}
                    onChange={handleChange}
                    required
                    placeholder="Nhập nhà sản xuất"
                />
            </Form.Group>
            <Form.Group controlId="MauXe">
                <Form.Label className="form-label-bold">Màu Xe</Form.Label>
                <Form.Control
                    type="text"
                    name="MauXe"
                    value={formData.MauXe}
                    onChange={handleChange}
                    required
                    placeholder="Nhập màu xe"
                />
            </Form.Group>
            <div className="d-flex justify-content-end" style={{ marginTop: '16px' }}>
                <Button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Đang cập nhật...' : 'Lưu'}
                </Button>
            </div>
        </Form>
    );
};

export default VehicleUpdate;
