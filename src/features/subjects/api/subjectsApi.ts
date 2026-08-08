import axiosClient from '../../../api/axiosClient';
import { ENDPOINTS } from '../../../api/endpoints';
import type { ApiResponse } from '../../../types/api.types';
import type { Subject } from '../../../types/models';

export const subjectsApi = {
  list: async (): Promise<Subject[]> => {
    const res = await axiosClient.get<ApiResponse<Subject[]>>(ENDPOINTS.SUBJECTS.LIST);
    return res.data.responseObject;
  },

  getById: async (id: string): Promise<Subject> => {
    const res = await axiosClient.get<ApiResponse<Subject>>(ENDPOINTS.SUBJECTS.BY_ID(id));
    return res.data.responseObject;
  },

  create: async (payload: { name: string; description: string }): Promise<Subject> => {
    const res = await axiosClient.post<ApiResponse<Subject>>(ENDPOINTS.SUBJECTS.LIST, payload);
    return res.data.responseObject;
  },

  update: async (id: string, payload: { name?: string; description?: string }): Promise<Subject> => {
    const res = await axiosClient.put<ApiResponse<Subject>>(ENDPOINTS.SUBJECTS.BY_ID(id), payload);
    return res.data.responseObject;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(ENDPOINTS.SUBJECTS.BY_ID(id));
  },
};
