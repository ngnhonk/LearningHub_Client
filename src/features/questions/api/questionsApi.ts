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
    const res = await axiosClient.post<ApiResponse<Question>>(ENDPOINTS.QUESTIONS.LIST, payload);
    return res.data.responseObject;
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
};
