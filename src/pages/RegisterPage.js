
import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'; // To display notifications
import '../assets/styles/main.css';
import { Link, useNavigate } from 'react-router-dom';
import LoginService from '../services/login.service'; // Import the LoginService
import LopService from '../services/class.service'; // Import the LopService

function RegisterPage() {
    const navigate = useNavigate();
    const [classOptions, setClassOptions] = useState([]);

    useEffect(() => {
        // Fetch class options from API
        const fetchClassOptions = async () => {
            try {
                const response = await LopService.getAll();
                console.log('Class options:', response); // Kiểm tra cấu trúc dữ liệu
                setClassOptions(response);
            } catch (error) {
                toast.error(`Lấy dữ liệu mã lớp thất bại: ${error.message}`);
            }
        };

        fetchClassOptions();
    }, []);

    const validationSchema = Yup.object().shape({
        mssv: Yup.string()
            .required('MSSV không được bỏ trống.')
            .matches(/^[A-Za-z0-9]+$/, 'MSSV chỉ được bao gồm chữ cái và số.'),
        name: Yup.string()
            .required('Tên không được bỏ trống.'),
        maLop: Yup.string()
            .required('Mã lớp không được bỏ trống.'),
        email: Yup.string()
            .email('Email không hợp lệ.')
            .required('Email không được bỏ trống.'),
        password: Yup.string()
            .required('Mật khẩu không được bỏ trống.')
            .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!]).*$/, 'Mật khẩu phải chứa ít nhất một chữ viết hoa, một chữ viết thường, một số và một ký tự đặc biệt.'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp.')
            .required('Vui lòng xác nhận mật khẩu.'),
        ngaySinh: Yup.date()
            .required('Nhập ngày sinh.'),
        gioiTinh: Yup.string()
            .required('Giới tính không được bỏ trống.'),
        sdt: Yup.string()
            .required('Số điện thoại không được bỏ trống.')
            .matches(/^[0-9]+$/, 'Số điện thoại phải là số.')
            .min(10, 'Số điện thoại phải có ít nhất 10 chữ số.'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        // Map the form values to match the backend structure
        const formattedValues = {
            Mssv: values.mssv,
            Ten_SV: values.name,
            Ma_Lop: values.maLop,
            Email: values.email,
            Password: values.password,
            NgaySinh: values.ngaySinh,
            GioiTinh: values.gioiTinh,
            SDT: values.sdt
        };
    
        console.log('Formatted values:', formattedValues); // Log formatted values to check
    
        try {
            await LoginService.register(formattedValues); // Send formatted values to the API
            toast.success("Đăng ký thành công!");
            navigate('/login');
        } catch (error) {
            console.error('Error details:', error.response || error);
            toast.error(`Đăng ký thất bại: ${error.response?.data?.message || error.message}`);
        } finally {
            setSubmitting(false);
        }
    };
    
    

    return (
        <section className="vh-90 d-flex justify-content-center align-items-center text-center">
            <div className="container-fluid h-custom bg-white text-dark">
                <div className="row justify-content-center align-items-center h-70">
                    <div className="col-md-8 col-lg-6">
                        <Formik
                            initialValues={{
                                mssv: '',
                                name: '',
                                maLop: '',
                                email: '',
                                password: '',
                                confirmPassword: '',
                                ngaySinh: '',
                                gioiTinh: '',
                                sdt: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <h2 className="text-center">Đăng Ký</h2>
                                    <div className='row'>
                                        <div className='col-md-6 pb-2'>
                                            <div className="form-outline mb-2">
                                                <Field name="mssv" type="text" className="form-control form-control-lg" placeholder="Nhập MSSV" />
                                                <ErrorMessage name="mssv" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                        <div className='col-md-6 pb-2'>
                                            <div className="form-outline mb-2">
                                                <Field name="name" type="text" className="form-control form-control-lg" placeholder="Nhập tên" />
                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6 pb-2'>
                                            <div className="form-outline mb-2">
                                                <Field as="select" name="maLop" className="form-control form-control-lg custom-select">
                                                    <option value="">Chọn mã lớp</option>
                                                    {classOptions.map((option) => (
                                                        <option key={option.Ma_Lop} value={option.Ma_Lop}>
                                                            {option.Ma_Lop} - {option.TenLop}
                                                        </option>
                                                    ))}
                                                </Field>

                                                {/* <Field name="maLop" type="text" className="form-control form-control-lg" placeholder="Nhập mã lớp" /> */}
                                                <ErrorMessage name="maLop" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                        <div className='col-md-6 pb-2'>
                                            <div className="form-outline mb-2">
                                                <Field name="email" type="email" className="form-control form-control-lg" placeholder="Nhập email" />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6 pb-2'>
                                            <div className="form-outline mb-2">
                                                <Field name="password" type="password" className="form-control form-control-lg" placeholder="Nhập mật khẩu" />
                                                <ErrorMessage name="password" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                        <div className='col-md-6 pb-2'>
                                            <div className="form-outline mb-2">
                                                <Field name="confirmPassword" type="password" className="form-control form-control-lg" placeholder="Nhập lại mật khẩu" />
                                                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6 pb-2'>
                                            <div className="form-outline mb-2">
                                                <Field name="ngaySinh" type="date" className="form-control form-control-lg" />
                                                <ErrorMessage name="ngaySinh" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                        <div className='col-md-6 pb-2'>
                                            <div className="form-outline mb-2">
                                                <Field as="select" name="gioiTinh" className="form-control form-control-lg">
                                                    <option value="">Chọn giới tính</option>
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                    <option value="Khác">Khác</option>
                                                </Field>
                                                <ErrorMessage name="gioiTinh" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-outline mb-2">
                                        <Field name="sdt" type="text" className="form-control form-control-lg" placeholder="Nhập số điện thoại" />
                                        <ErrorMessage name="sdt" component="div" className="text-danger" />
                                    </div>
                                    <div className="text-center mt-4">
                                        <button type="submit" className="btn btn-primary btn-lg"
                                            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} disabled={isSubmitting}>
                                            {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
                                        </button>
                                        <p className="small fw-bold mt-2 mb-0">Đã có tài khoản? <Link to="/login" className="link-danger">Đăng nhập</Link></p>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterPage;
