import React, { memo, useMemo } from 'react';
import { MoodType } from '@/lib/types';

interface MoodDistributionProps {
  distribution: {
    mood: string;
    count: number;
    percentage: number | string;
  }[];
}

const moodColors: Record<string, string> = {
  "Despairing": "bg-indigo-900",
  "Irritated": "bg-red-700",
  "Anxious": "bg-yellow-600",
  "Drained": "bg-gray-600",
  "Restless": "bg-orange-600",
  "Indifferent": "bg-gray-500",
  "Calm": "bg-blue-600",
  "Hopeful": "bg-emerald-600",
  "Content": "bg-green-600",
  "Energized": "bg-yellow-500",
  "Uncertain": "bg-purple-600"
};

const MoodDistribution = memo(({ distribution }: MoodDistributionProps) => {
  // Sort distribution by percentage in descending order
  const sortedDistribution = useMemo(() => {
    if (!distribution?.length) return [];
    
    return [...distribution]
      .map(item => ({
        ...item,
        percentage: typeof item.percentage === 'number' 
          ? item.percentage 
          : parseFloat(String(item.percentage))
      }))
      .sort((a, b) => {
        const percentA = isNaN(a.percentage) ? 0 : a.percentage;
        const percentB = isNaN(b.percentage) ? 0 : b.percentage;
        return percentB - percentA;
      });
  }, [distribution]);

  if (!distribution?.length) {
    return (
      <div className="text-gray-400 text-sm">
        No mood distribution data available yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedDistribution.map((item) => {
        const percentage = isNaN(item.percentage) ? 0 : item.percentage;
        const displayPercentage = percentage.toFixed(1);
          
        return (
          <div key={item.mood} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">{item.mood}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">({item.count})</span>
                <span className="text-gray-300 font-medium">{displayPercentage}%</span>
              </div>
            </div>
            <div 
              className="h-2 bg-gray-700 rounded-full overflow-hidden" 
              role="progressbar" 
              aria-valuenow={percentage} 
              aria-valuemin={0} 
              aria-valuemax={100}
            >
              <div
                className={`h-full ${moodColors[item.mood as MoodType] || 'bg-gray-500'}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});

MoodDistribution.displayName = 'MoodDistribution';
export default MoodDistribution; 