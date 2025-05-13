import { useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import type { MoodEntry, MoodType } from '@/lib/types';

// Define mood color mapping
const MOOD_COLORS: Record<MoodType, string> = {
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

// Time-based chart for seeing mood over time
const MoodTimelineChart = ({ entries }: { entries: MoodEntry[] }) => {
  // Process and format data for the chart
  const data = useMemo(() => {
    if (!entries || entries.length < 2) {
      return [];
    }
    
    // Mapping of mood types to numeric values for the chart
    const moodValues: Record<MoodType, number> = {
      "Despairing": 1,
      "Irritated": 2,
      "Anxious": 3,
      "Drained": 4,
      "Restless": 5,
      "Indifferent": 6,
      "Calm": 7, 
      "Hopeful": 8,
      "Content": 9,
      "Energized": 10,
      "Uncertain": 5.5
    };
    
    // Sort by timestamp and use all entries instead of limiting to 14
    return [...entries]
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map(entry => ({
        date: new Date(entry.timestamp).toLocaleDateString(undefined, {month: 'short', day: 'numeric'}),
        moodValue: moodValues[entry.mood as MoodType] || 5,
        mood: entry.mood,
        timestamp: entry.timestamp
      }));
  }, [entries]);
  
  if (!entries || entries.length < 2) {
    return (
      <div className="text-gray-400 text-sm text-center py-8">
        Not enough mood entries to display a timeline. Add at least two mood entries to see your trend.
      </div>
    );
  }
  
  // Calculate chart width based on number of data points
  // Each data point needs at least 50px width for good visibility
  const minWidth = Math.max(data.length * 50, 500);
  
  return (
    <div 
      className="overflow-x-auto pb-2" 
      aria-label="Chart showing your mood timeline over time"
    >
      <div style={{ width: `${minWidth}px`, minHeight: '250px' }}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart 
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <XAxis dataKey="date" stroke="#cbd5e1" />
            <YAxis 
              domain={[1, 10]} 
              ticks={[1, 5, 10]} 
              tickFormatter={(value) => {
                const moodMap: Record<number, string> = {
                  1: 'Negative',
                  5: 'Neutral',
                  10: 'Positive'
                };
                return moodMap[value] || '';
              }}
              stroke="#cbd5e1" 
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-gray-800 border border-gray-700 rounded p-2 shadow-lg">
                      <p className="font-medium">{data.mood}</p>
                      <p className="text-sm text-gray-300">
                        {new Date(data.timestamp).toLocaleString(undefined, {
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="moodValue" 
              stroke="#38bdf8"
              strokeWidth={2}
              dot={(props) => {
                const mood = props.payload.mood as MoodType;
                return (
                  <circle 
                    key={`dot-${props.payload.timestamp}-${props.index}`}
                    cx={props.cx} 
                    cy={props.cy} 
                    r={5} 
                    fill={MOOD_COLORS[mood] || "#6b7280"} 
                    stroke="#fff" 
                    strokeWidth={1} 
                  />
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodTimelineChart; 