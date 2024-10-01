// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../assets/styles/sidebar.css';
// import ChangePassword from './ChangePassword';
// import StudentService from '../services/student.service'; // Import the student service

// const SidebarStudent = () => {
//   const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
//   const [Mssv, setMssv] = useState('');

//   // Function to retrieve the Mssv (student ID) based on the currently logged-in user
//   // useEffect(() => {
//   //   const fetchStudentInfo = async () => {
//   //     try {
//   //       // Assuming the student info is fetched from an API or stored in local storage
//   //       const studentInfo = await StudentService.getCurrentStudent(); // Replace with actual method
//   //       setMssv(studentInfo.Mssv); // Set the Mssv
//   //     } catch (error) {
//   //       console.error("Error fetching student info:", error);
//   //     }
//   //   };

//   //   fetchStudentInfo();
//   // }, []);

//   useEffect(() => {
//     const fetchStudentInfo = async () => {
//       try {
//         const studentInfo = await StudentService.getCurrentStudent();
//         if (studentInfo) {
//           setMssv(studentInfo.Mssv);
//         } else {
//           console.error('No student information found');
//         }
//       } catch (error) {
//         console.error('Error fetching student info:', error);
//       }
//     };

//     fetchStudentInfo();
//   }, []);

//   // Show the change password modal
//   const handleShowChangePassword = () => {
//     setShowChangePasswordModal(true);
//   };

//   // Hide the change password modal
//   const handleCloseChangePassword = () => {
//     setShowChangePasswordModal(false);
//   };

//   return (
//     <div className="sidebar-student">
//       {/* <h3>Student Sidebar</h3> */}
//       <ul>
//         <li><Link to="info"><i className="bi bi-person-lines-fill" style={{ marginRight: '5px' }}></i>Thông tin sinh viên</Link></li>
//         <li><Link to="vehicle-info"><i className="bi bi-list-ul" style={{ marginRight: '5px' }}></i>Thông tin xe sinh viên</Link></li>
//         <li><Link to="parking-history"><i className="bi bi-list-ul" style={{ marginRight: '5px' }}></i>Lịch sử gửi xe</Link></li>
//         <li><span onClick={handleShowChangePassword} style={{ cursor: 'pointer', fontSize: '18px' }}><i className="bi bi-key ml-2"></i> Đổi mật khẩu</span></li>
//       </ul>

//       {/* Change Password Modal */}
//       <ChangePassword
//         show={showChangePasswordModal}
//         handleClose={handleCloseChangePassword}
//         Mssv={Mssv} // Pass the Mssv to the ChangePassword component
//       />
//     </div>
//   );
// };

// export default SidebarStudent;




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/sidebar.css';
import ChangePassword from './ChangePassword';
import StudentService from '../services/student.service'; // Import the student service

const SidebarStudent = () => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [Mssv, setMssv] = useState('');

  // Hàm để lấy Mssv (mã số sinh viên) dựa trên người dùng đang đăng nhập
  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const studentInfo = await StudentService.getCurrentStudent(); // Thay thế với phương thức thực tế
        if (studentInfo) {
          setMssv(studentInfo.Mssv); // Cập nhật Mssv
        } else {
          console.error('Không tìm thấy thông tin sinh viên');
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin sinh viên:', error);
      }
    };

    fetchStudentInfo();
  }, []);

  // Hiển thị modal đổi mật khẩu
  const handleShowChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  // Ẩn modal đổi mật khẩu
  const handleCloseChangePassword = () => {
    setShowChangePasswordModal(false);
  };

  return (
    <div className="sidebar-student">
      <ul>
        <li><Link to="info"><i className="bi bi-person-lines-fill" style={{ marginRight: '5px' }}></i>Thông tin sinh viên</Link></li>
        <li><Link to="vehicle-info"><i className="bi bi-list-ul" style={{ marginRight: '5px' }}></i>Thông tin xe sinh viên</Link></li>
        <li><Link to="parking-history"><i className="bi bi-list-ul" style={{ marginRight: '5px' }}></i>Lịch sử gửi xe</Link></li>
        <li><span onClick={handleShowChangePassword} style={{ cursor: 'pointer', fontSize: '18px' }}><i className="bi bi-key ml-2"></i> Đổi mật khẩu</span></li>
      </ul>

      {/* Modal Đổi Mật Khẩu */}
      <ChangePassword
        show={showChangePasswordModal}
        handleClose={handleCloseChangePassword}
        Mssv={Mssv} // Truyền Mssv vào component ChangePassword
      />
    </div>
  );
};

export default SidebarStudent;
