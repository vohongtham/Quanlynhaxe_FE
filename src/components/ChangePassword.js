import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SinhVienService from '../services/student.service'; // Import SinhVienService
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ChangePassword = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }); 
  const navigate = useNavigate(); // Hook để điều hướng
  const [Mssv, setMssv] = useState(null); // State để lưu Mssv

  useEffect(() => {
    const fetchMssvFromEmail = async () => {
      const userEmail = localStorage.getItem('userEmail'); // Lấy email từ local storage
      if (!userEmail) {
        toast.error('No email found in localStorage for the logged-in user.');
        return;
      }

      try {
        const studentResult = await SinhVienService.search({ Email: userEmail }); // Gọi API để tìm sinh viên
        if (studentResult && studentResult.length > 0) {
          setMssv(studentResult[0].Mssv); // Lưu Mssv vào state
        } else {
          toast.error('No student found with the provided email.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error fetching student information.');
      }
    };

    fetchMssvFromEmail(); // Gọi hàm xác định Mssv
  }, []);

  // Hàm xử lý khi thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hàm xử lý khi gửi form
  const handleSubmit = async () => {
    if (!Mssv) {
      toast.error('Mã số sinh viên không hợp lệ!');
      return;
    }

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }

    try {
      // Gọi backend để cập nhật mật khẩu
      await SinhVienService.update(Mssv, {
        currentPassword: formData.currentPassword, // Mật khẩu hiện tại
        Password: formData.newPassword, // Mật khẩu mới để cập nhật
      });
      toast.success('Đổi mật khẩu thành công!');

      // Đăng xuất người dùng
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail'); // Xóa email (hoặc token) khỏi localStorage
      localStorage.removeItem('ma_quyen');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');

      handleClose(); // Đóng modal sau khi cập nhật thành công
      navigate('/login'); // Điều hướng đến trang đăng nhập
    } catch (error) {
      console.error(error);
      toast.error('Đổi mật khẩu không thành công, vui lòng thử lại.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Đổi mật khẩu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="currentPassword">
            <Form.Label>Mật khẩu hiện tại:</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu hiện tại"
              required
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>Mật khẩu mới:</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu mới"
              required
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Xác nhận mật khẩu:</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Xác nhận mật khẩu mới"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePassword;
