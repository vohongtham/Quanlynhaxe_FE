import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import StudentList from '../components/StudentList';
import StudentService from '../services/student.service';
import '../assets/styles/main.css';
import Navbar from "../components/Navbar";

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Retrieve all students
    const retrieveStudents = async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await StudentService.getAll();
            setStudents(response);
            setFilteredStudents(response);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const goToAdd = () => {
        navigate("/student/add");
    };

    const filteredStudentsCount = filteredStudents.length;

    useEffect(() => {
        retrieveStudents();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="col-md-12">
                    {filteredStudentsCount > 0 ? (
                        <StudentList
                            refreshList={retrieveStudents} // Pass the refresh function
                            students={filteredStudents}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                        />
                    ) : (
                        <p>Không có sinh viên nào.</p>
                    )}
                    <div className="row mt-2">
                        <div className="col d-flex justify-content-between align-items-center">
                            <button className="btn btn-sm btn-primary" onClick={goToAdd}>
                                <i className="bi bi-person-plus-fill"></i> Thêm mới
                            </button>
                            <button className="btn btn-sm btn-primary" onClick={retrieveStudents}>
                                <i className={`fas fa-redo ${loading ? 'fa-spin' : ''}`}></i>
                                {loading ? " Đang làm mới..." : " Làm mới"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentPage;
