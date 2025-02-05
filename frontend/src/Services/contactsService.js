import axios from 'axios';

const API_URL = 'http://localhost:5000/conts/contact';

export const sendContactMessage = async (data, token) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach user token
      },
    });
    return response;
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
};
