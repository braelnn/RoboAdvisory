import axios from "axios";

const API_URL = "http://localhost:5000/api/portfolios"; // Adjust this if using a deployed backend

// Fetch all portfolios
export const getPortfolios = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a portfolio
export const createPortfolio = async (portfolioData) => {
  const response = await axios.post(API_URL, portfolioData);
  return response.data;
};

// Update portfolio
export const updatePortfolio = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  };

// Delete a portfolio
export const deletePortfolio = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};