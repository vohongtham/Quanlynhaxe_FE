// import React, { useState } from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import InputField from '../components/InputField'; // Assuming you have a custom InputField component
// import VehicleService from '../services/vehicle.service'; // Import the VehicleService
// import { Link } from 'react-router-dom';
// import { Form as BootstrapForm, Button, Alert, Row, Col } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// // import Navbar from "../components/Navbar";

// const VehicleAdd = () => {
//     const [responseMessage, setResponseMessage] = useState('');

//     // Define the validation schema using Yup
//     const validationSchema = Yup.object().shape({
//         bienSoXe: Yup.string().required('Biển số xe không được bỏ trống.'),
//         mssv: Yup.string().required('Mã số sinh viên không được bỏ trống.'),
//         soKhungXe: Yup.string().required('Số khung xe không được bỏ trống.'),
//         tenChuXe: Yup.string().required('Tên chủ xe không được bỏ trống.'),
//         loaiXe: Yup.string().required('Loại xe không được bỏ trống.'),
//         dungTich: Yup.string().required('Dung tích không được bỏ trống.'),
//         nhanHieu: Yup.string().required('Nhãn hiệu không được bỏ trống.'),
//         mauXe: Yup.string().required('Màu xe không được bỏ trống.'),
//     });
    

//     // const handleSubmit = async (values, { setSubmitting }) => {
//     //     try {
//     //         await VehicleService.add(values);
//     //         toast.success('Xe đã được thêm thành công!'); // Show success notification
//     //     } catch (error) {
//     //         if (error.response && error.response.data) {
//     //             console.error('Server Error:', error.response.data);
//     //             toast.error(error.response.data.message || 'Thêm xe không thành công do lỗi từ máy chủ.'); // Show server error
//     //         } else {
//     //             console.error('Error:', error);
//     //             toast.error('Lỗi không xác định.'); // Show general error
//     //         }
//     //     }
//     //     setSubmitting(false);
//     // };

//     const handleSubmit = async (values, { setSubmitting }) => {
//         console.log("Form values:", values); // Log form values for debugging
//         try {
//             await VehicleService.add(values);
//             toast.success('Xe đã được thêm thành công!');
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 console.error('Server Error:', error.response.data);
//                 toast.error(error.response.data.message || 'Thêm xe không thành công do lỗi từ máy chủ.');
//             } else {
//                 console.error('Error:', error);
//                 toast.error('Lỗi không xác định.');
//             }
//         }
//         setSubmitting(false);
//     };
    

//     return (
//         <div>
//             {/* <Navbar /> */}
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                 <div className="container">
//                     <Link className="navbar-brand" to="/admin/page">Home</Link>
//                     <div className="collapse navbar-collapse" id="navbarNav">
//                         <ul className="navbar-nav">
//                             <li className="nav-item active">
//                                 <Link className="navbar-brand" to="/vehicles">Danh sách xe</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//             <div className='container'>
//                 <div className="row justify-content-center align-items-center">
//                     <h3 className="text-center mb-2">Thêm Xe Mới</h3>
//                     <div className="mt-2 col-md-10 col-lg-8">
//                         <Formik
//                             initialValues={{
//                                 bienSoXe: '',
//                                 mssv: '',
//                                 soKhungXe: '',
//                                 tenChuXe: '',
//                                 loaiXe: '',
//                                 dungTich: '',
//                                 nhanHieu: '',
//                                 mauXe: '',
//                             }}
//                             validationSchema={validationSchema}
//                             onSubmit={handleSubmit}
//                         >
//                             {({ isSubmitting }) => (
//                                 <Form>
//                                     <Row>
//                                         <Col md={6}>
//                                             <BootstrapForm.Group controlId="bienSoXe">
//                                                 <BootstrapForm.Label>Biển số xe</BootstrapForm.Label>
//                                                 <Field
//                                                     type="text"
//                                                     name="bienSoXe"
//                                                     as={InputField}
//                                                     placeholder="Nhập biển số xe"
//                                                 />
//                                                 <ErrorMessage name="bienSoXe" component="div" className="text-danger" />
//                                             </BootstrapForm.Group>
//                                         </Col>

//                                         <Col md={6}>
//                                             <BootstrapForm.Group controlId="mssv">
//                                                 <BootstrapForm.Label>Mã số sinh viên</BootstrapForm.Label>
//                                                 <Field
//                                                     type="text"
//                                                     name="mssv"
//                                                     as={InputField}
//                                                     placeholder="Nhập mã số sinh viên"
//                                                 />
//                                                 <ErrorMessage name="mssv" component="div" className="text-danger" />
//                                             </BootstrapForm.Group>
//                                         </Col>
//                                     </Row>

//                                     <Row>
//                                         <Col md={6}>
//                                             <BootstrapForm.Group controlId="soKhungXe">
//                                                 <BootstrapForm.Label>Số khung xe</BootstrapForm.Label>
//                                                 <Field
//                                                     type="text"
//                                                     name="soKhungXe"
//                                                     as={InputField}
//                                                     placeholder="Nhập số khung xe"
//                                                 />
//                                                 <ErrorMessage name="soKhungXe" component="div" className="text-danger" />
//                                             </BootstrapForm.Group>
//                                         </Col>

//                                         <Col md={6}>
//                                             <BootstrapForm.Group controlId="tenChuXe">
//                                                 <BootstrapForm.Label>Tên chủ xe</BootstrapForm.Label>
//                                                 <Field
//                                                     type="text"
//                                                     name="tenChuXe"
//                                                     as={InputField}
//                                                     placeholder="Nhập tên chủ xe"
//                                                 />
//                                                 <ErrorMessage name="tenChuXe" component="div" className="text-danger" />
//                                             </BootstrapForm.Group>
//                                         </Col>
//                                     </Row>

//                                     <Row>
//                                         <Col md={6}>
//                                             <BootstrapForm.Group controlId="loaiXe">
//                                                 <BootstrapForm.Label>Loại xe</BootstrapForm.Label>
//                                                 <Field
//                                                     type="text"
//                                                     name="loaiXe"
//                                                     as={InputField}
//                                                     placeholder="Nhập loại xe"
//                                                 />
//                                                 <ErrorMessage name="loaiXe" component="div" className="text-danger" />
//                                             </BootstrapForm.Group>
//                                         </Col>

//                                         <Col md={6}>
//                                             <BootstrapForm.Group controlId="dungTich">
//                                                 <BootstrapForm.Label>Dung tích</BootstrapForm.Label>
//                                                 <Field
//                                                     type="text"
//                                                     name="dungTich"
//                                                     as={InputField}
//                                                     placeholder="Nhập dung tích"
//                                                 />
//                                                 <ErrorMessage name="dungTich" component="div" className="text-danger" />
//                                             </BootstrapForm.Group>
//                                         </Col>
//                                     </Row>

//                                     <Row>
//                                         <Col md={6}>
//                                             <BootstrapForm.Group controlId="nhanHieu">
//                                                 <BootstrapForm.Label>Nhãn hiệu</BootstrapForm.Label>
//                                                 <Field
//                                                     type="text"
//                                                     name="nhanHieu"
//                                                     as={InputField}
//                                                     placeholder="Nhập nhãn hiệu"
//                                                 />
//                                                 <ErrorMessage name="nhanHieu" component="div" className="text-danger" />
//                                             </BootstrapForm.Group>
//                                         </Col>

//                                         <Col md={6}>
//                                             <BootstrapForm.Group controlId="mauXe">
//                                                 <BootstrapForm.Label>Màu xe</BootstrapForm.Label>
//                                                 <Field
//                                                     type="text"
//                                                     name="mauXe"
//                                                     as={InputField}
//                                                     placeholder="Nhập màu xe"
//                                                 />
//                                                 <ErrorMessage name="mauXe" component="div" className="text-danger" />
//                                             </BootstrapForm.Group>
//                                         </Col>
//                                     </Row>

//                                     <div className="text-center mt-3">
//                                         <Button type="submit" variant="primary" disabled={isSubmitting}>
//                                             Thêm Xe
//                                         </Button>
//                                     </div>
//                                 </Form>
//                             )}
//                         </Formik>
//                         {responseMessage && <Alert variant="info" className="mt-3">{responseMessage}</Alert>}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default VehicleAdd;


// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { toast } from 'react-toastify';
// import '../assets/styles/main.css';
// import { useNavigate } from 'react-router-dom';
// import VehicleService from '../services/vehicle.service'; // Import VehicleService
// import Navbar from "../components/Navbar";

// function VehicleAdd() {
//     const navigate = useNavigate();

//     const validationSchema = Yup.object().shape({
//         bienSoXe: Yup.string().required('Biển số xe không được bỏ trống.'),
//         mssv: Yup.string().required('MSSV không được bỏ trống.'),
//         soKhungXe: Yup.string().required('Số khung xe không được bỏ trống.'),
//         tenChuXe: Yup.string().required('Tên chủ xe không được bỏ trống.'),
//         loaiXe: Yup.string().required('Loại xe không được bỏ trống.'),
//         dungTich: Yup.number()
//             .required('Dung tích không được bỏ trống.'),
//         nhanHieu: Yup.string().required('Nhãn hiệu không được bỏ trống.'),
//         mauXe: Yup.string().required('Màu xe không được bỏ trống.'),
//     });

//     const handleSubmit = async (values, { setSubmitting }) => {
//         const formattedValues = {
//             BienSoXe: values.bienSoXe,
//             Mssv: values.mssv,
//             SoKhungXe: values.soKhungXe,
//             TenChuXe: values.tenChuXe,
//             LoaiXe: values.loaiXe,
//             DungTich: values.dungTich,
//             NhanHieu: values.nhanHieu,
//             MauXe: values.mauXe,
//         };

//         try {
//             await VehicleService.add(formattedValues);
//             toast.success("Thêm xe thành công!");
//             navigate('/vehicle-list');
//         } catch (error) {
//             console.error('Error details:', error.response || error);
//             toast.error(`Thêm xe thất bại: ${error.response?.data?.message || error.message}`);
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
//                                     bienSoXe: '',
//                                     mssv: '',
//                                     soKhungXe: '',
//                                     tenChuXe: '',
//                                     loaiXe: '',
//                                     dungTich: '',
//                                     nhanHieu: '',
//                                     mauXe: '',
//                                 }}
//                                 validationSchema={validationSchema}
//                                 onSubmit={handleSubmit}
//                             >
//                                 {({ isSubmitting }) => (
//                                     <Form>
//                                         <h2 className="text-center">Thêm Xe</h2>
//                                         <div className='row'>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="bienSoXe" type="text" className="form-control form-control-lg" placeholder="Nhập biển số xe" />
//                                                     <ErrorMessage name="bienSoXe" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="mssv" type="text" className="form-control form-control-lg" placeholder="Nhập MSSV" />
//                                                     <ErrorMessage name="mssv" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='row'>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="soKhungXe" type="text" className="form-control form-control-lg" placeholder="Nhập số khung xe" />
//                                                     <ErrorMessage name="soKhungXe" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="tenChuXe" type="text" className="form-control form-control-lg" placeholder="Nhập tên chủ xe" />
//                                                     <ErrorMessage name="tenChuXe" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='row'>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="loaiXe" type="text" className="form-control form-control-lg" placeholder="Nhập loại xe" />
//                                                     <ErrorMessage name="loaiXe" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="dungTich" type="text" className="form-control form-control-lg" placeholder="Nhập dung tích" />
//                                                     <ErrorMessage name="dungTich" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='row'>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="nhanHieu" type="text" className="form-control form-control-lg" placeholder="Nhập nhãn hiệu" />
//                                                     <ErrorMessage name="nhanHieu" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                             <div className='col-md-6 pb-2'>
//                                                 <div className="form-outline mb-2">
//                                                     <Field name="mauXe" type="text" className="form-control form-control-lg" placeholder="Nhập màu xe" />
//                                                     <ErrorMessage name="mauXe" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="text-center">
//                                             <button type="submit" className="btn btn-primary btn-lg"
//                                                 style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} disabled={isSubmitting}>
//                                                 {isSubmitting ? 'Đang thêm xe...' : 'Thêm Xe'}
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

// export default VehicleAdd;




import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import '../assets/styles/main.css';
import { useNavigate } from 'react-router-dom';
import VehicleService from '../services/vehicle.service';
import { Form as BootstrapForm, Button, Row, Col } from 'react-bootstrap';
import Navbar from "../components/Navbar";

function VehicleAdd() {
    const navigate = useNavigate();

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
                                                    <Field name="loaiXe" type="text" as={BootstrapForm.Control} placeholder="Nhập loại xe" />
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
