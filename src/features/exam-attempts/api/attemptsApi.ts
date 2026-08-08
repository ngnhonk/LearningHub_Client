import axiosClient from '../../../api/axiosClient';
import { ENDPOINTS } from '../../../api/endpoints';
import type { ApiResponse } from '../../../types/api.types';
import type { ExamAttempt, ActiveAttempt, ExamResult, SavedAnswer } from '../../../types/models';

export const attemptsApi = {
  start: async (examId: string): Promise<ExamAttempt> => {
    const res = await axiosClient.post<ApiResponse<ExamAttempt>>(ENDPOINTS.ATTEMPTS.START, { exam_id: examId });
    return res.data.responseObject;
  },

  getActive: async (examId: string): Promise<ActiveAttempt> => {
    const res = await axiosClient.get<ApiResponse<ActiveAttempt>>(ENDPOINTS.ATTEMPTS.ACTIVE(examId));
    return res.data.responseObject;
  },

  saveAnswers: async (attemptId: string, answers: SavedAnswer[]): Promise<void> => {
    await axiosClient.post(ENDPOINTS.ATTEMPTS.SAVE_ANSWERS(attemptId), { answers });
  },

  submit: async (attemptId: string, answers?: SavedAnswer[]): Promise<ExamAttempt> => {
    const res = await axiosClient.put<ApiResponse<ExamAttempt>>(ENDPOINTS.ATTEMPTS.SUBMIT(attemptId), { answers });
    return res.data.responseObject;
  },

  getResult: async (attemptId: string): Promise<ExamResult> => {
    const res = await axiosClient.get<ApiResponse<ExamResult>>(ENDPOINTS.ATTEMPTS.RESULT(attemptId));
    return res.data.responseObject;
  },

  getUserHistory: async (userId: string = 'me'): Promise<ExamAttempt[]> => {
    const res = await axiosClient.get<ApiResponse<ExamAttempt[]>>(ENDPOINTS.ATTEMPTS.BY_USER(userId));
    return res.data.responseObject;
  },
};
