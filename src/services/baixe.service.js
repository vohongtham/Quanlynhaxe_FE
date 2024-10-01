import createApiClient from "./api.service";

class BaiXeService {
    constructor(baseUrl = "/baixe") {
        this.api = createApiClient(baseUrl);
    }

    // Fetch all bai_xe records
    async getAll() {
        try {
            const response = await this.api.get("/all");
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bai_xe records: ${error.message}`);
        }
    }

    // Search bai_xe records by criteria
    async search(params) {
        try {
            const response = await this.api.get("/search", { params });
            return response.data;
        } catch (error) {
            throw new Error(`Error searching bai_xe records: ${error.message}`);
        }
    }

    // Add a new bai_xe record
    async add(data) {
        try {
            const response = await this.api.post("/add", data);
            return response.data;
        } catch (error) {
            throw new Error(`Error adding bai_xe record: ${error.message}`);
        }
    }

    // Update a bai_xe record by Ma_BaiXe
    async update(Ma_BaiXe, data) {
        try {
            const response = await this.api.put(`/update/${Ma_BaiXe}`, data);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating bai_xe record: ${error.message}`);
        }
    }

    // Delete a bai_xe record by Ma_BaiXe
    async delete(Ma_BaiXe) {
        try {
            const response = await this.api.delete(`/delete/${Ma_BaiXe}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting bai_xe record: ${error.message}`);
        }
    }

    // Delete all bai_xe records
    async deleteAll() {
        try {
            const response = await this.api.delete("/delete_all");
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting all bai_xe records: ${error.message}`);
        }
    }
}

export default new BaiXeService();
