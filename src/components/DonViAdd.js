import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import DonViService from '../services/donvi.service'; // Import DonViService to handle API requests
import { toast } from 'react-toastify'; // Import react-toastify for notifications
import { useNavigate } from 'react-router-dom';

function DonViAdd({ show, handleClose, refreshData }) {
    const navigate = useNavigate();

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        maDV: Yup.string().required('Mã đơn vị không được bỏ trống.'),
        tenDV: Yup.string().required('Tên đơn vị không được bỏ trống.')
    });

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        const formattedValues = {
            Ma_DV: values.maDV,
            TenDV: values.tenDV
        };

        try {
            await DonViService.add(formattedValues);
            toast.success('Thêm đơn vị thành công!');
            refreshData();  // Refresh data in the parent component
            handleClose();  // Close modal on success
        } catch (error) {
            console.error('Error details:', error.response || error);
            toast.error(`Thêm đơn vị thất bại: ${error.response?.data?.message || error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm đơn vị mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        maDV: '',
                        tenDV: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <FormikForm>
                            <Form.Group controlId="formMaDV">
                                <Form.Label>Mã đơn vị:</Form.Label>
                                <Field
                                    type="text"
                                    name="maDV"
                                    className="form-control"
                                    placeholder="Nhập mã đơn vị"
                                />
                                <ErrorMessage name="maDV" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formTenDV">
                                <Form.Label>Tên đơn vị:</Form.Label>
                                <Field
                                    type="text"
                                    name="tenDV"
                                    className="form-control"
                                    placeholder="Nhập tên đơn vị"
                                />
                                <ErrorMessage name="tenDV" component="div" className="text-danger" />
                            </Form.Group>
                            <div className="mt-3 d-flex justify-content-end">
                                <Button type="submit" variant="primary" disabled={isSubmitting} className="me-2">
                                    {isSubmitting ? 'Đang thêm đơn vị...' : 'Thêm đơn vị'}
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

export default DonViAdd;
