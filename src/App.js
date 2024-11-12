import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/RegisterPage';
import NotFound from './pages/NotFound';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Admin from './pages/AdminPage';
import StudentPage from './pages/StudentPage';
import StatisticalPage from './pages/StatisticalPage';
import Employee from './pages/Employee';
import EmployeeAdd from './components/EmployeeAdd';
import EmployeePage from './pages/EmployeePage';
import StudentAdd from './components/StudentAdd';
import Student from './pages/Student';
import Logout from './pages/Logout';
import { roleRedirect } from './utils/roleRedirect';  // Import the utility function
import VehicleInfo from './pages/VehicleInfo';
import StudentInfo from './components/StudentInfo';
import ChangePassword from './components/ChangePassword';
import Vehicle from './pages/Vehicle';
import VehicleAdd from './components/VehicleAdd';
import StudentHistory from './pages/StudentHistory';
import VehicleAddStudent from './components/VehicleAddStudent';
import VehicleIndePage from './pages/VehicleIdentificationPage';
import RecordPage from './pages/RecordPage';
import DailyRevenuePage from './pages/DailyRevenuePage';
import MonthlyRevenuePage from './pages/MonthlyRevenuePage';
import YearlyRevenuePage from './pages/YearlyRevenuePage';
import BaiXePage from './pages/BaiXe';
import BaiXeAdd from './components/BaiXeAdd';
import DonVi from './pages/DonVi';
import DonViAdd from './components/DonViAdd';
import Class from './pages/Class';
import ClassAdd from './components/ClassAdd';
import Nganh from './pages/Nganh';
import NganhAdd from './components/NganhAdd';
import LoaiXeAdd from './components/LoaiXeAdd';
import LoaiXePage from './pages/LoaiXe';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  const handleLogin = (id, email, role) => {
    setUserId(id);
    setUserEmail(email);
    setUserRole(role);
    localStorage.setItem('userId', id);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', role);

    // Use the utility function for role-based redirection
    roleRedirect(role);
  };

  const handleLogout = () => {
    setUserId(null);
    setUserEmail(null);
    setUserRole(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    // window.location.href = '/'; // Redirect to home page after logout
  };



  return (
    <>
      <Header userId={userId} userEmail={userEmail} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/page" element={<Admin />} />
        <Route path="/employee/page" element={<EmployeePage />} />
        
        {/* StudentPage with nested routes */}
        <Route path="/student/page" element={<StudentPage />}>
          <Route path="info" element={<StudentInfo />} />
          <Route path="vehicle-info" element={<VehicleInfo />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="parking-history" element={<StudentHistory />} />
        </Route>

        <Route path="/statistical" element={<StatisticalPage />}>
          <Route path="daily-revenue" element={<DailyRevenuePage />} />
          <Route path="monthly-revenue" element={<MonthlyRevenuePage />} />
          <Route path="yearly-revenue" element={<YearlyRevenuePage />} />
        </Route>
        
        <Route path="/employees" element={<Employee />} />
        <Route path="/employee/add" element={<EmployeeAdd />} />
        <Route path="/students" element={<Student />} />
        <Route path="/student/add" element={<StudentAdd />} />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        <Route path="/vehicles" element={<Vehicle />} />
        <Route path="/vehicle/add" element={<VehicleAdd />} />
        <Route path="/vehicle/add/student" element={<VehicleAddStudent />} />
        <Route path="/vehicleindentification/page" element={<VehicleIndePage />} />
        <Route path="/records/page" element={<RecordPage />} />
        <Route path="/baixes/page" element={<BaiXePage />} />
        <Route path="/baixes/add" element={<BaiXeAdd />} />
        <Route path="/donvis" element={<DonVi/>} />
        <Route path="/donvis/add" element={<DonViAdd />} />
        <Route path="/class" element={<Class/>} />
        <Route path="/class/add" element={<ClassAdd />} />
        <Route path="/nganhs" element={<Nganh/>} />
        <Route path="/nganhs/add" element={<NganhAdd />} />
        <Route path="/loaixe-phi" element={<LoaiXePage />} />
        <Route path="/loaixe-phi/add" element={<LoaiXeAdd />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
