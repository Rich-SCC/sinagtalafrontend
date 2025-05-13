// src/lib/types.ts

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Auth Types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string; // maps to username in backend
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface ResetPasswordData {
  code: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// JWT Types
export interface JwtPayload {
  id?: string;
  uuid?: string;
  userId?: string;
  sub?: string;
  exp?: number;
  iat?: number;
  [key: string]: string | number | undefined;
}

// Profile Types
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

// Mood Types
export type MoodType =
  | "Despairing"
  | "Irritated"
  | "Anxious"
  | "Drained"
  | "Restless"
  | "Indifferent"
  | "Calm"
  | "Hopeful"
  | "Content"
  | "Energized"
  | "Uncertain";

export interface MoodEntry {
  id: string;
  userId: string;
  mood: MoodType;
  timestamp: string;
  note?: string;
}

export interface MoodCalendarData {
  date: string;
  initial_mood: MoodType;
  final_mood: MoodType;
  total_entries: number;
}

export interface MoodTrends {
  frequencies: {
    mood: MoodType;
    count: number;
  }[];
  transitions: {
    prev_mood: MoodType;
    next_mood: MoodType;
    transition_count: number;
  }[];
  volatility?: {
    avg_daily_mood_variety: number;
    avg_daily_entries: number;
    volatility_index: number;
  };
}

// Chat Types
export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  from: 'user' | 'tala';
  timestamp: string;
  mood?: MoodType;
}

export interface ChatResponse {
  message?: string;
  error?: string;
  body?: ReadableStream<Uint8Array>;
}

export interface DaySummary {
  date: string;
  summary: string;
  insights: string[];
}

// Dashboard Types
export interface DashboardData {
  calendarData: MoodCalendarData[];
  trendData?: MoodTrends;
  userSummary: {
    mood_distribution: {
      mood: MoodType;
      count: number;
      percentage: number;
    }[];
    active_time_periods: {
      time_period: string;
      count: number;
    }[];
    last_updated: string;
  };
}

export interface AIInsight {
  summary: string;
  insight: string;
  advice: string;
}

// Error Types
export interface ApiError {
  status: number;
  message: string;
  error?: string;
}

// Common Types
export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiParams extends Partial<DateRange & PaginationParams> {
  [key: string]: string | number | undefined;
} 