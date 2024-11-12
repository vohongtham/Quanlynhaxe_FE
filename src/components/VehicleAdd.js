import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import '../assets/styles/main.css';
import { useNavigate } from 'react-router-dom';
import VehicleService from '../services/vehicle.service';
import LoaixeService from '../services/loaixe.service';
import { Form as BootstrapForm, Button, Row, Col } from 'react-bootstrap';
import Navbar from "../components/Navbar";

function VehicleAdd() {
    const navigate = useNavigate();
    const [loaiXeOptions, setLoaixeOptions] = useState([]);

    useEffect(() => {
        // Fetch class options from API
        const fetchLoaixeOptions = async () => {
            try {
                const response = await LoaixeService.getAll();
                console.log('Đơn vị options:', response); // Kiểm tra cấu trúc dữ liệu
                setLoaixeOptions(response);
            } catch (error) {
                toast.error(`Lấy dữ liệu loại xe thất bại: ${error.message}`);
            }
        };

        fetchLoaixeOptions();
    }, []);

    const validationSchema = Yup.object().shape({
        bienSoXe: Yup.string().required('Biển số xe không được bỏ trống.'),
        mssv: Yup.string().required('MSSV không được bỏ trống.'),
        soKhungXe: Yup.string().required('Số khung xe không được bỏ trống.'),
        tenChuXe: Yup.string().required('Tên chủ xe không được bỏ trống.'),
        loaiXe: Yup.string().required('Loại xe không được bỏ trống.'),
        dungTich: Yup.number().required('Dung tích không được bỏ trống.'),
        nhanHieu: Yup.string().required('Nhãn hiệu không được bỏ trống.'),
        mauXe: Yup.string().required('Màu xe không được bỏ trống.'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const formattedValues = {
            BienSoXe: values.bienSoXe,
            Mssv: values.mssv,
            SoKhungXe: values.soKhungXe,
            TenChuXe: values.tenChuXe,
            LoaiXe: values.loaiXe,
            DungTich: values.dungTich,
            NhanHieu: values.nhanHieu,
            MauXe: values.mauXe,
        };

        try {
            await VehicleService.add(formattedValues);
            toast.success("Thêm xe thành công!");
            navigate('/vehicles');
        } catch (error) {
            console.error('Error details:', error.response || error);
            toast.error(`Thêm xe thất bại: ${error.response?.data?.message || error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Navbar />
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                    <h2 className="text-center mb-2">Thêm Xe</h2>
                        <div className="mt-2 col-md-8 col-lg-6">
                            <Formik
                                initialValues={{
                                    bienSoXe: '',
                                    mssv: '',
                                    soKhungXe: '',
                                    tenChuXe: '',
                                    loaiXe: '',
                                    dungTich: '',
                                    nhanHieu: '',
                                    mauXe: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form as={BootstrapForm}>
                                        

                                        <Row>
                                            <Col md={6}>
                                                <BootstrapForm.Group controlId="bienSoXe">
                                                    <BootstrapForm.Label>Biển số xe</BootstrapForm.Label>
                                                    <Field name="bienSoXe" type="text" as={BootstrapForm.Control} placeholder="Nhập biển số xe" />
                                                    <ErrorMessage name="bienSoXe" component="div" className="text-danger" />
                                                </BootstrapForm.Group>
                                            </Col>
                                            <Col md={6}>
                                                <BootstrapForm.Group controlId="mssv">
                                                    <BootstrapForm.Label>MSSV</BootstrapForm.Label>
                                                    <Field name="mssv" type="text" as={BootstrapForm.Control} placeholder="Nhập MSSV" />
                                                    <ErrorMessage name="mssv" component="div" className="text-danger" />
                                                </BootstrapForm.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <BootstrapForm.Group controlId="soKhungXe">
                                                    <BootstrapForm.Label>Số khung xe</BootstrapForm.Label>
                                                    <Field name="soKhungXe" type="text" as={BootstrapForm.Control} placeholder="Nhập số khung xe" />
                                                    <ErrorMessage name="soKhungXe" component="div" className="text-danger" />
                                                </BootstrapForm.Group>
                                            </Col>
                                            <Col md={6}>
                                                <BootstrapForm.Group controlId="tenChuXe">
                                                    <BootstrapForm.Label>Tên chủ xe</BootstrapForm.Label>
                                                    <Field name="tenChuXe" type="text" as={BootstrapForm.Control} placeholder="Nhập tên chủ xe" />
                                                    <ErrorMessage name="tenChuXe" component="div" className="text-danger" />
                                                </BootstrapForm.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <BootstrapForm.Group controlId="loaiXe">
                                                    <BootstrapForm.Label>Loại xe</BootstrapForm.Label>
                                                    <Field as="select" name="loaiXe" className="form-control form-control-sg custom-select">
                                                        <option value="">Chọn loại xe</option>
                                                        {loaiXeOptions.map((option) => (
                                                            <option key={option.LoaiXe} value={option.LoaiXe}>
                                                                {option.LoaiXe}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="loaiXe" component="div" className="text-danger" />
                                                </BootstrapForm.Group>
                                            </Col>
                                            <Col md={6}>
                                                <BootstrapForm.Group controlId="dungTich">
                                                    <BootstrapForm.Label>Dung tích</BootstrapForm.Label>
                                                    <Field name="dungTich" type="text" as={BootstrapForm.Control} placeholder="Nhập dung tích" />
                                                    <ErrorMessage name="dungTich" component="div" className="text-danger" />
                                                </BootstrapForm.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <BootstrapForm.Group controlId="nhanHieu">
                                                    <BootstrapForm.Label>Nhãn hiệu</BootstrapForm.Label>
                                                    <Field name="nhanHieu" type="text" as={BootstrapForm.Control} placeholder="Nhập nhãn hiệu" />
                                                    <ErrorMessage name="nhanHieu" component="div" className="text-danger" />
                                                </BootstrapForm.Group>
                                            </Col>
                                            <Col md={6}>
                                                <BootstrapForm.Group controlId="mauXe">
                                                    <BootstrapForm.Label>Màu xe</BootstrapForm.Label>
                                                    <Field name="mauXe" type="text" as={BootstrapForm.Control} placeholder="Nhập màu xe" />
                                                    <ErrorMessage name="mauXe" component="div" className="text-danger" />
                                                </BootstrapForm.Group>
                                            </Col>
                                        </Row>

                                        <div className="text-center mt-3">
                                            <Button type="submit" variant="primary" disabled={isSubmitting}>
                                                {isSubmitting ? 'Đang thêm xe...' : 'Thêm Xe'}
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default VehicleAdd;
