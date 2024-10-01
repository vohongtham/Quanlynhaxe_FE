// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import StudentService from '../services/student.service';
// import { toast } from 'react-toastify';

// const StudentUpdate = ({ studentInfo, onClose }) => {
//     const [formData, setFormData] = useState(studentInfo);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await StudentService.update(formData.Mssv, formData);
//             toast.success('Cập nhật thông tin thành công!');
//             onClose(); // Đóng modal sau khi cập nhật thành công
//         } catch (error) {
//             toast.error('Cập nhật không thành công');
//         }
//     };

//     return (
//         <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="Ten_SV">
//                 <Form.Label className="form-label-bold">Tên Sinh Viên</Form.Label>
//                 <Form.Control
//                     type="text"
//                     name="Ten_SV"
//                     value={formData.Ten_SV}
//                     onChange={handleChange}
//                 />
//             </Form.Group>
//             <Form.Group controlId="Email">
//                 <Form.Label className="form-label-bold">Email</Form.Label>
//                 <Form.Control
//                     type="email"
//                     name="Email"
//                     value={formData.Email}
//                     onChange={handleChange}
//                 />
//             </Form.Group>
//             <Form.Group controlId="Ma_Lop">
//                 <Form.Label className="form-label-bold">Mã Lớp</Form.Label>
//                 <Form.Control
//                     type="text"
//                     name="Ma_Lop"
//                     value={formData.Ma_Lop}
//                     onChange={handleChange}
//                 />
//             </Form.Group>
//             <Form.Group controlId="NgaySinh">
//                 <Form.Label className="form-label-bold">Ngày sinh</Form.Label>
//                 <Form.Control
//                     type="date"
//                     name="NgaySinh"
//                     value={formData.NgaySinh}
//                     onChange={handleChange}
//                 />
//             </Form.Group>
//             <Form.Group controlId="GioiTinh">
//                 <Form.Label className="form-label-bold">Giới tính</Form.Label>
//                 <Form.Control
//                     as="select"
//                     name="GioiTinh"
//                     value={formData.GioiTinh}
//                     onChange={handleChange}
//                 >
//                     <option value="">Chọn giới tính</option>
//                     <option value="Nam">Nam</option>
//                     <option value="Nữ">Nữ</option>
//                     <option value="Khác">Khác</option>
//                 </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="SDT">
//                 <Form.Label className="form-label-bold">Số điện thoại</Form.Label>
//                 <Form.Control
//                     type="text"
//                     name="SDT"
//                     value={formData.SDT}
//                     onChange={handleChange}
//                 />
//             </Form.Group>
//             <Button type="submit" className="btn-submit">
//                 Lưu
//             </Button>
//         </Form>
//     );
// };

// export default StudentUpdate;

import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import StudentService from '../services/student.service';
import { toast } from 'react-toastify';

const StudentUpdate = ({ studentInfo, onClose, fetchStudentData }) => {
    const [formData, setFormData] = useState(studentInfo);
    const [loading, setLoading] = useState(false);

    // Cập nhật formData khi studentInfo thay đổi
    useEffect(() => {
        setFormData(studentInfo);
    }, [studentInfo]);

    // Xử lý thay đổi trên các trường input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Xử lý sự kiện submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await StudentService.update(formData.Mssv, formData);
            toast.success('Cập nhật thông tin thành công!');
            fetchStudentData(); // Lấy lại thông tin sinh viên
            onClose(); // Đóng modal
        } catch (error) {
            console.error(error);
            toast.error('Cập nhật không thành công, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Ten_SV">
                <Form.Label className="form-label-bold">Tên Sinh Viên</Form.Label>
                <Form.Control
                    type="text"
                    name="Ten_SV"
                    value={formData.Ten_SV}
                    onChange={handleChange}
                    required
                    placeholder="Nhập tên sinh viên"
                />
            </Form.Group>
            <Form.Group controlId="Email">
                <Form.Label className="form-label-bold">Email</Form.Label>
                <Form.Control
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                    placeholder="Nhập email"
                />
            </Form.Group>
            <Form.Group controlId="Ma_Lop">
                <Form.Label className="form-label-bold">Mã Lớp</Form.Label>
                <Form.Control
                    type="text"
                    name="Ma_Lop"
                    value={formData.Ma_Lop}
                    onChange={handleChange}
                    required
                    placeholder="Nhập mã lớp"
                />
            </Form.Group>
            <Form.Group controlId="NgaySinh">
                <Form.Label className="form-label-bold">Ngày sinh</Form.Label>
                <Form.Control
                    type="date"
                    name="NgaySinh"
                    value={formData.NgaySinh}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="GioiTinh">
                <Form.Label className="form-label-bold">Giới tính</Form.Label>
                <Form.Control
                    as="select"
                    name="GioiTinh"
                    value={formData.GioiTinh}
                    onChange={handleChange}
                    required
                >
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="SDT">
                <Form.Label className="form-label-bold">Số điện thoại</Form.Label>
                <Form.Control
                    type="text"
                    name="SDT"
                    value={formData.SDT}
                    onChange={handleChange}
                    required
                    placeholder="Nhập số điện thoại"
                />
            </Form.Group>
            <div className="d-flex justify-content-end" style={{ marginTop: '16px' }}>
                <Button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Đang cập nhật...' : 'Lưu'}
                </Button>
            </div>
        </Form>
    );
};

export default StudentUpdate;
