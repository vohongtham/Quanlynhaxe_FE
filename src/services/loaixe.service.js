import createApiClient from "./api.service";

class LoaiXeService {
    constructor(baseUrl = "/loaixe") {
        this.api = createApiClient(baseUrl);
    }

    // Fetch all LoaiXe
    async getAll() {
        try {
            return (await this.api.get("/all")).data;
        } catch (error) {
            throw new Error(`Error fetching LoaiXe: ${error.message}`);
        }
    }

    // Search LoaiXe by criteria (e.g., LoaiXe name or price)
    async search(params) {
        try {
            return (await this.api.get("/search", { params })).data;
        } catch (error) {
            throw new Error(`Error searching LoaiXe: ${error.message}`);
        }
    }

    // Add a new LoaiXe
    async add(data) {
        try {
            const response = await this.api.post("/add", data);
            return response.data;
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.error || "Error adding LoaiXe.";
                throw new Error(errorMessage);
            } else {
                throw new Error(error.message);
            }
        }
    }

    // Update a LoaiXe by name or identifier
    async update(LoaiXe, data) {
        try {
            return (await this.api.put(`/update/${LoaiXe}`, data)).data;
        } catch (error) {
            throw new Error(`Error updating LoaiXe: ${error.message}`);
        }
    }

    // Delete a LoaiXe by name or identifier
    async delete(LoaiXe) {
        try {
            const response = await this.api.delete(`/delete/${LoaiXe}`);
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error(`Error deleting LoaiXe: ${JSON.stringify(error.response.data)}`);
                throw new Error(`Error deleting LoaiXe: ${error.response.data.message || error.message}`);
            } else {
                console.error(`Error deleting LoaiXe: ${error.message}`);
                throw new Error(`Error deleting LoaiXe: ${error.message}`);
            }
        }
    }

    // Delete all LoaiXe
    async deleteAll() {
        try {
            return (await this.api.delete("/delete_all")).data;
        } catch (error) {
            throw new Error(`Error deleting all LoaiXe: ${error.message}`);
        }
    }
}

// Create and export an instance of LoaiXeService
const loaixeService = new LoaiXeService();
export default loaixeService;
