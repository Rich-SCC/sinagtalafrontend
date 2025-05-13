import { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { useChatData } from '@/lib/chatData';
import * as dashboardUtil from '@/lib/dashboardUtil';

// Mood colors for visualization
const moodColors: Record<string, string> = {
  "Despairing": "#312e81",
  "Irritated": "#b91c1c",
  "Anxious": "#ca8a04",
  "Drained": "#4b5563",
  "Restless": "#ea580c",
  "Indifferent": "#6b7280",
  "Calm": "#2563eb",
  "Hopeful": "#059669",
  "Content": "#16a34a",
  "Energized": "#eab308",
  "Uncertain": "#7c3aed"
};

interface DashboardPreviewProps {
  className?: string;
}

/**
 * A component that shows a preview of mood trends from chat data
 * Can be embedded in the chat interface to give users a glimpse of their mood patterns
 */
const DashboardPreview = ({ className = '' }: DashboardPreviewProps) => {
  // Fetch chat data using the useChatData hook
  const { chatData, isLoading, isError } = useChatData();
  
  // Calculate overall mood distribution
  const { moodDistribution, moodCount, chartData } = useMemo(() => {
    if (!chatData || !chatData.chatLogs.length) {
      return { moodDistribution: [], moodCount: 0, chartData: [] };
    }
    
    // Get mood distribution
    const distribution = dashboardUtil.generateMoodDistribution(chatData.chatLogs);
    
    // Count moods
    const count = chatData.chatLogs.filter(log => log.mood).length;
    
    // Group moods by categories for simplified view
    const moodGroups = {
      "Negative": ["Despairing", "Irritated", "Anxious", "Drained"],
      "Neutral": ["Indifferent", "Uncertain", "Restless"],
      "Positive": ["Calm", "Hopeful", "Content", "Energized"]
    };
    
    // Map moods to categories
    const moodToCategory: Record<string, string> = {};
    Object.entries(moodGroups).forEach(([category, moods]) => {
      moods.forEach(mood => {
        moodToCategory[mood] = category;
      });
    });
    
    // Count by category
    const categoryCounts: Record<"Negative" | "Neutral" | "Positive", number> = {
      "Negative": 0, "Neutral": 0, "Positive": 0
    };
    distribution.forEach(item => {
      const category = moodToCategory[item.mood] || "Neutral";
      categoryCounts[category as "Negative" | "Neutral" | "Positive"] += item.count;
    });
    
    // Format for chart
    const chartData = Object.entries(categoryCounts)
      .map(([category, count]) => ({ category, count }));
    
    return { moodDistribution: distribution, moodCount: count, chartData };
  }, [chatData]);
  
  if (isLoading) {
    return (
      <div className={`p-3 bg-gray-800 rounded-lg ${className}`}>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-32 bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    );
  }
  
  if (isError || !chatData) {
    return (
      <div className={`p-3 bg-gray-800 rounded-lg ${className}`}>
        <p className="text-sm text-gray-400">Unable to load mood data</p>
      </div>
    );
  }
  
  // If no mood data yet
  if (moodCount === 0) {
    return (
      <div className={`p-3 bg-gray-800 rounded-lg ${className}`}>
        <h3 className="text-sm font-medium mb-2">Your Mood Patterns</h3>
        <p className="text-xs text-gray-400">
          No mood data yet. Continue chatting with Tala to build your mood profile.
        </p>
      </div>
    );
  }
  
  return (
    <div className={`p-3 bg-gray-800 rounded-lg ${className}`}>
      <h3 className="text-sm font-medium mb-2">Your Mood Patterns</h3>
      
      <div className="w-full">
        <ResponsiveContainer width="100%" height={100}>
          <BarChart 
            data={chartData} 
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <XAxis 
              dataKey="category"
              stroke="#cbd5e1"
              tick={{ fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{ background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '4px' }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Bar 
              dataKey="count" 
              fill="#38bdf8" 
              radius={[4, 4, 0, 0]} 
              fillOpacity={0.8}
              label={{ position: 'top', fill: '#cbd5e1', fontSize: 10 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {moodDistribution.length > 0 && (
        <div className="mt-3 text-xs">
          <span className="font-medium">Most frequent mood: </span>
          <span className="ml-1" style={{ color: moodColors[moodDistribution[0].mood] }}>
            {moodDistribution[0].mood}
          </span>
          <p className="text-xs text-gray-400 mt-1">
            Based on {moodCount} mood data points
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardPreview; 