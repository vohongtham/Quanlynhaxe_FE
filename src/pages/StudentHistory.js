import React, { useState, useEffect } from "react";
import StudentParkingHistory from "../components/StudentParkingHistory";
import ChiTietRaVaoService from "../services/chitietravao.service";
// import { useNavigate, Link } from "react-router-dom";
import '../assets/styles/main.css';

const ChiTietRaVaoPage = () => {
    const [entries, setEntries] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const navigate = useNavigate();

    // Retrieve all entry/exit details
    const retrieveEntries = async () => {
        setLoading(true);
        setError(null); // Clear any previous errors
        try {
            const response = await ChiTietRaVaoService.getAll();
            setEntries(response);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        retrieveEntries();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <div className="justify-content-center">
                <div className="container">
                    <div className="mt-2 col-md-12">
                        {entries.length > 0 ? (
                            <StudentParkingHistory
                                entries={entries}
                                refreshList={retrieveEntries}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex} />
                        ) : (
                            <p>Không có chi tiết ra vào nào.</p>
                        )}
                        <div className="row mt-3">
                            <div className="col d-flex justify-content-end align-items-center">
                                <button className="btn btn-sm btn-primary" onClick={retrieveEntries} disabled={loading}>
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

export default ChiTietRaVaoPage;

