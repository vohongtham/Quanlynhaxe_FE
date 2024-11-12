import React, { useState, useEffect } from "react";
import VehicleService from "../services/vehicle.service";
import { useNavigate } from "react-router-dom";
import VehicleList from "../components/VehicleList";
import Navbar from "../components/Navbar";
import { toast } from 'react-toastify';
import '../assets/styles/main.css';

const VehiclePage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const retrieveVehicles = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await VehicleService.getAll();
            setVehicles(response);
            setFilteredVehicles(response); // Reset the filtered list to the newly fetched data
        } catch (error) {
            setError(error);
            toast.error('Failed to fetch vehicles: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const goToAdd = () => {
        navigate("/vehicle/add");
    };

    const filteredVehiclesCount = filteredVehicles.length;

    useEffect(() => {
        retrieveVehicles();
    }, []);

    useEffect(() => {
        setFilteredVehicles(vehicles); // Update filtered vehicles when vehicles change
    }, [vehicles]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="col-md-12">
                    {filteredVehiclesCount > 0 ? (
                        <VehicleList
                            refreshList={retrieveVehicles}
                            vehicles={filteredVehicles}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                        />
                    ) : (
                        <p>Không có thông tin xe nào.</p>
                    )}
                    <div className="row mt-2">
                        <div className="col d-flex justify-content-between align-items-center">
                            <button className="btn btn-sm btn-primary" onClick={goToAdd}>
                                <i className="fas fa-plus"></i> Thêm mới
                            </button>
                            <button className="btn btn-sm btn-primary" onClick={retrieveVehicles}>
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

export default VehiclePage;
