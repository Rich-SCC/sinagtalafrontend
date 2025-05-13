// src/components/chat/SettingsSidebar.tsx
import React from 'react';
import Link from 'next/link';
import { Settings, User, LayoutDashboard, Heart, Phone, Info, X } from 'lucide-react';
import { authApi } from '@/lib';

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  daySummary?: string;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ isOpen, onClose, daySummary }) => {
  const handleLogout = async () => {
    await authApi.logout();
    window.location.href = '/';
  };

  // Day summary section
  const renderDaySummary = () => {
    const minSummaryLength = 30; // Arbitrary threshold for 'enough' summary
    const hasSummary = daySummary && daySummary.trim().length >= minSummaryLength;
    return (
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-md font-semibold text-white mb-2 flex items-center">
          <span className="mr-2">📝</span> Today&apos;s Summary
        </h2>
        {hasSummary ? (
          <div className="text-gray-200 text-sm whitespace-pre-line bg-gray-900 rounded-lg p-3">
            {daySummary}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 text-sm bg-gray-900 rounded-lg p-3 min-h-[80px]">
            <span className="text-2xl mb-2">🤔</span>
            <span className="text-center">Not enough data for a summary yet.<br />Keep chatting to see your day summary here!</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-800 w-64 shadow-lg z-30 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Header with Settings Icon (Top-Left) and Close Button */}
      <header className="flex justify-between items-center p-4 border-b border-gray-700">
        <div className="flex items-center">
          <Settings className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-lg font-semibold text-white">Settings</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition"
        >
          <X size={20} />
        </button>
      </header>

      {/* Navigation Links */}
      <div className="p-4 space-y-3">
        <Link href="/profile" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
          <User className="w-5 h-5 mr-3" />
          <span>Profile</span>
        </Link>
        <Link href="/dashboard" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
          <LayoutDashboard className="w-5 h-5 mr-3" />
          <span>Dashboard</span>
        </Link>
        <Link href="/resources" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
          <Heart className="w-5 h-5 mr-3" />
          <span>Mental Help Resources</span>
        </Link>
        <Link href="/hotlines" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
          <Phone className="w-5 h-5 mr-3" />
          <span>Crisis Hotlines</span>
        </Link>
        <Link href="/about" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
          <Info className="w-5 h-5 mr-3" />
          <span>About SinagTala</span>
        </Link>
      </div>

      {/* Today's Summary at Bottom */}
      <div className="absolute bottom-16 left-0 w-full">
        {renderDaySummary()}
      </div>

      {/* Logout Button at Bottom */}
      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsSidebar;
