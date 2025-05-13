// src/components/chat/ChatPageLoading.tsx
import React from 'react';

const ChatPageLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="w-16 h-16 border-t-4 border-pink-600 border-solid rounded-full animate-spin"></div>
      <h2 className="mt-4 text-xl font-semibold text-gray-200">Loading your conversation...</h2>
      <p className="mt-2 text-gray-400">Please wait while we retrieve your chat history</p>
    </div>
  );
};

export default ChatPageLoading;
