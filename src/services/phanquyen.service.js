import createApiClient from "./api.service";

class PhanQuyenService {
    constructor(baseUrl = "/phanquyen") {
        this.api = createApiClient(baseUrl);
    }

    // Fetch all Phanquyen records
    async getAll() {
        try {
            const response = await this.api.get("/all");
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching Phanquyen records: ${error.message}`);
        }
    }

    // Search Phanquyen records by criteria
    async search(params) {
        try {
            const response = await this.api.get("/search", { params });
            return response.data;
        } catch (error) {
            throw new Error(`Error searching Phanquyen records: ${error.message}`);
        }
    }

    // Add a new Phanquyen record
    async add(data) {
        try {
            const response = await this.api.post("/add", data);
            return response.data;
        } catch (error) {
            throw new Error(`Error adding Phanquyen record: ${error.message}`);
        }
    }

    // Update a Phanquyen record by Ma_Quyen
    async update(Ma_Quyen, data) {
        try {
            const response = await this.api.put(`/update/${Ma_Quyen}`, data);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating Phanquyen record: ${error.message}`);
        }
    }

    // Delete a Phanquyen record by Ma_Quyen
    async delete(Ma_Quyen) {
        try {
            const response = await this.api.delete(`/delete/${Ma_Quyen}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting Phanquyen record: ${error.message}`);
        }
    }

    // Delete all Phanquyen records
    async deleteAll() {
        try {
            const response = await this.api.delete("/delete_all");
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting all Phanquyen records: ${error.message}`);
        }
    }
}

export default new PhanQuyenService();
