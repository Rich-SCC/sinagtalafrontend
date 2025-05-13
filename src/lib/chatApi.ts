// src/lib/chatApi.ts
import api from './api';
import { apiUtils } from './apiUtils';
import { MoodType, ChatMessage, ChatResponse, DaySummary } from './types';

const chatApi = {
  getChatLogs: async (date?: string): Promise<ChatMessage[]> => {
    const userId = apiUtils.requireUserId();
    const params = date ? { date } : undefined;
    const response = await api.get(`/chat/logs/${userId}`, { params });
    return apiUtils.handleApiResponse(response.data) as ChatMessage[];
  },
  
  sendMessage: async (message: string, currentMood?: MoodType, stream: boolean = false): Promise<ChatResponse> => {
    const userId = apiUtils.requireUserId();
    const data = { userId, message, currentMood };
    
    if (stream) {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await fetch(`${api.defaults.baseURL}/chat/message?stream=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to send message' }));
        throw new Error(errorData.error);
      }
      if (!response.body) {
        throw new Error('No response stream available');
      }
      return { body: response.body };
    }
    const response = await api.post('/chat/message', data);
    // Backend returns { data: { response } }
    const result = apiUtils.handleApiResponse(response.data) as { response: string };
    return { message: result.response };
  },
  
  checkAIStatus: async (): Promise<{ status: string; message?: string; details?: Record<string, unknown> }> => {
    const response = await api.get('/chat/status');
    return apiUtils.handleApiResponse(response.data);
  },
  
  getDaySummary: async (date: string): Promise<DaySummary> => {
    const userId = apiUtils.requireUserId();
    const response = await api.get(`/chat/summary/${userId}/${date}`);
    return apiUtils.handleApiResponse(response.data) as DaySummary;
  }
};

export default chatApi;
