import React from 'react';
import { Link } from 'react-router-dom';
import iconSinhVien from '../assets/imgs/iconsinhvien.png';
import iconNhanVien from '../assets/imgs/iconNhanVien.png'
import iconXe from '../assets/imgs/xeravao.png'
import iconThongKe from '../assets/imgs/iconThongke.png'
import backGroundIMG from '../assets/imgs/backgroundIMG.jpg'
import '../assets/styles/main.css';

const HomePage = ({  }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${backGroundIMG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '80vh',
        marginTop: '-25px',
      }}
    >
      <div id="app" className="container mt-4">
        <div className="row">
          {/* Card 1 - Employee Management */}
          <div className="col-md-3">
            <Link to="/students" className="text-decoration-none">
              <div className="card" style={{ marginTop: '150px', backgroundColor: '#C4DAD2', fontSize: '24px' }}>
                <div className="text-center card-header card-1 white-header">Quản lý Sinh viên</div>
                <div className="card-body">
                  <img src={iconSinhVien} alt="Nhân viên" height="140" width="250" />
                </div>
              </div>
            </Link>
          </div>

          {/* Card 2 - Customer Management */}
          <div className="col-md-3">
            <Link to="/employees" className="text-decoration-none">
              <div className="card" style={{ marginTop: '150px', backgroundColor: '#C4DAD2', fontSize: '24px'}}>
                <div className="text-center card-header card-2 white-header">Quản lý Nhân viên</div>
                <div className="card-body">
                  <img src={iconNhanVien} alt="Khách hàng" height="140" width="250" />
                </div>
              </div>
            </Link>
          </div>

          {/* Card 3 - Merchandise Management */}
          <div className="col-md-3">
            <Link to="/merchandise" className="text-decoration-none">
              <div className="card" style={{ marginTop: '150px', backgroundColor: '#C4DAD2', fontSize: '24px' }}>
                <div className="text-center card-header card-3 white-header">Quản lý Xe Ra/Vào</div>
                <div className="card-body">
                  <img src={iconXe} alt="Hàng hóa" height="140" width="270" />
                </div>
              </div>
            </Link>
          </div>

          {/* Card 4 - Order Management */}
          <div className="col-md-3">
            <Link to="/statistical" className="text-decoration-none">
              <div className="card" style={{ marginTop: '150px', backgroundColor: '#C4DAD2', fontSize: '24px' }}>
                <div className="text-center card-header card-4 white-header">Thống kê</div>
                <div className="card-body">
                  <img src={iconThongKe} alt="Đơn hàng" height="140" width="250" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
