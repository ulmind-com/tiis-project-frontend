/**
 * Centralized Axios instance for all API calls.
 * Uses VITE_API_URL env variable for deployed backend,
 * falls back to '/' for local dev (Vite proxy handles routing).
 */
import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000, // 15 second timeout per request
});

// Request interceptor — attach JWT if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — normalize errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('API request timed out.');
    } else if (error.response?.status === 503) {
      console.warn('Database is connecting, please retry in a moment.');
    } else if (error.response?.status === 500) {
      console.error('Server error:', error.response?.data?.message || 'Unknown server error');
    }
    return Promise.reject(error);
  }
);

export default api;
