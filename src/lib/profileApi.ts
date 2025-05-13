// src/lib/profileApi.ts
import api from './api';
import { ChangePasswordData } from './types';
import { apiUtils } from './apiUtils';

export interface Profile {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

export interface UpdateProfileData {
  username?: string;
  email?: string;
}

interface ProfileResponseWithUser {
  message: string;
  user: Profile;
}

interface MessageResponse {
  message: string;
}

const profileApi = {
  getProfile: async (): Promise<Profile> => {
    const response = await api.get('/profile');
    // Backend now returns { success: true, data: userProfile }
    return apiUtils.handleApiResponse<Profile>(response.data);
  },
  
  updateProfile: async (data: UpdateProfileData): Promise<Profile> => {
    // Backend returns { success: true, data: { message, user } }
    const response = await api.put('/profile', data);
    return apiUtils.handleApiResponse<ProfileResponseWithUser>(response.data).user;
  },
  
  changePassword: async (data: ChangePasswordData): Promise<{ message: string }> => {
    // Backend returns { success: true, data: { message, user } }
    const response = await api.put('/profile/password', data);
    return { message: apiUtils.handleApiResponse<ProfileResponseWithUser>(response.data).message };
  },
  
  deleteAccount: async (password: string): Promise<{ message: string }> => {
    // Backend returns { success: true, data: { message } }
    const response = await api.delete('/profile', { data: { password } });
    return apiUtils.handleApiResponse<MessageResponse>(response.data);
  }
};

export default profileApi;
