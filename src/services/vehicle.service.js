// import createApiClient from "./api.service";

// class XeService {
//     constructor(baseUrl = "/xe") {
//         this.api = createApiClient(baseUrl);
//     }

//     // Fetch all vehicles
//     async getAll() {
//         try {
//             return (await this.api.get("/all")).data;
//         } catch (error) {
//             throw new Error(`Error fetching vehicles: ${error.message}`);
//         }
//     }

//     // Search vehicles by criteria (e.g., BienSoXe, Mssv, SoKhungXe, etc.)
//     async search(params) {
//         try {
//             return (await this.api.get("/search", { params })).data;
//         } catch (error) {
//             throw new Error(`Error searching vehicles: ${error.message}`);
//         }
//     }

//     // Add a new vehicle
//     async add(data) {
//         try {
//             return (await this.api.post("/add", data)).data;
//         } catch (error) {
//             throw new Error(`Error adding vehicle: ${error.message}`);
//         }
//     }

//     // Update a vehicle by BienSoXe
//     async update(BienSoXe, data) {
//         try {
//             return (await this.api.put(`/update/${BienSoXe}`, data)).data;
//         } catch (error) {
//             throw new Error(`Error updating vehicle: ${error.message}`);
//         }
//     }

//     // Delete a vehicle by BienSoXe
//     async delete(BienSoXe) {
//         try {
//             return (await this.api.delete(`/delete/${BienSoXe}`)).data;
//         } catch (error) {
//             throw new Error(`Error deleting vehicle: ${error.message}`);
//         }
//     }

//     // Delete all vehicles
//     async deleteAll() {
//         try {
//             return (await this.api.delete("/delete_all")).data;
//         } catch (error) {
//             throw new Error(`Error deleting all vehicles: ${error.message}`);
//         }
//     }
// }

// export default new XeService();


import createApiClient from "./api.service";

class XeService {
    constructor(baseUrl = "/xe") {
        this.api = createApiClient(baseUrl);
    }

    // Fetch all vehicles
    async getAll() {
        try {
            return (await this.api.get("/all")).data;
        } catch (error) {
            throw new Error(`Error fetching vehicles: ${error.message}`);
        }
    }

    // Search vehicles by criteria (e.g., BienSoXe, Mssv, SoKhungXe, etc.)
    async search(params) {
        try {
            return (await this.api.get("/search", { params })).data;
        } catch (error) {
            throw new Error(`Error searching vehicles: ${error.message}`);
        }
    }

    // Add a new vehicle
    // async add(data) {
    //     try {
    //         return (await this.api.post("/add", data)).data;
    //     } catch (error) {
    //         throw new Error(`Error adding vehicle: ${error.message}`);
    //     }
    // }
    async add(data) {
        try {
            const response = await this.api.post("/add", data);
            return response.data;
        } catch (error) {
            // Check if the error response is available and extract the message
            if (error.response) {
                const errorMessage = error.response.data.error || "Error adding vehicle.";
                throw new Error(`${errorMessage}`);
            } else {
                throw new Error(`${error.message}`);
            }
        }
    }
    

    // Update a vehicle by BienSoXe
    async update(BienSoXe, data) {
        try {
            return (await this.api.put(`/update/${BienSoXe}`, data)).data;
        } catch (error) {
            throw new Error(`Error updating vehicle: ${error.message}`);
        }
    }

    // Delete a vehicle by BienSoXe
    // async delete(BienSoXe) {
    //     try {
    //         // console.log("Deleting vehicle with identifier:", BienSoXe); // Log the identifier
    //         const response = await this.api.delete(`/delete/${BienSoXe}`);
    //         return response.data;
    //     } catch (error) {
    //         // console.error(`Error deleting vehicle: ${error.message}`); // Log the error message
    //         console.error(`Error deleting vehicle: ${error.response ? error.response.data : error.message}`);
    //         throw new Error(`Error deleting vehicle: ${error.message}`);
    //     }
    // }

    async delete(BienSoXe) {
        try {
            const response = await this.api.delete(`/delete/${BienSoXe}`);
            return response.data;
        } catch (error) {
            // In thông tin chi tiết về lỗi
            if (error.response) {
                // Nếu có phản hồi từ server
                console.error(`Error deleting vehicle: ${JSON.stringify(error.response.data)}`);
                throw new Error(`Error deleting vehicle: ${error.response.data.message || error.message}`);
            } else {
                // Nếu không có phản hồi từ server
                console.error(`Error deleting vehicle: ${error.message}`);
                throw new Error(`Error deleting vehicle: ${error.message}`);
            }
        }
    }
    

    // Delete all vehicles
    async deleteAll() {
        try {
            return (await this.api.delete("/delete_all")).data;
        } catch (error) {
            throw new Error(`Error deleting all vehicles: ${error.message}`);
        }
    }
}

// // Create an instance of VehicleService and export it
// const vehicleServiceInstance = new VehicleService();
// export default vehicleServiceInstance;

const xeService = new XeService();
export default xeService;
