// src/app/chat/page.tsx
"use client";

import { Suspense } from 'react';
import ChatPageContent from '@/component/chat/ChatPageContent';
import { useChatData } from '@/lib';
import ProtectedRouteWrapper from '@/component/ProtectedRouteWrapper';

// Loading component
function ChatLoading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-white text-lg">Loading chat...</div>
    </div>
  );
}

// Wrapper component that fetches data
function ChatDataFetcher() {
  const { chatData, isLoading, isError } = useChatData();
  
  if (isLoading) {
    return <ChatLoading />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-red-500 text-lg">Error loading chat. Please try again.</div>
      </div>
    );
  }

  if (!chatData) {
    return <ChatLoading />;
  }
  
  return (
    <ChatPageContent 
      isNewUser={chatData.isNewUser}
      chatLogs={chatData.chatLogs}
    />
  );
}

// Main page component
export default function ChatPage() {
  return (
    <ProtectedRouteWrapper>
      <Suspense fallback={<ChatLoading />}>
        <ChatDataFetcher />
      </Suspense>
    </ProtectedRouteWrapper>
  );
}
