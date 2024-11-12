import createApiClient from "./api.service";

class StatisticalService {
    constructor(baseUrl = "/thongke") {
        this.api = createApiClient(baseUrl);
    }

    // Thống kê theo ngày
    async getByDay(ngay, ma_baixe) {
        try {
            return (await this.api.get("/ngay", { params: { ngay, ma_baixe } })).data;
        } catch (error) {
            throw new Error(`Error fetching daily statistics: ${error.message}`);
        }
    }

    // Thống kê theo tuần
    async getByWeek(ngay, ma_baixe) {
        try {
            return (await this.api.get("/tuan", { params: { ngay, ma_baixe } })).data;
        } catch (error) {
            throw new Error(`Error fetching weekly statistics: ${error.message}`);
        }
    }

    // Thống kê theo tháng
    async getByMonth(thang, nam, ma_baixe) {
        try {
            return (await this.api.get("/thang", { params: { thang, nam, ma_baixe } })).data;
        } catch (error) {
            throw new Error(`Error fetching monthly statistics: ${error.message}`);
        }
    }

    // Thống kê theo năm
    async getByYear(nam, ma_baixe) {
        try {
            return (await this.api.get("/nam", { params: { nam, ma_baixe } })).data;
        } catch (error) {
            throw new Error(`Error fetching yearly statistics: ${error.message}`);
        }
    }
}

export default new StatisticalService();
