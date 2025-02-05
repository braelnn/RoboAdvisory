import axios from "axios";

const API_URL = "http://localhost:5000/profile";

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// Function to log user out and redirect to login
const handleAuthError = (error) => {
  if (error.response && error.response.status === 401) {
    console.error("Unauthorized! Logging out...");
    localStorage.removeItem("token"); // Clear token
    window.location.href = "/login"; // Redirect to login page
  }
  return Promise.reject(error);
};

// Get Profile
const getProfile = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    return handleAuthError(error);
  }
};

//  Update Profile
const updateProfile = async (profileData) => {
  try {
    const response = await apiClient.put("/", profileData);
    return response.data;
  } catch (error) {
    return handleAuthError(error);
  }
};

// Change Password
const changePassword = async (passwordData) => {
  try {
    const response = await apiClient.post("/change-password", passwordData);
    return response.data;
  } catch (error) {
    return handleAuthError(error);
  }
};

// Send Investment Guidance Email
const sendInvestmentEmail = async (profileData) => {
    try {
      await apiClient.post("/send-investment-email", profileData);
    } catch (error) {
      console.error("Error sending investment email:", error);
    }
  };
  
export default { getProfile, updateProfile, changePassword, sendInvestmentEmail };

