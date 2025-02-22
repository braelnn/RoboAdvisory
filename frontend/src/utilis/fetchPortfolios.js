import axios from "axios";

const API_URL = "http://localhost:5000/api/portfolios";

// Fetch all portfolios
export const fetchPortfolios = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching portfolios:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a portfolio
// export const deletePortfolio = async (portfolioId) => {
//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       throw new Error("No authentication token found. Please log in.");
//     }

//     const response = await axios.delete(`${API_URL}/${portfolioId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("❌ Error deleting portfolio:", error.response?.data || error.message);
//     throw error;
//   }
// };
