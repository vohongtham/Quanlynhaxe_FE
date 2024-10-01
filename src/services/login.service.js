import createApiClient from "./api.service";

class LoginService {
    constructor(baseUrl = "") {
        this.api = createApiClient(baseUrl);
    }

    // Login user (student or regular user)
    async login(data) {
        try {
            const response = await this.api.post("/login", data);
            // If login is successful, return the token and user info
            return response.data;
        } catch (error) {
            // Handle error during login
            throw new Error(`Error logging in: ${error.response?.data?.error || error.message}`);
        }
    }

    // Register a new student
    async register(data) {
        try {
            const response = await this.api.post("/register", data);
            // Return response from server
            return response.data;
        } catch (error) {
            // Handle error during registration
            throw new Error(`Error registering student: ${error.response?.data?.error || error.message}`);
        }
    }

    // Logout user (invalidate token)
    async logout() {
        try {
            const response = await this.api.post("/logout");
            // Return successful logout message
            return response.data;
        } catch (error) {
            // Handle error during logout
            throw new Error(`Error logging out: ${error.response?.data?.error || error.message}`);
        }
    }
}

export default new LoginService();
