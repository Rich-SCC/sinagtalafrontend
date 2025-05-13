// src/lib/api.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { apiUtils } from './apiUtils';
import { ApiResponse, AuthTokens } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * Create an axios instance with default configuration
 */
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/authentication
  timeout: 15000, // 15 seconds timeout for requests
});

/**
 * Request interceptor to include authentication token in headers
 */
api.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, 
(error: AxiosError): Promise<AxiosError> => {
  // Handle request configuration errors
  apiUtils.handleApiError(error, "Request configuration failed");
  return Promise.reject(error);
});

/**
 * Response interceptor for centralized error handling and token refresh
 */
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Handle successful response
    const apiResponse = response.data as ApiResponse;
    if (!apiResponse.success) {
      // If the response indicates failure, throw an error
      throw new Error(apiResponse.error || apiResponse.message || 'API request failed');
    }
    return response;
  },
  async (error: AxiosError): Promise<AxiosError> => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // Check if the endpoint is an auth endpoint (login, signup, etc.)
      const url = originalRequest.url || '';
      const isAuthEndpoint =
        url.includes('/auth/login') ||
        url.includes('/auth/signup') ||
        url.includes('/auth/request-reset') ||
        url.includes('/auth/verify-reset') ||
        url.includes('/auth/reset-password');

      // Only attempt refresh if NOT an auth endpoint
      if (!isAuthEndpoint) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await axios.post<ApiResponse<AuthTokens>>(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const { data } = response.data;
          if (!data?.accessToken) {
            throw new Error('Invalid refresh token response');
          }

          localStorage.setItem('accessToken', data.accessToken);
          if (data.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken);
          }

          // Retry the original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          }
          return api(originalRequest);
        } catch (refreshError) {
          // If refresh fails, clear tokens
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/';
          return Promise.reject(refreshError);
        }
      }
    }

    // Create more descriptive error message based on status and endpoint
    const endpoint = error.config?.url || 'unknown endpoint';
    const status = error.response?.status;
    const message = status 
      ? `API request to ${endpoint} failed with status ${status}`
      : `API request to ${endpoint} failed`;
      
    apiUtils.handleApiError(error, message);
    return Promise.reject(error);
  }
);

export default api;
