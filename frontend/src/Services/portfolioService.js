import axios from 'axios';

const API_URL = 'http://localhost:5000/portf'; // Matches backend route

/**
 * Fetch all portfolios.
 */
export const getPortfolios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error('Error fetching portfolios:', err);
    throw err;
  }
};

/**
 * Create a new portfolio.
 */
export const createPortfolio = async (portfolioData) => {
  try {
    const response = await axios.post(API_URL, portfolioData);
    return response.data;
  } catch (err) {
    console.error('Error creating portfolio:', err);
    throw err;
  }
};

/**
 * Delete a portfolio by ID.
 */
export const deletePortfolio = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error deleting portfolio:', err);
    throw err;
  }
};

/**
 * Update a portfolio by ID.
 */
export const updatePortfolio = async (id, portfolioData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, portfolioData);
    return response.data;
  } catch (err) {
    console.error('Error updating portfolio:', err);
    throw err;
  }
};

/**
 * Fetch a portfolio by ID.
 */
export const getPortfolioById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching portfolio by ID:', err);
    throw err;
  }
};

/**
 * Add history data to a portfolio.
 * This function updates the portfolio's `history` field.
 */
export const addPortfolioHistory = async (id, historyData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/history`, historyData);
    return response.data;
  } catch (err) {
    console.error('Error adding portfolio history:', err);
    throw err;
  }
};
