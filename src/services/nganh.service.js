import createApiClient from "./api.service";

class NganhService {
    constructor(baseUrl = "/nganh") {
        this.api = createApiClient(baseUrl);
    }

    // Fetch all nganhs
    async getAll() {
        try {
            return (await this.api.get("/all")).data;
        } catch (error) {
            throw new Error(`Error fetching nganhs: ${error.message}`);
        }
    }

    // Search nganhs by criteria (e.g., Ma_Nganh, Ten_Nganh)
    async search(params) {
        try {
            return (await this.api.get("/search", { params })).data;
        } catch (error) {
            throw new Error(`Error searching nganhs: ${error.message}`);
        }
    }

    // Add a new nganh
    async add(data) {
        try {
            return (await this.api.post("/add", data)).data;
        } catch (error) {
            throw new Error(`Error adding nganh: ${error.message}`);
        }
    }

    // Update a nganh by Ma_Nganh
    async update(Ma_Nganh, data) {
        try {
            return (await this.api.put(`/update/${Ma_Nganh}`, data)).data;
        } catch (error) {
            throw new Error(`Error updating nganh: ${error.message}`);
        }
    }

    // Delete a nganh by Ma_Nganh
    async delete(Ma_Nganh) {
        try {
            return (await this.api.delete(`/delete/${Ma_Nganh}`)).data;
        } catch (error) {
            throw new Error(`Error deleting nganh: ${error.message}`);
        }
    }

    // Delete all nganhs
    async deleteAll() {
        try {
            return (await this.api.delete("/delete_all")).data;
        } catch (error) {
            throw new Error(`Error deleting all nganhs: ${error.message}`);
        }
    }
}

export default new NganhService();
