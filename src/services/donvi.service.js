import createApiClient from "./api.service";

class DonViService {
    constructor(baseUrl = "/donvi") {
        this.api = createApiClient(baseUrl);
    }

    // Fetch all don vi records
    async getAll() {
        try {
            return (await this.api.get("/all")).data;
        } catch (error) {
            throw new Error(`Error fetching don vi records: ${error.message}`);
        }
    }

    // Search don vi by criteria (e.g., Ma_DV, Ten_DV)
    async search(params) {
        try {
            return (await this.api.get("/search", { params })).data;
        } catch (error) {
            throw new Error(`Error searching don vi: ${error.message}`);
        }
    }

    // Add a new don vi
    async add(data) {
        try {
            return (await this.api.post("/add", data)).data;
        } catch (error) {
            throw new Error(`Error adding don vi: ${error.message}`);
        }
    }

    // Update a don vi by Ma_DV
    async update(Ma_DV, data) {
        try {
            return (await this.api.put(`/update/${Ma_DV}`, data)).data;
        } catch (error) {
            throw new Error(`Error updating don vi: ${error.message}`);
        }
    }

    // Delete a don vi by Ma_DV
    async delete(Ma_DV) {
        try {
            return (await this.api.delete(`/delete/${Ma_DV}`)).data;
        } catch (error) {
            throw new Error(`Error deleting don vi: ${error.message}`);
        }
    }

    // Delete all don vi records
    async deleteAll() {
        try {
            return (await this.api.delete("/delete_all")).data;
        } catch (error) {
            throw new Error(`Error deleting all don vi records: ${error.message}`);
        }
    }
}

export default new DonViService();
