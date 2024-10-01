import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import InputSearch from '../components/InputSearch';
import EmployeeList from '../components/EmployeeList';
import UserService from '../services/user.service';
import '../assets/styles/main.css';
import Navbar from "../components/Navbar";

const EmployeePage = () => {
    const [users, setEmployees] = useState([]); // Dữ liệu nhân viên gốc
    const [filteredEmployees, setFilteredEmployees] = useState([]); // Dữ liệu nhân viên đã lọc
    const [activeIndex, setActiveIndex] = useState(-1);
    // const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Lấy tất cả nhân viên
    const retrieveEmployees = async () => {
        setLoading(true); // Show loading spinner or message when refreshing
        setError(null); // Clear any previous errors
        try {
            const response = await UserService.getAll();
            setEmployees(response);
            setFilteredEmployees(response); // Reset the filtered list as well
        } catch (error) {
            setError(error); // Capture any errors
        } finally {
            setLoading(false); // Stop loading state regardless of success or error
        }
    };

    const goToAdd = () => {
        navigate("/employee/add");
    };

    // const activeEmployee = activeIndex < 0 ? null : filteredEmployees[activeIndex];
    const filteredEmployeesCount = filteredEmployees.length;

    useEffect(() => {
        retrieveEmployees();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {/* <Navbar/> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/admin/page"><i className="bi bi-house-fill" style={{ marginRight: '8px'}}></i>Home</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="navbar-brand" to="/employees">Danh sách nhân viên</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="justify-content-center">
                <div className="container">
                    <div className="mt-2 col-md-12">
                        {/* <h4 className="text-uppercase text-center">Danh sách Nhân Viên</h4> */}
                        {filteredEmployeesCount > 0 ? (
                            <EmployeeList
                                refreshList={retrieveEmployees}
                                employees={filteredEmployees}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                        ) : (
                            <p>Không có nhân viên nào.</p>
                        )}
                        <div className="row mt-3">
                            <div className="col d-flex justify-content-between align-items-center">
                                <button className="btn btn-sm btn-primary" onClick={goToAdd}>
                                    <i classN="bi bi-person-plus-fill"></i> Thêm mới
                                </button>
                                <button className="btn btn-sm btn-primary" onClick={retrieveEmployees} disabled={loading}>
                                    <i className={`fas fa-redo ${loading ? 'fa-spin' : ''}`}></i> {loading ? "Đang làm mới..." : "Làm mới"}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default EmployeePage;
