import axiosClient from '../../../api/axiosClient';
import { ENDPOINTS } from '../../../api/endpoints';
import type { ApiResponse } from '../../../types/api.types';
import type { AdminOverview, ExamStatistics, LearningAnalyticsData } from '../../../types/models';

export const statisticsApi = {
  getExamStats: async (examId: string): Promise<ExamStatistics> => {
    const res = await axiosClient.get<ApiResponse<ExamStatistics>>(ENDPOINTS.STATISTICS.EXAM(examId));
    return res.data.responseObject;
  },

  getAdminOverview: async (): Promise<AdminOverview> => {
    const res = await axiosClient.get<ApiResponse<AdminOverview>>(ENDPOINTS.STATISTICS.ADMIN_OVERVIEW);
    return res.data.responseObject;
  },

  getLearningAnalytics: async (params?: { subjectId?: string; timeframe?: string }): Promise<LearningAnalyticsData> => {
    const res = await axiosClient.get<ApiResponse<LearningAnalyticsData>>(ENDPOINTS.STATISTICS.LEARNING_ANALYTICS, {
      params,
    });
    return res.data.responseObject;
  },
};
