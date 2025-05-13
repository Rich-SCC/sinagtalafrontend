// src/components/chat/ChatPageContent.tsx
"use client";

import React, { useState, useRef, useCallback } from 'react';
import { chatApi, moodApi } from '@/lib';
import { apiUtils } from '@/lib/apiUtils';
import ChatHeader from '@/component/chat/ChatHeader';
import ChatMessages from '@/component/chat/ChatMessages';
import { ChatInputArea } from '@/component/chat/ChatInputArea';
import MoodSelection from '@/component/chat/MoodSelection';
import SettingsSidebar from '@/component/chat/SettingSidebar';
import WelcomeMessage from '@/component/chat/WelcomeMessage';
import { MoodType } from '@/lib/types';
import { FormattedMessage } from '@/lib/chatData';

interface ChatPageContentProps {
  isNewUser?: boolean;
  chatLogs: FormattedMessage[];
}

const ChatPageContent: React.FC<ChatPageContentProps> = ({
  isNewUser = false,
  chatLogs = [],
}) => {
  // Determine the initial mood: if chatLogs exist, use the newest user message's mood; otherwise, use 'Uncertain'
  let defaultMood: MoodType | null = 'Uncertain';
  if (chatLogs.length > 0) {
    // Find the newest user message (from: 'me')
    const userMessages = chatLogs.filter(msg => msg.from === 'me' && msg.mood);
    if (userMessages.length > 0) {
      // Sort by date and time descending to get the latest
      userMessages.sort((a, b) => {
        const aDate = new Date(`${a.date}T${a.time}`);
        const bDate = new Date(`${b.date}T${b.time}`);
        return bDate.getTime() - aDate.getTime();
      });
      defaultMood = userMessages[0].mood || 'Uncertain';
    }
  }

  const [messages, setMessages] = useState<FormattedMessage[]>(chatLogs);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [currentMood, setCurrentMood] = useState<MoodType | null>(defaultMood);
  const [pendingMood, setPendingMood] = useState<MoodType | null>(defaultMood);
  const [showMoodSelection, setShowMoodSelection] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(isNewUser && chatLogs.length === 0);
  const [isResponding, setIsResponding] = useState<boolean>(false);
  const [daySummary, setDaySummary] = useState<string>('');
  
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const placeholderIndexRef = useRef<number | null>(null);
  
  // Helper to get today's date string
  const getToday = () => apiUtils.formatDate(new Date());

  // Fetch day summary
  const fetchDaySummary = async (date: string) => {
    try {
      const summaryData = await chatApi.getDaySummary(date);
      if (summaryData && typeof summaryData === 'object' && summaryData.summary) {
        setDaySummary(summaryData.summary);
      } else if (typeof summaryData === 'string') {
        setDaySummary(summaryData);
      }
    } catch {
      setDaySummary('Unable to fetch summary.');
    }
  };
  
  // Add message function (FormattedMessage)
  const addMessage = useCallback((from: 'me' | 'tala', text: string, mood?: MoodType) => {
    const now = new Date();
    const newMessage: FormattedMessage = {
      from,
      text,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      date: now.toLocaleDateString('en-CA'),
      mood,
    };
    setMessages(prev => {
      const updated = [...prev, newMessage];
      if (from === 'me') {
        setShowWelcome(false);
        const today = getToday();
        // Count user messages for today (including the new one)
        const userMsgCount = updated.filter(msg => msg.from === 'me' && msg.date === today).length;
        if (userMsgCount % 4 === 0) {
          fetchDaySummary(today);
        }
      }
      return updated;
    });
  }, []);
  
  // Update message function for streaming (by index)
  const updateMessage = useCallback((index: number, text: string) => {
    setMessages(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = {
          ...updated[index],
          text,
        };
      }
      return updated;
    });
  }, []);
  
  // Handle mood selection - just updates the pending mood without committing or sending
  const handleMoodSelect = (mood: MoodType) => {
    setPendingMood(mood);
  };
  
  // Handle mood button click
  const handleMoodButtonClick = () => {
    setShowMoodSelection(true);
  };
  
  // Handle sending a mood-only message
  const handleSendMoodMessage = async () => {
    if (!pendingMood) return;
    setCurrentMood(pendingMood);
    addMessage('me', `I'm feeling ${pendingMood.toLowerCase() || "uncertain"} today.`, pendingMood);
    try {
      await moodApi.saveMood(pendingMood);
    } catch (error) {
      console.error("Error saving mood:", error);
    }
    setIsResponding(true);
    try {
      const response = await chatApi.sendMessage(
        `I'm feeling ${pendingMood.toLowerCase() || "uncertain"} today.`,
        pendingMood,
        true
      );
      if (response.error) throw new Error(response.error);
      if (!response.body) throw new Error('No response stream available');
      const reader = response.body.getReader();
      let currentText = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.chunk) {
                currentText += data.chunk;
                if (placeholderIndexRef.current !== null) {
                  updateMessage(placeholderIndexRef.current, currentText);
                }
              }
              if (data.done && data.aiMessage && placeholderIndexRef.current !== null) {
                setMessages(prev => {
                  const updated = [...prev];
                  const now = new Date();
                  updated[placeholderIndexRef.current!] = {
                    from: 'tala',
                    text: data.aiMessage.content,
                    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    date: now.toLocaleDateString('en-CA'),
                  };
                  return updated;
                });
              }
            } catch (e) {
              console.error('Error parsing stream chunk:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      if (placeholderIndexRef.current !== null) {
        updateMessage(placeholderIndexRef.current, "I'm having trouble connecting right now. Please try again in a moment.");
      }
    }
    setIsResponding(false);
  };
  
  // Handle mood selection from WelcomeMessage - send as user message and hide welcome
  const handleWelcomeMoodSelect = async (mood: MoodType) => {
    setPendingMood(mood);
    setCurrentMood(mood);
    setShowWelcome(false);
    // Send as user message
    const userText = `I feel ${mood.toLowerCase()} right now.`;
    setIsResponding(true);
    setMessages(prev => {
      const now = new Date();
      const userMsg: FormattedMessage = {
        from: 'me',
        text: userText,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        date: now.toLocaleDateString('en-CA'),
        mood,
      };
      const aiMsg: FormattedMessage = {
        from: 'tala',
        text: '',
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        date: now.toLocaleDateString('en-CA'),
      };
      placeholderIndexRef.current = prev.length + 1;
      return [...prev, userMsg, aiMsg];
    });
    try {
      await moodApi.saveMood(mood);
    } catch (error) {
      console.error("Error saving mood:", error);
    }
    try {
      const response = await chatApi.sendMessage(
        userText,
        mood,
        true
      );
      if (response.error) throw new Error(response.error);
      if (!response.body) throw new Error('No response stream available');
      const reader = response.body.getReader();
      let currentText = '';
      let streamDone = false;
      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.chunk) {
                currentText += data.chunk;
                if (placeholderIndexRef.current !== null) {
                  updateMessage(placeholderIndexRef.current, currentText);
                }
              }
              if (data.done) {
                streamDone = true;
                if (data.aiMessage && placeholderIndexRef.current !== null) {
                  setMessages(prev => {
                    const updated = [...prev];
                    const now = new Date();
                    updated[placeholderIndexRef.current!] = {
                      from: 'tala',
                      text: data.aiMessage.content,
                      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                      date: now.toLocaleDateString('en-CA'),
                    };
                    return updated;
                  });
                }
                break;
              }
            } catch (e) {
              console.error('[Chat] Error parsing stream chunk:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('[Chat] Error getting AI response:', error);
      if (placeholderIndexRef.current !== null) {
        updateMessage(placeholderIndexRef.current, "I'm having trouble connecting right now. Please try again in a moment.");
      }
    }
    setIsResponding(false);
  };
  
  // Handle send message - now commits pending mood
  const handleSendMessage = async () => {
    setShowWelcome(false);
    if (!inputMessage.trim()) return;
    const userMessage = inputMessage;
    setInputMessage('');
    setIsResponding(true);
    if (!pendingMood) {
      setPendingMood("Uncertain");
    }
    setCurrentMood(pendingMood);
    const messageWithMood = pendingMood || "Uncertain";
    // Add user message and AI placeholder in a single update, and track placeholder index in a ref
    setMessages(prev => {
      const now = new Date();
      const userMsg: FormattedMessage = {
        from: 'me',
        text: userMessage,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        date: now.toLocaleDateString('en-CA'),
        mood: messageWithMood,
      };
      const aiMsg: FormattedMessage = {
        from: 'tala',
        text: '',
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        date: now.toLocaleDateString('en-CA'),
      };
      placeholderIndexRef.current = prev.length + 1;
      return [...prev, userMsg, aiMsg];
    });
    try {
      // Mood is now saved by the backend, no need to save here
    } catch (error) {
      console.error('[Chat] Error saving mood:', error);
    }
    try {
      const response = await chatApi.sendMessage(
        userMessage,
        messageWithMood,
        true
      );
      if (response.error) throw new Error(response.error);
      if (!response.body) throw new Error('No response stream available');
      const reader = response.body.getReader();
      let currentText = '';
      let streamDone = false;
      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.chunk) {
                currentText += data.chunk;
                if (placeholderIndexRef.current !== null) {
                  updateMessage(placeholderIndexRef.current, currentText);
                }
              }
              if (data.done) {
                streamDone = true;
                if (data.aiMessage && placeholderIndexRef.current !== null) {
                  setMessages(prev => {
                    const updated = [...prev];
                    const now = new Date();
                    updated[placeholderIndexRef.current!] = {
                      from: 'tala',
                      text: data.aiMessage.content,
                      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                      date: now.toLocaleDateString('en-CA'),
                    };
                    return updated;
                  });
                }
                break;
              }
            } catch (e) {
              console.error('[Chat] Error parsing stream chunk:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('[Chat] Error getting AI response:', error);
      if (placeholderIndexRef.current !== null) {
        updateMessage(placeholderIndexRef.current, "I'm having trouble connecting right now. Please try again in a moment.");
      }
    }
    setIsResponding(false);
  };
  
  // Handle toggle settings
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Chat header */}
      <ChatHeader 
        toggleSettings={toggleSettings}
      />

      {/* Main chat area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4" ref={chatBoxRef}>
          {showWelcome ? (
            <WelcomeMessage onMoodSelect={handleWelcomeMoodSelect} />
          ) : (
            <ChatMessages 
              messages={messages}
              chatBoxRef={chatBoxRef}
            />
          )}
        </div>
        
        {/* Chat input area */}
        <ChatInputArea 
          inputValue={inputMessage}
          onInputChange={setInputMessage}
          onSendMessage={handleSendMessage}
          isResponding={isResponding}
          currentMood={currentMood}
          pendingMood={pendingMood}
          onMoodClick={handleMoodButtonClick}
        />
      </div>

      {/* Mood selection modal */}
      {showMoodSelection && (
        <MoodSelection 
          onSelect={handleMoodSelect}
          onClose={() => setShowMoodSelection(false)}
          onSend={handleSendMoodMessage}
        />
      )}

      {/* Settings sidebar */}
      {showSettings && (
        <SettingsSidebar 
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          daySummary={daySummary}
        />
      )}
    </div>
  );
};

export default ChatPageContent; 
