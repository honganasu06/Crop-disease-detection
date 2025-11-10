import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const predictDisease = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    // Don't set Content-Type header - browser will set it automatically with boundary
    const response = await api.post('/predict', formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to predict disease');
  }
};

export const getInsights = async () => {
  try {
    const response = await api.get('/insights');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch insights');
  }
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('API is not available');
  }
};

export default api;
