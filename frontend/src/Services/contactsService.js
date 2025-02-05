import axios from 'axios';

const API_URL = 'http://localhost:5000/conts/contact';

export const sendContactMessage = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response;
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
};

