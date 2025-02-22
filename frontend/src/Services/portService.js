import axios from "axios";

const API_URL = "http://localhost:5000/api/portfolios";

// ✅ Function to include Authorization token safely
const getHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("❌ No token found in localStorage!");
        return {}; // Return empty headers to prevent crashing
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };
};

// 📌 Fetch all portfolios
export const getPortfolios = async () => {
    try {
        const response = await axios.get(API_URL, getHeaders());
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching portfolios:", error.response?.data || error.message);
        return { error: "Failed to fetch portfolios", data: [] };
    }
};

// 📌 Create a portfolio
export const createPortfolio = async (portfolioData) => {
    try {
        const headers = getHeaders();
        if (!headers.headers.Authorization) {
            alert("You are not logged in. Please log in to create a portfolio.");
            return { error: "User not authenticated", data: null };
        }

        const response = await axios.post(API_URL, portfolioData, headers);
        return response.data;
    } catch (error) {
        console.error("❌ Error creating portfolio:", error.response?.data || error.message);
        return { error: "Failed to create portfolio", data: null };
    }
};

// 📌 Update portfolio
export const updatePortfolio = async (id, updatedData) => {
    try {
        const headers = getHeaders();
        if (!headers.headers.Authorization) {
            alert("You are not logged in. Please log in to update the portfolio.");
            return { error: "User not authenticated", data: null };
        }

        const response = await axios.put(`${API_URL}/${id}`, updatedData, headers);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating portfolio:", error.response?.data || error.message);
        return { error: "Failed to update portfolio", data: null };
    }
};

// 📌 Delete portfolio
export const deletePortfolio = async (id) => {
    try {
        const headers = getHeaders();
        if (!headers.headers.Authorization) {
            alert("You are not logged in. Please log in to delete the portfolio.");
            return { error: "User not authenticated" };
        }

        const response = await axios.delete(`${API_URL}/${id}`, headers);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting portfolio:", error.response?.data || error.message);
        return { error: "Failed to delete portfolio" };
    }
};
