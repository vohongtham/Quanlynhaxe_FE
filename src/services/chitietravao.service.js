import createApiClient from "./api.service";

class ChiTietRaVaoService {
    constructor(baseUrl = "/chitietravao") {
        this.api = createApiClient(baseUrl);
    }

    // Fetch all ChiTietRaVao records
    async getAll() {
        try {
            const response = await this.api.get("/all");
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching ChiTietRaVao records: ${error.message}`);
        }
    }

    // Search ChiTietRaVao records by criteria
    async search(params) {
        try {
            const response = await this.api.get("/search", { params });
            return response.data;
        } catch (error) {
            throw new Error(`Error searching ChiTietRaVao records: ${error.message}`);
        }
    }

    // Add a new ChiTietRaVao record
    async add(data) {
        try {
            const response = await this.api.post("/add", data);
            // Thông báo khi thêm thành công
            console.log("Thêm xe thành công:", response.data);

            return response.data;
        } catch (error) {
            console.error("Error saving vehicle data:", error);
            throw new Error(`Error adding ChiTietRaVao record: ${error.message}`);
        }
    }

    // Update ChiTietRaVao record by Ma_CT
    async update(Ma_CT, data) {
        if (!Ma_CT) {
            throw new Error('Ma_CT is required to update ChiTietRaVao record');
        }
        try {
            const response = await this.api.put(`/update/${Ma_CT}`, data);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating ChiTietRaVao record: ${error.response?.data?.message || error.message}`);
        }
    }

    // Delete a ChiTietRaVao record by Ma_CT
    async delete(Ma_CT) {
        try {
            const response = await this.api.delete(`/delete/${Ma_CT}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting ChiTietRaVao record: ${error.message}`);
        }
    }

    // Delete all ChiTietRaVao records
    async deleteAll() {
        try {
            const response = await this.api.delete("/delete_all");
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting all ChiTietRaVao records: ${error.message}`);
        }
    }
}

export default new ChiTietRaVaoService();
