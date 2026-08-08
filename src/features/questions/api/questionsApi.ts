import axiosClient from '../../../api/axiosClient';
import { ENDPOINTS } from '../../../api/endpoints';
import type { ApiResponse } from '../../../types/api.types';
import type { Question, Answer } from '../../../types/models';

export const questionsApi = {
  list: async (): Promise<Question[]> => {
    const res = await axiosClient.get<ApiResponse<Question[]>>(ENDPOINTS.QUESTIONS.LIST);
    return res.data.responseObject;
  },

  getById: async (id: string): Promise<Question> => {
    const res = await axiosClient.get<ApiResponse<Question>>(ENDPOINTS.QUESTIONS.BY_ID(id));
    return res.data.responseObject;
  },

  create: async (payload: { content: string }): Promise<Question> => {
    const res = await axiosClient.post<ApiResponse<Question>>(ENDPOINTS.QUESTIONS.CREATE, payload);
    return res.data.responseObject;
  },

  update: async (id: string, payload: { content: string }): Promise<Question> => {
    const res = await axiosClient.put<ApiResponse<Question>>(ENDPOINTS.QUESTIONS.UPDATE(id), payload);
    return res.data.responseObject;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(ENDPOINTS.QUESTIONS.DELETE(id));
  },
};

export const answersApi = {
  getByQuestion: async (questionId: string): Promise<Answer[]> => {
    const res = await axiosClient.get<ApiResponse<Answer[]>>(ENDPOINTS.ANSWERS.BY_QUESTION(questionId));
    return res.data.responseObject;
  },

  create: async (payload: { question_id: string; content: string; is_correct: boolean }): Promise<Answer> => {
    const res = await axiosClient.post<ApiResponse<Answer>>(ENDPOINTS.ANSWERS.CREATE, payload);
    return res.data.responseObject;
  },

  update: async (id: string, payload: { content?: string; is_correct?: boolean }): Promise<Answer> => {
    const res = await axiosClient.put<ApiResponse<Answer>>(ENDPOINTS.ANSWERS.UPDATE(id), payload);
    return res.data.responseObject;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(ENDPOINTS.ANSWERS.DELETE(id));
  },
};

export const examQuestionsApi = {
  getByExam: async (examId: string): Promise<Array<{ id: string; exam_id: string; question_id: string }>> => {
    const res = await axiosClient.get<ApiResponse<Array<{ id: string; exam_id: string; question_id: string }>>>(ENDPOINTS.EXAM_QUESTIONS.BY_EXAM(examId));
    return res.data.responseObject;
  },

  create: async (payload: { exam_id: string; question_id: string }): Promise<{ id: string; exam_id: string; question_id: string }> => {
    const res = await axiosClient.post<ApiResponse<{ id: string; exam_id: string; question_id: string }>>(ENDPOINTS.EXAM_QUESTIONS.CREATE, payload);
    return res.data.responseObject;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(ENDPOINTS.EXAM_QUESTIONS.DELETE(id));
  },
};
