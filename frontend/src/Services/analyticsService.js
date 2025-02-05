import axios from 'axios';

const API_URL = 'http://localhost:5000/analytics'; // Backend API endpoint

export const fetchAnalyticsData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error('Error fetching analytics data:', err);
    throw err;
  }
};
