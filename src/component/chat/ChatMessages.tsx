// src/components/chat/ChatMessages.tsx
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { FormattedMessage } from '@/lib/chatData';

// ======= INDIVIDUAL MESSAGE COMPONENT ======= 
interface MessageProps {
  message: FormattedMessage;
}

const MessageItem: React.FC<MessageProps> = ({ message }) => {
  if (!message) {
    console.warn('Received invalid message object');
    return null;
  }
  const isUserMessage = message.from === 'me';
  const content = message.text || '';
  const timeDisplay = message.time || '';
  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-lg px-4 py-2 ${
          isUserMessage
            ? 'bg-pink-700 text-white rounded-tr-none'
            : 'bg-gray-800 text-gray-100 rounded-tl-none'
        }`}
      >
        {message.from === 'tala' ? (
          content ? (
            <div className="prose prose-invert">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex items-center justify-center h-6">
              <svg className="animate-spin h-5 w-5 text-pink-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="ml-2 text-pink-300 text-sm">Tala is thinking...</span>
            </div>
          )
        ) : (
          <p className="text-white">{content}</p>
        )}
        <div
          className={`text-xs mt-1 ${
            isUserMessage ? 'text-pink-300' : 'text-gray-400'
          }`}
        >
          {timeDisplay}
          {isUserMessage && message.mood && (
            <span className="ml-2 italic bg-pink-900 text-pink-200 px-2 py-0.5 rounded-full">{message.mood}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// ======= DATE SEPARATOR COMPONENT =======
interface DateSeparatorProps {
  date: string;
}

function getRelativeDateLabel(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  // Compare only the date part
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  // Format as 'EEE, MMM d' (e.g., 'Sun, May 11')
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  const dateDisplay = getRelativeDateLabel(date);
  return (
    <div className="flex items-center justify-center my-6">
      <div className="bg-gray-800 px-4 py-1.5 rounded-full text-xs font-medium text-gray-300">
        {dateDisplay}
      </div>
    </div>
  );
};

// ======= MESSAGE GROUP COMPONENT =======
interface MessageGroupProps {
  date: string;
  messages: FormattedMessage[];
}

const MessageGroup: React.FC<MessageGroupProps> = ({ date, messages = [] }) => {
  const validMessages = Array.isArray(messages) 
    ? messages.filter(msg => msg && msg.time) 
    : [];
  if (validMessages.length === 0) {
    return null;
  }
  return (
    <div className="space-y-4">
      <DateSeparator date={date} />
      <div className="space-y-4">
        {validMessages.map((message, idx) => (
          <MessageItem 
            key={message.time + '-' + idx} 
            message={message} 
          />
        ))}
      </div>
    </div>
  );
};

// ======= MAIN CHAT MESSAGES COMPONENT =======
interface ChatMessagesProps {
  messages: FormattedMessage[];
  chatBoxRef?: React.RefObject<HTMLDivElement | null>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  messages = [],
  chatBoxRef
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const validMessages = Array.isArray(messages) ? messages.filter(Boolean) : [];
  // Group messages by date (not by time string)
  const messageGroups: Record<string, FormattedMessage[]> = {};
  validMessages.forEach(msg => {
    if (!msg || !msg.date) return;
    const date = msg.date;
    if (!messageGroups[date]) messageGroups[date] = [];
    messageGroups[date].push(msg);
  });
  // Sort dates oldest to newest
  const sortedDates = Object.keys(messageGroups).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  return (
    <div
      ref={chatBoxRef}
      className="flex-1 flex flex-col w-full h-full overflow-hidden bg-gray-900"
    >
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #111827;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
      {/* Scrollable container for messages */}
      <div 
        className="flex-1 overflow-y-auto p-4 h-full" 
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #111827' }}
      >
        {validMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Message groups by date */}
            {sortedDates.map((date, idx) => (
              <MessageGroup 
                key={date + '-' + idx} 
                date={date} 
                messages={[...messageGroups[date]].sort((a, b) => {
                  // Combine date and time for full Date object comparison
                  const aDateTime = new Date(`${a.date}T${a.time}`);
                  const bDateTime = new Date(`${b.date}T${b.time}`);
                  return bDateTime.getTime() - aDateTime.getTime(); // reverse: newest at bottom
                })}
              />
            ))}
            {/* Invisible div for scrolling to bottom */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
