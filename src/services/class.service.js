import createApiClient from "./api.service"; // Assuming you have an API client setup

class LopService {
    constructor(baseUrl = "/lop") {
        this.api = createApiClient(baseUrl);
    }

    // Fetch all Lops
    async getAll() {
        try {
            const response = await this.api.get("/all");
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching Lop records: ${error.message}`);
        }
    }

    // Search Lops by criteria
    async search(params) {
        try {
            const response = await this.api.get("/search", { params });
            return response.data;
        } catch (error) {
            throw new Error(`Error searching Lop records: ${error.message}`);
        }
    }

    // Add a new Lop
    async add(data) {
        try {
            const response = await this.api.post("/add", data);
            return response.data;
        } catch (error) {
            throw new Error(`Error adding Lop record: ${error.message}`);
        }
    }

    // Update a Lop by Ma_Lop
    async update(Ma_Lop, data) {
        try {
            const response = await this.api.put(`/update/${Ma_Lop}`, data);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating Lop record: ${error.message}`);
        }
    }

    // Delete a Lop by Ma_Lop
    async delete(Ma_Lop) {
        try {
            const response = await this.api.delete(`/delete/${Ma_Lop}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting Lop record: ${error.message}`);
        }
    }

    // Delete all Lops
    async deleteAll() {
        try {
            const response = await this.api.delete("/delete_all");
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting all Lop records: ${error.message}`);
        }
    }
}

export default new LopService();
