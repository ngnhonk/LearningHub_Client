// =====================================================
// AXIOS CLIENT — instance chính với interceptors
// =====================================================
import axios from 'axios';
import { applyAuthInterceptor } from './interceptors/authInterceptor';
import { applyRefreshInterceptor } from './interceptors/refreshInterceptor';

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // để gửi HttpOnly Cookie refreshToken
});

// Request interceptor: gắn Bearer token
axiosClient.interceptors.request.use(applyAuthInterceptor, (error) => Promise.reject(error));

// Response interceptor: xử lý auto refresh token khi 401
applyRefreshInterceptor(axiosClient);

export default axiosClient;
