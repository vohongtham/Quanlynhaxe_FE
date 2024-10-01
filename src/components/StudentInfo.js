import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner, Row, Col, Modal } from 'react-bootstrap';
import StudentService from '../services/student.service';
import LopService from '../services/class.service';
import NganhService from '../services/nganh.service';
import DonViService from '../services/donvi.service';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/studentinfo.css';
import '../assets/styles/main.css';
import StudentUpdate from '../components/StudentUpdate';

const StudentInfo = () => {
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [studentInfo, setStudentInfo] = useState({
        Mssv: '',
        Ten_SV: '',
        Email: '',
        Ma_Lop: '',
        NgaySinh: '',
        GioiTinh: '',
        SDT: '',
        DonVi: '',
        Nganh: ''
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchStudentData();
    }, []);

    const fetchStudentData = async () => {
        setLoading(true);
        setErrorMessage('');
        const userEmail = localStorage.getItem('userEmail');

        if (!userEmail) {
            setErrorMessage('No email found in localStorage.');
            setLoading(false);
            return;
        }

        try {
            const result = await StudentService.search({ Email: userEmail });
            if (result && result.length > 0) {
                const formattedStudentInfo = {
                    ...result[0],
                    NgaySinh: new Date(result[0].NgaySinh).toISOString().split('T')[0],
                };
                setStudentInfo(formattedStudentInfo);
                await fetchAdditionalInfo(formattedStudentInfo.Ma_Lop);
            } else {
                setErrorMessage('No student found with the provided email.');
            }
        } catch (error) {
            setErrorMessage('Error fetching student data.');
        } finally {
            setLoading(false);
        }
    };

    const fetchAdditionalInfo = async (maLop) => {
        try {
            console.log("Fetching class info for Ma_Lop:", maLop);
            const lopResult = await LopService.search({ Ma_Lop: maLop });

            if (lopResult && lopResult.length > 0) {
                const majorCode = lopResult[0].Ma_Nganh;
                const nganhResult = await NganhService.search({ Ma_Nganh: majorCode });

                if (nganhResult && nganhResult.length > 0) {
                    const departmentCode = nganhResult[0].Ma_DV;
                    const donViResult = await DonViService.search({ Ma_DV: departmentCode });

                    if (donViResult && donViResult.length > 0) {
                        setStudentInfo(prev => ({
                            ...prev,
                            DonVi: donViResult[0].TenDV, // Set department name
                            Nganh: nganhResult[0].TenNganh // Set major name
                        }));
                    } else {
                        setErrorMessage('No department found with the provided Ma_DV.');
                    }
                } else {
                    setErrorMessage('No major found with the provided Ma_Nganh.');
                }
            } else {
                setErrorMessage('No class found with the provided Ma_Lop.');
            }
        } catch (error) {
            console.error("Error during additional info fetch:", error);
            setErrorMessage('Error fetching additional info.');
        }
    };




    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentInfo({ ...studentInfo, [name]: value });
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className='container' style={{ width: '80%' }}>
            <h3 className="text-uppercase text-center">THÔNG TIN SINH VIÊN</h3>
            <div className="student-info">
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : errorMessage ? (
                    <p className="error-message">{errorMessage}</p>
                ) : (
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="Mssv">
                                    <Form.Label className="form-label-bold">Mã số sinh viên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Mssv"
                                        value={studentInfo.Mssv}
                                        readOnly
                                        style={{ color: '#002776' }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="Ten_SV">
                                    <Form.Label className="form-label-bold">Tên Sinh Viên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Ten_SV"
                                        value={studentInfo.Ten_SV}
                                        onChange={handleChange}
                                        style={{ color: '#002776' }} // Thay đổi màu chữ ở đây
                                    />
                                </Form.Group>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="Email">
                                    <Form.Label className="form-label-bold">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="Email"
                                        value={studentInfo.Email}
                                        onChange={handleChange}
                                        style={{ color: '#002776' }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="SDT">
                                    <Form.Label className="form-label-bold">Số điện thoại</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="SDT"
                                        value={studentInfo.SDT}
                                        onChange={handleChange}
                                        style={{ color: '#002776' }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="NgaySinh">
                                    <Form.Label className="form-label-bold">Ngày sinh</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="NgaySinh"
                                        value={studentInfo.NgaySinh}
                                        onChange={handleChange}
                                        style={{ color: '#002776' }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="GioiTinh">
                                    <Form.Label className="form-label-bold">Giới tính</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="GioiTinh"
                                        value={studentInfo.GioiTinh}
                                        onChange={handleChange}
                                        style={{ color: '#002776' }}
                                    >
                                        <option value="">Chọn giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>                            
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="Ma_Lop">
                                    <Form.Label className="form-label-bold">Mã Lớp</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Ma_Lop"
                                        value={studentInfo.Ma_Lop}
                                        onChange={handleChange}
                                        style={{ color: '#002776' }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="DonVi">
                                    <Form.Label className="form-label-bold">Đơn Vị</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="DonVi"
                                        value={studentInfo.DonVi}
                                        readOnly
                                        style={{ color: '#002776' }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                        <Col md={6} className="mb-3">
                                <Form.Group controlId="Nganh">
                                    <Form.Label className="form-label-bold">Ngành Học</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Nganh"
                                        value={studentInfo.Nganh}
                                        readOnly
                                        style={{ color: '#002776' }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end">
                            <Button onClick={handleShowModal} className="btn-submit">
                                <i className="bi bi-pencil-square"></i>
                                <span style={{ marginLeft: '8px' }}>Cập nhật</span>
                            </Button>
                            <Button className="btn btn-sm btn-primary" style={{ marginLeft: '8px' }} onClick={fetchStudentData} disabled={loading}>
                                <i className={`fas fa-redo ${loading ? 'fa-spin' : ''}`}></i> {loading ? "Đang làm mới..." : "Làm mới"}
                            </Button>

                        </div>
                    </Form>
                )}
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin sinh viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StudentUpdate studentInfo={studentInfo} onClose={handleCloseModal} fetchStudentData={fetchStudentData} />
                </Modal.Body>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default StudentInfo;
