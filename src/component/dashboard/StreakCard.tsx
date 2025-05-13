import React, { memo } from 'react';

interface StreakCardProps {
  streak: {
    current: number;
    longest: number;
  } | null;
}

const StreakCard = memo(({ streak }: StreakCardProps) => {
  if (!streak) {
    return (
      <div className="text-gray-400 text-sm">
        Start tracking your mood to build your streak!
      </div>
    );
  }

  // Calculate percentage for the progress bar
  const progressPercentage = streak.longest > 0 
    ? Math.min(100, Math.round((streak.current / streak.longest) * 100)) 
    : 0;

  return (
    <div className="space-y-4">
      {/* Streak counters */}
      <div className="flex flex-row gap-6 justify-between">
        <div className="flex-1 bg-pink-900/20 border border-pink-800 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-pink-400 mb-1">{streak.current}</div>
          <div className="text-sm text-gray-300">Current Streak</div>
        </div>
        <div className="flex-1 bg-purple-900/20 border border-purple-800 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-1">{streak.longest}</div>
          <div className="text-sm text-gray-300">Longest Streak</div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Progress toward longest streak</span>
          <span>{progressPercentage}%</span>
        </div>
        <div 
          className="h-2 bg-gray-700 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div 
            className={`h-full transition-all duration-500 ${
              progressPercentage === 100 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                : 'bg-pink-600'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
});

StreakCard.displayName = 'StreakCard';
export default StreakCard; 