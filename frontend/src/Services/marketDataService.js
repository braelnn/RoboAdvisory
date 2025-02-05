import axios from 'axios';

const API_URL = 'http://localhost:5000/market-data';

export const getRealTimeData = async () => {
  const response = await axios.get(`${API_URL}/real-time`);
  return response.data;
};

export const getHistoricalData = async (symbol, range) => {
  const response = await axios.get(`${API_URL}/historical`, {
    params: { symbol, range },
  });
  return response.data;
};

export const getMarketNews = async () => {
  const response = await axios.get(`${API_URL}/news`);
  return response.data;
};
