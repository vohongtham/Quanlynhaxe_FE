import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import UserService from '../services/user.service';
import { Link, useNavigate } from 'react-router-dom';
import { Form as BootstrapForm, Button, Alert, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
// import Navbar from "../components/Navbar";

const EmployeeAdd = () => {
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState('');

    // Define the validation schema using Yup
    const validationSchema = Yup.object().shape({
        Ten_user: Yup.string().required('Tên nhân viên không được bỏ trống.'),
        Email: Yup.string().email('Email không hợp lệ.').required('Email không được bỏ trống.'),
        Password: Yup.string()
            .required('Mật khẩu không được bỏ trống.')
            .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!]).*$/, 'Mật khẩu phải chứa ít nhất một chữ viết hoa, một chữ viết thường, một số và một ký tự đặc biệt.'),
        GioiTinh: Yup.string().required('Giới tính không được bỏ trống.'),
        NgaySinh: Yup.date().required('Ngày sinh không được bỏ trống.'),
        Ma_BaiXe: Yup.string().required('Mã bãi xe không được bỏ trống.'),
        Ma_Quyen: Yup.string().required('Mã quyền không được bỏ trống.'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const data = await UserService.add(values);
            console.log('Server Response:', data);
            toast.success('Nhân viên đã được thêm thành công!');  // Hiển thị thông báo thành công
            navigate('/employees')
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Server Error:', error.response.data);
                toast.error(error.response.data.message || 'Thêm nhân viên không thành công do lỗi từ máy chủ.');  // Hiển thị lỗi từ server
            } else {
                console.error('Error:', error);
                toast.error('Email đã được sử dụng.');  // Hiển thị lỗi chung
            }
        }
        setSubmitting(false);
    };
    return (
        <div>
            {/* <Navbar/> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/admin/page"><i className="bi bi-house-fill" style={{ marginRight: '8px'}}></i>Home</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="navbar-brand" to="/employees">Danh sách nhân viên</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='container'>
                <div className="row justify-content-center align-items-center">
                    <h3 className="text-center mb-2">Thêm Nhân Viên Mới</h3>
                    <div className="mt-2 col-md-8 col-lg-6">
                        <Formik
                            initialValues={{
                                Ten_user: '',
                                Email: '',
                                Password: '',
                                GioiTinh: '',
                                NgaySinh: '',
                                Ma_BaiXe: '',
                                Ma_Quyen: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <BootstrapForm.Group controlId="Ten_user">
                                        <BootstrapForm.Label>Tên nhân viên</BootstrapForm.Label>
                                        <Field
                                            type="text"
                                            name="Ten_user"
                                            as={InputField}
                                            placeholder="Nhập tên nhân viên"
                                        />
                                        <ErrorMessage name="Ten_user" component="div" className="text-danger" />
                                    </BootstrapForm.Group>

                                    <BootstrapForm.Group controlId="Email">
                                        <BootstrapForm.Label>Email</BootstrapForm.Label>
                                        <Field
                                            type="email"
                                            name="Email"
                                            as={InputField}
                                            placeholder="Nhập Email"
                                        />
                                        <ErrorMessage name="Email" component="div" className="text-danger" />
                                    </BootstrapForm.Group>

                                    <BootstrapForm.Group controlId="Password">
                                        <BootstrapForm.Label>Password</BootstrapForm.Label>
                                        <Field
                                            type="password"
                                            name="Password"
                                            as={InputField}
                                            placeholder="Nhập mật khẩu"
                                        />
                                        <ErrorMessage name="Password" component="div" className="text-danger" />
                                    </BootstrapForm.Group>

                                    <Row>
                                        <Col md={6}>
                                            <BootstrapForm.Group controlId="GioiTinh">
                                                <BootstrapForm.Label>Giới tính</BootstrapForm.Label>
                                                <Field as="select" name="GioiTinh" className="form-control">
                                                    <option value="">Chọn giới tính</option>
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                    <option value="Khác">Khác</option>
                                                </Field>
                                                <ErrorMessage name="GioiTinh" component="div" className="text-danger" />
                                            </BootstrapForm.Group>
                                        </Col>

                                        <Col md={6}>
                                            <BootstrapForm.Group controlId="NgaySinh">
                                                <BootstrapForm.Label>Ngày Sinh</BootstrapForm.Label>
                                                <Field
                                                    type="date"
                                                    name="NgaySinh"
                                                    as={InputField}
                                                />
                                                <ErrorMessage name="NgaySinh" component="div" className="text-danger" />
                                            </BootstrapForm.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <BootstrapForm.Group controlId="Ma_BaiXe">
                                                <BootstrapForm.Label>Mã Bãi Xe</BootstrapForm.Label>
                                                <Field
                                                    name="Ma_BaiXe"
                                                    as={InputField}
                                                    placeholder="Nhập mã bãi xe"
                                                />
                                                <ErrorMessage name="Ma_BaiXe" component="div" className="text-danger" />
                                            </BootstrapForm.Group>
                                        </Col>

                                        <Col md={6}>
                                            <BootstrapForm.Group controlId="Ma_Quyen">
                                                <BootstrapForm.Label>Mã Quyền</BootstrapForm.Label>
                                                <Field
                                                    name="Ma_Quyen"
                                                    as={InputField}
                                                    placeholder="Nhập mã quyền của nhân viên"
                                                />
                                                <ErrorMessage name="Ma_Quyen" component="div" className="text-danger" />
                                            </BootstrapForm.Group>
                                        </Col>
                                    </Row>

                                    <div className="text-center mt-3">
                                        <Button type="submit" variant="primary" disabled={isSubmitting}>
                                            Thêm Nhân Viên
                                        </Button>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                        {responseMessage && <Alert variant="info" className="mt-3">{responseMessage}</Alert>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeAdd;







