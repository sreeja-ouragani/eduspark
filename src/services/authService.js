import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = 'http://localhost:5000/auth'; // Adjust to match your backend structure

// Function for login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data; // Assuming success response contains token and user data
  } catch (error) {
    handleAuthError(error);
  }
};

// Function for signup
export const signupUser = async ({ name, email, password, phone }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, { name, email, password, phone });
    return response.data; // Assuming success response contains confirmation or token
  } catch (error) {
    handleAuthError(error);
  }
};

// Centralized error handling
const handleAuthError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.error || 'Unknown error occurred');
  } else if (error.request) {
    throw new Error('No response from backend server');
  } else {
    throw new Error(error.message);
  }
};
