import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import ClassService from '../services/class.service'; // Import ClassService to handle API requests
import { toast } from 'react-toastify'; // Import react-toastify for notifications
import NganhService from '../services/nganh.service';
function ClassAdd({ show, handleClose, refreshData }) {

    const [nganhOptions, setNganhOptions] = useState([]);

    useEffect(() => {
        // Fetch class options from API
        const fetchNganhOptions = async () => {
            try {
                const response = await NganhService.getAll();
                console.log('Ngành học options:', response); // Kiểm tra cấu trúc dữ liệu
                setNganhOptions(response);
            } catch (error) {
                toast.error(`Lấy dữ liệu ngành học thất bại: ${error.message}`);
            }
        };

        fetchNganhOptions();
    }, []);

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        maLop: Yup.string().required('Mã lớp không được bỏ trống.'),
        tenLop: Yup.string().required('Tên lớp không được bỏ trống.'),
        maNganh: Yup.string().required('Mã ngành không được bỏ trống.')
    });

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        const formattedValues = {
            Ma_Lop: values.maLop,
            TenLop: values.tenLop,
            Ma_Nganh: values.maNganh
        };

        try {
            await ClassService.add(formattedValues); // API call to add the class
            toast.success('Thêm lớp thành công!');
            refreshData();  // Refresh data in the parent component
            handleClose();  // Close modal on success
        } catch (error) {
            console.error('Error details:', error.response || error);
            toast.error(`Thêm lớp thất bại: ${error.response?.data?.message || error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm lớp mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        maLop: '',
                        tenLop: '',
                        maNganh: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <FormikForm>
                            <Form.Group controlId="formMaLop">
                                <Form.Label>Mã lớp:</Form.Label>
                                <Field
                                    type="text"
                                    name="maLop"
                                    className="form-control"
                                    placeholder="Nhập mã lớp"
                                />
                                <ErrorMessage name="maLop" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formTenLop">
                                <Form.Label>Tên lớp:</Form.Label>
                                <Field
                                    type="text"
                                    name="tenLop"
                                    className="form-control"
                                    placeholder="Nhập tên lớp"
                                />
                                <ErrorMessage name="tenLop" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formMaNganh">
                                <Form.Label>Mã ngành:</Form.Label>
                                <Field as="select" name="maNganh" className="form-control">
                                    <option value="">Chọn mã ngành</option>
                                    {nganhOptions.map((option) => (
                                        <option key={option.Ma_Nganh} value={option.Ma_Nganh}>
                                            {option.Ma_Nganh} - {option.TenNganh}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="maNganh" component="div" className="text-danger" />
                            </Form.Group>
                            <div className="mt-3 d-flex justify-content-end">
                                <Button type="submit" variant="primary" disabled={isSubmitting} className="me-2">
                                    {isSubmitting ? 'Đang thêm lớp...' : 'Thêm lớp'}
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                            </div>
                        </FormikForm>
                    )}
                </Formik>
            </Modal.Body>
            {/* <Modal.Footer /> */}
        </Modal>
    );
}

export default ClassAdd;
