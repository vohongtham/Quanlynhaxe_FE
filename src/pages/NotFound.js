import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="page text-center">
      <p>
        Oops, không thể tìm thấy trang. Trở về
        <Link to="/">trang chủ.</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
