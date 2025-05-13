import React, { memo } from 'react';

interface InsightsCardProps {
  insights: {
    title: string;
    description: string;
    type: 'positive' | 'negative' | 'neutral';
  }[];
}

const getInsightIcon = (type: 'positive' | 'negative' | 'neutral') => {
  switch (type) {
    case 'positive':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'negative':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      );
  }
};

const getBgColor = (type: 'positive' | 'negative' | 'neutral') => {
  switch (type) {
    case 'positive':
      return 'bg-emerald-900/20 border border-emerald-800 hover:bg-emerald-900/30';
    case 'negative':
      return 'bg-red-900/20 border border-red-800 hover:bg-red-900/30';
    default:
      return 'bg-blue-900/20 border border-blue-800 hover:bg-blue-900/30';
  }
};

const InsightsCard = memo(({ insights }: InsightsCardProps) => {
  if (!insights?.length) {
    return (
      <div className="text-gray-400 text-sm">
        No insights available yet. Continue tracking your moods to reveal patterns.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {insights.map((insight, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg transition-colors ${getBgColor(insight.type)}`}
        >
          <div className="flex items-start">
            <div className="mr-3 mt-0.5 flex-shrink-0">
              {getInsightIcon(insight.type)}
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">{insight.title}</h3>
              <p className="text-xs text-gray-300">{insight.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

InsightsCard.displayName = 'InsightsCard';
export default InsightsCard; 