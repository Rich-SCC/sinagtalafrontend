// src/components/chat/MoodSelection.tsx
import React, { useState } from 'react';
import { MoodType } from '@/lib/types';

interface MoodSelectionProps {
  onSelect: (mood: MoodType) => void;
  onClose: () => void;
  onSend?: () => void; // Optional callback to send the mood message
}

const MoodSelection: React.FC<MoodSelectionProps> = ({ onSelect, onClose, onSend }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  
  const moods: MoodType[] = [
    "Despairing",
    "Irritated",
    "Anxious",
    "Drained",
    "Restless",
    "Indifferent",
    "Calm",
    "Hopeful",
    "Content",
    "Energized",
    "Uncertain"
  ];

  const moodDescriptions: Record<string, string> = {
    "Despairing": "Feeling extremely sad and without hope",
    "Irritated": "Annoyed, frustrated, or upset about something",
    "Anxious": "Worried, nervous, or uneasy about something",
    "Drained": "Feeling exhausted physically or emotionally",
    "Restless": "Unable to relax or be still",
    "Indifferent": "Not feeling strongly one way or the other",
    "Calm": "Feeling peaceful and without worry",
    "Hopeful": "Feeling optimistic about the future",
    "Content": "Satisfied and at ease with the current situation",
    "Energized": "Full of energy and enthusiasm",
    "Uncertain": "Not sure how you're feeling right now"
  };

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
    "Energized": "bg-yellow-500 hover:bg-yellow-400",
    "Uncertain": "bg-purple-600 hover:bg-purple-500"
  };

  const handleSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    onSelect(mood);
    
    // Just close the modal after selection, don't immediately send
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-4 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">How are you feeling?</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => handleSelect(mood)}
              className={`p-2 rounded-lg text-white text-sm ${moodColors[mood]} ${
                selectedMood === mood ? 'ring-2 ring-white' : ''
              }`}
              title={moodDescriptions[mood]}
            >
              {mood}
            </button>
          ))}
        </div>
        
        {onSend && selectedMood && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                if (onSend) onSend();
                onClose();
              }}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md"
            >
              Send as message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodSelection;
