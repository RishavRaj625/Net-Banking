import axios from 'axios';

const API_URL = '/api/auth'; // Adjust the API URL as needed

const register = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data; // Assuming the response contains the user data
};

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data.token; // Assuming the response contains a token
};

export default {
    register,
    login,
};