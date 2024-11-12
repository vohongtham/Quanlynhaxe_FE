// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../assets/styles/header.css';  // Import CSS
// import Avatar from '../components/Avatar';
// // import logo from '../assets/imgs/logo1.png';

// function Header({ userId, userEmail }) {
//   return (
//     <div className="header-container">
//       {/* <img src={logo} alt="Logo" className="header-logo" /> Add logo image */}
//       <div className="header-title">
//         <h1>HỆ THỐNG QUẢN LÝ NHÀ XE SINH VIÊN</h1>
//       </div>

//       {userId ? (
//         // Display if userId is present (user is logged in)
//         <div className="p-2 d-flex justify-content-between align-items-center">
//           <div className="d-flex align-items-center">
//             {/* Avatar with the first letter of the email */}
//             <Avatar userEmail={userEmail} />
//             <span className="ml-2">{userEmail}</span> {/* Display email next to avatar */}
//           </div>
//           <Link to="/logout" style={{ color: '#fff', marginLeft: '1rem' }}>
//             <i className="fa fa-sign-out" aria-hidden="true"></i> Đăng xuất
//           </Link>
//         </div>
//       ) : (
//         // Display if userId is not present (user is not logged in)
//         <div className="d-flex flex-row-reverse">
//           <div className="p-2">
//             <Link to="/register" style={{ color: '#fff' }}>
//               <i className="fa fa-user-plus" aria-hidden="true"></i> Đăng ký
//             </Link>
//           </div>
//           <div className="p-2">
//             <Link to="/login" style={{ color: '#fff' }}>
//               <i className="fa fa-sign-in" aria-hidden="true"></i> Đăng nhập
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Header;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/header.css'; // Import CSS
import Avatar from '../components/Avatar';

function Header() {
  // State để lưu thông tin người dùng
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  // useEffect để lắng nghe sự thay đổi của localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      // Lấy thông tin từ localStorage
      const storedUserId = localStorage.getItem('userId');
      const storedUserEmail = localStorage.getItem('userEmail');
      // Cập nhật state
      setUserId(storedUserId);
      setUserEmail(storedUserEmail);
    };

    // Lắng nghe sự kiện storageChange
    window.addEventListener('storageChange', handleStorageChange);

    // Gọi handleStorageChange khi component được render lần đầu
    handleStorageChange();

    // Cleanup: Gỡ bỏ sự kiện khi component unmount
    return () => {
      window.removeEventListener('storageChange', handleStorageChange);
    };
  }, []);

  return (
    <div className="header-container">
      <div className="header-title">
        <h1>HỆ THỐNG QUẢN LÝ NHÀ XE SINH VIÊN</h1>
      </div>

      {userId ? (
        // Hiển thị thông tin khi người dùng đã đăng nhập
        <div className="p-2 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Avatar userEmail={userEmail} />
            <span className="ml-2">{userEmail}</span>
          </div>
          <Link to="/logout" style={{ color: '#fff', marginLeft: '1rem' }}>
            <i className="fa fa-sign-out" aria-hidden="true"></i> Đăng xuất
          </Link>
        </div>
      ) : (
        // Hiển thị khi người dùng chưa đăng nhập
        <div className="d-flex flex-row-reverse">
          <div className="p-2">
            <Link to="/register" style={{ color: '#fff' }}>
              <i className="fa fa-user-plus" aria-hidden="true"></i> Đăng ký
            </Link>
          </div>
          <div className="p-2">
            <Link to="/login" style={{ color: '#fff' }}>
              <i className="fa fa-sign-in" aria-hidden="true"></i> Đăng nhập
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
