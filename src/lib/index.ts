// src/lib/index.ts
import api from './api';
import { apiUtils } from './apiUtils';
import authApi from './authApi';
import chatApi from './chatApi';
import profileApi from './profileApi';
import moodApi from './moodApi';
import dashboardApi from './dashboardApi';
import { fetchChatData, useChatData } from './chatData';

export {
  api,
  apiUtils,
  authApi,
  chatApi,
  profileApi,
  moodApi,
  dashboardApi,
  fetchChatData,
  useChatData
};