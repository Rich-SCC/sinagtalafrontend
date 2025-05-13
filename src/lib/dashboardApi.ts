// src/lib/dashboardApi.ts
import api from './api';
import { apiUtils } from './apiUtils';
import { DashboardData, AIInsight } from './types';

const dashboardApi = {
  getDashboardData: async (timeframe?: string): Promise<DashboardData> => {
    const userId = apiUtils.requireUserId();
    const params = timeframe ? { timeframe } : undefined;
    const response = await api.get(`/dashboard/${userId}`, { params });
    return apiUtils.handleApiResponse(response.data) as DashboardData;
  },

  getAIInsight: async (): Promise<AIInsight> => {
    const userId = apiUtils.requireUserId();
    const response = await api.get(`/dashboard/${userId}/ai-insight`, { timeout: 100000 });
    return apiUtils.handleApiResponse(response.data) as AIInsight;
  }
};

export default dashboardApi;
