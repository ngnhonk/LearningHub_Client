// =====================================================
// AUTH INTERCEPTOR — gắn Bearer token vào mọi request
// =====================================================
import type { InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../../features/auth/store/authStore';

export function applyAuthInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = useAuthStore.getState().accessToken;
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}
