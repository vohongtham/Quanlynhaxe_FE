// import React from 'react';
// import '../assets/styles/avatar.css';  // Import CSS

// function Avatar({ userName }) {
//   // Lấy chữ cái đầu của tên đăng nhập
//   const initial = userName ? userName.charAt(0).toUpperCase() : '';

//   return (
//     <div className="avatar">
//       <span className="avatar-initial">{initial}</span>
//     </div>
//   );
// }

// export default Avatar;


import React from 'react';
import '../assets/styles/avatar.css';  // Import CSS

function Avatar({ userEmail }) {
  // Lấy chữ cái đầu tiên từ phần trước dấu "@"
  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : '';

  // Tạo hash từ userEmail để sinh màu
  const stringToHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  // Chuyển đổi hash thành mã màu
  const hashToColor = (hash) => {
    const color = `hsl(${hash % 360}, 75%, 60%)`; // HSL màu với độ sáng và độ bão hòa cố định
    return color;
  };

  // Lấy hash từ email và chuyển thành màu
  const backgroundColor = hashToColor(stringToHash(userEmail));

  return (
    <div className="avatar" style={{ backgroundColor }}>
      <span className="avatar-initial">{initial}</span>
    </div>
  );
}

export default Avatar;


