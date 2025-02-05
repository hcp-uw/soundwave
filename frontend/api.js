import axios from 'axios';

// Replace with your backend URL or IP address (Ensure the backend is running)
const API_URL = 'http://localhost:3001';

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/your-endpoint`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const sendData = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/your-endpoint`, data);
        return response.data;
    } catch (error) {
        console.error("Error sending data:", error);
        return null;
    }
};
