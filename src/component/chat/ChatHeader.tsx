// src/components/chat/ChatHeader.tsx
import React, { useEffect, useState } from 'react';
import chatApi from '../../lib/chatApi';

interface ChatHeaderProps {
  toggleSettings: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ toggleSettings }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [statusChecking, setStatusChecking] = useState(false);

  useEffect(() => {
    const checkAIStatus = async () => {
      try {
        setStatusChecking(true);
        const status = await chatApi.checkAIStatus();
        setIsOnline(status.status === 'online');
      } catch (error) {
        setIsOnline(false);
        console.error('Failed to check AI status:', error);
      } finally {
        setStatusChecking(false);
      }
    };

    checkAIStatus();
    // Check status every 30 seconds
    const intervalId = setInterval(checkAIStatus, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-3 items-center p-4 bg-gray-800 border-b border-gray-700">
      {/* Left: Settings button */}
      <div className="flex justify-start">
        <button
          onClick={toggleSettings}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      
      {/* Middle: Title and badge */}
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-semibold text-gray-100">Tala</h1>
        <div className="flex items-center">
          <span className="ml-2 px-2 py-1 text-xs bg-pink-700 text-white rounded-full">AI</span>
          <div className="ml-2 flex items-center" title={isOnline ? "AI is online" : "AI is offline"}>
            <span className={`h-2.5 w-2.5 rounded-full ${statusChecking ? 'bg-yellow-400' : isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="ml-1 text-xs text-gray-300">{statusChecking ? 'Checking...' : isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>
      
      {/* Right: Empty space for balance */}
      <div></div>
    </div>
  );
};

export default ChatHeader;
