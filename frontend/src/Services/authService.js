import axios from "axios";

const API_URL = "http://localhost:5000"; // Backend URL

// Register User
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data; // Returns the response from the backend
  } catch (error) {
    // Handle error appropriately
    throw error.response ? error.response.data : new Error("Server error");
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data; // Contains token, user info, and message
  } catch (error) {
    throw error.response ? error.response.data : { message: "An error occurred" };
  }
}; 
export default {
  register, login,
};
