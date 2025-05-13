// src/lib/authApi.ts
import api from './api';
import { SignupData, LoginData, AuthResponse, ResetPasswordData } from './types';
import { apiUtils } from './apiUtils';

const authApi = {
  signup: async (data: SignupData): Promise<AuthResponse> => {
    // Backend expects { email, username, password }
    const response = await api.post('/auth/signup', {
      email: data.email,
      username: data.name, // 'name' in frontend, 'username' in backend
      password: data.password
    });
    return apiUtils.handleApiResponse(response.data);
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return apiUtils.handleApiResponse(response.data);
  },

  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const response = await api.post('/auth/refresh-token', { refreshToken });
    // Backend returns { accessToken }
    return response.data;
  },

  requestPasswordReset: async (email: string): Promise<{ message: string; code?: string }> => {
    const response = await api.post('/auth/request-reset', { email });
    return apiUtils.handleApiResponse(response.data);
  },

  verifyResetToken: async (token: string): Promise<{ valid: boolean }> => {
    const response = await api.get(`/auth/verify-reset/${token}`);
    // Backend returns { message } or { error }
    if (response.data?.message === 'Token is valid') return { valid: true };
    return { valid: false };
  },

  resetPassword: async (data: ResetPasswordData): Promise<{ message: string }> => {
    // Backend expects { code, newPassword }
    const response = await api.post('/auth/reset-password', {
      code: data.code,
      newPassword: data.password
    });
    return apiUtils.handleApiResponse(response.data);
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};

export default authApi;
