// src/lib/moodApi.ts
import api from './api';
import { apiUtils } from './apiUtils';
import { MoodType, MoodEntry, MoodCalendarData, MoodTrends } from './types';

const moodApi = {
  saveMood: async (mood: MoodType, note?: string): Promise<MoodEntry> => {
    const userId = apiUtils.requireUserId();
    const response = await api.post('/mood', { userId, mood, note });
    return apiUtils.handleApiResponse(response.data);
  },

  getMoodEntries: async (params?: { startDate?: string; endDate?: string }): Promise<MoodEntry[]> => {
    const userId = apiUtils.requireUserId();
    const response = await api.get(`/mood/${userId}`, { params });
    return apiUtils.handleApiResponse(response.data);
  },

  getMoodCalendar: async (params?: { startDate?: string; endDate?: string }): Promise<MoodCalendarData[]> => {
    const userId = apiUtils.requireUserId();
    const response = await api.get(`/mood/calendar/${userId}`, { params });
    return apiUtils.handleApiResponse(response.data);
  },

  getDayMoods: async (date: string): Promise<MoodEntry[]> => {
    const userId = apiUtils.requireUserId();
    const response = await api.get(`/mood/day/${userId}/${date}`);
    return apiUtils.handleApiResponse(response.data);
  },

  getMoodTrends: async (params?: { startDate?: string; endDate?: string }): Promise<MoodTrends> => {
    const userId = apiUtils.requireUserId();
    const response = await api.get(`/mood/trends/${userId}`, { params });
    return apiUtils.handleApiResponse(response.data);
  },
};

export default moodApi;
