import React from 'react';
import { Link } from 'react-router-dom';
import iconSinhVien from '../assets/imgs/iconsinhvien.png';
import iconNhanVien from '../assets/imgs/iconNhanVien.png'
import iconXe from '../assets/imgs/xeravao.png'
import iconThongKe from '../assets/imgs/iconThongke.png'
import backGroundIMG from '../assets/imgs/backgroundIMG.jpg'
import thongtin from '../assets/imgs/thongtin1.png'
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
      <div id="app" className="container mt-4" >
        <div className="row" style={{marginLeft: '60px' }}>
          <div className="col-md-4">
            <Link to="/students" className="text-decoration-none">
              <div className="card" 
                    style={{ 
                      marginTop: '90px', 
                      backgroundColor: '#D8EFD3', 
                      fontSize: '24px',
                      width: '350px',  // Thay đổi chiều rộng
                      height: '240px', // Thay đổi chiều cao 
                      }}>
                <div className="text-center card-header card-1 white-header">Quản lý Sinh viên</div>
                <div className="card-body">
                  <img src={iconSinhVien} alt="Nhân viên" height="170" width="300" />
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/employees" className="text-decoration-none">
              <div className="card" 
                  style={{ 
                    marginTop: '90px', 
                    backgroundColor: '#D8EFD3', 
                    fontSize: '24px',
                    width: '350px',  // Thay đổi chiều rộng
                    height: '240px', // Thay đổi chiều cao 
                    }}>
                <div className="text-center card-header card-2 white-header">Quản lý Nhân viên</div>
                <div className="card-body">
                  <img src={iconNhanVien} alt="Khách hàng" height="170" width="300" />
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4" style={{width:"200"}}>
            <Link to="/vehicleindentification/page" className="text-decoration-none">
              <div className="card" 
                    style={{ 
                      marginTop: '90px', 
                      backgroundColor: '#D8EFD3', 
                      fontSize: '24px',
                      width: '350px',  // Thay đổi chiều rộng
                      height: '240px', // Thay đổi chiều cao 
                      }}>
                <div className="text-center card-header card-3 white-header">Quản lý xe Ra/Vào</div>
                <div className="card-body">
                  <img src={iconXe} alt="Hàng hóa" height="150" width="315" />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="row text-center" style={{marginLeft: '270px' }}>
          <div className="col-md-6">
            <Link to="/baixes/page" className="text-decoration-none">
              <div className="card" 
                  style={{ 
                    marginTop: '20px', 
                    backgroundColor: '#D8EFD3', 
                    fontSize: '24px',
                    width: '350px',  // Thay đổi chiều rộng
                    height: '230px', // Thay đổi chiều cao 
                    }}>
                <div className="text-center card-header card-4 white-header">Quản lý thông tin nhà xe</div>
                <div className="card-body">
                  <img src={thongtin} alt="Đơn hàng" height="150" width="290" />
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6">
            <Link to="/statistical/daily-revenue" className="text-decoration-none">
              <div className="card" 
                    style={{ 
                      marginTop: '20px', 
                      backgroundColor: '#D8EFD3', 
                      fontSize: '24px',
                      width: '350px',  // Thay đổi chiều rộng
                      height: '230px', // Thay đổi chiều cao 
                      }}>
                <div className="text-center card-header card-4 white-header">Thống kê</div>
                <div className="card-body">
                  <img src={iconThongKe} alt="Đơn hàng" height="150" width="260" />
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
