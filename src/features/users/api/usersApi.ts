import axiosClient from '../../../api/axiosClient';
import { ENDPOINTS } from '../../../api/endpoints';
import type { ApiResponse } from '../../../types/api.types';
import type { User } from '../../../types/models';

export const usersApi = {
  getMe: async (): Promise<User> => {
    const res = await axiosClient.get<ApiResponse<User>>(ENDPOINTS.USERS.ME);
    return res.data.responseObject;
  },

  getById: async (id: string): Promise<User> => {
    const res = await axiosClient.get<ApiResponse<User>>(ENDPOINTS.USERS.BY_ID(id));
    return res.data.responseObject;
  },

  listAll: async (): Promise<User[]> => {
    const res = await axiosClient.get<ApiResponse<User[]>>(ENDPOINTS.USERS.LIST);
    return res.data.responseObject;
  },

  changeAvatar: async (file: File): Promise<User> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await axiosClient.put<ApiResponse<User>>(ENDPOINTS.USERS.CHANGE_AVATAR, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.responseObject;
  },

  changePassword: async (payload: { oldPassword: string; newPassword: string }): Promise<void> => {
    await axiosClient.put(ENDPOINTS.USERS.CHANGE_PASSWORD, payload);
  },

  changeRole: async (payload: { id: string; newRole: 'student' | 'teacher' | 'admin' }): Promise<void> => {
    await axiosClient.put(ENDPOINTS.USERS.CHANGE_ROLE, payload);
  },

  deleteUser: async (id: string): Promise<void> => {
    await axiosClient.delete(ENDPOINTS.USERS.BY_ID(id));
  },
};
