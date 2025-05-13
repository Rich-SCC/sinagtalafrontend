import { MoodCalendarData } from '@/lib/types';
import React, { useMemo, memo } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

interface MoodCalendarProps {
  data: MoodCalendarData[];
  onDaySelect?: (date: string) => void;
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

const MoodCalendar = memo(({ data, onDaySelect }: MoodCalendarProps) => {
  // Get current month's data
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Format date helper
  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Memoize calendar setup
  const { days, dayLabels } = useMemo(() => {
    // Create a map of date to mood and entry count for easy lookup
    const moodMap = new Map(data.map(entry => [entry.date, entry]));
    
    // Generate calendar grid
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDayOfMonth.getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarDays = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="h-16 bg-gray-800 rounded-lg" aria-hidden="true"></div>
      );
    }

    // Add cells for each day of the month
    for (let dayCount = 1; dayCount <= totalDays; dayCount++) {
      const date = formatDate(currentYear, currentMonth, dayCount);
      const dayData = moodMap.get(date);
      const mood = dayData?.final_mood;
      const entryCount = dayData?.total_entries || 0;
      const tooltipId = `mood-tooltip-${date}`;
      
      calendarDays.push(
        <div 
          key={dayCount} 
          className="relative group min-w-[48px] min-h-[48px]"
          onClick={() => onDaySelect?.(date)}
          role="button"
          tabIndex={0}
          aria-label={`${dayCount} ${new Date(date).toLocaleString('default', { month: 'long' })}, ${mood || 'No mood recorded'}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onDaySelect?.(date);
              e.preventDefault();
            }
          }}
        >
          <div className="absolute top-1 left-1 text-xs text-gray-200">{dayCount}</div>
          {mood ? (
            <div
              className={`h-16 rounded-lg ${moodColors[mood] || 'bg-gray-500'} flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity`}
              data-tooltip-id={tooltipId}
            >
              <span className="text-white text-xs font-medium">{mood}</span>
            </div>
          ) : (
            <div 
              className="h-16 rounded-lg bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
            ></div>
          )}
          
          {entryCount > 0 && (
            <ReactTooltip 
              id={tooltipId} 
              className="!z-50 !max-w-xs !bg-gray-900 !text-gray-100 !border !border-gray-700"
              place="top"
            >
              <div className="text-sm">
                <div className="font-semibold mb-1">Mood Entries: {entryCount}</div>
                {mood && <div className="mb-1">Final Mood: {mood}</div>}
                {dayData?.initial_mood !== mood && <div className="mb-1">Initial Mood: {dayData?.initial_mood}</div>}
                <div className="text-xs text-gray-400">Click to view details</div>
              </div>
            </ReactTooltip>
          )}
        </div>
      );
    }
    
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
      <div key={day} className="text-center text-xs text-gray-400 py-2">
        {day}
      </div>
    ));

    return { days: calendarDays, dayLabels };
  }, [data, currentMonth, currentYear, onDaySelect]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="grid grid-cols-7 gap-1 min-w-[350px]">
        {dayLabels}
        {days}
      </div>
    </div>
  );
});

MoodCalendar.displayName = 'MoodCalendar';
export default MoodCalendar; 