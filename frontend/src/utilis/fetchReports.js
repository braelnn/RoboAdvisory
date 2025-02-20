import api from './api';

export const fetchReportsByPortfolio = async (portfolioId) => {
    try {
        const response = await api.get(`/reports/${portfolioId}`);
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching reports:', error.response?.data || error.message);
        return [];
    }
};

export const createReportForPortfolio = async (portfolioId, reportData) => {
    try {
        console.log(`📢 Sending Report Data to Backend:`, reportData); // ✅ Debugging
        const response = await api.post(`/reports/${portfolioId}`, reportData);
        console.log(`✅ Report Created Successfully:`, response.data); // ✅ Debugging
        return response.data;
    } catch (error) {
        console.error('❌ Error creating report:', error.response?.data || error.message);
        return null;
    }
};
