import React, { useEffect, useState } from 'react'; // Thêm useEffect và useState
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import BaiXeService from '../services/baixe.service'; // Import BaiXeService to handle API requests
import DonviService from '../services/donvi.service';
import { toast } from 'react-toastify'; // Import react-toastify for notifications
// import { useNavigate } from 'react-router-dom';

function BaiXeAdd({ show, handleClose, refreshData }) {
    // const navigate = useNavigate();
    const [donViOptions, setDonviOptions] = useState([]);

    useEffect(() => {
        // Fetch class options from API
        const fetchDonviOptions = async () => {
            try {
                const response = await DonviService.getAll();
                console.log('Đơn vị options:', response); // Kiểm tra cấu trúc dữ liệu
                setDonviOptions(response);
            } catch (error) {
                toast.error(`Lấy dữ liệu đơn vị thất bại: ${error.message}`);
            }
        };

        fetchDonviOptions();
    }, []);

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        maBaiXe: Yup.string().required('Mã bãi xe không được bỏ trống.'),
        maDV: Yup.string().required('Mã đơn vị không được bỏ trống.'),
        tenBaiXe: Yup.string().required('Tên bãi xe không được bỏ trống.'),
        soViTriTong: Yup.number().required('Số vị trí tổng không được bỏ trống.')
            .positive('Số vị trí tổng phải là số dương')
            .integer('Số vị trí tổng phải là số nguyên'),
    });

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        const formattedValues = {
            Ma_BaiXe: values.maBaiXe,
            Ma_DV: values.maDV,
            Ten_BaiXe: values.tenBaiXe,
            So_ViTriTong: values.soViTriTong,
        };

        try {
            await BaiXeService.add(formattedValues);
            toast.success('Thêm bãi xe thành công!');
            refreshData();  // Refresh data in the parent component
            handleClose();  // Close modal on success
        } catch (error) {
            console.error('Error details:', error.response || error);
            toast.error(`Thêm bãi xe thất bại: ${error.response?.data?.message || error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm bãi xe mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        maBaiXe: '',
                        maDV: '',
                        tenBaiXe: '',
                        soViTriTong: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <FormikForm>
                            <Form.Group controlId="formMaBaiXe">
                                <Form.Label>Mã bãi xe:</Form.Label>
                                <Field
                                    type="text"
                                    name="maBaiXe"
                                    className="form-control"
                                    placeholder="Nhập mã bãi xe"
                                />
                                <ErrorMessage name="maBaiXe" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formMaDV">
                                <Form.Label>Mã đơn vị (Trường/Khoa):</Form.Label>
                                <Field as="select" name="maDV" className="form-control">
                                    <option value="">Chọn mã đơn vị</option>
                                    {donViOptions.map((option) => (
                                        <option key={option.Ma_DV} value={option.Ma_DV}>
                                            {option.Ma_DV} - {option.TenDV}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="maDV" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formTenBaiXe">
                                <Form.Label>Tên bãi xe:</Form.Label>
                                <Field
                                    type="text"
                                    name="tenBaiXe"
                                    className="form-control"
                                    placeholder="Nhập tên bãi xe"
                                />
                                <ErrorMessage name="tenBaiXe" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formSoViTriTong">
                                <Form.Label>Số lượng vị trí:</Form.Label>
                                <Field
                                    type="number"
                                    name="soViTriTong"
                                    className="form-control"
                                    placeholder="Nhập số lượng vị trí"
                                />
                                <ErrorMessage name="soViTriTong" component="div" className="text-danger" />
                            </Form.Group>

                            <div className="mt-3 d-flex justify-content-end">
                                <Button type="submit" variant="primary" disabled={isSubmitting} className="me-2">
                                    {isSubmitting ? 'Đang thêm bãi xe...' : 'Thêm bãi xe'}
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                            </div>
                        </FormikForm>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default BaiXeAdd;
