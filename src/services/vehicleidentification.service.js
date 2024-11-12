
import createApiClient from "./api.service";

class VehicleIdentificationService {
    constructor(baseUrl = "/vehicle") {
        this.api = createApiClient(baseUrl);
    }

    // Gửi một khung hình ảnh/video để nhận diện biển số xe
    async recognizeLicensePlate(frame) {
        try {
            // Tạo FormData để gửi frame
            const formData = new FormData();
            formData.append("frame", frame);

            // Ghi lại nội dung FormData để kiểm tra
            console.log("FormData contents:");
            for (const pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            // Gửi yêu cầu POST đến endpoint nhận diện biển số
            const response = await this.api.post("/identification", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Quan trọng cho việc tải file
                },
            });

            console.log("Server Response:", response.data); // Kiểm tra phản hồi từ server

            // Trả về thông tin biển số xe đã nhận diện từ server
            if (response.data.license_plate_info) {
                return response.data.license_plate_info; // Cập nhật theo cấu trúc phản hồi
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            console.error('Error recognizing license plate:', error); // Ghi lại lỗi
            throw new Error(`Error recognizing license plate: ${error.message}`);
        }
    }
}

export default new VehicleIdentificationService();
