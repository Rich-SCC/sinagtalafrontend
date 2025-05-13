// src/lib/apiUtils.ts
import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ApiResponse, ApiError, JwtPayload } from './types';

export const apiUtils = {
  /**
   * Extract a readable error message from various error formats
   */
  extractErrorMessage: (error: unknown, fallbackMessage: string = 'An unknown error occurred'): string => {
    if (typeof error === 'object' && error !== null) {
      const axiosError = error as AxiosError;
      
      // Handle Axios errors
      if (axiosError.response) {
        // Handle unauthorized access
        if (axiosError.response.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        }
        
        // Extract error messages from response data
        const responseData = axiosError.response.data as ApiResponse;
        if (responseData?.error) return responseData.error;
        if (responseData?.message) return responseData.message;
      } else if (axiosError.request) {
        return 'No response received from server';
      }
      
      if (axiosError.message) return axiosError.message;
    } else if (error instanceof Error) {
      // Handle regular JS errors
      return error.message;
    }
    
    return fallbackMessage;
  },

  /**
   * Get the current user's UUID from the JWT token or throw if not authenticated
   */
  requireUserId: (): string => {
    if (typeof window === 'undefined') {
      throw new Error('User not authenticated');
    }
    
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('User not authenticated');
    }
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      
      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        throw new Error('Token expired');
      }
      
      const userId = decoded.id || decoded.uuid || decoded.userId || decoded.sub;
      if (!userId) {
        throw new Error('Invalid token format');
      }
      
      return userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      throw new Error('User not authenticated');
    }
  },

  /**
   * Handle API error consistently
   */
  handleApiError: (error: AxiosError, fallbackMessage: string = "API request failed"): ApiError => {
    const data = error.response?.data as unknown;
    let errorMessage: string;
    let errorField: string | undefined;
    if (data && typeof data === 'object') {
      errorMessage = (data as { error?: string })?.error || (data as { message?: string })?.message || error.message || fallbackMessage;
      errorField = (data as { error?: string })?.error;
    } else {
      errorMessage = error.message || fallbackMessage;
      errorField = undefined;
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    
    return {
      status: error.response?.status || 500,
      message: errorMessage,
      error: errorField
    };
  },
  
  /**
   * Check if the user is authenticated by verifying token existence and validity
   * @returns boolean indicating if the user is authenticated
   */
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') {
      return false;
    }
    
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return false;
    }
    
    try {
      // Decode the token to get the expiration date
      const decoded = jwtDecode<JwtPayload>(token);
      
      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        // Token expired, clear it from storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  },

  /**
   * Handle API response data consistently
   */
  handleApiResponse: <T>(response: ApiResponse<T>): T => {
    if (!response.success) {
      // Attach the original response to the error for better error extraction
      const error = new Error(response.error || response.message || 'API request failed') as Error & { response?: { data: ApiResponse } };
      error.response = { data: response };
      throw error;
    }
    if (!response.data) {
      throw new Error('No data received from API');
    }
    return response.data;
  },

  /**
   * Format date for API requests
   */
  formatDate: (date: Date): string => {
    return date.toISOString().split('T')[0];
  },

  /**
   * Get default date range (last 30 days)
   */
  getDefaultDateRange: (): { startDate: string; endDate: string } => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    
    return {
      startDate: apiUtils.formatDate(start),
      endDate: apiUtils.formatDate(end)
    };
  },

  /**
   * Format a timestamp to a user-aligned date/time string
   * @param timestamp ISO string | number | Date
   * @param options Intl.DateTimeFormatOptions
   * @returns string
   */
  formatUserDateTime: (
    timestamp: string | number | Date,
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }
  ): string => {
    try {
      const date = typeof timestamp === 'string' || typeof timestamp === 'number'
        ? new Date(timestamp)
        : timestamp;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return date.toLocaleString(undefined, { ...options, timeZone });
    } catch {
      return '';
    }
  }
};
