import axiosClient from '../../../api/axiosClient';
import { ENDPOINTS } from '../../../api/endpoints';
import type { ApiResponse } from '../../../types/api.types';
import type { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from '../types';

export const authApi = {
  login: async (payload: LoginPayload) => {
    const res = await axiosClient.post<ApiResponse<LoginResponse>>(ENDPOINTS.AUTH.LOGIN, payload);
    return res.data.responseObject;
  },

  register: async (payload: RegisterPayload) => {
    const res = await axiosClient.post<ApiResponse<RegisterResponse>>(ENDPOINTS.AUTH.REGISTER, payload);
    return res.data.responseObject;
  },

  logout: async () => {
    await axiosClient.post(ENDPOINTS.AUTH.LOGOUT);
  },

  refreshToken: async () => {
    const res = await axiosClient.post<ApiResponse<{ accessToken: string }>>(ENDPOINTS.AUTH.TOKEN);
    return res.data.responseObject;
  },
};
