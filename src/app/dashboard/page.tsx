"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { MoodEntry, AIInsight, ChatMessage, DaySummary } from '@/lib/types';
import { apiUtils } from '@/lib/apiUtils';
import { fetchChatData } from '@/lib/chatData';
import * as dashboardUtil from '@/lib/dashboardUtil';
import MoodCalendar from '@/component/dashboard/MoodCalendar';
import MoodDistribution from '@/component/dashboard/MoodDistribution';
import MoodTimelineChart from '@/component/dashboard/MoodTimelineChart';
import StreakCard from '@/component/dashboard/StreakCard';
import InsightsCard from '@/component/dashboard/InsightsCard';

// Modal component for day details
const DayDetailModal = ({ 
  date, 
  entries, 
  daySummary, 
  chatLogs, 
  onClose 
}: { 
  date: string; 
  entries: MoodEntry[]; 
  daySummary: DaySummary | null;
  chatLogs: ChatMessage[];
  onClose: () => void;
}) => {
  if (!entries.length && !chatLogs.length) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold">
            {new Date(date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          {/* Mood entries section */}
          {entries.length > 0 && (
            <div>
              <h4 className="text-lg font-medium mb-3">Mood Entries</h4>
              <div className="space-y-3">
                {entries.map((entry, idx) => (
                  <div key={idx} className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-[#38bdf8]">{entry.mood}</span>
                      <span className="text-sm text-gray-400">
                        {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {entry.note && <p className="text-sm text-gray-300">{entry.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Day summary section */}
          {daySummary && (
            <div>
              <h4 className="text-lg font-medium mb-3">Day Summary</h4>
              <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                <p className="text-sm text-gray-300 mb-3">{daySummary.summary}</p>
                {daySummary.insights.length > 0 && (
                  <div>
                    <h5 className="font-medium text-sm mb-2">Insights:</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {daySummary.insights.map((insight, idx) => (
                        <li key={idx} className="text-sm text-gray-300">{insight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Chat logs section */}
          {chatLogs.length > 0 && (
            <div>
              <h4 className="text-lg font-medium mb-3">Chat History</h4>
              <div className="space-y-3">
                {chatLogs.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`rounded-lg p-3 ${
                      msg.from === 'user' 
                        ? 'bg-gray-700/50 ml-auto max-w-[80%]' 
                        : 'bg-purple-900/30 border border-purple-800/50 mr-auto max-w-[80%]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">
                        {msg.from === 'user' ? 'You' : 'Tala'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm">{msg.content}</p>
                    {msg.mood && <span className="text-xs text-blue-400 mt-1 inline-block">Mood: {msg.mood}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Error boundary wrapper for dashboard components
const SafeComponent = ({ 
  children, 
  fallback = <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-200">
    Error loading component
  </div>
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) => {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Runtime error:', error);
      setHasError(true);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  if (hasError) return <>{fallback}</>;
  
  return <>{children}</>;
};

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawChatData, setRawChatData] = useState<import('@/lib/chatData').ChatData | null>(null);
  
  // Insight state
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  
  // Day detail modal state
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDayMoods, setSelectedDayMoods] = useState<MoodEntry[]>([]);
  const [selectedDayChatLogs, setSelectedDayChatLogs] = useState<ChatMessage[]>([]);
  const [selectedDaySummary, setSelectedDaySummary] = useState<DaySummary | null>(null);
  const [showDayModal, setShowDayModal] = useState(false);
  
  // Derived data
  const enhancedDashboardData = useMemo(() => {
    if (!rawChatData) return null;
    return dashboardUtil.generateDashboardFromChatData(rawChatData);
  }, [rawChatData]) as ReturnType<typeof dashboardUtil.generateDashboardFromChatData> | null;
  
  // Format Insights when available
  const aiInsightsData = useMemo(() => {
    if (!aiInsight) return [];
    
    const insights = [];
    
    if (aiInsight.summary) {
      insights.push({
        title: "Summary",
        description: aiInsight.summary,
        type: "neutral" as const
      });
    }
    
    if (aiInsight.insight) {
      insights.push({
        title: "Key Insight",
        description: aiInsight.insight,
        type: "positive" as const
      });
    }
    
    if (aiInsight.advice) {
      insights.push({
        title: "Recommendation",
        description: aiInsight.advice,
        type: "positive" as const
      });
    }
    
    return insights;
  }, [aiInsight]);

  // Fetch chat data and generate dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!apiUtils.isAuthenticated()) {
          router.push('/');
          return;
        }
        
        setLoading(true);
        setError(null);
        
        // Fetch chat data
        const data = await fetchChatData();
        setRawChatData(data);
        
        // Generate Insights
        const generatedInsights = dashboardUtil.generateAIInsights(data);
        if (generatedInsights) {
          setAiInsight(generatedInsights);
        }
      } catch (err) {
        if (err instanceof Error && err.message === 'User not authenticated') {
          router.push('/');
        } else {
          setError('Failed to load dashboard data. Please try again later.');
          console.error('Dashboard data fetch error:', err);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [router]);

  // Fetch Insight
  const generateAIInsight = useCallback(() => {
    if (!rawChatData) return;
    
    setAiLoading(true);
    try {
      const generatedInsights = dashboardUtil.generateAIInsights(rawChatData);
      if (generatedInsights) {
        setAiInsight(generatedInsights);
      }
    } catch (err) {
      console.error('Insight generation error:', err);
    } finally {
      setAiLoading(false);
    }
  }, [rawChatData]);
  
  // Handle day selection
  const handleDaySelect = useCallback((date: string) => {
    if (!rawChatData) return;
    
    setSelectedDate(date);
    
    // Convert chat data to entries by date for the selected date
    const chatLogs = rawChatData.chatLogs.filter(log => log.date === date);
    const formattedChatLogs = chatLogs.map(dashboardUtil.formatChatMessageFromChatData);
    setSelectedDayChatLogs(formattedChatLogs);
    
    // Create mood entries from chat data
    const moodEntries = dashboardUtil.createMoodEntriesFromChatData(
      chatLogs.filter(log => log.mood)
    );
    setSelectedDayMoods(moodEntries);
    
    // Generate day summary
    if (chatLogs.length > 0) {
      // Count mood frequencies
      const moodFrequencies: Record<string, number> = {};
      chatLogs.forEach(log => {
        if (log.mood) {
          moodFrequencies[log.mood] = (moodFrequencies[log.mood] || 0) + 1;
        }
      });
      
      // Find most frequent moods
      const sortedMoods = Object.entries(moodFrequencies)
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([mood]) => mood);
      
      // Generate insights about moods
      const moodInsights = sortedMoods.length > 0 
        ? [`Your prominent mood was ${sortedMoods[0]}.`] 
        : [];
        
      if (sortedMoods.length > 1) {
        moodInsights.push(`You also experienced ${sortedMoods.slice(1).join(', ')}.`);
      }
      
      // Create summary
      const summary: DaySummary = {
        date,
        summary: `On ${new Date(date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}, you had ${chatLogs.length} chat interactions and logged ${moodEntries.length} moods.`,
        insights: moodInsights
      };
      
      setSelectedDaySummary(summary);
    } else {
      setSelectedDaySummary(null);
    }
    
    setShowDayModal(true);
  }, [rawChatData]);

  // Close day detail modal
  const handleCloseModal = useCallback(() => {
    setShowDayModal(false);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto p-6 bg-[#181f2a]">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-700 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-48 bg-gray-800 rounded-lg"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-800 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex-1 overflow-y-auto p-6 bg-[#181f2a]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-200">
            <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!enhancedDashboardData) {
    return (
      <div className="flex-1 overflow-y-auto p-6 bg-[#181f2a]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-4 text-gray-300">
            <h2 className="text-xl font-semibold mb-2">No Data Available</h2>
            <p>Start chatting with Tala to build your mood dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard content
  return (
    <div className="flex-1 overflow-y-auto p-0 bg-[#181f2a] min-h-screen">
      {/* Header */}
      <header className="w-full bg-gray-800 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          <button
            className="text-gray-300 hover:text-white flex items-center"
            onClick={() => router.back()}
            aria-label="Back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold mx-auto pr-5">Mood Dashboard</h1>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Row - Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <section className="bg-gray-800 rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-4">Your Streak</h2>
            <SafeComponent>
              <StreakCard streak={rawChatData ? dashboardUtil.calculateStreaksFromChatData(rawChatData) : null} />
            </SafeComponent>
          </section>
          
          <section className="bg-gray-800 rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-4">Insights</h2>
            {aiInsight ? (
              <SafeComponent>
                <InsightsCard insights={aiInsightsData} />
              </SafeComponent>
            ) : (
              <div className="flex flex-col justify-between h-full">
                <div className="text-gray-400 text-sm mb-4">
                  Generate an AI-powered insight based on your mood patterns.
                </div>
                <button
                  onClick={generateAIInsight}
                  className="px-4 py-2 bg-pink-700 hover:bg-pink-800 text-white rounded disabled:opacity-70 transition-colors w-full"
                  disabled={aiLoading}
                >
                  {aiLoading ? 'Generating...' : 'Generate Insights'}
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Mood Timeline Chart */}
        <section className="bg-gray-800 rounded-lg p-5 mb-6">
          <h2 className="text-xl font-semibold mb-4">Mood Timeline</h2>
          <SafeComponent>
            <MoodTimelineChart entries={
              rawChatData ? dashboardUtil.createMoodEntriesFromChatData(rawChatData.chatLogs) : []
            } />
          </SafeComponent>
        </section>

        {/* Calendar and Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <section className="bg-gray-800 rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-4">Mood Calendar</h2>
            <SafeComponent>
              <MoodCalendar
                data={enhancedDashboardData.calendarData}
                onDaySelect={handleDaySelect}
              />
            </SafeComponent>
            <div className="text-sm text-gray-400 mt-2 text-center">
              Click on a day to view details
            </div>
          </section>
          
          <section className="bg-gray-800 rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-4">Mood Distribution</h2>
            <SafeComponent>
              <MoodDistribution distribution={enhancedDashboardData.userSummary.mood_distribution} />
            </SafeComponent>
          </section>
        </div>
        
        {/* Day Detail Modal */}
        {showDayModal && selectedDate && (
          <DayDetailModal
            date={selectedDate}
            entries={selectedDayMoods}
            daySummary={selectedDaySummary}
            chatLogs={selectedDayChatLogs}
            onClose={handleCloseModal}
          />
        )}
      </main>
    </div>
  );
} 