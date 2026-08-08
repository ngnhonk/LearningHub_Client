// =====================================================
// REFRESH INTERCEPTOR — auto refresh khi nhận 401
// =====================================================
import type { AxiosError, AxiosInstance } from 'axios';
import { ENDPOINTS } from '../endpoints';
import { useAuthStore } from '../../features/auth/store/authStore';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: AxiosError | null, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

export function applyRefreshInterceptor(client: AxiosInstance) {
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as typeof error.config & { _retry?: boolean };

      // Nếu không phải 401, hoặc đây đã là retry → reject
      if (error.response?.status !== 401 || originalRequest?._retry) {
        return Promise.reject(error);
      }

      // Nếu đang refresh → queue request lại
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest?.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            return client(originalRequest!);
          })
          .catch((err) => Promise.reject(err));
      }

      if (originalRequest) originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Gọi refresh token — dùng cookie HttpOnly
        const res = await client.post(ENDPOINTS.AUTH.TOKEN);
        const newToken: string = res.data?.responseObject?.accessToken;

        if (!newToken) throw new Error('No token in refresh response');

        useAuthStore.getState().setAccessToken(newToken);
        client.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        if (originalRequest?.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        }

        processQueue(null, newToken);
        return client(originalRequest!);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
}
