// import createApiClient from "./api.service";

// class SinhVienService {
//     constructor(baseUrl = "/sv") {
//         this.api = createApiClient(baseUrl);
//     }

//     // Fetch all students
//     async getAll() {
//         try {
//             const response = await this.api.get("/all");
//             return response.data;
//         } catch (error) {
//             throw new Error(`Error fetching students: ${error.message}`);
//         }
//     }

//     // Search students by criteria
//     async search(params) {
//         try {
//             const response = await this.api.get("/search", { params });
//             return response.data;
//         } catch (error) {
//             throw new Error(`Error searching students: ${error.message}`);
//         }
//     }

//     // Add getCurrentStudent method if missing
//     async getCurrentStudent() {
//         const userEmail = localStorage.getItem('userEmail'); // Retrieve the email from local storage
//         if (userEmail) {
//             try {
//                 const response = await this.api.get(`/search`, {
//                     params: { Email: userEmail }, // Use `Email` as the search parameter
//                 });
//                 return response.data; // Return the data from the response
//             } catch (error) {
//                 throw new Error(`Error fetching current student: ${error.message}`);
//             }
//         } else {
//             throw new Error('User email not found in local storage');
//         }
//     }
    

//     // Add a new student
//     async add(data) {
//         try {
//             const response = await this.api.post("/add", data);
//             return response.data;
//         } catch (error) {
//             throw new Error(`Error adding student: ${error.message}`);
//         }
//     }

//     // Update student information by Mssv
//     // async update(Mssv, data) {
//     //     try {
//     //         const response = await this.api.put(`/update/${Mssv}`, data);
//     //         return response.data;
//     //     } catch (error) {
//     //         throw new Error(`Error updating student: ${error.message}`);
//     //     }
//     // }

//     // Update student information by Mssv
//     async update(Mssv, data) {
//         if (!Mssv) {
//             throw new Error('Mssv is required to update student information');
//         }
//         try {
//             const response = await this.api.put(`/update/${Mssv}`, data);
//             return response.data;
//         } catch (error) {
//             throw new Error(`Error updating student: ${error.response?.data?.message || error.message}`);
//         }
//     }


//     // Delete a student by Mssv
//     async delete(Mssv) {
//         try {
//             const response = await this.api.delete(`/delete/${Mssv}`);
//             return response.data;
//         } catch (error) {
//             throw new Error(`Error deleting student: ${error.message}`);
//         }
//     }

//     // Delete all students
//     async deleteAll() {
//         try {
//             const response = await this.api.delete("/delete_all");
//             return response.data;
//         } catch (error) {
//             throw new Error(`Error deleting all students: ${error.message}`);
//         }
//     }
// }

// export default new SinhVienService();




import createApiClient from "./api.service";

class SinhVienService {
    constructor(baseUrl = "/sv") {
        this.api = createApiClient(baseUrl);
    }

    // Fetch all students
    async getAll() {
        try {
            const response = await this.api.get("/all");
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching students: ${error.message}`);
        }
    }

    // Search students by criteria
    async search(params) {
        try {
            const response = await this.api.get("/search", { params });
            return response.data;
        } catch (error) {
            throw new Error(`Error searching students: ${error.message}`);
        }
    }

    // Fetch current student based on email in local storage
    async getCurrentStudent() {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            try {
                const response = await this.api.get(`/search`, {
                    params: { Email: userEmail },
                });
                return response.data;
            } catch (error) {
                throw new Error(`Error fetching current student: ${error.message}`);
            }
        } else {
            throw new Error('User email not found in local storage');
        }
    }

    // Add a new student
    async add(data) {
        try {
            const response = await this.api.post("/add", data);
            return response.data;
        } catch (error) {
            throw new Error(`Error adding student: ${error.message}`);
        }
    }

    // Update student information by Mssv
    async update(Mssv, data) {
        if (!Mssv) {
            throw new Error('Mssv is required to update student information');
        }
        try {
            const response = await this.api.put(`/update/${Mssv}`, data);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating student: ${error.response?.data?.message || error.message}`);
        }
    }

    // Delete a student by Mssv
    async delete(Mssv) {
        try {
            const response = await this.api.delete(`/delete/${Mssv}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting student: ${error.message}`);
        }
    }

    // Delete all students
    async deleteAll() {
        try {
            const response = await this.api.delete("/delete_all");
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting all students: ${error.message}`);
        }
    }
}

export default new SinhVienService();
