// import React, { useEffect, useState } from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { toast } from 'react-toastify'; // To display notifications
// import '../assets/styles/main.css';
// import { useNavigate } from 'react-router-dom';
// import StudentService from '../services/student.service'; // Import the StudentService
// import LopService from '../services/class.service'; // Import the LopService
// import Navbar from "../components/Navbar";


// function StudentAdd() {
//     const navigate = useNavigate();
//     const [classOptions, setClassOptions] = useState([]);

//     useEffect(() => {
//         // Fetch class options from API
//         const fetchClassOptions = async () => {
//             try {
//                 const response = await LopService.getAll();
//                 console.log('Class options:', response); // Check data structure
//                 setClassOptions(response);
//             } catch (error) {
//                 toast.error(`Lấy dữ liệu mã lớp thất bại: ${error.message}`);
//             }
//         };

//         fetchClassOptions();
//     }, []);

//     const validationSchema = Yup.object().shape({
//         mssv: Yup.string()
//             .required('MSSV không được bỏ trống.')
//             .matches(/^[A-Za-z0-9]+$/, 'MSSV chỉ được bao gồm chữ cái và số.'),
//         name: Yup.string()
//             .required('Tên không được bỏ trống.'),
//         maLop: Yup.string()
//             .required('Mã lớp không được bỏ trống.'),
//         email: Yup.string()
//             .email('Email không hợp lệ.')
//             .required('Email không được bỏ trống.'),
//         password: Yup.string()
//             .required('Mật khẩu không được bỏ trống.')
//             .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
//             .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!]).*$/, 'Mật khẩu phải chứa ít nhất một chữ viết hoa, một chữ viết thường, một số và một ký tự đặc biệt.'),
//         confirmPassword: Yup.string()
//             .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp.')
//             .required('Vui lòng xác nhận mật khẩu.'),
//         ngaySinh: Yup.date()
//             .required('Nhập ngày sinh.'),
//         gioiTinh: Yup.string()
//             .required('Giới tính không được bỏ trống.'),
//         sdt: Yup.string()
//             .required('Số điện thoại không được bỏ trống.')
//             .matches(/^[0-9]+$/, 'Số điện thoại phải là số.')
//             .min(10, 'Số điện thoại phải có ít nhất 10 chữ số.'),
//     });

//     const handleSubmit = async (values, { setSubmitting }) => {
//         const formattedValues = {
//             Mssv: values.mssv,
//             Ten_SV: values.name,
//             Ma_Lop: values.maLop,
//             Email: values.email,
//             Password: values.password,
//             NgaySinh: values.ngaySinh,
//             GioiTinh: values.gioiTinh,
//             SDT: values.sdt
//         };

//         try {
//             await StudentService.add(formattedValues);
//             toast.success("Thêm sinh viên thành công!");
//             navigate('/student-list');
//         } catch (error) {
//             console.error('Error details:', error.response || error);
//             toast.error(`Thêm sinh viên thất bại: ${error.response?.data?.message || error.message}`);
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <section className="vh-90 d-flex justify-content-center align-items-center text-center">
//                 <div className="container-fluid h-custom bg-white text-dark">
//                     <div className="row d-flex justify-content-center align-items-center h-70">
//                         <div className="col-md-8 col-lg-6 col-xl-4">
//                             <Formik
//                                 initialValues={{
//                                     mssv: '',
//                                     name: '',
//                                     maLop: '',
//                                     email: '',
//                                     password: '',
//                                     confirmPassword: '',
//                                     ngaySinh: '',
//                                     gioiTinh: '',
//                                     sdt: ''
//                                 }}
//                                 validationSchema={validationSchema}
//                                 onSubmit={handleSubmit}
//                             >
//                                 {({ isSubmitting }) => (
//                                     <Form>
//                                         <h2 className="text-center">Thêm Sinh Viên</h2>
//                                         <div className='row'>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="mssv" type="text" className="form-control form-control-lg" placeholder="Nhập MSSV" />
//                                                     <ErrorMessage name="mssv" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="name" type="text" className="form-control form-control-lg" placeholder="Nhập tên" />
//                                                     <ErrorMessage name="name" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='row'>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field as="select" name="maLop" className="form-control form-control-lg custom-select">
//                                                         <option value="">Chọn mã lớp</option>
//                                                         {classOptions.map((option) => (
//                                                             <option key={option.Ma_Lop} value={option.Ma_Lop}>
//                                                                 {option.Ma_Lop} - {option.TenLop}
//                                                             </option>
//                                                         ))}
//                                                     </Field>
//                                                     <ErrorMessage name="maLop" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="email" type="email" className="form-control form-control-lg" placeholder="Nhập email" />
//                                                     <ErrorMessage name="email" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='row'>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="password" type="password" className="form-control form-control-lg" placeholder="Nhập mật khẩu" />
//                                                     <ErrorMessage name="password" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="confirmPassword" type="password" className="form-control form-control-lg" placeholder="Nhập lại mật khẩu" />
//                                                     <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='row'>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="ngaySinh" type="date" className="form-control form-control-lg" />
//                                                     <ErrorMessage name="ngaySinh" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field as="select" name="gioiTinh" className="form-control form-control-lg">
//                                                         <option value="">Chọn giới tính</option>
//                                                         <option value="Nam">Nam</option>
//                                                         <option value="Nữ">Nữ</option>
//                                                         <option value="Khác">Khác</option>
//                                                     </Field>
//                                                     <ErrorMessage name="gioiTinh" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="form-outline mb-2">
//                                             <Field name="sdt" type="text" className="form-control form-control-lg" placeholder="Nhập số điện thoại" />
//                                             <ErrorMessage name="sdt" component="div" className="text-danger" />
//                                         </div>
//                                         <div className="text-center mt-4">
//                                             <button type="submit" className="btn btn-primary btn-lg"
//                                                 style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} disabled={isSubmitting}>
//                                                 {isSubmitting ? 'Đang thêm sinh viên...' : 'Thêm Sinh Viên'}
//                                             </button>
//                                         </div>
//                                     </Form>
//                                 )}
//                             </Formik>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default StudentAdd;



import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Row, Col, Form as BootstrapForm } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StudentService from '../services/student.service';
import LopService from '../services/class.service';
import Navbar from "../components/Navbar";

function StudentAdd() {
    const navigate = useNavigate();
    const [classOptions, setClassOptions] = useState([]);

    useEffect(() => {
        const fetchClassOptions = async () => {
            try {
                const response = await LopService.getAll();
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

        try {
            await StudentService.add(formattedValues);
            toast.success("Thêm sinh viên thành công!");
            navigate('/student-list');
        } catch (error) {
            console.error('Error details:', error.response || error);
            toast.error(`Thêm sinh viên thất bại: ${error.response?.data?.message || error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center h-70">
                    <h2 className="text-center mb-2">Thêm Sinh Viên</h2>
                    <div className="mt-2 col-md-8 col-lg-6">
                        <Formik
                            initialValues={{
                                mssv: '',
                                name: '',
                                maLop: '',
                                email: '',
                                password: '',
                                ngaySinh: '',
                                gioiTinh: '',
                                sdt: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form as={BootstrapForm}>
                                    <Row>
                                        <Col md={6}>
                                            <BootstrapForm.Group controlId="mssv">
                                                <BootstrapForm.Label>MSSV</BootstrapForm.Label>
                                                <Field
                                                    type="text"
                                                    name="mssv"
                                                    as={BootstrapForm.Control}
                                                    placeholder="Nhập MSSV"
                                                />
                                                <ErrorMessage name="mssv" component="div" className="text-danger" />
                                            </BootstrapForm.Group>
                                        </Col>
                                        <Col md={6}>
                                            <BootstrapForm.Group controlId="name">
                                                <BootstrapForm.Label>Tên Sinh Viên</BootstrapForm.Label>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    as={BootstrapForm.Control}
                                                    placeholder="Nhập tên sinh viên"
                                                />
                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                            </BootstrapForm.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <BootstrapForm.Group controlId="maLop">
                                                <BootstrapForm.Label>Mã Lớp</BootstrapForm.Label>
                                                <Field
                                                    as="select"
                                                    name="maLop"
                                                    className="form-control"
                                                >
                                                    <option value="">Chọn mã lớp</option>
                                                    {classOptions.map((option) => (
                                                        <option key={option.Ma_Lop} value={option.Ma_Lop}>
                                                            {option.Ma_Lop} - {option.TenLop}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="maLop" component="div" className="text-danger" />
                                            </BootstrapForm.Group>
                                        </Col>
                                        <Col md={6}>
                                            <BootstrapForm.Group controlId="email">
                                                <BootstrapForm.Label>Email</BootstrapForm.Label>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    as={BootstrapForm.Control}
                                                    placeholder="Nhập email"
                                                />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </BootstrapForm.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <BootstrapForm.Group controlId="password">
                                                <BootstrapForm.Label>Password</BootstrapForm.Label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    as={BootstrapForm.Control}
                                                    placeholder="Nhập mật khẩu"
                                                />
                                                <ErrorMessage name="password" component="div" className="text-danger" />
                                            </BootstrapForm.Group>
                                        </Col>
                                        <Col md={6}>
                                            <BootstrapForm.Group controlId="ngaySinh">
                                                <BootstrapForm.Label>Ngày Sinh</BootstrapForm.Label>
                                                <Field
                                                    type="date"
                                                    name="ngaySinh"
                                                    as={BootstrapForm.Control}
                                                />
                                                <ErrorMessage name="ngaySinh" component="div" className="text-danger" />
                                            </BootstrapForm.Group>
                                        </Col>
                                    </Row>

                                    <Row>

                                        <Col md={6}>
                                            <BootstrapForm.Group controlId="gioiTinh">
                                                <BootstrapForm.Label>Giới tính</BootstrapForm.Label>
                                                <Field as="select" name="gioiTinh" className="form-control">
                                                    <option value="">Chọn giới tính</option>
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                    <option value="Khác">Khác</option>
                                                </Field>
                                                <ErrorMessage name="gioiTinh" component="div" className="text-danger" />
                                            </BootstrapForm.Group>
                                        </Col>
                                        <Col md={6}>
                                            <BootstrapForm.Group controlId="sdt">
                                                <BootstrapForm.Label >Số điện thoại</BootstrapForm.Label>
                                                <Field
                                                    type="text"
                                                    name="sdt"
                                                    as={BootstrapForm.Control}
                                                    placeholder="Nhập số điện thoại"
                                                />
                                                <ErrorMessage name="sdt" component="div" className="text-danger" />
                                            </BootstrapForm.Group>
                                        </Col>
                                    </Row>



                                    <div className="text-center mt-4">
                                        <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                                            {isSubmitting ? 'Đang thêm sinh viên...' : 'Thêm Sinh Viên'}
                                        </button>
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

export default StudentAdd;
