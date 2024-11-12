import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import LoaiXeService from '../services/loaixe.service'; // Import LoaiXeService to handle API requests
import { toast } from 'react-toastify'; // Import react-toastify for notifications

function LoaiXeAdd({ show, handleClose, refreshData }) {

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        loaiXe: Yup.string().required('Tên loại xe không được bỏ trống.'),
        giatien: Yup.number().required('Giá tiền không được bỏ trống.').positive('Giá tiền phải là số dương.'),
    });

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        const formattedValues = {
            LoaiXe: values.loaiXe,
            Gia: values.giatien,
        };

        try {
            await LoaiXeService.add(formattedValues);
            toast.success('Thêm loại xe thành công!');
            refreshData();  // Refresh data in the parent component
            handleClose();  // Close modal on success
        } catch (error) {
            console.error('Error details:', error.response || error);
            toast.error(`Thêm loại xe thất bại: ${error.response?.data?.message || error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm loại xe mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        loaiXe: '',
                        giatien: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <FormikForm>
                            <Form.Group controlId="formLoaiXe">
                                <Form.Label>Tên loại xe:</Form.Label>
                                <Field
                                    type="text"
                                    name="loaiXe"
                                    className="form-control"
                                    placeholder="Nhập tên loại xe"
                                />
                                <ErrorMessage name="loaiXe" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formGia">
                                <Form.Label>Giá tiền:</Form.Label>
                                <Field
                                    type="text"
                                    name="giatien"
                                    className="form-control"
                                    placeholder="Nhập giá tiền"
                                />
                                <ErrorMessage name="giatien" component="div" className="text-danger" />
                            </Form.Group>
                            <div className="mt-3 d-flex justify-content-end">
                                <Button type="submit" variant="primary" disabled={isSubmitting} className="me-2">
                                    {isSubmitting ? 'Đang thêm loại xe...' : 'Thêm loại xe'}
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

export default LoaiXeAdd;
