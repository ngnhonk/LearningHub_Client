import axiosClient from '../../../api/axiosClient';
import { ENDPOINTS } from '../../../api/endpoints';
import type { ApiResponse } from '../../../types/api.types';
import type { GenerateExamPayload, VectorStatus } from '../../../types/models';

export const aiApi = {
  generateExam: async (payload: GenerateExamPayload): Promise<unknown> => {
    const res = await axiosClient.post<ApiResponse<unknown>>(ENDPOINTS.AI.GENERATE_EXAM, payload, {
      timeout: 150000,
    });
    return res.data.responseObject;
  },

  uploadDocument: async (file: File, subjectId: string): Promise<unknown> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('subject_id', subjectId);
    const res = await axiosClient.post<ApiResponse<unknown>>(ENDPOINTS.AI.UPLOAD_DOCUMENT, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 180000, // 3 phút cho tài liệu lớn
    });
    return res.data;
  },

  syncQuestions: async (subjectId: string): Promise<unknown> => {
    const res = await axiosClient.post<ApiResponse<unknown>>(
      ENDPOINTS.AI.SYNC_QUESTIONS,
      { subject_id: subjectId },
      { timeout: 180000 } // 3 phút cho đồng bộ dữ liệu lớn
    );
    return res.data;
  },

  getVectorStatus: async (): Promise<VectorStatus> => {
    const res = await axiosClient.get<ApiResponse<VectorStatus>>(ENDPOINTS.AI.VECTOR_STATUS);
    return res.data.responseObject;
  },
};
