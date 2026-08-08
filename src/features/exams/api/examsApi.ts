import axiosClient from '../../../api/axiosClient';
import { ENDPOINTS } from '../../../api/endpoints';
import type { ApiResponse } from '../../../types/api.types';
import type { Exam, ExamDetail } from '../../../types/models';

export interface CreateExamPayload {
  title: string;
  description: string;
  subject_id: string;
  duration_minutes: number;
  total_marks: number;
  pass_percentage: number;
  is_published: boolean;
}

export const examsApi = {
  list: async (): Promise<Exam[]> => {
    const res = await axiosClient.get<ApiResponse<Exam[]>>(ENDPOINTS.EXAMS.LIST);
    return res.data.responseObject;
  },

  listBySubject: async (subjectId: string): Promise<Exam[]> => {
    const res = await axiosClient.get<ApiResponse<Exam[]>>(ENDPOINTS.EXAMS.BY_SUBJECT(subjectId));
    return res.data.responseObject;
  },

  getById: async (id: string): Promise<Exam> => {
    const res = await axiosClient.get<ApiResponse<Exam>>(ENDPOINTS.EXAMS.BY_ID(id));
    return res.data.responseObject;
  },

  getDetail: async (id: string): Promise<ExamDetail> => {
    const res = await axiosClient.get<ApiResponse<ExamDetail>>(ENDPOINTS.EXAMS.DETAIL(id));
    return res.data.responseObject;
  },

  create: async (payload: CreateExamPayload): Promise<Exam> => {
    const res = await axiosClient.post<ApiResponse<Exam>>(ENDPOINTS.EXAMS.LIST, payload);
    return res.data.responseObject;
  },

  update: async (id: string, payload: Partial<CreateExamPayload>): Promise<Exam> => {
    const res = await axiosClient.put<ApiResponse<Exam>>(ENDPOINTS.EXAMS.BY_ID(id), payload);
    return res.data.responseObject;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(ENDPOINTS.EXAMS.BY_ID(id));
  },

  importExcel: async (file: File, subjectId?: string): Promise<unknown> => {
    const formData = new FormData();
    formData.append('file', file);
    if (subjectId) formData.append('subject_id', subjectId);
    const res = await axiosClient.post(ENDPOINTS.EXAMS.IMPORT, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};
