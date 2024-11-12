import React from 'react';
import { Link } from 'react-router-dom';
import iconSinhVien from '../assets/imgs/iconsinhvien.png';
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
        minHeight: '90vh',
        marginTop: '-25px',
      }}
    >
      <div id="app" className="container mt-4">
        <div className="row">
          {/* Card 1 - Employee Management */}
          <div className="col-md-4">
            <Link to="/students" className="text-decoration-none">
              <div className="card" style={{ marginTop: '150px', backgroundColor: '#C4DAD2', fontSize: '24px'}}>
                <div className="text-center card-header card-1 white-header">Quản lý Sinh viên</div>
                <div className="card-body text-center">
                  <img src={iconSinhVien} alt="Nhân viên" height="180" width="290" />
                </div>
              </div>
            </Link>
          </div>

          {/* Card 3 - Merchandise Management */}
          <div className="col-md-4">
            <Link to="/vehicleindentification/page" className="text-decoration-none">
              <div className="card" style={{ marginTop: '150px', backgroundColor: '#C4DAD2',  fontSize: '24px'}}>
                <div className="text-center card-header card-3 white-header">Quản lý Xe Ra/Vào</div>
                <div className="card-body text-center">
                  <img src={iconXe} alt="Hàng hóa" height="180" width="380" />
                </div>
              </div>
            </Link>
          </div>

          {/* Card 4 - Order Management */}
          <div className="col-md-4">
            <Link to="/statistical/daily-revenue" className="text-decoration-none">
              <div className="card" style={{ marginTop: '150px', backgroundColor: '#C4DAD2', fontSize: '24px'}}>
                <div className="text-center card-header card-4 white-header">Thống kê</div>
                <div className="card-body text-center">
                  <img src={iconThongKe} alt="Đơn hàng" height="180" width="290" />
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
