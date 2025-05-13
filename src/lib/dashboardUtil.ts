import { ChatData, FormattedMessage } from './chatData';
import { MoodType, MoodEntry, ChatMessage, MoodCalendarData, DashboardData } from './types';

// Convert FormattedMessage from chatData to ChatMessage for dashboard
export function formatChatMessageFromChatData(log: FormattedMessage): ChatMessage {
  return {
    id: `chat-${log.date}-${log.time}`,
    userId: '',
    content: log.text,
    from: log.from === 'me' ? 'user' : 'tala',
    timestamp: new Date(log.date + ' ' + log.time).toISOString(),
    mood: log.mood
  };
}

// Generate a mood calendar structure from chat data
export function generateMoodCalendar(chatLogs: FormattedMessage[]): MoodCalendarData[] {
  const moodsByDate: Record<string, { moods: MoodType[], count: number }> = {};
  
  // Process chat logs with moods
  chatLogs.filter(log => log.mood).forEach(log => {
    if (log.mood && log.date) {
      if (!moodsByDate[log.date]) {
        moodsByDate[log.date] = { moods: [], count: 0 };
      }
      
      moodsByDate[log.date].moods.push(log.mood);
      moodsByDate[log.date].count++;
    }
  });
  
  // Convert to MoodCalendarData format
  return Object.entries(moodsByDate).map(([date, data]) => {
    const sortedMoods = [...data.moods].sort((a, b) => 
      new Date(a).getTime() - new Date(b).getTime()
    );
    
    return {
      date,
      initial_mood: sortedMoods[0] || 'Uncertain',
      final_mood: sortedMoods[sortedMoods.length - 1] || 'Uncertain',
      total_entries: data.count
    };
  });
}

// Generate mood distribution from chat data
export function generateMoodDistribution(chatLogs: FormattedMessage[]): {
  mood: MoodType;
  count: number;
  percentage: number;
}[] {
  const moodCounts: Record<string, number> = {};
  let totalMoods = 0;
  
  // Count moods
  chatLogs.filter(log => log.mood).forEach(log => {
    if (log.mood) {
      moodCounts[log.mood] = (moodCounts[log.mood] || 0) + 1;
      totalMoods++;
    }
  });
  
  // Convert to distribution format
  return Object.entries(moodCounts).map(([mood, count]) => ({
    mood: mood as MoodType,
    count,
    percentage: totalMoods > 0 ? (count / totalMoods) * 100 : 0
  }));
}

// Create synthetic mood entries from chat data
export function createMoodEntriesFromChatData(chatLogs: FormattedMessage[]): MoodEntry[] {
  return chatLogs
    .filter(log => log.mood)
    .map((log, index) => ({
      id: `chat-mood-${index}`,
      userId: '',
      mood: log.mood as MoodType,
      timestamp: new Date(log.date + ' ' + log.time).toISOString(),
      note: `Derived from chat: "${log.text.substring(0, 50)}${log.text.length > 50 ? '...' : ''}"`
    }));
}

// Generate complete dashboard data from chat data
export function generateDashboardFromChatData(chatData: ChatData): DashboardData {
  if (!chatData || !chatData.chatLogs.length) {
    return {
      calendarData: [],
      userSummary: {
        mood_distribution: [],
        active_time_periods: [],
        last_updated: new Date().toISOString()
      }
    };
  }

  // Generate mood calendar data
  const calendarData: MoodCalendarData[] = [];
  const dateMap = new Map<string, { initialMood?: MoodType; finalMood?: MoodType; entryCount: number }>();
  
  chatData.chatLogs.forEach(log => {
    if (log.date && log.mood) {
      if (!dateMap.has(log.date)) {
        dateMap.set(log.date, { initialMood: log.mood as MoodType, finalMood: log.mood as MoodType, entryCount: 1 });
      } else {
        const entry = dateMap.get(log.date)!;
        entry.finalMood = log.mood as MoodType;
        entry.entryCount++;
      }
    }
  });
  
  dateMap.forEach((value, date) => {
    calendarData.push({
      date,
      initial_mood: value.initialMood || 'Uncertain',
      final_mood: value.finalMood || 'Uncertain',
      total_entries: value.entryCount
    });
  });
  
  // Generate user summary with mood distribution
  const moodCounts: Record<string, number> = {};
  let totalMoods = 0;
  
  chatData.chatLogs.filter(log => log.mood).forEach(log => {
    if (log.mood) {
      moodCounts[log.mood] = (moodCounts[log.mood] || 0) + 1;
      totalMoods++;
    }
  });
  
  const mood_distribution = Object.entries(moodCounts).map(([mood, count]) => ({
    mood: mood as MoodType,
    count,
    percentage: totalMoods ? (count / totalMoods) * 100 : 0
  }));
  
  // Generate active time periods
  const hourCounts: Record<string, number> = {};
  
  chatData.chatLogs.forEach(log => {
    if (log.time) {
      const hour = log.time.split(':')[0];
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    }
  });
  
  const active_time_periods = Object.entries(hourCounts).map(([hour, count]) => ({
    time_period: `${hour}:00`,
    count
  })).sort((a, b) => b.count - a.count);
  
  return {
    calendarData,
    userSummary: {
      mood_distribution,
      active_time_periods,
      last_updated: new Date().toISOString()
    }
  };
}

// Combine API dashboard data with chat-derived dashboard data
export function enhanceDashboardWithChatData(
  apiDashboard: DashboardData | null, 
  chatData: ChatData
): DashboardData {
  const chatDashboard = generateDashboardFromChatData(chatData);
  
  if (!apiDashboard) return chatDashboard;
  
  // Merge mood distributions
  const moodCounts: Record<string, number> = {};
  let totalCount = 0;
  
  // Combine both distributions
  [...(chatDashboard.userSummary?.mood_distribution || []),
   ...(apiDashboard.userSummary?.mood_distribution || [])]
    .forEach(item => {
      moodCounts[item.mood] = (moodCounts[item.mood] || 0) + item.count;
      totalCount += item.count;
    });
  
  const mergedDistribution = Object.entries(moodCounts).map(([mood, count]) => ({
    mood: mood as MoodType,
    count,
    percentage: totalCount > 0 ? (count / totalCount) * 100 : 0
  }));
  
  return {
    calendarData: [
      ...(apiDashboard.calendarData || []),
      ...(chatDashboard.calendarData || [])
    ],
    userSummary: {
      mood_distribution: mergedDistribution,
      active_time_periods: apiDashboard.userSummary?.active_time_periods || 
                          chatDashboard.userSummary?.active_time_periods || [],
      last_updated: new Date().toISOString()
    }
  };
}

// Group chat messages by date
export function groupChatLogsByDate(chatLogs: FormattedMessage[]): Record<string, FormattedMessage[]> {
  const map: Record<string, FormattedMessage[]> = {};
  
  chatLogs.forEach(log => {
    if (log.date) {
      if (!map[log.date]) map[log.date] = [];
      map[log.date].push(log);
    }
  });
  
  return map;
}

// Calculate current and longest streaks from chat data
export function calculateStreaksFromChatData(chatData: ChatData): { current: number; longest: number } {
  if (!chatData || !chatData.chatLogs.length) return { current: 0, longest: 0 };
  
  // Get unique days with mood entries
  const uniqueDates = new Set<string>();
  chatData.chatLogs.forEach(log => {
    if (log.mood && log.date) {
      uniqueDates.add(log.date);
    }
  });
  
  // Convert to array and sort
  const days = Array.from(uniqueDates).sort();
  
  if (days.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let current = 1;
  let maxCurrent = 1;
  const today = new Date();
  today.setHours(0,0,0,0);
  let prev = new Date(days[0]);

  for (let i = 1; i < days.length; i++) {
    const curr = new Date(days[i]);
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      current++;
      maxCurrent = Math.max(maxCurrent, current);
    } else {
      current = 1;
    }
    prev = curr;
  }
  longest = Math.max(maxCurrent, current);

  // Calculate current streak (ending today)
  let streak = 0;
  const dayCursor = new Date(today);
  
  while (true) {
    const dateStr = dayCursor.toISOString().split('T')[0];
    if (!uniqueDates.has(dateStr)) break;
    streak++;
    dayCursor.setDate(dayCursor.getDate() - 1);
  }
  
  return { current: streak, longest };
}

// Generate AI insights from chat data
export function generateAIInsights(chatData: ChatData): {
  summary: string;
  insight: string;
  advice: string;
} | null {
  if (!chatData || !chatData.chatLogs.length) return null;
  
  // Count moods
  const moodCounts: Record<string, number> = {};
  let totalMoods = 0;
  
  chatData.chatLogs.filter(log => log.mood).forEach(log => {
    if (log.mood) {
      moodCounts[log.mood] = (moodCounts[log.mood] || 0) + 1;
      totalMoods++;
    }
  });
  
  // Get most and least frequent moods
  const sortedMoods = Object.entries(moodCounts)
    .sort(([, countA], [, countB]) => countB - countA);
  
  if (sortedMoods.length === 0) return null;
  
  const mostFrequentMood = sortedMoods[0][0];
  const leastFrequentMood = sortedMoods[sortedMoods.length - 1][0];
  
  // Group by days to analyze patterns
  const dayLogs = groupChatLogsByDate(chatData.chatLogs);
  const dayCount = Object.keys(dayLogs).length;
  
  // Calculate average moods per day
  const avgMoodsPerDay = dayCount > 0 ? totalMoods / dayCount : 0;
  
  // Generate insights
  const insights = {
    summary: `Based on your chat history, your most frequent mood is ${mostFrequentMood} (${moodCounts[mostFrequentMood]} times). You've tracked your moods across ${dayCount} different days.`,
    insight: `You tend to experience ${mostFrequentMood} more than other emotions. ${
      sortedMoods.length > 1 
        ? `Your less frequent moods include ${sortedMoods.slice(1, 3).map(([mood]) => mood).join(' and ')}.` 
        : ''
    }`,
    advice: getMoodAdvice(mostFrequentMood, leastFrequentMood, avgMoodsPerDay)
  };
  
  return insights;
}

// Helper function to provide mood-specific advice
function getMoodAdvice(mostFrequentMood: string, leastFrequentMood: string, avgMoodsPerDay: number): string {
  // Positive moods
  const positiveMoods = ['Calm', 'Hopeful', 'Content', 'Energized'];
  // Negative moods
  const negativeMoods = ['Despairing', 'Irritated', 'Anxious', 'Drained', 'Restless'];
  // Neutral moods
  const neutralMoods = ['Indifferent', 'Uncertain'];
  
  if (positiveMoods.includes(mostFrequentMood)) {
    return `Continue with activities that promote your sense of ${mostFrequentMood.toLowerCase()}. You're on a good path with your emotional wellbeing.`;
  } else if (negativeMoods.includes(mostFrequentMood)) {
    return `Consider activities that might help when you're feeling ${mostFrequentMood.toLowerCase()}, such as mindfulness, connecting with others, or physical exercise.`;
  } else if (neutralMoods.includes(mostFrequentMood)) {
    return `Try exploring new activities or reflecting on what brings you joy to move beyond feeling ${mostFrequentMood.toLowerCase()}.`;
  }
  
  // Default advice if mood doesn't fall into categories
  if (avgMoodsPerDay < 1) {
    return "Track your moods more regularly to get more personalized insights about your emotional patterns.";
  } else {
    return "Continue tracking your moods to reveal more detailed patterns about your emotional wellbeing.";
  }
} 