import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/user") {
        this.api = createApiClient(baseUrl);
    }

    // Fetch all users
    async getAll() {
        try {
            return (await this.api.get("/all")).data;
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }

    // Search users by criteria
    async search(params) {
        try {
            return (await this.api.get("/search", { params })).data;
        } catch (error) {
            throw new Error(`Error searching users: ${error.message}`);
        }
    }

    // Add a new user
    // async add(data) {
    //     try {
    //         return (await this.api.post("/add", data)).data;
    //     } catch (error) {
    //         throw new Error(`Error adding user: ${error.message}`);
    //     }
    // }

    // Add a new user
    async add(data) {
        try {
            const response = await this.api.post("/add", data);
            return response.data; // Return the response data on success
        } catch (error) {
            // Check if the error has a response (meaning the server responded with an error)
            if (error.response) {
                // Extract and throw the specific error message from the server response
                throw new Error(`${error.response.data.error || error.message}`);
            } else {
                // Handle network errors or other issues where there's no response
                throw new Error(`${error.message}`);
            }
        }
    }


    // Update a user by Ma_user
    async update(Ma_user, data) {
        try {
            return (await this.api.put(`/update/${Ma_user}`, data)).data;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    // Delete a user by Ma_user
    async delete(Ma_user) {
        try {
            return (await this.api.delete(`/delete/${Ma_user}`)).data;
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    // Delete all users
    async deleteAll() {
        try {
            return (await this.api.delete("/delete_all")).data;
        } catch (error) {
            throw new Error(`Error deleting all users: ${error.message}`);
        }
    }
}

export default new UserService();
