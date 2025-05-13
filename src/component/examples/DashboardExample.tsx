import { useState } from 'react';
import { useChatData } from '@/lib/chatData';
import DashboardPreview from '../dashboard/DashboardPreview';
import { useRouter } from 'next/navigation';

/**
 * Example component showing how to integrate mood dashboard features
 * in a chat interface
 */
const DashboardExample: React.FC = () => {
  const router = useRouter();
  const { chatData, isLoading } = useChatData();
  const [showMore, setShowMore] = useState(false);
  
  const handleViewFullDashboard = () => {
    router.push('/dashboard');
  };
  
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Chat with Tala</h2>
      
      {/* Simple chat interface */}
      <div className="bg-gray-900 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-purple-900/30 border border-purple-800/50 rounded-lg p-3 mr-auto max-w-[80%]">
              <p className="text-sm">Hello! How are you feeling today?</p>
            </div>
            
            {chatData && chatData.chatLogs.slice(0, showMore ? undefined : 2).map((msg, idx) => (
              <div 
                key={idx}
                className={`rounded-lg p-3 ${
                  msg.from === 'me' 
                    ? 'bg-gray-700/50 ml-auto max-w-[80%]' 
                    : 'bg-purple-900/30 border border-purple-800/50 mr-auto max-w-[80%]'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                {msg.mood && (
                  <span className="text-xs text-blue-400 mt-1 inline-block">
                    Mood: {msg.mood}
                  </span>
                )}
              </div>
            ))}
            
            {(chatData?.chatLogs.length || 0) > 2 && !showMore && (
              <button 
                onClick={() => setShowMore(true)}
                className="text-xs text-blue-400 hover:text-blue-300 text-center w-full"
              >
                Show more messages...
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Dashboard preview integrated into chat interface */}
      <DashboardPreview className="mb-4" />
      
      {/* Full dashboard link */}
      <button
        onClick={handleViewFullDashboard}
        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded w-full transition-colors"
      >
        View Full Mood Dashboard
      </button>
      
      <div className="mt-4 text-sm text-gray-400">
        <h3 className="font-medium text-gray-300 mb-1">About Mood Tracking</h3>
        <p>
          Sinagtala analyzes your conversations to understand your emotional patterns. 
          This helps provide more personalized support and insights into your wellbeing.
        </p>
      </div>
    </div>
  );
};

export default DashboardExample; 