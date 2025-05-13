import React, { KeyboardEvent } from 'react';
import { MoodType } from '@/lib/types';

// ======= MOOD ICONS MAP =======
const moodIcons: Record<string, React.ReactNode> = {
  Despairing: <span>😣</span>,
  Irritated: <span>😠</span>,
  Anxious: <span>😰</span>,
  Drained: <span>😩</span>,
  Restless: <span>😕</span>,
  Indifferent: <span>😐</span>,
  Calm: <span>😌</span>,
  Hopeful: <span>😊</span>,
  Content: <span>😄</span>,
  Energized: <span>😁</span>,
  Uncertain: <span>🤔</span>,
};

// ======= MESSAGE INPUT COMPONENT =======
interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isResponding?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  isResponding = false
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isResponding && value.trim()) {
        onSend();
      }
    }
  };

  return (
    <div className="relative pb-6 px-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="w-full p-3 pr-12 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
        rows={1}
        disabled={isResponding}
      />
      <button
        onClick={onSend}
        disabled={isResponding || !value.trim()}
        className={`absolute right-6 bottom-9 p-2 rounded-full ${
          isResponding || !value.trim()
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-pink-600 text-white hover:bg-pink-700'
        } transition-colors`}
        aria-label="Send message"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

// ======= MOOD STATUS COMPONENT =======
interface MoodStatusProps {
  currentMood: MoodType | null;
  pendingMood: MoodType | null;
  onMoodClick: () => void;
}

const MoodStatus: React.FC<MoodStatusProps> = ({ currentMood, pendingMood, onMoodClick }) => {
  const displayMood = pendingMood || currentMood;
  const isPending = pendingMood !== null && pendingMood !== currentMood;

  return (
    <button
      onClick={onMoodClick}
      className={
        `flex items-center space-x-2 px-4 py-2 rounded-full shadow-md transition-colors text-base focus:outline-none focus:ring-2 focus:ring-pink-500 ` +
        (isPending ? 'bg-transparent border border-gray-500' : 'bg-gray-700 hover:bg-gray-600')
      }
      style={{ minWidth: 0 }}
    >
      <div className="text-2xl">
        {displayMood ? moodIcons[displayMood] || '🤔' : '🤔'}
      </div>
      <span className="font-medium">
        Feeling {displayMood?.toLowerCase() || 'uncertain'}
      </span>
    </button>
  );
};

// ======= COMBINED CHAT INPUT AREA COMPONENT =======
interface ChatInputAreaProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  isResponding: boolean;
  currentMood: MoodType | null;
  pendingMood: MoodType | null;
  onMoodClick: () => void;
}

const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  inputValue,
  onInputChange,
  onSendMessage,
  isResponding,
  currentMood,
  pendingMood,
  onMoodClick
}) => {
  return (
    <div className="bg-gray-900 shadow-xl rounded-2xl mx-2 mb-4 border border-gray-800">
      {/* Mood Status */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-900 rounded-t-2xl">
        <MoodStatus 
          currentMood={currentMood}
          pendingMood={pendingMood}
          onMoodClick={onMoodClick}
        />
      </div>
      {/* Divider */}
      <div className="border-t border-gray-800 mx-4" />
      {/* Message Input */}
      <div className="px-4 pb-4 pt-3">
        <div className="flex items-end gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!isResponding && inputValue.trim()) {
                  onSendMessage();
                }
              }
            }}
            placeholder="Type a message..."
            className="w-full p-4 bg-gray-800 text-gray-200 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none shadow-sm transition-all"
            rows={1}
            disabled={isResponding}
            style={{ minHeight: '48px', height: '48px', maxHeight: '120px' }}
          />
          <button
            onClick={onSendMessage}
            disabled={isResponding || !inputValue.trim()}
            className={`flex-shrink-0 flex items-center justify-center rounded-xl shadow-lg transition-colors text-white text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ml-1 ${
              isResponding || !inputValue.trim()
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-pink-600 hover:bg-pink-700'
            }`}
            aria-label="Send message"
            style={{ height: '48px', width: '48px', minWidth: '48px', minHeight: '48px', padding: 0 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export { ChatInputArea, MessageInput, MoodStatus }; 