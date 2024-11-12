import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import NganhService from '../services/nganh.service'; // Import NganhService to handle API requests
import { toast } from 'react-toastify'; // Import react-toastify for notifications
import DonviService from '../services/donvi.service';

function NganhAdd({ show, handleClose, refreshData }) {
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
        maNganh: Yup.string().required('Mã ngành không được bỏ trống.'),
        tenNganh: Yup.string().required('Tên ngành không được bỏ trống.'),
        maDV: Yup.string().required('Mã đơn vị không được bỏ trống.')

    });

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        const formattedValues = {
            Ma_Nganh: values.maNganh,
            TenNganh: values.tenNganh,
            Ma_DV: values.maDV
        };

        try {
            await NganhService.add(formattedValues);
            toast.success('Thêm ngành thành công!');
            refreshData();  // Refresh data in the parent component
            handleClose();  // Close modal on success
        } catch (error) {
            console.error('Error details:', error.response || error);
            toast.error(`Thêm ngành thất bại: ${error.response?.data?.message || error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm ngành mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        maNganh: '',
                        tenNganh: '',
                        maDV: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <FormikForm>
                            <Form.Group controlId="formMaNganh">
                                <Form.Label>Mã ngành:</Form.Label>
                                <Field
                                    type="text"
                                    name="maNganh"
                                    className="form-control"
                                    placeholder="Nhập mã ngành"
                                />
                                <ErrorMessage name="maNganh" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formTenNganh">
                                <Form.Label>Tên ngành:</Form.Label>
                                <Field
                                    type="text"
                                    name="tenNganh"
                                    className="form-control"
                                    placeholder="Nhập tên ngành"
                                />
                                <ErrorMessage name="tenNganh" component="div" className="text-danger" />
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
                            <div className="mt-3 d-flex justify-content-end">
                                <Button type="submit" variant="primary" disabled={isSubmitting} className="me-2">
                                    {isSubmitting ? 'Đang thêm ngành...' : 'Thêm ngành'}
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

export default NganhAdd;
