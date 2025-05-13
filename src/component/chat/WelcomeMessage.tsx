// src/components/chat/WelcomeMessage.tsx
import React from 'react';
import { MoodType } from '@/lib/types';

interface WelcomeMessageProps {
  onMoodSelect: (mood: MoodType) => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onMoodSelect }) => {
  const moodOptions: MoodType[] = [
    "Despairing",
    "Irritated",
    "Anxious",
    "Drained",
    "Restless",
    "Indifferent",
    "Calm",
    "Hopeful",
    "Content",
    "Energized"
  ];

  const moodColors: Record<string, string> = {
    "Despairing": "bg-indigo-900 hover:bg-indigo-800",
    "Irritated": "bg-red-700 hover:bg-red-600",
    "Anxious": "bg-yellow-600 hover:bg-yellow-500",
    "Drained": "bg-gray-600 hover:bg-gray-500",
    "Restless": "bg-orange-600 hover:bg-orange-500",
    "Indifferent": "bg-gray-500 hover:bg-gray-400",
    "Calm": "bg-blue-600 hover:bg-blue-500",
    "Hopeful": "bg-emerald-600 hover:bg-emerald-500",
    "Content": "bg-green-600 hover:bg-green-500",
    "Energized": "bg-yellow-500 hover:bg-yellow-400"
  };

  // Create a 2x5 grid by splitting the array
  const topRow = moodOptions.slice(0, 5);
  const bottomRow = moodOptions.slice(5, 10);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="max-w-lg text-center px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Welcome to Tala
        </h1>
        <p className="text-gray-300 mb-8">
          I&apos;m Tala, your mental wellness companion. How are you feeling today?
        </p>
        
        <div className="flex flex-col gap-2 mb-6">
          <div className="grid grid-cols-5 gap-2">
            {topRow.map((mood) => (
              <button
                key={mood}
                onClick={() => onMoodSelect(mood)}
                className={`p-2 rounded-lg text-white text-sm ${moodColors[mood]} transition-colors`}
              >
                {mood}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-2">
            {bottomRow.map((mood) => (
              <button
                key={mood}
                onClick={() => onMoodSelect(mood)}
                className={`p-2 rounded-lg text-white text-sm ${moodColors[mood]} transition-colors`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
        
        <p className="mt-4 text-sm text-gray-400">
          You can also just start chatting if you&apos;re not sure how you feel.
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
