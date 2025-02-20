import axios from 'axios';

// Backend API Base URL
const API_URL = 'http://localhost:5000/api';

// Axios instance with default headers
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Attach token for authentication & handle expired tokens
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 errors (Invalid/Expired Token)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("🔒 Unauthorized: Invalid or expired token.");
            localStorage.removeItem('token'); // Clear invalid token
            window.location.href = "/login"; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default api;
